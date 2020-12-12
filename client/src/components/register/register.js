import React, { Component } from 'react';
import { connect } from 'react-redux'
import { register } from './../../actions/register.action'

class Register extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       name: "",
       email: "",
       password: "",
       password2:"",
       error: {}
    }
  }

  showError = ()=>{
    return(
      <div className="alert alert-danger alert-dismissible">
      <button type="button" className="close" data-dismiss="alert" aria-hidden="true" >×</button>
      <h4><i className="icon fa fa-ban" />Error!</h4>
      <p>{this.props.registerReducer.data.name}</p>
      <p>{this.props.registerReducer.data.email}</p>
      <p>{this.props.registerReducer.data.password}</p>
      <p>{this.props.registerReducer.data.password2}</p>
      <p>{this.props.registerReducer.data.message}</p>
      </div>
    )
  }

  showSuccess = ()=>{
    return(
      <div class="alert alert-success alert-dismissible">
      <button type="button" class="close" data-dismiss="alert" aria-hidden="true" refresh="true" >×</button>
      <h4><i class="icon fa fa-check"></i> Register</h4>Successful
      </div>
    )
  }
  
  render() {
    return (
      <div className="login-box">
        <div className="login-logo">
            <b>ABoss</b>Register
        </div>
        {/* /.login-logo */}
        <div 
        style={{background: "whitesmoke", borderRadius: 10}}
        className="login-box-body">
          <p className="login-box-msg">Register to start your session</p>
          {/* <form noValidate onSubmit = {() => this.props.register(this.props.history,this.state)}> */}
          <form>
            <div className="form-group has-feedback">
              <input
                onChange ={(e)=>this.setState({name: e.target.value})}
                name="username"
                type="name"
                className="form-control"
                placeholder="Username"
              />
              <span className="glyphicon glyphicon-user form-control-feedback" />
            </div>

            <div className="form-group has-feedback">
              <input
                onChange ={(e)=>this.setState({email: e.target.value})}
                name="username"
                type="email"
                className="form-control"
                placeholder="Email"
              />
              <span className="glyphicon glyphicon-envelope form-control-feedback" />
            </div>

            <div className="form-group has-feedback">
              <input
                onChange ={(e)=>this.setState({password: e.target.value})}
                name = "password"
                type="password"
                className="form-control"
                placeholder="Password"
              />
              <span className="glyphicon glyphicon-lock form-control-feedback" />
            </div>

            <div className="form-group has-feedback">
              <input
                onChange ={(e)=>this.setState({password2: e.target.value})}
                name="Confirmpassword"
                type="Password"
                className="form-control"
                placeholder="Confirm Password"
              />
              <span className="glyphicon glyphicon-lock form-control-feedback" />
            </div>
            
            {this.props.registerReducer.isError == true && this.showError()}
            {this.props.registerReducer.result && this.showSuccess()}
           
            {/* /.Register */}
            <div className="row">  
              <div className="col-xs-12">
                <button
                  onClick = {(e) => 
                    {
                      e.preventDefault()
                      this.props.register(this.props.history, this.state)
                    }
                  }
                  type="submit"
                  className="btn btn-primary btn-block btn-flat"
                >
                  Sign Up
                </button>
              </div>
            </div>

          </form>
          <div className="row">
              {/* /Cancel */}
              <div className="col-xs-12">
                <button
                  onClick = { (e) => 
                    {
                      // e.preventDefault();
                      this.props.history.goBack();
                    }
                  }
                  style = {{marginTop: 8}}
                  className="btn btn-info btn-block btn-flat"
                >
                  Back
                </button>
              </div>
              {/* /.col */}
            </div>
          
        </div>
      </div>
    );
  }
}



const mapStateToProps = ({registerReducer}) => ({registerReducer})

const mapDispatchToProps = {
  register
}

export default connect(mapStateToProps, mapDispatchToProps)(Register) ;