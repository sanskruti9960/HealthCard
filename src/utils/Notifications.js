// utils/Notifications.js
import notifee, { AndroidImportance } from '@notifee/react-native';
import moment from 'moment';

export const scheduleReminder = async (reminder) => {
  const { frequency, times, weekdays, interval, startDate, name, medicationId } = reminder;
  const channelId = 'medication-reminders';

  for (let i = 0; i < times.length; i++) {
    const [hour, minute] = times[i].split(":").map(Number);
    const notificationTime = moment().hour(hour).minute(minute).second(0);

    await notifee.displayNotification({
      title: '💊 Test Notification',
      body: 'Heads-up should popup now!',
      android: {
        channelId: 'medication-reminders',
        importance: AndroidImportance.HIGH,
        smallIcon: 'ic_launcher',
        pressAction: { id: 'default' },
        sound: 'default',
        fullScreenAction: { id: 'default' }, // optional
      },
    });



    const normalizedFrequency = frequency.toLowerCase().replace(/\s+/g, '_');
    // So "Every day" → "every_day"


    if (normalizedFrequency === "every_day") {

      await notifee.createTriggerNotification(
        {
          title: '💊 Medication Reminder',
          body: `Time to take ${name}`,
          android: {
            channelId,
            pressAction: {
              id: 'default',
            },
          },
        },
        {
          type: notifee.TriggerType.TIMESTAMP,
          timestamp: notificationTime.toDate().getTime(), // Schedule time
          repeatFrequency: notifee.RepeatFrequency.DAILY,
        }
      );
    }

    if (normalizedFrequency === "every_week") {
      for (let day of weekdays) {
        const dayOffset = getNextWeekdayOffset(day);
        const scheduledTime = moment()
          .add(dayOffset, 'days')
          .hour(hour)
          .minute(minute)
          .second(0);

        await notifee.createTriggerNotification(
          {
            title: '💊 Medication Reminder',
            body: `Time to take ${name} on ${day}`,
            android: {
              channelId,
              pressAction: {
                id: 'default',
              },
            },
          },
          {
            type: notifee.TriggerType.TIMESTAMP,
            timestamp: scheduledTime.toDate().getTime(),
            repeatFrequency: notifee.RepeatFrequency.WEEKLY,
          }
        );
      }
    }

    if (normalizedFrequency === "every_x_days" && interval) {
      const start = moment(startDate).hour(hour).minute(minute).second(0);

      await notifee.createTriggerNotification(
        {
          title: '💊 Medication Reminder',
          body: `Take ${name} every ${interval} days`,
          android: {
            channelId,
            pressAction: {
              id: 'default',
            },
          },
        },
        {
          type: notifee.TriggerType.TIMESTAMP,
          timestamp: start.toDate().getTime(),
          repeatFrequency: notifee.RepeatFrequency.DAILY, // Workaround, see note below
        }
      );

      // NOTE: Notifee doesn’t natively support "every X days", so we use DAILY and track logic yourself if needed
    }
  }
};

function getNextWeekdayOffset(dayName) {
  const daysMap = {
    sunday: 0,
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
  };

  const today = moment().day();
  const targetDay = daysMap[dayName.toLowerCase()];
  let diff = targetDay - today;
  if (diff < 0) diff += 7;
  return diff;
}
