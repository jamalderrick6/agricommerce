import { message } from "antd";
import { API } from "utils/constant";

export const AddToCart = async (payload) => {
      const response = await fetch(`${API}/carts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({data:payload}),
      });

      const data = await response.json();
      if (data?.error) {
        throw data?.error;
      } else {
        message.success(`Item added to cart successfully`);
        return data
      }
  };

export const UpdateEntry = async (id, payload) => {
    const response = await fetch(`${API}/carts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({data:payload}),
    });

    const data = await response.json();
    if (data?.error) {
      throw data?.error;
    } else {
      return data
    }
};

export const DeleteEntry = async (id) => {
    const response = await fetch(`${API}/carts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    });

    const data = await response.json();
    if (data?.error) {
      throw data?.error;
    } else {
      return data
    }
};