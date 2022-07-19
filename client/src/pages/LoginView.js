import React, { useState } from "react";
import { Link } from "react-router-dom";
function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleChange(event) {
    let { name, value } = event.target;
    switch (name) {
      case "usernameInput":
        setUsername(value);
        break;
      case "passwordInput":
        setPassword(value);
        break;
      default:
        break;
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.loginCb(username, password);
  }

  return (
    <div>
      <div>
        <h2>Login</h2>

        {props.loginError && <div>{props.loginError}</div>}

        <form className="Form" onSubmit={handleSubmit}>
          <div>
            <label className="form-label">
              Username
              <input
                className="form-control"
                type="text"
                name="usernameInput"
                required
                value={username}
                onChange={handleChange}
              />
            </label>
          </div>

          <div>
            <label className="form-label">
              Password
              <input
                className="form-control"
                type="password"
                name="passwordInput"
                required
                value={password}
                onChange={handleChange}
              />
            </label>
          </div>

          <button className="btn btn-light" type="submit">
            Submit
          </button>
        </form>
      </div>
      <p>Not registered yet? </p>
      <Link to={"../Register"}>Click here</Link>
    </div>
  );
}

export default LoginView;
