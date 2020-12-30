import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as actions from "./../../actions/admin.action";
import { getAllNote } from "./../../actions/note.action"
import { connect } from "react-redux";
import "./adminpage.css";
import Moment from "react-moment";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { imageUrl } from "./../../constants";

const MySwal = withReactContent(Swal);

class Adminpage extends Component {
  
  componentDidMount(){
    this.props.getAllUser()
    this.props.getAllNote()
  }

  isProfile = () => {
    return this.props.adminReducer.result !== null;
  };

  isNote = () => {
    return this.props.noteReducer.result !== null;
  };

  renderRows = () => {
    const {result} = this.props.adminReducer
    let num = 1;
    console.log(result)
    if (result != null){
    return result.map((d) => (
      <tr>
          <th scope="row">{num++}</th>
          <th><img
                    className="profile-user-img img-responsive img-circle"
                    alt="User profile picture"
                    src={`${imageUrl}/images/${d.image}?dummy=${Math.random()}`}
                    style={{ maxWidth: 200 }}
                  /></th>
          <th>{d.name}</th>
          <th>{d.email}</th>
          <th>{d.firstname}</th>
          <th>{d.lastname}</th>
          <th>{d.birthdate}</th>
          <th><Moment format="DD/MM/YYYY">{d.date}</Moment></th>
          <th><button
              onClick={() => {
                MySwal.fire({
                  title: "Are you sure to delete?",
                  text: "You won't be able to revert this!",
                  type: "warning",
                  showCancelButton: true,
                  confirmButtonText: "Yes, delete it!",
                  cancelButtonText: "No, cancel!",
                }).then((result) => {
                  if (result.value) {
                    this.props.deleteUser(this.props.history, d._id);
                  }
                });
              }}
              type="button"
              className="btn btn-danger"
            >
              Delete
            </button></th>
      </tr>
    ));
  }};

  render() {
    return (
      <div className="content-wrapper">
        <section className="content-header">
          <h1>ADMIN management</h1>
        </section>
        <section className="content">
          <div className="col-xs-12">
            <div className="box">
              <div className="box-body">
                <div className="row">
                  <div className="col-md-3 col-sm-6 col-xs-12">
                    <div className="info-box">
                      <span className="info-box-icon bg-aqua">
                        <i className="ion ion-ios-peoples-peoples" />
                      </span>
                      <div className="info-box-content">
                        <span className="info-box-text">Number of Account</span>
                        <span className="info-box-number">
                        {this.isProfile() && this.props.adminReducer.result.length}<small> accounts</small>
                        </span>
                      </div>
                      {/* /.info-box-content */}
                    </div>
                    {/* /.info-box */}
                  </div>
                  {/* /.col */}
                  <div className="col-md-3 col-sm-6 col-xs-12">
                    <div className="info-box">
                      <span className="info-box-icon bg-red">
                        <i className="ion ion-ios-phone-phone" />
                      </span>
                      <div className="info-box-content">
                        <span className="info-box-text">Number of device</span>
                        <span className="info-box-number">200</span>
                      </div>
                      {/* /.info-box-content */}
                    </div>
                    {/* /.info-box */}
                  </div>
                  {/* /.col */}
                  {/* fix for small devices only */}
                  <div className="clearfix visible-sm-block" />
                  <div className="col-md-3 col-sm-6 col-xs-12">
                    <div className="info-box">
                      <span className="info-box-icon bg-green">
                        <i className="ion ion-ios-book-book" />
                      </span>
                      <div className="info-box-content">
                        <span className="info-box-text">number of note</span>
                        <span className="info-box-number">{this.isNote() && this.props.noteReducer.result.length}</span>
                      </div>
                      {/* /.info-box-content */}
                    </div>
                    {/* /.info-box */}
                  </div>
                  {/* /.col */}
                  <div className="col-md-3 col-sm-6 col-xs-12">
                    <div className="info-box">
                      <span className="info-box-icon bg-yellow">
                        <i className="ion ion-ios-people-people" />
                      </span>
                      <div className="info-box-content">
                        <span className="info-box-text">New Members</span>
                        <span className="info-box-number">1</span>
                      </div>
                      {/* /.info-box-content */}
                    </div>
                    {/* /.info-box */}
                  </div>
                  {/* /.col */}
                </div>
              </div>
            </div>
          </div>

          <div class="box-header with-border">
            <div className="row">
              <div className="col-xs-12">
                {/* /.box */}
                <div className="box">
                  {/* /.box-header */}
                  <div className="table-responsive mailbox-messages">
                    <h4>SHOW ALL USER</h4>
                    <table className="table table-bordered table-striped">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Profile Picture</th>
                          <th>UserID</th>
                          <th>Email</th>
                          <th>Firstname</th>
                          <th>Lastname</th>
                          <th>Birthdate</th>
                          <th>CreateDate</th>
                          <th>ACTION</th>
                        </tr>
                      </thead>
                      <tbody>{this.renderRows()}</tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = ({ profileReducer, adminReducer,noteReducer }) => ({
  profileReducer,
  adminReducer,
  noteReducer
});

const mapDispatchToProps = {
  ...actions, getAllNote
};

export default connect(mapStateToProps, mapDispatchToProps)(Adminpage);
