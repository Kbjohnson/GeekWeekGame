/**********************************************
			GLOBAL VARIABLES
**********************************************/

var canvas_Bg = document.getElementById('canvas_Bg');
var ctx_Bg = canvas_Bg.getContext('2d'); 
var geek = document.getElementById('geek');
var ctx_geek = geek.getContext('2d'); 
var obstacle = document.getElementById('obstacle');
var ctx_obstacle = obstacle.getContext('2d'); 
var bowtie = document.getElementById('bowtie');
var ctx_bowtie = bowtie.getContext('2d'); 
var lives = document.getElementById('lives');
var ctx_lives = lives.getContext('2d'); 
var score = document.getElementById('score');
var ctx_score = score.getContext('2d'); 
 

var gameWidth = canvas_Bg.width;
var gameHeight = canvas_Bg.height; 

var bgDrawX1 = 0;
var bgDrawX2 = 2760;

//request animation frame
var isPlaying = 'false'; 		//request Animation Frame in the browser
var requestAnimFrame = window.requestAnimationFrame ||
					   window.webkitRequestAnimationFrame ||
					   window.mozRequestAnimationFrame ||
					   window.msRequestAnimationFrame ||
					   window.oRequestAnimationFrame;

var y_limit = 200; 

//Sprite
var imgSprite = new Image();
imgSprite.src = 'gameImg/sprite1.png';
imgSprite.addEventListener('load',init,false);

var background_sprite = new Image();
background_sprite.src = 'gameImg/background_sprite.png';
background_sprite.addEventListener('load',drawBg,false);

var obstacles = []; 
var bowties = []; 
var obstacle_amount = 6;
var bowtie_amount = 6; 
var geek1; 
var poof1 = new Poof(); 

/**********************************************
			END OF GLOBAL VARIABLES
**********************************************/




/**********************************************
				MAIN FUNCTIONS
**********************************************/
function init() {
	geek1 = new Geek();
	spawnObstacles(obstacle_amount);
	spawnBowties(bowtie_amount); 
	startLoop();
	//event listeners for keys
	document.addEventListener('keydown',checkKeyDown,false);
	document.addEventListener('keyup',checkKeyUp,false);

}

function loop(){

	if(isPlaying){
		drawBg();
		moveBg();
		geek1.draw();
		updateScore();
		updateLives();
		drawAllObstacles(); 
		drawAllBowties();
		requestAnimFrame(loop);
	
	}
}

function startLoop(){
	isPlaying = true;
	loop();
}

function stopLoop(){
	isPlaying = false;
}

// Before scrolling
function drawBg(){
	ctx_Bg.clearRect(0,0,gameWidth,gameHeight); 
	ctx_Bg.drawImage(background_sprite,
		0,
		0,
		2760,
		gameHeight,
		bgDrawX1,
		0,
		2760,
		gameHeight);
	ctx_Bg.drawImage(background_sprite,
		0,
		0,
		2760,
		gameHeight,
		bgDrawX2,
		0,
		2760,
		gameHeight);
}

function moveBg (){
	bgDrawX1 -=3;
	bgDrawX2 -=3; 
	if (bgDrawX1 <= -2760){
		bgDrawX1 = 2760;
	}else if (bgDrawX2 <= -2760){
		bgDrawX2 = 2760;
	}
	drawBg();
}
function clear_ctx_Bg(){
	ctx_Bg.clearRect(0,0,gameWidth,gameHeight); 
}

/**********************************************
			END OF MAIN FUNCTIONS
**********************************************/



/**********************************************
			HIT DETECTION FUNCTIONS
**********************************************/

		//checkHit function
		//object is the bowtie or the obstacle, geek, and form is if the geek is knight form or geek form
function checkHit(object,geek){
	if(geek1.hasHit == false){
	if((object.leftX <= geek.rightX &&
	   object.leftX >= geek.leftX &&
	   object.topY >= geek.topY &&
	   object.topY <= geek.bottomY )||
	  (object.rightX <= geek.rightX &&
	   object.rightX >= geek.leftX &&
	   object.topY >= geek.topY &&
	   object.topY <= geek.bottomY)){
	  	console.log('HIT!');
	  	object.hasHit = true; 
	  	return object.hasHit;
	}
		return object.hasHit = false;
	}	
}

function updateScore(){
	ctx_score.clearRect(0,0,gameWidth,gameHeight); 
	ctx_score.fillText('Score: ' + geek1.score, 825, 35); // change this to be in the middle of a div

}
function updateLives(){
	ctx_lives.clearRect(0,0,gameWidth,gameHeight);
	ctx_lives.fillText('Lives left: ' + geek1.lives, 725, 35);
}
/**********************************************
			END HIT DETECTION FUNCTIONS
**********************************************/



