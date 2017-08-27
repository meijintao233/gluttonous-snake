var canvas = document.getElementById('canvas'),
	ctx = canvas.getContext('2d');


//构造对象————圆
function Circle(x,y,r,color){
	this.x = x;
	this.y = y;
	this.r = r;
	this.color = color;
}

//画圆的方法
Circle.prototype.draw = function() {
	ctx.beginPath();
	ctx.fillStyle = this.color;
	ctx.arc(this.x,this.y,this.r,0,Math.PI*2,true);
	ctx.fill();
	ctx.closePath();
}


//构造对象————蛇
function Snake(){
	var snakeArr = [];
	for (var i = 0; i < 10; i++) {
		var circle = new Circle(i*20,0,10,randomColor());
		snakeArr.splice(0,0,circle);
	}
	//set snake head
	var head = snakeArr[0];
	head.color = 'red';
	this.head = snakeArr[0];
	this.snakeArr = snakeArr;
	// init direction
	this.direction = 39;		
}

//画蛇的方法
Snake.prototype.draw = function() {
	for (var i = 0; i < this.snakeArr.length; i++) {
		this.snakeArr[i].draw();
	}
}

//蛇移动的方法
Snake.prototype.move = function() {
	var circle = new Circle(this.head.x,this.head.y,this.head.r,randomColor());
	this.snakeArr.splice(1,0,circle);
	//judge:food have been eaten,not cut the last one
	//else:cut the last one 
	if(isAte()){
		food = new foodShow()
	}else{
		this.snakeArr.pop();
	}
	//set snake move direction,keyboard:37 left,38 up,39 right,40 down
	switch(this.direction){
		case 37:
		this.head.x -= this.head.r*2;
		break;
		
		case 38:
		this.head.y -= this.head.r*2;
		break;
		
		case 39:
		this.head.x += this.head.r*2;
		break;
		
		case 40:
		this.head.y += this.head.r*2;
		break;	
		default:
		break;	
	}
	//judge:game over
	//wall is boom boom ~~~~
	if(this.head.x>canvas.width||this.head.x<0||this.head.y<0||this.head.y>canvas.height){
		clearInterval(timer);
		alert('lose');
	}
	//snake eat itself
		for (var i = 2; i<this.snakeArr.length; i++) {
			if(this.snakeArr[i].x == this.head.x && this.snakeArr[i].y == this.head.y){
				clearInterval(timer);
			}
		}
}

//随机生成函数
function getRandom(min,max){
	var range = max - min ;
	return Math.round(Math.random()*range + min);
}


//随机颜色函数
function randomColor(){
	var color = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'], index, str ='#';
	for (var i = 0; i < 6; i++) {
		index = Math.round(Math.random()*15);
		str += color[index];
	}
	return str;	
}

//食物对象
function foodShow(){
	var isOnSnake = true;
	while(isOnSnake){
		isOnSnake = false;
		var foodX = getRandom(10,canvas.width/20-10);
		var foodY = getRandom(10,canvas.height/20-10);
		var circle = new Circle(foodX*20,foodY*20,10,'green');
		for (var i = 0; i < snake.snakeArr.length; i++) {
			if(snake.snakeArr[i].x == circle.x && snake.snakeArr[i].y == circle.y){
				isOnSnake = true;
				break;
			}
		}	
	}
	return circle;
}


//判断觅食是否成功
function isAte(){
	if(snake.head.x == food.x && snake.head.y == food.y){
		return true;
	}else{
		return false;
	}
}


//初始化————蛇
var snake = new Snake();
snake.draw();

//初始化——————食物
var food = new foodShow();

//定时器
var timer = time();

function time(){
 return	setInterval(() => {
			ctx.clearRect(0,0,canvas.width,canvas.height);
			food.draw();
			snake.move();
			snake.draw();	
			},50);
}


//键盘事件
var flag = true;
document.onkeydown = (e) => {
	if(e.keyCode != 32){
		if(flag){
			switch(e.keyCode){
					case 37:{
						if(snake.direction != 39){
							snake.direction = 37;
						}
						break;
					}
					case 38:{
						if(snake.direction != 40){
							snake.direction = 38;
						}
						break;
					}
					case 39:{
						if(snake.direction != 37){
							snake.direction = 39;
						}
						break;
					}
					case 40:{
						if(snake.direction != 38){
							snake.direction = 40;
						}
						break;
					}
			}
		}
	}else{	
		if(flag){
			clearInterval(timer);
			flag = false;
		}else{
			timer = time();
			flag = true;
		}												
	}	
}
	












