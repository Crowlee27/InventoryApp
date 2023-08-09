import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { SearchAppBar } from "./components/navBars/appBar/appBar";
import { PageName } from "./components/pageName/pageName";
import { AppRoutes } from "./routes/routes";

function App() {
  return (
    <Router>
      <div>
        <SearchAppBar />
        <PageName />
        <main className="gridContainer">
          <AppRoutes />
        </main>
      </div>
    </Router>
  );
}

export default App;
