var nowW = 20; //当前页面状态
var nowPage = 1; //当前页数
var nowStu = 10; //当前选项
$(function() {
    initSize(); //初始化尺寸
    initMove(); //初始化运动及事件
})
window.onresize = function() {
    initSize();
};
//初始化尺寸
function initSize() {
    doMedid(); //媒体查询兼容ie8
    initHeaderSize();
    initBigBannerSize(); //初始化大图轮播部分尺寸
    initSmallBannerSize(); //初始化小图轮播部分尺寸
    initMainSize(); //初始化主要内容区
    initSideSize();
}
//初始化运动及事件
function initMove() {
    initTopMove(); //头部广告事件
    initHeaderMove(); //初始化header部分
    initBigBannerMove(); //初始化大图轮播部分的运动和事件
    initSmallBannerMove(); //初始化小图轮播部分的运动和事件
    initMainMove(); //初始化主要内容区
    initSideMove(); //初始化side部分
}
//头部广告事件
function initTopMove() {
    if (getCookie("ad_statu") == 1) {
        $("#top").css("display", "none");
    }
    $(".top_close").bind("click", function(event) {
        event.preventDefault();
        setCookie("ad_statu", 1, 20);
        $("#top").css("display", "none");
    });
}
// removeCookie("followStu");
// removeCookie("loginStu");
// removeCookie("ad_statu");

function initHeaderSize() {
    $("#login").css({
        "width": $(window).width() + "px",
        "height": $(window).height() + "px"
    });
}

