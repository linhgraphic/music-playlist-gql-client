import React, { createContext, useReducer } from "react";

const UserContext = createContext({
  isActive: false,
});

const UserReducer = (state, action) => {
  switch (action.type) {
    case "CLOSE": {
      return { ...state, isSubmitted: true };
    }
    case "OPEN": {
      return { ...state, isSubmitted: false };
    }
    default:
      return state;
  }
};

const UserProvider = (props) => {
  const [state, dispatch] = useReducer(UserReducer, { isSubmitted: false });
  const closePanel = () => dispatch({ type: "CLOSE" });
  const openPanel = () => dispatch({ type: "OPEN" });

  return (
    <UserContext.Provider
      value={{ isSubmitted: state.isSubmitted, closePanel, openPanel }}
      {...props}
    />
  );
};

export { UserContext, UserProvider };
