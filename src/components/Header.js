import React from "react";
import "./../styles/Header.scss";
// import { Link } from "react-router-dom";
import OrganizationLogin from "../components/organization/OrganizationLogin";
import VolunteerLogin from "../components/volunteer/VolunteerLogin";
import { FaUser } from "react-icons/fa";

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      isVolOpen: false,
      isOrgOpen: false
    };
  }
  toggleVol = () => {
    this.setState({ isVolOpen: !this.state.isVolOpen });
  };
  toggleOrg = () => {
    this.setState({ isOrgOpen: !this.state.isOrgOpen });
  };
  render() {
    return (
      <div>
        <div className="header-container">
          <h1 id="app-name">volevent</h1>

          <div className="dropdown">
            <FaUser size={25} className="dropbtn"/>
            <div className="dropdown-content">
              <p onClick={this.toggleVol}>Volunteer</p>
              <p onClick={this.toggleOrg}>Organization</p>
            </div>
          </div>

          {/* <div className="sign-in">
            <FaUser onClick={this.toggleVol} size={30} />
            <FaRegUser onClick={this.toggleOrg} size={30} />
          </div> */}
        </div>
        {this.state.isVolOpen ? (
          <VolunteerLogin toggleVol={this.toggleVol} />
        ) : null}

        {this.state.isOrgOpen ? (
          <OrganizationLogin toggleOrg={this.toggleOrg} />
        ) : null}
      </div>
    );
  }
}
export default Header;