function initHeaderMove() {
    $(".nav>li>a").bind("mouseover", function() {
        $(".nav").css("background", "url('./images/header_serh.png') no-repeat 406px 0");
    }).bind("mouseout", function() {
        $(".nav").css("background", "url('./images/header_ser.png') no-repeat 406px 0");
    });

    if (getCookie("followStu") == 1) {
        $(".hedu_atte").css("display", "none");
        $(".yOn").css("display", "inline-block");
    } else {
        $(".hedu_atte").css("display", "inline-block");
        $(".yOn").css("display", "none");
    }
    $(".yOn>a").bind("click", function(event) {
        event.preventDefault();
        removeCookie("followStu");
        $(".hedu_atte").css("display", "inline-block");
        $(".yOn").css("display", "none");
    });
    $(".hedu_atte").bind("click", function() {
        if (getCookie("loginStu") == 1) {
            $.ajax({
                type: "get",
                cache: false,
                url: 'http://study.163.com/webDev/attention.htm' + '?t=' + (new Date()).valueOf(),
                async: true,
                success: function(str) {
                    setCookie("followStu", 1, 10000);
                    $(".hedu_atte").css("display", "none");
                    $(".yOn").css("display", "inline-block");
                },
                error: function(str) {
                    alert("关注失败");
                }
            });
        } else {
            $("#login").css("display", "block");
        }
    });
    $(".log_close").bind("click", function() {
        $("#login").css("display", "none");
    });
    var $text = $(".login_tex input");
    $text.blur(function() {
        if (/[^.0-9a-zA-Z\\s ]/.test(this.value.trim()) || this.value.trim().length < 2 || this.value.trim().length > 20) {
            $(this).next().removeClass()
                .addClass('erring').html("✘");
        } else {
            $(this).next().removeClass()
                .addClass('oking').html("✔");
        }
    }).keyup(function() {
        $(this).triggerHandler("blur");
    }).focus(function() {
        $(this).triggerHandler("blur");
    });
    $("#submit").bind("click", function() {
        $.ajax({
            type: "get",
            cache: false,
            url: 'http://study.163.com/webDev/login.htm' + '?t=' + (new Date()).valueOf(),
            async: true,
            data: { userName: $.md5($("#user").val()), password: $.md5($("#pass").val()) },
            success: function(str) {
                if (str == 1) {
                    $("#login").css("display", "none");
                    setCookie("loginStu", 1, 5);
                } else {
                    alert("账号或密码错误");
                }
            },
            error: function(str) {
                alert("登录失败");
            }
        });
    });
}
//初始化大图轮播部分尺寸
function initBigBannerSize() {
    if (document.documentElement.clientWidth < $("#header").width()) {
        $("#big_banner").css("width", $("#header").width() + "px");
    } else {
        $("#big_banner").css("width", document.documentElement.clientWidth + "px");
    }
    $(".big_banner_out").css({
        "left": ($("#big_banner").width() - $(".big_banner_out").width()) / 2 + "px"
    });
}
//初始化大图轮播部分的运动和事件
function initBigBannerMove() {
    $(".big_banner_sub").html("");
    for (var i = 0, len = $(".big_banner_ul>li").length; i < len; i++) {
        $(".big_banner_sub").append("<span></span>");
    }
    $(".big_banner_sub").css({
        "left": ($(".big_banner_ul>li").width() - $(".big_banner_sub").width()) / 2 + "px"
    });
    $(".big_banner_sub>span:eq(0)").addClass("active");

    var iNowPic = 0;
    var timer1 = null;
    var iLength = $(".big_banner_ul>li").length;

    $(".big_banner_ul>li").fadeOut(0);
    $(".big_banner_ul>li:eq(0)").fadeIn(0);
    timer1 = setInterval(function() {
        $(".big_banner_ul>li:eq(" + (iNowPic) + ")").fadeOut(500);
        $(".big_banner_sub>span:eq(" + (iNowPic++) + ")").removeClass();
        if (iNowPic == iLength) {
            iNowPic = 0;
        }
        $(".big_banner_sub>span:eq(" + iNowPic + ")").addClass("active");
        $(".big_banner_ul>li:eq(" + iNowPic + ")").fadeIn(500);
    }, 5000);
    $(".big_banner_ul").bind("mouseover", function() {
        clearInterval(timer1);
    }).bind("mouseout", function() {
        timer1 = setInterval(function() {
            $(".big_banner_ul>li:eq(" + (iNowPic) + ")").fadeOut(500);
            $(".big_banner_sub>span:eq(" + (iNowPic++) + ")").removeClass();
            if (iNowPic == iLength) {
                iNowPic = 0;
            }
            $(".big_banner_sub>span:eq(" + iNowPic + ")").addClass("active");
            $(".big_banner_ul>li:eq(" + iNowPic + ")").fadeIn(500);
        }, 5000);
    });
    $(".big_banner_sub>span").bind("mouseover", function() {
        clearInterval(timer1);
        if ($(this).is(".active")) {
            return;
        }
        $(".big_banner_ul>li:eq(" + (iNowPic) + ")").fadeOut(300);
        $(".big_banner_sub>span:eq(" + iNowPic + ")").removeClass();
        iNowPic = $(this).prevAll().length;
        $(".big_banner_sub>span:eq(" + iNowPic + ")").addClass("active");
        $(".big_banner_ul>li:eq(" + iNowPic + ")").fadeIn(300);
    });
}
//初始化小图轮播部分尺寸
function initSmallBannerSize() {
    if (document.documentElement.clientWidth < $("#header").width()) {
        $("#small_banner").css("width", $("#header").width() + "px");
    } else {
        $("#small_banner").css("width", document.documentElement.clientWidth + "px");
    }

    $(".small_banner_out").css({
        "left": ($("#small_banner").width() - $(".small_banner_out").width()) / 2 + "px"
    });
}
//初始化小图轮播运动及事件
function initSmallBannerMove() {
    $(".small_banner_ul").html($(".small_banner_ul").html() + $(".small_banner_ul").html());
    var iLen = $(".small_banner_ul>li").length;
    $(".small_banner_ul").css({
        "width": (iLen + 1) * $(".small_banner_ul>li").width()
    });
    //定时器实现轮播

    var timer2 = null;
    timer2 = setInterval(function() {
        $(".small_banner_ul").css("left", parseInt($(".small_banner_ul").css("left")) - 1);
        if (parseInt($(".small_banner_ul").css("left")) <= -1 * $(".small_banner_ul>li").width() * iLen / 2) {
            $(".small_banner_ul").css("left", 0);
        }
    }, 5);
    $(".small_banner_ul>li").bind("mouseover", function() {
        clearInterval(timer2);
        $(this).animate({
            "opacity": 0.7
        }, 200);
    }).bind("mouseout", function() {
        $(this).animate({
            "opacity": 1
        }, 200);
        timer2 = setInterval(function() {
            $(".small_banner_ul").css("left", parseInt($(".small_banner_ul").css("left")) - 1);
            if (parseInt($(".small_banner_ul").css("left")) <= -1 * $(".small_banner_ul>li").width() * iLen / 2) {
                $(".small_banner_ul").css("left", 0);
            }
        }, 5);
    });

}

//初始化主要内容区
var theS = []; //储存获取的课程数据

