import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import "./App.css";

import Listings from "../listings/pages/Listings";
import AddListing from "../listings/pages/AddListings";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Listings />
        </Route>
        <Route path="/new" exact>
          <AddListing />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
