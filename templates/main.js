// Wait for the document to be fully loaded
$(document).ready(function () {
    // Get references to the input field, messages container, and send button
    var userInput = $('#userInput');
    var chatbotMessages = $('#chatbotMessages');
    var sendMessageButton = $('#sendMessage');
  
    // Function to add a user message to the chat
    function addUserMessage(message) {
      chatbotMessages.append('<div class="user-message">' + message + '</div>');
    }
  
    // Function to add a chatbot message to the chat
    function addChatbotMessage(message) {
      chatbotMessages.append('<div class="chatbot-message">' + message + '</div>');
    }
  
    // Function to handle user input and send messages
    function handleUserInput() {
      var message = userInput.val();
      
      if (message.trim() === '') {
        return; // Don't send empty messages
      }
  
      // Add the user message to the chat
      addUserMessage(message);
  
      // Simulate a response from the chatbot (you can replace this with actual chatbot logic)
      // For demonstration, we're just echoing the user's message.
      var chatbotResponse = "You said: " + message;
  
      // Add the chatbot's response to the chat
      addChatbotMessage(chatbotResponse);
  
      // Clear the input field
      userInput.val('');
    }
  
    // Event listener for the send button
    sendMessageButton.click(function () {
      handleUserInput();
    });
  
    // Event listener for pressing Enter key in the input field
    userInput.keypress(function (event) {
      if (event.which === 13) {
        handleUserInput();
      }
    });
  });
  