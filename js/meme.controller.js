'use strict'

let gElCanvas
let gCtx
let gFocusedLineBorderCords
let gIsDragging = false
let gStartDraggingPos
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

function onInitMeme() {
    renderMemeSection()
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')
    addMemeListeners()
    resizeCanvas()
    addFonts()
    addNewLine()
    renderMeme()
    renderFocusedLineBorder()
}

function renderMemeSection() {
    const elGallerySection = document.querySelector('.meme-gallery')
    const elMemeSection = document.querySelector('.meme-editor')
    const elGalleryBtn = document.querySelector('.gallery-btn')
    elGallerySection.hidden = true
    elMemeSection.hidden = false
    elMemeSection.style.display = 'flex'
    elGalleryBtn.classList.remove('active')
}

function addMemeListeners() {
    addMouseListeners()
    addTouchListeners()
    const elTextInput = document.querySelector('.text-input')
    const elSwitchLineFocusBtn = document.querySelector('.switch-focus')
    const elAddLineBtn = document.querySelector('.add-text')
    const elDeleteLineBtn = document.querySelector('.delete-text')
    const elIncreaseSizeBtn = document.querySelector('.increase-size')
    const elDecreaseSizeBtn = document.querySelector('.decrease-size')
    const elAlignBtns = document.querySelectorAll('.align-btn')
    const elChangeFontSelect = document.querySelector('.select-font')
    const elTextColorInput = document.querySelector('.text-color')
    const elStrokeColorInput = document.querySelector('.stroke-color')
    const elStickerBtns = document.querySelectorAll('.sticker-btn')
    const elShareBtn = document.querySelector('.share-btn')
    const elDownloadBtn = document.querySelector('.download-btn')
    const elSaveBtn = document.querySelector('.btn-save')

    elTextInput.addEventListener('keyup', onChangeText)
    elAddLineBtn.addEventListener('click', onAddLine)
    elDeleteLineBtn.addEventListener('click', onDeleteLine)
    elSwitchLineFocusBtn.addEventListener('click', onChangeFocus)
    elStickerBtns.forEach(elStickerBtn => elStickerBtn.addEventListener('click', onAddSticker))
    elAlignBtns.forEach(elAlignBtn => elAlignBtn.addEventListener('click', onLineAlignment))

    elTextColorInput.addEventListener('change', onChangeFontColor)
    elStrokeColorInput.addEventListener('change', onChangeStrokeColor)
    elChangeFontSelect.addEventListener('change', onChangeFontFamily)
    elIncreaseSizeBtn.addEventListener('click', onChangeFontSize)
    elDecreaseSizeBtn.addEventListener('click', onChangeFontSize)

    elShareBtn.addEventListener('click', onShareMeme)
    elDownloadBtn.addEventListener('click', onDownloadMeme)
    elSaveBtn.addEventListener('click', onSaveMeme)

    window.addEventListener('resize', () => {
        resizeCanvas()
        renderMeme()
    })
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    // Checking if focused line is clicked
    const { x, y } = getPos(ev)
    const isFocusedLineClicked = checkFocusedLineClick(x, y)
    // if so start dragging
    if (isFocusedLineClicked) {
        document.body.style.cursor = 'grabbing'
        gIsDragging = true
        gStartDraggingPos = { x, y }
        renderFocusedLineBorder()
        return
    }
    // Checking if any line got clicked if so changing the focus
    const clickedLineIdx = getClickedLineIdx(x, y)
    if (clickedLineIdx !== null) {
        changeLineFocus(clickedLineIdx)
        renderMeme()
        renderFocusedLineBorder()
        renderFocusedLineSettings()
    } else {
        // If no line got clicked rendering the canvas without any border
        renderMeme()
    }
}

function onMove(ev) {
    if (!gIsDragging) return
    const { x, y } = getPos(ev)
    const dx = x - gStartDraggingPos.x
    const dy = y - gStartDraggingPos.y
    moveFocusedLine(dx, dy)
    gStartDraggingPos = { x, y }
    renderMeme()
    renderFocusedLineBorder()
}

function onUp() {
    gIsDragging = false
    gStartDraggingPos = null
    document.body.style.cursor = 'default'
}

function onLineAlignment(ev) {
    alignFocusedLine(ev.target.dataset.align)
    renderMeme()
    renderFocusedLineBorder()
}

function onChangeFocus() {
    changeLineFocus()
    renderMeme()
    renderFocusedLineBorder()
    renderFocusedLineSettings()
}

function onChangeFontFamily(ev) {
    changeFontFamily(ev)
    renderMeme()
}

function onChangeFontColor(ev) {
    changeFontColor(ev)
    renderMeme()
}

function onChangeStrokeColor(ev) {
    changeStrokeColor(ev)
    renderMeme()
}

function onChangeFontSize(ev) {
    changeFontSize(ev)
    renderMeme()
    renderFocusedLineBorder()
}

function onChangeText(ev) {
    setLineText(ev.target.value)
    renderMeme()
    renderFocusedLineBorder()
}

