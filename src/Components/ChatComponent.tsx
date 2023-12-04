import React, { useState, useEffect, useCallback, useRef } from "react";

import { MessageContainer } from "./Globals";

import ChatClient from "./ChatClient";
import './Styles.css'
import e from "express";





//const chatClient = new ChatClient();
interface ChatComponentProps {
    chatClient: ChatClient;
}


function ChatComponent({chatClient} : ChatComponentProps) {
    const [messages, setMessages] = useState<MessageContainer[]>([]);
    const [mostRecentId, setMostRecentId] = useState<number>(-1);
    const [user, setUser] = useState<string>(window.sessionStorage.getItem('userName') || "");
    const [message, setMessage] = useState<string>("Type a message...");
    const bottomRef = useRef(null);


    let localUser = user;
    let localMessage = message;
    const updateDisplay = useCallback(() => {
        let updateNeeded = false;
        const newLastId = chatClient.messages[0].id;
        if (newLastId !== mostRecentId) {
            updateNeeded = true;
        }
        if (chatClient.previousMessagesFetched) {
            updateNeeded = true;
            chatClient.previousMessagesFetched = false;
        }
        if (!updateNeeded) {
            return;
        }

        let newMessages = [...chatClient.messages];

        setMessages(newMessages);
        setMostRecentId(newLastId);
    }, [mostRecentId, messages]);

    useEffect(() => {
        chatClient.setCallback(updateDisplay);
    }, [updateDisplay]);


    function makeFormatedMessages() {
        let formatedMessages = [...messages].reverse().map((message, index, array) => {
            if (index === array.length - 1) { // if this is the last message
                return <textarea key={index} readOnly value={message.id + "]" + message.user + ": " + message.message} ref={bottomRef} />
            } else {
                return <textarea key={index} readOnly value={message.id + "]" + message.user + ": " + message.message} />
            }
        });
        return formatedMessages;
    }

    return (
        <div>
            <h1>Chats</h1>
            
            <div className="scrollable-text-view">
                {makeFormatedMessages()}
            </div>
            {user + "  "}
            <input
                type="text"
                id="message"
                placeholder={message}
                onKeyUp={(event) => {
                    localMessage = event.currentTarget.value;
                    setMessage(event.currentTarget.value);
                    if (event.key === "Enter") {
                        chatClient.sendMessage(localUser, localMessage);
                        // clear the message
                        event.currentTarget.value = "";
                        setMessage("");
                    }
                }}
            />
            <button onClick={() => chatClient.sendMessage(localUser, localMessage)}>Send</button>
            <button onClick={() => chatClient.getNextMessages()}>Get Messages</button>
        </div>
    );
}

export default ChatComponent;