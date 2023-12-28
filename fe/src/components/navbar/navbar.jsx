import React, { useState } from "react";
import { HiLightBulb } from "react-icons/hi";
import styles from "./navbar.module.css";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <nav className={styles.nav}>
        <ul className={styles.ul}>
          <li>
            <div className={styles.navbarLogo} style={{ marginRight: "400px" }}>
              <HiLightBulb
                style={{
                  color: "var(--text-primary)",
                  fontSize: "40px",
                }}
              />
              <span style={{ color: "var(--text-primary)" }}>Groc</span>ify
            </div>
          </li>
          <li>
            <a href="/test" className={styles.link}>
              Thống kê
            </a>
          </li>
          <li>
            <a href="/" className={styles.link}>
              Phân tích
            </a>
          </li>
          <li>
            <a href="/history" className={styles.link}>
              Lịch sử
            </a>
          </li>
          
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
