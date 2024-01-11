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

  