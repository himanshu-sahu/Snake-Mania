let inputDir = {x:0,y:0};
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');
const sell = document.querySelector("#sel");
const res = document.querySelector("#res");

// res.addEventListener('click',function () {
//     alert("High Score Reset ")
//     localStorage.clear();
//     HighSoreBoard.innerHTML = "HighScore : 0";

// })

// function fn1() {
//     var rad1 = document.getElementById("rad1");
//     var rad2 = document.getElementById("rad2");
//     if(rad1.checked == true){
//         musicSound.play();
//     }if(rad2.checked ==true){
//         musicSound.pause();
//     }
// }
let speed=10;
sell.addEventListener('change', function() {
    speed=parseInt(this.value);
  
})



let score =0 ;
let lastPaintTime=0;
let snakeArr=[
    {x:13,y:15}
]
food ={x:6,y:9}

function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000< 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}


function isCollide(snakeArr) {
    for(let i =1;i<snakeArr.length;i++){
        if(snakeArr[i].x==snakeArr[0].x && snakeArr[i].y==snakeArr[0].y){
            return true;
        }
    }
    if(snakeArr[0].x > 18 || snakeArr[0].x <=0 || snakeArr[0].y > 18 || snakeArr[0].y <=0){
        return true;
    }
}
function gameEngine(){

    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir ={x:0,y:0};
        alert("Game Over ! Press Ok to Restart.");
        snakeArr=[
            {x:13,y:15}
        ]
        score=0;
        ScoreBoard.innerHTML = "Score : "+score;
    }

    //If snake have Eaten the food

    if(snakeArr[0].x===food.x  && snakeArr[0].y===food.y){
        foodSound.play();
        score+=1;
        ScoreBoard.innerHTML="Score : "+score;
        if(score>highscore){
            highscoreval = score;
            localStorage.setItem("highscore",JSON.stringify(highscoreval));
            HighSoreBoard.innerHTML = "HighScore : "+highscoreval;
        }
        snakeArr.unshift({x:snakeArr[0].x + inputDir.x,y:snakeArr[0].y + inputDir.y});
        
        let a = 2;
        let b = 16;
        food= { x : Math.round(a + (b-a)*Math.random()),y : Math.round(a + (b-a)*Math.random())}

        }

        //Moving The Snake
        for(let i = snakeArr.length-2;i>=0;i--){
            snakeArr[i+1]={...snakeArr[i]};
            
        }


        snakeArr[0].x+=inputDir.x;
        snakeArr[0].y+=inputDir.y;


//I will Write it Later    
    board.innerHTML = "";
    snakeArr.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index===0){
            snakeElement.classList.add('head');
        }else{
            snakeElement.classList.add('snake');

        }
        board.appendChild(snakeElement);

    });
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;    
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

let highscore = localStorage.getItem("highscore");
if(highscore === null){
    highscoreval = 0;
    localStorage.setItem("highscore",JSON.stringify(highscoreval));
}
else{
    highscoreval = JSON.parse(highscore);
    HighSoreBoard.innerHTML = "HighScore : "+highscore;
}
window.requestAnimationFrame(main);

window.addEventListener('keydown',e =>{
    inputDir = {x:0,y:1};
    moveSound.play();

    switch(e.key){
        case "ArrowUp" : 
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown" : 
            console.log("ArrowDowm");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowRight" : 
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        case "ArrowLeft" : 
            console.log("Left");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

            default : break;

    }

})
window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);
// window.addEventListener("p")

// reset.addEventListener(onclick,
//     localStorage.clear()
//     // HighSoreBoard.innerHTML = "HighScore : 0";
//    );