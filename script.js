const taskList = document.querySelector("#task-list");
const progressBar = document.querySelector("#progress-bar");
const progressPercent = document.querySelector("#progress-percent");
const progressTrack = document.querySelector(".progress-track");

function updateChecklist() {
  const tasks = [...taskList.querySelectorAll(".task-item")];
  const completedTasks = tasks.filter((task) => task.querySelector(".task-checkbox").checked);
  const progress = Math.round((completedTasks.length / tasks.length) * 100);

  tasks.forEach((task) => {
    task.classList.toggle("completed", task.querySelector(".task-checkbox").checked);
  });

  [...tasks].sort((firstTask, secondTask) => {
    const firstCompleted = firstTask.querySelector(".task-checkbox").checked;
    const secondCompleted = secondTask.querySelector(".task-checkbox").checked;
    return Number(firstCompleted) - Number(secondCompleted);
  }).forEach((task) => taskList.append(task));

  progressBar.style.width = `${progress}%`;
  progressPercent.textContent = `${progress}%`;
  progressTrack.setAttribute("aria-valuenow", progress);
}

taskList.querySelectorAll(".task-checkbox").forEach((checkbox) => {
  checkbox.addEventListener("change", updateChecklist);
});