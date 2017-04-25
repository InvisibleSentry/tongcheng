/**
 * Created by ${蔡佳玉} on 2017/4/25.
 */
var express = require('express');
var router = express.Router();
var fs=require('fs');

router.get('/city_data',function(){
    fs.readFile('../360Data/data/city_data.json',function(err,text){
        res.send(text)
    })
})

/* GET home page. */
router.get('/shop_data', function(req, res, next) {
    res.render('index', { title: 'Express' });
    var city=req.query.adrr_city;
    var area=req.query.adrr_area;
    var order=req.query.order;
    fs.readFile('../360Data/data/shop_data.json',function(err,text){
        var data=JSON.parse(text);
        console.log(''+city+area);

    })
});

module.exports = router;
