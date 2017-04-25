var express = require('express');
var app = express();
var fs = require('fs');


//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

// app.get('/', function (req, res) {
//   res.send('Hello World!');
// });


//城市地区数据接口
app.get('/getCityData', function (req, res) {
  // res.send('city data..');

  fs.readFile('./data/city_data.json','utf-8',function (err, data) {
	    if (err) {
	         console.error(err);
	    }else {
	    	console.log(typeof data);
	        res.send(data);
	    }
	})
});


//店铺数据接口
app.get('/getShopData', function (req, res) {
  
  fs.readFile('./data/shop_data.json','utf-8',function (err, data) {
	    if (err) {
	         console.error(err);
	    }else {
	    	
	    	console.log(req.query);

	    	//转换成对象字面量
	    	var dataObj = JSON.parse(data);

	    	//创建一个空数组 用来存储每次查询的数据
	    	var resultData = [];

	    	//处理过滤。。。
	    	//判断是否选择区县（城市不用判断，因为是必选项。。）
	    	if (req.query.region != null && req.query.region != '') {
	    		for (var tempShopObj of dataObj.shop_data) {
	    			if (req.query.region == tempShopObj.addr_area) {
	    				//把每次匹配到的商铺对象添加到最后的数组中
	    				resultData.push(tempShopObj);
	    			}
	    		}
	    	} else {
	    		//如果没有地区的条件，那么就是该城市下的所有地区
	    		for (var tempShopObj of dataObj.shop_data) {
	    			if (req.query.city == tempShopObj.addr_city_code) {
	    				//把每次匹配到的商铺对象添加到最后的数组中
	    				resultData.push(tempShopObj);
	    			}
	    		}
	    	}

	    	//处理排序。。。（注意：这里直接去排序过滤好的数据即可）
	    	if (req.query.orderBy != null && req.query.orderBy != '') {
	    		var orderBy = req.query.orderBy;
	    		//冒泡排序
	    		for (var i = 0; i < resultData.length; i++) {
	    			for (var j = 0; j < resultData.length - i - 1; j++) {
	    				if (parseInt(resultData[j][orderBy]) <= parseInt(resultData[j + 1][orderBy])) {
	    					//交换数组元素位置
	    					// [a, b] = [b, a];
	    					[resultData[j], resultData[j + 1]] = 
	    					[resultData[j + 1], resultData[j]];
	    				}
	    			}
	    		}
	    	}

	        res.send(resultData);
	    }
	})
});


app.listen(3000, function () {
	console.log("360同城帮服务器启动成功。。。");
});