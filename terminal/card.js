const terminalOutput = document.getElementById("terminal-output");
const terminalForm = document.getElementById("terminal-form");
const terminalInput = document.getElementById("terminal-input");

const githubUrl = "https://github.com/HassanRajib";
const cvPath = "asset/RajibCv.pdf";
const previewImagePath = "../asset/my.png";
const contactNumber = "+880 1516-125409";

const state = {
  mode: "locked",
};

function appendBlock(element) {
  terminalOutput.appendChild(element);
  requestAnimationFrame(() => {
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  });
}

function appendText(text, className = "terminal-text") {
  const line = document.createElement("p");
  line.className = className;
  line.textContent = text;
  appendBlock(line);
}

function appendCommand(command) {
  const line = document.createElement("p");
  line.className = "terminal-line";
  line.innerHTML = `<span class="prompt">user@portfolio:~$</span> ${escapeHtml(command)}`;
  appendBlock(line);
}

function appendMenu() {
  const list = document.createElement("ol");
  list.className = "terminal-list";

  ["pic", "call", "git", "cv"].forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    list.appendChild(li);
  });

  appendBlock(list);
  appendText("Choose one command from the list above.");
}

function renderImagePanel() {
  const panel = document.createElement("div");
  panel.className = "terminal-panel";
  panel.innerHTML = `
    <img src=${previewImagePath} alt="Profile preview">
    <p class="panel-input-note">Type <strong>x</strong> to close this panel.</p>
  `;
  appendBlock(panel);
}

function renderContactPanel() {
  const panel = document.createElement("div");
  panel.className = "terminal-panel";
  panel.innerHTML = `
    <div class="contact-row">
      <span class="whatsapp-badge">W</span>
      <strong>${contactNumber}</strong>
    </div>
    <p class="panel-input-note">Type <strong>x</strong> to close this panel.</p>
  `;
  appendBlock(panel);
}

function showWelcome() {
  terminalOutput.innerHTML = "";
  appendText("admin terminal");
  appendText('<!-- write "hi", or "hello" to start -->', "terminal-comment");
  appendText("This terminal unlocks after a greeting.");
  terminalInput.placeholder = "hi";
  terminalInput.focus();
}

function showMenu() {
  state.mode = "menu";
  terminalInput.value = "";
  terminalInput.placeholder = "pic | call | git | cv";
  appendText("Session started.");
  appendMenu();
}

function closePanel() {
  state.mode = "menu";
  terminalInput.value = "";
  terminalInput.placeholder = "pic | call | git | cv";
  appendText("Returned to command list.");
  appendMenu();
}

function handleLockedInput(command) {
  if (command === "hi" || command === "hello") {
    showMenu();
    return;
  }

  appendText(
    'Start command not recognized. Type "hi" or "hello".',
    "terminal-helper",
  );
}

function triggerCvDownload() {
  const link = document.createElement("a");
  link.href = cvPath;
  link.download = "Rajib-Hasan-CV.pdf";
  document.body.appendChild(link);
  link.click();
  link.remove();
}

function handleMenuInput(command) {
  switch (command) {
    case "1":
    case "pic":
      state.mode = "panel";
      terminalInput.placeholder = "x";
      renderImagePanel();
      break;
    case "2":
    case "call":
    case "t call":
      state.mode = "panel";
      terminalInput.placeholder = "x";
      renderContactPanel();
      break;
    case "3":
    case "git":
      window.open(githubUrl, "_blank", "noopener");
      appendText("GitHub opened in a new tab.");
      appendMenu();
      break;
    case "4":
    case "cv":
      triggerCvDownload();
      appendText("CV download started.");
      appendMenu();
      break;
    default:
      appendText(
        "Unknown command. Use pic, call, git, or cv.",
        "terminal-helper",
      );
  }
}

function handlePanelInput(command) {
  if (command === "x") {
    closePanel();
    return;
  }

  appendText('This panel only accepts "x" to exit.', "terminal-helper");
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

terminalForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const command = terminalInput.value.trim().toLowerCase();
  if (!command) {
    return;
  }

  appendCommand(command);

  if (state.mode === "locked") {
    handleLockedInput(command);
  } else if (state.mode === "menu") {
    handleMenuInput(command);
  } else {
    handlePanelInput(command);
  }

  terminalInput.value = "";
  terminalInput.focus();
});

showWelcome();
