import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import * as actions from "./../../actions/note.action";
import Moment from "react-moment";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);
const parse = require("html-react-parser");

class Noteviewver extends Component {
  
  componentDidMount() {

  }

  render() {
    return (
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <section className="content-header">
          <h1>Note Editor</h1>
        </section>
        {/* Main content */}
        <section className="content">
          <div className="row">
            <div className="col-md-3">
              <a
                href="/addnote"
                className="btn btn-primary btn-block margin-bottom"
              >
                ADD Note
              </a>
              <div className="box box-solid">
                <div className="box-header with-border">
                  <h3 className="box-title">Folders</h3>
                  <div className="box-tools">
                    <button
                      type="button"
                      className="btn btn-box-tool"
                      data-widget="collapse"
                    >
                      <i className="fa fa-minus" />
                    </button>
                  </div>
                </div>
                <div className="box-body no-padding">
                  <ul className="nav nav-pills nav-stacked">
                  <li className="active">
                      <Link to="/note">
                        <i className="fa fa-inbox" /> YourNote
                      </Link>
                    </li>
                    <li>
                      <Link to ="/editnote">
                        <i className="fa fa-sticky-note" /> EditNote
                      </Link>
                    </li>
                    <li>
                      <Link to="/addnote">
                        <i className="fa fa-edit" /> AddNote
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* /.col */}
            <div className="col-md-9">
              <div className="box box-primary">
                <div className="box-header" style={{ background: "#D6EAF8" }}>
                  <h3 className="box-title">
                    <b>Title:</b> {this.props.noteviewReducer.result.title}
                  </h3>
                  <div className="box-tools pull-right">
                    <button
                      onClick = {()=>this.props.history.push("/editnote")}
                      type="button"
                      className="btn btn-primary"
                      size="lg"
                      title = "Edit Note"
                    >
                      Edit <i className="fa fa-edit" />
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      size="lg"
                      title = "Remove Note"
                      onClick={() => {
                        MySwal.fire({
                          title: "Delete this note?",
                          text: "You won't be able to revert this!",
                          type: "warning",
                          showCancelButton: true,
                          confirmButtonText: "Yes, Delete it!",
                          cancelButtonText: "No, Cancel!",
                        }).then((result) => {
                          if (result.value) {
                            console.log(this.props.noteviewReducer.result._id)
                            this.props.deleteNote(this.props.history, this.props.noteviewReducer.result._id);
                          }
                        });
                      }}
                    >
                      Remove <i className="fa fa-trash-o"  />
                    </button>
                  </div>
                </div>
                  <div className="box" style={{ background: "#A9CCE3" }}>
                    <div className="box-header">
                      <h2 className="box-title">
                        <b>Date:</b>{" "}
                        <Moment format=" hh:mm:ss || DD/MM/YYYY">
                          {this.props.noteviewReducer.result.modify_date}
                        </Moment>
                      </h2>
                    </div>
                    <div className="box-body" style={{ background: "skyblue" }}>
                      <p>{parse(this.props.noteviewReducer.result.body)}</p>
                    </div>
                  </div>
              </div>
              {/* /. box */}
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

const mapStateToProps = ({ noteReducer, noteviewReducer }) => ({
  noteReducer,
  noteviewReducer,
});

const mapDispatchToProps = {
  ...actions,
};

export default connect(mapStateToProps, mapDispatchToProps)(Noteviewver);
