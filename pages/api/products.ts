import { API } from "utils/constant";

type RegisterPayload = {
  name: String;
  email: String;
  password: String;
}

type LoginPayload = {
email: String;
password: String;
}

const getOptions = {
  method: "GET",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8",
  },
};

const productsRoute = 'http://localhost:1337/api/products?populate=*'
const productDetailsRoute = 'http://localhost:1337/api/products?populate=*&filters\[id][$eq]='

export const getProducts = async () => {
    const response = await fetch(`${productsRoute}`, getOptions);
    const json = await response.json();
    return { response: response, json: json };
};


export const getProductDetails = async (pid) => {
  const response = await fetch(`${productDetailsRoute}${pid}`, getOptions);
  const json = await response.json();
  return { response: response, json: json };
};

export const UpdateProduct = async (id, payload) => {
  const response = await fetch(`${API}/products/${id}`, {
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









