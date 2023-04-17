import { useContext, useState } from "react";

//import { AuthContext } from "../../shared/context/auth-context";

import Card from "react-bootstrap/Card";

const ListingItem = (props) => {
  //const auth = useContext(AuthContext);

  console.log("anythiiing :(");
  return (
    <>
      <li>
        <Card>
          <Card.Body>
            <h2>{props.name}</h2>
            <h3>{props.price}</h3>
            <h3>Toimiiko listingitem :D</h3>
          </Card.Body>
        </Card>
      </li>
    </>
  );
};

export default ListingItem;
