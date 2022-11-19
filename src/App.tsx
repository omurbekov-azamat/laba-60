import React, {useEffect, useState} from 'react';
import Form from "./containers/Form/Form";
import {NewMessage, Data} from "./types";

const url = 'http://146.185.154.90:8000/messages';

function App() {
  const [chat, setChats] = useState<Data[]>([]);

  const run = () => {
    const importMessages = async () => {
      const response = await fetch(url);
      if(response.ok) {
        let newMessages = await response.json();
        setChats(newMessages)
      }
    };
    importMessages().catch(console.error);
  };

  useEffect(()=> {
    run();
  }, []);

  const sendMessage = (value: NewMessage)  => {
    const fetchData = async () => {
      const body = new URLSearchParams();
      await body.append('author', value.name);
      await body.append('message', value.message);
      await fetch(url, {method: 'POST', body});
    };
    fetchData().catch(console.error);
  };

  return (
    <div className='container'>
      <Form onSubmit={sendMessage}/>
    </div>
  );
}

export default App;
