/* =========================
   AFTERHOURS APP ENGINE
========================= */

const $ = (selector) => document.querySelector(selector);

let currentAU = null;
let currentApp = null;


/* =========================
   AU DATABASE
========================= */

function getAUList() {
  const data = window.AU_DATA || {};

  return [
    {
      id: "au-001",
      title: data.title || "AFTERHOURS",
      genre: "Romance · Drama",
      description: "A story waiting to be discovered.",
      status: "Ongoing",
      cover: "",
      characters: data.characters || [],
      posts: data.posts || [],
      conversations: data.conversations || []
    }
  ];
}


/* =========================
   AU LIBRARY
========================= */

function renderLibrary() {
  const auList = getAUList();
  const container = $("#au-list");

  $("#au-count").textContent =
    `${auList.length} ${auList.length === 1 ? "STORY" : "STORIES"}`;

  container.innerHTML = "";

  auList.forEach((au) => {
    const card = document.createElement("article");

    card.className = "au-card";

    card.innerHTML = `
      <div class="au-cover"></div>

      <div class="au-info">
        <h3>${escapeHTML(au.title)}</h3>
        <p>${escapeHTML(au.description)}</p>

        <div class="au-meta">
          <span>${escapeHTML(au.genre)}</span>
          <span class="au-status">${escapeHTML(au.status)}</span>
        </div>

        <button class="enter-au">
          Enter Story →
        </button>
      </div>
    `;

    card.querySelector(".enter-au").addEventListener("click", () => {
      enterAU(au);
    });

    container.appendChild(card);
  });
}


/* =========================
   ENTER AND EXIT AU
========================= */

function enterAU(au) {
  currentAU = au;

  $("#library-view").classList.add("hidden");
  $("#phone-view").classList.remove("hidden");

  $("#current-au-label").textContent =
    `NOW PLAYING: ${au.title.toUpperCase()}`;

  $("#home-character").textContent =
    au.characters[0]?.name || "Welcome back.";

  updateClock();
  renderNotifications();
  showPhoneScreen("lock-screen");
}

function exitAU() {
  currentAU = null;
  currentApp = null;

  $("#phone-view").classList.add("hidden");
  $("#library-view").classList.remove("hidden");
}


/* =========================
   CLOCK AND DATE
========================= */

function updateClock() {
  const now = new Date();

  const time = now.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit"
  });

  const date = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric"
  });

  $("#lock-clock").textContent = time;
  $("#status-time").textContent = time;
  $("#lock-date").textContent = date;
  $("#home-date").textContent = date;
}


/* =========================
   NOTIFICATIONS
========================= */

function renderNotifications() {
  const container = $("#notification-list");

  const conversations = currentAU?.conversations || [];

  container.innerHTML = "";

  conversations.slice(0, 3).forEach((chat) => {
    const lastMessage = chat.messages?.at(-1);

    if (!lastMessage) return;

    const notification = document.createElement("div");

    notification.className = "notification";

    notification.innerHTML = `
      <small>WHATSAPP · NOW</small>
      <strong>${escapeHTML(chat.name)}</strong>
      <p>${escapeHTML(lastMessage.text || "")}</p>
    `;

    container.appendChild(notification);
  });
}


/* =========================
   PHONE NAVIGATION
========================= */

function showPhoneScreen(screenId) {
  document.querySelectorAll(".phone-screen").forEach((screen) => {
    screen.classList.add("hidden");
  });

  $(`#${screenId}`).classList.remove("hidden");
}

function unlockPhone() {
  showPhoneScreen("home-screen");
}

function goHome() {
  currentApp = null;
  showPhoneScreen("home-screen");
}


/* =========================
   OPEN APPLICATION
========================= */

const appNames = {
  whatsapp: "WhatsApp",
  x: "X",
  gallery: "Gallery",
  photos: "Photos",
  camera: "Camera",
  notes: "Notes",
  contacts: "Contacts",
  settings: "Settings"
};

function openApp(appName) {
  currentApp = appName;

  $("#app-title").textContent = appNames[appName];

  showPhoneScreen("app-screen");

  renderApp(appName);
}


/* =========================
   APPLICATION CONTENT
========================= */

