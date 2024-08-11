import "./Chatbox.css";
import { ChannelList, Channel, ChannelSettings } from "@sendbird/uikit-react";
import { useRef, useState } from "react";

const Chatbox = () => {
  const [currentChannel, setCurrentChannel] = useState(null);
  const currentChannelURL = currentChannel ? currentChannel.url : "";
  const [showSettings, setShowSettings] = useState(false);
  const channelChatRef = useRef(null);
  

  const renderSettingsBar = () => {
    if (channelChatRef.current) {
      channelChatRef.current.style.width = "52%";
      channelChatRef.current.style.float = "left";
    }
  };

  const hideSettingsBar = () => {
    if (channelChatRef.current) {
      channelChatRef.current.style.width = "100%";
      channelChatRef.current.style.float = "none";
    }
  };

  console.log('current channel', currentChannel);
  console.log('Current Channel Ref', channelChatRef);
  console.log('show settings', showSettings);

  return (
    <div className="channel-wrap">
      <div className="channel-list">
        <ChannelList
          onChannelSelect={(channel) => {
            setCurrentChannel(channel);
            setShowSettings(channel);
          }}
        />
      </div>
      <div className="channel-chat">
        <Channel
          channelUrl={currentChannelURL}
          onChatHeaderActionClick={() => {
            setShowSettings(!showSettings);
            renderSettingsBar();
          }}
        />
      </div>
      {showSettings && (
        <div className="channel-settings">
          <ChannelSettings
            channelUrl={currentChannelURL}
            onBackClick={() => {
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
