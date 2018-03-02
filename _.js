var _ = function(_){
	return new Bas(_);
}
function Bas(_th){
	this.doms = [];
	this.cho(_th);
}
Bas.prototype = {
	/*dom元素获取*/
	cho:function(_th){
		if(typeof _th == "object"){
			this.doms.push(_th);
		}else if(typeof _th == "string") {
			var doms  = document.querySelectorAll(_th);
			for(var i=0;i<doms.length;i++){
				this.doms.push(doms[i]);
			}
		}
	},
	/*事件添加*/
	on:function(on,fn){
		for(var i=0;i<this.doms.length;i++){
			this.doms[i]['on'+on] = fn;
		}
		return this;
	},
	/*样式设置
		设置
			常规写法marign,'20px',
			对象写法：
			{
				margin:"20px"
				width:'300px'
			}
		获取：
			margin
	*/
	css:function(sey,val){
		if(typeof sey == 'object'){
			for(var i=0;i<this.doms.length;i++){
				for (var key in obj) {
					this.doms[i].style.transition = key + " " + t +'s';
					this.doms[i].style[key] = obj[key];
				}
			}
		}else{
			/*传入val 就是Set*/
			if(val){
				for(var i=0;i<this.doms.length;i++){
					this.doms[i].style[sey] = val;
				}
			}else {
				/*get*/
				return this.getSty(this.doms[0],sey);
			}
		}
		return this;
	},
	/*获取dom样式*/
	getSty:function(obj,sey){
		if(window.getComputedStyle){
			/*非IE浏览器*/
			return window.getComputedStyle(obj,null)[sey];
		}else {
			/*IE浏览器*/
			return obj.currentStyle[sey];
		}	
	},
	/*动画*/
	/*
		{
			
		}
		t:动画过度时间
	*/
	animation:function(obj,t){
		/*默认为1秒*/
		var t = t || 1;
		var style = '';
		for(var i=0;i<this.doms.length;i++){
			for (var key in obj) {
				style += key + " " + t +'s,';
				this.doms[i].style[key] = obj[key];
			}
			/*去除最后一个,*/
			this.doms[i].style.transition = this.slice(style,style.length -1);
		}
		return this;
	},
	/*删除指定索引位置的字符串*/
	slice:function(str,index){
		var s ='';
		for(var i=0;i<str.length;i++){
			if(i == index)
			continue;
			s += str.charAt(i); 
		}
		return s;
	},
	/*放回指定的dom的索引*/
	/*index:function(nub){
		return ;
	},*/
	eq:function(nub){
		var nub = nub || 0;
		var dom = this.doms[nub];
		this.doms = [];
		this.doms.push(dom);
		return this;
	},
	/*滑动动画 切换
		dire控制滑动的方向
	*/
	slideToggle:function(dire){
		var dire = dire || 0;
		for(var i=0;i<this.doms.length;i++){
			if(!this.doms[i].MAXHEIGTH){
				this.doms[i].MAXHEIGTH = this.getSty(this.doms[i],'height');
				this.doms[i].MAXWIDTH = this.getSty(this.doms[i],'width');
			}
			if(dire){
				var val = (parseInt(this.getSty(this.doms[i],'width')) == 0) ? this.doms[i].MAXWIDTH : 0;
				this.animation({'width':val});
			}else {
				var val = (parseInt(this.getSty(this.doms[i],'height')) == 0) ? this.doms[i].MAXHEIGTH : 0;
				this.animation({'height':val});
			}
		}
		return this;
	},
	/*轮播
		属性：
			imgSrc:图片路径          必填
			href:超链接              必填  与传入图片路径个数相等    
			autoMs:自动播放时间       可选 默认为2秒
			ms:控制移动的速度         可选  
			on：自定义事件            可选
			btnCurrColoe:按钮切换颜色 可选  默认为#ccc 
			btnColor:按钮颜色         可选  默认为#fafafa
			autoPaly:是否开启自动播放  可选  默认为开启
	*/
	banner:function(obj){
		var th = this;
		for(var i=0;i<this.doms.length;i++){
			var obj = obj;
				obj.banner = this.doms[i];
			new Box(obj);
		}
	},
	/*子节点选取*/
	children:function(chilDom){
		var doms = [];
		for(var i=0;i<this.doms.length;i++){
			var domss = this.doms[i].children;
			/*不传入就选取说有的子节点*/
			if(!chilDom){
				for(var k=0;k<domss.length;k++){
					doms.push(domss[k]);
				}
			}else {
				var s = chilDom.charAt(0);
				switch (s) {
					case '.':
						/*子类*/
						for(var k =0;k<domss.length;i++){
							if(domss[k].className == chilDom.slice(1)){
								doms.push(domss[k]);
							}
						} 
						break;
					case '#':
						/*子id*/
						for(var k =0;k<domss.length;i++){
							if(domss[k].id == chilDom.slice(1)){
								doms.push(domss[k]);
							}
						} 
						break;
					default:
						/*指定子节点*/
						for(var k=0;k<domss.length;k++){
							if(domss[k].tagName == chilDom){
								doms.push(domss[k]);
							}
						}
						break;
				}
			}
		}
		this.doms = doms;
		return this;
	},
	/*获取元素的第一个子节点*/
	firstChild:function(){
		var doms = [];
		doms.push(this.doms[0]);
		this.doms = doms;
		return this;
	},
	/*获取元素的最后一个子节点*/
	lastChild:function(){
		var doms = [];
		doms.push(this.doms[this.doms.length - 1]);
		this.doms = doms;
		return this;
	},
	/*节点自定义属性添加*/
	attr:function(){

	}
}
/*
	banner:banner           必填
	imgSrc:图片路径          必填
	href:超链接              必填  与传入图片路径个数相等    
	autoMs:自动播放时间       可选 默认为2秒
	ms:控制移动的速度         可选  
	on：自定义事件            可选
	btnCurrColoe:按钮切换颜色 可选  默认为#ccc 
	btnColor:按钮颜色         可选  默认为#fafafa
	autoPaly:是否开启自动播放  可选  默认为开启
 */
