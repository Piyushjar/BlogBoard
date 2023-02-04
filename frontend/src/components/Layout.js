import { Outlet } from "react-router-dom";
import Header from "./Header";

function Layout() {
  return (
    <main>
      <Header />
      <div className="post-section">
        <Outlet />
      </div>
    </main>
  );
}

export default Layout;
