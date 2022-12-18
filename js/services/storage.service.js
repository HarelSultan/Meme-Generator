'use strict'

function saveToStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val))
}

function loadFromStorage(key) {
    var val = localStorage.getItem(key)
    return JSON.parse(val)
}

// * {
//     box-sizing: border-box;
// }

// :root {
//     /* pallete */
//     --clr0: linear-gradient(-86deg, rgb(25, 224, 108) 0%, #0c98b9 100%);
//     --clr1: #fefefe;
//     --clr2: #21ac91;
//     --clr3: #41444b;
// }

// /* typography */
// @font-face {
//     font-family: poppins;
//     src: url(/fonts/Poppins-Regular.ttf);
// }

// @font-face {
//     font-family: poppins-semi;
//     src: url(/fonts/Poppins-SemiBold.ttf);
// }

// /* basics */
// html {
//     font-family: poppins;
//     color: var(--clr1);
//     font-size: 12px;
// }

// body {
//     background: #22252c;
//     margin: 0;
// }

// ::-webkit-scrollbar {
//     width: 0px;
// }

// button {
//     font-family: inherit;
//     cursor: pointer;
//     font-size: 1em;
//     margin: 0;
//     padding: 0;
//     color: inherit;
// }

// /* Layouts */
// /* Header */
// .main-header {
//     max-width: 100vw;
//     margin: 0 auto;
//     border-radius: 100em;
//     background: var(--clr0);
// }

// /* Header content wrapper */
// .main-header-content {
//     width: 100vw;
//     margin-inline-start: 5vw;
// }

// /* Logo */
// .logo {
//     height: 3.75em;
//     padding-inline-start: 1em;
// }

// .logo img {
//     width: 5em;
// }

// /* Nav Buttons */
// .nav-btns-container>* {
//     background: none;
//     border: none;
//     font-size: 1.25em;
//     padding-inline: 1em;
// }

// .nav-btn.active {
//     color: var(--clr2);
//     background: var(--clr1);
//     border-radius: 5em;
// }

// /* Gallery */
// .meme-gallery {
//     width: 95vw;
//     margin: 0 auto;
//     background: var(--clr3);
//     margin-block: 1em;
// }

// /* Filter, Search Section */
// .filter-container {
//     margin-inline: 1em;
//     padding-block-start: 1em;
//     margin-block-end: 1.5em;
//     display: grid;
//     grid-template-columns: 1.5fr 0.5fr;
//     grid-template-rows: 1fr 1fr;
//     gap: 10px;
//     align-items: center;
// }

// .search-input-container {
//     font-size: 1.3125em;
//     height: 2.3809em;
//     border-radius: 5em;
//     background: #353942;
//     grid-area: 1/1/2/3;
// }

// .search-input {
//     border: none;
//     background: none;
//     outline: none;
//     font-size: 1em;
//     width: 90%;
//     color: inherit;
// }

// .fa-magnifying-glass {
//     font-size: 0.73em;
//     padding-inline: 0.6em;
// }

// .keyword-container {
//     height: 3.125em;
//     background: rgb(166, 164, 164);
//     border-radius: 5em;
// }

// .more-keywords-btn {
//     background: var(--clr0);
//     font-size: 1.125em;
//     border-radius: 1em;
//     height: 2em;
// }

// .upload-container {
//     margin-block-end: 1.5em;
// }

// .upload-input {
//     display: none;
// }

// .upload-img-label {
//     width: 10em;
//     background: #0c98b9;
//     text-align: center;
//     cursor: pointer;
//     padding: .5em;
//     border-radius: 1em;
// }

// /* Gallery Images */
// .gallery-main-content {
//     display: grid;
//     grid-template-columns: 1fr 1fr;
//     column-gap: 10px;
//     row-gap: 20px;
//     height: 80vh;
//     width: 92vw;
//     margin: 0 auto;
//     overflow-y: scroll;
//     padding-inline: 1em;
// }

