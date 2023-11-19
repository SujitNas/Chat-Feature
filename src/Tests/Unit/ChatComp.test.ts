import { describe, expect, test } from '@jest/globals';
import { Database } from '../../Server/Database';
import { MessagesContainer, MessageContainer } from '../../Components/Globals';

describe('Database Message Ordering', () => {
    test('messages are appended in the correct order', () => {
        let db = new Database();

        // Users sending messages
        const users = ['User1', 'User2', 'User3'];
        const messages = ['Hello', 'How are you?', 'Good, thanks!'];

        // Simulate sending messages
        users.forEach((user, index) => {
            db.addMessage(user, messages[index]);
        });

        // Retrieve messages from the database
        let retrievedMessages = db.getMessages('');

        // Check if messages are in the correct order (newest first)
        for (let i = 0; i < users.length; i++) {
            expect(retrievedMessages.messages[i].user).toBe(users[users.length - 1 - i]);
            expect(retrievedMessages.messages[i].message).toBe(messages[messages.length - 1 - i]);
        }
    });
});