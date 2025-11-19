
// Helper: get current year for footer
document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});

// Mobile navigation toggle
const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.querySelector(".main-nav");

if (navToggle && mainNav) {
  navToggle.addEventListener("click", () => {
    mainNav.classList.toggle("open");
  });

  // Close menu when clicking a link (on mobile)
  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
    });
  });
}

// --- Events & RSVP system (localStorage-based demo) ---

// Define your events here
const eventsData = [
  {
    id: "pafos-scramble-2025-01",
    title: "Pafos Scramble Practice",
    type: "Scramble",
    date: "2025-12-14",
    time: "09:30",
    location: "Paphos Hills",
    difficulty: "Intermediate",
    description:
      "Scramble-style laps on a mixed terrain loop. Ideal for riders with some off-road experience.",
  },
  {
    id: "hard-enduro-training-2025-02",
    title: "Hard Enduro Training Day",
    type: "Hard Enduro",
    date: "2026-01-10",
    time: "09:00",
    location: "Paphos Quarry Area",
    difficulty: "Advanced",
    description:
      "Technical sections, hill climbs, and line-choice coaching. Not suitable for complete beginners.",
  },
  {
    id: "adventure-ride-2025-03",
    title: "Adventure Ride & Coffee",
    type: "Adventure",
    date: "2025-12-28",
    time: "08:30",
    location: "Paphos – Polis – Paphos",
    difficulty: "All Levels",
    description:
      "Mixed tarmac and easy gravel. Perfect for big adventure bikes and newer riders.",
  },
];

// Load RSVP count from localStorage
function getRsvpCount(eventId) {
  const key = `pmc_rsvp_${eventId}`;
  const stored = localStorage.getItem(key);
  return stored ? parseInt(stored, 10) || 0 : 0;
}

// Save RSVP count to localStorage
function setRsvpCount(eventId, count) {
  const key = `pmc_rsvp_${eventId}`;
  localStorage.setItem(key, String(count));
}

// Handle RSVP click
function handleRsvp(eventId) {
  const countSpan = document.querySelector(
    `.event-card[data-event-id="${eventId}"] .event-count-number`
  );

  if (!countSpan) return;

  let count = getRsvpCount(eventId);
  count += 1;
  setRsvpCount(eventId, count);
  countSpan.textContent = count;

  const btn = document.querySelector(
    `.event-card[data-event-id="${eventId}"] .rsvp-btn`
  );
  if (btn) {
    btn.textContent = "You're in!";
    btn.disabled = true;
  }
}

// Render event cards into #events-list
function renderEvents() {
  const eventsList = document.getElementById("events-list");
  if (!eventsList) return;

  eventsList.innerHTML = "";

  eventsData.forEach((event) => {
    const count = getRsvpCount(event.id);

    const card = document.createElement("article");
    card.className = "card event-card";
    card.dataset.eventId = event.id;

    card.innerHTML = `
      <div class="event-card-header">
        <div class="event-title">${event.title}</div>
        <div class="event-type">${event.type}</div>
      </div>
      <div class="event-meta">
        <span>📅 ${event.date}</span>
        <span>⏰ ${event.time}</span>
        <span>📍 ${event.location}</span>
        <span>⚙️ ${event.difficulty}</span>
      </div>
      <p class="event-description">${event.description}</p>
      <div class="event-footer">
        <button type="button" class="btn btn-outline rsvp-btn">
          I'm Coming
        </button>
        <span class="event-count">
          <span class="event-count-number">${count}</span> going (on this device)
        </span>
      </div>
    `;

    const btn = card.querySelector(".rsvp-btn");
    if (btn) {
      // If already RSVP'd on this device, disable button
      if (count > 0) {
        btn.textContent = "You're in!";
        btn.disabled = true;
      }

      btn.addEventListener("click", () => handleRsvp(event.id));
    }

    eventsList.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", renderEvents);

// --- Simple form handling (membership + ideas) ---
// For now, we just show a success message instead of sending real emails.
// Later we can connect this to EmailJS, a Google Apps Script endpoint, etc.

function setupForm(formId, statusId) {
  const form = document.getElementById(formId);
  const status = document.getElementById(statusId);
  if (!form || !status) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Here is where you'd send the data to a backend or service.
    // For now, we just reset the form and show a message.
    status.textContent = "Thank you! Your submission has been recorded.";
    form.reset();

    setTimeout(() => {
      status.textContent = "";
    }, 4000);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupForm("membership-form", "membership-status");
  setupForm("ideas-form", "ideas-status");
});