/**********************************************
			GEEK FUNCTIONS
**********************************************/

//change form when knight head is hit

function changeForm(){
	if(geek1.knightForm == false){

	}
}

function Geek(){
	this.srcX = 0; 
	this.srcY = 320; 
	this.width = 65; 
	this.height = 70;
	this.speed = 3; //3 pixels every draw cycle 
	this.drawX = 150;
	this.drawY = 240; 
	this.isSpaceBar = false;
	this.isLeftKey = false;
	this.isRightKey = false;
	this.jumpLimit = this.drawY - 40;
	this.score = 0; 
	this.lives = 3; //lives -1 if hits a obstacle
	//hitbox coordinates 
	this.leftX = this.drawX;
	this.rightX = this.drawX + this.width;
	this.topY = this.drawY;
	this.bottomY = this.drawY + this.height;
	this.hasHit = false;
	this.knightForm = true;




}

Geek.prototype.draw = function(){
 	clear_ctx_geek();
 	this.updateCoors();
 	this.checkKeys();
 	ctx_geek.drawImage(
 		imgSprite,
 		this.srcX,
 		this.srcY,
 		this.width,
 		this.height,
 		this.drawX,
 		this.drawY,
 		this.width,
 		this.height);

};

Geek.prototype.updateCoors = function(){
	this.leftX = this.drawX;
	this.rightX = this.drawX + this.width;
	this.topY = this.drawY;
	this.bottomY = this.drawY + this.height;

}

Geek.prototype.checkKeys = function(){
 	/*
 	if(this.isSpaceBar){
 		setInterval(function(){geek1.jump()}, 100);
 		setTimeout(function(){ window.clearInterval(int); }, 1000);
 	}*/
 	
 	if(this.isLeftKey && this.leftX > 0){//this.rightX < gameWidth
 		this.srcX = 0; 
 		this.srcY = 392; //-1
 		this.drawX -= this.speed; // + for hurdling effect
 		
 	}
 	if(this.isRightKey && this.rightX < gameWidth){
 		this.srcX = 0;
 		this.srcY = 320;
 		this.drawX += this.speed;
 	
 	}
 	if(this.isUpKey && this.topY > 0){
 		if(this.drawY > this.jumpLimit){
 			this.drawY -= this.speed; 
 			this.srcX = 0;
	 		this.srcY = 463;
 		}
 	}
 	if(this.isDownKey && this.bottomY < gameHeight){
 		if(this.drawY < 240){
 			this.drawY += this.speed; 
 		}
 	}
};

Geek.prototype.jump = function() {
	console.log('jump limit: ' + this.jumpLimit );

	if(this.drawY > this.jumpLimit ) {
		this.drawY = this.drawY - 1;
 		this.srcX = 0;
 		this.srcY = 463;

 		console.log('drawY: ' + this.drawY );

	} else {
		console.log('clear int');
	}
};



function clear_ctx_geek(){
	ctx_geek.clearRect(0,0,gameWidth,gameHeight); 
}

/**********************************************
			END OF GEEK FUNCTIONS
**********************************************/



/**********************************************
			OBSTACLE FUNCTIONS
**********************************************/

function Obstacle(){
	this.srcX = 0; 
	this.srcY = 548; 
	this.width = 40; 
	this.height = 30;
	this.speed = 1; //1 pixels every draw cycle 
	this.drawX = Math.floor(Math.random() * 1000) + gameWidth;
	this.drawY = 280; 

	//hitbox coordinates
	this.hasHit = false;  
	this.leftX = this.drawX;
	this.rightX = this.drawX + this.width;
	this.topY = this.drawY;
	this.bottomY = this.drawY + this.height;

}


Obstacle.prototype.draw = function(){
	this.drawX -= this.speed;
 	ctx_obstacle.drawImage(
 		imgSprite,
 		this.srcX,
 		this.srcY,
 		this.width,
 		this.height,
 		this.drawX,
 		this.drawY,
 		this.width,
 		this.height);
 	this.checkEscaped(); 
};

Obstacle.prototype.checkEscaped = function(){
	if(this.drawX + this.width <= 0 ){
		this.recycleObstacle();
	}
}

Obstacle.prototype.hitAction = function (){ 
		if(geek1.knightForm){
			poof1.drawX = this.drawX;
			poof1.drawY = this.drawY; 
			this.recycleObstacle();
			poof1.draw();
		}else{
			poof1.drawX = this.drawX;
			poof1.drawY = this.drawY; 
			this.recycleObstacle();
			poof1.draw();
			geek1.lives -= 1; 
			updateLives();
		}
		
}

