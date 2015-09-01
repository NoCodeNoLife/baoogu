// JavaScript Document
function getStyle(obj,name){
	return (obj.currentStyle || getComputedStyle(obj,false))[name];	
};

function move(obj,json,options){
	options=options||{};
	options.time=options.time||500;
	options.type=options.type||"ease-out";	
	var dis={};
	var start={};
	for(var name in json){
		if(name=='opacity'){
			start[name]=parseFloat(getStyle(obj,name));	
		}else{
			start[name]=parseInt(getStyle(obj,name));	
		}
		if(isNaN(start[name])){
			switch(name){
				case "left":
					start[name]=obj.offsetLeft;
					break;
				case "top":
					start[name]=obj.offsetTop;
					break;
				case "width":
					start[name]=obj.offsetWidth;
					break;
				case "height":
					start[name]=obj.offsethieght;
					break;	
			}	
		}
		dis[name]=json[name]-start[name];
	}
	var n=0;
	var count=Math.round(options.time/30);
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		n++;
		for(var name in json){
			switch(options.type){
				case "linaer":
					var cur=start[name]+dis[name]*n/count;
					break;
				case "ease-in":
					var a=n/count;
					var cur=start[name]+dis[name]*a*a*a;
					break;
				case "ease-out":
					var a=1-n/count;
					var cur=start[name]+dis[name]*(1-a*a*a);
					break;	
			}	
			if(name=='opacity'){
				obj.style.opacity=cur;
				obj.style.filter="alpha(opacity:"+cur*100+")";	
			}else{
				obj.style[name]=cur+"px";	
			}
		}
		
		if(n==count){
			clearInterval(obj.timer);	
			options.fn&&options.fn();
		}	
	},30);
};