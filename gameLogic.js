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

var fps = 10; 
var drawInterval; 
var obstacle_amount = 3; 

var y_limit = 200; 



//Sprite
var imgSprite = new Image();
imgSprite.src = 'gameImg/sprite1.png';
imgSprite.addEventListener('load',init,false);

var obstacles = []; 
var geek1; 

/**********************************************
			END OF GLOBAL VARIABLES
**********************************************/




/**********************************************
				MAIN FUNCTIONS
**********************************************/
function init() {
	geek1 = new Geek();
	spawnObstacles(obstacle_amount);
	startDrawing();
	//event listeners for keys
	document.addEventListener('keydown',checkKeyDown,false);
	document.addEventListener('keyup',checkKeyUp,false);

}

function draw(){
	drawBg();
	geek1.draw();
	drawAllObstacles(); 
	//spawn obstacle 
}

function startDrawing(){
	stopDrawing();
	drawInterval = setInterval(draw,fps); 
}

function stopDrawing(){
	clearInterval(drawInterval);
}

// Before scrolling
function drawBg(){
	var srcX = 0; 
	var srcY = 0; 
	var drawX = 0;
	var drawY = 0; 
	ctx_Bg.drawImage(imgSprite,srcX,srcY,gameWidth,gameHeight,drawX,drawY,gameWidth,gameHeight);
}


function clear_ctx_Bg(){
	ctx_Bg.clearRect(0,0,gameWidth,gameHeight); 
}

/**********************************************
			END OF MAIN FUNCTIONS
**********************************************/





/**********************************************
			GEEK FUNCTIONS
**********************************************/
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


}

Geek.prototype.draw = function(){
 	clear_ctx_geek();
 	this.checkKeys();
 	ctx_geek.drawImage(imgSprite,this.srcX,this.srcY,this.width,this.height,this.drawX,this.drawY,this.width,this.height);
};

Geek.prototype.checkKeys = function(){
 	if(this.isSpaceBar){
 		setInterval(function(){geek1.jump()}, 100);
 		setTimeout(function(){ window.clearInterval(int); }, 1000);
 	}
 	if(this.isLeftKey){
 		this.srcX = 0; 
 		this.srcY = 392; //-1
 		this.drawX -= this.speed; // +
 	
 	}
 	if(this.isRightKey){
 		this.srcX = 0;
 		this.srcY = 320;
 		this.drawX += this.speed;
 	
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
	this.speed = 2; //3 pixels every draw cycle 
	this.drawX = Math.floor(Math.random() * 1000) + gameWidth;
	this.drawY = 280; 

}

Obstacle.prototype.draw = function(){
	this.drawX -= this.speed;
 	ctx_obstacle.drawImage(imgSprite,this.srcX,this.srcY,this.width,this.height,this.drawX,this.drawY,this.width,this.height);
 	this.checkEscaped(); 
};

Obstacle.prototype.checkEscaped = function(){
	if(this.drawX + this.width <= 0 ){
		this.recycleObstacle();
	}
}

Obstacle.prototype.recycleObstacle = function(){
	this.drawX = Math.floor(Math.random()*1000) + gameWidth;
	this.drawY = 280; //this.drawY should matchup
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
		obstacles[i].draw();
	}
}


/**********************************************
			END OF OBSTACLE FUNCTIONS
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

/**********************************************
			END OF EVENT FUNCTIONS
**********************************************/























