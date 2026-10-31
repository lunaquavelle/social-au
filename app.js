
/* =========================
   AFTERHOURS APP ENGINE
   Interactive WhatsApp Edition
========================= */

const $ = (selector) => document.querySelector(selector);

let currentAU = null;
let currentApp = null;
let activeChatId = null;
let chatRuntime = {};
let chatTimer = null;


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
      description: data.description || "A story waiting to be discovered.",
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
  chatRuntime = {};
  activeChatId = null;

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
  if (chatTimer) clearTimeout(chatTimer);

  currentAU = null;
  currentApp = null;
  activeChatId = null;
  chatRuntime = {};

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

function getCurrentTime() {
  return new Date().toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit"
  });
}


/* =========================
   NOTIFICATIONS
========================= */

function getChatPreview(chat) {
  if (chat.story?.opening) {
    return chat.story.opening;
  }

  return chat.messages?.at(-1)?.text || "New conversation";
}

function renderNotifications() {
  const container = $("#notification-list");
  const conversations = currentAU?.conversations || [];

  container.innerHTML = "";

  conversations.slice(0, 3).forEach((chat) => {
    const notification = document.createElement("button");

    notification.type = "button";
    notification.className = "notification ah-notification";

    notification.innerHTML = `
      <small>WHATSAPP · NOW</small>
      <strong>${escapeHTML(chat.name)}</strong>
      <p>${escapeHTML(getChatPreview(chat))}</p>
    `;

    notification.addEventListener("click", () => {
      openChat(chat.id);
    });

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
  activeChatId = null;
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
  settings: "Settings",
  phone: "Phone"
};

function openApp(appName) {
  currentApp = appName;
  activeChatId = null;

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
   
    case "phone":
      renderPhone();
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
   WHATSAPP CHAT LIST
========================= */

function renderPhone() {
  $("#app-content").innerHTML = `
    <div class="phone-app">
      <div class="phone-app-title">Phone</div>

      <div class="phone-tabs">
        <button class="phone-tab active">Favorites</button>
        <button class="phone-tab">Recents</button>
        <button class="phone-tab">Contacts</button>
        <button class="phone-tab">Keypad</button>
      </div>

      <div class="phone-empty">
        <div class="phone-empty-icon">☎</div>
        <h3>Your Phone</h3>
        <p>Your story calls will appear here.</p>
      </div>
    </div>
  `;
}

function renderWhatsApp(container) {
  const chats = currentAU?.conversations || [];

  if (!chats.length) {
    container.innerHTML = "<p>No conversations yet.</p>";
    return;
  }

  const heading = document.createElement("div");
  heading.className = "ah-chat-heading";
  heading.textContent = "MESSAGES";

  container.appendChild(heading);

  chats.forEach((chat) => {
    const item = document.createElement("button");

    item.type = "button";
    item.className = "chat-item ah-chat-item";

    item.innerHTML = `
      <div class="chat-avatar">
        ${escapeHTML(chat.initial || chat.name.charAt(0))}
      </div>

      <div class="chat-details">
        <strong>${escapeHTML(chat.name)}</strong>
        <p>${escapeHTML(getChatPreview(chat))}</p>
      </div>

      <span class="ah-chat-arrow">›</span>
    `;

    item.addEventListener("click", () => {
      openChat(chat.id);
    });

    container.appendChild(item);
  });
}


/* =========================
   OPEN INDIVIDUAL CHAT
========================= */

function openChat(chatId) {
  const chat = currentAU?.conversations.find(
    (item) => item.id === chatId
  );

  if (!chat) return;

  activeChatId = chatId;
  currentApp = "whatsapp";

  $("#app-title").textContent = "WhatsApp";

  showPhoneScreen("app-screen");
  renderChat(chat);
}


/* =========================
   CHAT RUNTIME
========================= */

function initializeChatRuntime(chat) {
  if (chatRuntime[chat.id]) return;

  if (chat.story) {
    chatRuntime[chat.id] = {
      messages: [
        {
          from: "them",
          text: chat.story.opening,
          time: getCurrentTime()
        }
      ],
      choices: chat.story.choices || [],
      typing: false,
      finished: false
    };

    return;
  }

  chatRuntime[chat.id] = {
    messages: [...(chat.messages || [])],
    choices: [],
    typing: false,
    finished: true
  };
}


/* =========================
   RENDER CHAT ROOM
========================= */

function renderChat(chat) {
  initializeChatRuntime(chat);

  const runtime = chatRuntime[chat.id];
  const content = $("#app-content");

  const messagesHTML = runtime.messages.map((message) => `
    <div class="ah-message-row ${message.from === "me" ? "ah-message-right" : "ah-message-left"}">
      <div class="ah-bubble ${message.from === "me" ? "ah-bubble-me" : "ah-bubble-them"}">
        <p>${escapeHTML(message.text)}</p>
        <small>${escapeHTML(message.time || "")}</small>
      </div>
    </div>
  `).join("");

  const typingHTML = runtime.typing ? `
    <div class="ah-message-row ah-message-left">
      <div class="ah-typing">
        <span></span><span></span><span></span>
      </div>
    </div>
  ` : "";

  let choicesHTML = "";

  if (runtime.choices.length && !runtime.typing) {
    choicesHTML = `
      <div class="ah-choice-area">
        <p>CHOOSE YOUR REPLY</p>

        <div class="ah-choice-list">
          ${runtime.choices.map((choice, index) => `
            <button
              type="button"
              class="ah-choice-button"
              data-choice-index="${index}">
              ${escapeHTML(choice.reply)}
            </button>
          `).join("")}
        </div>
      </div>
    `;
  }

  if (runtime.finished && !runtime.typing && chat.story) {
    choicesHTML = `
      <div class="ah-scene-end">
        <p>END OF THIS SCENE</p>
        <span>More conversations coming soon.</span>
      </div>
    `;
  }

  content.innerHTML = `
    <div class="ah-chat-view">

      <div class="ah-chat-subheader">
        <button type="button" class="ah-chat-back">
          ‹ Chats
        </button>

        <div class="ah-chat-person">
          <strong>${escapeHTML(chat.name)}</strong>
          <small>${chat.story ? "tap a reply to continue" : "conversation history"}</small>
        </div>
      </div>

      <div class="ah-message-list" id="ah-message-list">
        ${messagesHTML}
        ${typingHTML}
      </div>

      ${choicesHTML}

    </div>
  `;

  content.querySelector(".ah-chat-back").addEventListener("click", () => {
    activeChatId = null;
    renderWhatsApp(content);
  });

  content.querySelectorAll(".ah-choice-button").forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.choiceIndex);
      selectChatChoice(chat, index);
    });
  });

  scrollChatToBottom();
}


/* =========================
   SELECT REPLY
========================= */

function selectChatChoice(chat, index) {
  const runtime = chatRuntime[chat.id];

  if (!runtime || runtime.typing) return;

  const choice = runtime.choices[index];

  if (!choice) return;

  runtime.messages.push({
    from: "me",
    text: choice.reply,
    time: getCurrentTime()
  });

  runtime.choices = [];
  runtime.typing = true;

  renderChat(chat);

  if (chatTimer) clearTimeout(chatTimer);

  chatTimer = setTimeout(() => {
    runtime.typing = false;

    runtime.messages.push({
      from: "them",
      text: choice.response,
      time: getCurrentTime()
    });

    runtime.choices = choice.choices || [];
    runtime.finished = runtime.choices.length === 0;

    renderChat(chat);

    chatTimer = null;
  }, 1200);
}


/* =========================
   CHAT SCROLL
========================= */

function scrollChatToBottom() {
  const messageList = $("#ah-message-list");

  if (messageList) {
    messageList.scrollTop = messageList.scrollHeight;
  }
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

document.querySelectorAll(".app-icon, .dock-icon").forEach((icon) => {
  icon.addEventListener("click", () => {
    openApp(icon.dataset.app);
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
