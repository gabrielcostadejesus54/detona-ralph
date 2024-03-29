const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector('.enemy'),
        timeLeft: document.querySelector('#time-left'),
        score: document.querySelector('#score')
    },
    values: {
        timerId: null,
        gameVelocity: {
            easy: 1000,
            medium: 750,
            hard: 500,
            veryHard: 250
        },
        hitPosition: 0,
        result: 0,
        curretTime: 60,
        stop: false
      
        
    },
    actions: {
        countDownTimerId: setInterval(countDown, 1000),
        timerId: setInterval(randomSquare, 1000)   //easy 1000 //medium 750 //hard 500 // very hard 250
    }
}

function countDown(){
    state.values.curretTime --
    state.view.timeLeft.textContent = state.values.curretTime

    if(state.values.curretTime <= 0){
        clearInterval(state.actions.countDownTimerId)
        clearInterval(state.actions.timerId)
        alert("Acabou o Tempo! O seu resultado foi: " + state.values.result)
       

    }  
}

function randomSquare(){
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy")
    })

    let randomNumber = Math.floor(Math.random() * 9)
    let randomSquare = state.view.squares[randomNumber]
    randomSquare.classList.add('enemy')
    state.values.hitPosition = randomSquare.id
}


function addListenerHitBox(){
    state.view.squares.forEach((square) => {
        square.addEventListener('mousedown', () => {
           if(square.id === state.values.hitPosition) {
                state.values.result++
                state.view.score.textContent = state.values.result
                state.values.hitPosition = null;
                playSound('hit')
           }
        })
    })
}

function playSound(audioName){
    let audio = new Audio(`./src/audios/${audioName}.m4a`)
    audio.volume = 0.2;
    audio.play()
}

function init(){
    
    addListenerHitBox()
}

init()


