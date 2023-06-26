import { useEffect, useState } from "react";
import * as io from "socket.io-client";
import { useUserLoggedIn } from "../../context/UserContext";

const socket = io.connect("http://localhost:3000");

type MessageInfo = {
  senderId: String;
  recieverId: String;
  message: String;
  time: Date;
};

export default function Chat({ selectedUser }: any) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<MessageInfo[]>([]);
  const { user }: any = useUserLoggedIn();

  const handleSendMessage = async () => {
    const messageInfo = {
      senderId: user.id,
      recieverId: selectedUser.id,
      message,
      time: new Date(),
    };

    if (message) {
      setMessage("");
      socket.emit("message", messageInfo);
    }
  };

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  return (
    <div className="flex flex-col justify-end w-full">
      <div className="h-full flex flex-col justify-end border border-gray-500 border-b-0 rounded-lg p-1">
        {messages.map((messageInfo: MessageInfo, i) => {
          if (user.id === messageInfo.senderId) {
            return (
              <div key={i} className="text-right text-gray-300">
                <span className="mr-1">{messageInfo.message}</span>
                <span>
                  {new Date(messageInfo.time).getHours() +
                    ":" +
                    new Date(messageInfo.time).getMinutes()}
                </span>
              </div>
            );
          } else {
            return (
              <div key={i} className="text-left text-gray-300">
                <span>
                  {new Date(messageInfo.time).getHours() +
                    ":" +
                    new Date(messageInfo.time).getMinutes()}
                </span>
                <span className="ml-1">{messageInfo.message}</span>
              </div>
            );
          }
        })}
      </div>
      <div>
        <div className="form-control relative">
          <input
            type="text"
            value={message}
            placeholder="Bir mesaj yazın..."
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            onClick={handleSendMessage}
            className="absolute right-0 text-gray-100 border-l rounded-sm px-3 hover:bg-gray-600 h-full"
          >
            Gönder
          </button>
        </div>
      </div>
    </div>
  );
}
