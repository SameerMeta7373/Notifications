import PushNotification from 'react-native-push-notification';

export const LocalPush = (channelId : string) => {
  PushNotification.localNotification({
    channelId: channelId,
    title: 'New Notification',
    message: 'This is a Local Notification You won a Prize money',
    playSound: true,
    soundName: 'default',
  });
};


export const SchedulePush =  (channelId : string) => {
    PushNotification.localNotificationSchedule({
      channelId: channelId,
      date: new Date(new Date().getTime() + 5000),
      title: 'Schedule Notification',
      message: 'This is a Scheduled Notification',
      playSound: true,
      allowWhileIdle: false,
      soundName: 'default',
    });
  };

