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
	var yanzm=$(".verification");
	var arr=[1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
	function yzm(){
		for (var i=0;i<5;i++) {
			var j=Math.round(Math.random()*34);
			if(isNaN(arr[j])){
				if(Math.round(Math.random())==0){
					arr[j]=arr[j].toUpperCase();
					yanzm.append(arr[j]);
				}else{
					arr[j]=arr[j].toLowerCase();
					yanzm.append(arr[j]);
				}
			}else{
				yanzm.append(arr[j]);
			}
		}
	}
	yzm();
	yanzm.click(function(){
		yanzm.html("");
		yzm();
	});
	var userName=$(".landing input:nth-of-type(1)");
	var pw=$(".landing input:nth-of-type(2)");
	var yzmk=$(".landing input:nth-of-type(3)");
	yzmk.blur(function(){
		var yz=$(".verification").html().toLowerCase();
		var yzk=yzmk.val().toLowerCase();
		if(yz==yzk){
			$(".judge i:nth-of-type(2)").hide();
			$(".judge i:nth-of-type(1)").show();
		}else if(yzk==""){
			$(".judge i:nth-of-type(2)").hide();
			$(".judge i:nth-of-type(1)").hide();
		}else{
			$(".judge i:nth-of-type(1)").hide();
			$(".judge i:nth-of-type(2)").show();
		}
	});
	$(".landing form").submit(function(){
		if(userName.val()!=="123456"||pw.val()!=="qk123456"||yzmk.val().toLowerCase()!==yanzm.html().toLowerCase()){
			if(userName.val()!=="123456"){
				$($(".landing form p")[0]).html("账号错误！");
			}else{
				$($(".landing form p")[0]).html("");
			}
			if(pw.val()!=="qk123456"){
				$($(".landing form p")[1]).html("密码错误！");
			}else{
				$($(".landing form p")[1]).html("");
			}
			if(yzmk.val().toLowerCase()!==yanzm.html().toLowerCase()){
				$($(".landing form p")[2]).html("验证码错误！");
			}else{
				$($(".landing form p")[2]).html("");
			}
			return false;
		}
	});
	$(".registers form").submit(function(){
		if(isNaN($(".registers p:first-child input").val())||$(".registers p:first-child input").val().length!==11||6>$(".registers p:nth-of-type(3) input").val().length||$(".registers p:nth-of-type(3) input").val().length>11||$(".registers p:nth-of-type(4) input").val()!==$(".registers p:nth-of-type(3) input").val()){
			if(isNaN($(".registers p:first-child input").val())||$(".registers p:first-child input").val().length!==11){
				$(".registers p:first-child u:last-child").html("字符不对，应为11个字符");
			}else{
				$(".registers p:first-child u:last-child").html("");
			}
			if(6>$(".registers p:nth-of-type(3) input").val().length||$(".registers p:nth-of-type(3) input").val().length>11){
				$(".registers p:nth-of-type(3) u:last-child").html("输入6~11个字符");
			}else{
				$(".registers p:nth-of-type(3) u:last-child").html("");
			}
			if($(".registers p:nth-of-type(4) input").val()!==$(".registers p:nth-of-type(3) input").val()){
				$(".registers p:nth-of-type(4) u:last-child").html("两次密码不一致");
			}else{
				$(".registers p:nth-of-type(4) u:last-child").html("");
			}
			return false;
		}
	});
	$(".lands button").click(function(){
		window.location.href="land.html";
	});

	$(".my-select li p").click(function(){
		$(this).parent("li").children(".my-select2").toggle();
		if ($(this).parent("li").children(".my-select2").css("display")=="block") {
			$(this).children("span").html("-");
		}else{
			$(this).children("span").html("+");
		}
	});
	$(".my-select2 li").click(function(){
		$(".my-select2 li .blue-t").hide();
		$(".my-select2 li").css("background","");
		$(this).css("background","#e9e9e9");
		$(this).children(".blue-t").toggle();
	});

	var data_sl=$(".data_nav li");
	for(var i=0;i<data_sl.length;i++){
		(function(i){
			data_sl.eq(i).click(function(){
				if (i==1||i==6) {
				}else{
					$(".data_nav li b").hide();
					$(".data_nav li").css("background","#f9f9f9");
					$(this).css("background","#efefef");
					$(this).children("b").css("display","block");
					$(".data_right").hide();
					$(".data_right").eq(i).show();
				}
			});
		})
		(i);
	}


	// 热点发布
	var oSpan = document.querySelectorAll(".facility_span");
	var oUl = document.getElementById("facility_ul");
	var oW = oUl.offsetWidth/3;
	oSpan[0].style.background = "#4fa9f4";
	for(var i=0;i<oSpan.length;i++){
		oSpan[i].dd = i;
		oSpan[i].onclick = function(){
			for(var j=0;j<oSpan.length;j++){
				oSpan[j].style.background = "#e6e6e6";
			}
			this.style.background = "#4fa9f4";
			oUl.style.left = -oW*this.dd+"px";
		};
	};
// 顶部广告叉掉后的线和header
	var Line = $(".cl");
	var off1 = $(".topad_off");
	var oHeader = $(".dsy_header");
	off1.click(function(){
		Line.css("top","145px");
		oHeader.css("marginTop","36px");
	});


    //获取所有的li按钮（13个）
    var oLists =$(".my-select2>li");

    //获取所有的div（14个 包括初始首页的那一个）
    var oDivs = $(".service_right");

    //循环将所有的div设置隐藏，只将第一个显示出来
    for(var j=0; j<oDivs.length; j++){
        oDivs.eq(j).css({"display": "none"});
    }
    oDivs.eq(0).css({"display":"block"});

    //建立循环
    for(var i=0; i<oLists.length; i++){
        //当某一个li按钮被单击时
        (function(i){
            oLists.eq(i).click(function(){
                //将所有的div隐藏
                oDivs.hide();
                //将当前对应的div显示出来(因为匹配div的数量比li按钮要多一个，所以要+1来对应正确的div)
                oDivs.eq(i+1).show();
            });
        })(i);
    }
    //获取订单详情按钮
    var buyer_but=$(".service_right .Si-dimen h1 input:nth-of-type(1)");
    var buyer_li=$(".service_right .item .item_bottom ul li:nth-of-type(4) a");
    buyer_but.click(function(){
    	oDivs.hide();
    	oDivs.eq(-1).show();
    });
    buyer_li.click(function(){
    	oDivs.hide();
    	oDivs.eq(-1).show();
    });


    $(".con-left-btn ul li").click(function(){
    	window.location.href="Details of accessories.html";
    });
    $(".con-right ul li").click(function(){
    	window.location.href="Details of accessories.html";
    });
    $(".hotservice ul li").click(function(){
    	window.location.href="Details of accessories.html";
    });
    $(".Monitoring .list ul li").eq(-1).click(function(){
    	window.history.go(-1);
    });

    $(".Service_providers .Orders ul li").eq(-2).click(function(){
    	window.location.href="Testing Market-Release.html";
    });



	(function($){ 
 
	 function getRandom(n){
        return Math.floor(Math.random()*n+1)
     }
	var inputp={
		indexInput:0,
		
		addNew:function(obj,stepNum){
			this.initNew(obj,stepNum);
			this.indexInput++;
		},
		getDigit:function(val,num){
			var digitNum=0;
			if(num.toString().split(".")[1]){
				digitNum=num.toString().split(".")[1].length;
			}
			 
			if(digitNum>0){
		 		val=val.toFixed(digitNum);
			}
			return val;
			
		},
		initNew:function(obj,stepNum){
			var width=obj.width();
			var height=obj.height();
			var height1=height;
		 	 
			var _root = this;
		 	width+=3;
			//height+=0; 
			 
			obj.css("border-style","none");
			obj.css("border-width","0px");
		   
			obj.css("width",width-height1*2-7);
			obj.css("text-align","center");
			obj.css("outline","none");
			obj.css("vertical-align","middle");
			obj.css("line-height",height+"px");
			obj.wrap("<div id='"+obj.attr('id')+"T' style='overflow:hidden;width:"+width+"px;height:"+height+"px;border: 1px solid #CCC;'></div>");
			obj.before("<div id='"+obj.attr('id')+"l'  onselectstart='return false;' style='-moz-user-select:none;cursor:pointer;text-align:center;width:"+height1+"px;height:"+height1+"px;line-height:"+height1+"px;border-right-width: 1px;border-right-style: solid;border-right-color: #CCC;float:left'>-</div>");
			obj.after("<div id='"+obj.attr('id')+"r'  onselectstart='return false;' style='-moz-user-select:none;cursor:pointer;text-align:center;width:"+height1+"px;height:"+height1+"px;line-height:"+height1+"px;border-left-width: 1px;border-left-style: solid;border-left-color: #CCC;float:right'>+</div>");
			$("#"+obj.attr('id')+"l").click(function(){
				_root.leftDo(obj,stepNum);
			});
			$("#"+obj.attr('id')+"r").click(function(){
				_root.rightDos(obj,stepNum);
			});
		},
		leftDo:function(obj,stepNum){
			var val=this.formatNum(obj.val());
			val=Math.abs(val);
			val-=stepNum;
			val=this.getDigit(val,stepNum);
			if(val<0){
				val=0;
				obj.val(0);
			}else{
				this.moveDo(obj,val,true,stepNum);
			};
		},
		rightDos:function(obj,stepNum){
			var val=this.formatNum(obj.val());
			val=Math.abs(val);
			val+=stepNum;
			val=this.getDigit(val,stepNum);
			this.moveDo(obj,val,false,stepNum);
		},
		moveDo:function(obj,num,isup,stepNum){
			var startTop=0;
			var endTop=0;
			if(stepNum>=1){
				if(num.toString().split(".")[1]){
					 num=num.toString().split(".")[0];
					 obj.val(num);
				}
			}
			var num1=num;
			var lens1=num.toString().length;
			var divwidth=parseFloat(obj.css("font-size"))/2;
		 	if(isup){
				obj.val(num1);
				var isDecimal=false;
			 	for(i=lens1-1;i>=0;i--){
					var s=num.toString();
					var s1=s.substr(i,1);
					var s1num=parseFloat(s1);
					if(s1num!=9||isNaN(s1num)){
						if(isNaN(s1num)){
							//num=parseFloat(s.substr(i-1,lens1-i));
//							num++;
//							num=this.getDigit(num,stepNum);
						}else{
							num=parseFloat(s.substr(i,lens1-i));
							num++;
							break;
						}
					}
				}
				startTop=0;
				endTop=-40;
			}else{
				var isDecimal=false;
			 	for(i=lens1-1;i>=0;i--){
					var s=num.toString();
					var s1=s.substr(i,1);
					var s1num=parseFloat(s1);
				 	if(s1num!=0||isNaN(s1num)){
						if(isNaN(s1num)){
							isDecimal=true;
						}else{
							num=parseFloat(s.substr(i,lens1-i));
							break;
						}
					}
				}
				if(isDecimal){
					num=this.getDigit(num,stepNum);
				}
				startTop=40;
				endTop=0;
			}
			if($("#"+obj.attr('id')+"Num").length <1){
				//background-color:#fff;
				var numstr=num.toString();
				var widths=divwidth*numstr.length;
				var stri="<div id='"+obj.attr('id')+"sy' style='position:relative;width:0px;height:0px'><div id='"+obj.attr('id')+"Num' style='width:"+widths+"px;z-index:100;position:absolute;height:"+obj.height()+"px;top:"+startTop+"px; line-height:"+obj.height()+"px;font-family: "+obj.css("font-family")+";font-size:"+obj.css("font-size")+";'>";
				for(i=0;i<numstr.length;i++){
					var nums=numstr.substr(i,1);
					if(nums=="."){
						stri+="<div style='float:left;width:"+divwidth+"px;'>&nbsp;";
					}else{
						stri+="<div style='float:left;width:"+divwidth+"px;background-color:#fff'>";
						stri+=nums;
					}
					stri+="</div>";
				}
				stri+="</div></div>";
				$("#"+obj.attr('id')+"T").prepend(stri);
			 	var leftOff=0;
				if(num1.toString().length-num.toString().length>0){
					leftOff=(divwidth*(num1.toString().length-num.toString().length))/2;
				}
				var pz=0;
				if(/msie/.test(navigator.userAgent.toLowerCase())){
					pz=1; 
				}
     			if(/firefox/.test(navigator.userAgent.toLowerCase())){
					pz=1; 
				}
				if(/webkit/.test(navigator.userAgent.toLowerCase())){
				}
			 	if(/opera/.test(navigator.userAgent.toLowerCase())){
					pz=1;
				} 
				var leftpx=(obj.width()/2)+obj.height()-($("#"+obj.attr('id')+"Num").width()/2)+1+leftOff+pz;
			 	$("#"+obj.attr('id')+"Num").css("left",leftpx);
				$("#"+obj.attr('id')+"Num").animate({
					top:endTop+'px'
					//,opacity:0.4
				},
				300,
				function(){
					$("#"+obj.attr('id')+"sy").remove();
					if(isup){
					}else{
						obj.val(num1);
					}
				});
			}
		}
		,
		formatNum:function(val){
			var val=parseFloat(val);
			if(isNaN(val)){ 
				val=0;
			}
			return val;	
		},
	};
    $(function(){
	 	inputp.addNew($("#inputs"),0.1);
		inputp.addNew($("#inp"),1);
		})
	})(jQuery);
}


