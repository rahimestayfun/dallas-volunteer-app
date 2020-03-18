import React, { Component } from "react";
import Header from "./Header";
import { connect } from "react-redux";
import { getEvents } from "../redux/reducers/eventReducer";
import { IoIosPin } from "react-icons/io";
import { MdDateRange, MdEventAvailable } from "react-icons/md";
import axios from "axios";
import Footer from "../components/Footer";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

class Welcome extends Component {
  constructor() {
    super();
    this.state = {
      v_count: 0,
      o_count:0,
      e_count:0,
    };
  }
  componentDidMount() {
    this.props.getEvents();
    axios.get("/api/volunteer").then(response => {
      this.setState({ v_count: response.data });
    });
    axios.get('/api/event').then(response=>{
      this.setState({e_count:response.data})
    })
    axios.get('/api/organization').then(response=>{
      this.setState({o_count:response.data})
    })
  }
  render() {
    const responsive = {
      desktop: {
        breakpoint: { max: 3000, min: 1100 },
        items: 3
      }
    };

    const moment = require("moment");
    const mappedEvents = this.props.events.map((el, i) => {
      return (
        <div key={el.e_id} className="w-event-container">
          <h3 id="w-event-title">{el.e_title}</h3>
          <img
            src={el.e_image}
            alt="event"
            className="w-event-image-container"
          />
          <div>
            <p id="w-event-address">
              <IoIosPin size={15} />
              {el.e_address}
            </p>
            <p id="w-event-date">
              <MdDateRange size={14} /> {moment(el.e_date).format("LL")}
            </p>
          </div>
        </div>
      );
    });
    return (
      <div>
        <Header />
        <div className="welcome-container">
          <h2>WE MADE VOLUNTEERING EASY</h2>
          <img
            src="https://www.kozagenclikdernegi.org/wp-content/uploads/2017/12/agh.jpg"
            className="welcome-image"
          />
          <p>
            Volunteering starts with just a few clicks. Find volunteering
            opportunities around you!
          </p>
        </div>

        <div className="welcome">
            <div className="about-info">
              <h3>What is Volevent?</h3>
              <div>
                Volevent is a volunteering platform where organizations can
                share events in need of volunteers and volunteers may check for events, attend them to help the community improve.
              </div>
            </div>
            
          <h2 id="opportunities">Upcoming volunteer opportunities</h2>
          <Carousel responsive={responsive} className="w-event-parent">
            {mappedEvents}
          </Carousel>
          <div className="numbers-container">
            <div>
              <img
                src="https://www.volunteerworld.com/_Resources/Static/Packages/Vowo.Main/Images/Template/Partials/ProjectsCounts/icon-house-heart-grey-dark-middle.svg"
                alt="organizations"
                id="o_icon"
              />
              <h2>{this.state.o_count.count} + </h2>
              <h3>ORGANIZATIONS</h3>
            </div>
            <div>
              <MdEventAvailable size="80px" color="#716e77" id="e_icon" />
              <h2>{this.state.e_count.count} + </h2>
              <h3>EVENTS</h3>
            </div>
            <div>
              <img
                src="https://www.volunteerworld.com/_Resources/Static/Packages/Vowo.Main/Images/Template/Partials/ProjectsCounts/icon-multiple-users-male-grey-dark-middle.svg"
                alt="volunteers"
                id="v_icon"
              />
              <h2>{this.state.v_count.count} + </h2>
              <h3>VOLUNTEERS</h3>
            </div>
          </div>

          <div className="how">
            <div id="org-how">
              <h3>Are you an Organization?</h3>
              <p>
                Register your organization and post your event to enhance the quality of life . Start connecting with volunteers.
              </p>
            </div>
            <div id="vol-how">
              <h3>Are you a Volunteer?</h3>
              <p>
                Register today to start making a difference in your community.
                Volunteer for an event that interests you. Wait for the
                confirmation email.
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
const mapStateToProps = reduxState => {
  return {
    events: reduxState.events.events
  };
};

export default connect(mapStateToProps, { getEvents })(Welcome);
