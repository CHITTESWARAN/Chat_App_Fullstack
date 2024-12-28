export function formatMessageTime(inputDate) {
    const date = new Date(inputDate); // Use inputDate to create a new Date object
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Add leading zero if hours or minutes are less than 10
    const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

    // Return time in "hh:mm" format
    const formattedTime = `${formattedHours}:${formattedMinutes}`;

    return formattedTime;
}
