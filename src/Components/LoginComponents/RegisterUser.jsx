import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../DisplayView.css";
import { registerNewUser } from "../../Services/LoginService";

const RegisterUser = () => {

  const navigate = useNavigate();

  const [farmUser, setFarmUser] = useState({
    username: "",
    password: "",
    personalName: "",
    email: ""
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [flag, setFlag] = useState(false);

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const createNewUser = (event) => {
    event.preventDefault();

    if (farmUser.password === confirmPassword) {
      registerNewUser(farmUser)
        .then((response) => {
          console.log(response);
          setFlag(true);
        })
        .catch((error) => {
          console.log(error);
          alert("Registration Failed!");
        });
    }
  };

  const onChangeHandler = (event) => {
    setFlag(false);

    const { name, value } = event.target;

    setFarmUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleValidation = (event) => {
    event.preventDefault();

    let tempErrors = {};
    let isValid = true;

    if (!farmUser.username.trim()) {
      tempErrors.username = "User Name is required";
      isValid = false;
    }

    if (!farmUser.password.trim()) {
      tempErrors.password = "Password is required";
      isValid = false;
    } else if (
      farmUser.password.length < 5 ||
      farmUser.password.length > 10
    ) {
      tempErrors.password = "Password must be 5-10 characters long";
      isValid = false;
    } else if (farmUser.password !== confirmPassword) {
      tempErrors.password = "Passwords do not match";
      isValid = false;
    }

    if (!farmUser.personalName.trim()) {
      tempErrors.personalName = "Personal Name is required";
      isValid = false;
    }

    if (!farmUser.email.trim()) {
      tempErrors.email = "Email is required";
      isValid = false;
    } else if (!emailPattern.test(farmUser.email)) {
      tempErrors.email = "Invalid Email Format";
      isValid = false;
    }

    if (!confirmPassword.trim()) {
      tempErrors.confirmPassword = "Confirm Password is required";
      isValid = false;
    }

    setErrors(tempErrors);

    if (isValid) {
      createNewUser(event);
    }
  };

  const returnBack = () => {
    navigate("/");
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">

        <div className="col-md-6">

          <div className="card shadow">

            <div className="card-body">

              <h2 className="text-center mb-4">
                <u>New User Registration</u>
              </h2>

              <form>

                <div className="mb-3">
                  <label>User Name</label>

                  <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    className="form-control"
                    value={farmUser.username}
                    onChange={onChangeHandler}
                  />

                  {errors.username && (
                    <p style={{ color: "red" }}>{errors.username}</p>
                  )}
                </div>

                <div className="mb-3">
                  <label>Password</label>

                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    value={farmUser.password}
                    onChange={onChangeHandler}
                  />

                  {errors.password && (
                    <p style={{ color: "red" }}>{errors.password}</p>
                  )}
                </div>

                <div className="mb-3">
                  <label>Confirm Password</label>

                  <input
                    type="password"
                    className="form-control"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />

                  {errors.confirmPassword && (
                    <p style={{ color: "red" }}>
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                <div className="mb-3">
                  <label>Personal Name</label>

                  <input
                    type="text"
                    placeholder="Personal Name"
                    name="personalName"
                    className="form-control"
                    value={farmUser.personalName}
                    onChange={onChangeHandler}
                  />

                  {errors.personalName && (
                    <p style={{ color: "red" }}>
                      {errors.personalName}
                    </p>
                  )}
                </div>

                <div className="mb-3">
                  <label>Email</label>

                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    className="form-control"
                    value={farmUser.email}
                    onChange={onChangeHandler}
                  />

                  {errors.email && (
                    <p style={{ color: "red" }}>{errors.email}</p>
                  )}
                </div>

                <div className="text-center">

                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleValidation}
                  >
                    Register
                  </button>

                </div>

              </form>

              {flag && (
                <div className="text-center mt-4">

                  <p style={{ color: "green" }}>
                    Registration Successful
                  </p>

                  <button
                    className="btn btn-success"
                    onClick={returnBack}
                  >
                    Go to Login
                  </button>

                </div>
              )}

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default RegisterUser;