function initMainMove() {
    getData(nowStu, nowPage, nowW);
    $(".main_tab").bind("click", function() {
        if ($(this).is(".active")) {
            return;
        } else {
            $(".main_tab").removeClass("active");
            $(this).addClass("active");
            if ($(this).text() == "产品设计") {
                nowStu = 10;
                getData(nowStu, nowPage, nowW);
            } else {
                nowStu = 20;
                getData(nowStu, nowPage, nowW);
            }
        }
    });
    $(".main_foot>span").bind("click", function() {
        if ($(this).is(".main_foot>span:eq(0)")) {
            if ($(".main_foot").find(".active").is(".main_foot>span:eq(1)")) {
                return;
            } else {
                $(".main_foot").find(".active").prev().addClass("active")
                    .next().removeClass("active");
                nowPage--;
                getData(nowStu, nowPage, nowW);
            }
        } else if ($(this).is(".main_foot>span:eq(4)")) {
            if ($(".main_foot").find(".active").is(".main_foot>span:eq(3)")) {
                return;
            } else {
                $(".main_foot").find(".active").next().addClass("active")
                    .prev().removeClass("active");
                nowPage++;
                getData(nowStu, nowPage, nowW);
            }
        } else if ($(this).is("active")) {
            return;
        } else {
            $(".main_foot>span").removeClass("active");
            $(this).addClass("active");
            nowPage = parseInt($(this).text());
            getData(nowStu, nowPage, nowW);
        }
    });
}

function initMainSize() {
    if (nowW == 20 && $("#content").width() <= 1000) {
        nowW = 15;
        getData(nowStu, nowPage, nowW);
    } else if (nowW == 15 && $("#content").width() >= 1000) {
        nowW = 20;
        getData(nowStu, nowPage, nowW);
    }
}
//根据类型和\,页数和数量获取数据
function getData(tp, pg, num) {
    jQuery.support.cors = true;
    $.ajax({
        type: "get",
        cache: false,
        contentType: 'text/plain',
        url: 'http://study.163.com/webDev/couresByCategory.htm' + '?t=' + (new Date()).valueOf(),
        async: true,
        data: { pageNo: pg, psize: num, type: tp },
        success: function(str) {
            str = eval("(" + str + ")");
            $.each(str, function(i, data) {
                if (i == "list") {
                    theS = data;
                }
            });
            doShow(); //渲染课表内容区
        },
        error: function(str) {
            //var err = eval("(" + str + ")");
            //alert(str);
            $.each(str, function(i, p) {
                console.log(i + ":" + p);
            });
        }
    });
}
//渲染课表内容区
function doShow() {
    $(".main_content").html("");
    for (var i = 0, len = theS.length; i < len; i++) {
        $(".main_content").append("<div class='sign_bu'></div>")
            .find(".sign_bu:eq(" + i + ")").append("<a href='' class='cl_bulk'></a>")
            .find("a:eq(0)").append("<img src=" + theS[i]['middlePhotoUrl'] + ">")
            .append("<p>" + theS[i]['name'].substr(0, 20) + "...</p>")
            .append("<span>" + theS[i]['provider'].substr(0, 10) + "</span>")
            .append("<em>" + theS[i]['learnerCount'] + "</em>")
            .append("<strong>￥&nbsp;" + theS[i]['price'] + ".00</strong>")
            .find("em").css("width", 15 + theS[i]['learnerCount'].toString().length * 9 + "px");
        $(".main_content").find(".sign_bu:eq(" + i + ")")
            .append("<div class='showAll'></div>")
            .find(".showAll").append("<div class='showAll_up clear'></div>")
            .find(".showAll_up").append("<img src=" + theS[i]['middlePhotoUrl'] + ">")
            .append("<div class='showAll_le fl'></div>")
            .find(".showAll_le").append("<h2>" + theS[i]['name'].substr(0, 9) + "..</h2>")
            .append("<em>" + theS[i]['learnerCount'] + "人在学</em>")
            .append("<p>发布者：<span>" + theS[i]['provider'].substr(0, 10) + "</span></p>")
            .append("<p>分类：<span>" + theS[i]['categoryName'] + "</span></p>")
            .parent().parent().append("<p class='intro_p'>" + theS[i]['description'].substr(0, 70) + "..</p>");
    }
    $(".cl_bulk").bind("mouseover", function() {
        $(this).next().css("display", "block");
    }).bind("mouseout", function() {
        $(this).next().css("display", "none");
    });
    $(".showAll").bind("mouseover", function() {
        $(this).css("display", "block");
    }).bind("mouseout", function() {
        $(this).css("display", "none");
    });
}


