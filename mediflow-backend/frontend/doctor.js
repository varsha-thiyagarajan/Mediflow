/* =====================================
   DOCTOR PAGE — FIXED FINAL VERSION
===================================== */

let patients = [];
let doctorFilter = "all";

/* TEMP LOGIN DOCTOR */
const CURRENT_DOCTOR = "Dr. Sharma";
const role =
  (localStorage.getItem("role") || "")
  .trim()
  .toLowerCase();

console.log("ROLE:", role);

if (role !== "doctor" && role !== "admin") {
  location = "login.html";
}
/* =====================================
   LOAD PATIENTS
===================================== */
async function loadPatients() {

  try {

    const res =
      await fetch("http://localhost:5000/patients");

    const data = await res.json();

    // SAFE FILTER (case insensitive)
    patients = data.filter(
  p => p.status === "Doctor"
);

    renderDoctorCards();

  } catch (err) {
    console.log(err);
  }
}

/* =====================================
   FILTER BUTTONS
===================================== */
function setDoctorFilter(f, el) {

  doctorFilter = f;

  document
    .querySelectorAll(".filter-btn")
    .forEach(b => b.classList.remove("active"));

  el.classList.add("active");

  renderDoctorCards();
}

/* =====================================
   RENDER CARDS
===================================== */
function renderDoctorCards() {

  const container =
    document.getElementById("doctorCards");

  const search =
    (document.getElementById("doctorSearch")
    ?.value || "")
    .toLowerCase();

  let filtered = patients.filter(p => {

    const name =
      (p.name || "").toLowerCase();

    const symptoms =
      (p.symptoms || "").toLowerCase();

    const matchSearch =
      name.includes(search) ||
      symptoms.includes(search);

    const matchFilter =
      doctorFilter === "all" ||
      p.priority === doctorFilter;

    return matchSearch && matchFilter;
  });

  if (!filtered.length) {
    container.innerHTML = `
      <div class="empty-state" style="grid-column:1/-1">
        <div class="icon">👨‍⚕️</div>
        <h3>No patients found</h3>
        <p>No assigned doctor cases.</p>
      </div>`;
    return;
  }

  container.innerHTML =
    filtered.map(p => `

    <div class="patient-card">

      <div class="card-header">
        <div class="card-header-left">
          <div class="card-avatar">👤</div>
          <div>
            <div class="card-name">${p.name}</div>
            <div class="card-meta">
              Age ${p.age} · ${p.doctor}
            </div>
          </div>
        </div>

        <span class="badge badge-${(p.priority||"Medium").toLowerCase()}">
          ${p.priority || "Medium"}
        </span>
      </div>

      <div class="card-body">

        <div class="card-label">Symptoms</div>
        <div class="card-symptoms">
          ${p.symptoms || "—"}
        </div>

      </div>

      <div class="card-footer">

        <div class="form-group">
          <label>Doctor Notes</label>
          <input class="form-input"
            id="notes-${p._id}"
            value="${p.notes || ""}">
        </div>

        <div class="toggle-row">
          <span>Lab Required?</span>

          <label class="toggle">
            <input type="checkbox"
              id="lab-${p._id}"
              ${p.labNeeded ? "checked" : ""}>
            <span class="toggle-slider"></span>
          </label>
        </div>

        <div class="form-group">
          <label>Prescription</label>
          <input class="form-input"
            id="rx-${p._id}"
            value="${p.prescription || ""}">
        </div>

        <button class="action-btn"
          onclick="verifyAndSend('${p._id}')">
          ✅ Verify & Send
        </button>

      </div>

    </div>

  `).join("");
}

/* =====================================
   VERIFY + MOVE WORKFLOW
===================================== */
async function verifyAndSend(id) {

  const notes =
    document.getElementById(`notes-${id}`).value;

  const prescription =
    document.getElementById(`rx-${id}`).value;

  const labNeeded =
    document.getElementById(`lab-${id}`).checked;

  let status = "Waiting";

  if (labNeeded)
    status = "Lab";
  else if (prescription)
    status = "Prescription";

  try {

    await fetch(`http://localhost:5000/patients/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        notes,
        prescription,
        labNeeded,
        status
      })
    });

    showToast("✔ Patient verified");

    loadPatients();

  } catch (err) {
    console.log(err);
  }
}

/* =====================================
   TOAST
===================================== */
function showToast(msg) {

  const toast = document.createElement("div");

  toast.className = "toast";
  toast.innerText = msg;

  document.body.appendChild(toast);

  setTimeout(() => toast.remove(), 2500);
}

/* =====================================
   AUTO LOAD
===================================== */
window.onload = loadPatients;