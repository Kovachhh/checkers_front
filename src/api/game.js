import axios from "axios";
import { message } from "antd";

export const getAwaitingGames = async () => {
  try {
    const result = await axios({
      method: "GET",
      url: `${process.env.REACT_APP_API}/games/awaiting`,
      headers: {
        Authorization: localStorage.getItem("jwt"),
      },
    });

    return result.data;
  } catch (error) {
    console.log("error", error.response);
    message.error(error.response.statusText);
  }
};

export const getOnlineGames = async () => {
  try {
    const result = await axios({
      method: "GET",
      url: `${process.env.REACT_APP_API}/games/online`,
      headers: {
        Authorization: localStorage.getItem("jwt"),
      },
    });

    return result.data;
  } catch (error) {
    console.log("error", error.response);
    message.error(error.response.statusText);
  }
};

export const createGame = async (name) => {
  try {
    const result = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/games`,
      headers: {
        Authorization: localStorage.getItem("jwt"),
      },
      data: { name },
    });
    return result.data;
  } catch (error) {
    console.log("error", error.response);
    message.error(error.response.statusText);
  }
};

export const acceptGame = async (gameId) => {
  try {
    const result = await axios({
      method: "PUT",
      url: `${process.env.REACT_APP_API}/games/${gameId}/accept`,
      headers: {
        Authorization: localStorage.getItem("jwt"),
      },
    });
    return result.data;
  } catch (error) {
    console.log("error", error.response);
    message.error(error.response.statusText);
  }
};

export const onFinishGame = async (gameId) => {
  try {
    const result = await axios({
      method: "DELETE",
      url: `${process.env.REACT_APP_API}/games/${gameId}`,
      headers: {
        Authorization: localStorage.getItem("jwt"),
      },
    });
    return result.data.data;
  } catch (error) {
    console.log("error", error.response);
    message.error(error.response.statusText);
  }
};
