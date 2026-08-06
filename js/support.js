(function () {
  "use strict";

  const list = document.getElementById("support-channel-list");
  if (!list || !window.SUPPORT_CHANNELS) return;

  window.SUPPORT_CHANNELS.forEach((channel) => {
    const card = document.createElement("article");
    card.className = "support-channel-card reveal";
    card.innerHTML =
      '<div class="support-channel-icon" aria-hidden="true">' +
      (channel.icon || "💬") +
      "</div>" +
      "<div class='support-channel-body'>" +
      "<h2>" +
      channel.title +
      "</h2>" +
      "<p>" +
      channel.description +
      "</p>" +
      "<a class='btn btn-secondary support-channel-cta' href='" +
      channel.url +
      "' target='_blank' rel='noopener noreferrer'>" +
      (channel.cta || "Mở liên kết") +
      "</a>" +
      "</div>";
    list.appendChild(card);
  });

  const reveals = list.querySelectorAll(".reveal");
  if (reveals.length && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    reveals.forEach((el) => observer.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("visible"));
  }
})();
