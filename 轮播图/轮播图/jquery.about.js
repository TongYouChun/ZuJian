;(function(){
    "use strict"
    $.fn.extend({
        banner:function(options){
            var bannerObj ={
                index:0,
                iPrev:options.items.length-1
            };
            if(options.list == undefined || options.list == true){
                bannerObj.list = true;
            }else{
                bannerObj.list = false;
            };
            if(options.autoPlay == undefined ||options.autoPlay == true){
                bannerObj.autoPlay = true;
            }else{
                bannerObj.autoPlay = false;
            }
            bannerObj.delayTime = options.delayTime||2000;
            bannerObj.moveTime = options.moveTime || 200;

            if(bannerObj.list){
                var $ul =$("<ul>");
                for(var i=0;i<options.items.length;i++){
                    $ul.append($("<li>"+(i+1)+"</li>"));
                }
                this.append($ul);
                $ul.css({
                    width:"100%",
                    lineHeight:"30px",
                    display:"flex",
                    justifyContent:"center",
                    position:"absolute",
                    bottom:0,
                    listStyle:"none",
                    margin:0,
                    padding:0
                }).children("li").css({
                    textAlign:"center",
                    width:"30",
                    height:"30",
                    background:"rgba(200,200,200,0.6)",
                    borderRadius:"50%",
                    margin:"10px"
                    
                }).eq(bannerObj.index).css({
                    background:"#f00",
                    
                })

                $ul.children("li").on("click",function(){
                    if($(this).index() > bannerObj.index){

                        bannerObj.listMove($(this).index(),1)
                    }
                    if($(this).index() < bannerObj.index){

                        bannerObj.listMove($(this).index(),-1)
                    }

                    bannerObj.index = $(this).index();
                        $(this).css({
                            background:"#f00",
                        }).siblings().css({
                            background:"",
                        })
                    })  
                    bannerObj.listMove = function(iNow,type){
                        options.items.eq(bannerObj.index).css({
                            left:0
                        }).stop().animate({
                            left:-options.items.eq(0).width()*type
                        })
                        options.items.eq(iNow).css({
                            left:options.items.eq(0).width()*type
                        }).stop().animate({
                            left:0
                        })
                    }
                }
                // B1.判断是否传入左右按钮
            // console.log(options.left)
            if(options.left != undefined && options.left.length != 0 && options.right != undefined && options.right.length != 0){
                // B2-1.绑定事件
                options.left.on("click",function(){
                    // B3-1.计算索引，要走的和要进来的
                    if(bannerObj.index == 0){
                        bannerObj.index = options.items.length-1;
                        bannerObj.iPrev = 0
                    }else{
                        bannerObj.index--;
                        bannerObj.iPrev = bannerObj.index + 1;
                    }
                    // B4-1.开始移动向右移动
                    bannerObj.btnMove(-1)
                })
                // B2-2.绑定事件
                options.right.on("click",function(){
                    // B3-2.计算索引，要走的和要进来的
                    if(bannerObj.index == options.items.length-1){
                        bannerObj.index = 0;
                        bannerObj.iPrev = options.items.length-1;
                    }else{
                        bannerObj.index++;
                        bannerObj.iPrev = bannerObj.index - 1
                    }
                    // B4-2.开始移动向左移动
                    bannerObj.btnMove(1)
                })

                // btn移动的功能
                bannerObj.btnMove = function(type){
                    options.items.eq(bannerObj.iPrev).css({
                        left:0
                    }).stop().animate({
                        left:-options.items.eq(0).width() * type
                    })
                    options.items.eq(bannerObj.index).css({
                        left:options.items.eq(0).width() * type
                    }).stop().animate({
                        left:0
                    })
                    
                    // 设置li的当前项
                    $ul.children("li").css({
                        background:""
                    }).eq(bannerObj.index).css({
                        background:"red"
                    })
                }
            }

            // A1.判断是否自动播放
            if(bannerObj.autoPlay){
                // A2.开启计时器，模拟右键执行，实现自动播放
                bannerObj.timer = setInterval(() => {
                    options.right.trigger("click")
                }, bannerObj.delayTime);
                // A3.给大框加鼠标进入和离开事件，进入停止，离开继续
                this.hover(function(){
                    clearInterval(bannerObj.timer)
                },function(){
                    bannerObj.timer = setInterval(() => {
                        options.right.trigger("click")
                    }, bannerObj.delayTime);
                })
            }
        }
    })
})(jQuery);