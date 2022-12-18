'use strict'

function onInitGallery() {
    setImgs()
    renderImgs()
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
    const elKeywordSpans = document.querySelectorAll('.keyword-span')

    elImgs.forEach(img => img.addEventListener('click', () => {
        setSelectedImg(+img.dataset.id)
        onInitMeme()
    }))
    elGalleryBtn.addEventListener('click', renderGallerySection)
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
    const elGallerySection = document.querySelector('.meme-gallery')
    const elMemeSection = document.querySelector('.meme-editor')
    elMemeSection.style.display = 'none'
    elGallerySection.hidden = false
    elMemeSection.hidden = true
}