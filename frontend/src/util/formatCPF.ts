export default function formatCPF(str: string) {
    const slicedStr = str.slice(0, 3) + '.' + str.slice(3, 6) + '.' + str.slice(6, 9) + '-' + str.slice(9, 11);
    return slicedStr;
}