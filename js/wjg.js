/**
 * Created by Administrator on 2015/8/26.
 */
//自定义单选
(function () {
    var added = false;
    window.myRadio = function (name) {

        var aRadio = document.getElementsByName(name);
        var aSpan = [];
        var len = aRadio.length;

        //创建元素
        for (var i = 0; i < len; i++) {
            var oSpan = document.createElement("span");
            aSpan.push(oSpan);
            oSpan.className = "my-radio";
            aRadio[i].parentNode.insertBefore(oSpan, aRadio[i]);
            aSpan[0].className = 'my-radio-active';
            //添加事件
            (function (index) {
                oSpan.onclick = function () {
                    for (var i = 0; i < aSpan.length; i++) {
                        aSpan[i].className = "my-radio";
                    }
                    this.className = "my-radio-active";

                    //联动
                    aRadio[index].checked = true;
                };

            })(i);
            //隐藏系统表单元素
            aRadio[i].style.display = "none";
        }
        /* end for loop*/


        if (added) {
            return;
        }
        added = true;
    }
})();

//自定义下拉
(function () {
    var added = false;
    window.mySelect = function (name) {
        var oSelect = document.getElementsByName(name)[0];
        //创建元素
        var oDiv = document.createElement("div");
        oDiv.className = "my-select";
        oSelect.parentNode.insertBefore(oDiv, oSelect);

        var oSpan = document.createElement("span");
        oSpan.innerHTML = oSelect.options[oSelect.selectedIndex].text;
        oDiv.appendChild(oSpan);

        oDiv.onmouseover = function () {
            oUl.style.display = "block";
        };
        oDiv.onmouseout = function () {
            oUl.style.display = "none";
        };

        var oUl = document.createElement("ul");
        oDiv.appendChild(oUl);

        //li

        for (var i = 0; i < oSelect.options.length; i++) {
            var oLi = document.createElement("li");
            oLi.innerHTML = oSelect.options[i].text;
            oUl.appendChild(oLi);

            (function (index) {
                oLi.onclick = function () {

                    oSpan.innerHTML = this.innerHTML;
                    oUl.style.display = "none";

                    //oSelect.options[index].selected = true;
                    oSelect.selectedIndex = index;
                };
            })(i);
        }

        //oSelect.style.display = "none";

        if (added) return;

        added = true;
    }
})();

window.onload = function () {
    myRadio('biao');
    mySelect('choose-time');
    mySelect('sorting-type');

    //输入框文字提示:

    var oKey = document.getElementById('keywords');
    oKey.onfocus = function () {
        this.value = '';
    };
    oKey.onblur = function () {
        if (this.value == '') {
            this.value = '大煞风景';
            this.style.color = '#999';
        }
    };
    oKey.onclick = function(){
        this.style.color = '#000';
    }


};