import { useState} from 'react';
import './chatInput.css';
import { getBotResponse } from '../services/chatbot.js';


export function ChatInput(props) {
    const { setChatMessages } = props;
        const [inputText, setInputText] = useState('');

function saveInputText(event){
    setInputText(event.target.value);
    }
        

function sendMessage(){
            const userMessage = inputText.trim();
            if (!userMessage) return;

            setChatMessages((chatMessages) => {
                const response = getBotResponse(userMessage, chatMessages);
                return [
                ...chatMessages,
                {
                    sender: "user",
                    message: userMessage,
                    id: crypto.randomUUID()
                },
                {
                    sender: "bot",
                    message: response,
                    id: crypto.randomUUID()
                }
            ]});
            setInputText('');
        }
        function handleKeydown(event) {

            if (event.key === 'Enter') {
                sendMessage();
            } else if (event.key === 'Escape') {
                setInputText('');
            }
        }


        return (
            <div className="chat-input-row">
                <input type="text"
                className="chat-input"
                placeholder="Send a message to Chatbot"
                onChange={saveInputText}
                onKeyDown={handleKeydown}
                value={inputText}
                />
                <button
                className="chat-send-btn"
                onClick={sendMessage}
                >Send</button>
            </div>
        )
    }
