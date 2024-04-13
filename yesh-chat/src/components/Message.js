import React from 'react';
import { formatTime } from '../utils/formatTime'

const Message = ({ message , user}) => {

    return (
        <div className={`${message.sender.username === user.username ? 'mine' : 'yours'} message last`}>
            {message.content}
            <div className="msgTime mine">{formatTime(message.created)}</div>
        </div>
    )
}

export default Message;



