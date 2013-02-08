// Context Variables
var canvasBg = document.getElementById('canvasBg')
var ctxBG = canvasBg.getContext('2d');git
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
var bgDrawX1 = 0;
var bgDrawX2 = 930;
//Geek boundaries

var topBoundary = ;
var bottomBounday =; 

var scoreLimit = 100; // or var backgroundCounter;  
//var startButton = ; 
var obstacleAmount = 1;
var obstacles = []; 
var isPlaying = false; 

/******************************************/
//request Animation Frame
//var requestAnimFrame = ; 


//Sprite 
//930x320
//133x108
var imgSprite = new Image();
imgSprite.src ='sprite.jpg';  
imgSprite.addEventListener('load', init, false);



//Main Functions 
function init(){
	playGame();
	//drawMenu Function
	//spawn obstacles
} 

function playGame(){
	drawBg();
	//startLoop
	//updateHUD	
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

function dragBg(){
	ctxBg.clearRect(0,0,gameWidth,gameHeight);
	ctxBg.drawImage(imgSprite, 0, 0,930, gameHeight,bgDrawX1,0,930, gameHeight);
	ctxBg.drawImage(imgSprite, 0, 0,930, gameWidth,bgDrawX2,0,930, gameWidth);

}


//Geek Functions

function Geek(){

	this.srcX = ; 
	this.srcY = ; 
	this.width = ; 
	this.height = ;
	//pixels each movement 
	this.speed = ; 
	//initial draw 
	this.drawX = ; 
	this.drawY = ; 

	//hitbox
	this.leftX = this.drawX;
	this.rightX = this.drawX + this.width;
	this.topY = this.drawY;
	this.bottomY = this.drawY + this.height;

	//movement
	this.isLeftKey = false;
	this.isRightKey = false; 
	this.isSpaceBar = false; 
	this.isJumping = false; 

	//HUD 
	this.score = false; 
	this.lives = 1; 

}


 Geek.prototype.draw = function() {
 	clearCtxGeek(); 
 	this.updateCoors();
 	this.checkDirection(); 
 	this.checkJumping(); 
 	ctxGeek.drawImage(imgSprite,this.srcX,this.srcY,this.width,this.height,this.drawX,this.drawY,this.width,this.height);
 };

Geek.prototype.updateCoors = function(){ 
	//hit box resets position here
	this.leftX = this.drawX;
	this.rightX = this.drawX + this.width;
	this.topY = this.drawY;
	this.bottomY = this.drawY + this.height;

}
 
Geek.prototype.checkDirection = function(){

}

Geek.prototype.checkJump = function(){
	//spacebar will be jump
	if(this.isSpaceBar = true && !this.isJumping){
		// have to move hitbox and Geek 
		// jump straight up then return to bottom y boundary.

		this.isJumping = true; 
	}else if (!this.isSpaceBar){
		this.isJumping = false; 
	}
}

function clearCtxGeek(){
	ctxGeek.clearRect(0,0,gameWidth,gameHeight);
}



//Check controls functions 

function checkKeyDown(e){
	var keyID = e.keyCode || e.which;
	//spacebar will be jump
	if (keyID === 32){//spacebar
		geek1.isSpaceBar = true; 
		e.preventDefault(); 
	}
	if(keyID === 37 || keyID === 65){//left
		geek1.isLeftKey = true; 
		e.preventDefault(); 
	}
	if(keyID === 39 || keyID === 68){//right
		geek1.isRightKey = true; 
		e.preventDefault(); 
	}
}

function checkKeyUp (e){
	var keyID = e.keyCode || e.which;
	//spacebar will be jump 
	if (keyID === 32){//spacebar
		geek1.isSpaceBar = false; 
		e.preventDefault(); 
	}
	if(keyID === 37 || keyID === 65){//left
		geek1.isLeftKey = false; 
		e.preventDefault(); 
	}
	if(keyID === 39 || keyID === 68){//right
		geek1.isRightKey = false; 
		e.preventDefault(); 
	}
}

























