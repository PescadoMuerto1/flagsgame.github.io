'use strict'
const gQuests = [
    {correctOpt:'JAMAICA', img:'Flag-Jamaica.webp' },
    {correctOpt:'CUBA', img:'Flag-Cuba.webp' },
    {correctOpt:'ETHIOPIA', img:'Flag-Ethiopia.webp' },
    {correctOpt:'FIJI', img:'Flag-Fiji.webp' },
    {correctOpt:'ANGOLA', img:'Flag-Angola.webp' },
    {correctOpt:'LEBANON', img:'Flag-Lebanon.webp' },
    {correctOpt:'KENYA', img:'Flag-Kenya.webp' },
    {correctOpt:'MOZAMBIQUE', img:'Flag-Mozambique.webp' },
    {correctOpt:'NEPAL', img:'Flag-Nepal.webp' },
    {correctOpt:'PANAMA', img:'Flag-Panama.webp' }
]

const gOpts = ['LUANDA', 'UGANDA', 'NIGERIA', 'ALGERIA', 'BELARUS', 'ITALY', 'CHAD', 'CYPRUS', 'FINLAND', 'EGYPT', 'ERITREA', 'JORDAN', 'GHANA', 'HAITI', 'HUNGARY', 'GEORGIA', 'KOSOVO', 'BELIZE', 'LAOS', 'MALTA', 'SLOVAKIA', 'TONGA', 'URUGUAY', 'VIETNAM', 'VENEZUELA', 'ZAMBIA', 'SENEGAL', 'SUDAN', 'POLAND', 'MOLDOVA']

var gCurrQuestIdx = 0 
var gCorrectOptIdx
var gClicked = false
var gCorrectCounter = 0

initGame()

function initGame(){
    
    if(gCurrQuestIdx < 10){
        createQuests()
    gClicked = false
    }else{
        renderGameOver()
        gCorrectCounter = 0
        gCurrQuestIdx = 0
        shuffle(gQuests)
    }
}

function createQuests(){
    const currQuest = gQuests[gCurrQuestIdx]
    const currFlagName = currQuest.correctOpt
    const currFlagImg = currQuest.img
    var opts = []

    for (var i = 0; i < 3; i++) {
    
       opts[i] = gOpts[i]
    }
    shuffle(gOpts)
     gCorrectOptIdx = getRandomInt(0,4)

     opts.splice(gCorrectOptIdx, 0,currFlagName)
    
    renderGame()
    renderQuest(opts,currFlagImg,gCurrQuestIdx)
    gCurrQuestIdx++

    return opts
}

function renderGame(){
    const box = document.querySelector('.box')
    
    box.innerHTML = `<div class="img-container"></div><div class="btn-container"></div><button class="next-btn" onclick="initGame()">Next</button>`
}
function renderQuest(opts,img, currQues){
    
        
        var btnHtml = ''
        document.querySelector('.next-btn').style.display = ('none')

        for (var i = 0; i < opts.length; i++) {
            btnHtml += `<button class="btn" onclick="checkAnswer(this,'${i}')">${opts[i]}</button>`    
        }
        
        document.querySelector('.top-count').innerText = `${currQues + 1} of 10`

        const imgHtml = `<img src="img/${img}" alt="pic">`

        const btnContainer = document.querySelector('.btn-container')
        const flagImg = document.querySelector('.img-container')
        flagImg.innerHTML = imgHtml
        btnContainer.innerHTML = btnHtml
    
}


function checkAnswer(elBtn,optIdx){
    if(!gClicked){
        elBtn.style.opacity = '100%'
        if(optIdx == gCorrectOptIdx){
        elBtn.style.color = 'green'
        elBtn.style.border = '2px solid green'
        gCorrectCounter ++
        }else{
        elBtn.style.color = 'rgba(201, 7, 7, 0.685)'
        elBtn.style.border = '2px solid rgba(201, 7, 7, 0.685)'
        }
        document.querySelector('.next-btn').style.display = ('block')
        gClicked = true
        console.log(gCorrectCounter);
    }
}

function renderGameOver(){

    const box = document.querySelector('.box')

    box.innerHTML = `<div class="win"><h1>good jub!!!</h1><h2>you got ${gCorrectCounter}
    out of 10 questions correct!</h2></div><button class="play-again"onclick="initGame()">PlayAgain</button>`

     
}

function shuffle(items) {
    for (var i = items.length - 1; i > 0; i--) {
        var randIdx = getRandomInt(0, i + 1);
        var keep = items[i];
        items[i] = items[randIdx];
        items[randIdx] = keep;
    }
    return items;
}


function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min
}

