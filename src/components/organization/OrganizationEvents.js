import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  getUpcomingEvents,
  getPastEvents
} from "../../redux/reducers/organizationReducer";
import { deleteEvent } from "./../../redux/reducers/eventReducer";
import axios from "axios";

class OrganizationEvents extends React.Component {
  constructor() {
    super();
    this.state = {
      isPastEventVisible: false,
      topic:'Event cancellation'
    };
  }
  componentDidMount() {
    // this.props.getOrganizationSession();
    const o_id = this.props.organization.o_id;
    this.props.getUpcomingEvents(o_id);
    this.props.getPastEvents(o_id);
  }
  switchToPastView = () => {
    this.setState({ isPastEventVisible: true });
  };
  switchToUpcomingView = () => {
    this.setState({ isPastEventVisible: false });
  };

  sendEmailsToDeletedEventVolunteers = (id,o_email,topic,text)=>{
    axios.post(`/send-cancellation/${id}?sender=${o_email}&topic=${topic}&text=${text}`)
    .then((response)=>console.log(response))
    .catch((err)=>{console.log(err)})
    window.alert('We sent your event cancellation information to event volunteers.')
  }
    
  render() {
    const {topic}= this.state;
    const o_email = this.props.organization.o_email
    const o_id = this.props.organization.o_id;
    const { upcomingEvents, pastEvents } = this.props;
    const mappedUpcomingEvent = upcomingEvents.map(el => {
      return (
          <tbody key={el.e_id}>
            <tr>
              <td>
                <Link to={`/event/${el.e_id}`}>{el.e_title}</Link>
              </td>
              <td>{el.e_address}</td>
              <td>{el.e_date}</td>
              <td>
                {el.e_start_time} -{el.e_end_time}
              </td>
              {/* <td><button>Delete this event</button></td> */}
              <td>
                <button
                  onClick={() => {
                    // this.getDeletedEventVolunteersEmails(el.e_id);
                    this.sendEmailsToDeletedEventVolunteers(el.e_id,o_email,topic,el.e_title);
                    this.props.deleteEvent(el.e_id);
                    this.props.getUpcomingEvents(o_id);
                  }}
                >
                  Delete this event
                </button>
              </td>
              <td>
                <Link to={{
                  pathname: `/event/${el.e_id}/volunteers`,
                  state: { volunteerCount: el.e_volunteer_count }
                }}>
                  <button>Show Volunteer List</button>
                </Link>
              </td>
            </tr>
          </tbody>
      );
    });
    const mappedPastEvent = pastEvents.map(el => {
      return (
          <tbody key={el.e_id}>
            <tr>
              <td>{el.e_title}</td>
              <td>{el.e_address}</td>
              <td>{el.e_date}</td>
              <td>
                {el.e_start_time} -{el.e_end_time}
              </td>
            </tr>
          </tbody>
      );
    });

    return (
      <div>
        <button onClick={this.switchToUpcomingView}>UPCOMING EVENTS</button>
        <button onClick={this.switchToPastView}>PAST EVENTS</button>
      
        {!this.state.isPastEventVisible ? (
          <div>
            <h3>Upcoming</h3>
            <table>
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Where</th>
                  <th>When</th>
                  <th>What time</th>
                </tr>
              </thead>
              {mappedUpcomingEvent}
            </table>
          </div>
        ) : (
          <div>
            <h3>Past</h3>
            <table>
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Where</th>
                  <th>When</th>
                  <th>What time</th>
                </tr>
              </thead>
              {mappedPastEvent}
            </table>
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = reduxState => {
  return {
    upcomingEvents: reduxState.organization.upcomingEvents,
    pastEvents: reduxState.organization.pastEvents,
    organization: reduxState.organization.organization
  };
};
export default connect(mapStateToProps, {
  getUpcomingEvents,
  getPastEvents,
  deleteEvent
})(OrganizationEvents);
