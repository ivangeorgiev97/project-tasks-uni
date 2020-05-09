import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
// import Layout from "./components/layout/Layout";
import Home from "./components/home/Home";
import Login from "./containers/users/login/Login";
import Registration from "./containers/users/registration/Registration";
import Tasks from "./containers/tasks/tasks/Tasks";
import Users from "./containers/users/users/Users";
import Header from "./containers/layout/header/header/Header";
import Footer from "./components/layout/footer/Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AddUser from "./containers/users/add/AddUser";
import EditUser from "./containers/users/edit/EditUser";
import AddTask from "./containers/tasks/add/AddTask";
import EditTask from "./containers/tasks/edit/EditTask";
import { getUsers } from "./store/users/actions";
import { getTasks } from "./store/tasks/actions"
import { connect } from "react-redux";
import LoggedInRoute from "./middle/LoggedInRoute";
// import NotLoggedInRoute from "./middle/NotLoggedInRoute";

function App({dispatch}) {
  useEffect(() => {
    dispatch(getUsers())
    dispatch(getTasks())
  })

  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container my-2">
          <Switch>
            <Route path="/tasks">
              <Tasks />
            </Route>
            <LoggedInRoute exact path="/addTask" component={AddTask} />
            <LoggedInRoute exact path="/editTask/:taskId" component={EditTask} /> 
            <Route path="/users">
              <Users />
            </Route>
            <LoggedInRoute exact path="/addUser" component={AddUser} />
            <LoggedInRoute exact path="/editUser/:userId" component={EditUser} />
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
        <Footer />
      </div>
    </Router>
  );
}

export default connect()(App);
