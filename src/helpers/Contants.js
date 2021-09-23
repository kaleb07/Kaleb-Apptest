const ROUTE_NAMES = {
    LIST: 'LIST',
    DETAIL_TRANSACTION: 'DETAIL_TRANSACTION',
}

const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember"
];

function stringZero(n) {
    return n < 10 ? "0" + n : n;
}

function formatDate(date) {
    const dateSplit = new Date(date.split(' ').join('T'));
    var result = stringZero(dateSplit.getDate()) + " " + months[dateSplit.getMonth()] + " " + dateSplit.getFullYear();

    return result;
}

export { ROUTE_NAMES, formatDate };