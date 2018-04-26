// 淘宝件1-1 选项卡1
function nav_rt(move,mosuse){
	var rLi = $(mosuse);				//获取到要点击的元素 类数组
	var rDiv = $(move);					//获取到要出现的内容
	$(rDiv[0]).slideDown(500);			//让第一个div出现
	$(rLi[0]).css({borderBottom:"0",background:"#fff"});
	for(var i=0;i<rLi.length;i++){
		rLi[i].dd = i;				//给每个li加一个属性，属性值为i，用来控制当点击li时候对应的div的下标
		$(rLi[i]).on("click",function(){			//创建点击事件
			for(var j=0;j<rLi.length;j++){			//再次循环控制不显示，和li默认的样式
				$(rDiv[j]).css("display","none");				//让div隐藏
				$(rLi[j]).css({border:"",background:""});		//让li的样式默认为css样式表里
			}
			$(this).css({borderBottom:"0",background:"#fff"});		//控制点击的这个li 的边框和背景
			$(rDiv[this.dd]).slideDown(500);					//控制点击某个li时，他的dd属性值就为他对应的下标，也就是对应的div下标。让div 以slideDown()方法出现;
		});
	}
};
// 淘宝件1-1 选项卡2
function dtbj1(move,mosuse){
	var rLi = $(mosuse);				//获取到要点击的元素 类数组
	var rDiv = $(move);					//获取到要出现的内容
	$(rLi[0]).css({border:"2px solid #379cf1",borderBottom:"0"});
	$(rDiv[1]).css("display","none");			//让第一个div出现
	for(var i=0;i<rLi.length;i++){
		rLi[i].dd = i;				//给每个li加一个属性，属性值为i，用来控制当点击li时候对应的div的下标
		$(rLi[i]).on("click",function(){			//创建点击事件
			for(var j=0;j<rLi.length;j++){			//再次循环控制不显示，和li默认的样式
				$(rDiv[j]).css("display","none");				//让div隐藏
				$(rLi[j]).css({border:""});		//让li的样式默认为css样式表里
			}
			$(this).css({border:"2px solid #379cf1",borderBottom:"0"});		//控制点击的这个li 的边框和背景
			$(rDiv[this.dd]).show();					//控制点击某个li时，他的dd属性值就为他对应的下标，也就是对应的div下标。让div 以slideDown()方法出现;
		});
	}
};
window.onload=function(){
	var cityarr=["北京市","天津市","上海市","重庆市","河北省","山西省","陕西省","山东省","河南省","辽宁省","吉林省","黑龙江省","江苏省","浙江省","安徽省","江西省","福建省","湖北省",
	"湖南省","四川省","贵州省","云南省","广东省","海南省","甘肃省","青海省","台湾省","内蒙古自治区","新疆维吾尔自治区","西藏自治区","广西壮族自治区","宁夏回族自治区","香港特别行政区","澳门特别行政区"];
	for(var i=0;i<cityarr.length;i++){
		$(".city ul").append("<li>"+cityarr[i]+"</li>");//循环输出城市名
	}
	$(".city ul").append("<li><u>确定</u></li>");
	$(".top-center p span").click(function(e){
        if (e.stopPropagation) {
            e.stopPropagation();
        }else{
            e.cancelBubble=true;
        }
		$(".top .city").show();//显示切换城市
	});
	$(".top .city").click(function(e){//避免点击城市div事件冒泡
        if (e.stopPropagation) {
            e.stopPropagation();
        }else{
            e.cancelBubble=true;
        }
	});
	$(document).click(function(){//点击其它地方隐藏城市div
		$(".top .city").hide();
	});
	$(".top .city ul li").click(function(e){
        if (e.stopPropagation) {
            e.stopPropagation();
        }else{
            e.cancelBubble=true;
        }
		$(".top-center p u").html($(this).html());
	});
	$(".top .city ul li:last-child u").click(function(e){
        if (e.stopPropagation) {
            e.stopPropagation();
        }else{
            e.cancelBubble=true;
        }
		$(".top .city").hide();
	});
	$(".code p:first-child").click(function(){
		$(".codes").slideUp(100,function(){
			$(".code p:first-child").slideUp(30);
        });
	});
	// 运输-车 选项卡
	var yscDd = $(".dysc_have dl dd");
	var yscUl = $(".dysc_have ul");
	$(yscDd[0]).css({borderTop:"3px solid #ff6600",borderBottom:"0"});
	for(var i=0;i<yscDd.length;i++){
		$(yscDd)[i].dd=i;
		$(yscDd[i]).click(function(){
			for(var j=0;j<yscDd.length;j++){
				$(yscDd[j]).css("border","");
				$(yscUl[j]).css("display","none");
			}
			$(this).css({borderTop:"3px solid #ff6600",borderBottom:"0"});
			$(yscUl[this.dd]).slideDown(500);
		});
	};
	// 陶配件1-1轮播下面滚动
	var dtpjul = $(".dtpjcn_gdul");
	dtpjul.html(dtpjul.html()+dtpjul.html());
	dtpjul.width($(".dtpjcn_gdul li").length*193);
		$(".dtpjcn_gda1").click(function(){
				dtpjul.animate({
					left:"0"
				},1000);
		});
		$(".dtpjcn_gda2").click(function(){
				dtpjul.animate({
					left:"-772px"
				},1000);
		});
	// 运输 无缝滚动
	var ysUl = document.querySelector(".yscnr_ul");
	var ysLi = document.querySelectorAll(".yscnr_ul li");
	var ysClet = document.querySelector(".yscnr_cletop");
	var ysCleb = document.querySelector(".yscnr_clebt");
	var speed = -1;
	ysUl.innerHTML = ysUl.innerHTML+ysUl.innerHTML;
	ysUl.height = ysLi[0].height*ysLi.length+"px";
	function cletop(){
		if(ysUl.offsetTop<=-ysUl.offsetHeight/2){
            ysUl.style.top = "0";
        }
        if(ysUl.offsetTop>0){
            ysUl.style.top = -ysUl.offsetHeight/2+"px";
        }
		ysUl.style.top = ysUl.offsetTop+speed+"px";
	};
	var ystimer = setInterval(cletop,20);
	ysClet.onmousemove = function(){
		speed = 1;
	}
	ysCleb.onmousemove = function(){
		speed = -1;
	}
}


