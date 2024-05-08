import { message } from "antd";
import axios from "axios";

export const getMe = async (userId) => {
    try {
        const result = await axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/users/${userId}`,
            headers: {
                'Authorization': localStorage.getItem('jwt'),
            },
        });
    
        return result.data;
    } catch (error) {
        console.log('error', error.response);
        message.error(error.response.statusText);
    };
};