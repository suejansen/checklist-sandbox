const movingHouseProgress = document.querySelector("#moving-house-progress");
const movingHouseProgressLabel = document.querySelector("#moving-house-progress-label");
const movingHouseProgressBar = document.querySelector("#moving-house-progress-bar");
const movingHouseStorageKey = "checklistSandboxMovingHouseTasks";
const movingHouseTaskCount = 21;
const completedMovingHouseTasks = JSON.parse(localStorage.getItem(movingHouseStorageKey) || "[]").length;

if (completedMovingHouseTasks > 0) {
  const progress = Math.round((completedMovingHouseTasks / movingHouseTaskCount) * 100);
  movingHouseProgress.hidden = false;
  movingHouseProgressLabel.textContent = progress === 100 ? "Completed" : `${progress}% complete`;
  movingHouseProgressBar.style.width = `${progress}%`;
}