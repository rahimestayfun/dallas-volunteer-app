import React from 'react';
import {connect} from 'react-redux';
import {updateState,registerOrganization,loginOrganization} from './../../redux/reducers/organizationReducer';
import {Redirect} from 'react-router-dom';
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

class OrganizationRegister extends React.Component{
    constructor(){
        super();
        this.state={
            shouldRedirect:false
        }
    }
    handleChange = e => {
      this.props.updateState({[e.target.name]: e.target.value });
    };
    
    handleClick= e =>{
        e.preventDefault();
        const {o_name,o_email,o_password,o_location,organizer_name,o_image} = this.props;
        this.props.registerOrganization(o_name,o_email,o_password,o_location,organizer_name,o_image)
        .then(()=>{
          this.setState({shouldRedirect:true})
          // this.props.loginOrganization(o_email,o_password);
        })
        .catch(err=>console.log(err));
      }
    render(){
      if(this.state.shouldRedirect){
        return <Redirect to="/home"/>
      }
        return (
            <div>
              <h1>Organization Register</h1>
              <form>
                <h4>Organization Name</h4>
                <input name="o_name" onChange={this.handleChange} />
                <h4>Location</h4>
                <GooglePlacesAutocomplete 
                name="o_location"
                placeholder= "city-name"
                onSelect={(selectedResult) => this.props.updateState({o_location: selectedResult.description })}
                autocompletionRequest={{
                    componentRestrictions: {
                      country: ['us'],
                    }
                  }}
                />
                {/* <input name="o_location" onChange={this.handleChange} /> */}
                <h4>Image</h4>
                <input name="o_image" onChange={this.handleChange} />
                <h4>Contact Person</h4>
                <input name="organizer_name"onChange={this.handleChange}/>
                <h4>Email</h4>
                <input name="o_email" onChange={this.handleChange} />
                <h4>Password</h4>
                <input name="o_password" onChange={this.handleChange} />
                <button onClick={this.handleClick}>Save Changes</button>
              </form>
            </div>
          );
    }
}
const mapStateToProps = reduxState =>{
  return{
    o_name:reduxState.organization.o_name,
    o_email:reduxState.organization.o_email,
    o_password:reduxState.organization.o_password,
    o_location:reduxState.organization.o_location,
    o_image:reduxState.organization.o_image,
    organizer_name:reduxState.organization.organizer_name,
  }
}
export default connect(mapStateToProps,{
  updateState,
  registerOrganization,
  loginOrganization,
})(OrganizationRegister)