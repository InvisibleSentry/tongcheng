/**
 * Created by SJay on 2017/4/23.
 */
$(function(){
    $('#map').click(function(){
        $("#gaodeMap").css("display","block")
    })
    $('#gaodeClose').click(function(){
        $("#gaodeMap").css("display","none")
    })

    $('#changeCityBtn').click(function(){
        $("#changeCity").css("display","block")
    })
    $("#closeBtn").click(function(){
        $("#changeCity").css("display","none")
    })



})
