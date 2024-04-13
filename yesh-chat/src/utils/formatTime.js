export const formatTime = (time) => {
    const messageTime = new Date(time);
    const hours = messageTime.getHours();
    const minutes = `${messageTime.getMinutes()?.toString().length === 1 ? '0' : ''}${messageTime.getMinutes()}`
    if (!time) { return null }
    return `${hours}:${minutes}`
}