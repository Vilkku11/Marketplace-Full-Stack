import { useState, useRef, useContext } from "react";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { Alert } from "react-bootstrap";

//import Card from "../../shared/components/card/Card";
//import Input from "../../shared/components/input/Input";
//import Button from "../../shared/components/button/Button";

import { loginUser, signUpUser } from "../api/users";
import { AuthContext } from "../../shared/context/auth-context";

import "./Authenticate.css";
const Authenticate = (props) => {
  const [isLoginMode, setLoginMode] = useState(true);
  const auth = useContext(AuthContext);
  const [authError, setAuthError] = useState(false);

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const changeLoginMode = (event) => {
    event.preventDefault();
    setAuthError(false);
    setLoginMode((prevMode) => !prevMode);
  };

  const signUpUserMutation = useMutation({
    mutationFn: signUpUser,
    onSuccess: (data) => {
      console.log("in signuptest");
      console.log(data);
      auth.login(data.id, data.token);
    },
    onError: (error) => {
      console.log(error);
      setAuthError("Failed to sign up, please try again");
    },
  });

  const loginUserMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log("sugges logging");
      console.log(data);
      console.log(data.id);
      console.log(data.email);
      console.log(data.token);
      console.log(auth.login);
      auth.login(data.id, data.token, data.email);
    },
    onError: (error) => {
      console.log(error);
      setAuthError("Failed to log in, please check your credentials");
    },
  });

  const onSubmitHandler = (event) => {
    event.preventDefault();

    setAuthError(false);
    if (isLoginMode) {
      loginUserMutation.mutate({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
    } else {
      signUpUserMutation.mutate({
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
    }
  };

  return (
    <Card className="authentication">
      <Card.Body>
        <h2 className="mb-3 text-center">
          {isLoginMode ? "Login" : "Sign Up"}
        </h2>
        {authError && <Alert variant="danger">{authError}</Alert>}
        <Form onSubmit={onSubmitHandler}>
          {!isLoginMode && (
            <Form.Group id="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="name" ref={nameRef} required />
            </Form.Group>
          )}
          <Form.Group id="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" ref={emailRef} required />
          </Form.Group>
          <Form.Group id="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" ref={passwordRef} required />
          </Form.Group>
          <Button variant="primary" className="w-100 mt-3 mb-3" type="submit">
            {isLoginMode ? "LOGIN" : "SIGNUP"}
          </Button>
        </Form>

        {isLoginMode ? (
          <div>
            Don't have an account?{" "}
            <Link to="/" onClick={changeLoginMode}>
              {" "}
              Sign up
            </Link>
          </div>
        ) : (
          <div>
            Already have an account?{" "}
            <Link to="/" onClick={changeLoginMode}>
              Log in
            </Link>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};
export default Authenticate;
