import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import AuthRoutes from "./components/AuthRoutes";
import { UserContextProvider } from "./context/UserContext";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import PostPage from "./pages/PostPage";
import RegisterPage from "./pages/RegisterPage";

import Board from "./components/board/Board";

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<AuthRoutes />}>
            <Route path="/create" element={<CreatePost />} />
            <Route path="/post/:id" element={<PostPage />} />
            <Route path="/edit/:id" element={<EditPost />} />
            {/* whiteboard */}
          </Route>
          <Route path="/board/:id" element={<Board />} />
        </Route>
        <Route
          path="*"
          element={
            <div>
              <h2 style={{ "text-align": "center" }}>Not found 404</h2>{" "}
            </div>
          }
        />
      </Routes>
    </UserContextProvider>
  );
}

export default App;
