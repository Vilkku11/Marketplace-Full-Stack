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
  const imageRef = useRef();

  const auth = useContext(AuthContext);
  const history = useHistory();
  console.log(auth);
  console.log(auth.token);
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
      image: imageRef.current.value,
      token: auth.token,
      userId: auth.userId,
    });
    console.log(auth.email);
    // history.push("/");
  };

  return (
    <Card>
      <Card.Body>
        {submitError && <Alert variant="danger">{submitError}</Alert>}
        <Form onSubmit={listingSubmitHandler} className="needs-validation">
          <Form.Group id="name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" minLength={4} ref={nameRef} required />
          </Form.Group>
          <Form.Group id="number">
            <Form.Label>Price</Form.Label>
            <Form.Control type="number" ref={priceRef} required />
          </Form.Group>
          <Form.Group id="image">
            <Form.Label>Image link</Form.Label>
            <Form.Control type="text" ref={imageRef} required />
          </Form.Group>
          <Button variant="primary" className="mt-3" type="submit">
            Add Listing
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AddListing;
