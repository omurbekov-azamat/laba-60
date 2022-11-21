import React from 'react';
import {Data} from "../../types";

interface Props {
  message: Data;
}

const Message: React.FC<Props> = ({message}) => {
  const color:string[] = ['lightblue', 'lightcoral', 'lightcyan', 'lightgray', 'lightpink', 'lightgreen', 'lightgrey', 'lightsalmon', 'lightseagreen', 'lightskyblue', 'lightgoldenrodyellow', 'lightsteelblue', 'lightyellow'];
  const align:string [] = ['p-0 ps-1 mb-2 mx-1 text-start mt-1', 'p-0 ps-1 mb-2 mx-1 text-end mt-1'];

  const random  = (args:string[]) => {
    const rant = Math.floor(Math.random() * args.length);
    return args[rant];
  };

  return (
    <div className={random(align)}>
      <div className='rounded-4 p-1 border border-dark' style={{display: 'inline-block', background: random(color)}}>
        <p className='m-0'>Author: {message.author}</p>
        <p className='m-0'>{message.datetime}</p>
        <p className='m-0'>Message: {message.message}</p>
      </div>
    </div>
  );
};

export default Message;