import { useContext, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useMutation } from "react-query";

import { AuthContext } from "../../shared/context/auth-context";
import { createListing } from "../api/listings";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const AddListing = () => {
  const nameRef = useRef();
  const priceRef = useRef();

  const auth = useContext(AuthContext);
  const history = useHistory();

  const createListingMutation = useMutation({
    mutationFn: createListing,
  });

  const listingSubmitHandler = (event) => {
    event.preventDefault();
    createListingMutation.mutate({
      name: nameRed.current.value,
      price: priceRef.curtrent.value,
      token: auth.token,
    });
    history.push("/");
  };

  return (
    <Card>
      <Card.Body>
        <Form onSubmit={listingSubmitHandler}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" ref={nameRef} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Price</Form.Label>
            <Form.Control type="text" ref={priceRef} required />
          </Form.Group>
          <Button variant="primary" className="mt-3">
            Add Listing
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AddListing;
