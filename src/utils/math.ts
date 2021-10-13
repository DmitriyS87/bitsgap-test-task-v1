export const mathRoundToDec = (num: number, dec: number) =>
    Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