// /* Images */
// .gallery-img {
//     max-height: 150px;
//     max-width: 150px;
//     border-radius: 10px;
//     cursor: pointer;
//     justify-self: center;
// }

// /* Meme gen */
// .meme-editor {
//     width: 90vw;
//     margin: 0 auto;
//     margin-block-start: 1.5em;
//     flex-direction: column;
//     align-items: center;
// }

// /* Canvas container */
// .canvas-container {
//     height: 350px;
//     width: 350px;
//     border: 3px solid rgb(173, 170, 170);
//     border-radius: 12px;
//     margin-block-end: 1em;
// }

// #my-canvas {
//     border-radius: 0.5em;
//     transform: translate(-1px, 1px);
// }

// /* Meme Control Box */
// .meme-funcs-container {
//     height: 400px;
//     width: 350px;
//     background: rgba(236, 230, 230, 0.222);
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     border-radius: 1.5em;
//     font-size: 12.5px;
//     padding-inline: 2em;
// }

// .meme-funcs-container>* {
//     margin-block-start: 1.5em;
// }

// .text-input {
//     font-size: 1.3125em;
//     height: 2.8em;
//     width: 17.5em;
//     border-radius: 1.2em;
//     text-align: center;
// }

// .crd-container>* {
//     width: 2.5em;
//     height: 3em;
//     margin-right: 0.5em;
//     border: none;
//     border-radius: .5em;
// }

// button.switch-focus {
//     background: linear-gradient(-38deg, #66c4dc 0%, #40b1ce 50%, #0c98bb 100%);
// }

// .switch-focus-icon {
//     transform: scale(2.1, 2.1) rotate(90deg);
// }

// button.add-text {
//     background: linear-gradient(-38deg, #42eb5c 0%, #37b34a 100%);
// }

// .fa-plus {
//     transform: scale(1.7, 1.9);
// }

// button.delete-text {
//     background: linear-gradient(-38deg, #cf1d37 0%, #cf1d37 1%, #f05036 100%);
// }

// .fa-trash {
//     transform: scale(2.2, 2.2);
// }

// .text-styling-container {
//     background: #19a59f;
//     width: 22.97em;
//     border-radius: 1.575em;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
// }

// .top-stylng-container {
//     width: 21em;
//     display: flex;
//     justify-content: space-evenly;
//     margin-block-start: 0.5em;
//     margin-block-end: 1em;
// }

// .top-stylng-container>* {
//     width: 2.5em;
//     height: 3em;
//     font-family: poppins-semi;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     border-radius: .5em;
//     border: none;
//     background-size: 1.8em;
//     background-repeat: no-repeat;
//     background-position: center;
// }

// .increase-size {
//     background-image: url(/icons/a-plus-symbol.png);
// }

// .decrease-size {
//     background-image: url(/icons/a-minus-symbol.png);
// }

// .text-align-left {
//     background-image: url(/icons/align-left.png);
// }

// .text-align-center {
//     background-image: url(/icons/align-center.png);
// }

// .text-align-right {
//     background-image: url(/icons/align-right.png);
// }

// .bottom-styling-container {
//     width: 21em;
//     display: flex;
//     justify-content: space-evenly;
//     margin-block-start: 0.5em;
//     margin-block-end: 1em;
//     align-items: center;
// }

// .bottom-styling-container>*:not(:first-child) {
//     width: 2.5em;
//     height: 3em;
//     font-family: poppins-semi;
//     border-radius: .5em;
//     border: none;
//     background-size: 2.3em;
//     background-repeat: no-repeat;
//     background-position: center;
// }

// .select-font {
//     font-size: 1.5750em;
//     width: 6.666em;
//     height: 1.905em;
//     border-radius: .5em;
//     border: none;
//     padding-inline-start: .7em;
// }

// .stroke-color-btn {
//     background-image: url(/icons/stroke.png);
// }

// .text-color-btn {
//     background-image: url(/icons/paint.png);
// }

