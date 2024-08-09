import { ChannelList, Channel, ChannelSettings } from "@sendbird/uikit-react";
import { useState, useRef, useEffect } from "react";
import SendBird from 'sendbird';
import './Chatbox.css';

const Chatbox = () => {
  const [currentChannel, setCurrentChannel] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [sendbirdInstance, setSendbirdInstance] = useState(null);
  const [message, setMessage] = useState(""); // To store the input message
  const [messages, setMessages] = useState([]); // To store messages for rendering
  const channelChatRef = useRef(null);

  const appId = import.meta.env.VITE_APP_ID;
  const userId = import.meta.env.VITE_USER_ID;
  const nickname = import.meta.env.VITE_NICKNAME;
  const accessToken = import.meta.env.VITE_ACCESS_TOKEN;

  useEffect(() => {
    if (!appId || !userId || !nickname) {
      console.error("App ID, User ID, or Nickname is not defined.");
      return;
    }

    const sb = new SendBird({ appId });

    sb.connect(userId, accessToken, (user, error) => {
      if (error) {
        console.error("Failed to connect:", error);
      } else {
        console.log("Connected as:", user);

        sb.updateCurrentUserInfo(nickname, null, (response, updateError) => {
          if (updateError) {
            console.error("Failed to update user info:", updateError);
          } else {
            console.log("User info updated successfully.");
            setSendbirdInstance(sb);
          }
        });
      }
    });
  }, [appId, userId, nickname, accessToken]);

  useEffect(() => {
    if (currentChannel) {
      loadMessages(currentChannel); // Load messages when the channel changes
      currentChannel.onMessageReceived = (msg) => {
        console.log("New message received:", msg);
        setMessages((prevMessages) => [...prevMessages, msg]);
      };
    }
  }, [currentChannel]);

  const loadMessages = (channel) => {
    const messageListQuery = channel.createPreviousMessageListQuery();
    messageListQuery.limit = 20;
    messageListQuery.reverse = false;

    messageListQuery.load((msgs, error) => {
      if (error) {
        console.error("Error loading messages:", error);
      } else {
        console.log("Messages loaded:", msgs);
        setMessages(msgs);
      }
    });
  };

  const renderSettingsBar = () => {
    if (channelChatRef.current) {
      channelChatRef.current.style.width = "52%";
      channelChatRef.current.style.float = "left";
    }
  };

  const hideSettingsBar = () => {
    if (channelChatRef.current) {
      channelChatRef.current.style.width = "76%";
      channelChatRef.current.style.float = "right"; 
    }
  };

  const createChannel = () => {
    if (sendbirdInstance?.GroupChannel) {
      const params = new sendbirdInstance.GroupChannelParams();
      params.name = nickname || "New Channel";
      params.isPublic = true;
      params.isEphemeral = false;
      params.addUserIds([userId]);

      sendbirdInstance.GroupChannel.createChannel(params, (channel, error) => {
        if (error) {
          console.error("Error creating channel:", error);
        } else {
          console.log("Channel created successfully:", channel);
          setCurrentChannel(channel);
          setMessages([]); // Clear previous messages
        }
      });
    } else {
      console.error("SendBird instance or GroupChannel is not available.");
    }
  };

  const sendMessage = () => {
    if (currentChannel && message.trim()) {
      currentChannel.sendUserMessage(message.trim(), (msg, error) => {
        if (error) {
          console.error("Error sending message:", error);
        } else {
          console.log("Message sent successfully:", msg);
          setMessages((prevMessages) => [...prevMessages, msg]);
          setMessage(""); // Clear the input box after sending
        }
      });
    }
  };

  return (
    <div className="channel-wrap">
      <div className="channel-list">
        <button onClick={createChannel}>Create New Channel</button>
        <ChannelList
          onChannelSelect={(channel) => {
            console.log("Channel selected:", channel);
            setCurrentChannel(channel);
            setShowSettings(false);
            hideSettingsBar();
          }}
        />
      </div>
      <div className="channel-chat" ref={channelChatRef}>
        <div className="message-list">
          {currentChannel ? (
            messages.length > 0 ? (
              messages.map((msg, index) => (
                <div key={index} className="message-item">
                  <strong>{msg.sender.nickname || msg.sender.userId}</strong>: {msg.message}
                </div>
              ))
            ) : (
              <div>No messages yet.</div>
            )
          ) : (
            <div>Please select a channel to start chatting.</div>
          )}
        </div>
        {currentChannel && (
          <div className="message-input">
            <textarea
              className="message-input"
              placeholder="Enter message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), sendMessage())}
              rows="1"
            ></textarea>
            <button onClick={sendMessage}>Send</button>
          </div>
        )}
      </div>
      {showSettings && (
        <div className="channel-settings">
          <ChannelSettings
            channelUrl={currentChannel ? currentChannel.url : ""}
            onCloseClick={() => {
              setShowSettings(false);
              hideSettingsBar();
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Chatbox;
