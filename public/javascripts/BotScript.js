const chatBox = document.getElementById('chat-box');
    const userInput = document.getElementById('user-input');

    async function sendAnswer() {
      const answer = userInput.value;
      if (answer.trim() === '') return;

      appendToChatBox('User', answer);
      userInput.value = '';

      const response = await fetch('/recordAnswer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answer })
      });
      const data = await response.json();
      appendToChatBox('Interviewer', data.question);
    }

    async function requestFeedback() {
      const answer = userInput.value;
      if (answer.trim() === '') return;

      appendToChatBox('User', answer);
      userInput.value = '';

      const response = await fetch('/getFeedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answer })
      });
      const data = await response.json();
      appendToChatBox('Feedback', data.feedback);
    }

    function appendToChatBox(sender, message) {
      const div = document.createElement('div');
      div.textContent = `${sender}: ${message}`;
      const br = document.createElement('br');
      chatBox.appendChild(div);
      chatBox.appendChild(br)
    }

    window.onload = async () => {
      const response = await fetch('/askQuestion', { method: 'POST' });
      const data = await response.json();
      appendToChatBox('Interviewer', data.question);
    };