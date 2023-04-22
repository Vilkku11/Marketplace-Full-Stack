import { useContext, useState } from "react";

//import { AuthContext } from "../../shared/context/auth-context";

import Card from "react-bootstrap/Card";

const ListingItem = (props) => {
  //const auth = useContext(AuthContext);

  return (
    <li>
      <Card>
        <Card.Body>
          <h2 className="text-center">{props.name}</h2>
          <p>{props.price}</p>
          <p>{props.created}</p>
          <p>{props.user}</p>
        </Card.Body>
      </Card>
    </li>
  );
};

export default ListingItem;
