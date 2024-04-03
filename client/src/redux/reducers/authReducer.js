import { REMOVE_AUTH, SET_AUTH } from "../actions/authActions";


const initialState = {
  isAuth: false,
  admin : null,
  user: null,
  subAdmin: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH: {
      const { roleType, roleData } = action.payload;
      const newState = { ...state, isAuth: true, [roleType]: roleData };
      return newState;
    }
    case REMOVE_AUTH: {
      return {
        isAuth: false,
        admin: null,
        user: null,
        subAdmin: null,
      };
    }
    default: {
      return state;
    }
  }
};

