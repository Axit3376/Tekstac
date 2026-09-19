"use strict";

const appliances = {
  TV: false,
  Lamp: false,
  Oven: false
};

const controls = document.getElementById("applianceControls");
const logOutput = document.getElementById("log");
const messages = ["Ready to manage appliance power."];

Object.keys(appliances).forEach((name) => {
  const card = document.createElement("article");
  card.className = "appliance";
  card.innerHTML = `
    <h2>${name}</h2>
    <span class="state" id="${name}-state">Off</span>
    <div class="button-row">
      <button type="button">Turn on</button>
      <button type="button" class="off-button">Turn off</button>
    </div>`;

  const [onButton, offButton] = card.querySelectorAll("button");
  onButton.addEventListener("click", () => turnOnAppliance(name));
  offButton.addEventListener("click", () => turnOffAppliance(name));
  controls.appendChild(card);
});

document.getElementById("clearLog").addEventListener("click", () => {
  messages.length = 0;
  messages.push("Activity log cleared.");
  renderLog();
});

function turnOnAppliance(appliance) {
  operate(appliance, true);
}

function turnOffAppliance(appliance) {
  operate(appliance, false);
}

function operate(appliance, turnOn) {
  let outcome;
  try {
    if (!(appliance in appliances)) {
      throw new Error(`${appliance} is not a recognised appliance.`);
    }
    if (appliances[appliance] === turnOn) {
      throw new Error(`${appliance} is already turned ${turnOn ? "on" : "off"}.`);
    }

    appliances[appliance] = turnOn;
    outcome = `${appliance} is turned ${turnOn ? "on" : "off"}.`;
    messages.push(outcome);
  } catch (error) {
    outcome = `An error occurred: ${error.message}`;
    messages.push(outcome);
  } finally {
    messages.push("Program completed.");
    updateState(appliance);
    renderLog();
  }
  return outcome;
}

function updateState(appliance) {
  const state = document.getElementById(`${appliance}-state`);
  if (!state) return;
  state.textContent = appliances[appliance] ? "On" : "Off";
  state.classList.toggle("on", appliances[appliance]);
}

function renderLog() {
  logOutput.textContent = messages.join("\n");
}

// These functions are intentionally available for console-based testing.
window.turnOnAppliance = turnOnAppliance;
window.turnOffAppliance = turnOffAppliance;
