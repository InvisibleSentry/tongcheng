/**
 * Created by ${蔡佳玉} on 2017/4/25.
 */

$(function(){
    function appendCity(){
        $.get("127.0.0.1:3000/citylist/city_data",'city=beijing',function(data){
            console.log(data)
            console.log('a')

        })
        // $("#city").append('<option></option>')
    }
    appendCity();
    // $("#city").append('<option>北京</option>')
    // jQuery.load('html')
})