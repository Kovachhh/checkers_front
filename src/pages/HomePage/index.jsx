import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Tabs } from "antd";

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

const onChange = (key) => {
  console.log(key);
};

export const HomePage = () => {
  const [online, setOnlineGames] = useState([]);
  const [awaiting, setAwaitingGames] = useState([]);
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

  const tabs = [
    {
      key: "1",
      label: "Ігри в очікуванні",
      children: (
        <GamesAwaiting
          data={awaiting}
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
          data={online}
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
      <Header name={currentUser.username} />
      <Layout.Content style={{ padding: "20px 50px" }}>
        <Tabs defaultActiveKey="1" items={tabs} onChange={onChange} />
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
