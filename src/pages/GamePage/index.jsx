import React, { useState, useEffect } from "react";
import { get } from "lodash";
import { Layout, Breadcrumb, message } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import io from "socket.io-client";

import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Board } from "../../components/Board";
import { getGame, onFinishGame, onMoveGame } from "../../api/game";
import { GAME_ACTIONS } from "../../consts/game";
import { SERVER_ERROR } from "../../consts/sockets";

export const GamePage = () => {
  const [game, setGame] = useState({});
  const [gameLoader, setGameLoader] = useState(true);

  const params = useParams();

  const gameId = params.id;
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();

  const onHomePage = () => navigate("/");

  const onMove = async ({ id, target }) => {
    const game = await onMoveGame(gameId, { id, target });

    if (game) {
      setGame(game);
    }
  };

  const onFinish = async () => {
    await onFinishGame(gameId);
  };

  const getGameData = async () => {
    const data = await getGame(gameId);

    if (data) {
      setGameLoader(false);
      setGame(data);
    }
  };

  useEffect(() => {
    getGameData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    const socket = io(process.env.REACT_APP_WSS, {
      query: {
        userId: currentUser.userId,
      },
    });

    socket.on("disconnect", () => {
      alert(SERVER_ERROR);
    });

    socket.on(GAME_ACTIONS.WON, () => {
      message.success({
        content: "Ви виграли!",
        className: "custom-class",
        style: {
          marginTop: "50vh",
        },
        onClose: onHomePage,
        onClick: onHomePage,
      });
    });

    socket.on(GAME_ACTIONS.LOST, () => {
      message.error({
        content: "Ви програли!",
        className: "custom-class",
        style: {
          marginTop: "50vh",
        },
        onClose: onHomePage,
        onClick: onHomePage,
      });
    });

    socket.on(GAME_ACTIONS.MOVED, (newState) => {
      setGame(newState);
    });
  }, []);

  return (
    <Layout className="layout" style={{ minHeight: "100vh" }}>
      <Header name={currentUser?.username} />
      <Layout.Content style={{ padding: "0 50px" }}>
        <Breadcrumb style={{ margin: "20px 0" }}>
          <Breadcrumb.Item>
            <Link to="/">Головна</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Гра {params.id}</Breadcrumb.Item>
        </Breadcrumb>
        <Board
          board={game.board}
          playerActiveId={get(game, "activePlayerId", "")}
          player1Id={get(game, "firstPlayerId", "")}
          player2Id={get(game, "secondPlayerId", "")}
          loading={gameLoader}
          onFinish={onFinish}
          onMove={onMove}
          currentUser={currentUser}
        />
      </Layout.Content>
      <Footer />
    </Layout>
  );
};
