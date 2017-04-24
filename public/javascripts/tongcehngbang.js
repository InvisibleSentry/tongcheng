/**
 * Created by SJay on 2017/4/23.
 */
$(function(){
    console.log($("#map"));
    $('#map').click(function(){
        $("#gaodeMap").css("display","block")
    })
    $('#gaodeClose').click(function(){
        $("#gaodeMap").css("display","none")
    })
})
