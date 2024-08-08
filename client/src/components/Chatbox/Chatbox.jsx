import { App as SendbirdApp } from '@sendbird/uikit-react';
import '@sendbird/uikit-react/dist/index.css';
import Sendbird from 'sendbird';
import { useSendbirdStateContext } from '@sendbird/uikit-react';

const sb = new Sendbird({ appId: '6A662132-1A2E-41DB-BA05-00848E512DB0' });

const userListQuery = sb.createUserListQuery(); // Ensure this method is valid in your SDK version

userListQuery.next((users, error) => {
  if (error) {
    console.error('Failed to fetch users:', error);
  } else {
    console.log('Fetched users:', users);
  }
});

const useCreateChannel = (userId, deliveryPersonId, onCreateChannel) => {
  const { stores } = useSendbirdStateContext();
  const sdk = stores.sdkStore.sdk;

  return async () => {
    if (!sdk || !sdk.groupChannel) {
      console.error('Sendbird SDK is not initialized');
      return;
    }

    const params = {
      invitedUserIds: [userId, deliveryPersonId],
      isDistinct: true,
    };

    try {
      const channel = await sdk.groupChannel.createChannel(params);
      onCreateChannel(channel.url);
    } catch (error) {
      console.error('Failed to create channel:', error);
    }
  };
};


function App() {
    return (
      <div style={{ width: '100vw', height: '100vh' }}>
        <SendbirdApp
          appId={'YOUR_APP_ID'}
          userId={'USER_ID'}
        />
      </div>
    );
  }
  
  export default App;