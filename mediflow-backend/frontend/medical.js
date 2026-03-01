/* =========================================
   MEDICAL PAGE — FINAL VERSION
========================================= */

let patients = [];

/* =========================================
   LOAD MEDICAL PATIENTS
========================================= */
async function loadMedicalPatients() {

  try {

    const res =
      await fetch("http://localhost:5000/patients");

    const data = await res.json();

    // ONLY MEDICAL PATIENTS
    patients = data.filter(
      p => p.status === "Prescription"
    );

    renderMedicalCards();

  } catch (err) {
    console.log(err);
  }
}

/* =========================================
   RENDER CARDS
========================================= */
function renderMedicalCards() {

  const container =
    document.getElementById("medicalCards");

  if (!patients.length) {
    container.innerHTML = `
      <div class="empty-state" style="grid-column:1/-1">
        <div class="icon">💊</div>
        <h3>No prescriptions</h3>
        <p>Patients ready for medical dispatch appear here.</p>
      </div>`;
    return;
  }

  container.innerHTML = patients.map(p => `

    <div class="patient-card">

      <div class="card-header">
        <div class="card-header-left">
          <div class="card-avatar">💊</div>
          <div>
            <div class="card-name">${p.name}</div>
            <div class="card-meta">
              Age ${p.age} · ${p.doctor}
            </div>
          </div>
        </div>

        <span class="badge badge-${p.priority.toLowerCase()}">
          ${p.priority}
        </span>
      </div>

      <div class="card-body">

        <div class="card-row">
          <span class="card-label">Doctor Notes</span>
          <span>${p.notes || "—"}</span>
        </div>

        <div class="card-row">
          <span class="card-label">Lab Result</span>
          <span>${p.labResult || "Not required"}</span>
        </div>

        <div class="card-row">
          <span class="card-label">Prescription</span>
          <span>${p.prescription || "—"}</span>
        </div>

      </div>

      <div class="card-footer">

        <div class="form-group">
          <label>Doctor Fee</label>
          <input type="number"
            class="form-input"
            id="df-${p._id}"
            value="300">
        </div>

        <div class="form-group">
          <label>Lab Fee</label>
          <input type="number"
            class="form-input"
            id="lf-${p._id}"
            value="${p.labResult ? 500 : 0}">
        </div>

        <div class="form-group">
          <label>Medicine Fee</label>
          <input type="number"
            class="form-input"
            id="mf-${p._id}"
            value="0">
        </div>

        <button class="action-btn"
          onclick="dispensePatient('${p._id}')">
          💊 Dispense & Complete
        </button>

      </div>

    </div>

  `).join("");
}

/* =========================================
   DISPENSE PATIENT (FINAL STEP)
========================================= */
async function dispensePatient(id) {

  const doctorFee =
    Number(document.getElementById(`df-${id}`).value);

  const labFee =
    Number(document.getElementById(`lf-${id}`).value);

  const medFee =
    Number(document.getElementById(`mf-${id}`).value);

  const total =
    doctorFee + labFee + medFee;

  try {

    await fetch(`http://localhost:5000/patients/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({

        billing: {
          doctorFee,
          labFee,
          medFee,
          total
        },

        // FINAL STATUS
        status: "Dispensed"

      })
    });

    showToast("✔ Medicine dispensed");

    // remove automatically
    loadMedicalPatients();

  } catch (err) {
    console.log(err);
  }
}

/* =========================================
   TOAST
========================================= */
function showToast(msg) {

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerText = msg;

  document.body.appendChild(toast);

  setTimeout(() => toast.remove(), 2500);
}

/* =========================================
   AUTO LOAD
========================================= */
window.onload = loadMedicalPatients;