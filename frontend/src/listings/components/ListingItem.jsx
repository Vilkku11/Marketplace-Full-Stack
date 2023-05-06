import { useContext, useState } from "react";
import { useMutation } from "react-query";

import { AuthContext } from "../../shared/context/auth-context";
import { deleteListing } from "../api/listings";

import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import "./ListingItem.css";

const ListingItem = (props) => {
  const auth = useContext(AuthContext);

  const deleteListingMutation = useMutation({
    mutationFn: deleteListing,
  });

  const listingDeleteHandler = (event) => {
    event.preventDefault();
    deleteListingMutation.mutate({
      id: props.id,
      token: auth.token,
    });
  };

  let deleteButton;
  let buyButton;
  if (auth.userId == props.userId) {
    deleteButton = (
      <Button onClick={listingDeleteHandler} variant="danger">
        Delete
      </Button>
    );
  } else {
    buyButton = (
      <Button onClick={listingDeleteHandler} variant="success">
        Buy
      </Button>
    );
  }

  return (
    <li>
      <Card>
        <Card.Body>
          <h2 className="text-center">{props.name}</h2>
          <p>{props.price}</p>
          <p>{props.created}</p>
          <p>{props.user}</p>
          <p>{props.userId}</p>
          <img src={props.image} alt={props.image}></img>
          <div>{deleteButton}</div>
          <div>{buyButton}</div>
        </Card.Body>
      </Card>
    </li>
  );
};

export default ListingItem;