//初始化side部分
function initSideSize() {
    $("#vidio").css({
        "width": $(window).width() + "px",
        "height": $(window).height() + "px"
    });
}
var arrHot = []; //存储最热排行数据
function initSideMove() {
    $(".vid>img").bind("mouseover", function() {
        $(this).css("opacity", 0.7);
    }).bind("mouseout", function() {
        $(this).css("opacity", 1);
    }).bind("click", function() {
        $("#vidio").css("display", "block");

    });
    $(".vid_close").bind("click", function() {
        $("#vidio").css("display", "none");
    });

    getHot(); //获取最热排行数据
}
//获取最热排行数据 
function getHot() {
    $.ajax({
        type: "get",
        cache: false,
        contentType: 'text/plain',
        url: 'http://study.163.com/webDev/hotcouresByCategory.htm' + '?t=' + (new Date()).valueOf(),
        async: true,
        success: function(str) {
            str = eval("(" + str + ")")
            arrHot = str;
            //随机打乱数据使每次刷新最开始出现的推荐不一样
            arrHot.sort(function() {
                return 0.5 - Math.random();
            });
            showHot(); //渲染最热排行区
        },
        error: function(str) {
            alert("获取数据失败");
        }
    });
}
//渲染最热排行区
function showHot() {
    $(".hot_ul").html("");
    for (var i = 0, len = arrHot.length; i < len; i++) {
        $(".hot_ul").append("<li class='clear'></li>")
            .find("li:eq(" + i + ")").append("<img src=" + arrHot[i]['middlePhotoUrl'] + ">")
            .append("<div class='hot_le fl'></div>")
            .find(".hot_le").append("<p>" + arrHot[i]['name'].substr(0, 8) + "...</p>")
            .append("<em>" + arrHot[i]['learnerCount'] + "</em>");
    }
    var timer3 = null;
    var iNow = 0;
    $(".hot_ul").html($(".hot_ul").html() + $(".hot_ul").html());
    timer3 = setInterval(function() {
        if (iNow == $(".hot_ul").find("li").length / 2) {
            iNow = 0;
            $(".hot_ul").css("top", 0);
        }
        $(".hot_ul").animate({
            "top": -1 * ++iNow * parseInt($(".hot_ul>li").css("height")) + "px"
        }, 800);
    }, 5000);
    //alert($(".hot_ul>li").height());
}

// removeCookie("hahah");
// alert(document.cookie);
//设置cookie
function setCookie(name, val, iDay) {
    var oDate = new Date();
    oDate.setDate(oDate.getDate() + iDay);
    document.cookie = name + '=' + val + ';expires=' + oDate;
}

function getCookie(name) {
    var arr = document.cookie.split("; ");
    for (var i = 0, len = arr.length; i < len; i++) {
        var arr2 = arr[i].split('=');
        if (arr2[0] == name) {
            return arr2[1];
        }
    }
    return "";
}

function removeCookie(name) {
    setCookie(name, "", -1);
}


//媒体查询兼容ie8
function doMedid() {
    if ($(window).width() > 1205) {
        $(".top_con").css("width", 1206 + "px");
        $("#header").css("width", 1206 + "px");
        $("#cla_in").css("width", 1206 + "px");
        $(".ci_ul>li").css({
            "width": 360 + "px",
            "marginLeft": 63 + "px"
        });
        $(".ci_ul>.wyy_li").css({
            "marginLeft": 0
        });
        $(".ci_ul>li>div").css({
            "width": 240 + "px",
            "marginLeft": 110 + "px"
        });
        $(".footer_cin").css({
            "width": 1206 + "px",
        });
        $("#content").css("width", 1206 + "px");
        $(".main").css("width", 980 + "px");
    } else {
        $(".top_con").css("width", 965 + "px");
        $("#header").css("width", 965 + "px");
        $("#cla_in").css("width", 965 + "px");
        $(".ci_ul>li").css({
            "width": 280 + "px",
            "marginLeft": 62 + "px"
        });
        $(".ci_ul>.wyy_li").css({
            "marginLeft": 0
        });
        $(".ci_ul>li>div").css({
            "width": 180 + "px",
            "marginLeft": 100 + "px"
        });
        $(".footer_cin").css({
            "width": 965 + "px",
        });
        $("#content").css("width", 965 + "px");
        $(".main").css("width", 740 + "px");
    }
}










