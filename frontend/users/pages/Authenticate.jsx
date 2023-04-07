import { useState, useRef, useContext } from "react";
import { useMutation } from "react-query";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

//import Card from "../../shared/components/card/Card";
//import Input from "../../shared/components/input/Input";
//import Button from "../../shared/components/button/Button";

import { loginUser, signUpUser } from "../api/users";
import { AuthContext } from "../../shared/context/auth-context";

import "./Authenticate.css";
const Authenticate = (props) => {
  const [isLoginMode, setLoginMode] = useState(true);
  const auth = useContext(AuthContext);

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const changeLoginMode = () => {
    setLoginMode((prevMode) => !prevMode);
  };

  const signUpUserMutation = useMutation({
    mutationFn: signUpUser,
    onSuccess: (data) => {
      console.log(data);
      auth.login(data.id, data.token);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const loginUserMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log(data);
      auth.login(data.id, data.token);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onSubmitHandler = (event) => {
    event.preventDefault();
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
      <h2>{isLoginMode ? "Login" : "Sign Up"}</h2>
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
          <Form.Control type="password" ref={emailRef} required />
        </Form.Group>
        <Button variant="primary" type="submit">
          {isLoginMode ? "LOGIN" : "SIGNUP"}
        </Button>
      </Form>
      <span className="span" onClick={changeLoginMode}>
        {isLoginMode ? "Sign up instead?" : "Login instead?"}
      </span>
    </Card>
  );
};
export default Authenticate;
