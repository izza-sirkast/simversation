import { useState, useEffect } from 'react'
import {io} from 'socket.io-client'
import { useAuth } from '../../wrappers/AuthContext';
import { API } from '../../configs/api';
const socket = io(import.meta.env.VITE_API_URL);

// Type
import { GroupMessage } from '../../../types';

type Props = {
  room: string
}

const GroupChat = ({room} : Props) => {
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<GroupMessage[]>([]);
  const [groupChatInfo, setGroupChatInfo] = useState<any>({});

  const { user } = useAuth();

  useEffect(() => {
    const getChatLogs = async () => {
      try {
        const res = await API.get(`/group-chats/getChatLogsByGroupChatId/${room}`);
        setMessages(res.data.chatLogs);
      } catch (error) {
        alert("Failed to get chat logs");
      }
    }

    const getGroupChat = async () => {
        try {
            const res = await API.get(`/group-chats/getGroupChatByGroupChatId/${room}`);
            setGroupChatInfo(res.data.groupChat);
        } catch (error) {
            alert("Failed to get group chat info");
        }
    }

    setMessage("");
    getGroupChat();
    getChatLogs();

    socket.emit("join-room", room);
    
    socket.on("connect", () => {
      console.log(socket.id);
    })
    
    socket.on("receive-message", (data: GroupMessage) => {
      setMessages(msgs => [...msgs, data]);
    });

    return () => {
      socket.off("receive-message");
      socket.off("connect");
    }
  }, [room])

  const sendMessage = async () => {
    if (message.length == 0) {
      return;
    }

    const created_at = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const messageDetail : GroupMessage = {
        group_chat_id: room,
        message: message,
        sender_id: user?.user_id || "",
        username: user?.username || "",
        created_at: created_at,
        updated_at: created_at
    };

    // post message to server
    try {
      const res = await API.post('/group-chats/createChatLog', messageDetail)
      socket.emit("send-private-message", res.data, room);
      setMessages(msgs => [...msgs, res.data]);
      setMessage("");
    } catch (error) {
      alert("Failed to send message");
    }

  }
  
  return (
    <div className='max-h-screen h-screen overflow-scroll flex flex-col'>
        <div className='sticky top-0 bg-white p-2 border-b border-black'>
          <p>Realtime Chat | {groupChatInfo.group_chat_name}</p>
        </div>

        <div className='flex-1 flex flex-col gap-2 px-2 pt-5'>
            {/* {messages.map((msg, index) => (
                <p key={index} className={`px-2 border border-black ${msg.sender_id == user?.user_id ? 'self-end text-right' : 'self-start text-left' }`}>{msg.message}</p>
            ))} */}
            {messages.map((msg, index) => {
                const messageDateFormatted = new Date(msg.created_at).toLocaleString();
                return (
                  <div key={msg.group_chat_log_id} className={`${msg.sender_id == user?.user_id ? 'self-end text-right items-end' : 'self-start text-left items-start' } flex flex-col  max-w-2/3`}>
                    <p className='text-xs'>{msg.username}</p>
                    <p key={index} className='px-2 border border-black'>{msg.message}</p>
                    <p className='text-xs'>{messageDateFormatted}</p>
                  </div>
                )
              }
            )}
        </div>

        <div className='flex p-2 border-t border-black pt-2 sticky bottom-0 bg-white'>
          <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className='border border-black w-full'
          />
          <button className='px-2 border border-black bg-blue-300 hover:bg-blue-500 cursor-pointer' onClick={sendMessage}>Send</button>
        </div>
    </div>
  )
}

export default GroupChat
