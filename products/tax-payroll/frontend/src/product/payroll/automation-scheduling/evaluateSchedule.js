export function evaluateSchedule(schedule, now = new Date()) {
  if (!schedule.enabled) {
    return result(false, 'Schedule disabled');
  }

  if (schedule.frequency === 'event') {
    return result(false, 'Awaiting enterprise event');
  }

  const minute = now.getMinutes();
  const hour = now.getHours();

  if (schedule.frequency === 'hourly') {
    return result(minute < 5, 'Runs during first five minutes');
  }

  if (schedule.frequency === 'daily') {
    return result(hour === 6 && minute < 15, 'Runs at 06:00');
  }

  if (schedule.frequency === 'weekly') {
    return result(
      now.getDay() === 1 && hour === 6 && minute < 15,
      'Runs Monday at 06:00'
    );
  }

  return result(false, 'Unsupported schedule');
}

function result(due, reason) {
  return Object.freeze({ due, reason });
}
