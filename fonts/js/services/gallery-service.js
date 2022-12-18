'use strict'

const IMGS_DB = 'imgs_DB'
let gImgs
let gNextId = 1
let gFilter = ''

function setImgs() {
    gImgs = []
    gImgs.push({ id: gNextId++, src: 'img/1.jpg', keywords: ['politics', 'funny'] })
    gImgs.push({ id: gNextId++, src: 'img/2.jpg', keywords: ['dog', 'cute'] })
    gImgs.push({ id: gNextId++, src: 'img/3.jpg', keywords: ['baby', 'cute'] })
    gImgs.push({ id: gNextId++, src: 'img/4.jpg', keywords: ['cat', 'sleepy'] })
    gImgs.push({ id: gNextId++, src: 'img/5.jpg', keywords: ['baby', 'funny'] })
    gImgs.push({ id: gNextId++, src: 'img/6.jpg', keywords: ['funny', 'tv'] })
    gImgs.push({ id: gNextId++, src: 'img/7.jpg', keywords: ['baby', 'funny'] })
    gImgs.push({ id: gNextId++, src: 'img/8.jpg', keywords: ['funny', 'tv'] })
    gImgs.push({ id: gNextId++, src: 'img/9.jpg', keywords: ['baby', 'funny'] })
    gImgs.push({ id: gNextId++, src: 'img/10.jpg', keywords: ['politics', 'funny'] })
    gImgs.push({ id: gNextId++, src: 'img/11.jpg', keywords: ['boxing', 'funny'] })
    gImgs.push({ id: gNextId++, src: 'img/12.jpg', keywords: ['tv', 'funny'] })
    gImgs.push({ id: gNextId++, src: 'img/13.jpg', keywords: ['tv', 'actor'] })
    gImgs.push({ id: gNextId++, src: 'img/14.jpg', keywords: ['tv', 'actor'] })
    gImgs.push({ id: gNextId++, src: 'img/15.jpg', keywords: ['tv', 'funny'] })
    gImgs.push({ id: gNextId++, src: 'img/16.jpg', keywords: ['tv', 'facepalm'] })
    gImgs.push({ id: gNextId++, src: 'img/17.jpg', keywords: ['politics', 'funny'] })
    gImgs.push({ id: gNextId++, src: 'img/18.jpg', keywords: ['tv', 'funny'] })
}

function getImgs() {
    let imgs = gImgs.filter(img => {
        return img.keywords.find(keyword => keyword.includes(gFilter))
    })
    return imgs
}

function getSelectedImgSrc(selectedImgId) {
    const selectedImg = gImgs.find(img => img.id === selectedImgId)
    return selectedImg.src
}

function addUploadedImg(elImage) {
    gImgs.push({ id: gNextId++, src: elImage.src, keywords: ['user uploads', 'dangerous'] })
}

function setImgsFilter(searchKey) {
    gFilter = searchKey
}
