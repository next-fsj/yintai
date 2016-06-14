
//一:getClass("select")
//获取具有指定class元素的集合
//select 指定的className
//[context] 指定的范围  不传的话就是document里找
 // context 初始化
//思路:第一步:判断浏览器  document.getElementsByClassName
//第二步:true
       function getClass(select,context){


           var context=context?context:document;
       	   if (document.getElementsByClassName) {
       	   	  return context.getElementsByClassName(select)
       	   } else {
       	   	  var all=context.getElementsByTagName('*');
       	   	  var arr=[];
       	   	  for (var i = 0; i < all.length; i++) {
       	   	  	//one two three four 
       	   	  	//每一个对象的classname是否包含指定的select
       	   	  	  if (checkClass(all[i].className,select)) {
                      arr.push(all[i]);
       	   	  	  }
       	   	  }
       	   	  return arr;
       	   }
       }
// 查看classname里面是否包含有select
//classname 形参 select 形参2
    function checkClass(classname,select){
       	 var arr=classname.split(" ");
       	 for (var i = 0; i < arr.length; i++) {
       	 	if (arr[i]==select) {
       	 		return true;
       	 	}      	 	
       	 }
       	 return false;
      }

  //二:设置文本内容
   function setContent(obj,val){
   	 if (val==undefined) {
   	 	if (obj.innerText) {
        	return obj.innerText
        } else {
        	return obj.innerContext
        }
   	 } else {
   	 	if (obj.innerText||obj.innerText==""){//IE8,当浏览器有innerText这个属性时，或者当对象的内容为空字符串时，都可以给这个对象设置文本
   	 		obj.innerText=val;
   	 	} else {
   	 		obj.innerContext=val;
   	 	}
   	 }       
   }
//三: 获取元素样式
//obj 对象  attr  属性
     function getStyle(obj,attr){
     	if (obj.currentStyle) {
     		return obj.currentStyle[attr];
     	} else {
     		return getComputedStyle(obj,null)[attr];
     	}
     }
 //四.获取元素的函数$()
 //$(string) 获取页面中的元素
  //".one" 获取指定类名的元素的集合
  //"#one" 获取指定id的第一个元素
  // "div" 获取指定标签的元素集合
  //思路: 判断字符串的首字母 
   // .  getClass()
   // #   document.getElementById();
   // 标签  document.getElementsByTagName('')

   function $(selector,context){
   	 if (typeof selector=="string") {
   	 	var context=context||document;
         if (selector.charAt(0)==".") {
         	return getClass(selector.slice(1),context); 
         } else if(selector.charAt(0)=="#"){
         	return context.getElementById(selector.slice(1));
         } else if (/^[a-z][a-z1-6]{0,10}$/.test(selector)) {
         	 return context.getElementsByTagName(selector);
         } else if (/^<[a-z][a-z1-6]{0,10}>$/.test(selector)) {
          return document.createElement(selector.slice(1,-1));
         }
        
   	 } else if(typeof selector=="function"){
        addEvent(window,"load",selector);
         }
   	 }
   

/* getChild函数  获取指定元素的子节点
 obj:指定的对象    type：子节点的类型
  获取所有元素：
  声明空数组：
  遍历：
    判断
  返回数组：
 */
  function getChild(obj,type){
      var child=obj.childNodes;
      var type=type==undefined?true:type;
      var arr=[];
      for(var i=0;i<child.length;i++){
        if(type===true){
          if(child[i].nodeType==1){
            arr.push(child[i]);
          }
        }else{
          if(child[i].nodeType==1||(child[i].nodeType==3&&!(/^\s+$/.test(child[i].nodeValue)))){
            arr.push(child[i]);
          }
        }
      }
      return arr;
  }


//getNext1 函数 获取下一个元素节点
/* 
找到obj的->判断有无nextSibling->有：一个一个比较，且更新con;无：返回;
*/
function getNext1(obj){
  var next=obj.nextSibling;
    if(next==null){
      return false;
    }
    while(next.nodeType==8||next.nodeType==3){
      next=next.nextSibling;
      if(next==null){
        return false;
      }
    } 
    return next;
}


// getNext2 函数 获取下一个非空文本节点

function getNext2(obj){
  var next=obj.nextSibling;
  if(next==null){
    return false;
  }
  while(next.nodeType==8||(next.nodeType==3&&/^\s+$/.test(next.nodeValue))){
    next=next.nextSibling;
    if(next==null){
      return false;
    }
  }
  return next;
}

// getNext函数 type=true,返回下一个非空文本 type不传值，返回下一个元素节点
function getNext(obj,type){
  if(type){
    return getNext2(obj,type);
  }else{
    return getNext1(obj,type);
  }
}


//getPrevious函数 获取上一个元素节点
function getPrevious(obj){
  var last=obj.previousSibling;
  if(last==null){
    return false;
  }
  while(last.nodeType==8||last.nodeType==3){
    last=last.previousSibling;
    if(last==null){
      return false;
    }
  }
  return last;
} 


// insertAfter函数 
// 功能：将obj在obj1之后插入
// 思路：获取obj的下一个兄弟节点和父元素->判断是否是最后一个->是：在之前插入;否：在最后插入
function insertAfter(obj,obj1){
  var parent=obj1.parentNode;
  var next=getNext(obj1);
  if(next){
    parent.insertBefore(obj,next)
  }else{
    parent.appendChild(obj);
  }
}

