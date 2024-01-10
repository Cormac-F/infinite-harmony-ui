document.getElementById("logoutButton").addEventListener("click", function() {
    fetch("/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
      }),
    })
    .then(response => {
      if (response.ok) {
        window.location.href = "/";
      } else {
        console.error("Logout failed:", response.statusText);
      }
    })
    .catch(error => {
      console.error("Error during logout:", error);
    });
  });
  