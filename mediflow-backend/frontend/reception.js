/* =====================================
   RECEPTION ROLE PROTECTION
===================================== */

const role =
  (localStorage.getItem("role") || "")
  .trim()
  .toLowerCase();

console.log("ROLE:", role);

if (role !== "reception" && role !== "admin") {
  location = "login.html";
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
