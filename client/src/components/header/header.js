import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { server } from "../../constants";
import { connect } from "react-redux";
import { imageUrl } from "./../../constants";

class Header extends Component {
  
  isProfile = () => {
    return this.props.profileReducer.result !== null;
  };

  render() {
    return (
      <header className="main-header">
        {/* Logo */}
        <a href="index2.html" className="logo">
          {/* mini logo for sidebar mini 50x50 pixels */}
          <span className="logo-mini">
            <b>A</b>LT
          </span>
          {/* logo for regular state and mobile devices */}
          <span className="logo-lg">
            <b>Aboss</b>LTE
          </span>
        </a>
        {/* Header Navbar: style can be found in header.less */}
        <nav className="navbar navbar-static-top">
          {/* Sidebar toggle button*/}
          <a
            href="#"
            className="sidebar-toggle"
            data-toggle="push-menu"
            role="button"
          >
            <span className="sr-only">Toggle navigation</span>
          </a>
          {/* Navbar Right Menu */}
          <div className="navbar-custom-menu">
            <ul className="nav navbar-nav">
              <li className="dropdown user user-menu">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                  
                <img
                    className="user-image"
                    alt="User Image"
                    src={`${imageUrl}/images/${
                    this.isProfile() && this.props.profileReducer.result.image}?dummy=${Math.random()}`}
                  />   
                  <span className="hidden-xs">{this.isProfile() && this.props.profileReducer.result.firstname}{" "}
                {this.isProfile() && this.props.profileReducer.result.lastname}</span>
                </a>
                <ul className="dropdown-menu">
                  {/* User image */}
                  <li className="user-header">
                  <img
                    className="img-circle"
                    alt="User Image"
                    src={`${imageUrl}/images/${
                    this.isProfile() && this.props.profileReducer.result.image}?dummy=${Math.random()}`}
                  />   
                    <p>
                    {this.isProfile() && this.props.profileReducer.result.firstname}{" "}{this.isProfile() && this.props.profileReducer.result.lastname}
                      <small>Born on {" "}{this.isProfile() && this.props.profileReducer.result.birthdate}</small>
                    </p>
                  </li>
                  {/* Menu Body */}
                  <li className="user-body">
                    <div className="row">
                     
                      <div className="col-xs-4 text-center">
                        <Link to ="/showdevice">DEVICE</Link>
                      </div>
                      <div className="col-xs-4 text-center">
                        <Link to ="/note">NOTE EDITOR</Link>
                      </div>

                      <div className="col-xs-4 text-center">
                        <Link to ="/covid">COVID BOARD</Link>
                      </div>
                    </div>
                    {/* /.row */}
                  </li>
                  {/* Menu Footer*/}
                  <li className="user-footer">
                    <div className="pull-left">
                      <a href="/profile" className="btn btn-default btn-flat">
                        Profile
                      </a>
                    </div>
                    <div
                      className="pull-right"
                      onClick={() => {
                        this.props.history.push("/login");
                        localStorage.clear();
                        this.props.appReducer.app.forceUpdate();
                      }}
                    >
                      <a href="#" className="btn btn-default btn-flat">
                        Sign out
                      </a>
                    </div>
                  </li>
                </ul>
              </li>
              {/* Control Sidebar Toggle Button */}
              <li>
                <Link to="/profile" data-toggle="control-sidebar">
                  <i className="fa fa-gears" />
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}

const mapStateToProps = ({ appReducer, profileReducer }) => ({
  appReducer,
  profileReducer,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
