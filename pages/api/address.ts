import { message } from "antd";
import { API, BEARER } from "utils/constant";
import { getToken } from "utils/helpers";

const authToken = getToken();

export const addAddress = async (payload) => {
      const response = await fetch(`${API}/addresses`, {
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
        message.success(`Address added successfully`);
        return data
      }
  };