$(function(){
	
	// 获取元素
	var boxs=$(".banner")[0];
	var box=$(".banner_mid")[0];
	var imgs=$("a",box);
	var uls=$("ul",box)[0];
	var lis=$("li",uls);
	
	var btnL=$(".lunbo_btnL")[0];
	var btnR=$(".lunbo_btnR")[0];
    // console.log(btnL);
	
	// 状态初始化
	lis[0].style.background="#e5004f";
	animate(imgs[0],{opacity:1});
	// 当前是哪个
	var num=0;
	var flag=true;
	// 自动轮播
	 t=setInterval(moveR,2000)

	
	// moveR函数
	function moveR(){
	  // 更新下标
	  num++;
	  // 判断num是否越界，将超出的重新赋值0
	  if(num==imgs.length){
	   	num=0;
	  }
	 // 所有图片层级下降，当前上升：
	  for(var i=0;i<imgs.length;i++){
		animate(imgs[i],{opacity:0},function(){
			flag=true;
		});
		lis[i].style.background="#211616";
	 
	  }
	  animate(imgs[num],{opacity:1})
	  lis[num].style.background="#e5004f";
	}


	// moveL函数
	function moveL(){
		// 更新下标
		 num--;
		 // 判断num是否越界，将超出的重新赋值0
		 if(num<0){
		 num=imgs.length-1;
		 }
		// 所有图片层级下降，当前上升：
		for(var i=0;i<imgs.length;i++){
			animate(imgs[i],{opacity:0},function(){
				flag=true;
			})
			lis[i].style.background="#211616";
		}
		animate(imgs[num],{opacity:1});
		lis[num].style.background="#e5004f";
	}

	for(var i=0;i<lis.length;i++){
		lis[i].index=i;
		lis[i].onclick=function(){			
			for(var j=0;j<lis.length;j++){
				lis[j].style.background="#211616";
				animate(imgs[j],{opacity:0})
			}
			lis[this.index].style.background="#e5004f";
			animate(imgs[this.index],{opacity:1});
			num=this.index;
		}
	}

	box.onmouseover=function(){
		clearInterval(t);
	}
	box.onmouseout=function(){
		t=setInterval(moveR,2000);
	}

	btnR.onclick=function(){
     	if(flag){
     		flag=false;
     		moveR();
     	}
		
	}
	btnL.onclick=function(){
			if(flag){
     		flag=false;
     		moveL();
     	}
	}


	// "超值特卖"线条

	function aa(){
		var content_1=$(".content_1")[0];
		var boxs=$(".content1_b1",content_1);
		for(var i=0;i<boxs.length;i++){
				line(boxs[i]);
		}
		
		function line(obj){
			
			var bw=obj.offsetWidth;

			var bh=obj.offsetHeight;

			var left=$(".b1_left")[i];
			// console.log(left);
			var right=$(".b1_right")[i];
			var top=$(".b1_top")[i];
			var bottom=$(".b1_bottom")[i];
	
			obj.onmouseover=function(){
				animate(left,{height:bh});
				animate(right,{height:bh});
				animate(top,{width:bw});
				animate(bottom,{width:bw});
			}
			obj.onmouseout=function(){
				animate(left,{height:0});
				animate(right,{height:0});
				animate(top,{width:0});
				animate(bottom,{width:0});
			}
		}
	
	}
	aa();



	// 楼层线条
	function b3(){
		// var content3=$(".content3")[0];
		var boxs=$(".line1");
		// console.log(boxs);
		for(var i=0;i<boxs.length;i++){
				line(boxs[i]);
		}	
		
		function line(obj){
			
			var bw=obj.offsetWidth;
			var bh=obj.offsetHeight;
			var left=$(".b2_left")[i];
			// console.log(left);
			var right=$(".b2_right")[i];
			var top=$(".b2_top")[i];
			var bottom=$(".b2_bottom")[i];
	
			obj.onmouseover=function(){
				animate(left,{height:bh});
				animate(right,{height:bh});
				animate(top,{width:bw});
				animate(bottom,{width:bw});
			}
			obj.onmouseout=function(){
				animate(left,{height:0});
				animate(right,{height:0});
				animate(top,{width:0});
				animate(bottom,{width:0});
			}
		
		}
	}
	b3();

	// 楼层
	var guding=$(".guding")[0];
	var btop=$("btop",guding);
	var ch=document.documentElement.clientHeight;
	var floor=$(".floor");
	var floorArr=[];
	//console.log(floorArr);
	var flag=true;
	
	// 返回顶部
	btop.onclick=function(){
		document.documentElement.scrollTop=0;
	}
	for(var i=0;i<floor.length;i++){
		floorArr.push(floor[i].offsetTop);
		// console.log(floorArr);
	}
	// 楼层跳转
	var gdlis=$("li",guding);
	var spans=$(".sp");
	// console.log(gdlis);
	for(var i=0;i<gdlis.length;i++){		
		gdlis[i].index=i;
		gdlis[i].onclick=function(){
			flag=false;
			for(var j=0;j<spans.length;j++){
				console.log(spans[j]);
				spans[j].style.display="none";

			}
			
			spans[this.index].style.display="block";
			animate(document.body,{scrollTop:floorArr[this.index]},function(){
				flag=true;
			})
			animate(document.documentElement,{scrollTop:floorArr[this.index]},function(){
				flag=true;
			});
		}
	}




	window.onscroll=function(){
		var obj=document.documentElement.scrollTop?document.documentElement:document.body;
		var scrolltop=obj.scrollTop;
		
		// 右边显示
		var gutop=guding.offsetTop;
		// console.log(gutop);
		if(ch+scrolltop>2100){
			guding.style.display="block";
		}else{
			guding.style.display="none";
		}

		if(!flag){
	   	return;
	   }
		// 右边导航滑动变色
		for(var i=0;i<spans.length;i++){
			spans[i].index=i;
			if(ch+scrolltop>=floorArr[i]+200){
				for(var j=0;j<spans.length;j++){
					spans[j].style.display="none";
				}
				spans[i].style.display="block";
			}
		}
	}

	// content1选项卡
	var content1_top=$(".content1_top")[0];
	var ctoplis=$("li",content1_top);
	var cztm0=$(".cztm0");
	var csj=$(".content1_sj")[0];
	var csj=$(".csj");
    console.log(csj);
	// // var content1_bot1=$(".content1_bot1")[0];
	// // var content1_bot2=$(".content1_bot2")[0];
	for(var j=0;j<csj.length;j++){
		csj[j].style.display="none";
	}
	cztm0[0].style.display="block";
	for(var i=0;i<ctoplis.length;i++){		
		ctoplis[i].index=i;
		ctoplis[i].onmouseover=function(){	
			for(var j=0;j<ctoplis.length;j++){
				cztm0[j].style.display="none";
			}		 
			csj[this.index].style.display="block";
			cztm0[this.index].style.display="block";

	 	}
		ctoplis[i].onmouseout=function(){
			csj[this.index].style.display="none";
			cztm0[this.index].style.display="block";
			// cztm0[i].style.display="none";
		}
	}


	// 头部选项卡
	var head_out=$(".head_out")[0];
	var weixin=$(".weixin")[0];
	var wxa=$("a",weixin);
	var wximg=$("img",weixin);
	// console.log(wximg);
	weixin.onmouseover=function(){
		wximg[0].style.display="block";
	}
	weixin.onmouseout=function(){
		wximg[0].style.display="none";
	}

	var weixinn=$(".weixinn")[0];
	var wximgg=$("img",weixinn);
	weixinn.onmouseover=function(){
		wximgg[0].style.display="block";
	}
	weixinn.onmouseout=function(){
		wximgg[0].style.display="none";
	}
	
	var wdyt=$(".wdyt")[0];
	var wdytt=$(".wdytt")[0];
	wdyt.onmouseover=function(){
		wdytt.style.display="block";
	}
	wdyt.onmouseout=function(){
		wdytt.style.display="none";
	}
	
	// 左边选项卡
	var banner_left=$(".banner_left");
	var sidexx=$(".sidexx");
	
	
	var	sidexxx=$(".sidexxx");
	// console.log(sidexxx)
	var banner_lt1=$(".banner_lt1");
	// console.log(banner_lt1);
	for(var i=0;i<banner_lt1.length;i++){

		// console.log(sidexx[i]);
		banner_lt1[i].index=i;
		banner_lt1[i].onmouseover=function(){

			sidexx[this.index].style.display="block";
			sidexxx[this.index].style.display="block"
		}

		banner_lt1[i].onmouseout=function(){
			for(var j=0;j<banner_lt1.length;j++){
				sidexx[j].style.display="none";
				sidexxx[j].style.display="none";
			}
			
		}
	}




	
		var floor=$(".floor");
		var arr01=[];
		for(var i=0;i<floor.length;i++){
			arr01.push(floor[i]);
		}
		for(var i=0;i<floor.length;i++){			
			zjxxk(arr01[i]);
		}
	function zjxxk(obj){
	
		// 中间选项卡
		var content3_b2=$(".content3_b2",obj)[0];
		var content3_b2img=$(".content3_b2img",content3_b2)[0];
		var ciw=(content3_b2img.offsetWidth)/2;
		console.log(obj);
	
		var cbbtnl=$(".content3_lil",content3_b2)[0];
		var cbbtnr=$(".content3_lir",content3_b2)[0];
		var cbul=$(".content3_li34",content3_b2)[0];
		var cblis=$("li",cbul);
		cblis[0].style.background="#e22385";
		// 左右点击
		cbbtnr.onclick=function(){
			moveyou();
			cblis[1].style.background="#e22385";
			cblis[0].style.background="#eee";
		}
		cbbtnl.onclick=function(){
			movezuo();
			cblis[0].style.background="#e22385";
			cblis[1].style.background="#eee";
		}
	
		function moveyou(){			
			animate(content3_b2img,{left:-ciw});
		
		}
	
		function movezuo(){
			animate(content3_b2img,{left:0});
		
		}
		// 底部点击
		cblis[0].onclick=function(){
			movezuo();
			cblis[0].style.background="#e22385";
			cblis[1].style.background="#eee";
	
		}
		cblis[1].onclick=function(){
			moveyou();
			cblis[1].style.background="#e22385";
			cblis[0].style.background="#eee";
		}
	}
	
	
})