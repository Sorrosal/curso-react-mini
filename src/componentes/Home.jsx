import { Header } from "./Header.jsx";
import { Footer } from "./Footer.jsx";
import { Outlet } from "react-router-dom";

export function Home() {
  return (
    <div className="container d-flex flex-column justify-content-between todo">
      <Header></Header>
      <div className="flex-grow-1">
        <Outlet />
      </div>
      <Footer></Footer>
    </div>
  );
}
