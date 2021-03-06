import axios from "axios";

const initialState = {
  role: "",
  id: 0
};
//CONSTANTS
const GET_SESSION = "GET_SESSION";
const LOGOUT = "LOGOUT";

//ACTION CREATOR
export function getSession() {
  return {
    type: GET_SESSION,
    payload: axios.get("/auth/session")
  };
}
export function logout() {
  return {
    type: LOGOUT,
    payload: axios.post("/auth/logout")
  };
}

//REDUCER
export default function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case `${GET_SESSION}_PENDING`:
      return {
        ...state,
        loading:true 
      };
    case `${GET_SESSION}_FULFILLED`:
      return {
        ...state,
        loading:false,
        role: payload.data.o_role || payload.data.v_role,
        id: payload.data.o_id || payload.data.v_id,
        approved: payload.data.approved,
        name: payload.data.o_name || payload.data.v_name,
        image: payload.data.o_image || payload.data.v_image,
      };
    case LOGOUT:
      return {
        ...state
      };
    default:
      return state;
  }
}
