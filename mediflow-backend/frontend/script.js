let currentRole = "reception";

const ROLES = {
  reception: { page: "reception.html" },
  doctor: { page: "doctor.html" },
  lab: { page: "lab.html" },
  medical: { page: "medical.html" }
};

function selectRole(el) {
  document.querySelectorAll(".role-btn")
    .forEach(btn => btn.classList.remove("active"));

  el.classList.add("active");
  currentRole = el.dataset.role;
}

// Login
function doLogin() {

  const user = document.getElementById("loginUser").value;
  const pass = document.getElementById("loginPass").value;

  if(user === "" || pass === "") {
    alert("Enter username and password");
    return;
  }
  window.location.href = ROLES[currentRole].page;
}
function showPage(page) {
  window.location.href = page + ".html";
}
function doLogout() {
  window.location.href = "login.html";
}
async function submitPatient() {

  const patientData = {
    name: document.getElementById("f-name").value,
    age: document.getElementById("f-age").value,
    symptoms: document.getElementById("f-symptoms").value,
    priority: document.getElementById("f-priority").value,
    doctor: document.getElementById("f-doctor").value
  };

  try {

    await fetch("http://localhost:5000/patients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patientData)
    });

    // clear form
    document.getElementById("f-name").value = "";
    document.getElementById("f-age").value = "";
    document.getElementById("f-symptoms").value = "";
    document.getElementById("f-priority").value = "";
    document.getElementById("f-doctor").value = "";

    showToast("Patient registered successfully");

  } catch (err) {
    console.log(err);
  }
}
function showToast(message) {

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerText = "✔ " + message;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 2500);
}

async function submitPatient() {

  const patientData = {
    name: document.getElementById("f-name").value,
    age: document.getElementById("f-age").value,
    symptoms: document.getElementById("f-symptoms").value,
    priority: document.getElementById("f-priority").value,
    doctor: document.getElementById("f-doctor").value
  };

  await fetch("http://localhost:5000/patients", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patientData)
  });

  // clear form
  document.getElementById("f-name").value = "";
  document.getElementById("f-age").value = "";
  document.getElementById("f-symptoms").value = "";
  document.getElementById("f-priority").value = "";
  document.getElementById("f-doctor").value = "";

  showToast("✔ Patient registered");
}