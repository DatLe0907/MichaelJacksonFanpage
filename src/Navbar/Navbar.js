import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCrown } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useGame } from "../pages/context/PointsContext"; 
import "./Navbar.css";
import "./Navbar-responsive.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { points } = useGame(); // ✅ Lấy điểm từ context

  return (
    <nav>
      <div id="title">
        <h1>
          <span>Michael</span>
          <FontAwesomeIcon icon={faCrown} />
          <span>Jackson</span>
        </h1>

        {/* Hiển thị điểm game */}
        <div className="points">
          Points: <b>{points}</b>
        </div>
      </div>

      {/* Nút mở menu */}
      <i className="menu-bar" onClick={() => setMenuOpen(!menuOpen)}>
        <FontAwesomeIcon icon={faBars} />
      </i>

      {/* Menu hiển thị khi state "menuOpen" là true */}
      <div className={`menu ${menuOpen ? "active" : ""}`}>
        <div className="home">
          <Link to="/">Home</Link>
        </div>
        <div className="information">
          <Link to="/music">Music</Link>
        </div>
        <div className="shop">
          <Link to="/shop">Shop</Link>
        </div>
        <div className="game">
          <Link to="/game">Game</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
