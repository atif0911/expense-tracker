import {
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { useState, useEffect } from "react"; // <--- Import these

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  // 1. Initialize State from LocalStorage
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // 2. Effect to apply the theme to the HTML tag
  useEffect(() => {
    // This sets <html data-theme="dark"> or "light"
    document.documentElement.setAttribute("data-theme", theme);
    // Save to storage
    localStorage.setItem("theme", theme);
  }, [theme]);

  // 3. Toggle Function
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">ExpenseTracker</Link>
      </div>
      <ul>
        {/* THEME TOGGLE BUTTON */}
        <li style={{ marginRight: "20px" }}>
          <button
            onClick={toggleTheme}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "1.2rem",
              color: "var(--text-color)",
              display: "flex",
              alignItems: "center",
            }}
          >
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </button>
        </li>

        {user ? (
          <li>
            <button className="btn" onClick={onLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link to="/login">
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to="/register">
                <FaUser /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
