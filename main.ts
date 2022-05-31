radio.setGroup(38)
radio.setTransmitPower(7)
//let myId = 0
let deltamodifier = 1 //1 = 100% 2 = 200%

music.setVolume(255)

let clear = (): void => {
    for (let y = 0; y < 5; y++) {
        for (let x = 0; x < 5; x++) {
            led.unplot(x, y)
        }
    }
}

input.onLogoEvent(TouchButtonEvent.LongPressed, function () {
    clear()
    radio.sendNumber(99) //run
})

input.onButtonPressed(Button.AB, function () {
    clear()
    radio.sendNumber(100) //stop
})

input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    radio.sendNumber(deltamodifier * 10 + 12) //submit deltamodifier (difficulty)
    basic.showString("S", 1000)
    clear()
})

input.onButtonPressed(Button.A, function () {
    deltamodifier = Math.constrain(deltamodifier - 0.1, 0.8, 2.8)
    console.logValue("d", 1 + ((deltamodifier * 10 + 12 - 22) / 10))
    whaleysans.showNumber(deltamodifier * 10)
})

input.onButtonPressed(Button.B, function () {
    deltamodifier = Math.constrain(deltamodifier + 0.1, 0.8, 2.8)
    console.logValue("d", 1 + ((deltamodifier * 10 + 12 - 22) / 10))
    whaleysans.showNumber(deltamodifier * 10)
})


radio.onReceivedNumber(function (receivedNumber: number) {
    if (receivedNumber < 6) {
        led.plot((receivedNumber % 3) * 2, Math.idiv(receivedNumber, 3))
    } else
    if (receivedNumber < 16) {
        led.plot((receivedNumber % 3) * 2, Math.idiv(receivedNumber, 3) + 3)
    }
})

clear()