function Box(obj){
	/*banner*/
	this.banner = obj.banner;
	/*移动的对象*/
	this.where = null;   
	/*点击按钮*/
	this.btns = [];
	this.time = null; 
	/*图片超链接*/
	this.href = obj.href;
	/*目标位移*/
	this.dist = null;  
	/*按钮切换颜色  可选*/
	this.btnCurrColoe = (obj.btnCurrColoe)?
				    (obj.btnCurrColoe):
				    "#ccc"; 
	/*按钮的颜色*/
	this.btnColor = (obj.btnColor)?
				         (obj.btnColor):
				         "#fafafa";
	/*控制移动的速度*/
	this.ms = (obj.ms)?
			  (obj.ms):
			  10;
	/*每次运动的速度*/
	this.speed = null;  //每次运动的速度 
	/*用于屏蔽多次点击*/
	this.moving = 0; 
	/*用于自动播放 */   
	this.index = 1;  
	/*banner图片路径  */  
	this.imgSrc = obj.imgSrc;  
	/*自动添加图片*/
	this.autoImg();  
	/*获取偏移量对象*/ 
	this.Banners = this.where.getElementsByTagName("img")[0];
	/*this.autoMs:自动播放的秒数  默认为2秒*/
	this.autoMs = (obj.autoMs)?
				  (obj.autoMs * 1000):
				  2000;
	/*自动播放定时器*/
	this.autoTime = null;
	/* 点击事件添加*/
	this.addClick();
	/*默认开启自动播放 */
	if(obj.autoPaly!=false){  // 
		this.autoPaly();
	}
	/*自定义事件*/
	if(obj.on){
		this.on = obj.on;
		this.on(this);
	}
}
/*运动速度计算*/
Box.prototype.calcSpeed = function(dist){
	/*获得运动开始前的位置*/
	this.start = parseInt(this.where.offsetLeft);
	/*获得传入的每次运动的距离*/
	this.dist = dist;
	/*获得没得运动的速度*/
	this.speed = (this.dist-this.start)/this.ms;
}
/*移动动画*/
Box.prototype.animate = function(){
	if(this.start == this.dist) return;
	if(!this.moving){
		this.moving = 1;
		/*获取每次运动的位置*/
		this.currPlace = this.where.offsetLeft;
		clearInterval(this.time);
		var th = this;
		this.time = setInterval(function(){
			th.currPlace += th.speed;
			if(th.start > th.dist){
				/*当开始位置大于运动的位置时*/
				if(th.currPlace <= th.dist){
					th.where.style.left = th.dist + 'px';
					clearInterval(th.time);
					th.moving = 0;
					return;
				}
			}else{
				/*当开始位置小于运动的位置时*/
				if(th.currPlace >= th.dist){
					th.where.style.left = th.dist + 'px';
					clearInterval(th.time);
					th.moving = 0;
					return;
				}
			}
			th.where.style.left = th.currPlace + "px";
		},40);
	}
}
/*每次点击*/
Box.prototype.click = function(dist){
	this.calcSpeed(dist);
	this.animate();
}
/*按钮点击事件添加*/
Box.prototype.addClick = function(){
	for(var i=0;i<this.btns.length;i++){
		var th = this;
		this.btns[i].index = i;
		this.btns[i].onclick = function(){
				clearInterval(th.autoTime);
				th.forFn(this.index);			
			}
	}
}
/*每运动索引对应*/
Box.prototype.forFn = function(btn){
	for(var i=0;i<this.btns.length;i++){
			this.btns[i].style.background = this.btnColor;
		}
	this.index = btn;
	this.btns[btn].style.background = this.btnCurrColoe;
	var dist = -this.index * this.Banners.offsetWidth;
	this.click(dist);
}
/*自动播放函数*/
Box.prototype.autoPaly = function(){
	var th = this;
	this.autoTime = setInterval(function(){
		if(th.index>=th.btns.length){
			th.index = 0;
		}
		th.forFn(th.index);
		th.index++;
	},this.autoMs);
}
/*关闭自动播放*/
Box.prototype.Del = function(){
	clearInterval(this.autoTime);
}
/*元素创建*/
Box.prototype.autoImg = function(){
	var tab = [];
	var width = parseInt(1/this.imgSrc.length*100) + "%";
	var tabBtn = document.createElement("ul");
		tabBtn.style = "position: absolute;"+
						"left:0;"+
						"bottom: 0;"+
						"height: 5%;" +
						"width:100%;"+
						"text-aling:center;"+
						"z-index:999;";
	tab.push(tabBtn);
	var tabBanner = document.createElement("ul");
		tabBanner.style = "width:" + this.imgSrc.length * 100 + "%;"+
						"height:100%;"+
						"position: relative;"+
						"top:0;"+
						"left: 0;"+
						"overflow:hidden;";
	/*得到移动的元素*/
	this.where = tabBanner;
	tab.push(tabBanner);
	/*元素插入*/
	for(var i=0;i<tab.length;i++){
		this.banner.appendChild(tab[i]);
	}
	/*设置btn样式*/
	var sty = "margin: 0;"+
		      "padding: 0;"+
			  "display: inline-block;"+
	          "font-size: 0;"+
	          "height: 50%;"+
              "width:"+ 1/this.imgSrc.length*100 +"%;"+
	          "border: 0;"+
	          "position: relative;"+
			  "top:50%;";
			  // "bottom: 0;";
	/*图片样式*/
	var imgSty = "width:" + width + ";"+
				 "height:auto;"+
				 "float:left;" +
				 "position:relative;"+
				 "top:0;"+
				 "left: 0;";
	/*根据传入的图片路径来创建对应的元素*/
	for(var i=0;i<this.imgSrc.length;i++){
		var btn = document.createElement("button");
			btn.style = sty;
		var a = document.createElement("a");
			a.href = this.href[i];
		var img = new Image();
			img.src = this.imgSrc[i];
			img.style = imgSty;
		a.appendChild(img);
		this.where.appendChild(a);
		tabBtn.appendChild(btn);
		/*获取切换按钮*/
		this.btns.push(btn);
	}
	this.btns[0].style.background = this.btnCurrColoe;
}