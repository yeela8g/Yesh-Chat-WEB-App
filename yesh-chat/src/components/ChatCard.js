import React, { useState, useEffect } from 'react';
import Message from './Message';

export const ChatCard = ({ contact, updateContacts, user, logout, sendMessageSocket }) => { //the contact.user contain both the user and contact info we need user to distinguish between them
    const [newMessage, setNewMessage] = useState('')
    const [contactInfo, setContactInfo] = useState('');
    //contact in the input includes:chatid, chat-users, messages.
    //contactInfo contain only the contact info - username display name and picture

    const sendNewMessage = async (e) => {
        e.preventDefault();
        const message = { "msg": newMessage };
        let token = JSON.parse(localStorage.getItem('token')) || [];
        const res = await fetch('https://social-chat-app-21.onrender.com/api/Chats/' + contact.id + '/Messages', {
            'method': 'post',
            'headers': {
                'Content-Type': 'application/json',
                'authorization': 'bearer ' + token
            },
            'body': JSON.stringify(message)
        })
        if (res.status !== 200) {
            alert("failed to send new message or token time expired");
            logout();
        }
        sendMessageSocket(contact, message);
        await updateContacts();
        setNewMessage('');

        

    }

    const positionScroll = () => {
        const messageElement = document.querySelector('.messages');
        const scrollHeight = messageElement?.scrollHeight;
        const offsetHeight = messageElement?.offsetHeight;
        const scrollTop = scrollHeight - offsetHeight;

        if (messageElement) {
            messageElement.scrollTop = scrollTop;
        }
    }

    useEffect(() => {
        const contactInfoTemp = contact?.users?.find((obj) => obj.username !== user.username) //get the contact 
        setContactInfo(contactInfoTemp);
        positionScroll();
    }, [contact])

    return (
        contact ? (
            <>
                <div className="card-header" id="contactHeader">
                    <img className="contact" src={contactInfo?.profilePic} alt="chica"></img> 
                    <h5 className="contactnameh">{contactInfo?.displayName}</h5> 
                </div>
                <div className="card-body">
                    <div className="chat">
                        <div className="messages">
                            {
                                contact?.messages?.map((message) =>
                                    <Message message={message} user={user} />
                                )
                            }
                        </div>
                    </div>
                </div>
                <div className="card-footer text-body-secondary">
                    <form onSubmit={sendNewMessage}>
                        <input
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            className="form-control"
                            placeholder="New message here..."
                            id="message"
                        />
                        <button type="submit" className="btn btn-secondary" id="sendbutton">Send</button>
                    </form>
                </div>
            </>
        ) : (
            <div>
                <img src="logo.png" alt="" style={{ width: 250 }} />
            </div>
        )
    )
}
