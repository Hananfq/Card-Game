
//--------------------------------------------------------------------------------------------------------------------------

// variable

//--------------------------------------------------------------------------------------------------------------------------
let deck = document.querySelector("#deck");
let cards = Array.from(deck.children);
let heart= Array.from(document.getElementsByClassName('bi-heart-fill'));
let moves = document.getElementById("moves");
let restart= document.querySelector('#restart');
let timer= document.getElementById("timer");
let time=0;
let timerId=0;
let timerOut= true;
let hasFlipped= false;
let lockCard= false;
let card1, card2;
let count=0;
let newCards


//--------------------------------------------------------------------------------------------------------------------------

//functions

//--------------------------------------------------------------------------------------------------------------------------

function flip(){
    if (lockCard) return;
    if (this=== card1) return;
    timerSet();
    this.classList.add('open');
    counter();
    console.log('open');
 if (!hasFlipped){
    hasFlipped=true;
    card1=this;
 }else{
    hasFlipped=false;
    card2=this;
    console.log(card1.dataset.framework);
    console.log(card2.dataset.framework);
    chick();
    
    
 }
   
}

//--------------------------------------------------------------------------------------

const timerCount= ()=> {
let min= Math.floor(time/60);
let sec= time % 60;
if (sec<10){
    timer.innerHTML= `${min}:0${sec}`;
}else{
    timer.innerHTML= `${min}:${sec}`;
}

}

//-------------------------------------------------------------------------------------

const initClock = () =>{
timerOut= false;
timerId= setInterval(() => {
    time++;
    timerCount();
}, 1000);
}

//-------------------------------------------------------------------------------------
const timerSet= ()=>{
    if (timerOut){
        initClock();}
}

//-------------------------------------------------------------------------------------
 
function heartCount(){
    console.log("hearts=" +heart.length)
    if(count>=16 && count<=23){
        for(i=0; i<3;i++){
          if (i>1){
            heart[i].style.visibility= "collapse";
}
        }
   
    }else if (count>=24){
    for(i=0; i<3;i++){
        if (i>0){   
          heart[i].style.visibility= "collapse";
}
 } }}

 //-------------------------------------------------------------------------------------

function counter(){
    count++;
    console.log(count);
    moves.innerHTML = `${count} moves`;
    heartCount(); 
}

//---------------------------------------------------------------------------------------

function match(){
    card1.removeEventListener('click', flip );
    card2.removeEventListener('click', flip );
    card1.classList.add('match');
    card2.classList.add('match');
    console.log("match found");  
    resetCards();
}

//---------------------------------------------------------------------------------------

function nomatch(){
    lockCard= true;
    setTimeout(()=>{
    card1.classList.remove('open');
    card2.classList.remove('open');
    console.log("no match found");
    card1='';
    card2='';
    lockCard= false;
    resetCards();
    cardsOrder();
}
    ,1500)
}

//---------------------------------------------------------------------------------------

function resetCards(){
    [hasFlipped, lockCard]= [false, false];
    [card1,card2]= [null,null]
}

//---------------------------------------------------------------------------------------

function chick(){
    if (card1.dataset.framework=== card2.dataset.framework){
        match();
    }else{
        nomatch();
      
    }
}

//---------------------------------------------------------------------------------------

function cardsOrder(){
   var shuffledCards = shuffle(cards);
   for (var i= 0; i < shuffledCards.length; i++){
      [].forEach.call(shuffledCards, function(item){
         deck.appendChild(item);
      });
   }
}

//-------------------------------------------------------------------------------------

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex]= temporaryValue;
    }

    return array;
}

//--------------------------------------------------------------------------------------------------------------------------

// event listener

//--------------------------------------------------------------------------------------------------------------------------

cards.forEach(cards=> {
    cards.addEventListener('click', flip );
});

restart.addEventListener("click", function(){

    window.location.reload();
    cardsOrder();

    
    
})

window.onload = cardsOrder();

