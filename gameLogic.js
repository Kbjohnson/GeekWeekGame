// Context Variables
var canvasBg = document.getElementById('canvasBg')
var ctxBG = canvasBg.getContext('2d');
var geek = document.getElementById('geek');
var ctxGeek = geek.getContext('2d');  
var ctxSquirrel = document.getElementById('obstacle').getContext('2d');
var ctxScore = document.getElementById('score').getContext('2d'); 
var ctxLives = document.getElementById('lives').getContext('2d'); 

/*	HUD 
ctxScore.fillStyle =  ;
ctxScore.font = ;   
ctxLives.fillStyle = ; 
ctxLives.fillSytle = ; 
*/


//Global Variables
var gameWidth = canvasBg.width;
var gameHeight = canvasBg.height;
var scoreLimit = 100; // or var backgroundCounter;  
//var startButton = ; 
var obstacleAmount = 1;
var obstacles = []; 
var isPlaying = false; 
//request Animation Frame
//var requestAnimFrame = ; 


//Sprite 
var imgSprite = new Image();
imgSprite.src ='';  
imgSprite.addEventListener('load', init, false);



//Main Functions 
function init(){
	//drawMenu Function
	//spawn obstacles
	//add event listener
} 

function playGame(){
	//drawBg function
	//startLoop
	//updateHUD
	//event listeners 
}

function spawnObstacles(obstacleAmount){
	for (var i = 0; i < obstacles.length; i++) {
		obstacles[obstacles.length].draw(); 
	}
}

function drawAllObstacles(){
	//clear ctx obstacle 
	for (var i = 0 ; i < obstacles.length; i++) {
		obstacles[i].draw();
	}
}

function loop(){

}

//Geek Functions

function Geek(){

}