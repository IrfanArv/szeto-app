import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Customer from "./pages/Customer";
import PolaBintang from "./pages/PolaBintang";

import { Provider } from "react-redux";
import store from "./store"; 
 
const AppRouter = () => ( 
  <Provider store={store}>
    <Router>
      <div>
        <Route exact path="/" component={Customer} />
        <Route exact path="/polabintang" component={PolaBintang} />
      </div>
    </Router>
  </Provider>
);

export default AppRouter;
