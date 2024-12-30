// Initialize interval at a global scope without assignment
var interval;

function toggleSidebar() {
  // Attempt to select the sidebar with a subset of its class list that seems unique enough
  const sidebar = document.getElementById("side").parentElement;
  const toggleButton = document.getElementById("toggleSidebarButton");
  if (sidebar) {
    sidebar.style.display = sidebar.style.display === "none" ? "" : "none";
    toggleButton.textContent = sidebar.style.display === "none" ? "→" : "←";
  }
}

function injectToggleButton() {
  const header =
    document.getElementById("side").parentElement.previousElementSibling;

  if (header) {
    if (document.getElementById("toggleSidebarButton")) {
      console.log("Button already added");
      return;
    }
    console.log("Injecting toggle button");
    // Check if button is not already added
    // Create the toggle button with an arrow
    const toggleButton = document.createElement("button");
    toggleButton.id = "toggleSidebarButton";
    toggleButton.textContent = "←"; // Initial state showing left arrow
    toggleButton.style.cssText =
      "background: none; border: none; color: white; font-size: 24px; cursor: pointer; margin: 0 auto; display: block;";

    // Insert the button without affecting other elements
    const container = document.createElement("div");
    container.style.cssText =
      "display: flex; justify-content: center; align-items: center; width: 100%;";
    container.appendChild(toggleButton);

    // Find the position to insert the button
    const statusButton = document.querySelector(
      '[aria-label="Status"]',
    ).parentElement;
    if (statusButton) {
      console.log("Status button found");
      statusButton.parentNode.insertBefore(container, statusButton);
      // Attach event listener
      toggleButton.addEventListener("click", toggleSidebar);
    } else {
      console.log("Status button not found");
      return;
    }
  } else {
    console.log("no header");
  }
  console.log("Button added");
}

// Set the interval to check for the UI elements
interval = setInterval(() => {
  if (document.querySelector('[aria-label="Status"]')) {
    clearInterval(interval);
    injectToggleButton();
  }
}, 1000);
