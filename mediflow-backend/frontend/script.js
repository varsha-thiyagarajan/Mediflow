/* =====================================
   REAL LOGIN (BACKEND AUTH)
===================================== */

async function doLogin() {

  const username =
    document.getElementById("username").value;

  const password =
    document.getElementById("password").value;

  if (!username || !password) {
    alert("Enter username and password");
    return;
  }

  try {

    const res = await fetch(
      "http://localhost:5000/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          username,
          password
        })
      }
    );

    const data = await res.json();

    if (!res.ok) {
      alert("Invalid login");
      return;
    }

    /* SAVE LOGIN SESSION */
    localStorage.setItem("role", data.role);

    if (data.doctorName) {
      localStorage.setItem(
        "doctorName",
        data.doctorName
      );
    }

    /* ROLE REDIRECT */
    if (data.role === "reception")
      location = "reception.html";

    else if (data.role === "doctor")
      location = "doctor.html";

    else if (data.role === "lab")
      location = "lab.html";

    else if (data.role === "medical")
      location = "medical.html";

    else if (data.role === "admin")
      location = "tracking.html";

  } catch (err) {
    console.log(err);
    alert("Server error");
  }
}
function doLogout() {

  // CLEAR SESSION
  localStorage.clear();

  // GO TO LOGIN
  location = "login.html";
}
function showPage(page) {

  const role =
    (localStorage.getItem("role") || "")
    .trim()
    .toLowerCase();

  // ADMIN can open everything
  if (role === "admin") {
    location = page + ".html";
    return;
  }

  // allow only own page
  if (role !== page) {
    showToast("⚠️ Access denied");
    return;
  }

  location = page + ".html";
}
/* =====================================
   NAVBAR ROLE CONTROL
===================================== */

function setupNavbarByRole() {

  const role =
    (localStorage.getItem("role") || "")
    .trim()
    .toLowerCase();

  const tabs =
    document.querySelectorAll(".nav-tab");

  tabs.forEach(tab => {

    const page =
      tab.getAttribute("data-page");

    // ADMIN sees everything
    if (role === "admin") return;

    // hide non-allowed tabs
    if (page !== role) {
      tab.style.display = "none";
    }

  });
}
window.onload = function () {
  setupNavbarByRole();
};