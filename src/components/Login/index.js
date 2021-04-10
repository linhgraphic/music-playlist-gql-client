import React, { useState, useContext } from "react";
import { useMutation } from "@apollo/client";
import { userLogin } from "../../queries";
import { Button, Form } from "semantic-ui-react";
import { AuthContext } from "../../context/Auth";
import { UserContext } from "../../context/User";
import "./Login.css";

const Login = (props) => {
  const [values, setValue] = useState({
    username: "",
    password: "",
  });
  const context = useContext(AuthContext);
  const loginContext = useContext(UserContext);
  const [errors, setErrors] = useState({});
  const [login, { loading }] = useMutation(userLogin, {
    update(_, result) {
      context.login(result.data.login);
      loginContext.closePanel();
    },
    onError(err) {
      console.log(err.graphQLErrors);
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: values,
  });
  const onChange = (e) =>
    setValue({ ...values, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    login();
    setValue({ username: "", password: "" });
    setErrors({});
  };
  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h5>Login</h5>
        <Form.Input
          label="Username"
          placeholder="Username"
          name="username"
          value={values.username}
          error={errors.username ? true : false}
          onChange={onChange}
        />
        <Form.Input
          label="Password"
          placeholder="Password"
          name="password"
          value={values.password}
          error={errors.password ? true : false}
          onChange={onChange}
        />
        <button type="submit">Login</button>
      </Form>{" "}
      {Object.values(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Login;
