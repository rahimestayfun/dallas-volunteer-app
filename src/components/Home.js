import React from "react";
import Nav from "./Nav";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getEvents } from "./../redux/reducers/eventReducer";
import { getSession } from "./../redux/reducers/userReducer";
import "./../styles/Home.scss";
import DetailedEvent from "../components/event/DetailedEvent";
import { IoIosPin } from "react-icons/io";
import { MdDateRange } from "react-icons/md";


class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      isEventOpen: false,
      e_id: 0
    };
  }
  componentDidMount() {
    this.props.getSession();
    this.props.getEvents();
  }
  toggleEvent = id => {
    this.setState({ isEventOpen: !this.state.isEventOpen, e_id: id });
  };
  render() {
    const moment = require("moment");
    console.log(this.props.role);
    const mappedEvents = this.props.events.map((el, i) => {
      // console.log(el)
      return (
        <div key={el.e_id} className="event-container" onClick={() => this.toggleEvent(el.e_id)}>
          <h2 id="event-title">{el.e_title}</h2>
          {/* <Link to={`/event/${el.e_id}`}> */}
          <img
            src={el.e_image}
            alt="event"
            className="event-image-container"
          />
          {/* </Link> */}
          <div>
            <p id="event-address">
              <IoIosPin size={18} />
              {el.e_address}
            </p>
            <p id="event-date">
              <MdDateRange size={16} /> {moment(el.e_date).format("LL")}
            </p>
          </div>
          {/* <h4>{el.e_volunteer_count} spots left</h4> */}
        </div>
      );
    });
    return (
      <div className="parent-parent-event-container">
        <Nav />
        <div className="parent-event-container">
          {/* {this.props.loading? <img src='https://resources.humandx.org/static/img/loading_spinner.gif' alt='Loading..' /> : null} */}
          {this.props.role !== "organization" ? null : (
            <Link to="/add">
              <button id="event-add-button">ADD YOUR EVENT</button>
            </Link>
          )}
          <h2 id="upcoming">UPCOMING EVENTS --- {this.props.role}</h2>
          <div className="upcoming-events">{mappedEvents}</div>
        </div>
        {this.state.isEventOpen ? (
          <DetailedEvent
            toggleEvent={this.toggleEvent}
            e_id={this.state.e_id}
          />
        ) : null}
      </div>
    );
  }
}
const mapStateToProps = reduxState => {
  return {
    events: reduxState.events.events,
    role: reduxState.userReducer.role
  };
};
export default connect(mapStateToProps, { getEvents, getSession })(Home);
