//自调用函数，全部封装起来，开启了一个新的作用域，避免和其他js文件中的函数命名冲突
(function (){
		//把生成的所有变量放在顶部，方便操作
	var position='absolute';
	//记录上一次创建的食物，为下一次删除做准备
	//首先创建一个数组来存放上一次的食物div标签
	var elements=[];

	//随机生成食物位置
	var Tools={//对象
		//getRandom是tool对象的方法
		getRandom:function(min,max){
			return Math.floor(Math.random()*(max-min+1))+min;
		}
	}
	function Food(options) {
		options=options||{};
		this.x=options.x||0;
		this.y=options.y||0;
		this.width=options.width||20;
		this.height=options.height||20;
		this.color=options.color||'green';
	}

	Food.prototype.render = function(map) {
		//先删除上一个食物
		remove();
		this.x=Tools.getRandom(0,map.offsetWidth/this.width-1)*this.width;
		this.y=Tools.getRandom(0,map.offsetHeight/this.height-1)*this.height;
		var div=document.createElement('div');
		map.appendChild(div);
		elements.push(div);
		div.style.position=position;
		div.style.left=this.x+'px';
		div.style.top=this.y+'px';
		div.style.width=this.width+'px';
		div.style.height=this.height+'px';
		div.style.backgroundColor=this.color;

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
	window.Food=Food;
})()
// var map=document.getElementById('map');
// var food=new Food();
// food.render(map);