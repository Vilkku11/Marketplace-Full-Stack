import { useContext, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { useMutation } from "react-query";

import { AuthContext } from "../../shared/context/auth-context";
import { createListing } from "../api/listings";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Alert } from "react-bootstrap";

const AddListing = () => {
  const nameRef = useRef();
  const priceRef = useRef();

  const auth = useContext(AuthContext);
  const history = useHistory();

  const [submitError, setSubmitError] = useState(false);

  const createListingMutation = useMutation({
    mutationFn: createListing,
    onSuccess: (data) => {
      console.log(data);
      setSubmitError(false);
    },
    onError: (error) => {
      console.log(error);
      setSubmitError("error posting listing");
    },
  });

  const listingSubmitHandler = (event) => {
    event.preventDefault();
    createListingMutation.mutate({
      name: nameRef.current.value,
      price: priceRef.current.value,
      token: auth.token,
      userId: auth.userId,
    });
    console.log(submitError);
    // history.push("/");
  };

  return (
    <Card>
      <Card.Body>
        {submitError && <Alert variant="danger">{submitError}</Alert>}
        <Form onSubmit={listingSubmitHandler}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" ref={nameRef} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Price</Form.Label>
            <Form.Control type="text" ref={priceRef} required />
          </Form.Group>
          <Button
            variant="primary"
            className="mt-3"
            onClick={listingSubmitHandler}
          >
            Add Listing
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AddListing;
