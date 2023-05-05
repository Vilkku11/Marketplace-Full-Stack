const url = import.meta.env.VITE_API_URL;
export const getListings = async () => {
  const res = await fetch(url + "/listings");
  return await res.json();
};

export const createListing = async ({ name, price, token, userId, image }) => {
  const res = await fetch(url + "/listings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      name,
      price,
      userId,
      image,
    }),
  });

  return await res.json();
};

export const deleteListing = async ({ id, token }) => {
  const res = await fetch(url + "/listings/delete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "BEARER " + token,
    },
    body: JSON.stringify({
      id,
    }),
  });

  return await res.json();
};
