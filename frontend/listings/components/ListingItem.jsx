import { useContext, useState } from "react";

import { AuthContext } from "../../shared/context/auth-context";

import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";

const ListingItem = (props) => {
  const auth = useContext(AuthContext);

  let button;
  if (auth.userId == props.user) {
    button = <Button>Click me!</Button>;
  }

  return (
    <li>
      <Card>
        <Card.Body>
          <h2 className="text-center">{props.name}</h2>
          <p>{props.price}</p>
          <p>{props.created}</p>
          <p>{props.user}</p>
          <div>{button}</div>
          <img src={props.image} alt={props.image}></img>
        </Card.Body>
      </Card>
    </li>
  );
};

export default ListingItem;