// md5加密
(function($) {
    var rotateLeft = function(lValue, iShiftBits) {
        return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
    }
    var addUnsigned = function(lX, lY) {
        var lX4, lY4, lX8, lY8, lResult;
        lX8 = (lX & 0x80000000);
        lY8 = (lY & 0x80000000);
        lX4 = (lX & 0x40000000);
        lY4 = (lY & 0x40000000);
        lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
        if (lX4 & lY4) return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
        if (lX4 | lY4) {
            if (lResult & 0x40000000) return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
            else return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
        } else {
            return (lResult ^ lX8 ^ lY8);
        }
    }
    var F = function(x, y, z) {
        return (x & y) | ((~x) & z);
    }
    var G = function(x, y, z) {
        return (x & z) | (y & (~z));
    }
    var H = function(x, y, z) {
        return (x ^ y ^ z);
    }
    var I = function(x, y, z) {
        return (y ^ (x | (~z)));
    }
    var FF = function(a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(F(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    };
    var GG = function(a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(G(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    };
    var HH = function(a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(H(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    };
    var II = function(a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(I(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    };
    var convertToWordArray = function(string) {
        var lWordCount;
        var lMessageLength = string.length;
        var lNumberOfWordsTempOne = lMessageLength + 8;
        var lNumberOfWordsTempTwo = (lNumberOfWordsTempOne - (lNumberOfWordsTempOne % 64)) / 64;
        var lNumberOfWords = (lNumberOfWordsTempTwo + 1) * 16;
        var lWordArray = Array(lNumberOfWords - 1);
        var lBytePosition = 0;
        var lByteCount = 0;
        while (lByteCount < lMessageLength) {
            lWordCount = (lByteCount - (lByteCount % 4)) / 4;
            lBytePosition = (lByteCount % 4) * 8;
            lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
            lByteCount++;
        }
        lWordCount = (lByteCount - (lByteCount % 4)) / 4;
        lBytePosition = (lByteCount % 4) * 8;
        lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
        lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
        lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
        return lWordArray;
    };
    var wordToHex = function(lValue) {
        var WordToHexValue = "",
            WordToHexValueTemp = "",
            lByte, lCount;
        for (lCount = 0; lCount <= 3; lCount++) {
            lByte = (lValue >>> (lCount * 8)) & 255;
            WordToHexValueTemp = "0" + lByte.toString(16);
            WordToHexValue = WordToHexValue + WordToHexValueTemp.substr(WordToHexValueTemp.length - 2, 2);
        }
        return WordToHexValue;
    };
    var uTF8Encode = function(string) {
        string = string.replace(/\x0d\x0a/g, "\x0a");
        var output = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                output += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                output += String.fromCharCode((c >> 6) | 192);
                output += String.fromCharCode((c & 63) | 128);
            } else {
                output += String.fromCharCode((c >> 12) | 224);
                output += String.fromCharCode(((c >> 6) & 63) | 128);
                output += String.fromCharCode((c & 63) | 128);
            }
        }
        return output;
    };
    $.extend({
        md5: function(string) {
            var x = Array();
            var k, AA, BB, CC, DD, a, b, c, d;
            var S11 = 7,
                S12 = 12,
                S13 = 17,
                S14 = 22;
            var S21 = 5,
                S22 = 9,
                S23 = 14,
                S24 = 20;
            var S31 = 4,
                S32 = 11,
                S33 = 16,
                S34 = 23;
            var S41 = 6,
                S42 = 10,
                S43 = 15,
                S44 = 21;
            string = uTF8Encode(string);
            x = convertToWordArray(string);
            a = 0x67452301;
            b = 0xEFCDAB89;
            c = 0x98BADCFE;
            d = 0x10325476;
            for (k = 0; k < x.length; k += 16) {
                AA = a;
                BB = b;
                CC = c;
                DD = d;
                a = FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
                d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
                c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
                b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
                a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
                d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
                c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
                b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
                a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
                d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
                c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
                b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
                a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
                d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
                c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
                b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
                a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
                d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
                c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
                b = GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
                a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
                d = GG(d, a, b, c, x[k + 10], S22, 0x2441453);
                c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
                b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
                a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
                d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
                c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
                b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
                a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
                d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
                c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
                b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
                a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
                d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
                c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
                b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
                a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
                d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
                c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
                b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
                a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
                d = HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
                c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
                b = HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
                a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
                d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
                c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
                b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
                a = II(a, b, c, d, x[k + 0], S41, 0xF4292244);
                d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
                c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
                b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
                a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
                d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
                c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
                b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
                a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
                d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
                c = II(c, d, a, b, x[k + 6], S43, 0xA3014314);
                b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
                a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
                d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
                c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
                b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
                a = addUnsigned(a, AA);
                b = addUnsigned(b, BB);
                c = addUnsigned(c, CC);
                d = addUnsigned(d, DD);
            }
            var tempValue = wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d);
            return tempValue.toLowerCase();
        }
    });
})(jQuery);