import Contact from './Contact'
const ContactList = ({ contacts, selectContact,handleDeleteChat }) => {

    const sortByLastMessageTime = (a, b) => {
        const lastMessageA = a.lastMessage;
        const lastMessageB = b.lastMessage;

        if (!lastMessageA) { return 1 };
        if( !lastMessageB){return -1};
        if (lastMessageA.created < lastMessageB.created) {
            return 1;
        } else if (lastMessageA.created > lastMessageB.created) {
            return -1;
        } else {
            return 0;
        }
    }

    return (
        <div className="card-body">
            <ul id="chatList">
                {contacts?.sort(sortByLastMessageTime).map((contact) => {
                    return (
                        <Contact
                            contact={contact}
                            selectContact={selectContact}
                            handleDeleteChat={handleDeleteChat}
                        />
                    )
                })}
            </ul>
        </div>
    )
}

export default ContactList;