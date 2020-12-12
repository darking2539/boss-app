import React, { Component } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { connect } from "react-redux";
import * as actions from "./../../actions/note.action";
import axios from "axios";

class Searchlog extends Component {
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
                href="/note"
                className="btn btn-primary btn-block margin-bottom"
              >
                Back to Your Note
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
                    <li >
                      <a href="/note">
                        <i className="fa fa-inbox" /> YourNote
                        <span className="label label-primary pull-right">
                          12
                        </span>
                      </a>
                    </li>
                    <li className="active">
                      <a href="/addnote">
                        <i className="fa fa-envelope-o" /> AddNote
                      </a>
                    </li>
                  </ul>
                </div>
                {/* /.box-body */}
              </div>
            </div>
            {/* /.col */}
            <div className="col-md-9">
              <div className="box box-primary">
                <div className="box-header with-border">
                  <h3 className="box-title">Your Note</h3>
                </div>
                <div className="box-body pad">
                <form>
                  <input
                    onChange={(e) => this.handleTitleChange(e.target.value)}
                    type="search"
                    className="form-control input-lg"
                    placeholder="Title"
                    style={{ marginBottom: 10 }}
                  />
                  <Editor
                    apiKey="jcg99s8ig97rj7r9rmmnim1ybe5t3hnsdfinxeqab8ue9jkg"
                    initialValue="<p>Edit your note</p>"
                    init={{
                      height: 500,
                      menubar: false,
                      plugins: [
                        "advlist autolink lists link image charmap print preview anchor",
                        "searchreplace visualblocks code fullscreen",
                        "insertdatetime media table paste code help wordcount",
                      ],
                      toolbar:
                        "undo redo | formatselect | bold italic backcolor | \
                           alignleft aligncenter alignright alignjustify | \
                           bullist numlist outdent indent | removeformat | help",
                    }}
                    onEditorChange={this.handleEditorChange}
                  />

                  <div className="box-footer" style={{ marginTop: 10 }}>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        this.EditorSubmit();
                      }}
                      type="submit"
                      className="btn btn-primary pull-right"
                    >
                      Submit
                    </button>
                    <button
                      onClick={() => {
                        this.props.history.goBack();
                      }}
                      type="Button"
                      className="btn btn-default pull-right"
                      style={{ marginRight: 10 }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
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

export default Searchlog;
