document.getElementById("logoutButtonNavBar").addEventListener("click", async function() {
  try {
    const response = await fetch("/logout", {
      method: "POST",
    });

    if (response.ok) {
      window.location.href = "/";
    } else {
      console.error("Logout failed:", response.statusText);
    }
  } catch (error) {
    console.error("Error during logout:", error);
  }
});

document.getElementById("logoutButtonIndex").addEventListener("click", async function() {
  try {
    const response = await fetch("/logout", {
      method: "POST",
    });

    if (response.ok) {
      window.location.href = "/";
    } else {
      console.error("Logout failed:", response.statusText);
    }
  } catch (error) {
    console.error("Error during logout:", error);
  }
});

function toggleNavMenu() {
  var nav = document.getElementById('navbarNav');
  nav.classList.toggle('show');
}

// Close the burger menu when a link is clicked
var navLinks = document.querySelectorAll('.navbar-nav a');
navLinks.forEach(function(link) {
  link.addEventListener('click', function() {
      var nav = document.getElementById('navbarNav');
      nav.classList.remove('show');
  });
});