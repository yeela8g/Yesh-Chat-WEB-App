import React, { useState } from 'react';

const ContactListHeader = ({ user, addNewContact }) => {
    const [newContact, setNewContact] = useState('')

    const triggerAddNewContact =  async(e) => {
        await addNewContact(e, newContact) //handle new contact in the contacts list
        setNewContact('');
        document.querySelector('.btn-close').click();
    }

    return (
        <div className="card-header" id="userHeader">
            <img className="contact" src={user?.profilePic} alt=""></img>
            <h5 className="contactnameh">{user?.displayName}</h5>
            <button id="addcontact" className="btn custom-btn" data-bs-toggle="modal" data-bs-target="#newContactModal"
                z-index="1">
                <i className="bi bi-person-plus"></i>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                    className="bi bi-person-plus" viewBox="0 0 16 16">
                    <path
                        d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                    <path fillRule="evenodd"
                        d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z" />
                </svg>
            </button>
            <div className="modal fade" id="newContactModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Add new contact</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={triggerAddNewContact}>
                                <div className="mb-3">

                                    <input
                                        value={newContact}
                                        onChange={(e) => setNewContact(e.target.value)} //{"username": e.target.value}
                                        type="text"
                                        className="form-control"
                                        id="recipient-name"
                                        placeholder="Contact's identifier"
                                    />
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-secondary">Add</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactListHeader;