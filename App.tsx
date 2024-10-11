import React, {useEffect, useState} from 'react';
import {Button, PermissionsAndroid, Platform, Text, View} from 'react-native';
import PushNotification from 'react-native-push-notification';
import { LocalPush, SchedulePush } from './components/Local';


function App() {

  useEffect(() => {
    const requestNotificationPermission = async () => {
      if (Platform.OS === 'android' && Platform.Version >= 33) {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Notification permission granted');
          } else {
            console.log('Notification permission denied');
          }
        } catch (error) {
          console.error('Permission request error:', error);
        }
      }
    };

    requestNotificationPermission();

    PushNotification.configure({
      onRegister: function (token) {
        console.log('TOKEN:', token);
      },

      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);
      },

      onAction: function (notification) {
        console.log('ACTION:', notification.action);
        console.log('NOTIFICATION:', notification);
      },

      onRegistrationError: function (err) {
        console.error(err.message, err);
      },

      popInitialNotification: true,
      requestPermissions: Platform.OS === 'ios',
      
    });
  }, [PermissionsAndroid]);

  PushNotification.createChannel(
    {
      channelId: 'channel-id',
      channelName: 'My Schedule channel',
    },
    created => console.log(`createChannel returned ${created}`), // (optional) callback returns whether the channel was created, false means it already existed.
  );

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View>
        <Button title="Notification" onPress={()=>LocalPush('channel-id')}></Button>
      </View>
      <View style = {{margin : 30}}>
        <Button title="Schedule Notification" onPress={()=>SchedulePush('channel-id')}></Button>
      </View>
      <Text>Hello World</Text>
    </View>
  );
}

export default App;
