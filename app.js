let state = "pickedNone"
let points = 0;

let imagesState = [];
let generatedNumbers = [];
let currentPokemon = "";
let currentId;

let pokemonsNames = ["pok1", "pok2", "pok3", "pok4", "pok5","pok1","pok2","pok3","pok4","pok5"];

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

// generate imagesState
while(imagesState.length < 10) {
    let generatedNumber = getRandomInt(0,10);
    if (generatedNumbers.find(number => number == generatedNumber) == undefined){
        imagesState.push(pokemonsNames[generatedNumber]);
        generatedNumbers.push(generatedNumber);
    }   
    console.log("while");
}

let images = document.querySelectorAll(".img");
let message = document.querySelector(".message");
let pointsDOM = document.querySelector(".points").firstElementChild;
let confetti = document.querySelector(".run-confetti");

let listener = function(e){
    console.log("clicked!");
    console.log(e.target);
    //let imgDOM =  e.target;
    //let imgURL =  e.target.attributes.src.value;
    let pickedId = e.target.id;
    let pickedPokemon = `${imagesState[pickedId]}`;
    e.target.attributes.src.value = `./img/${pickedPokemon}.png`;
    console.log(pickedId);
    if (state == "pickedNone") {
        currentPokemon =  pickedPokemon
        currentId = pickedId
        state = "pickedOne"
    }
    else if (state == "pickedOne") {
        if (currentPokemon == pickedPokemon && currentId != pickedId){
            console.log("win!");
            message.innerHTML = "WIN! <i class=\"far fa-smile\"></i>"
            points++;
            pointsDOM.innerHTML = `Points: ${points}`;
            // removing listener
            removeListenerAndHover(e, currentId);
            setTimeout(function(){
                e.target.attributes.src.value = `./img/matched.png`;
                document.getElementById(currentId.toString()).attributes.src.value = `./img/matched.png`;
                if (points == 5){
                    confetti.click();
                }
            },1000);
        }
        else{
            console.log("missed!");
            message.innerHTML = "MISSED! <i class=\"far fa-frown\"></i>" 

            setTimeout(function(){
                e.target.attributes.src.value = "./img/pick.png";
                document.getElementById(currentId.toString()).attributes.src.value = `./img/pick.png`;
            }, 1000);
        }
        message.style.display = "block"
        setTimeout(function(){
            message.style.display = "none"
        }, 500);
        state = "pickedNone"
    }

}

for (image of images) {
    image.addEventListener("click",listener);
}

function removeListenerAndHover(e, currentId){
    document.getElementById(currentId.toString()).removeEventListener('click', listener);
    document.getElementById(currentId.toString()).parentNode.removeEventListener('click', listener);
    e.target.removeEventListener('click', listener);
    e.target.parentNode.removeEventListener('click', listener);
    e.target.parentNode.classList.value = "img matched";
    document.getElementById(currentId.toString()).parentNode.classList.value = "img matched";
}


party.confetti(runButton, {
	count: party.variation.range(10, 10),
});
