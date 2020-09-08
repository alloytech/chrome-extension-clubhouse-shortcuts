const panel = document.createElement("div");
panel.classList.add("alloy-cb-shortcut-container");
document.body.appendChild(panel);

let prevTickets = new Set();

let timeout = null;

const resetShortcuts = () => {
  const tickets = new Set(
    [...document.body.innerText.matchAll(/ch[0-9]+/g)].map((m) => m[0])
  );
  if (
    tickets.size === prevTickets.size &&
    [...tickets].every((value) => prevTickets.has(value))
  ) {
    return;
  }

  panel.innerHTML = "";
  tickets.forEach((ticket) => {
    const link = document.createElement("a");
    link.classList.add("alloy-cb-shortcut-link");
    link.href = `https://app.clubhouse.io/alloytech/story/${ticket.substr(2)}`;
    link.target = "_blank";
    link.innerText = ticket;
    panel.appendChild(link);
  });
};

resetShortcuts();

const debounced = () => {
  if (timeout) {
    window.clearTimeout(timeout);
  }

  const callback = () => {
    resetShortcuts();
    timeout = null;
  };
  timeout = window.setTimeout(callback, 1000);
};

const observer = new MutationObserver(debounced);
observer.observe(document, { childList: true, subtree: true });
