import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
// import Layout from "./components/layout/Layout";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Registration from "./components/registration/Registration";
import Tasks from "./components/tasks/Tasks";
import Users from "./components/users/Users";
import Header from "./components/layout/header/Header";
import Footer from "./components/layout/footer/Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container">
          <Switch>
            <Route path="/tasks">
              <Tasks />
            </Route>
            <Route path="/users">
              <Users />
            </Route>
            <Route path="/registration">
              <Registration />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
        </div>
        <Footer content="Ivan Georgiev - 1601681030" />
      </div>
    </Router>
  );
}

export default App;
