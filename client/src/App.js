import React, { Component } from "react";
import Footer from "./components/footer/footer";
import Header from "./components/header";
import Login from "./components/login/login";
import Menu from "./components/menu/menu";
import Register from "./components/register/register";
import Stock from "./components/stock/stock";
import AddDevice from "./components/addDevice/addDevice";
import ShowDevice from "./components/showdevice/showdevice";
import MainProfile from "./components/mainprofile/mainprofile";
import AddNote from "./components/addnote/addnote";
import MainNote from "./components/mainnote/mainnote";
import noteViewver from "./components/noteviewver/noteviewver";
import Editnote from "./components/editnote/editnote";
import Adminpage from "./components/adminpage/adminpage";
import Covid from "./components/coviddashboard/coviddashboard"

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { server, YES } from "./constants";
import { setApp } from "./actions/app.action";
import { connect } from "react-redux";


const isLoggedIn = () => {
  return localStorage.getItem(server.LOGIN_PASSED) === YES;
};

// Protected Route
const SecuredRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isLoggedIn() === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

class App extends Component {
  //Set object App to Redux
  componentDidMount() {
    this.props.setApp(this);
  }

  redirectToLogin = () => {
    return <Redirect to="login" />;
  };

  render() {
    return (
      <Router>
        <div>
          {isLoggedIn() && <Header />}
          {isLoggedIn() && <Menu />}
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <SecuredRoute path="/profile" component={MainProfile} />
            <SecuredRoute path="/Stock" component={Stock} />
            <SecuredRoute path="/addDevice" component={AddDevice} />
            <SecuredRoute path="/showdevice" component={ShowDevice} />
            <SecuredRoute path="/note" component={MainNote} />
            <SecuredRoute path="/addnote" component={AddNote} />
            <SecuredRoute path="/editnote" component={Editnote} />
            <SecuredRoute path="/noteviewver" component={noteViewver} />
            <SecuredRoute path="/admin" component={Adminpage} />
            <SecuredRoute path="/covid" component={Covid} />
            <Route exact={true} path="/" component={this.redirectToLogin} />
            <Route path="*" component={this.redirectToLogin} />
          </Switch>
          {isLoggedIn() && <Footer />}
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  setApp,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
