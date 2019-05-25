window.onload = function() {
    /* 数据格式演示
    var aqiSourceData = {
    "北京": {
        "2016-01-01": 10,
        "2016-01-02": 10,
        "2016-01-03": 10,
        "2016-01-04": 10
    }
    };
    */

    // 以下两个函数用于随机模拟生成测试数据
    function getDateStr(dat) {
        var y = dat.getFullYear();
        var m = dat.getMonth() + 1;
        m = m < 10 ? '0' + m : m;
        var d = dat.getDate();
        d = d < 10 ? '0' + d : d;
        return y + '-' + m + '-' + d;
    }

    function randomBuildData(seed) {
        var returnData = {};
        var dat = new Date("2016-01-01");
        var datStr = ''
        for (var i = 1; i < 92; i++) {
            datStr = getDateStr(dat);
            returnData[datStr] = Math.ceil(Math.random() * seed);
            dat.setDate(dat.getDate() + 1);
        }
        return returnData;
    }

    var aqiSourceData = {
        "北京": randomBuildData(500),
        "上海": randomBuildData(300),
        "广州": randomBuildData(200),
        "深圳": randomBuildData(100),
        "成都": randomBuildData(300),
        "西安": randomBuildData(500),
        "福州": randomBuildData(100),
        "厦门": randomBuildData(100),
        "沈阳": randomBuildData(500)
    };

    // 用于渲染图表的数据
    var chartData = {};

    // 记录当前页面的表单选项
    var pageState = {
        nowSelectCity: "北京",
        nowGraTime: "day"
    }

    /**
     * 渲染图表
     */
    function renderChart() {
        var oShow = document.getElementById('aqi-chart-wrap');
        oShow.innerHTML = "<div id='showText' ></div>";
        var oDa = Object.getOwnPropertyNames(aqiSourceData[pageState.nowSelectCity]);
        //alert(chartData[pageState.nowGraTime][pageState.nowSelectCity]);
        var arr = chartData[pageState.nowGraTime][pageState.nowSelectCity];
        var i = 0;

        //使用定时器渲染，做出动态效果
        var timer = setInterval(function() {
            var oDiv = document.createElement('div');
            oDiv.style.height = parseInt(arr[i]) + "px";
            oDiv.style.top = 540 - parseInt(arr[i]) + "px";
            oDiv.className = pageState.nowGraTime;
            var sr = (10 - parseInt(arr[i] / 50)) == 10 ? 9 : (10 - parseInt(arr[i] / 50));
            var sy = 5 - parseInt(arr[i] / 100);
            oDiv.style.backgroundColor = "#" + sr + sy + "5" + sr + "9" + sy;
            oShow.appendChild(oDiv);
            oDiv.index = i;
            oDiv.onmouseover = function() {
                var oTex = document.getElementById('showText');
                oTex.style.display = "block";
                if (pageState.nowGraTime == "day") {

                    oTex.innerHTML = pageState.nowSelectCity + " &nbsp;&nbsp;&nbsp;" + oDa[this.index] + "</br>粒度：" + arr[this.index];
                }
                if (pageState.nowGraTime == "week") {
                    var wek = 0;
                    if (this.index < 5) {
                        wek = this.index + 1;
                    } else if (this.index < 9) {
                        wek = this.index - 4;
                    } else {
                        wek = this.index - 8;
                    }
                    oTex.innerHTML = pageState.nowSelectCity + " &nbsp;&nbsp;&nbsp;" + oDa[this.index * 7].substring(0, 7) + "月第" + wek + "周</br>粒度：" + parseInt(arr[this.index]);
                }
                if (pageState.nowGraTime == "month") {

                    oTex.innerHTML = pageState.nowSelectCity + " &nbsp;&nbsp;&nbsp;" + oDa[this.index * 32].substring(0, 7) + "</br>粒度：" + parseInt(arr[this.index]);
                }
            }
            oDiv.onmouseout = function() {
                var oTex = document.getElementById('showText');
                oTex.style.display = "none";
            }
            i++;
            if (i >= arr.length) {
                clearInterval(timer);
            }
        }, 30)
    }

    /**
     * 日、周、月的radio事件点击时的处理函数
     */
    function graTimeChange() {
        // 确定是否选项发生了变化 
        var oTi = document.getElementById('form-gra-time');
        var oIn = oTi.getElementsByTagName('input');
        for (var i = 0; i < oIn.length; i++) {
            if (oIn[i].checked) {
                if (oIn[i].value != pageState.nowGraTime) {
                    pageState.nowGraTime = oIn[i].value;
                    renderChart();
                }
            }
        }
        // 设置对应数据
        // 调用图表渲染函数
    }

    /**
     * select发生变化时的处理函数
     */
    function citySelectChange(x) {
        // 确定是否选项发生了变化 
        if (x.value != pageState.nowSelectCity) {
            pageState.nowSelectCity = x.value;
        }

        // 设置对应数据

        // 调用图表渲染函数
        renderChart();
    }

    /**
     * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
     */
    function initGraTimeForm() {
        var oTim = document.getElementById('form-gra-time');
        if (oTim && oTim.addEventListener) {
            oTim.addEventListener('change', function() {
                graTimeChange();
            }, false);
        }
    }

    /**
     * 初始化城市Select下拉选择框中的选项
     */
    function initCitySelector() {
        // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
        var oCits = document.getElementById('city-select');
        var sName = Object.getOwnPropertyNames(aqiSourceData);
        oCits.innerHTML = "";
        (function() {
            for (var i = 0; i < sName.length; i++) {
                var oOpt = document.createElement('option');
                oOpt.innerHTML = sName[i];
                oCits.appendChild(oOpt);
            }
        })();
        // 给select设置事件，当选项发生变化时调用函数citySelectChange
        if (oCits && oCits.addEventListener) {
            oCits.addEventListener('change', function() {

                citySelectChange(this);
            }, false);
        }
    }

    /**
     * 初始化图表需要的数据格式
     */
    function initAqiChartData() {
        // 将原始的源数据处理成图表需要的数据格式
        // 处理好的数据存到 chartData 中
        var oda = {};
        var owe = {};
        var omo = {};
        var oCity = Object.getOwnPropertyNames(aqiSourceData);
        for (var i = 0; i < oCity.length; i++) {
            var oDa = Object.getOwnPropertyNames(aqiSourceData[oCity[i]]);
            var arrday = [];
            var arrweek = [];
            var arrmonth = [];
            (function() {
                for (var j = 0; j < 91; j++) {
                    arrday.push(parseFloat(aqiSourceData[oCity[i]][oDa[j]]));
                }
            })();
            (function() {
                var j = 0;
                for (var k = 0; k < 13; k++) {
                    arrweek.push(0);
                    for (; j < (k + 1) * 7; j++) {
                        arrweek[k] += arrday[j];
                    }
                    arrweek[k] /= 7;
                }
            })();
            (function() {
                var j = 0;
                for (var k = 0; k < 3; k++) {
                    arrmonth.push(0);
                    for (; j < (k + 1) * 30; j++) {
                        arrmonth[k] += arrday[j];
                    }
                    arrmonth[k] /= 30;
                }
            })();
            oda[oCity[i]] = arrday;
            owe[oCity[i]] = arrweek;
            omo[oCity[i]] = arrmonth;
            //alert(oda[oCity[i]][1]+"ppp"+owe[oCity[i]][1]+"ppp"+omo[oCity[i]][1]);
        }
        chartData["day"] = oda;
        chartData["week"] = owe;
        chartData["month"] = omo;
    }

    /**
     * 初始化函数
     */
    function init() {
        initGraTimeForm()
        initCitySelector();
        initAqiChartData();
        renderChart();
    }

    init();
};