export const convertDate = (date) => {
    // 2024-05-02T17:57:13.896Z input
    // year-month-day T h:m:s Z
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wedbesday', 'Thursday', 'Friday', 'Saturday'];

    const splitDate = date.split('T')[0].split('-');
    const year = splitDate[0];
    const month = parseInt(splitDate[1]);
    const day = parseInt(splitDate[2]);
    const dayOfWeek = days[(new Date(`${months[month - 1]} ${day} ${year}`)).getDay()]

    return {
        year,
        month,
        day,
        dayOfWeek
    }
}