(function () {
	var position='absolute';
	var elements=[];
	function Snake(options){
		options=options||{};
		//每一个蛇节
		this.width=options.width||20;
		this.height=options.height||20;
		this.direction=options.direction||'right';
		this.body=[
		{x:35,y:2,color:'red'},
		{x:34,y:2,color:'blue'},
		{x:33,y:2,color:'blue'}
		];


	}
	//渲染
	Snake.prototype.render=function(map){
		remove();
		for(i=0;i<this.body.length;i++){
			//蛇节
			var object=this.body[i];
			var div=document.createElement('div');
			map.appendChild(div);
			elements.push(div);
			//设置样式
			div.style.width=this.width+'px';
			div.style.height=this.height+'px';
			div.style.position=position;
			div.style.left=object.x*this.width+'px';
			div.style.top=object.y*this.height+'px';
			div.style.backgroundColor=object.color;
		}
	}
	//让蛇移动的方法
	Snake.prototype.move=function(){
	


		//蛇身,等于前面一节的坐标
		//！！！头和身子渲染顺序不能变，因为是倒着从最后一节开始走的。
		for(var i=this.body.length-1;i>0;i--){
			this.body[i].x=this.body[i-1].x;
			this.body[i].y=this.body[i-1].y;
		}//蛇头
		var head=this.body[0];
		switch(this.direction){
			case 'right':
		      head.x += 1;
		      break;
			case 'left':
			head.x-=1;
			break;

			case 'top':
			head.y-=1;
			break;
			case 'bottom':
			head.y+=1;
			break;
		}
		
	}
	function remove() {
		//按索引从大到小删除，这样不会改变索引
		for (var i = elements.length - 1; i >= 0; i--) {
			//删除div，因为标签是伪数组，不能直接用数组的删除方法，需要通过父元素的removechild方法删除
			elements[i].parentNode.removeChild(elements[i]);
			//删除数组中元素,从i开始，删除一个
			elements.splice(i,1);
		}
	}
	window.Snake=Snake;

})()
//测试var map=document.getElementById('map');
// var snake=new Snake();
// snake.render(map);
