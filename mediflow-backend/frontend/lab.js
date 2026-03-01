/* =========================================
   LAB PAGE — FINAL VERSION
========================================= */

let patients = [];

/* =========================================
   LOAD LAB PATIENTS
========================================= */
async function loadLabPatients() {

  try {

    const res =
      await fetch("http://localhost:5000/patients");

    const data = await res.json();

    // ONLY LAB STATUS
    patients = data.filter(
      p => p.status === "Lab"
    );

    renderLabCards();

  } catch (err) {
    console.log(err);
  }
}

/* =========================================
   RENDER LAB CARDS
========================================= */
function renderLabCards() {

  const container =
    document.getElementById("labCards");

  if (!patients.length) {
    container.innerHTML = `
      <div class="empty-state" style="grid-column:1/-1">
        <div class="icon">🔬</div>
        <h3>No lab requests</h3>
        <p>Patients sent to lab will appear here.</p>
      </div>`;
    return;
  }

  container.innerHTML = patients.map(p => `
    <div class="patient-card">

      <div class="card-header">
        <div class="card-header-left">
          <div class="card-avatar">🧪</div>
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
          <span class="card-value">
            ${p.notes || "—"}
          </span>
        </div>

        <div class="card-symptoms">
          ${p.symptoms || ""}
        </div>

      </div>

      <div class="card-footer">

        <div class="form-group">
          <label>Lab Result</label>
          <input class="form-input"
            id="lres-${p._id}"
            value="${p.labResult || ""}"
            placeholder="Enter test result">
        </div>

        <button class="action-btn"
          onclick="submitLabResult('${p._id}')">

          ${p.labResult
            ? "✅ Update Result"
            : "📤 Submit Result"}

        </button>

      </div>

    </div>
  `).join("");
}

/* =========================================
   SUBMIT LAB RESULT
   Lab → Medical
========================================= */
async function submitLabResult(id) {

  const result =
    document
      .getElementById(`lres-${id}`)
      .value.trim();

  if (!result) {
    showToast("⚠️ Enter lab result");
    return;
  }

  try {

    await fetch(`http://localhost:5000/patients/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({

        labResult: result,

        // IMPORTANT:
        // move patient to medical page
        status: "Prescription"

      })
    });

    showToast("✔ Lab result submitted");

    // patient disappears from lab
    loadLabPatients();

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
window.onload = loadLabPatients;