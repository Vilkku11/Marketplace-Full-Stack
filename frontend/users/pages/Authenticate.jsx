import { useState, useRef } from "react";

import Card from "../../shared/components/card/Card";
import Input from "../../shared/components/input/Input";
import Button from "../../shared/components/button/Button";

import "./Authenticate.css";
const Authenticate = (props) => {
  const [isLoginMode, setLoginMode] = useState(true);

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const changeLoginMode = () => {
    setLoginMode((prevMode) => !prevMode);
  };
  return (
    <Card className="authentication">
      <h2>{isLoginMode ? "Login" : "Sign Up"}</h2>
      <form>
        {!isLoginMode && (
          <Input id="name" ref={nameRef} type="text" label="Name" />
        )}
        <Input id="email" ref={emailRef} type="email" label="Email" />
        <Input
          id="password"
          ref={passwordRef}
          type="password"
          label="Password"
        />
        <Button type="submit">{isLoginMode ? "LOGIN" : "SIGNUP"}</Button>
      </form>
      <span className="span" onClick={changeLoginMode}>
        {isLoginMode ? "Sign up instead?" : "Login instead?"}
      </span>
    </Card>
  );
};
export default Authenticate;
