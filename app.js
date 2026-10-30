const $ = (selector) => document.querySelector(selector);
const avatarClass = (color) => color === "pink" ? "avatar-pink" : color === "blue" ? "avatar-blue" : color === "green" ? "avatar-green" : "";
const avatar = (person) => `<div class="avatar ${avatarClass(person.avatar)}">${person.initial}</div>`;

function renderPosts() {
  $("#timeline").innerHTML = AU_DATA.posts.map(post => `
    <article class="post-card">
      <div class="post-head">${avatar(post)}<div class="post-identity"><b>${post.name} ${post.verified ? '<span class="verified">✦</span>' : ''}</b><small>${post.handle} · ${post.time}</small></div><span class="post-menu">···</span></div>
      <p class="post-text">${post.text}${post.tag ? ` <span class="post-tag">${post.tag}</span>` : ""}</p>
      ${post.image ? `<div class="post-image"><span>${post.image}</span></div>` : ""}
      <div class="post-actions"><span>♡ <b>${post.likes}</b></span><span>▢ <b>${post.replies}</b></span><span>↻ <b>${post.reposts}</b></span><span>↗</span></div>
    </article>`).join("");
}
function characterCard(person) {
  return `<article class="character-card">${avatar(person)}<div><h3>${person.name}</h3><p>${person.handle}<br>${person.bio}</p></div></article>`;
}
function renderCharacters() {
  $("#character-grid").innerHTML = AU_DATA.characters.map(characterCard).join("");
  $("#all-characters").innerHTML = AU_DATA.characters.map(characterCard).join("");
}
function renderChatList() {
  $("#chat-list").innerHTML = AU_DATA.conversations.map((chat, index) => `
    <button class="chat-contact ${index === 0 ? "active" : ""}" data-chat="${chat.id}">
      ${avatar(chat)}<span><b>${chat.name}</b><small>${chat.preview}</small></span>
    </button>`).join("");
  document.querySelectorAll("[data-chat]").forEach(button => button.addEventListener("click", () => {
    document.querySelectorAll("[data-chat]").forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    renderChat(button.dataset.chat);
  }));
  if (AU_DATA.conversations.length) renderChat(AU_DATA.conversations[0].id);
}
function renderChat(id) {
  const chat = AU_DATA.conversations.find(item => item.id === id);
  if (!chat) return;
  $("#chat-panel").innerHTML = `
    <div class="chat-header">${avatar(chat)}<div><b>${chat.name}</b><small>● active in this story</small></div></div>
    <div class="chat-messages"><div class="chat-date">TODAY</div>${chat.messages.map(message => `<div class="bubble ${message.from === "me" ? "me" : "them"}">${message.text}<time>${message.time}</time></div>`).join("")}</div>`;
}
const titles = { home: "Your timeline", explore: "Explore the AU", messages: "Your messages", profile: "The characters" };
function showView(view) {
  document.querySelectorAll(".view").forEach(section => section.classList.toggle("active", section.id === `view-${view}`));
  document.querySelectorAll(".nav-link").forEach(button => button.classList.toggle("active", button.dataset.view === view));
  $("#page-title").textContent = titles[view] || "Your timeline";
}
document.querySelectorAll(".nav-link").forEach(button => button.addEventListener("click", () => showView(button.dataset.view)));
document.querySelectorAll("[data-go]").forEach(button => button.addEventListener("click", () => showView(button.dataset.go)));
$("#about-button").addEventListener("click", () => $("#modal").hidden = false);
$("#modal-close").addEventListener("click", () => $("#modal").hidden = true);
$("#modal-ok").addEventListener("click", () => $("#modal").hidden = true);
$("#modal").addEventListener("click", event => { if (event.target.id === "modal") $("#modal").hidden = true; });
renderPosts();
renderCharacters();
renderChatList();