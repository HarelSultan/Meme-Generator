'use strict'

let gMeme
let gState = {
    currFontSize: 25,
    currTextAlign: 'left',
    currFontColor: '#fafafa',
    currStrokeColor: '#000000',
    currFont: 'impact'
}
let gSavedMemes
const MEME_STORAGE_KEY = 'savedMemesDB'

function setSelectedImg(imgId) {
    gMeme = {
        selectedImgId: imgId,
        focusedLineIdx: 0,
        lines: []
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
    return (x >= xStart && x <= xEnd && y >= yStart && y <= yEnd)
}

function moveFocusedLine(dx, dy) {
    const focusedLine = getFocusedLine()
    focusedLine.x += dx
    focusedLine.y += dy
}

function getClickedLineIdx(x, y) {
    const focusedLineIdx = getFocusedLineIdx()
    let clickedLineIdx = null

    gMeme.lines.forEach((line, index) => {
        if (focusedLineIdx === index) return
        const { xStart, yStart, xEnd, yEnd } = getLineCords(line)
        if (x >= xStart && x <= xEnd && y >= yStart && y <= yEnd) clickedLineIdx = index
    })

    return clickedLineIdx
}

function addNewLine(txt = 'Start Typing') {
    let { x, y } = getCanvasCenterCords()
    // Changing focusedLineIdx to lines.length since new line added
    changeLineFocus(gMeme.lines.length)
    // Calculating the top/mid/bottom of the canvas
    x -= txt.length * 5
    if (gMeme.focusedLineIdx === 0) y = y * 0.15
    if (gMeme.focusedLineIdx === 1) y = y * 1.8
    const { currFontSize: size, currFontColor: color, currStrokeColor: strokeColor, currTextAlign: align, currFont: fontFamily } = gState
    gMeme.lines.push({ txt, size, color, strokeColor, fontFamily, align, x, y })
}

function deleteFocusedLine() {
    const focusedLineIdx = getFocusedLineIdx()
    gMeme.lines.splice(focusedLineIdx, 1)
}

function setLineText(text) {
    const currLineIdx = getFocusedLineIdx()
    gMeme.lines[currLineIdx].txt = text
}

function changeLineFocus(clickedLineIdx = null) {

    if (clickedLineIdx === null) {
        gMeme.focusedLineIdx = (gMeme.focusedLineIdx >= gMeme.lines.length - 1) ? 0 : gMeme.focusedLineIdx + 1
    } else {
        gMeme.focusedLineIdx = clickedLineIdx
    }
}

function changeFontFamily(ev) {
    const focusedLine = getFocusedLine()
    focusedLine.fontFamily = ev.target.value
}

function changeFontColor(ev) {
    const focusedLineIdx = getFocusedLineIdx()
    const changedColor = ev.target.value
    gMeme.lines[focusedLineIdx].color = changedColor
}

function changeStrokeColor(ev) {
    const focusedLineIdx = getFocusedLineIdx()
    const changedStrokeColor = ev.target.value
    gMeme.lines[focusedLineIdx].strokeColor = changedStrokeColor
}

function changeFontSize(ev) {
    const focusedLineIdx = getFocusedLineIdx()
    const changedFontSize = +ev.target.dataset.changeBy
    gMeme.lines[focusedLineIdx].size += changedFontSize
}

function alignFocusedLine(alignTo) {
    const focusedLine = getFocusedLine()
    const focusedLineTextWidth = getTextWidth(focusedLine.txt)
    console.log('focusedLineTextWidth:', focusedLineTextWidth)
    let { x } = getCanvasCenterCords()
    switch (alignTo) {
        case 'left': focusedLine.x = 30
            break
        case 'center': focusedLine.x = x - (focusedLineTextWidth / 2)
            break
        case 'right': focusedLine.x = (x * 1.8) - focusedLineTextWidth
            break
    }
}

function getFocusedLineIdx() {
    return gMeme.focusedLineIdx
}

function getFocusedLine() {
    const focusedLineIdx = gMeme.focusedLineIdx
    return gMeme.lines[focusedLineIdx]
}


function saveMemeToStorage(savedMemeId) {
    const { selectedImgId, lines, focusedLineIdx } = getMeme()
    const savedMeme = {
        selectedImgId,
        focusedLineIdx,
        lines,
        savedMemeId
    }
    if (!gSavedMemes || !gSavedMemes.length) {
        gSavedMemes = [savedMeme]
    } else {
        gSavedMemes.push(savedMeme)
    }
    saveToStorage(MEME_STORAGE_KEY, gSavedMemes)
}


function setSavedMemeImg(savedMemeId) {
    const savedMemes = loadFromStorage(MEME_STORAGE_KEY)
    console.log('savedMemes:', savedMemes)
    console.log('savedMemeId:', savedMemeId)
    const savedMeme = savedMemes.find(meme => meme.savedMemeId === savedMemeId)
    console.log('savedMemes:', savedMeme)
    gMeme = {
        selectedImgId: savedMeme.selectedImgId,
        focusedLineIdx: savedMeme.focusedLineIdx,
        lines: savedMeme.lines
    }
}


// Needs to save meme

// Needs to save meme url to gallery display