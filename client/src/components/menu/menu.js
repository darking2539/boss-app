import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./../../actions/profile.action";
import { imageUrl } from "./../../constants";

class Menu extends Component {
  
  adminLogin = ()=>{

      if(localStorage.getItem('userid') == "admin@gmail.com"){
        return true
      }else{
      return false
  }
}
  
  renderAdmin = () => {
    return(
      <li>
        <Link to="/admin">
          <i className="fa fa-users" /> <span>ADMIN</span>
        </Link>
      </li>
    )
  }
  
  isProfile = () => {
    return this.props.profileReducer.result !== null;
  };

  render() {
    return (
      <aside className="main-sidebar">
        {/* sidebar: style can be found in sidebar.less */}
        <section className="sidebar">
          {/* Sidebar user panel */}
          <div className="user-panel">
            <div className="pull-left image">
              <img
                className="img-circle"
                alt="User Image"
                src={`${imageUrl}/images/${
                  this.isProfile() && this.props.profileReducer.result.image
                }?dummy=${Math.random()}`}
              />
            </div>
            <div className="pull-left info">
              <p>
                {this.isProfile() && this.props.profileReducer.result.firstname}{" "}
                {this.isProfile() && this.props.profileReducer.result.lastname}
              </p>
              <a href="#">
                <i className="fa fa-circle text-success" /> Online
              </a>
            </div>
          </div>
          {/* search form */}
          <form action="#" method="get" className="sidebar-form">
            <div className="input-group">
              <input
                type="text"
                name="q"
                className="form-control"
                placeholder="Search..."
              />
              <span className="input-group-btn">
                <button
                  type="submit"
                  name="search"
                  id="search-btn"
                  className="btn btn-flat"
                >
                  <i className="fa fa-search" />
                </button>
              </span>
            </div>
          </form>
          {/* /.search form */}
          {/* sidebar menu: : style can be found in sidebar.less */}
          <ul className="sidebar-menu" data-widget="tree">
            <li className="header">MAIN PAGE</li>
            <li className="treeview">
              <a href="/profile">
                <i className="fa fa-dashboard" /> <span>DEVICE</span>
                <span className="pull-right-container">
                  <i className="fa fa-angle-left pull-right" />
                </span>
              </a>
              <ul className="treeview-menu">
                <li>
                  <Link to="/stock">
                    <i className="fa fa-circle-o" /> Main Device
                  </Link>
                </li>
                <li>
                  <Link to="/showdevice">
                    <i className="fa fa-circle-o" /> Manage Device
                  </Link>
                </li>
                <li>
                  <Link to="/adddevice">
                    <i className="fa fa-circle-o" /> Add Device
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/note">
                <i className="fa fa-pencil-square-o" /> <span>NOTE EDITOR</span>
                </Link> 
            </li>

            <li>
              <Link to="/profile">
                <i className="fa fa-user" /> <span>PROFILE</span>
              </Link>
            </li>

            <li>
              <Link to="/covid">
                <i className="fa fa-pie-chart" /> <span>COVID DASHBOARD</span>
              </Link>
            </li>

            {/* Linktoadmin */}
            {this.adminLogin() &&this.renderAdmin()}

            <li className="header">WEBSITE BY EDITOR</li>
            <li>
              <a href="https://www.youtube.com/channel/UC1k_K8H9EOOKtU7WLRA1y0w">
                <i className="fa fa-youtube-play" /> <span>Youtube My Channel</span>
              </a>
            </li>
            <li>
              <a href="https://www.facebook.com/Abosszz/">
                <i className="fa fa-facebook-official" />{" "}
                <span>Facebook</span>
              </a>
            </li>
            <li>
              <a href="https://twitter.com/bossspd">
                <i className="fa fa-twitter" />{" "}
                <span>Twitter</span>
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/suphadet/">
                <i className="fa fa-linkedin-square" />{" "}
                <span>Linkedin</span>
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/abosszz/">
                <i className="fa fa-instagram" />{" "}
                <span>Instagram</span>
              </a>
            </li>
          </ul>
        </section>
        {/* /.sidebar */}
      </aside>
    );
  }
}

const mapStateToProps = ({ profileReducer, appReducer }) => ({
  profileReducer,
  appReducer,
});

const mapDispatchToProps = {
  ...actions,
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