// getFirst函数 获取obj第一个元素
function getFirst(obj,type){
  var first=getChild(obj,type)[0];
  return first;
}

// getLast函数 获取obj的最后一个元素
function getLast(obj,type){
  var last=getChild(obj,type)[getChild(obj).length-1];
  return last;
}




// appendBefore函数
// 功能：在父元素的first之前插入,obj为要插的对象，obj1为父元素
// 思路：获取父元素和它的第一个元素->判断有无第一个元素->有：在first之前插入;无：appendChild
function appendBefore(obj,obj1){
  console.log(obj1);
  var first=getFirst(obj1);

  if(first){
    obj1.insertBefore(obj,first);
  }else{
    obj1.appendChild(obj);
  }
}

// addEvent 添加多个事件,且解决兼容性问题，FF为addE……L,IE为attach;
    
    function addEvent(obj,type,fn){
      if(obj.addEventListener){
        obj.addEventListener(type,fn,false);
      }else{
        obj.attachEvent("on"+type,fn);
      }
    }

// removeEvent 删除多个事件
function removeEvent(obj,type,fn){
  if(obj.addEventListener){
        obj.removeEventListener(type,fn,false);
      }else{
        obj.detachEvent("on"+type,fn);
      }
}

// mousewheel 鼠标滚轮上下分别执行各自的函数
    function mousewheel(obj,downFn,upFn){
      if(document.attachEvent){
      document.attachEvent("onmousewheel",scrollFn);

      }else if(document.addEventListener){
      document.addEventListener("mousewheel",scrollFn,false);  
      //chrome
      document.addEventListener("DOMMouseScroll",scrollFn,false);  
      //firefox  
      }
        function scrollFn(e){
        var ev=e||window.event;
        var dir=ev.wheelDelta||ev.detail;
        if (ev.preventDefault ) 
          ev.preventDefault(); //阻止默认浏览器动作(W3C) 
        else{
          ev.returnValue = false;//IE中阻止函数器默认动作
        }
        
        if(dir==-120||dir==3){
          downFn();
        }else if(dir==120||dir==-3){
          upFn();
        }
      }
    }
    










 /***************************************************************/
 //101.行列表格
   function hl(hang,lie,color1,color2){
   	document.write("<table border=1 cellspacing=0 align='center'>"); 
      	for (var i = 0; i < hang; i++) {
      		if (i%2==0) {
      			document.write("<tr bgcolor="+color1+">");
      		for (var j = 0; j < lie; j++) {
      			document.write("<td>");
      			 document.write("我想静静");
      			document.write("</td>");
      		}
      		document.write("</tr>")
      		
      		} else {
      			document.write("<tr bgcolor="+color2+">");
      		for (var j = 0; j < lie; j++) {
      			document.write("<td>");
      			 document.write("我想静静");
      			document.write("</td>");
      		}
      		document.write("</tr>")
      	}     		     		
      	}
      	document.write("</table>");
    }
    /*bb(5,5,"blue","red");*/
/****************************************************************/
//102:数组去重函数
    function norepeat(arr){
    //创建一个新空数组
    var newarr=[];
    //遍历原来数组
     for (var i = 0; i < arr.length; i++) {
      //开关思想 flag:true false
        var flag=true;
        //当前元素是否已经存于newarr
        for (var j = 0; j < newarr.length; j++) {
          if (newarr[j]==arr[i]) {
            flag=false;
            break;
          } 
        }
         //当前元素push到newarr
        if (flag) {
          newarr.push(arr[i]);
        } 
     }
     return newarr;
    }   
    
/*******************************************************/

 //103: 数组去空
      function delnull(arr){
        var newarr=[];
    for (var i = 0; i < arr.length; i++) {
      console.log(typeof arr[i]);
      if (arr[i]==undefined){
               continue;
      } else {
               newarr.push(arr[i]);
      } 
    }
    return newarr;
     }
     

 //104: 查看数组中的n个随机元素

   //arr为数组,  num为查看的随机个数
   function randomArr(arr,num){
         var newarr=[];
              for (var i = 0; i < num; i++) {
                var num1=Math.floor(Math.random()*arr.length);
                while((function check(num2,Arr){
              for (var i = 0; i < Arr.length; i++) {
                if (num2==Arr[i]) {
                  return true;
                } 
              }
              return false;
             })(arr[num1],newarr)){
                  num1=Math.floor(Math.random()*arr.length);
                }
                newarr.push(arr[num1]);
              }
              return newarr;
       }

  //105:  计算器
    function jsq(num1,num2,ysf){
			var num1=parseInt(prompt("请输入第一个数",""));
		    var num2=parseInt(prompt("请输入第二个数",""));
		    var ysf=prompt("运算符","");
		    switch(ysf){
			  case "+":alert(num1+num2);break;
			  case "-":alert(num1-num2);break;
			  case "*":alert(num1*num2);break;
			  case "/":{
                if (num2==0) {
                    alert("除数不能为0");break;
                  } else {
                    alert(num1/num2);break;
                  }
                }
			    default:alert("输入错误");
		     }
        }