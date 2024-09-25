import io from 'socket.io-client'
import { Buttons } from '../Components/ui/Buttons'
import { Forward } from 'iconoir-react'
import { useEffect, useState } from 'react';
import { copyToClipboard, key } from '../hooks/CopyToClipBoard';


const socket = io('http://localhost:8800');

const Chat = () => {

    const [message, setMessage] = useState('')
    const [receiveMessage, setReceiveMessage] = useState('')

    const [chatKey, setChatKey] = useState(key)

    const sendMessage =async()=>{
        if (chatKey !== "") {
            alert(chatKey)
            socket.emit("sendMessage", { message, chatKey }); // Send to the room with chatKey
        }
    }

    useEffect(() => {
        // Only join the room when chatKey exists
        if (chatKey !== "") {
            socket.emit("joinRoom", chatKey);
        }
    }, [chatKey]);


      // Extract chatKey from URL when component mounts
    useEffect(() => {
        const getKey = () => {
        const params = new URLSearchParams(window.location.search);
        const newKey = params.get('chatKey');
        if (newKey) {
            setChatKey(newKey); // Set the chatKey from the URL
            console.log("new key:"+newKey)
        }
        };
        getKey();
    }, []);

    useEffect(()=>{
        socket.on("receiveMessage",(data)=>{
            alert(data)
            setReceiveMessage(data)
        })
    },[socket])

  return (
    <div className="flex gap-5 ">
          <input onChange={(e)=>setMessage(e.target.value)} />
          <Buttons border icon={<Forward />} func={sendMessage} />
          <Buttons bg text="Copy Link" func={copyToClipboard}/>

          {/* Display sent and received messages */}
          <div className="flex gap-2 items-center">
            <p>Received:{receiveMessage}</p>
          </div>
    </div>
  )
}

export default Chat