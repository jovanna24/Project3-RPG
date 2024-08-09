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
    channelChatDiv.style.width = "76%";
    channelChatDiv.style.float = "right";
  }

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
              renderSettingsBar();
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Chatbox;
