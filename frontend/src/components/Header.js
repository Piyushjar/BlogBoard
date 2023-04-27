import { useContext, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Nav from "react-bootstrap/Nav";

function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/profile`, {
      credentials: "include",
    }).then((res) => {
      res.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch(`${process.env.REACT_APP_API_URL}/logout`, {
      credentials: "include",
      method: "POST",
    });
    localStorage.clear();
    setUserInfo(null);
    toast("Logged out sucessfully!");
  }

  const username = userInfo?.username;

  return (
    <>
      <ToastContainer position="bottom-right" />
      <header>
        <Link to="/" className="logo">
          𝔹𝕝𝕠𝕘𝔹𝕠𝕒𝕣𝕕
        </Link>
        <Nav>
          {username && (
            <>
              <Link to="/create">Create post 🚀</Link>
              <Link onClick={logout}>Logout 🔒</Link>
            </>
          )}
          {!username && (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </Nav>
      </header>
      <hr />
    </>
  );
}

export default Header;
