import React, {useState} from 'react';
import {NewMessage} from "../../types";

const Form = () => {
  const [message, setMessages] = useState<NewMessage>({
    name: '',
    message: '',
  });

  const onMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setMessages(prev => ({...prev, [name]: value}));
  };

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(message);
  };

  return (
    <form onSubmit={onFormSubmit}>
      <div className='w-100 d-flex justify-content-between p-3 form-control'>
        <input
          id='name'
          name='name'
          className='w-10'
          type="text"
          placeholder='Author Name'
          required
          onChange={onMessageChange}
        />
        <input
          id='name'
          name='message'
          className='w-75'
          type="text"
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