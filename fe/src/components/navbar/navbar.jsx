import React, { useState } from "react";
import { HiLightBulb } from "react-icons/hi";
import "./navbar.css";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <nav>
        <ul>
          <li>
            <div className="navbarLogo" style={{ marginRight: "500px" }}>
              <HiLightBulb
                style={{
                  color: "var(--text-primary)",
                  fontSize: "40px",
                }}
              />
              <span style={{ color: "var(--text-primary)" }}>Gro</span>cify
            </div>
          </li>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/history">History</a>
          </li>
          <li>
            <a href="/test">Tryout</a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
