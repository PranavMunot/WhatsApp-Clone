import React from "react";
import "./App.css";
import PersonalChat from "./components/personalChat";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Sidebar from "./components/Sidebar";
import { useStateValue } from "./StateProvider";

function App() {
  let [{ user }, dispatch] = useStateValue();

  return (
    <div className="App">
      {!user ? (
        <Login />
      ) : (
        <section className="mainsection">
          <Router>
            <Sidebar />
            <Switch>
              <Route path="/room/:roomid">
                <PersonalChat />
              </Route>
              <Route path="/">
                {/* Signup page */}
                <PersonalChat msg />
              </Route>
            </Switch>
          </Router>
        </section>
      )}
    </div>
  );
}

export default App;
