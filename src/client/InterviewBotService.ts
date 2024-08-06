import axios from 'axios';

document.addEventListener('DOMContentLoaded', () => {
  const chatBody = document.getElementById('chat-body') as HTMLDivElement;
  const chatInput = document.getElementById('chat-input') as HTMLInputElement;
  const chatButton = document.getElementById('chat-button') as HTMLButtonElement;

  let sessionId: string | null = null;

  chatButton.addEventListener('click', async () => {
    const userMessage = chatInput.value.trim();
    if (!userMessage) return;

    appendMessage(userMessage, 'user');
    chatInput.value = '';

    if (!sessionId) {
      await startInterview(userMessage);
    } else {
      await sendAnswer(userMessage);
    }
  });

  function appendMessage(message: string, sender: 'user' | 'assistant') {
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message', sender);
    messageElement.innerText = message;
    chatBody.appendChild(messageElement);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  async function startInterview(jobDescription: string) {
    try {
      const response = await axios.post('http://localhost:3000/start-interview', { jobDescription });
      sessionId = response.data.sessionId;
      appendMessage(response.data.question, 'assistant');
    } catch (error) {
      console.error('Error starting interview:', error);
    }
  }

  async function sendAnswer(answer: string) {
    try {
      const response = await axios.post('http://localhost:3000/answer', { sessionId, answer });
      if (response.data.question) {
        appendMessage(response.data.question, 'assistant');
      } else {
        appendMessage(response.data.message, 'assistant');
        appendMessage(response.data.feedback, 'assistant');
        sessionId = null;
      }
    } catch (error) {
      console.error('Error sending answer:', error);
    }
  }
});
