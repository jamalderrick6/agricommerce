const getOptions = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
  };
  
  const categoriesRoute = 'http://localhost:1337/api/categories'
  
  export const getCategories = async () => {
      const response = await fetch(`${categoriesRoute}`, getOptions);
      const json = await response.json();
      return { response: response, json: json };
  };
  
  
  
  