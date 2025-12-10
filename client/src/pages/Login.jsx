import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
// Redux imports to talk to our global store
import { useSelector, useDispatch } from "react-redux";
// Router imports to move between pages
import { useNavigate } from "react-router-dom";
// UI Notification import
import { toast } from "react-toastify";
// Our custom actions
import { login, reset } from "../features/auth/authSlice";

function Login() {
  // 1. Local State for the form inputs
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 2. Select data from Global Store
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  // 3. Watch for changes
  useEffect(() => {
    if (isError) {
      toast.error(message); // Show red error popup
    }

    if (isSuccess || user) {
      navigate("/"); // Redirect to Dashboard if logged in
    }

    dispatch(reset()); // Reset the flags (isError, isSuccess) so they don't persist
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  // 4. Handle typing in inputs
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // 5. Handle Form Submit
  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Login and start managing your budget</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Enter password"
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
