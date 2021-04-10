import React, { useContext, useState } from "react";
import { useMutation } from "@apollo/client";
import { userRegister, getUsersQuery } from "../../queries";
import { Button, Form } from "semantic-ui-react";
import { AuthContext } from "../../context/Auth";
import { UserContext } from "../../context/User";

const Register = (props) => {
  const [values, setValue] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const context = useContext(AuthContext);
  const loginContext = useContext(UserContext);
  const [errors, setErrors] = useState({});
  const [register, { loading }] = useMutation(userRegister, {
    update(_, { data: { register: userData } }) {
      context.login(userData);
      loginContext.closePanel();
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: values,
    refetchQueries: [{ query: getUsersQuery }],
  });
  const onChange = (e) =>
    setValue({ ...values, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    register();
    setValue({ username: "", password: "", confirmPassword: "" });
    setErrors({});
  };
  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h5>Register</h5>
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
        <Form.Input
          label="confirm password"
          placeholder="confirm password"
          name="confirmPassword"
          value={values.confirmPassword}
          error={errors.confirmPassword ? true : false}
          onChange={onChange}
        />
        <button type="submit">Register</button>
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

export default Register;
