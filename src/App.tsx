import React, {useEffect, useMemo, useState} from 'react';
import {Data} from "./types";
import Form from "./containers/Form/Form";
import Messages from "./containers/Message/Messages";

const sound = 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3';
const url = 'http://146.185.154.90:8000/messages';
let lastDate:string = '';

function App() {
  const [chat, setChats] = useState<Data[]>([]);

  const request = async (args:string) => {
    const response = await fetch(args);
    if(!response.ok) {
      throw new Error('Response failed: ' + response.status)
    }
    return response.json();
  };

  const run = () => {
      const importMessages = async () => {
        const gotMessages = await request(url)
        setChats(gotMessages);
        lastDate = gotMessages[gotMessages.length -1]['datetime'];
      };
      importMessages().catch(console.error);
  };

  const interval = () => {
    setInterval (async () => {
      if(lastDate) {
        const newUrl = 'http://146.185.154.90:8000/messages?datetime=' + lastDate;
        const newMessage = await request(newUrl);
        if(newMessage.length > 0) {
          lastDate = newMessage[newMessage.length - 1]['datetime'];
          await new Audio(sound).play()
          setChats(prev => (prev.concat(newMessage)));
        }
      }
    },3000);
  };

  useEffect(() => {
    run();
    interval();
  }, []);

  const sendMessage = (value: Data)  => {
    const fetchData = async () => {
      const body = new URLSearchParams();
      await body.append('author', value.author);
      await body.append('message', value.message);
      await fetch(url, {method: 'POST', body});
    };
    fetchData().catch(console.error);
  };

  const getClearMessages = useMemo(() => {
    return <Messages chats={chat}/>
  }, [chat]);

  return (
    <div className='container mt-5 p-0 shadow-lg'>
      <h1 className='text-center bg-success m-0 rounded-top'>Chat</h1>
      <div className='overflow-auto' style={{height: '500px'}}>
        {getClearMessages}
      </div>
      <Form onSubmit={sendMessage}/>
    </div>
  );
}

export default App;
