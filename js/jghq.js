/**
 * Created by Administrator on 2015/8/25.
 */
(function () {
    var added = false;
    window.makeUpSelect = function (name) {
        var oSel = document.getElementsByName(name)[0];
        var oDiv = document.createElement('div');
        oDiv.className = 'jghq-select';
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
window.onload = function () {
    makeUpSelect('all-time');
};