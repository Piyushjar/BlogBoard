import { useContext, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    }).then((res) => {
      res.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch("http://localhost:4000/logout", {
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
          Blogger
        </Link>
        <nav>
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
        </nav>
      </header>
      <hr />
    </>
  );
}

export default Header;
