'use strict'

function onInitGallery() {
    setImgs()
    renderImgs()
    setKeywords()
    setKeywordsMap()
    renderKeywords()
    addListeners()
}

function renderImgs() {
    const imgs = getImgs()
    let strHTMLs = imgs.map(img => `
    <img data-id="${img.id}" class="gallery-img" src=${img.src}>
    `)
    document.querySelector('.gallery-main-content').innerHTML = strHTMLs.join('')
}


function addListeners() {
    const elImgs = document.querySelectorAll('.gallery-img')
    const elUploadInput = document.querySelector('.upload-input')
    const elSearchInput = document.querySelector('.search-input')
    const elGalleryBtn = document.querySelector('.gallery-btn')
    const elSavedMemesBtn = document.querySelector('.saved-memes-btn')
    const elKeywordSpans = document.querySelectorAll('.keyword-span')
    const elMoreKeywordsBtn = document.querySelector('.more-keywords-btn')

    elImgs.forEach(img => img.addEventListener('click', () => {
        setSelectedImg(+img.dataset.id)
        onInitMeme()
    }))
    elKeywordSpans.forEach(keyword => keyword.addEventListener('click', increaseKeywordSize))
    elMoreKeywordsBtn.addEventListener('click', onNextKeywords)
    elGalleryBtn.addEventListener('click', renderGallerySection)
    elSavedMemesBtn.addEventListener('click', renderSavedMemesSection)
    elSearchInput.addEventListener('keyup', onSetFilterBy)
    elUploadInput.addEventListener('change', onUploadImg)
}

function onUploadImg(ev) {
    loadImageFromInput(ev, renderUploadedImg)
}

function loadImageFromInput(ev, onImageReady) {
    const reader = new FileReader()

    reader.onload = (event) => {
        let img = new Image()
        img.src = event.target.result
        img.onload = () => {
            addUploadedImg(img)
            onImageReady(img)
        }
    }
    reader.readAsDataURL(ev.target.files[0])
}

function renderUploadedImg(img) {
    const imgs = getImgs()
    setSelectedImg(imgs.length)
    onInitMeme()
}


function onSetFilterBy(ev) {
    setImgsFilter(ev.target.value)
    renderImgs()
}

function renderGallerySection(ev) {
    ev.target.classList.add('active')
    hideSavedSection()
    const elGallerySection = document.querySelector('.meme-gallery')
    const elMemeSection = document.querySelector('.meme-editor')
    elMemeSection.style.display = 'none'
    elGallerySection.hidden = false
    elMemeSection.hidden = true
}

function increaseKeywordSize(ev) {
    let keywordFontSize = parseFloat(window.getComputedStyle(ev.target).getPropertyValue('font-size'))
    console.log('keywordFontSize:', (keywordFontSize))
    if (keywordFontSize < 20) ev.target.style.fontSize = keywordFontSize + 1 + 'px'
    console.log('ev.target.value:', ev.target.innerText)
    setImgsFilter(ev.target.innerText)
    renderImgs()
}

function renderKeywords() {
    const keywords = getKeywords()
    const keywordsMap = getKeywordsMap()
    const strHTMLs = keywords.map(keyword => `
    <span style="font-size: ${keywordsMap[keyword] + 12}px;" class="keyword-span">${keyword}</span>`)
    document.querySelector('.keyword-container').innerHTML = strHTMLs.join('')
}

function onNextKeywords() {
    nextKeywords()
    renderKeywords()
}

function renderSavedMemesSection(ev) {
    document.querySelector('.gallery-btn').classList.remove('active')
    ev.target.classList.add('active')
    document.querySelector('.meme-gallery').hidden = true
    document.querySelector('.meme-editor').style.display = 'none'
    document.querySelector('.saved-memes-section').style.display = 'grid'
    renderSavedMemesImg()
}

function onSaveMemeToGallery(imgDataUrl, savedMemeId) {
    addSavedMemesImg(imgDataUrl, savedMemeId)
    renderSavedMemesSection()
}

function renderSavedMemesImg() {
    const savedMemesImg = getSavedMemesImg()
    if (!savedMemesImg) return console.log('proba')
    console.log('savedMemes:', savedMemesImg)
    let strHTMLs = savedMemesImg.map(memeImg => `
    <img onclick="setSavedMemeImg('${memeImg.savedMemeId}');hideSavedSection();onInitMeme()" class="gallery-img" src=${memeImg.src}>
    `)
    document.querySelector('.saved-memes-section').innerHTML = strHTMLs.join('')
}

