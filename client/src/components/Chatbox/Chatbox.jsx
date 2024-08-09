import { ChannelList, Channel, ChannelSettings, useSendbirdStateContext } from "@sendbird/uikit-react";
import { useState, useRef, useEffect } from "react";
import SendBird from 'sendbird';
import './Chatbox.css';

const Chatbox = () => {
  const [currentChannel, setCurrentChannel] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [sendbirdInstance, setSendbirdInstance] = useState(null);
  const channelChatRef = useRef(null);

  const appId = import.meta.env.VITE_APP_ID;
  const userId = import.meta.env.VITE_USER_ID;
  const nickname = import.meta.env.VITE_NICKNAME;
  const accessToken = import.meta.env.VITE_ACCESS_TOKEN;

  // Initialize the SendBird SDK and connect the user
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

        // Optionally update user information
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
        }
      });
    } else {
      console.error("SendBird instance or GroupChannel is not available.");
    }
  };

  return (
    <div className="channel-wrap">
      <div className="channel-list" style={{ padding: '10px' }}>
        <button
          onClick={createChannel}
          style={{ marginBottom: '10px', padding: '8px 12px', cursor: 'pointer' }}
        >
          Create New Channel
        </button>
        <ChannelList
          onChannelSelect={(channel) => {
            setCurrentChannel(channel);
            setShowSettings(false);
            hideSettingsBar();
          }}
        />
      </div>
      <div className="channel-chat" ref={channelChatRef}>
        {currentChannel ? (
          <Channel
            channelUrl={currentChannel.url}
            onChatHeaderActionClick={() => {
              setShowSettings(!showSettings);
              renderSettingsBar();
            }}
          />
        ) : (
          <div>Please select a channel to start chatting.</div>
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