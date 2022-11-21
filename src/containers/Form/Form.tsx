import React, {useState} from 'react';
import {Data} from "../../types";

interface Props {
  onSubmit: (message: Data) => void;
}

const Form: React.FC<Props> = ({onSubmit}) => {
  const [message, setMessages] = useState<Data>({
    author: '',
    message: '',
  });

  const onMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setMessages(prev => ({...prev, [name]: value}));
  };

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.author !== '' && message.message !== '') {
      onSubmit({
        ...message,
      });
    }

    setMessages({
      author: '',
      message: '',
    });
  };

  return (
    <form onSubmit={onFormSubmit}>
      <div className='w-100 d-flex justify-content-between p-3 form-control rounded-0'>
        <input
          id='author'
          name='author'
          className='w-10'
          type="text"
          value={message.author}
          placeholder='Author Name'
          required
          onChange={onMessageChange}
        />
        <input
          id='message'
          name='message'
          className='w-75'
          type="text"
          value={message.message}
          placeholder='Message'
          required
          onChange={onMessageChange}
        />
        <button type='submit' className='w-10 btn btn-info ms-2'>send</button>
      </div>
    </form>
  );
};

export default Form;