import { useState } from 'react'
import './App.css'
import { ChatInput } from './components/chatInput.jsx'
import  ChatMessages  from './components/chatMessages.jsx'



function App(){
        const [chatMessages,  setChatMessages] = useState([{
            sender: "user",
            message: "hello Chatbot",
            id: 1


        }, {
            message: "Hi Atharva, How can I Help You ?",
            sender: "bot",
            id:2
        },{
            message: "what is the weather today ? ",
            sender: "user",
            id:3
        }, {
            message: "The Weather is Sunny Today ",
            sender: "bot",
            id: 4
        }]);
        // const chatMessages = array[0];
        // const setChatMessages = array[1];

        return (
            <main className="chat-app">
                <header className="chat-header">
                    <h1>Chatbot</h1>
                    <p>Ask anything. Press Enter to send, Escape to clear.</p>
                </header>
                <ChatMessages
                chatMessages={chatMessages}
                />
                <ChatInput
                setChatMessages={setChatMessages}                
                />
            </main>
        )
    }

export default App
