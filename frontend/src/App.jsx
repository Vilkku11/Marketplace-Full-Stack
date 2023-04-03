import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import "./App.css";

import Listings from "../listings/pages/Listings";
import AddListing from "../listings/pages/AddListings";
import Authenticate from "../users/pages/Authenticate";

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
        <Route path="/auth" exact>
          <Authenticate />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