function renderApp(appName) {
  const content = $("#app-content");

  content.innerHTML = "";

  switch (appName) {
    case "whatsapp":
      renderWhatsApp(content);
      break;

    case "x":
      renderX(content);
      break;

    case "gallery":
    case "photos":
      renderGallery(content);
      break;

    case "contacts":
      renderContacts(content);
      break;

    case "notes":
      renderNotes(content);
      break;

    case "camera":
      renderCamera(content);
      break;

    case "settings":
      renderSettings(content);
      break;
  }
}


/* =========================
   WHATSAPP
========================= */

function renderWhatsApp(container) {
  const chats = currentAU?.conversations || [];

  if (!chats.length) {
    container.innerHTML = "<p>No conversations yet.</p>";
    return;
  }

  chats.forEach((chat) => {
    const lastMessage = chat.messages?.at(-1);

    const item = document.createElement("div");

    item.className = "chat-item";

    item.innerHTML = `
      <div class="chat-avatar">
        ${escapeHTML(chat.name.charAt(0))}
      </div>

      <div class="chat-details">
        <strong>${escapeHTML(chat.name)}</strong>
        <p>${escapeHTML(lastMessage?.text || "")}</p>
      </div>
    `;

    container.appendChild(item);
  });
}


/* =========================
   X TIMELINE
========================= */

function renderX(container) {
  const posts = currentAU?.posts || [];

  if (!posts.length) {
    container.innerHTML = "<p>No posts yet.</p>";
    return;
  }

  posts.forEach((post) => {
    const item = document.createElement("article");

    item.className = "tweet-item";

    item.innerHTML = `
      <strong>${escapeHTML(post.name || "Unknown")}</strong>
      <p>${escapeHTML(post.text || "")}</p>
      <small>♡ ${Number(post.likes) || 0} likes</small>
    `;

    container.appendChild(item);
  });
}


/* =========================
   GALLERY AND PHOTOS
========================= */

function renderGallery(container) {
  container.innerHTML = `
    <div class="empty-app">
      <div class="empty-icon">▧</div>
      <h3>Your Memories</h3>
      <p>Photos and albums will appear here.</p>
    </div>
  `;
}


/* =========================
   CONTACTS
========================= */

function renderContacts(container) {
  const characters = currentAU?.characters || [];

  characters.forEach((character) => {
    const item = document.createElement("div");

    item.className = "contact-item";

    item.innerHTML = `
      <div class="chat-avatar">
        ${escapeHTML(character.name.charAt(0))}
      </div>

      <div>
        <strong>${escapeHTML(character.name)}</strong>
        <p>${escapeHTML(character.handle || "")}</p>
      </div>
    `;

    container.appendChild(item);
  });
}


/* =========================
   NOTES
========================= */

function renderNotes(container) {
  container.innerHTML = `
    <div class="empty-app">
      <div class="empty-icon">▤</div>
      <h3>Notes</h3>
      <p>Your notes will appear here.</p>
    </div>
  `;
}


/* =========================
   CAMERA
========================= */

function renderCamera(container) {
  container.innerHTML = `
    <div class="empty-app">
      <div class="empty-icon">◉</div>
      <h3>Camera</h3>
      <p>Camera simulation is not connected to your real device.</p>
    </div>
  `;
}


/* =========================
   SETTINGS
========================= */

function renderSettings(container) {
  container.innerHTML = `
    <div class="settings-item">
      <strong>About this AU</strong>
      <p>${escapeHTML(currentAU.title)}</p>
    </div>

    <div class="settings-item">
      <strong>Characters</strong>
      <p>${currentAU.characters.length} characters</p>
    </div>

    <div class="settings-item">
      <strong>Story information</strong>
      <p>AFTERHOURS Story Simulator</p>
    </div>
  `;
}


/* =========================
   SECURITY HELPER
========================= */

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);
}


/* =========================
   EVENT LISTENERS
========================= */

$("#unlock-button").addEventListener("click", unlockPhone);

$("#home-indicator").addEventListener("click", goHome);

$("#app-back").addEventListener("click", goHome);

$("#exit-au-button").addEventListener("click", exitAU);

document.querySelectorAll(".app-icon").forEach((button) => {
  button.addEventListener("click", () => {
    openApp(button.dataset.app);
  });
});


/* =========================
   INITIALIZE
========================= */

function initializeAfterhours() {
  renderLibrary();
  updateClock();

  setInterval(updateClock, 1000);
}

initializeAfterhours();
