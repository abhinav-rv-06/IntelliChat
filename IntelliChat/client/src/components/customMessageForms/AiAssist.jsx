import { usePostAiAssistMutation } from "@/state/api";
import React, { useEffect, useState } from "react";
import MessageFormUI from "./MessageFormUI";

// Custom hook for debouncing a value with a given delay.
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Define a React component called 'AiAssist' which takes 'props' and 'activeChat' as props.
const AiAssist = ({ props, activeChat }) => {
  // Initialize state variables for message, attachment, and assist result.
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState("");
  const [triggerAssist, resultAssist] = usePostAiAssistMutation();
  const [appendText, setAppendText] = useState("");

  // Event handler to update the 'message' state when the input field changes.
  const handleChange = (e) => setMessage(e.target.value);

  // Event handler to handle form submission.
  const handleSubmit = async () => {
    // Generate a timestamp for the message creation time.
    const date = new Date()
      .toISOString()
      .replace("T", " ")
      .replace("Z", `${Math.floor(Math.random() * 1000)}+00:00`);
    const at = attachment ? [{ blob: attachment, file: attachment.name }] : [];
    const form = {
      attachments: at,
      created: date,
      sender_username: props.username,
      text: message,
      activeChatId: activeChat.id,
    };

    // Call a function passed through 'props' to submit the form.
    props.onSubmit(form);

    // Reset the 'message' and 'attachment' states after submission.
    setMessage("");
    setAttachment("");
  };

  // Use the custom debounce hook to debounce the 'message' state.
  const debouncedValue = useDebounce(message, 1000);

  // Effect to trigger AI assist when the debounced value changes.
  useEffect(() => {
    if (debouncedValue) {
      const form = { text: message };
      triggerAssist(form);
    }
  }, [debouncedValue]);

  // Event handler to handle key presses (tab and enter).
  const handleKeyDown = (e) => {
    // Handle enter (key code 13) and tab (key code 9) keys.
    if (e.keyCode === 9 || e.keyCode === 13) {
      e.preventDefault();
      setMessage(`${message} ${appendText}`);
    }
    setAppendText("");
  };

  // Effect to set the 'appendText' state based on AI assist result.
  useEffect(() => {
    if (resultAssist.data?.text) {
      setAppendText(resultAssist.data?.text);
    }
  }, [resultAssist]); // eslint-disable-line

  // Render the MessageFormUI component with appropriate props.
  return (
    <MessageFormUI
      setAttachment={setAttachment}
      message={message}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      appendText={appendText}
      handleKeyDown={handleKeyDown}
    />
  );
};

// Export the 'AiAssist' component as the default export.
export default AiAssist;
