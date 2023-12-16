import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import AnimatedRoutes from "./constants/routes";

const App = () => {
  return (
    <div>
      <Router>
        <AnimatedRoutes></AnimatedRoutes>
      </Router>

      {/* Rest of your application content */}
    </div>
  );
};

export default App;
