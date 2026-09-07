const movingHouseStorageKey = "checklistSandboxMovingHouseTasks";
const savedTaskIds = JSON.parse(localStorage.getItem(movingHouseStorageKey) || "[]");

document.querySelectorAll(".task-checkbox").forEach((checkbox) => {
  checkbox.checked = savedTaskIds.includes(checkbox.id);
});

function saveMovingHouseProgress() {
  const completedTaskIds = [...document.querySelectorAll(".task-checkbox:checked")].map((checkbox) => checkbox.id);
  localStorage.setItem(movingHouseStorageKey, JSON.stringify(completedTaskIds));
}

document.querySelectorAll(".checklist-section").forEach((section) => {
  const taskList = section.querySelector(".task-list");
  const progressBar = section.querySelector(".progress-bar");
  const progressPercent = section.querySelector(".progress-summary span");
  const progressTrack = section.querySelector(".progress-track");

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
    checkbox.addEventListener("change", () => {
      updateChecklist();
      saveMovingHouseProgress();
    });
  });

  taskList.querySelectorAll(".task-toggle").forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const details = document.querySelector(`#${toggle.getAttribute("aria-controls")}`);
      const isExpanded = toggle.getAttribute("aria-expanded") === "true";

      toggle.setAttribute("aria-expanded", String(!isExpanded));
      details.hidden = isExpanded;
    });
  });

  updateChecklist();
});