import React from "react";
import {
  useMultiChatLogic,
  MultiChatSocket,
  MultiChatWindow,
} from "react-chat-engine-advanced";
import Header from "@/components/customHeader";
import StandardMessageForm from "@/components/customMessageForms/StandardMessageForm";
import Ai from "@/components/customMessageForms/Ai";
import AiCode from "@/components/customMessageForms/AiCode";
import AiAssist from "@/components/customMessageForms/AiAssist";

// Define a React component called 'Chat' which takes 'user' and 'secret' as props.
const Chat = ({ user, secret }) => {
  // Use the 'useMultiChatLogic' hook to get chat related properties.
  const chatProps = useMultiChatLogic(
    import.meta.env.VITE_PROJECT_ID,
    user,
    secret
  );

  // Render the chat component.
  return (
    <div style={{ flexBasis: "100%" }}>
      {/* Include the 'MultiChatSocket' component to establish a socket connection. */}
      <MultiChatSocket {...chatProps} />

      {/* Include the 'MultiChatWindow' component to display the chat window. */}
      <MultiChatWindow
        {...chatProps}
        style={{ height: "100vh" }}
        // Customize the chat header by rendering a 'Header' component.
        renderChatHeader={(chat) => <Header chat={chat} />}
        // Customize the message form based on the chat title.
        renderMessageForm={(props) => {
          // Check if the chat title starts with "AiChat_"
          if (chatProps.chat?.title.startsWith("AiChat_")) {
            // If yes, render the 'Ai' component.
            return <Ai props={props} activeChat={chatProps.chat} />;
          }
          // Check if the chat title starts with "AiCode_"
          if (chatProps.chat?.title.startsWith("AiCode_")) {
            // If yes, render the 'AiCode' component.
            return <AiCode props={props} activeChat={chatProps.chat} />;
          }
          // Check if the chat title starts with "AiAssist_"
          if (chatProps.chat?.title.startsWith("AiAssist_")) {
            // If yes, render the 'AiAssist' component.
            return <AiAssist props={props} activeChat={chatProps.chat} />;
          }

          // If none of the conditions above are met, render the 'StandardMessageForm' component.
          return (
            <StandardMessageForm props={props} activeChat={chatProps.chat} />
          );
        }}
      />
    </div>
  );
};

// Export the 'Chat' component as the default export.
export default Chat;
