/**
 * Created by Administrator on 2015/8/18.
 */
$(function () {
    //zh-list字符超出显示省略号：
    (function () {
        function getByClass(oParent, sClass) {
            if (oParent.getElementsByClassName) {
                return oParent.getElementsByClassName(sClass);
            } else {  //IE 8 7 6
                var arr = [];
                var reg = new RegExp('\\b' + sClass + '\\b');
                var aEle = oParent.getElementsByTagName('*');
                for (var i = 0; i < aEle.length; i++) {
                    if (reg.test(aEle[i].className)) {
                        arr.push(aEle[i]);
                    }
                }
                return arr;
            }
        }

        function testAuto() {
            var textId = getByClass(document, 'zh-text');

            for(var i=0; i< textId.length;i++){
                var nowLeng = textId[i].innerHTML.length;
                if (nowLeng > 65) {
                    var nowWord = textId[i].innerHTML.substr(0, 65) + '······';
                    textId[i].innerHTML = nowWord;
                }
            }
        }

        testAuto();
        var grayImg = getByClass(document, 'gray-img');
        grayscale(grayImg);

        //输入框文字提示：
        var zhInput = getByClass(document, 'zh-input');
        var oTip = getByClass(document, 'zh-tip');
        var zhInput1 = getByClass(document, 'zh-input1');

        zhInput[0].onfocus = function () {
            oTip[0].style.display = 'none';

        };
        zhInput[0].onblur = function () {
            if (zhInput[0].value == '')//
                oTip[0].style.display = 'block';
        };
        oTip[0].onclick = function () {
            this.style.display = 'none';
            zhInput[0].focus();
        };

        zhInput1[0].onfocus = function () {
            this.value = '';
        };
        zhInput1[0].onblur = function () {
            if (this.value == '') {
                this.value = '请输入起止时间';
            }
        };
    })();

    //起止时间日历插件初始化
    $('#daterangepicker').dateRangePicker(
        {
            separator: ' 至 ',
            language: 'cn'
        }
    );
    //时间轴
    (function () {
        var sliderIcon = $('.slider-icon');
       // var sliderHover = $('.sliderHover');
        var sliderLi = $('.zh-timeLine li');
        //var sliderMove = $('.zh-timeLine a');
        var sliderActive = $('.zh-timeLine li a');
        var onoff = true;
        //for (var i = 0; i < sliderMove.length; i++) {
        //    sliderMove[i].index = i;
        //    sliderMove[i].onmouseover = function () {
        //        move(sliderHover[0], {left: this.index * 56, opacity: 1, time: 100, type: 'linaer'});
        //    }
        //    sliderMove[i].onmouseout = function () {
        //        move(sliderHover[0], {opacity: 0});
        //    }
        //}

        //for (var i = 0; i < sliderLi.length; i++) {
        //    sliderLi[i].index = i;
        //    sliderLi[i].onmouseover = function () {
        //        for (var i = 0; i < sliderLi.length; i++) {
        //            move(sliderIcon[0], {left: this.index * 56, time: 100, type: 'ease-out'});
        //            this.onoff = false;
        //        }
        //    };
        //    sliderLi[i].onmouseout = function () {
        //        if (!this.onoff) {
        //            move(sliderIcon[0], {left: this.index * 56, time: 100, type: 'ease-out'});
        //            sliderActive[0].className = 'active-slider';
        //        } else {
        //            move(sliderIcon[0], {left: 0, time: 100, type: 'ease-out'});
        //        }
        //    };
        //
        //    sliderActive[i].onclick = function () {
        //        for (var i = 0; i < sliderActive.length; i++) {
        //            sliderActive[i].className = '';
        //        }
        //        this.onoff = true;
        //        this.className = sliderActive[0].className = 'active-color';
        //        move(sliderIcon[0], {left: this.index * 56, time: 100, type: 'ease-out'});
        //    };
        //}

        for (var i = 0; i < sliderLi.length; i++) {
            sliderLi[i].index = i;
            sliderLi[i].onmouseover = function () {
                move(sliderIcon[0], {left: this.index * 56, time: 100, type: 'ease-out'});
                this.onoff = false;
                for (var i = 0; i < sliderLi.length; i++) {
                    sliderLi[i].id = '';
                }
                sliderLi[0].id = 'active-color';
            };

            sliderLi[i].onmouseout = function (ev) {
                var _this = this;
                var oEvent = ev || event;
                var oTo = oEvent.toElement || oEvent.relatedTarget;
                if (oTo && _this.contains(oTo)) {
                    sliderActive.cancelable = true;
                } else {
                    if (!this.onoff) {
                        move(sliderIcon[0], {left: 0, time: 100, type: 'ease-out'});
                    }
                }
            };

            sliderLi[i].onclick = function () {
                this.onoff = true;
                for (var i = 0; i < sliderLi.length; i++) {
                    sliderLi[i].id = '';
                }
                this.id = sliderLi[0].className = 'active-color';
            };
        }


    })();
    //右下角banner轮播
    (function () {
        var oUl = $('.zhRight-banner ul')[0];
        var oLi = oUl.children;
        var aOl = $('.zhRight-banner ol')[0];
        var aLi = aOl.children;
        var now = 0;
        var oBan = $('.zhRight-banner');
        var left = 0;

        oUl.style.width = oLi[0].offsetWidth * oLi.length + "px";

        for (var i = 0; i < aLi.length; i++) {
            (function (index) {
                aLi[i].onmouseover = function () {
                    now = index;
                    tab();
                }
            })(i);
        }
        function tab() {
            for (var i = 0; i < aLi.length; i++) {
                aLi[i].className = "";
            }
            aLi[now].className = "zhRight-banner-active";
            move(oUl, {left: -oLi[0].offsetWidth * now}, {time: 1000});
        }

        function time() {
            timer = setInterval(function () {

                if (now == aLi.length - 1) {
                    now = -1;
                } else {
                    now++;
                    tab();
                }
            }, 3000);
        };
        time();
        oUl.onmouseover = function () {
            clearInterval(timer);
        };
        oUl.onmouseout = function () {
            time();
        };
    })();
    //自定义下拉
    (function () {
        var added = false;
        window.makeUpSelect = function (name) {
            var oSel = document.getElementsByName(name)[0];
            var oDiv = document.createElement('div');
            oDiv.className = 'my_select';
            var oS = document.createElement('span');
            oS.innerHTML = oSel.options[oSel.selectedIndex].text;
            oDiv.appendChild(oS);
            var oUl = document.createElement('ul');
            oDiv.appendChild(oUl);
            for (var i = 0; i < oSel.options.length; i++) {
                var oLi = document.createElement('li');
                oLi.innerHTML = oSel.options[i].text;
                oUl.appendChild(oLi);
                (function (index) {
                    oLi.onclick = function () {
                        oS.innerHTML = this.innerHTML;
                        oSel.selectedIndex = index;
                        oUl.style.display = 'none';
                    };
                })(i);
            }
            oSel.parentNode.insertBefore(oDiv, oSel);
            oDiv.onmouseover = function () {
                oUl.style.display = "block";
            };
            oDiv.onmouseout = function () {
                oUl.style.display = "none";
            };
            oSel.style.display = 'none';
            if (added == true)return;
            added = true;
        }

    })();
    makeUpSelect('zh-year');
    makeUpSelect('zh-type');
    makeUpSelect('industry');
    makeUpSelect('status');

    //展会中心日历提示文字
    $(".rili").focusin(function(){
        if(this.value=='请输入起止时间'){
            this.value='';
            $(this).css({"color":"#666666"})
        }
    });
    $(".rili").focusout(function(){
        if(this.value==''){
            this.value='请输入起止时间';
            $(this).css({"color":"#999999"})
        }
    });

});
