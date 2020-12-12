import React, { Component } from "react";
import { login, autoLogin } from './../../actions/login.action'
import { connect } from "react-redux"

class Login extends Component {
  
  constructor(props) {
    super(props)
  
    this.state = {
       email: "",
       password: "",
       errors: {}
    }
  }

  componentDidMount(){
    this.props.autoLogin(this.props.history);
  }

  
  showError = ()=>{

    return(
      <div className="alert alert-danger alert-dismissible">
      <button type="button" className="close" data-dismiss="alert" aria-hidden="true"  >×</button>
      <h4><i className="icon fa fa-ban" />Error!</h4> 
      <p>{this.props.loginReducer.result.email}</p>
      <p>{this.props.loginReducer.result.password}</p>
      </div>
    )
  }
  
  
  render() {
    return (
      <div className="login-box">
        <div className="login-logo">
          <a href="../../index2.html">
            <b>ABoss</b>Login
          </a>
        </div>
        {/* /.login-logo */}
        <div 
        style={{background: "whitesmoke", borderRadius: 10}}
        className="login-box-body">
          <p className="login-box-msg">Sign in to start your session</p>
          <form>
            <div className="form-group has-feedback">
              <input
                onChange = {e => this.setState({email: e.target.value})}
                type="email"
                className="form-control"
                placeholder="Email"
              />
              <span className="glyphicon glyphicon-envelope form-control-feedback" />
            </div>
            <div className="form-group has-feedback">
              <input
                onChange = {e => this.setState({password: e.target.value})}
                type="password"
                className="form-control"
                placeholder="Password"
              />
              <span className="glyphicon glyphicon-lock form-control-feedback" />
            </div>
            <div className="row">
                            
            {/* /Sign In Button */}
              <div className="col-xs-12">
              {this.props.loginReducer.isError && this.showError()} 
                <button
                  onClick = { e=> {
                    e.preventDefault();
                    this.props.login(this.props.history, this.state, this.state.errors)
                  }}
                  type="submit"
                  className="btn btn-primary btn-block btn-flat"
                >
                  Sign In
                </button>
              </div>
              {/* /.col */}
            </div>
          </form>
          
          <div className="row">
              
              {/* /.col */}
              <div className="col-xs-12">
                <button
                  onClick = {()=>this.props.history.push("/register")}
                  type="submit"
                  style = {{marginTop: 8}}
                  className="btn btn-info btn-block btn-flat"
                >
                  Register
                </button>
              </div>
              {/* /.col */}
            </div>
        </div>
        {/* /.login-box-body */}
      </div>
    );
  }
}

const mapStateToProps = ({ loginReducer }) => ({ 
  loginReducer })

const mapDispatchToProps = {
  login, autoLogin
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
