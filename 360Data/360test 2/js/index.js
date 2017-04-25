$(function () {

	//全局缓存城市数据
	var globalCityData = null;
	var globalPageSize = 5;
	var globalPageNo = 1;
	var globalTotalCount = 0;

	//
	var globalCity = 'shen_zhen';
	var globalRegion = null;
	var globalOrderBy = null;


	//初始化城市、地区下拉框
	function initSel () {
		$.ajax({
			url : 'http://127.0.0.1:3000/getCityData',
			type : 'get',
			dataType : 'json',
			success : function (data) {
				console.log(data);

				//缓存到全局变量
				globalCityData = data;	

				//遍历citylist
				for (var tempCityObj of data.citylist) {
					//创建城市opiton
					createOptionByCity(tempCityObj, $('#city_sel'));
					if (tempCityObj.code == globalCity) {
						//遍历深圳下的区县列表
						for (var tempRegionObj of tempCityObj.regionlist) {
							//创建区县option
							 createOptionByRegion(tempRegionObj, $('#region_sel'));	
						}						
					}
				}
			}
		});
	}

	initSel();

	// console.log(globalCityData);

	//创建option
	function createOptionByCity (obj, sel) {

		$('<option value="' + obj.code + '">' + obj.name + '</option>').appendTo(sel);				
	}

	function createOptionByRegion (obj, sel) {

		$('<option>' + obj.name + '</option>').appendTo(sel);				
	}


	//城市change
	$('#city_sel').on('change', function () {

		//改变全局城市变量
		globalCity = $(this).val();

		console.log(globalCity);

		//先清空之前数据
		$('#region_sel').empty().append('<option>选择区县</option>');
		// console.log($(this).val());
		// console.log(globalCityData);
		for (var tempCityObj of globalCityData.citylist) {
			if ($(this).val() == tempCityObj.code) {
				for (var tempRegionObj of tempCityObj.regionlist) {
					createOptionByRegion(tempRegionObj, $('#region_sel'));
				}
			}
		}

		//重新初始化分页按钮以及数据
		initBtn();

	});

	//区县change
	$('#region_sel').on('change', function () {
		//存储全局选择区县
		globalRegion = $(this).val();
		console.log(globalRegion);
		initBtn();
	});

	//排序点击
	$('#orderBy_ul li').on('click', function () {
		// console.log($(this).attr('orderBy'));
		//全局保存排序条件
		globalOrderBy = $(this).attr('orderBy');

		$(this).addClass('selected').siblings().removeClass('selected');

		initBtn();
	});



	//初始化分页按钮
	function initBtn () {

		//重新初始化页码为1
		globalPageNo = 1;
		//初始化某些按钮样式
		$('#fenye .head').css('display', 'none');
		$('#fenye .prev').css('display', 'none');

		if (globalPageNo == 1) {
			$('#fenye .head').css('display', 'none');
			$('#fenye .prev').css('display', 'none');
		} else {
			$('#fenye .head').css('display', 'inline-block');
			$('#fenye .prev').css('display', 'inline-block');
		}

		if (globalPageNo == Math.ceil(globalTotalCount / globalPageSize)) {
			$('#fenye .foot').css('display', 'none');
			$('#fenye .next').css('display', 'none');
		} else {
			$('#fenye .foot').css('display', 'inline-block');
			$('#fenye .next').css('display', 'inline-block');
		}

		//每次先把之前的分页按钮清空
		$('#fenye [name=s]').remove();

		$.ajax({
			url : 'http://127.0.0.1:3000/getShopData',
			type : 'get',
			dataType : 'json',
			data : {
				city : globalCity,
				region : globalRegion,
				orderBy : globalOrderBy,
				pageSize : globalPageSize,
				pageNo : globalPageNo
			},
			success : function (data) {
				// console.log(data);
				//缓存总数
				globalTotalCount = data.total_count;

				// console.log(globalTotalCount);


				for (var i = Math.ceil(globalTotalCount / globalPageSize); i >= 1; i--) {
					var $a = $('<a href="###" name="s" >' + i + '</a>');
					if (i == globalPageNo) {
						$a.addClass('selected');
					}
					$('.prev').after($a);
				}

				//绑定事件
				$('#fenye a').on('click', fenyeFn);

				//显示数据
				// showData(globalCity, globalRegion, globalOrderBy, globalPageSize, globalPageNo);
				showData();
				// initBtn();
			}
		});
	}

	initBtn();

	//分页函数
	function fenyeFn () {
		//1、计算pageNo
		switch ($(this).html()) {
			case '首页' : 
				globalPageNo = 1;
			break;
			case '&lt;&lt;上一页' :
				globalPageNo--;
			break;
			case '下一页&gt;&gt;' :
				globalPageNo++;
			break;
			case '尾页' :
				globalPageNo = Math.ceil(globalTotalCount / globalPageSize);
			break;
			default :
				globalPageNo = parseInt($(this).html());
		}

		console.log(globalPageNo);

		//2、处理首尾、上下按钮隐藏显示
		if (globalPageNo == 1) {
			$('#fenye .head').css('display', 'none');
			$('#fenye .prev').css('display', 'none');
		} else {
			$('#fenye .head').css('display', 'inline-block');
			$('#fenye .prev').css('display', 'inline-block');
		}

		if (globalPageNo == Math.ceil(globalTotalCount / globalPageSize)) {
			$('#fenye .foot').css('display', 'none');
			$('#fenye .next').css('display', 'none');
		} else {
			$('#fenye .foot').css('display', 'inline-block');
			$('#fenye .next').css('display', 'inline-block');
		}

		//3、处理选择样式
		var $s_a = $('#fenye [name=s]');
		$s_a.removeClass('selected');

		$s_a[globalPageNo - 1].className = 'selected';

		//4、显示数据
		// showData('shen_zhen', null, null, globalPageSize, globalPageNo);
		showData();

	}


	//数据展示
	// function showData (city, region, orderBy, pageSize, pageNo) {
	function showData () {
		$.ajax({
			url : 'http://127.0.0.1:3000/getShopData',
			type : 'get',
			dataType : 'json',
			data : {
				city : globalCity,
				region : globalRegion,
				orderBy : globalOrderBy,
				pageSize : globalPageSize,
				pageNo : globalPageNo
			},
			success : function (data) {
				var str = ``;
				for (var tempShopObj of data.shop_data) {
					str += `<tr>
								<td width="10%">
									<img src="${ tempShopObj.shop_ico }">
								</td>
								<td width="45%">
									<p class="wxcenter">${ tempShopObj.shop_name }</p>
									<p class="grade">&nbsp;&nbsp;店铺等级:${ tempShopObj.level }</p>
									<p class="main">主营：${ tempShopObj.main }</p>
									<p class="address">地址：${ tempShopObj.addr }</p>
								</td>
								<td width="25%">
									<p class="pf">先行赔付</p>
									<p class="rz">同城帮认证</p>
									<p class="rq">人气：${ tempShopObj.shop_visit }次浏览</p>
								</td>
								<td width="20%">
									<a href="shop.html" class="enter_dp">进入店铺</a>
								</td>
							</tr>`;
				}

				$('#tab').html(str);
				
			}
		});
	}







})