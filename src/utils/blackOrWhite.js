const blackOrWhite = (hexColor) => {
    const split = hexColor.split('')
    const isMinimize = split.length === 4

    const red = `${split[1]}${isMinimize ? split[1] : split[2]}`
    const green = `${isMinimize ? split[2] : split[3]}${isMinimize ? split[2] : split[4]}`
    const blue = `${isMinimize ? split[3] : split[5]}${isMinimize ? split[3] : split[6]}`

    const ratio = (parseInt(red, 16) * 0.299 + parseInt(green, 16) * 0.587 + parseInt(blue, 16) * 0.114);

    if (ratio >= 150) {
        return 'B';
    } else {
        return 'W';
    }
}

export default blackOrWhite
