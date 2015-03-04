/**
 * Created by haojianhua on 2015/1/19.
 */
$(function(){



    //点击频道按钮
    $("#channelBtn").on("click", function(e){
        $("body").addClass("_mc");
        $("#videoEmail").show();
    });

    //点击返回
    $("#indexMask").on("click", function(e){
        $("body").removeClass("_mc");
        $("#videoEmail").hide();
    });

    //
    var $list = {
        "Hot":{
            "key": 1,
            "content": [
                {
                    "href": "http://www.test.com", //视频播放地址
                    "src": "i/test6.jpg",  //缩略图地址
                    "time": "03:00",  //播放时长
                    "title": "title1",  //视频标题
                    "praise": 32555  //点赞数
                },
                {
                    "href": "http://www.test.com",
                    "src": "i/test7.jpg",
                    "time": "03:00",
                    "title": "title2",
                    "praise": 32555
                },
                {
                    "href": "http://www.test.com",
                    "src": "i/test8.jpg",
                    "time": "03:00",
                    "title": "title3",
                    "praise": 32555
                },
                {
                    "href": "http://www.test.com",
                    "src": "i/test9.jpg",
                    "time": "03:00",
                    "title": "title4",
                    "praise": 32555
                },
                {
                    "href": "http://www.test.com", //视频播放地址
                    "src": "i/test6.jpg",  //缩略图地址
                    "time": "03:00",  //播放时长
                    "title": "title5",  //视频标题
                    "praise": 32555  //点赞数
                },
                {
                    "href": "http://www.test.com",
                    "src": "i/test7.jpg",
                    "time": "03:00",
                    "title": "title6",
                    "praise": 32555
                },
                {
                    "href": "http://www.test.com",
                    "src": "i/test8.jpg",
                    "time": "03:00",
                    "title": "title7",
                    "praise": 32555
                },
                {
                    "href": "http://www.test.com",
                    "src": "i/test9.jpg",
                    "time": "03:00",
                    "title": "title8",
                    "praise": 32555
                }

            ]
        }
    };
    var $ad = '';
    $ad += '<div class="advertising">';
    $ad += '<a href=""><img src="';
    $ad += 'i/test3.jpg';
    $ad += '" /></a></div>';

    var $test = '';
    $test += '<section class="videoContent">';
    $test += '<ul>';
    with($list){
        for(var i = 0; i < Hot.content.length; i++){
            if( i % 4 ===  0 && i != 0 ){
                $test += '</ul>';
                $test += '</section>';
                $test += $ad;
                $test += '<section class="videoContent">';
                $test += '<ul>';
            }
            $test += '<li class="item">';
            $test += '<a class="link" href="';
            $test += Hot.content[i].href;
            $test += '">';
            $test += '<div class="s_i">';
            $test += '<img src="';
            $test += Hot.content[i].src;
            $test += '"/>';
            $test += '<span class="i_s">';
            $test += Hot.content[i].time;
            $test += '</span>';
            $test += '</div>';
            $test += '<div class="s_t">';
            $test += '<h2 class="t_h">';
            $test += Hot.content[i].title;
            $test += '</h2>';
            $test += '<p class="t_p"><span></span>';
            $test += Hot.content[i].praise;
            $test += '</p>';
            $test += '</div>';
            $test += '</a>';
            $test += '</li>';
        }
    }
    $test += '</ul>';
    $test += '</section>';

    //点击unflod
    $("#unfold").on("touchend", function(){
        var that = $(this);
        that.hide();
        $("#vLoad").show();
        setTimeout(function(){
            $("#vLoad").hide().before($test);
            that.show();
        }, 2000);
    });

    //点击展开详情页介绍
    $("#dSlide").on("touchend", function(){
        if($(this).hasClass("down")){
            $(this).removeClass("down");
            $("#dintro").removeClass("dintroCur");
        }else{
            $(this).addClass("down");
            $("#dintro").addClass("dintroCur");
        }
    });

    //视频展示量
    $(document).on("scroll", function(){
        var $arr = [], $tran = [];
        $(".videoContent .item").each(function(){
            var $top = $(this).offset().top;
            var $id = $(this).attr("data-id");
            $arr.push($top);
            $tran.push($id);
        });

        var $h = $(window).height();
        var $s = $(window).scrollTop();
        for(var i = 0; i < $arr.length; i++){
            if($arr[i] - $s <= $h){
                sendImg($tran[i]);
            }
        }
        function sendImg(arg){
            var img = new Image();
            var isrc = "i/test.jpg" + "?" + arg;
            img.src = isrc;
            //console.log(arg);
        }
    });

    //
    $("#downTopX").on("click", function(){
        $(this).parent().animate({
            height: 0
        }, 200)
    });

    //cookie
    var downVideo = getCookie("downVideo");
    if(downVideo){
        $("#downTopX").parent().hide();
    }else{
        setCookieSelf("downVideo", "这是一个cookie", "1d");
    }

    function setCookieSelf( name, value, time ){
        var strt = getsec( time ),
            t = new Date();
        t.setTime(t.getTime() + strt * 1);
        document.cookie = name + "=" + escape( value ) + ";expires=" + t.toGMTString();
    }
    function getsec( str ){
        var str1 = str.substring(1, str.length),
            str2 = str.substring(0, 1);
        switch(str2){
            case "s": //秒
                return str1 * 1000;
                break;
            case "d": //天
                return str1 * 24 * 60 * 60 * 1000;
                break;
            case "h": //小时
                return str1 * 60 * 60 * 1000;
                break;
            default:
                return "参数错误";
        }
    }

    function getCookie( name ){
        var arr, reg = new RegExp("(^|)" + name + "=([^;]*)(;|$)");
        if( arr = document.cookie.match( reg ) ){
            return ( arr[2] );
        }else{
            return null;
        }
    }

    $(".vcontent img").lazyload({
        "data_attribute": "src",
        "effect": "fadeIn",
        "threshold": 100,
        "skip_invisible": false
    });

    /*
    $("#test").on("load", function(){

        var $test = $("#test").contents().find("body").html();
        console.log($test);

    });
    */

});

