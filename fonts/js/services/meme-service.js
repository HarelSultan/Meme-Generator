'use strict'

let gMeme
let gState = {
    currFontSize: 25,
    currTextAlign: 'left',
    currFontColor: '#fafafa',
    currStrokeColor: '#000000',
    currFont: 'impact',
}

function setSelectedImg(imgId) {
    gMeme = {
        selectedImgId: imgId,
        selectedLineIdx: 0,
        lines: [],
    }
}

function getMeme() {
    return gMeme
}

function getSelectedImgId() {
    return gMeme.selectedImgId
}

function checkFocusedLineClick(x, y) {
    const { xStart, yStart, xEnd, yEnd } = getFocusedLineBorderCords()
    return x >= xStart && x <= xEnd && y >= yStart && y <= yEnd
}

function moveFocusedLine(dx, dy) {
    const focusedLine = getFocusedLine()
    focusedLine.x += dx
    focusedLine.y += dy
}

function getClickedLineIdx(x, y) {
    const selectedLineIdx = getSelectedLineIdx()
    let clickedLineIdx = null

    gMeme.lines.forEach((line, index) => {
        if (selectedLineIdx === index) return
        const { xStart, yStart, xEnd, yEnd } = getLineCords(line)
        if (x >= xStart && x <= xEnd && y >= yStart && y <= yEnd) clickedLineIdx = index
    })

    return clickedLineIdx
}

function addNewLine(txt = 'Start Typing') {
    let { x, y } = getCanvasCenterCords()
    // Changing selectedLineIdx to lines.length since new line added
    changeLineFocus(gMeme.lines.length)
    // Calculating the top/mid/bottom of the canvas
    x -= txt.length * 5
    if (gMeme.selectedLineIdx === 0) y = y * 0.15
    if (gMeme.selectedLineIdx === 1) y = y * 1.8
    const {
        currFontSize: size,
        currFontColor: color,
        currStrokeColor: strokeColor,
        currTextAlign: align,
        currFont: fontFamily,
    } = gState
    gMeme.lines.push({ txt, size, color, strokeColor, fontFamily, align, x, y })
}

function deleteFocusedLine() {
    const focusedLineIdx = getSelectedLineIdx()
    gMeme.lines.splice(focusedLineIdx, 1)
}

function setLineText(text) {
    const currLineIdx = getSelectedLineIdx()
    gMeme.lines[currLineIdx].txt = text
}

function changeLineFocus(clickedLineIdx = null) {
    if (clickedLineIdx === null) {
        gMeme.selectedLineIdx = gMeme.selectedLineIdx >= gMeme.lines.length - 1 ? 0 : gMeme.selectedLineIdx + 1
    } else {
        gMeme.selectedLineIdx = clickedLineIdx
    }
}

function changeFontFamily(ev) {
    const focusedLine = getFocusedLine()
    focusedLine.fontFamily = ev.target.value
}

function changeFontColor(ev) {
    const selectedLineIdx = getSelectedLineIdx()
    const changedColor = ev.target.value
    gMeme.lines[selectedLineIdx].color = changedColor
}

function changeStrokeColor(ev) {
    const selectedLineIdx = getSelectedLineIdx()
    const changedStrokeColor = ev.target.value
    gMeme.lines[selectedLineIdx].strokeColor = changedStrokeColor
}

function changeFontSize(ev) {
    const selectedLineIdx = getSelectedLineIdx()
    const changedFontSize = +ev.target.dataset.changeBy
    gMeme.lines[selectedLineIdx].size += changedFontSize
}

function alignFocusedLine(alignTo) {
    const focusedLine = getFocusedLine()
    const focusedLineTextWidth = getTextWidth(focusedLine.txt)
    let { x } = getCanvasCenterCords()
    switch (alignTo) {
        case 'left':
            focusedLine.x = 30
            break
        case 'center':
            focusedLine.x = x - focusedLineTextWidth / 2
            break
        case 'right':
            focusedLine.x = x * 1.8 - focusedLineTextWidth
            break
    }
}

function getSelectedLineIdx() {
    return gMeme.selectedLineIdx
}

function getFocusedLine() {
    const selectedLineIdx = gMeme.selectedLineIdx
    return gMeme.lines[selectedLineIdx]
}
