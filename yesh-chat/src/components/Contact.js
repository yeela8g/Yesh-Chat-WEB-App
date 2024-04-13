import React from 'react';
import { formatTime } from '../utils/formatTime';



const Contact = ({ contact, selectContact, handleDeleteChat }) => {

    const deleteContact = async (e) => {
        e.stopPropagation();
        await handleDeleteChat(contact);
    }

    return (
        <li
            className='contactList'
            onClick={async () => await selectContact(contact)}
            style={{ cursor: 'pointer' }}
        >
            <img className="contact" src={contact.user.profilePic} alt="chica" />
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start'
                }}>
                    <div>
                        <h5 className="contactname">{contact.user.displayName}</h5>
                    </div>
                    <div className="last-msg">{contact.lastMessage?.content}</div>
                </div>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end'
                }}>
                    <button className="delete-button" onClick={deleteContact}>
                        Delete
                    </button>
                    <h6 className="date" style={{ alignSelf: 'flex-end' }}>{formatTime(contact.lastMessage?.created)}</h6>
                </div>
            </div>



        </li>
    )
}

export default Contact;