//  广告 小叉
function off(advertising,close){
	var off = $(close);
	var ad = $(advertising);
	ad.hover(function(){
		off.show(250);
		off.on("click",function(){
			ad.slideUp(180);
			off.css("display","none");
		});
	},function(){
		off.css("display","none");
	});
	$(off).on("mouseover",function(){
			$(this).css("display","block");
		});
}
// 导航选项卡 jq
function mosuse(move,mosuse){
    var oDiv = $(move);					//获取到要出现的元素
    var oLi = $(mosuse);				//获取到要点击的元素
    for(var i=0;i<oLi.length;i++){
        oLi[i].dd = i;						//给每个li加一个属性，属性值为i，用来控制当点击li时候对应的div的下标
        $(oLi[i]).hover(function(){				//给要点击的函数加上一个伪类方法，有移入和移除两个函数
            $(oDiv[this.dd]).css("display","block");			//移入的时候让div以show()方法出现
        },function(){
            $(oDiv[this.dd]).css("display","none");		//移出的时候让div隐藏
        });
        $(oDiv[i]).hover(function(){					//小细节，移出li 又移入div时控制div不隐藏
             $(this).css("display","block");
        },function(){
            $(this).css("display","none");
        });
    }
}
// 导航右侧选项卡
function nav_rt(move,mosuse){
	var rLi = $(mosuse);				//获取到要点击的元素 类数组
	var rDiv = $(move);					//获取到要出现的内容
	$(rDiv[0]).slideDown(500);			//让第一个div出现
	$(rLi[0]).css({border:"0",background:"#fff"});
	for(var i=0;i<rLi.length;i++){
		rLi[i].dd = i;				//给每个li加一个属性，属性值为i，用来控制当点击li时候对应的div的下标
		$(rLi[i]).on("click",function(){			//创建点击事件
			for(var j=0;j<rLi.length;j++){			//再次循环控制不显示，和li默认的样式
				$(rDiv[j]).css("display","none");				//让div隐藏
				$(rLi[j]).css({border:"",background:""});		//让li的样式默认为css样式表里
			}
			$(this).css({border:"0",background:"#fff"});		//控制点击的这个li 的边框和背景
			$(rDiv[this.dd]).slideDown(500);					//控制点击某个li时，他的dd属性值就为他对应的下标，也就是对应的div下标。让div 以slideDown()方法出现;
		});
	}
}
// 优质服务商
function facilitator(move,mosuse){
	var rLi = $(mosuse);				//获取到要点击的元素 类数组
	var rDiv = $(move);					//获取到要出现的内容
	$(rDiv[0]).css({display:"block"});			//让第一个div出现
	$(rLi[0]).css({borderBottom:"4px solid #2186da"});
	for(var i=0;i<rLi.length;i++){
		rLi[i].dd = i;				//给每个li加一个属性，属性值为i，用来控制当点击li时候对应的div的下标
		$(rLi[i]).on("click",function(){			//创建点击事件
			for(var j=0;j<rLi.length;j++){			//再次循环控制不显示，和li默认的样式
				$(rDiv[j]).css("display","none");				//让div隐藏
				$(rLi[j]).css({border:""});		//让li的样式默认为css样式表里
			}
			$(this).css({borderBottom:"4px solid #2186da"});		//控制点击的这个li 的边框和背景
			$(rDiv[this.dd]).css({display:"block"});					//控制点击某个li时，他的dd属性值就为他对应的下标，也就是对应的div下标。让div出现;
		});
	}
}