function onAddLine(value = null) {
    const elTextInput = document.querySelector('.text-input')
    elTextInput.value = ''
    addNewLine()
    renderMeme()
    renderFocusedLineBorder()
}

function onAddSticker(ev) {
    addNewLine(ev.target.innerText)
    renderMeme()
    renderFocusedLineBorder()
}

function onDeleteLine() {
    deleteFocusedLine()
    onChangeFocus()
}

function resizeCanvas() {
    const elCanvasContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elCanvasContainer.offsetWidth - 5
    gElCanvas.height = elCanvasContainer.offsetHeight - 6
}

function renderImg() {
    // Getting selectedImgId from meme service
    const selectedImgId = getSelectedImgId()
    // Getting selectedImg src from gallery service
    const selectedImgSrc = getSelectedImgSrc(selectedImgId)
    let selectedImg = new Image()
    selectedImg.src = selectedImgSrc
    gCtx.drawImage(selectedImg, 0, 0, gElCanvas.width, gElCanvas.height)
}

function renderMeme() {
    renderImg()
    const currMeme = getMeme()
    // Rendering all the lines by getting gMeme from service
    currMeme.lines.forEach(line => {
        const { txt, size, align, color, strokeColor, fontFamily, x, y } = line
        drawText(txt, size, align, color, strokeColor, fontFamily, x, y)
    })
}

function renderFocusedLineSettings() {
    let focusedLine = getFocusedLine()
    document.querySelector('.text-input').value = focusedLine.txt
    document.querySelector('.select-font').value = focusedLine.fontFamily
    document.querySelector('.text-color').value = focusedLine.color
    document.querySelector('.stroke-color').value = focusedLine.strokeColor
}

function drawText(txt, size, align, color, strokeColor, fontFamily, x, y) {
    gCtx.lineWidth = 2
    gCtx.fillStyle = color
    gCtx.strokeStyle = strokeColor
    gCtx.font = `${size}px ${fontFamily}`
    gCtx.textAlign = align
    gCtx.textBaseline = 'top'
    gCtx.fillText(txt, x, y)
    gCtx.strokeText(txt, x, y)
}

function getCanvasCenterCords() {
    return { x: gElCanvas.width / 2, y: gElCanvas.height / 2 }
}

function addFonts() {
    let impactFont = new FontFace('impact', 'url(/fonts/impact.ttf)')
}

function renderFocusedLineBorder() {
    const focusedLine = getFocusedLine()
    const { x, y, size, txt, color, currFont } = focusedLine
    drawBorder(x, y, size, txt, color, currFont)
}

function drawBorder(x, y, size, txt, color, currFont) {
    // Drawing a border around the focused line
    gCtx.strokeStyle = color
    gCtx.font = `${size}px ${currFont}`
    let textWidth = gCtx.measureText(txt).width
    let borderStartingWidth = parseInt(x - size * 0.3)
    let borderStartingHeight = parseInt(y - size * 0.15)
    let borderWidth = parseInt(textWidth + size * 0.8)
    let borderHeight = parseInt(size * 1.5)
    gCtx.strokeRect(borderStartingWidth, borderStartingHeight, borderWidth, borderHeight)
    // Keeping border in global variable in order to check if focused line is clicked
    const xEnd = borderStartingWidth + borderWidth
    const yEnd = borderStartingHeight + borderHeight
    gFocusedLineBorderCords = { xStart: borderStartingWidth - 2, yStart: borderStartingHeight - 3, xEnd, yEnd }
}

function getTextWidth(txt) {
    return gCtx.measureText(txt).width
}

function getFocusedLineBorderCords() {
    return gFocusedLineBorderCords
}

function getLineCords({ x, y, size, txt }) {
    const lineWidth = getTextWidth(txt)
    const yStart = parseInt(y + size / 7)
    const xEnd = parseInt(x + lineWidth + size / 1.5)
    const yEnd = parseInt(y + size / 1.3)
    return { xStart: x, yStart, xEnd, yEnd }
}

function getPos(ev) {
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }
    // Checking if user accesing trough mobile
    if (TOUCH_EVS.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    return pos
}

function onShareMeme() {
    // Converts canvas content to img format
    const imgDataUrl = gElCanvas.toDataURL('image/jpeg')
    // Function called in case request went through
    function onSucess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        window.open(`https://www.facebook.com/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`)
    }
    // Send the image to the server
    doUploadImg(imgDataUrl, onSucess)
}

function doUploadImg(imgDataUrl, onSucess) {
    const formData = new FormData()
    formData.append('img', imgDataUrl)
    fetch('//ca-upload.com/here/upload.php', { method: 'POST', body: formData })
        .then(res => res.text())
        .then(url => {
            onSucess(url)
        })
}

function onDownloadMeme() {
    const elLink = document.querySelector('.download-btn')
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}

function onSaveMeme() {
    const savedMemeId = makeId(3)
    const savedImgDataUrl = gElCanvas.toDataURL('image/jpgq')
    saveMemeToStorage(savedMemeId)
    onSaveMemeToGallery(savedImgDataUrl, savedMemeId)
}
