import "./hero.css";
import React from "react";

const Hero = () => {
  return (
    <div className="homepageHero ">
      <h1 style={{ fontSize: "64px" }}>
        <span style={{ color: "var(--text-primary)" }}>Gro</span>cify
      </h1>
      <h2
        style={{
          color: "var(--text-primary)",
          textAlign: "center",
          fontSize: "36px",
        }}
      >
        Hệ thống giúp hỗ trợ kinh doanh
      </h2>
      <p
        style={{
          textAlign: "center",
          fontSize: "20px",
          fontWeight: "500",
          marginTop: "20px",
        }}
      >
        Hệ thống tiên phong lĩnh vực phân tích hành vi người dùng trong ngành
        hàng bán lẻ
      </p>
    </div>
  );
};
export default Hero;
