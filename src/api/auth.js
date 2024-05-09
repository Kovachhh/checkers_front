import axios from "axios";
import { message } from "antd";

export const onSignUp = async ({ email, login, password }) => {
  try {
    const result = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/registration`,
      data: { email, login, password },
    });
    localStorage.setItem("jwt", result.data.accessToken);
    localStorage.setItem("user", JSON.stringify(result.data.user));
    return true;
  } catch (error) {
    console.log("error", error.response);
    message.error(error.response.statusText);
  }
};

export const onLogin = async ({ email, password }) => {
  try {
    const result = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/login`,
      data: { email, password },
    });
    localStorage.setItem("jwt", result.data.accessToken);
    localStorage.setItem("user", JSON.stringify(result.data.user));
    return true;
  } catch (error) {
    console.log("error", error.response);
    message.error(error.response.statusText);
  }
};
