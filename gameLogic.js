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
 

var gameWidth = 920;
var gameHeight = 320; 

var bgDrawX1 = 0;
var bgDrawX2 = 2760; //2760
var btnPlay = new Button(265, 535, 220, 335);

//request animation frame
var isPlaying = 'false'; 		//request Animation Frame in the browser
var requestAnimFrame = window.requestAnimationFrame ||
					   window.webkitRequestAnimationFrame ||
					   window.mozRequestAnimationFrame ||
					   window.msRequestAnimationFrame ||
					   window.oRequestAnimationFrame;

var y_limit = 200; 



var background_sprite = new Image();
background_sprite.src = 'gameImg/game_background.png';
background_sprite.addEventListener('load',drawBg,false);

var sprite = new Image();
sprite.src = 'gameImg/sprite.png';
sprite.addEventListener('load',init,false);

var obstacles = []; 
var bowties = []; 
var obstacle_amount = 3;
var bowtie_amount = 2; 
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
	//event listener for click
	document.addEventListener('click',mouseClicked, false);
	//event listeners for keys
	document.addEventListener('keydown',checkKeyDown,false);
	document.addEventListener('keyup',checkKeyUp,false);

}

function playGame() {
    startLoop();
    updateHUD();
    document.addEventListener('keydown', checkKeyDown, false);
    document.addEventListener('keyup', checkKeyUp, false);
}



