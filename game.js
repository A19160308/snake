(function (){
		//记录对象
		var that;
	function Game(map){
		this.food=new Food();
		this.snake=new Snake();
		this.map=map;
		that=this;
	}
	Game.prototype.start=function(){
		//把蛇和食物对象渲染到地图上
		this.food.render(this.map);
		this.snake.render(this.map);
		// 测试
		// this.snake.move();
		// this.snake.render(this.map);
		// this.snake.move();
		// this.snake.render(this.map);
		


		//开始游戏的逻辑
		// 1,让蛇移动,函数写在外面作为私有//4，遇到边界
		run();
		// 2，键盘上下左右控制蛇的方向
		key();	
		//3,遇到食物
		

		

	}
	
	function run( ){
			var timeId=setInterval(function(){
				// this.snake.move();,此时this指向的是window，不能用
				
				that.snake.move();
				
				if(that.snake.body[0].x<0||that.snake.body[0].x>39||that.snake.body[0].y<0||that.snake.body[0].y>29){
					alert('game over');
					clearInterval(timeId);
					//停止
					return;
				}
				//后渲染
				that.snake.render(that.map);
				eat();

			},150);
	}
	function key(){
		document.onkeydown=function(e){
			if(e.keyCode===37&&that.snake.direction!='right'){
				that.snake.direction='left';
			}
			if(e.keyCode===38&&that.snake.direction!='bottom'){
				that.snake.direction='top';
			}
			if(e.keyCode===39&&that.snake.direction!='left'){
				that.snake.direction='right';
			}
			if(e.keyCode===40&&that.snake.direction!='top'){
				that.snake.direction='bottom';
			}
		}
	}
	function eat(){
		var foodx=that.food.x/that.food.width;
		var foody=that.food.y/that.food.height;
		var snakex=that.snake.body[0].x;
		var snakey=that.snake.body[0].y;
		//测试
		// console.log(that.snake.body[0].x);
		// console.log(that.snake.body[0].y);
		// console.log(foodx);
		// console.log(foody);
		if(snakex===foodx && snakey===foody){
			
			that.food.render(map);
			that.snake.body.push({
				x:that.snake.body[that.snake.body.length-1].x,
				y:that.snake.body[that.snake.body.length-1].y,
				color:that.snake.body[that.snake.body.length-1].color
			})

		}
	}
	
	//暴露构造函数给外部
	window.Game=Game;
})()
