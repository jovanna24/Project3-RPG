// src/components/Chatbox/Chatbox.jsx
import React, { useEffect, useState } from 'react';
import { ChannelList, Channel, ChannelSettings } from '@sendbird/uikit-react';
import SendbirdChat from '@sendbird/chat';
import { OpenChannelModule } from '@sendbird/chat/openChannel';
import './Chatbox.css';

const Chatbox = ({ }) => {
  const [currentChannel, setCurrentChannel] = useState(null);
  const currentChannelUrl = currentChannel ? currentChannel.url : "";
  const [showSettings, setShowSettings] = useState(false);

  const renderSettingsBar = () => {
    channelChatDiv.style.width = "52%";
    channelChatDiv.style.cssFloat = "left";
  };

  return (
    <div className="channel-wrap">
      <div className="channel-list">
        <ChannelList 
          onChannelSelect={(channel)=> {
            setCurrentChannel(channel);
          }}
          />
            </div>
            <div className= "channel-chat">
              <Channel
                channelUrl = {currentChannelUrl}
                onChatHeaderActionClick={() => {
                  setShowSettings(!showSettings);
                  renderSettingsBar();
                }}
                />
            </div>
            {showSettings && (
             <div className = "channel-settings">
              <ChannelSettings
                channelUrl = {currentChannelUrl}
                onCloseClick={() => {
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
