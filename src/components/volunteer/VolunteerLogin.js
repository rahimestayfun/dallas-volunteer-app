import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  updateState,
  loginVolunteer
} from "./../../redux/reducers/volunteerReducer";
import VolunteerRegister from "../../components/volunteer/VolunteerRegister";
import { TiDeleteOutline } from "react-icons/ti";

class VolunteerLogin extends React.Component {
  constructor() {
    super();
    this.state = {
      canRegister: false,
      shouldRedirect: false
    };
  }
  handleChange = e => {
    this.props.updateState({ [e.target.name]: e.target.value });
  };

  handleLogin = e => {
    this.props
      .loginVolunteer(this.props.v_email, this.props.v_password)
      .then(() => this.setState({ shouldRedirect: true }))
      .catch(() => window.alert("Wrong password"));
  };
  toggleRegister = () => {
    this.setState({ canRegister: !this.state.canRegister });
  };
  render() {
    if (this.state.shouldRedirect) {
      return <Redirect to="/home" />;
    }
    return (
      <div>
        {this.state.canRegister ? (
          <VolunteerRegister toggleVol={this.props.toggleVol} />
        ) : (
          <div className="login-parent">
            <div className="login-form">
              <TiDeleteOutline
                onClick={this.props.toggleVol}
                id="delete"
                size={30}
              />
              <h3>VOLUNTEER LOGIN</h3>
              <h4>E-mail</h4>
              <input name="v_email" onChange={this.handleChange} />
              <h4>Password</h4>
              <input
                type="password"
                name="v_password"
                onChange={this.handleChange}
              />
              <button onClick={this.handleLogin}>Login</button>
              <p>
                Not have an account. Register,{" "}
                <u onClick={this.toggleRegister}>Here!</u>
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = reduxState => {
  return {
    v_email: reduxState.volunteer.v_email,
    v_password: reduxState.volunteer.v_password
  };
};

export default connect(mapStateToProps, { updateState, loginVolunteer })(
  VolunteerLogin
);
