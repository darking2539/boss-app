import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as actions from "./../../actions/showdevice.action";
import { connect } from "react-redux";
import _ from "lodash";
import Moment from "react-moment";
import "./showdevice.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

class ShowDevice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DevAddr: "",
      data: [],
      para: [],
      Filter: "",
      deviceeui: "",
    };
  }

  async componentDidMount() {
    this.props.getDevice();
    this.debounceSearch = _.debounce(this.props.getDeviceByKeyword, 500);
  }

  onChange = (e) => {
    e.persist();
    this.debounceSearch(e);
  };

  renderRows = () => {
    const { result } = this.props.showdeviceReducer;
    console.log(result);
    let num = 1;
    if (result != null) {
      return result.map((d) => (
        <tr key={d._id}>
          <th scope="row">{num++}</th>
          <td style={{ color: "green" }}>{d._id}</td>
          <td style={{ color: "green" }}>{d.deveui}</td>
          <td style={{ color: "red" }}>{d.devaddr}</td>
          <td width="2">{d.projectcode}</td>
          <td style={{ color: "blue" }}>{d.projectname}</td>

          <td>
            <Moment format="DD/MM/YYYY hh:mm:ss">{d.created_date}</Moment>
          </td>
          <td>
            <Moment format="DD/MM/YYYY hh:mm:ss">{d.modify_date}</Moment>
          </td>

          <td style={{ textAlign: "center" }}>
            <button
              onClick={() =>
                MySwal.fire({
                  title: "Edit this Device",
                  text: "You won't be able to revert this!",
                  html: `
                      <input class="swal2-input" id="deviceeui" type="text" placeholder="Enter your New DevEUI" /><br />
                      <input class="swal2-input" id="deviceaddr" type="text" placeholder="Enter your New DevAddr" /><br />
                      <input class="swal2-input" id="projectcode" type="text" placeholder="Enter your New ProjectCODE" /><br />
                      <input class="swal2-input" id="projectname" type="text" placeholder="Enter your New ProjectNAME" />
                        `,
                  type: "warning",
                  showCancelButton: true,
                  confirmButtonText: "CONFIRM",
                  cancelButtonText: "CANCEL",
                }).then((result) => {
                  const data = {
                    id: d._id,
                    deviceeui: document.getElementById("deviceeui").value,
                    deviceaddr: document.getElementById("deviceaddr").value,
                    projectcode: document.getElementById("projectcode").value,
                    projectname: document.getElementById("projectname").value,
                  };

                  if (result.value) {
                    console.log(data);
                    this.props.editDevice(data);
                  }
                })
              }
              type="button"
              className="btn btn-info"
            >
              Edit
            </button>
            <span style={{ color: "grey" }}> | </span>
            <button
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
                    this.props.deleteDevice(d._id);
                  }
                });
              }}
              type="button"
              className="btn btn-danger"
            >
              Delete
            </button>
          </td>
        </tr>
      ));
    }
  };

  render() {
    return (
      <div className="content-wrapper">
        {/* Main content */}
        <section className="content">
          <div className="row">
            <div className="col-xs-12">
              {/* /.box */}
              <div className="box">
                {/* /.box-header */}
                <div className="box-body">
                  <div className="col-xs-6">
                    <input
                      onChange={this.onChange}
                      type="search"
                      className="form-control input-lg"
                      placeholder="Enter search by ProjectCODE"
                      style={{
                        borderRadius: 20,
                        marginTop: 10,
                        marginBottom: 10,
                      }}
                    />
                  </div>

                  <Link
                    to="/adddevice"
                    style={{ float: "right", marginBottom: 10, width: 150 }}
                    className="btn btn-success btn-lg"
                  >
                    Add DEVICE
                  </Link>

                  <table className="table table-bordered table-striped">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>ID</th>
                        <th>DevEUI</th>
                        <th>DevAddr</th>
                        <th>ProjectCODE</th>
                        <th>ProjectNAME</th>
                        <th>CreateDATE</th>
                        <th>ModifyDATE</th>
                        <th>ACTION</th>
                      </tr>
                    </thead>
                    <tbody>{this.renderRows()}</tbody>
                  </table>
                </div>
                {/* /.box-body */}
              </div>
              {/* /.box */}
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

const mapStateToProps = ({ showdeviceReducer }) => ({
  showdeviceReducer,
});

const mapDispatchToProps = {
  ...actions,
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowDevice);