function loop(){

	if(isPlaying){
		drawMenu(); 
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

function drawMenu() {
    ctx_Bg.drawImage(sprite, 0, 0, gameWidth, gameHeight, 0, 0, gameWidth, gameHeight);
}
function drawWinScreen() {
    ctx_Bg.drawImage(sprite, 0, 320, gameWidth, gameHeight, 0, 0, gameWidth, gameHeight);
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
	bgDrawX1 -= 0.75;
	bgDrawX2 -= 0.75; 
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

	  	if(object.isHelmet) {
	  		console.log('hit knight head')
			changeForm(geek,object);	
	  	}

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
	if(geek1.lives == 0 ){
		//FIX THIS BULLSHIT
		stopLoop();
		clear_ctx_Bg();
		ctx_bowtie.clearRect(0,0,gameWidth,gameHeight);
		clear_ctx_geek();
		clear_ctx_obstacle();
		drawWinScreen();
	}
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

function changeForm(geek1, obstacle){
	if(obstacle.isHelmet == true && geek1.knightForm == false){	
		geek1.srcX = 350; // GIVE
		geek1.srcY = 660; // GIVE
		return geek1.knightForm = true;
	}
}

function Geek(){
	this.srcX = 98; 
	this.srcY = 655; 
	this.width = 45; 
	this.height = 70;
	this.speed = 1; //3 pixels every draw cycle 
	this.drawX = 150;
	this.drawY = 240; 
	this.isSpaceBar = false;
	this.isLeftKey = false;
	this.isRightKey = false;
	this.score = 0; 
	this.lives = 5; //lives -1 if hits a obstacle

	//hitbox coordinates 
	this.leftX = this.drawX;
	this.rightX = this.drawX + this.width;
	this.topY = this.drawY;
	this.bottomY = this.drawY + this.height;
	this.hasHit = false;
	this.knightForm = false;
}

Geek.prototype.draw = function(){
 	clear_ctx_geek();
 	this.updateCoors();
 	this.checkKeys();
	
	ctx_geek.drawImage(
		sprite,
		this.srcX,
		this.srcY,
		this.width,
		this.height,
		this.drawX,
		this.drawY,
		this.width,
		this.height);
	this.updateCoors();
	 
};

Geek.prototype.updateCoors = function(){
	this.leftX = this.drawX;
	this.rightX = this.drawX + this.width;
	this.topY = this.drawY;
	this.bottomY = this.drawY + this.height;

}

Geek.prototype.checkKeys = function(){
 	
 	if(this.isSpaceBar || this.isRightKey && this.isSpaceBar ||this.isLeftKey && this.isSpaceBar){
		if(!geek1.knightForm){
 			this.srcX = 180; 
 			 
 			this.drawX -= this.speed; // + for hurdling effect
 		}else{
 			this.srcX = 480;

 			this.drawX -= this.speed;
 		}

 		this.jump();
 		this.isSpaceBar = false;
 	}
 	
 	if(this.isLeftKey && this.leftX > 0 ){//this.rightX < gameWidth
 		if(!geek1.knightForm){
 			this.srcX = 303; 
 			 
 			this.drawX -= this.speed; // + for hurdling effect
 		}else{
 			this.srcX = 652;

 			this.drawX -= this.speed;
 		}
 	}
 	if(this.isRightKey && this.rightX < gameWidth){
 		if(!geek1.knightForm){
 			this.srcX = 98;

 			this.drawX += this.speed;
 		}else{
 			this.srcX = 350;
 			
 			this.drawX += this.speed;
 		}
 	}
 	if(this.isUpKey && this.topY > y_limit){
 		
 			this.drawY -= 3; 
 			this.srcX = 180;
 		
 	}
 	if(this.isDownKey && this.bottomY < gameHeight){
 		if(this.drawY < 240){
 			this.drawY += 0.5; 
 		}
 	}
};

Geek.prototype.jump = function() {
	this.updateCoors();
	if(this.bottomY == 310 && this.topY >= y_limit ){
		this.isDownKey = true;
		console.log('jump');
		for(var i = 0; i < 125; i++){
 			if(!geek1.knightForm){
 				this.srcX = 180;
 			 
 				this.drawY -= 0.5; 
 			}else{
 				this.srcX = 480;

 				this.drawY -= 0.5; 
 			}
			console.log('add to drawY');
		}
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
	this.srcX = 719; 
	this.srcY = 653; 
	this.width = 35; 
	this.height = 24;
	this.speed = 2; //1 pixels every draw cycle 
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
	this.updateCoors();
		
		ctx_obstacle.drawImage(
 			sprite,
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
			if(i == obstacles.length-1){
			obstacles[i].srcX = 96;//GIVE
			obstacles[i].srcY = 140;//GIVE 
	
		}
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
	this.srcX = 124; 
	this.srcY = 140; 
	this.width = 24; 
	this.height = 24; 
	this.drawX = 0; //draw at last squirrel update coors
	this.drawY = 0; //draw at last squirrel update coors
	this.currentFrame = 0; 
	this.totalFrames = 5;
}

Poof.prototype.draw = function(){	
	if(this.currentFrame <= this.totalFrames){
		ctx_geek.drawImage(
 			sprite,
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
	this.srcX = 719; 
	this.srcY = 686; 
	this.width = 24; 
	this.height = 24;
	this.drawX = Math.floor(Math.random()*gameWidth) + 1;
										//range of tightness	
	this.drawY = (Math.floor(Math.random()*10) + 1) + 200;  
												// 


	//hitbox coordinates 
	this.isHelmet = false;
	this.hasHit = false;
	this.leftX = this.drawX;
	this.rightX = this.drawX + this.width;
	this.topY = this.drawY;
	this.bottomY = this.drawY + this.height;


}

Bowtie.prototype.draw = function(){
	this.updateCoors();
 	ctx_bowtie.drawImage(
 		sprite,
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
	if(!this.isHelmet){
	geek1.score += 50;
	}else{
	geek1.score += 100; 	
	}
	return this.updateCoors();
	

}

Bowtie.prototype.recycleBowtie = function(){
	this.drawX = Math.floor(Math.random()*gameWidth) + 1;  //this.drawY should matchup
	this.drawY = (Math.floor(Math.random()*10) + 1) + 200;  
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

	var x = Math.floor((Math.random()*(bowties.length-1)));

	for(var i = 0; i < bowties.length; i++){

		// check for hit detection
		checkHit(bowties[i],geek1);

		if(geek1.knightForm == true){
			bowties[i].srcX = 716;
			bowties[i].srcY = 686;  
		}else{
			if(geek1.score >= 500){
		// if NOT knight && if knight head NOT spawned THEN SPAWN KNIGHT HEAD
				if( i === x && !bowties[i].isHelmet){
					bowties[i].srcX = 806;
					bowties[i].srcY = 686;  
					bowties[i].isHelmet = true;
				}
			}
		}
		// insert knight head

		if(bowties[i].hasHit){
			bowties[i].hitAction();
		}

		if(bowties[i].drawX%2 == 0){
			this.srcX; // one bowtie
			this.srcY; // one second bowtie 
			bowties[i].draw();
		} else if (bowties[i].drawX%2 == 0){
			this.srcX;
			this.srcY;
			bowties[i].draw();
		}else{
			this.srcX;
			this.srcY; 
			bowties[i].draw();
		} 
	}
}


/**********************************************
			END OF BOWTIE FUNCTIONS
**********************************************/





/**********************************************
			EVENT FUNCTIONS
**********************************************/

function Button(xL, xR, yT, yB) {
    this.xLeft = xL;
    this.xRight = xR;
    this.yTop = yT;
    this.yBottom = yB;
}

Button.prototype.checkClicked = function() {
    if (this.xLeft <= mouseX && mouseX <= this.xRight && this.yTop <= mouseY && mouseY <= this.yBottom) return true;
};

function mouseClicked(e) {
    mouseX = e.pageX - canvas_Bg.offsetLeft;
    mouseY = e.pageY - canvas_Bg.offsetTop;
    if (!isPlaying) {
        if (btnPlay.checkClicked()) playGame();
    }
}

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
	/*if (keyID === 32){//spacebar
		geek1.isSpaceBar = false; 
		e.preventDefault(); 
	}*/
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