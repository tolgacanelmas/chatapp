import { useState } from "react";
import { useUserLoggedIn } from "../../context/UserContext";
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
    console.log(selectedUser);
    const messageInfo = {
      senderId: user.id,
      recieverId: selectedUser._id,
      message,
      time: new Date(),
    };

    if (message) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(messageInfo),
      };
      const res = await fetch(
        "http://localhost:3000/send-message",
        requestOptions
      );
      const response = await res.json();
      setMessage("");
    }
    setMessages([...messages, messageInfo]);
  };

  console.log(messages);

  return (
    <div>
      <div>eski mesajlar</div>
      <div>
        <div className="form-control">
          <input type="text" onChange={(e) => setMessage(e.target.value)} />
          <button onClick={handleSendMessage}>tıkla</button>
        </div>
      </div>
    </div>
  );
}
