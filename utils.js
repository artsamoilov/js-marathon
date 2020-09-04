export function random(maxNum, minNum = 0) {
    return Math.round(Math.random() * (maxNum - minNum)) + minNum;
}
