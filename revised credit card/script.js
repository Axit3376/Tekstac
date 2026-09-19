"use strict";

const API_URL = "https://webapps.tekstac.com/WebAPI/CreditCardsXMLServlet";
const cards = [];

const fetchButton = document.getElementById("fetchButton");
const submitButton = document.getElementById("submitButton");
const retrievalMessage = document.getElementById("retrievalMessage");
const reportMessage = document.getElementById("reportMessage");
const tableContainer = document.getElementById("tableContainer");

fetchButton.addEventListener("click", retrieveCards);
submitButton.addEventListener("click", generateReport);

function retrieveCards() {
  const request = new XMLHttpRequest();
  fetchButton.disabled = true;
  submitButton.disabled = true;
  cards.length = 0;
  tableContainer.replaceChildren();
  retrievalMessage.textContent = "Retrieving data...";
  reportMessage.textContent = "";

  request.open("GET", API_URL, true);
  request.onreadystatechange = function () {
    if (request.readyState !== XMLHttpRequest.DONE) return;

    fetchButton.disabled = false;
    if (request.status === 200) {
      try {
        const parsedCards = parseCards(request.responseXML);
        if (parsedCards.length !== 16) {
          throw new Error("The API response did not contain 16 credit card entries.");
        }
        cards.push(...parsedCards);
        retrievalMessage.textContent = "Data retrieved successfully.";
        submitButton.disabled = false;
      } catch (error) {
        retrievalMessage.textContent = error.message;
      }
    } else {
      retrievalMessage.textContent = "Unable to retrieve credit card data.";
    }
  };
  request.onerror = function () {
    fetchButton.disabled = false;
    retrievalMessage.textContent = "Unable to retrieve credit card data.";
  };
  request.send();
}

function parseCards(xml) {
  if (!xml || xml.getElementsByTagName("parsererror").length) {
    throw new Error("The API returned invalid XML.");
  }

  const nodes = Array.from(xml.getElementsByTagName("creditcard"));
  const entries = nodes.length ? nodes : Array.from(xml.documentElement.children);

  return entries.map((entry) => ({
    name: valueOf(entry, ["cardholdername", "cardHolderName", "name"]),
    type: valueOf(entry, ["cardtype", "cardType", "type"]),
    limit: valueOf(entry, ["cardlimit", "cardLimit", "limit"]),
    expiryDate: valueOf(entry, ["expirydate", "expiryDate", "expdate"])
  }));
}

function valueOf(entry, names) {
  const acceptableNames = names.map((name) => name.toLowerCase());
  const element = Array.from(entry.getElementsByTagName("*")).find((child) =>
    acceptableNames.includes(child.tagName.toLowerCase())
  );
  if (element) return element.textContent.trim();
  return "";
}

function generateReport() {
  const table = document.createElement("table");
  const headers = ["Card Holder Name", "Card Type", "CardLimit", "Expiry Date"];
  const headerRow = table.insertRow();

  headers.forEach((header) => {
    const cell = document.createElement("th");
    cell.textContent = header;
    headerRow.appendChild(cell);
  });

  cards.forEach((card) => {
    const row = table.insertRow();
    [card.name, card.type, card.limit, card.expiryDate].forEach((value) => {
      const cell = row.insertCell();
      cell.textContent = value;
    });
  });

  tableContainer.replaceChildren(table);
  reportMessage.textContent = "Report generated successfully!!!";
}
