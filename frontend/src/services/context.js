import React from "react";

export const AppContext = React.createContext({
    aside: true,
    setAside: (aside) => {}
});