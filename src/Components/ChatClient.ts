import { MessagesContainer, MessageContainer } from "./Globals";

class ChatClient {
    earliestMessageID: number = 10000000000;
    previousMessagesFetched: boolean = false;
    messages: MessageContainer[] = [];
    updateDisplay: () => void = () => { };
    private pagingToken: string = '';
    constructor() {
        console.log("ChatClient");
        this.getMessages();
        
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

    getMessages() {
        
        
        //const url = `http://localhost:3005/messages/get/`;
        const url = 'https://team404-server.onrender.com/messages/get/';
        const fetchURL = this.pagingToken ? `${url}${this.pagingToken}` : url;
        fetch(fetchURL)
            .then(response => response.json())
            .then((messagesContainer: MessagesContainer) => {
                this.insertMessages(messagesContainer.messages);
                this.pagingToken = messagesContainer.paginationToken;
            })
            
            .catch((error) => {
                console.error(error);
            });
            
    }


    getNextMessages() {
        this.getMessages();
    }

    sendMessage(user: string, message: string) {
        //const url = `http://localhost:3005/message/${user}/${message}`;
        const url = `https://team404-server.onrender.com/message/${user}/${message}`;
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