// .bottom-styling-container input {
//     height: 100%;
//     width: 100%;
//     border: none;
//     outline: none;
//     opacity: 0;
// }

// .stickers-container {
//     width: 22.97em;
//     background: var(--clr1);
//     display: flex;
//     justify-content: space-evenly;
//     border-radius: 1.575em;
// }

// .sticker-btn {
//     font-size: 2.5em;
//     height: 1.5em;
//     width: 1.4em;
//     border: none;
//     border-radius: 2em;
// }

// .share-container {
//     width: 22.97em;
//     display: flex;
//     justify-content: space-between;
//     padding-block-end: 2em;
// }

// .share-container>* {
//     font-size: 1.6em;
//     height: 2em;
//     width: 48%;
//     font-family: poppins;
// }

// .share-btn {
//     background: #1e7cd3;
//     border: none;
//     border-radius: 0.5em;
// }

// .fa-share-nodes {
//     transform: scale(0.8, 0.8);
// }

// .download-btn {
//     text-decoration: none;
//     color: var(--clr1);
//     background: #8f44bb;
//     border-radius: 0.5em;
// }

// .download-btn img {
//     color: var(--clr1);
//     height: 1.5em;
//     width: 1.3em;
// }

// .fa-download {
//     transform: scale(0.8, 0.8);
// }

// /* Helpers */

// .flex {
//     display: flex;
// }

// .flex-align-center {
//     align-items: center;
// }

// .flex-justify-center {
//     justify-content: center;
// }

// .flex-space-between {
//     justify-content: space-between;
// }

// .flex-space-evenly {
//     justify-content: space-evenly;
// }

// @media (min-width: 475px) {
//     .gallery-main-content {
//         grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
//         margin-inline-end: 2em;
//     }

//     .gallery-img {
//         max-height: 200px;
//         max-width: 200px;
//         border-radius: 10px;
//     }

// }

// @media (min-width:900px) {

//     html {
//         font-size: 14px;
//     }

//     .main-header {
//         max-width: 97vw;
//         margin-block: 0.5em;
//     }

//     .main-header-content {
//         width: 75vw;
//         margin-inline-start: 5vw;
//     }

//     .filter-container {
//         grid-template-columns: 1.1fr 1.2fr 0.25fr;
//         grid-template-rows: 1fr;
//         font-size: 14px;
//     }

//     .search-input-container {
//         font-size: 1.3125em;
//         height: 2.3809em;
//         border-radius: 5em;
//         background: #353942;
//         grid-area: 1/1/1/1;
//     }

//     .more-keywords-btn {
//         width: 4em;
//     }

//     /* Custom Scroll bar */
//     .scroll::-webkit-scrollbar {
//         width: .8em;
//     }

//     .scroll::-webkit-scrollbar-track {
//         background: #22252c;
//         border-radius: 100em;
//     }

//     .scroll::-webkit-scrollbar-thumb {
//         background: var(--clr0);
//         border-radius: 100em;
//     }

//     .scroll::-webkit-scrollbar-thumb:hover {
//         background: linear-gradient(-86deg, rgb(25, 224, 108) 50%, #0c98b9 90%);
//     }

//     .meme-editor {
//         flex-direction: row;
//         align-items: center;
//     }

//     .canvas-container {
//         height: 453px;
//         width: 456px;
//         margin-block-end: 0;
//     }

//     .meme-funcs-container {
//         height: 453px;
//         width: 350px;
//         font-size: 14px;
//     }
// }

// @media (min-width:1080px) {

//     html {
//         font-size: 16px;
//     }

//     .filter-container {
//         font-size: 16px;
//     }

//     .meme-editor {
//         flex-direction: row;
//         justify-content: space-between;
//         align-items: center;
//     }

//     .canvas-container {
//         width: 500px;
//         height: 500px;
//         margin: 0;
//     }

//     .meme-funcs-container {
//         width: 450px;
//         height: 500px;
//         font-size: 15px;
//     }
// }