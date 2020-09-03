export function random(maxNum, minNum = 0) {
    return Math.ceil(Math.random() * (maxNum - minNum)) + minNum;
}
