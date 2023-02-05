type RegisterPayload = {
    name: String;
    email: String;
    password: String;
}

type LoginPayload = {
  email: String;
  password: String;
}

const postOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
  };

const registerRoute = 'http://127.0.0.1:8000/users'
const loginRoute = 'http://127.0.0.1:8000/users/login'

export const registerUser = async (payload: RegisterPayload) => {
      let options = postOptions;
      options["body"] = JSON.stringify(payload);
      const response = await fetch(`${registerRoute}`, options);
      const json = await response.json();
      return { response: response, json: json };
};

export const loginUser = async (payload: LoginPayload) => {
  let options = postOptions;
  options["body"] = JSON.stringify(payload);
  const response = await fetch(`${loginRoute}`, options);
  const json = await response.json();
  return { response: response, json: json };
};

  

  
  
