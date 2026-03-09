import { useEffect } from 'react';
import robotAvatar from '../assets/robot.png'
import userAvatar from '../assets/user.png'
import { useState } from 'react';
import './chatMessage.css';

    export function ChatMessage(props){
        const {sender, message} = props;
        const [messageElement, setMessageElement] = useState(null);
        const messageDate = new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        });

        useEffect(() => {
            if (!messageElement) return;
            messageElement.scrollIntoView({
                behavior: 'smooth',
                block: 'end'
            });
        }, [messageElement, message]);
        

        // if(sender === "bot"){
        //     return (
        //         <div>
        //         <img src="robot.png" width="45"/>
        //         {message}
                
                
        //         </div>
        //     )
        // }
            return (
                <div
                ref={setMessageElement}
                className={`chat-message chat-message-${sender}`}>
                {sender === 'bot' && (
                    <img className="chat-avatar" src={robotAvatar} alt="Bot avatar" width="45"/>
                )}
                <div className="chat-bubble">
                    <p className="chat-text">{message}</p>
                    <span className="chat-time">{messageDate}</span>
                </div>
                {sender === 'user' && (
                    <img className="chat-avatar" src={userAvatar} alt="User avatar" width="45"/>
                )}
                    
                </div>
            )
        }
        
    
    
