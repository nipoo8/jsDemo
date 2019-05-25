window.onload = function() {
    var oContainer = document.getElementById('container');
    var oWrap = document.getElementById('wrap');
    var oSpan = document.getElementsByTagName('span');
    var oLeft = document.getElementById('left');
    var oRight = document.getElementById('right');
    oWrap.children[0].style.opacity = "1";
    oSpan[0].className = "on";
    var num = 0;
    var Timer = null;
    //设置小圆点的效果
    for (var i = 0; i < oSpan.length; i++) {
        oSpan[i].index = i;
        oSpan[i].onclick = function() {
            for (var j = 0; j < oSpan.length; j++) {
                num = this.index;
                oWrap.children[j].style.opacity = "0";
                oSpan[j].className = "";
            }
            oWrap.children[num].style.opacity = "1";
            oSpan[num].className = "on";
        };
        oRight.onclick = function() {
            for (var i = 0; i < oSpan.length; i++) {
                if (oSpan[i].className == "on") {

                    oWrap.children[i].style.opacity = "0";
                    oSpan[i].className = "";
                    i++;
                    num++;
                    if (i > 4) {
                        i = 0;
                    }
                    oWrap.children[i].style.opacity = "1";
                    oSpan[i].className = "on";
                }
            }
        };
        oLeft.onclick = function() {
            for (var i = 0; i < oSpan.length; i++) {
                if (oSpan[i].className == "on") {
                    oWrap.children[i].style.opacity = "0";
                    oSpan[i].className = "";
                    i--;
                    num--;
                    if (i < 0) {
                        i = 4;
                    }
                    oWrap.children[i].style.opacity = "1";
                    oSpan[i].className = "on";
                }
            }
        };
    }


    //定时器 实现图片轮播
    function time() {
        num++;
        if (num < 5) {
            for (var i = 0; i < oSpan.length; i++) {
                oWrap.children[i].style.opacity = "0";
                oSpan[i].className = "";
            }
            oWrap.children[num].style.opacity = "1";
            oSpan[num].className = "on";
        } else {
            num = -1;
        }
    }

    clearInterval(timer);
    var timer = setInterval(time, 2000); /*调用定时器*/
    oContainer.onmouseover = function() {
        clearInterval(timer);
    };
    oContainer.onmouseout = function() {
        clearInterval(timer);
        timer = setInterval(time, 2000);
    };
};