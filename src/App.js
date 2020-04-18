import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
// import Layout from "./components/layout/Layout";
import Home from "./components/home/Home";
import Login from "./containers/users/login/Login";
import Registration from "./containers/users/registration/Registration";
import Tasks from "./components/tasks/Tasks";
import Users from "./containers/users/users/Users";
import Header from "./components/layout/header/Header";
import Footer from "./components/layout/footer/Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Logout from "./containers/users/logout/Logout";
import AddUser from "./containers/users/add/AddUser";
import EditUser from "./containers/users/edit/EditUser";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container my-2">
          <Switch>
            <Route path="/tasks">
              <Tasks />
            </Route>
            <Route path="/users">
              <Users />
            </Route>
            <Route path="/addUser">
              <AddUser />
            </Route>
            <Route path="/editUser/:userId">
              <EditUser />
            </Route>
            <Route path="/registration">
              <Registration />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/logout">
              <Logout />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
