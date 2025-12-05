const enableBtn = document.getElementById("enable-btn");
const notifyBtn = document.getElementById("notify-btn");
const badge = document.getElementById("permission-badge");
const supportText = document.getElementById("support-text");
const toast = document.getElementById("toast");

function showToast(message) {
  toast.textContent = message;
  toast.classList.remove("hidden");
  requestAnimationFrame(() => {
    toast.classList.add("show");
  });
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.classList.add("hidden"), 200);
  }, 2200);
}

function updateBadge(permission) {
  badge.classList.remove("badge-pending", "badge-granted", "badge-denied");

  if (permission === "granted") {
    badge.textContent = "Granted";
    badge.classList.add("badge-granted");
    notifyBtn.disabled = false;
  } else if (permission === "denied") {
    badge.textContent = "Denied";
    badge.classList.add("badge-denied");
    notifyBtn.disabled = true;
  } else {
    badge.textContent = "Not requested";
    badge.classList.add("badge-pending");
    notifyBtn.disabled = true;
  }
}

if (!("Notification" in window)) {
  supportText.textContent =
    "Your browser does not support the Notification API. Try using a modern browser like Chrome or Edge.";
  updateBadge("denied");
  enableBtn.disabled = true;
  notifyBtn.disabled = true;
} else {
  supportText.textContent =
    "Tip: Notifications usually work only on HTTPS or localhost, not from a plain file opened from your computer.";
  updateBadge(Notification.permission);
}

enableBtn.addEventListener("click", () => {
  if (!("Notification" in window)) return;

  Notification.requestPermission().then((permission) => {
    updateBadge(permission);

    if (permission === "granted") {
      showToast("Permission granted. You can send notifications now.");
    } else if (permission === "denied") {
      showToast("Permission denied by the user.");
    } else {
      showToast("Permission dismissed. You can try again.");
    }
  });
});

notifyBtn.addEventListener("click", () => {
  if (!("Notification" in window)) return;

  if (Notification.permission === "granted") {
    new Notification("👋 Hey there!", {
      body: "This is your simple notification from the Notification Clicker.",
    });
    showToast("Notification sent!");
  } else {
    showToast("Please enable notifications first.");
  }
});
