import { MessagesContainer, MessageContainer } from "./Globals";

class ChatClient {
    earliestMessageID: number = 10000000000;
    previousMessagesFetched: boolean = false;
    messages: MessageContainer[] = [];
    updateDisplay: () => void = () => { };

    constructor() {
        console.log("ChatClient");
        this.getMessages();
        this.getMessagesContinuously();
    }

    setCallback(callback: () => void) {
        this.updateDisplay = callback;
    }

    insertMessage(message: MessageContainer) {
        const messageID = message.id;

        if (this.earliestMessageID > messageID) {
            this.earliestMessageID = messageID;
        }

        if (this.messages.length === 0) {
            this.messages.push(message);
            return;
        }

        if (messageID > this.messages[0].id) {
            this.messages.unshift(message);
            return;
        }

        if (messageID < this.messages[this.messages.length - 1].id) {
            this.messages.push(message);
            this.previousMessagesFetched = true;
            return;
        }
    }

    insertMessages(messages: MessageContainer[]) {
        messages.forEach(message => this.insertMessage(message));
        this.updateDisplay();
    }

    getMessages(pagingToken: string = '') {
        const url = `http://localhost:3005/messages/get/`;
        const fetchURL = `${url}${pagingToken}`;

        fetch(fetchURL)
            .then(response => response.json())
            .then((messagesContainer: MessagesContainer) => {
                this.insertMessages(messagesContainer.messages);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    getMessagesContinuously() {
        setInterval(() => {
            this.getMessages();
        }, 1000);
    }

    getNextMessages() {
        const nextMessageToFetch = this.earliestMessageID - 1;
        const pagingToken = `__${nextMessageToFetch.toString().padStart(20, '0')}__`;
        this.getMessages(pagingToken);
    }

    sendMessage(user: string, message: string) {
        const url = `http://localhost:3005/message/${user}/${message}`;
        fetch(url)
            .then(response => response.json())
            .then((messagesContainer: MessagesContainer) => {
                this.insertMessages(messagesContainer.messages);
            })
            .catch((error) => {
                console.error(error);
            });
    }
}

export default ChatClient;
