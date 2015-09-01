/**
 * Created by Administrator on 2015/8/24.
 */
window.onload = function () {
    //文字超出隐藏
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
            var textId = getByClass(document, 'hyrw-text');
            for (var i = 0; i < textId.length; i++) {

                var nowLeng = textId[i].innerHTML.length;
                if (nowLeng > 85) {
                    var nowWord = textId[i].innerHTML.substr(0, 85) + '······';
                    textId[i].innerHTML = nowWord;
                }
            }
        }

        testAuto();

        var oHover = getByClass(document, 'color-red');

        for (var i = 0; i < oHover.length; i++) {
            oHover[i].onmouseover = function () {
                for(var i=0;i<oHover.length;i++){
                    oHover[i].style.color='#fd4526';
                }
                this.style.color='#fd4522';
            }
            oHover[i].onmouseout = function () {

                this.style.color='#fd4526';
            }
        }


    })();

    //右上角banner
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
};