import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux'
import * as actions from './../../actions/note.action'
import Moment from "react-moment";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

class Mainnote extends Component {
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
    this.props.ShowNote()

  }
  
  renderRows = () => {
    const { result } = this.props.noteReducer;
    console.log(result);
    
    if (result != null) {
      return result.map((d) => (
        <tr key={d._id}>
          <td width="10">{d._id}</td>
          <td><i className="fa fa-book" /></td>
          <td style={{ color: "blue" }} >
            <button style = { {border: 'none', background: 'transparent'} } onClick = {(e) => {this.props.setNoteid(this.props.history,d._id)}}>
                {d.title}
            </button>
          </td>
          <td>
            <Moment format="DD/MM/YYYY hh:mm:ss">{d.modify_date}</Moment>
          </td>
        </tr>
      ));
    }
  };

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
            <Link
                to="/addnote"
                className="btn btn-primary btn-block margin-bottom"
              >
                ADD Note
              </Link>
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
                <div className="box-header with-border">
                  <h3 className="box-title">Your Note</h3>
                  <div className="box-tools pull-right">
                    <div className="has-feedback">
                      <input
                        type="text"
                        className="form-control input-sm"
                        placeholder="Search Note"
                      />
                      <span className="glyphicon glyphicon-search form-control-feedback" />
                    </div>
                  </div>
                  {/* /.box-tools */}
                </div>
                {/* /.box-header */}
                <div className="box-body no-padding">

                  <div className="table-responsive mailbox-messages">
                    <table className="table table-hover table-striped">
                      <tbody>{this.renderRows()}</tbody>
                    </table>
                    {/* /.table */}
                  </div>
                  {/* /.mail-box-messages */}
                </div>
                {/* /.box-body */}
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

const mapStateToProps = ({ noteReducer }) => ({
  noteReducer
})

const mapDispatchToProps = {
  ...actions
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Mainnote);
