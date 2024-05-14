import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Tabs } from "antd";
import io from "socket.io-client";

import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { GamesOnline } from "../../components/GamesOnline";
import {
  acceptGame,
  createGame,
  getAwaitingGames,
  getOnlineGames,
} from "../../api/game";
import { getLeaderboard } from "../../api/user";
import { GamesAwaiting } from "../../components/GamesAwaiting";
import { Leaderboard } from "../../components/Leaderboard";
import { CreateGameModal } from "../../components/createGameModal";
import { GAME_ACTIONS } from "../../consts/game";
import { SERVER_ERROR } from "../../consts/sockets";

export const HomePage = () => {
  const [onlineGames, setOnlineGames] = useState([]);
  const [awaitingGames, setAwaitingGames] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);

  const [onlineLoading, setOnlineLoading] = useState(true);
  const [awaitingLoading, setAwaitingLoading] = useState(true);
  const [leaderboardLoading, setLeaderboardLoading] = useState(true);
  const [createGameLoading, setCreateGameLoading] = useState(false);
  const [acceptGameLoading, setAcceptGameLoading] = useState(false);
  const [creatingGameModal, setCreatingGameModal] = useState(false);

  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem("user"));

  const getOnlineGamesHandler = async () => {
    const games = await getOnlineGames();

    if (games) {
      setOnlineLoading(false);
      setOnlineGames(games);
    }
  };

  const getAwaitingGamesHandler = async () => {
    const games = await getAwaitingGames();

    if (games) {
      setAwaitingLoading(false);
      setAwaitingGames(games);
    }
  };

  const getLeaderboardHandler = async () => {
    const games = await getLeaderboard();

    if (games) {
      setLeaderboardLoading(false);
      setLeaderboard(games);
    }
  };

  const onCreateGame = async (name) => {
    setCreatingGameModal(false);
    setCreateGameLoading(true);
    const game = await createGame(name);

    if (game) {
      setCreateGameLoading(false);
    }
  };

  const onAcceptGame = async (id) => {
    setAcceptGameLoading(true);
    const game = await acceptGame(id);

    if (game) {
      setAcceptGameLoading(false);
      navigate(`/games/${id}`);
    }
  };

  const toggleModalHandler = () => {
    setCreatingGameModal(!creatingGameModal);
  };

  useEffect(() => {
    getOnlineGamesHandler();
    getAwaitingGamesHandler();
    getLeaderboardHandler();
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

    socket.on(GAME_ACTIONS.CREATED, (game) => {
      setAwaitingGames((games) => [
        game,
        ...games,
      ]);
    });

    socket.on(GAME_ACTIONS.ACCEPTED, (game) => {
      setAwaitingGames((games) =>
        games.filter((element) => element._id !== game._id)
      );
      setOnlineGames((games) => [
        ...games.filter((element) => element._id !== game._id),
        game,
      ]);
    });

    socket.on(GAME_ACTIONS.FINISHED, (game) => {
      setOnlineGames((games) =>
        games.filter((element) => element._id !== game._id)
      );
      setAwaitingGames((games) =>
        games.filter((element) => element._id !== game._id)
      );
    });
  }, []);

  const tabs = [
    {
      key: "1",
      label: "Ігри в очікуванні",
      children: (
        <GamesAwaiting
          data={awaitingGames}
          loading={awaitingLoading}
          currentUser={currentUser}
          toggleModal={toggleModalHandler}
          onAcceptGame={onAcceptGame}
          createGameLoading={createGameLoading}
        />
      ),
    },
    {
      key: "2",
      label: "Ігри в процесі",
      children: (
        <GamesOnline
          data={onlineGames}
          loading={onlineLoading}
          currentUser={currentUser}
        />
      ),
    },
    {
      key: "3",
      label: "Статистика",
      children: <Leaderboard data={leaderboard} loading={leaderboardLoading} />,
    },
  ];

  return (
    <Layout className="layout">
      <Header name={currentUser?.username} />
      <Layout.Content style={{ padding: "20px 50px" }}>
        <Tabs defaultActiveKey="1" items={tabs} />
      </Layout.Content>
      <Footer />

      <CreateGameModal
        open={creatingGameModal}
        onCreateGame={onCreateGame}
        onToggleModal={toggleModalHandler}
      />
    </Layout>
  );
};
