'use strict'
const SAVED_STORAGE_KEY = 'savedMemesImg_DB'

function addSavedMemesImg(imgDataUrl, savedMemeId) {
    if (!gSavedMemesImg || !gSavedMemesImg.length) {
        gSavedMemesImg = [{ savedMemeId, src: imgDataUrl }]
    } else {
        gSavedMemesImg.push({ imgDataUrl, savedMemeId })
    }
    saveToStorage(SAVED_STORAGE_KEY, gSavedMemesImg)
}


function getSavedMemesImg() {
    gSavedMemesImg = loadFromStorage(SAVED_STORAGE_KEY)
    if (!gSavedMemesImg || !gSavedMemesImg.length) return null
    return gSavedMemesImg
}

function hideSavedSection() {
    document.querySelector('.saved-memes-section').style.display = 'none'
    document.querySelector('.saved-memes-btn').classList.remove('active')
}