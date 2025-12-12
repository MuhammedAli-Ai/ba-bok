import dayjs from "dayjs";

export const goBack = () => {
    if (window.history.length > 1) {
        window.history.back();
    } else {
        console.warn("No history to go back to.");
    }
};

export const formattedDate = (date) => {
    if (!date) return "";
    return dayjs(date).format("DD-MM-YYYY");
};

export const formattedNumber = (number) => {
    if (number === undefined || number === null) return "";
    return number.toLocaleString();
};
