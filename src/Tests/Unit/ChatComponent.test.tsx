import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ChatComponent from '../../Components/ChatComponent';

// Mock the ChatClient class
jest.mock('../../Components/ChatClient', () => {
  return {
    __esModule: true,
    default: jest.fn().mockImplementation(() => {
      return {
        setCallback: jest.fn(),
        messages: Array.from({ length: 25 }, (_, i) => ({
          id: i + 1,
          user: 'User' + (i + 1),
          message: 'Message ' + (i + 1),
        })),
        previousMessagesFetched: false,
        getNextMessages: jest.fn(),
        sendMessage: jest.fn(),
      };
    }),
  };
});

/*
test('renders the latest 20 messages correctly', () => {
    // Render the ChatComponent
    render(<ChatComponent />);
  
    // Assert that the component renders correctly
    expect(screen.getByText('Chat')).toBeInTheDocument();
  
    // Check if the last 20 messages are displayed
    for (let i = 6; i <= 25; i++) {
      const messageText = `Message ${i}`;
      const messageElement = screen.queryByText(messageText);
  
      console.log(`Checking for: ${messageText}`);
      if (messageElement) {
        console.log(`Found: ${messageElement.textContent}`);
      } else {
        console.log(`Not Found: ${messageText}`);
      }
  
      expect(messageElement).toBeInTheDocument();
    }
  
    // Ensure that the first 5 messages are not displayed
    for (let i = 1; i <= 5; i++) {
      const messageText = `Message ${i}`;
      const messageElement = screen.queryByText(messageText);
  
      console.log(`Checking absence of: ${messageText}`);
      if (messageElement) {
        console.log(`Unexpectedly found: ${messageElement.textContent}`);
      } else {
        console.log(`Correctly not found: ${messageText}`);
      }
  
      expect(messageElement).toBeNull();
    }
  
    // Check if the "Load More Messages" button is present
    const loadMoreButton = screen.getByText('Load More Messages');
    expect(loadMoreButton).toBeInTheDocument();
  
    // Simulate a click on the "Load More Messages" button
    userEvent.click(loadMoreButton);
  
    // Ensure that the first 5 messages are still not displayed after clicking the button
    for (let i = 1; i <= 5; i++) {
      const messageText = `Message ${i}`;
      const messageElement = screen.queryByText(messageText);
  
      console.log(`Checking absence after click: ${messageText}`);
      if (messageElement) {
        console.log(`Unexpectedly found after click: ${messageElement.textContent}`);
      } else {
        console.log(`Correctly not found after click: ${messageText}`);
      }
  
      expect(messageElement).toBeNull();
    }
  });*/
  