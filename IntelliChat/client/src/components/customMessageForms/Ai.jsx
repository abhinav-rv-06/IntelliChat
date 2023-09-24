import { usePostAiTextMutation } from "@/state/api";
import React, { useState } from "react";
import MessageFormUI from "./MessageFormUI";

// Define a React component called 'Ai' which takes 'props' and 'activeChat' as props.
const Ai = ({ props, activeChat }) => {
  // Initialize state variables for message and attachment.
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState("");
  const [trigger] = usePostAiTextMutation();

  // Event handler to update the 'message' state when the input field changes.
  const handleChange = (e) => setMessage(e.target.value);

  // Event handler to handle form submission.
  const handleSubmit = async () => {
    // Generate a timestamp for the message creation time.
    const date = new Date()
      .toISOString()
      .replace("T", " ")
      .replace("Z", `${Math.floor(Math.random() * 1000)}+00:00`);

    // Create a form object with message details.
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

    // Trigger a mutation to post the AI-generated text.
    trigger(form);

    // Reset the 'message' and 'attachment' states after submission.
    setMessage("");
    setAttachment("");
  };

  // Render the MessageFormUI component with appropriate props.
  return (
    <MessageFormUI
      setAttachment={setAttachment}
      message={message}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};

// Export the 'Ai' component as the default export.
export default Ai;
