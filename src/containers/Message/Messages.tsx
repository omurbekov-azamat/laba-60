import React from 'react';
import {Data} from "../../types";
import Message from "./Message";

interface Props {
  chats: Data[];
}

const Messages: React.FC<Props> = ({chats}) => {

  return (
    <>
      {chats.map((message) => (
        <Message
          key={message._id}
          message={message}
        />
      ))}
    </>
  );
};

export default Messages;