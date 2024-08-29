
// select Elements
let blocksContainer = document.querySelector(".memory-game-blocks")
let control = document.querySelector(".control")
let allblocks = blocksContainer.children;
let triesSpan = document.querySelector(".tries span")
let nameSpan = document.querySelector(".name span");
let timer = document.querySelector(".timer")
let shuffledBLocks = shuffle(allblocks);
console.log(shuffledBLocks)

document.querySelector(".control-buttons span").addEventListener("click", function(){
    let userName = prompt("write your name");
    if(userName === "" || userName == null){
        document.querySelector(".name span").innerHTML = "unknown"
    }
    else{

        document.querySelector(".name span").innerHTML = userName
    }
    control.remove();
    startTimer(30);

});

// Global variables
let wrongTries = 0;




let orderRange = [...Array(allblocks.length).keys()]
shuffle(orderRange);

Array.from(allblocks).forEach((block,index)=>{
    block.style.order = orderRange[index]
    block.addEventListener("click",function(){
        flipBlock(block);

    })
})

// fuctions

function flipBlock(block){
    block.classList.add("is-flipped");
    let flippedFiltered = Array.from(allblocks).filter((filteredBLock)=>{
        return filteredBLock.classList.contains(`is-flipped`);
    })
    if(flippedFiltered.length == 2 ){
       stopClicking();
        checkFlipped(flippedFiltered[0],flippedFiltered[1])
    }
}

function checkFlipped(blockOne,blockTwo){
    if(blockOne.dataset.technology == blockTwo.dataset.technology){
        blockOne.classList.remove(`is-flipped`)
        blockTwo.classList.remove(`is-flipped`)

        blockOne.classList.add(`has-match`)
        blockTwo.classList.add(`has-match`)
    }
    else{
        wrongTries++;
        triesSpan.innerHTML = parseInt(triesSpan.innerHTML)+1;
        setTimeout(() => {
            blockOne.classList.remove(`is-flipped`)
            blockTwo.classList.remove(`is-flipped`)
        }, 1000);
    }
    
}


function stopClicking(){
    blocksContainer.classList.add("no-clicking")
    setTimeout(() => {
    blocksContainer.classList.remove("no-clicking")
    }, 1000);
}

function shuffle(array){
    for(let i = array.length-1 ; i > 0 ; i--){
        const random = Math.floor(Math.random() * (i+1));
        [array[i],array[random]] = [array[random],array[i]]
    }
    return array;
};

function startTimer(seconds){
  timer.innerHTML = seconds ;
  let countDown =  setInterval(() => {
        seconds--;
        timer.innerHTML = seconds;
        if(seconds == 0){
            clearInterval(countDown);
          endGame(); 
        }
    }, 1000);
}

function endGame(){
    alert("Game Over! Time's up.");
    blocksContainer.style.pointerEvents = "none";
    collectInfo();
    displayTable();
}

function collectInfo(){
    let name = nameSpan.innerHTML;
    if(name != "unknown"){
        let date = new Date().toLocaleString();
        let tries = wrongTries;
        let playerInfo = {date: date, tries: tries}
        localStorage.setItem(name,JSON.stringify(playerInfo)) 
    }

}

function displayTable(){
    let tbody = document.querySelector(".table tbody");
    tbody.innerHTML = "";
    for(let i = 0; i< localStorage.length ; i++){
        let playerName = localStorage.key(i);
        let playerData = JSON.parse(localStorage.getItem(playerName));

        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${playerName}</td>
            <td>${playerData.date}</td>
            <td>${playerData.tries}</td>
        `;
        tbody.appendChild(row);
    }
    
}

// 

