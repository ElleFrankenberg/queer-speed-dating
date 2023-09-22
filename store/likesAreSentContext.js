import React, { createContext, useState } from "react";

export const LikesAreSentContext = createContext({
  likesAreSent: false,
  setLikesAreSent: () => {},
});

export const LikesAreSentContextProvider = (props) => {
  const [likesAreSent, setLikesAreSent] = useState(false);

  const setLikesAreSentHandler = () => {
    setLikesAreSent(!likesAreSent);
  };

  const context = {
    likesAreSent: likesAreSent,
    setLikesAreSent: setLikesAreSentHandler,
  };

  return (
    <LikesAreSentContext.Provider value={context}>
      {props.children}
    </LikesAreSentContext.Provider>
  );
};
