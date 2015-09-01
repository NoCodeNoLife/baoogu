/**
 * Created by w on 2015/8/17.
 */

window.onload = function() {
    $(".top-bannerhide").animate({height:'100px'});
    $(".banner-cols").click(function(){
        $(".top-bannerhide").animate({height:'0px'});

    })
};
$(document).ready(function(){
    $(".search_id").focusin(function(){
        if(this.value=='请输入文章标题'){
            this.value='';
            $(this).css({"color":"#000000"})
        }
    });
    $(".search_id").focusout(function(){
        if(this.value==''){
            this.value='请输入文章标题';
            $(this).css({"color":"#9b9a9a"})
        }
    });









});







