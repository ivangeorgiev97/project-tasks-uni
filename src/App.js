import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
// import Layout from "./components/layout/Layout";
import Home from "./components/home/Home";
import Login from "./containers/login/Login";
import Registration from "./containers/registration/Registration";
import Tasks from "./components/tasks/Tasks";
import Users from "./components/users/Users";
import Header from "./components/layout/header/Header";
import Footer from "./components/layout/footer/Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const headerProps = {
  headerTitle: "Tasks uni project",
  leftLinks: [
    { id: 1, path: "/home", text: "Home", isVisible: true },
    { id: 2, path: "/tasks", text: "Tasks", isVisible: true },
    { id: 3, path: "/users", text: "Users", isVisible: true },
  ],
  rightLinks: [
    { id: 4, path: "/registration", text: "Registration", isVisible: true },
    { id: 5, path: "/login", text: "Login", isVisible: true },
    { id: 5, path: "/logout", text: "Logout", isVisible: false }
  ]
};

const footerProps = {
  content: "Ivan Georgiev - 1601681030",
};

function App() {
  return (
    <Router>
      <div className="App">
        <Header
          headerTitle={headerProps.headerTitle}
          leftLinks={headerProps.leftLinks}
          rightLinks={headerProps.rightLinks}
        />
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
        <Footer content={footerProps.content} />
      </div>
    </Router>
  );
}

export default App;
