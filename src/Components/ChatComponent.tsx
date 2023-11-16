import React, { useState, useEffect, useCallback, useRef } from "react";

import { MessageContainer } from "./Globals";

import ChatClient from "./ChatClient";
import './Styles.css'
import e from "express";





const chatClient = new ChatClient();


function ChatComponent() {
    const [messages, setMessages] = useState<MessageContainer[]>([]);
    const [mostRecentId, setMostRecentId] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);  // New state for pagination
    const messagesPerPage = 20;
    const [user, setUser] = useState<string>(window.sessionStorage.getItem('userName') || "");
    // const [user, setUser] = useState<string>("Jose");
    const [message, setMessage] = useState<string>("Hello World");
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
    
        // Correctly slice the messages array
        const endIndex = messagesPerPage * currentPage;
        let newMessages = chatClient.messages.slice(0, endIndex);
    
        setMessages(newMessages);
        setMostRecentId(newLastId);
    }, [mostRecentId, currentPage, messagesPerPage]);

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
    function loadMoreMessages() {
        setCurrentPage(currentPage + 1);  // Increment the current page to load more messages
    }

    return (
        <div>
            <h1>Chat</h1>
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
            
             {/* New button to load more messages */}
            <button onClick={() => chatClient.sendMessage(localUser, localMessage)}>Send</button>
            <button onClick={() => {
                chatClient.getNextMessages();
                loadMoreMessages();
            }}>Load More Messages</button>
        </div>
    );
}

export default ChatComponent;