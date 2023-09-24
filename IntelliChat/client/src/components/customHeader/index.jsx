import React from "react";
import { ChatBubbleLeftRightIcon, PhoneIcon } from "@heroicons/react/24/solid";

// Define a React component called 'CustomerHeader' which takes 'chat' as a prop.
const CustomerHeader = ({ chat }) => {
  return (
    <div className="chat-header">
      {/* Create a flex container with content aligned between */}
      <div className="flexbetween">
        {/* Render a chat bubble icon */}
        <ChatBubbleLeftRightIcon className="icon-chat" />
        {/* Render the chat title as a header */}
        <h3 className="header-text">{chat.title}</h3>
      </div>
      {/* Create another flex container with content aligned between */}
      <div className="flexbetween">
        {/* Render a phone icon */}
        <PhoneIcon className="icon-phone" />
        {/* Check if the chat description is not "⬅️ ⬅️ ⬅️" */}
        {chat.description !== "⬅️ ⬅️ ⬅️" ? (
          {/* If not, render the chat description */}
          <p className="header-text">{chat.description}</p>
        ) : (
          {/* If it is "⬅️ ⬅️ ⬅️", render "no chat selected" */}
          <p className="header-text">no chat selected</p>
        )}
      </div>
    </div>
  );
};

// Export the 'CustomerHeader' component as the default export.
export default CustomerHeader;
