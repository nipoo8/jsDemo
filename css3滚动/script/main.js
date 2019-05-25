window.onload = function() {
    var oOut = document.getElementById('outline');
    var oDiv = oOut.getElementsByTagName('div');
    var oToNext = document.getElementsByClassName('toNext');
    var oToPrevious = document.getElementsByClassName('toPrevious');
    var oToTop = document.getElementById('toTop');
    var oToBottom = document.getElementById('toBottom');
    for (var i = 0; i < oDiv.length; i++) {
        oDiv[i].index = i;
        oDiv[i].style.height = document.documentElement.clientHeight + "px";
    }
    // alert(document.documentElement.clientHeight);

    // document.body.DOMMouseScroll = function(event) {
    //     event = event || window.event;
    //     alert(event.detail);
    // };
    oOut.onmousewheel = function(event) { //滚动事件未兼容,适用于google   后期再兼容
            event = event || window.event;
            // alert(event.wheelDelta);
            // alert(event.detail);
            if (event.wheelDelta < 0) {

                toNext();
                // toTop();
            } else {
                toPrevious();
            }
        }
        // alert(oOut.offsetHeight);
        //toNext
    for (var i = 0; i < oToNext.length; i++) {
        oToNext[i].index = i;
        oToNext[i].onclick = toNext;
    }
    for (var i = 0; i < oToPrevious.length; i++) {
        oToPrevious[i].index = i;
        oToPrevious[i].onclick = toPrevious;
    }
    oToTop.onclick = toTop;
    oToBottom.onclick = toBottom;


    function toNext() {
        var num = 0;
        var timer = null;
        var divHeight = parseInt(parseInt(oOut.offsetHeight) / 8);
        // alert(divHeight);
        timer = setInterval(function() {
            if (num < divHeight) {
                // num = num + 10;
                window.scrollBy(0, divHeight);
                clearInterval(timer);
            }
            // } else {
            //     window.scrollBy(0, divHeight - num);
            //     clearInterval(timer);
            // }
        }, 50);
    }


    function toPrevious() {
        var num = 0;
        var timer = null;
        var divHeight = parseInt(parseInt(oOut.offsetHeight) / 8);
        // alert(divHeight);
        timer = setInterval(function() {
            if (num < divHeight) {
                // num = num + 10;
                window.scrollBy(0, -divHeight);
                clearInterval(timer);
            }
            // } else {
            //     window.scrollBy(0, num - divHeight);
            //     clearInterval(timer);
            // }
        }, 50);
    }

    //toTop
    function toTop() {
        var num = 0;
        var timer = null;
        var divHeight = parseInt(parseInt(oOut.offsetHeight) * 7 / 8);
        timer = setInterval(function() {
            if (num < divHeight) {
                window.scrollBy(0, -divHeight);
                clearInterval(timer);
            }
        }, 50);
    }

    function toBottom() {
        var num = 0;
        var timer = null;
        var divHeight = parseInt(parseInt(oOut.offsetHeight) * 7 / 8);
        timer = setInterval(function() {
            if (num < divHeight) {
                window.scrollBy(0, divHeight);
                clearInterval(timer);
            }
        }, 50);
    }
};