import { message } from "antd";
import { API, BEARER } from "utils/constant";
import { getToken } from "utils/helpers";

const authToken = getToken();

export const createOrder = async (payload) => {
      const response = await fetch(`${API}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${BEARER} ${authToken}`
        },
        body: JSON.stringify({data:payload}),
      });

      const data = await response.json();
      if (data?.error) {
        throw data?.error;
      } else {
        message.success(`Payment is successful, check yours orders to track.`);
        return data
      }
  };