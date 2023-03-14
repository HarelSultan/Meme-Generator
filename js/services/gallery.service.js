'use strict'

const STORAGE_KEY = 'imgs_DB'
const WORDS_STORAGE_KEY = 'keywords_DB'
let gImgs
let gNextId = 1
let gKeywordsMap
let gKeywords
let gKeywordsIdx = 0
let gFilter = ''
let gSavedMemesImg

function setImgs() {
    gImgs = loadFromStorage(STORAGE_KEY)
    if (!gImgs || !gImgs.length) {
        gImgs = []
        gImgs.push({ id: gNextId++, src: '../img/1.jpg', keywords: ['politics', 'angry'] })
        gImgs.push({ id: gNextId++, src: '../img/2.jpg', keywords: ['dog', 'cute'] })
        gImgs.push({ id: gNextId++, src: '../img/3.jpg', keywords: ['baby', 'cute'] })
        gImgs.push({ id: gNextId++, src: '../img/4.jpg', keywords: ['cat', 'sleepy'] })
        gImgs.push({ id: gNextId++, src: '../img/5.jpg', keywords: ['baby', 'funny'] })
        gImgs.push({ id: gNextId++, src: '../img/6.jpg', keywords: ['funny', 'tv'] })
        gImgs.push({ id: gNextId++, src: '../img/7.jpg', keywords: ['baby', 'funny'] })
        gImgs.push({ id: gNextId++, src: '../img/8.jpg', keywords: ['funny', 'tv'] })
        gImgs.push({ id: gNextId++, src: '../img/9.jpg', keywords: ['baby', 'funny'] })
        gImgs.push({ id: gNextId++, src: '../img/10.jpg', keywords: ['politics', 'funny'] })
        gImgs.push({ id: gNextId++, src: '../img/11.jpg', keywords: ['boxing', 'funny'] })
        gImgs.push({ id: gNextId++, src: '../img/12.jpg', keywords: ['tv', 'funny'] })
        gImgs.push({ id: gNextId++, src: '../img/13.jpg', keywords: ['tv', 'actor'] })
        gImgs.push({ id: gNextId++, src: '../img/14.jpg', keywords: ['scary', 'actor'] })
        gImgs.push({ id: gNextId++, src: '../img/15.jpg', keywords: ['tv', 'funny'] })
        gImgs.push({ id: gNextId++, src: '../img/16.jpg', keywords: ['tv', 'facepalm'] })
        gImgs.push({ id: gNextId++, src: '../img/17.jpg', keywords: ['politics', 'funny'] })
        gImgs.push({ id: gNextId++, src: '../img/18.jpg', keywords: ['tv', 'funny'] })
        saveToStorage(STORAGE_KEY, gImgs)
    }
}

function getImgs() {
    let imgs = gImgs.filter(img => {
        return img.keywords.find(keyword => keyword.includes(gFilter))
    })
    return imgs
}

function setKeywordsMap() {
    gKeywordsMap = loadFromStorage(WORDS_STORAGE_KEY)
    if (!gKeywordsMap || !gKeywordsMap.length) {
        gKeywordsMap = {
            politics: 2,
            dog: 3,
            funny: 0,
            sleepy: 5,
            cute: 0,
            angry: 1,
            baby: 0,
            tv: 0,
            boxing: 0,
            actor: 0,
            scary: 0,
            facepalm: 0,
        }
    }
}

function getKeywordsMap() {
    return gKeywordsMap
}

function setKeywords() {
    gKeywords = [
        'politics',
        'dog',
        'funny',
        'sleepy',
        'cute',
        'angry',
        'baby',
        'tv',
        'boxing',
        'actor',
        'scary',
        'facepalm',
    ]
}

function getKeywords() {
    const startIdx = gKeywordsIdx * 4
    return gKeywords.slice(startIdx, startIdx + 4)
}

function nextKeywords() {
    gKeywordsIdx++
    if (gKeywordsIdx * 4 >= gKeywords.length) {
        gKeywordsIdx = 0
    }
}

function getSelectedImgSrc(selectedImgId) {
    const selectedImg = gImgs.find(img => img.id === selectedImgId)
    return selectedImg.src
}

function addUploadedImg(elImage) {
    gImgs.push({ id: gImgs.length + 1, src: elImage.src, keywords: ['user uploads', 'dangerous'] })
}

function setImgsFilter(searchKey) {
    gFilter = searchKey
}
