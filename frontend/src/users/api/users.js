const url = import.meta.env.VITE_API_URL;
export const loginUser = async ({ email, password }) => {
  const response = await fetch(url + "/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  return await response.json();
};

export const signUpUser = async ({ name, email, password }) => {
  const response = await fetch(url + "/users/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });
  return await response.json();
};
