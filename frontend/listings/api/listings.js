export const getListings = async () => {
  const res = await fetch("http://localhost:5000/listings");
  return await res.json();
};

export const createListing = async ({ name, price, token, userId, image }) => {
  const res = await fetch("http://localhost:5000/listings", {
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
