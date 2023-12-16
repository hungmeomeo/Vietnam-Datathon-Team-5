import Homepage from "../page/Homepage/Homepage";
import Search from "../page/Searchpage/Searchpage";
import AboutUs from "../page/Aboutpage/About";
import { Route, Routes, useLocation } from "react-router-dom";

const animatedroutes = () => {
  const location = useLocation();
  return (
    <div>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/history" element={<Search />}></Route>
        <Route path="/test" element={<AboutUs />}></Route>
      </Routes>
    </div>
  );
};

export default animatedroutes;
