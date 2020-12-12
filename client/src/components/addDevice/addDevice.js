import React, { Component } from "react";
import "./addDevice.css";
import { Formik } from "formik";
import axios from "axios";


class AddDevice extends Component {
  showForm = ({ values, handleChange, handleSubmit }) => {
    return (
      <form className="form-horizontal" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="col-sm-2 control-label" htmlFor="name">
            DevEUI
          </label>
          <div className="col-sm-10">
            <div className="input-group">
              <input
                name="deveui"
                onChange={handleChange}
                value={values.deveui}
                className="form-control"
                type="text"
              />
              <span className="input-group-addon input-group-addon_custom">
                HEX
              </span>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label className="col-sm-2 control-label" htmlFor="name">
            DevAddr
          </label>
          <div className="col-sm-10">
            <div className="input-group">
              <input
                name="devaddr"
                onChange={handleChange}
                value={values.devaddr}
                className="form-control"
                type="text"
              />
              <span className="input-group-addon input-group-addon_custom">
                HEX
              </span>
            </div>
          </div>
        </div>

        <div className="form-group" style={{ marginBottom: 10 }}>
          <label className="col-sm-2 control-label" htmlFor="stock">
            PROJECT CODE
          </label>
          <div className="col-sm-10">
            <div className="input-group">
              <input
                name="projectcode"
                onChange={handleChange}
                value={values.projectcode}
                className="form-control"
                type="hex"
              />
              <span className="input-group-addon input-group-addon_custom">
                CODE
              </span>
            </div>
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-2 control-label" htmlFor="price">
            PROJECT NAME
          </label>
          <div className="col-sm-10">
            <div className="input-group">
              <input
                name="projectname"
                onChange={handleChange}
                value={values.projectname}
                className="form-control"
                type="text"
              />
              <span className="input-group-addon input-group-addon_custom">
                NAME
              </span>
            </div>
          </div>
        </div>

        <div className="box-footer" style={{ marginTop: 50 }}>
          <button
            type="submit"
            // disabled={isSubmitting}
            className="btn btn-primary pull-right"
          >
            Submit
          </button>
          <a
            onClick={() => {
              this.props.history.goBack();
            }}
            type="Button"
            className="btn btn-default pull-right"
            style={{ marginRight: 10 }}
          >
            Cancel
          </a>
        </div>
      </form>
    );
  };
  render() {
    return (
      <div className="content-wrapper">
        {/* Main content */}
        <section className="content" style={{ maxWidth: "80%" }}>
          <div className="box box-primary" style={{ marginTop: 70 }}>
            <div className="box-header with-border">
              <p className="box-title" style={{ fontSize: 30 }}>
                ADD Device
              </p>
            </div>
            <div className="box-body" style={{ marginTop: 30 }}>
              <Formik
                initialValues={{
                  userid: localStorage.getItem('userid') ,
                  deveui: "AB00000000000002",
                  devaddr: "AB000002",
                  projectcode: "01",
                  projectname: "Smart Home",
                }}
                onSubmit={(values, { setSubmitting }) => {
                  //alert(JSON.stringify(values));
                  axios.post("/api/add-device", values).then( result =>{
                    this.props.history.push("/showdevice");
                  });
                }}
              >
                {(props) => this.showForm(props)}
              </Formik>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default AddDevice;
