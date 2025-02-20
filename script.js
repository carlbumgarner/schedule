// Page 1: Task Input Page
document.getElementById('scheduleForm')?.addEventListener('submit', function(event) {
  event.preventDefault();

  const task = document.getElementById('task').value;
  const time = document.getElementById('time').value;

  if (task && time) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ task, time });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    
    // Reset form
    document.getElementById('task').value = '';
    document.getElementById('time').value = '';
  }
});

// Page 2: Schedule Display Page
window.addEventListener('load', function() {
  const scheduleList = document.getElementById('scheduleList');
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  if (tasks.length === 0) {
    scheduleList.innerHTML = '<p>No tasks available for today.</p>';
    return;
  }

  // Sort tasks by time
  tasks.sort((a, b) => a.time.localeCompare(b.time));

  tasks.forEach(task => {
    const taskElement = document.createElement('div');
    taskElement.classList.add('schedule-item');
    taskElement.innerHTML = `<strong>${task.time}</strong> - ${task.task}`;
    scheduleList.appendChild(taskElement);
  });

  showCurrentTimeLine();
});

// Show current time line
function showCurrentTimeLine() {
  const currentTimeLine = document.getElementById('currentTimeLine');
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes();
  const currentTimeInMinutes = currentHour * 60 + currentMinute;

  const scheduleList = document.getElementById('scheduleList');
  const taskItems = scheduleList.getElementsByClassName('schedule-item');

  let taskTimes = [];
  for (let item of taskItems) {
    const timeText = item.querySelector('strong').textContent;
    const [hours, minutes] = timeText.split(':').map(num => parseInt(num));
    taskTimes.push(hours * 60 + minutes);
  }

  // Check if we need to display the red line
  for (let i = 0; i < taskTimes.length; i++) {
    if (taskTimes[i] >= currentTimeInMinutes) {
      currentTimeLine.style.top = `${i * 50}px`;  // Adjust this for spacing between tasks
      currentTimeLine.style.display = 'block';
      break;
    }
  }
}
