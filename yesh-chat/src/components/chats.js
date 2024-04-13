import { useState, useEffect } from 'react';
import '../styles/chats.css';
import ContactListHeader from './ContactListHeader';
import ContactList from './ContactList';
import { ChatCard } from './ChatCard';
import io from 'socket.io-client';


export const Chats = ({ user }) => { //, sendMessageSocket }) => {
    const [contacts, setContacts] = useState([])
    const [selectedContact, setSelectedContact] = useState(null)
    const [selectedChat, setSelectedChat] = useState(null);
    const [socket, setSocket] = useState(null);


    const updateContacts = async () => { //get all the contacts from the db and update in the contact state for rendering
        let token = JSON.parse(localStorage.getItem('token')) || []
        const res2 = await fetch('https://social-chat-app-21.onrender.com/api/Chats', {
            'headers': {
                'Content-Type': 'application/json',
                'authorization': 'bearer ' + token,
            }
        })
        const newContacts = await res2.json();
        setContacts(newContacts);
        if (selectedContact) {
            const contact = newContacts.find((contact) =>
                contact.user.displayName === selectedContact.user.displayName)
            setSelectedContact(contact);
        }
        if (selectedContact) {
            const res4 = await fetch('https://social-chat-app-21.onrender.com/api/Chats/' + selectedContact.id, {
                'headers': {
                    'Content-Type': 'application/json',
                    'authorization': 'bearer ' + token
                }
            })
            if (res4.status !== 200) {
                alert('failed to open this contact chat or token time expired');
                logout();
            }
            const chat = await res4.json();
            setSelectedChat(chat);

        }
    }

    const handleDeleteChat = async (contact_to_delete) => {

        let token = JSON.parse(localStorage.getItem('token')) || []
        const res5 = await fetch('https://social-chat-app-21.onrender.com/api/Chats/' + contact_to_delete.id, {
            'method': 'delete',
            'headers': {
                'authorization': 'bearer ' + token
            }
        })
        if (res5.status !== 204) {
            alert('failed to delete chat or token is expired');
            logout();
        }


        //update left chat card after deletion:
        const res6 = await fetch('https://social-chat-app-21.onrender.com/api/Chats', {
            'headers': {
                'Content-Type': 'application/json',
                'authorization': 'bearer ' + token,
            }
        })
        const newContacts = await res6.json();
        setContacts(newContacts);

        if (selectedContact) {
            const contact = newContacts.find((contact) =>
                contact.user.displayName === selectedContact.user.displayName)
            setSelectedContact(contact);
        }

        //update right chat card after deletion:
        if (contact_to_delete.id === selectedContact?.id) {
            setSelectedContact(null);
        }
    }


    const addNewContact = async (e, newContactUsername) => { //getch post to add new contact + render the contact list
        e.preventDefault();
        const newContact = { "username": newContactUsername };
        let token = JSON.parse(localStorage.getItem('token')) || []
        const res = await fetch('https://social-chat-app-21.onrender.com/api/Chats', {
            'method': 'POST',
            'headers': {
                'Content-Type': 'application/json',
                'authorization': 'bearer ' + token,
            },
            'body': JSON.stringify(newContact)
        })
        if (res.status !== 200) {
            alert('username does not exist');
        }
        updateContacts();

    }

    const selectContact = async (contact) => { //if the user clicked a contact - update the selected contact and its chat in the state variables
        setSelectedContact(contact);
        let token = JSON.parse(localStorage.getItem('token')) || []        //get the full chat with the selected contact
        const res3 = await fetch('https://social-chat-app-21.onrender.com/api/Chats/' + contact.id, {
            'headers': {
                'Content-Type': 'application/json',
                'authorization': 'bearer ' + token
            }
        })
        if (res3.status !== 200) {
            alert('failed open this contact chat or token time expired');
            logout();
        }
        const chat = await res3.json();
        setSelectedChat(chat);


    }

    const logout = () => {
        localStorage.removeItem('user');
        window.location.href = '/';
    }

    const sendMessageSocket = (chat, message) => {
        if (socket) {
            var contact = 'contact';
            if (chat.users[0].username == user.username) {
                contact = chat.users[1];
            }
            else { contact = chat.users[0]; }

            console.log('contact: ' + JSON.stringify(contact.username) + 'message: ' + JSON.stringify(message));
            socket.emit('message', { contact: contact.username, msg: message.msg ,user:user.username });
        }
    }


    useEffect(() => {
        if (user) {
            const socket = io(); // Replace with your server URL
            setSocket(socket);

            socket.on('connect', () => {
                socket.emit('login', { username: user.username }); // Emit a 'login' event with the user's username
            });

            socket.on('alert', async (data) => {
                // Handle the alert event here (show an alert, update UI, etc.)
                alert(`you got new message from ${data.userSender} saying: ${data.msg}`);
                await updateContacts();
            });
            return () => {
                socket.disconnect(); // Disconnect the socket when the component unmounts
            };
        }
    }, [user]);


    useEffect(() => {
        updateContacts();
        //eslint-disable-next-line

    }, [])

    return (
        <>
            <img id="logo" src="logo.png" alt="logo"></img>
            <button
                type="button"
                className="btn btn-danger"
                id="logout"
                onClick={logout}
            >
                Logout
            </button>
            <div className="chats">
                <div className="card text-center border-dark" id="chatlistCard">
                    <ContactListHeader user={user} addNewContact={addNewContact} />
                    <ContactList
                        contacts={contacts}
                        selectContact={selectContact}
                        handleDeleteChat={handleDeleteChat}
                    />
                </div>
                <div className="card text-center border-dark" id="chatcontent">
                    <ChatCard
                        contact={selectedChat} //change to selected chat
                        updateContacts={updateContacts}
                        user={user}
                        logout={logout}
                        sendMessageSocket={sendMessageSocket}
                    />
                </div>
            </div>
            <br />
            <br />
        </>
    );
}
