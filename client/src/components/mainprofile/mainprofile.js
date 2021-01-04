import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "./../../actions/profile.action";
import { Formik } from "formik";
import "./mainprofile.css";
import { imageUrl } from "./../../constants";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

class Mainprofile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
      userid: localStorage.getItem('iduser')
    };
  }

  async componentDidMount() {
    this.props.ShowProfile(this.props.history)   
  }

  isProfile = () => {
    return this.props.profileReducer.result !== null;
  };

  showError = ()=>{

    return(
      <div className="alert alert-danger alert-dismissible">
      <button type="button" className="close" data-dismiss="alert" aria-hidden="true"  >×</button>
      <h4><i className="icon fa fa-ban" />Error!</h4> 
      <p>{this.props.changepwReducer.data.field}</p>
      <p>{this.props.changepwReducer.data.password}</p>
      </div>
    )
  }

  showSuccess = ()=>{
    return(
      <div class="alert alert-success alert-dismissible">
      <button type="button" class="close" data-dismiss="alert" aria-hidden="true" refresh="true" >×</button>
      <h4><i class="icon fa fa-check"></i> Change Password</h4>Successful
      </div>
    )
  }

  showForm = ({
    values,
    handleChange,
    handleSubmit,
    setFieldValue,
    isSubmitting,
  }) => {
    return (
      <form className="form-horizontal" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="inputName" className="col-sm-2 control-label">
            Username
          </label>
          <div className="col-sm-10">
            <input
              type="email"
              className="form-control"
              id="inputName"
              value={this.isProfile() && this.props.profileReducer.result.name}
              readOnly
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="inputEmail" className="col-sm-2 control-label">
            Email
          </label>
          <div className="col-sm-10">
            <input
              type="email"
              className="form-control"
              id="inputEmail"
              value={this.isProfile() && this.props.profileReducer.result.email}
              readOnly
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="inputName" className="col-sm-2 control-label">
            First name
          </label>
          <div className="col-sm-10">
            <input
              name="firstname"
              onChange={handleChange}
              type="text"
              className="form-control"
              id="inputName"
              placeholder="First name"
              value={values.firstname}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="inputName" className="col-sm-2 control-label">
            Last name
          </label>
          <div className="col-sm-10">
            <input
              name="lastname"
              onChange={handleChange}
              type="text"
              className="form-control"
              id="inputName"
              placeholder="Last name"
              value={values.lastname}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="inputSkills" className="col-sm-2 control-label">
            BirthDate
          </label>
          <div className="col-sm-10">
            <div class="input-group date">
              <input
                name="birthdate"
                onChange={handleChange}
                class="form-control pull-right"
                placeholder="DD/MM/YYYY Format"
                id="birthdate"
                value={values.birthdate}
              />
              <div class="input-group-addon">
                <i class="fa fa-calendar"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="form-group" style={{ marginTop: 15 }}>
          <label htmlFor="inputSkills" className="col-sm-2 control-label">
            Profile Picture
          </label>
          <div className="col-sm-10">
            {this.showPreviewImage(values)}
            <div className="wrap-upload-buttons control-label">
              <ul className="btn-nav row" id="rcorners">
                <li>
                  <span style={{ marginLeft: 2 }}>
                    <img
                      src={`${process.env.PUBLIC_URL}/images/ic_photo.png`}
                      style={{ width: 25, height: 20 }}
                    />
                    <span style={{ color: "#00B0CD", marginLeft: 10 }}>
                      {" "}
                      Add Picture{" "}
                    </span>
                    <input
                      onChange={(e) => {
                        e.preventDefault();
                        setFieldValue("file", e.target.files[0]); // for upload
                        setFieldValue(
                          "file_obj",
                          URL.createObjectURL(e.target.files[0])
                        ); // for preview image
                      }}
                      type="file"
                      name="image"
                      className="picupload"
                      multiple
                      accept="image/*"
                      style={{ padding: "20px 0" }}
                    />
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-10">
            <button
              type="submit"
              className="btn btn-danger"
              disabled={isSubmitting}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    );
  };

  showPreviewImage = (values) => {
    if (values.file_obj) {
      return <img src={values.file_obj} style={{ height: 100 }} />;
    }
  };

  render() {
    return (
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <section className="content-header">
          <h1>User Profile</h1>
        </section>
        {/* Main content */}
        <section className="content">
          <div className="row">
            <div className="col-md-3">
              {/* Profile Image */}
              <div className="box box-primary">
                <div className="box-body box-profile">
                  <img
                    className="profile-user-img img-responsive img-circle"
                    alt="User profile picture"
                    src={`${imageUrl}/images/${
                      this.isProfile() && this.props.profileReducer.result.image
                    }?dummy=${Math.random()}`}
                    style={{ maxWidth: 200 }}
                  />

                  <h3 className="profile-username text-center">
                    {this.isProfile() &&
                      this.props.profileReducer.result.firstname}{" "}
                    {this.isProfile() &&
                      this.props.profileReducer.result.lastname}
                  </h3>
                  <p className="text-muted text-center">
                    {this.isProfile() && this.props.profileReducer.result.email}
                  </p>
                </div>
                {/* /.box-body */}
              </div>
              {/* /.box */}
              {/* About Me Box */}
              <div className="box box-primary">
                <div className="box-header with-border">
                  <h3 className="box-title">About Me</h3>
                </div>
                {/* /.box-header */}
                <div className="box-body">
                  <div class="box-header with-border">
                    <strong>
                      <i className="fa fa-book margin-r-5" /> Education
                    </strong>
                    <div class="box-tools pull-right">
                      <button
                        onClick={() =>
                          MySwal.fire({
                            title: "Edit Education",
                            text: "You won't be able to revert this!",
                            html: `
                                <input class="swal2-input" id="education" type="text" placeholder="Enter your New Education" /><br />
                                  `,
                            type: "warning",
                            showCancelButton: true,
                            confirmButtonText: "CONFIRM",
                            cancelButtonText: "CANCEL",
                          }).then((result) => {
                            const data = {
                              education: document.getElementById("education")
                                .value,
                              userid: this.props.profileReducer.result._id,
                            };

                            if (result.value) {
                              console.log(data);
                              this.props.editEducation(data);
                              window.location.reload();
                            }
                          })
                        }
                        type="button"
                        class="btn btn-box-tool"
                        title="Edit"
                        data-original-title="Collapse"
                      >
                        Edit <i class="fa fa-pencil-square-o"></i>
                      </button>
                    </div>
                    <p className="text-muted">
                      {this.isProfile() &&
                        this.props.profileReducer.result.education}
                    </p>
                  </div>

                  <div class="box-header with-border">
                    <strong>
                      <i className="fa fa-map-marker margin-r-5" /> Location
                    </strong>
                    <div class="box-tools pull-right">
                      <button
                        onClick={() =>
                          MySwal.fire({
                            title: "Edit Location",
                            text: "You won't be able to revert this!",
                            html: `
                              <input class="swal2-input" id="location" type="text" placeholder="Enter your New Location" /><br />
                                `,
                            type: "warning",
                            showCancelButton: true,
                            confirmButtonText: "CONFIRM",
                            cancelButtonText: "CANCEL",
                          }).then((result) => {
                            const data = {
                              location: document.getElementById("location")
                                .value,
                              userid: this.props.profileReducer.result._id,
                            };

                            if (result.value) {
                              console.log(data);
                              this.props.editLocation(data);
                              window.location.reload();
                            }
                          })
                        }
                        type="button"
                        class="btn btn-box-tool"
                        title="Edit"
                        data-original-title="Collapse"
                      >
                        Edit <i class="fa fa-pencil-square-o"></i>
                      </button>
                    </div>
                    <p className="text-muted">
                      {this.isProfile() &&
                        this.props.profileReducer.result.location}
                    </p>
                  </div>

                  <div class="box-header with-border">
                    <strong>
                      <i className="fa fa-pencil margin-r-5" /> Skills
                    </strong>
                    <div class="box-tools pull-right">
                      <button
                        onClick={() =>
                          MySwal.fire({
                            title: "Edit Skills",
                            text: "You won't be able to revert this!",
                            html: `
                                <input class="swal2-input" id="skills" type="text" placeholder="Enter your New Skills" /><br />
                                  `,
                            type: "warning",
                            showCancelButton: true,
                            confirmButtonText: "CONFIRM",
                            cancelButtonText: "CANCEL",
                          }).then((result) => {
                            const data = {
                              skills: document.getElementById("skills").value,
                              userid: this.props.profileReducer.result._id,
                            };

                            if (result.value) {
                              console.log(data);
                              this.props.editSkills(data);
                              window.location.reload();
                            }
                          })
                        }
                        type="button"
                        class="btn btn-box-tool"
                        title="Edit"
                        data-original-title="Collapse"
                      >
                        Edit <i class="fa fa-pencil-square-o"></i>
                      </button>
                    </div>
                    <p className="text-muted">
                      {this.isProfile() &&
                        this.props.profileReducer.result.skills}
                    </p>
                  </div>

                  <div class="box-header with-border">
                    <strong>
                      <i className="fa fa-file-text-o margin-r-5" /> Notes
                    </strong>
                    <div class="box-tools pull-right">
                      <button
                        onClick={() =>
                          MySwal.fire({
                            title: "Edit Notes",
                            text: "You won't be able to revert this!",
                            html: `
                                <input class="swal2-input" id="notes" type="text" placeholder="Enter your New Notes" /><br />
                                  `,
                            type: "warning",
                            showCancelButton: true,
                            confirmButtonText: "CONFIRM",
                            cancelButtonText: "CANCEL",
                          }).then((result) => {
                            const data = {
                              notes: document.getElementById("notes").value,
                              userid: this.props.profileReducer.result._id,
                            };

                            if (result.value) {
                              console.log(data);
                              this.props.editNotes(data);
                              window.location.reload();
                            }
                          })
                        }
                        type="button"
                        class="btn btn-box-tool"
                        title="Edit"
                        data-original-title="Collapse"
                      >
                        Edit <i class="fa fa-pencil-square-o"></i>
                      </button>
                    </div>
                    <p className="text-muted">
                      {this.isProfile() &&
                        this.props.profileReducer.result.notes}
                    </p>
                  </div>
                </div>
                {/* /.box-body */}
              </div>
              {/* /.box */}
            </div>
            {/* /.col */}
            <div className="col-md-9">
              <div className="nav-tabs-custom">
                <ul className="nav nav-tabs">
                  <li className="active">
                    <a href="#activity" data-toggle="tab">
                      Personal Data
                    </a>
                  </li>
                  <li>
                    <a href="#settings" data-toggle="tab">
                      Settings
                    </a>
                  </li>
                  <li>
                    <a href="#changepassword" data-toggle="tab">
                      Change Password
                    </a>
                  </li>
                </ul>
                <div className="tab-content">
                  <div className="active tab-pane" id="activity">
                    <dl class="dl-horizontal">
                      <dt>Firstname</dt>
                      <dd>
                        {this.isProfile() &&
                          this.props.profileReducer.result.firstname}
                      </dd>
                      <dt>Lastname</dt>
                      <dd>
                        {this.isProfile() &&
                          this.props.profileReducer.result.lastname}
                      </dd>
                      <dt>Birthdate</dt>
                      <dd>
                        {this.isProfile() &&
                          this.props.profileReducer.result.birthdate}
                      </dd>
                      <dt>Email</dt>
                      <dd>
                        {this.isProfile() &&
                          this.props.profileReducer.result.email}
                      </dd>
                    </dl>
                  </div>

                  {/* src={`${process.env.PUBLIC_URL}/images/ic_photo.png`} */}

                  <div className="tab-pane" id="settings">
                    <Formik
                      enableReinitialize
                      initialValues={{
                        firstname:
                          this.isProfile() &&
                          this.props.profileReducer.result.firstname,
                        lastname:
                          this.isProfile() &&
                          this.props.profileReducer.result.lastname,
                        birthdate:
                          this.isProfile() &&
                          this.props.profileReducer.result.birthdate,
                      }}
                      onSubmit={async (values, { setSubmitting }) => {
                        console.log(values);
                        let formData = new FormData();
                        formData.append(
                          "userid",
                          this.props.profileReducer.result._id
                        );
                        formData.append("firstname", values.firstname);
                        formData.append("lastname", values.lastname);
                        formData.append("birthdate", values.birthdate);
                        formData.append("image", values.file);
                        //console.log(formData)
                        this.props.updateProfile(formData);
                        setSubmitting(false);
                        window.location.reload();
                      }}
                    >
                      {(props) => this.showForm(props)}
                    </Formik>
                  </div>
                  <div className="tab-pane" id="changepassword">
                    <form className="form-horizontal">
                      <div className="box-body">
                        <div className="form-group">
                          <label
                            htmlFor="inputPassword3"
                            className="col-sm-3 control-label"
                          >
                            Current Password
                          </label>
                          <div className="col-sm-9">
                            <input
                              onChange={(e) =>
                                this.setState({
                                  currentPassword: e.target.value,
                                })
                              }
                              type="password"
                              className="form-control"
                              id="inputPassword1"
                              placeholder="Password"
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label
                            htmlFor="inputPassword3"
                            className="col-sm-3 control-label"
                          >
                            New Password
                          </label>
                          <div className="col-sm-9">
                            <input
                              onChange={(e) =>
                                this.setState({ newPassword: e.target.value })
                              }
                              type="password"
                              className="form-control"
                              id="inputPassword2"
                              placeholder="Password"
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label
                            htmlFor="inputPassword3"
                            className="col-sm-3 control-label"
                          >
                            Confirmed New Password
                          </label>
                          <div className="col-sm-9">
                            <input
                              onChange={(e) =>
                                this.setState({
                                  confirmNewPassword: e.target.value,
                                })
                              }
                              type="password"
                              className="form-control"
                              id="inputPassword3"
                              placeholder="Password"
                            />
                          </div>
                        </div>
                      </div>

                      {this.props.changepwReducer.isError && this.showError()} 
                      {this.props.changepwReducer.result && this.showSuccess()}
                      {/* /.box-body */}
                      <div className="box-footer">
                        <button
                          onClick={(e) => { 
                            e.preventDefault();
                            console.log(this.state)
                            this.props.changepassword(this.state, this.props.history);
                          }}
                          type="submit"
                          className="btn btn-info pull-right"
                          style={{ marginLeft: 10 }}
                        >
                          Confirmed
                        </button>
                        <button
                          type="cancel"
                          className="btn btn-default pull-right"
                        >
                          Cancel
                        </button>
                      </div>
                      {/* /.box-footer */}
                    </form>
                  </div>
                </div>
                {/* /.tab-content */}
              </div>
              {/* /.nav-tabs-custom */}
            </div>
            {/* /.col */}
          </div>
          {/* /.row */}
        </section>
        {/* /.content */}
      </div>
    );
  }
}

const mapStateToProps = ({ profileReducer, appReducer, changepwReducer }) => ({
  profileReducer,
  appReducer,
  changepwReducer
});

const mapDispatchToProps = {
  ...actions,
};

export default connect(mapStateToProps, mapDispatchToProps)(Mainprofile);
