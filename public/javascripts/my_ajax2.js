/*封装ajax请求的代码*/
var ajax = {
    get1 : function (option){
        if(!option) return;
        this.get(option.url, option.onSuccess, option.onFail);
    },
    /*
     作者：李振超    2017年4月10日 16:36
     实现get请求
     参数1：请求的url
     参数2：响应成功之后的回调函数
     参数3：响应失败之后的回调函数
     */
    get: function (url, onSuccess, onFail){
        var xhr = window.XMLHttpRequest
            ? new XMLHttpRequest()
            : new ActiveXObject("Microsoft.XMLHTTP");
        xhr.open("GET", url, true);
        xhr.onreadystatechange = function (){
            if (xhr.readyState == 4){
                if (xhr.status == 200){
                    if (typeof onSuccess == "function"){
                        onSuccess(xhr.responseText, xhr.responseXML);
                    }
                    /*else{
                        throw new Error("你傻，第二个参数必须是一个函数")
                    }*/
                }else{
                    if (typeof onFail == "function"){
                        onFail(xhr.responseText);
                    }
                }
            }
        }
        xhr.send(null);
    },
    post: function (url, data, onSuccess, onFail){
        console.log("post请求内部");
        var xhr = window.XMLHttpRequest
            ? new XMLHttpRequest()
            : new ActiveXObject("Microsoft.XMLHTTP");
        xhr.open("POST", url, true);
        xhr.onreadystatechange = function (){
            if(xhr.readyState == 4){
                if(xhr.status == 200){
                    onSuccess(xhr.responseText);
                }else{
                    onFail(xhr.responseText);
                }
            }
        }

        //提交post请求的时候，必须要添加这个请求头，表示我们提交的表单数据经过了url编码
        if(typeof data == "string"){
            xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded")
        }
        //post请求的时候，在send函数的参数中传入要发送的数据：  xxx=aaa&yyy=abc
        xhr.send(data);
    },
    test : function (){
        console.log("aaa");
    }
}
