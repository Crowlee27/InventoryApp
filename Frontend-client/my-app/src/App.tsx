import React from "react";
import { ApolloProvider } from "@apollo/client"
import { apolloClient } from "./components/graphQl/queries";
import { BrowserRouter as Router } from "react-router-dom";
import { SearchAppBar } from "./components/navBars/appBar/appBar";
import { PageName } from "./components/pageName/pageName";
import { AppRoutes } from "./routes/routes";

function App() {
  return (
    <ApolloProvider client={apolloClient}>
    <Router>
      <div className="container">
        <SearchAppBar />
        <PageName />
        <main className="gridContainer">
          <AppRoutes />
        </main>
      </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
