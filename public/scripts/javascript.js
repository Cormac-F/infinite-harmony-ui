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
  var nav = document.getElementById("navbarNav");
  nav.classList.toggle("show");
}

// Close the burger menu when a link is clicked
var navLinks = document.querySelectorAll(".navbar-nav a");
navLinks.forEach(function(link) {
  link.addEventListener("click", function() {
      var nav = document.getElementById("navbarNav");
      nav.classList.remove("show");
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const chatContainer = document.getElementById('chat-container');
  const userInput = document.getElementById('user-input');

  function appendMessage(role, content) {
      const messageDiv = document.createElement('div');
      messageDiv.className = `chat-message ${role}-message`;
      messageDiv.textContent = content;
      chatContainer.appendChild(messageDiv);
  }

  function sendMessage() {
      const userMessage = userInput.value.trim();
      if (userMessage !== '') {
          appendMessage('user', userMessage);

          // Make an AJAX request to your server to handle the user input
          fetch('/chat', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ userMessage }),
          })
          .then(response => response.json())
          .then(data => {
              // Handle the response from the server
              data.messages.forEach(message => {
                  appendMessage('assistant', message);
              });
          })
          .catch(error => {
              console.error('Error sending message:', error);
          });

          userInput.value = ''; // Clear the input field
      }
  }

  // Attach the sendMessage function to the button click event
  document.getElementById('send-button').addEventListener('click', sendMessage);
});




