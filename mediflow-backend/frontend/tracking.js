/* =====================================
   TRACKING PAGE — CLEAN VERSION
   Stats + One Card Per Patient
===================================== */

let patients = [];

/* =====================================
   LOAD DATA
===================================== */
async function loadTracking() {

  try {

    const res =
      await fetch("http://localhost:5000/patients");

    patients = await res.json();

    renderTracking();

  } catch (err) {
    console.log(err);
  }
}

/* =====================================
   MAIN RENDER
===================================== */
function renderTracking() {

  renderStats();
  renderPatientCards();
}

/* =====================================
   STATS (TOP CARDS STAYS)
===================================== */
function renderStats() {

  document.getElementById("tr-total").innerText =
    patients.length;

  document.getElementById("tr-active").innerText =
    patients.filter(p =>
      p.status !== "Dispensed"
    ).length;

  document.getElementById("tr-lab").innerText =
    patients.filter(p =>
      p.status === "Lab"
    ).length;

  document.getElementById("tr-complete").innerText =
    patients.filter(p =>
      p.status === "Dispensed"
    ).length;
}

/* =====================================
   ONE DIV = ONE PATIENT
===================================== */
function renderPatientCards() {

  const container =
    document.getElementById("timelineContainer");

  if (!patients.length) {
    container.innerHTML = "<h3>No patients</h3>";
    return;
  }

  container.innerHTML = patients.map(p => `

    <div class="patient-card">

      <div class="card-header">
        <div class="card-name">${p.name}</div>
        <span class="badge">${p.status}</span>
      </div>

      <div class="card-body">

        <p><b>Age:</b> ${p.age}</p>

        <p><b>Doctor:</b> ${p.doctor}</p>

        <p><b>Symptoms:</b>
          ${p.symptoms || "—"}
        </p>

        <p><b>Doctor Notes:</b>
          ${p.notes || "Pending"}
        </p>

        <p><b>Lab Result:</b>
          ${p.labResult || "Pending"}
        </p>

        <p><b>Prescription:</b>
          ${p.prescription || "Pending"}
        </p>

        <p><b>Billing:</b>
          ${
            p.billing
              ? "₹" + p.billing.total
              : "Not generated"
          }
        </p>

      </div>

    </div>

  `).join("");
}

/* =====================================
   LIVE AUTO REFRESH
===================================== */
setInterval(loadTracking, 5000);

/* =====================================
   START
===================================== */
window.onload = loadTracking;