Obstacle.prototype.recycleObstacle = function(){
	this.drawX = Math.floor(Math.random()*1000) + gameWidth;
	this.drawY = 280; //this.drawY should matchup
}

Obstacle.prototype.updateCoors = function(){
	this.leftX = this.drawX;
	this.rightX = this.drawX + this.width;
	this.topY = this.drawY;
	this.bottomY = this.drawY + this.height;
}


function clear_ctx_obstacle(){
	ctx_obstacle.clearRect(0,0,gameWidth,gameHeight);
};

function spawnObstacles(number){
	for(var i = 0; i < number; i ++){
		obstacles[i] = new Obstacle();
	}
}

function drawAllObstacles(){
	clear_ctx_obstacle(); 
	for(var i = 0; i < obstacles.length; i++){
		obstacles[i].updateCoors();
		checkHit(obstacles[i],geek1);
		if(obstacles[i].hasHit){
			obstacles[i].hitAction();
		}
		obstacles[i].draw();

	}
}


/**********************************************
			END OF OBSTACLE FUNCTIONS
**********************************************/



/**********************************************
			POOF FUNCTIONS
**********************************************/
function Poof(){
	this.srcX = 0; 
	this.srcY = 578; 
	this.width = 40; 
	this.height = 25; 
	this.drawX = 0; //draw at last squirrel update coors
	this.drawY = 0; //draw at last squirrel update coors
	this.currentFrame = 0; 
	this.totalFrames = 5;
}

Poof.prototype.draw = function(){	
	if(this.currentFrame <= this.totalFrames){
		ctx_geek.drawImage(
 			imgSprite,
 			this.srcX,
 			this.srcY,
 			this.width,
 			this.height,
 			this.drawX,
 			this.drawY,
 			this.width,
 			this.height);
		this.currentFrame++;
 	}else{
 		this.hasHit = false;
 		this.currentFrame = 0; 
 	}
};


/**********************************************
			END OF POOF FUNCTIONS
**********************************************/



/**********************************************
			BOWTIE FUNCTIONS
**********************************************/

function Bowtie(){
	this.srcX = 0; 
	this.srcY = 535; 
	this.width = 25; 
	this.height = 12;
	this.drawX = Math.floor(Math.random()*gameWidth) + 1;
										//range of tightness	
	this.drawY = (Math.floor(Math.random()*10) + 1) + 200;  
												// 


	//hitbox coordinates 
	this.hasHit = false;
	this.leftX = this.drawX;
	this.rightX = this.drawX + this.width;
	this.topY = this.drawY;
	this.bottomY = this.drawY + this.height;


}

Bowtie.prototype.draw = function(){
 	ctx_bowtie.drawImage(
 		imgSprite,
 		this.srcX,
 		this.srcY,
 		this.width,
 		this.height,
 		this.drawX,
 		this.drawY,
 		this.width,
 		this.height);
 	
};

Bowtie.prototype.updateCoors = function(){
	this.leftX = this.drawX;
	this.rightX = this.drawX + this.width;
	this.topY = this.drawY;
	this.bottomY = this.drawY + this.height;
}

Bowtie.prototype.hitAction = function(){
	this.recycleBowtie();
	geek1.score += 10;
	return this.updateCoors();
	

}

Bowtie.prototype.recycleBowtie = function(){
	this.drawX = 0;  //this.drawY should matchup
	this.drawY = 0; 
}

function clear_ctx_bowtie(){
	ctx_bowtie.clearRect(0,0,gameWidth,gameHeight);
};

function spawnBowties(number){
	for(var i = 0; i < number; i ++){
		bowties[i] = new Bowtie();
	}
}

function drawAllBowties(){
	clear_ctx_bowtie(); 
	for(var i = 0; i < bowties.length; i++){
		checkHit(bowties[i],geek1);
		if(bowties[i].hasHit){
			bowties[i].hitAction();
		}
		bowties[i].draw();
	}
}


/**********************************************
			END OF BOWTIE FUNCTIONS
**********************************************/





/**********************************************
			EVENT FUNCTIONS
**********************************************/

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
	if(keyID === 38 || keyID === 87){//left
		geek1.isUpKey = true; 
		e.preventDefault(); 
	}
	if(keyID === 40 || keyID === 83){//right
		geek1.isDownKey = true; 
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
	if(keyID === 38 || keyID === 87){//left
		geek1.isUpKey = false; 
		e.preventDefault(); 
	}
	if(keyID === 40 || keyID === 83){//right
		geek1.isDownKey = false; 
		e.preventDefault(); 
	}
}


/**********************************************
			END OF EVENT FUNCTIONS
**********************************************/