"use strict";

const students = [];
const form = document.getElementById("scoreForm");
const nameInput = document.getElementById("studentName");
const scoreInput = document.getElementById("studentScore");
const message = document.getElementById("message");
const scoreList = document.getElementById("scoreList");
const average = document.getElementById("average");

form.addEventListener("submit", addStudent);

function addStudent(event) {
  event.preventDefault();
  const name = nameInput.value.trim();
  const scoreText = scoreInput.value.trim();
  const score = Number(scoreText);

  if (!name || !scoreText) {
    showMessage("Student name and score are required.");
    return;
  }
  if (!Number.isFinite(score)) {
    showMessage("Score must be a valid number.");
    return;
  }
  if (score < 0) {
    showMessage("Score cannot be negative");
    return;
  }

  students.push({ name, score });
  form.reset();
  showMessage("");
  renderScores();
  nameInput.focus();
}

function renderScores() {
  scoreList.replaceChildren();

  students.forEach((student, index) => {
    const item = document.createElement("li");
    item.textContent = `${student.name} - ${formatScore(student.score)}`;
    item.title = "Double-click to remove this student";
    item.addEventListener("dblclick", () => removeStudent(index));
    scoreList.appendChild(item);
  });

  const total = students.reduce((sum, student) => sum + student.score, 0);
  const scoreAverage = students.length ? total / students.length : 0;
  average.textContent = students.length
    ? `Average Score of ${students.length} Student${students.length === 1 ? "" : "s"}: ${scoreAverage.toFixed(2)}`
    : "Average Score: 0";
}

function removeStudent(index) {
  students.splice(index, 1);
  showMessage("");
  renderScores();
}

function showMessage(text) {
  message.textContent = text;
}

function formatScore(score) {
  return Number.isInteger(score) ? String(score) : String(score);
}
