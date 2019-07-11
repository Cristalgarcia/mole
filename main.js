const holes = document.querySelectorAll(".hole") // tomar elementos por clase
const moles = document.querySelectorAll(".mole")
const scoreBoard = document.querySelector(".score")
let lastHole
let score // variable auxiliar
let timeUp // indica cuando un topo esta arriba

function randomTime(min, max){
 return Math.round(Math.random() * (max - min) + min)
}

function randomeHole(holes){
    const idx = Math.floor(Math.random() * holes.length)
    const hole = holes[idx]
    if(hole === lastHole){
        return randomeHole(holes)
    }
    lastHole = hole
    return hole
}

function peep(){
    const time = randomTime(500, 1000)
    const hole = randomeHole(holes)
    hole.classList.add("up")
    setTimeout(function(){
        hole.classList.remove("up")
        if (!timeUp) peep()  // si el topo no está arriba saca otro topo
    }, time)
}

function startGame(){
    scoreBoard.textContent = 0
    timeUp = false
    score = 0
    peep()
    setTimeout(() => timeUp = true, 20000) // que este apareciendo y desapareciendo 
}

function bonk(e){
if (!e.isTrusted) retunr // tramposo
score++
this.parentNode.classList.remove("up")
scoreBoard.textContent = score
}

moles.forEach(mole => mole.addEventListener("click", bonk)) // por cada click ejecuta la función bonk 

