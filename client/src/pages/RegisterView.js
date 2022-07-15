import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//code source  Auth Demo  - Jim
const EMPTY_FORM = {
  username: "",
  email: "",
  password: "",
  owner: 0,
};
function RegisterView(props) {
  //   const [user, setUser] = useState(null);
  //   const [errorMsg, setErrorMsg] = useState("");
  //   let { id } = useParams();
  const [newUser, setNewUser] = useState(EMPTY_FORM);
  const [shopOwner, setShopOwner] = useState(0);

  function handleChange(event) {
    let { name, value } = event.target;
    setNewUser((data) => ({ ...data, [name]: value }));
  }

  function handleSubmit(event) {
    console.log(event);
    /*
    there are 3 things Handle Submit always does:
    1) intercept submit event so it doesnt get sent to server
    2)pass data to parent
    3) reset form fields.
    */

    event.preventDefault();
    console.log(newUser);
    // props.addStudentCb(formData);
    setNewUser(EMPTY_FORM);
  }
  async function createUser() {}

  return (
    <div>
      <form onSubmit={handleSubmit} s>
        <label>
          Username
          <input
            type="text"
            name="username"
            value={newUser.username}
            onChange={handleChange}
          />
        </label>
        <br></br>
        <label>
          Email
          <input
            type="text"
            name="email"
            value={newUser.email}
            onChange={handleChange}
          />
        </label>
        <br></br>
        <label>
          Password
          <input
            type="text"
            name="password"
            value={newUser.password}
            onChange={handleChange}
          />
        </label>
        <br></br>
        <div>
          <p>Are you registering as shop owner?</p>
          <label>
            <input
              type="radio"
              name="owner"
              value="1"
              onChange={handleChange}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="owner"
              value="0"
              onChange={handleChange}
            />
            No
          </label>
        </div>
        <button>Register</button>
      </form>
    </div>
  );
}

export default RegisterView;
