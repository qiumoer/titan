//console.log(22)
	/*毎修改一次需要重新开启服务器（node http.js指令） 借用浏览器请求本服务器需要添加listen(8888)端口及本http.js的文件在电脑的路径*/
var http = require('http');
var fs = require('fs');
var url = require('url');
var querystring = require('querystring');
//引入模块 ./相对路径不可以，必须要加./
//var route = require('./ruter.js');
//console.log(http)
//createServer是http的一个方法，创建一个服务，用来接受连接
http.createServer(function(request, response) {
	//将里面的文字转为utf-8
	request.setEncoding('utf-8');

	//请求头
	//获取url参数（可以用浏览器请求）query：指的是http。js || name=xia&skill=qiumoer
	var pathStr = url.parse(request.url).query;
	//获取url的路由（文件名）
	//console.log(pathStr) pathname：指的是这个http。js的文件   即http://127.0.0.1:8020/8-5day22/nodeserver/后面的login.html文件
	var paraname = url.parse(request.url).pathname;
	//console.log(paraname)
	//模拟php $_GET  拿到请求回来的参数 ?后面的参数
	var param = querystring.parse(pathStr);console.log(param)
	//console.log(param)
	//?name=xia&skill=qiumoer,console.log(param)请求到的是name=xia&skill=qiumoer
	//判断有没有这个参数 param['name']==>xia
	console.log(param['name']);
	/*if(param['name']) {
		var name = '{"name":"yue","skill":"lin"}';
	}*/
	//获取文件
	//异步
	//fs.readFile("xia.txt");
	//同步
	//fs.readFileSync("xia.txt");

	//封装一个回调函数
	var obj = {
			name: "xiayuelin",
			age: "24",
			sex: "girl",
			skill: ['php', 'ps']
		}
		//将对象转为字符串类型，因为json本来就是字符串类型
	var objstr = JSON.stringify(obj);
	//jsonp标准写法需要有个回调函数，param['callback']是接收回来的函数，如果前端callback=JSON_CALLBACK，后端写的函数名必须也是JSON_CALLBACK，param['callback']+"("+objstr+")"中则返回objstr的对象 一般都是将数据放入回调函数传送出去
	var jsonp = param['callback'] + "(" + objstr + ")";
	//响应状态码 200响应成功
	//响应头
	response.writeHead(200,{
		//响应头更改编码格式
			'Content-Type': "text/html;charset=utf-8",

	});
		//判断请求的是哪个文件 pathname：拿到的地址需要处理，所以直接拿home文件传参  //此方法为node.js路由
	switch(paraname) {
		case '/index':
			rebotInfo(param,response,'/publish/app/list//day/2016-08-09.json');
			break;
		case '/news':
			rebotInfo(param,response,'/publish/app/list/newsHandle/newsHandleList.json');
			//www1.ttplus.cn/publish/app/list/newsHandle/newsHandleList.json
			break;
		case '/news2':	
			rebotInfo(param,response,'/publish/app/list//all/1494.json');
			break;
		case '/twoh':
			rebotInfo(param,response,'/publish/app/list//live/752.json');
		break;
		case '/indexs':
				rebotInfo(param,response,param['name']);
		break;
	};

	//响应体re end传出去的必须是字符串类型
	//restponse.end(jsonp);
	//端口号
}).listen(8888);

/*function routeHtml(response, pathname){
	console.log(pathname)
	//readFil为异步接受到pathname的形参地址，有个回调函数，将这个文件传送出去
	fs.readFile(pathname+".html", function(err, data) {
		
		//console.log(data.toString());
		response.end(data);
	})
}*/
//请求服务
function rebotInfo(param,response,link) {
	//var info = querystring.stringify(data);
		//发送请求
		http.request({
			//域名
			hostname: 'www1.ttplus.cn',
			//端口号
			port: '80',
			//路由和参数
			path: link,
			method: 'GET',
		}, function(resquest) {
			//设置请求的一个编码格式（告诉它我是utf-8格式）
			resquest.setEncoding('utf8');
			//console.log(resquest)
			//监听请求resquest的结果 类似于js中on addenentlistener
			var str = "";
			resquest.on('data', function(data) {
					//打印响应回来的信息
			//console.log(data);
					//转字符串编码
				//response.end(data.toString())toString 数组转字符串
	//			response.end(param['callback']+'('+ data +')');
				str+= data;
				})
			//监听请求结束的事件
			resquest.on('end', function() {
				//console.log(str)
				response.end(param['callback'] + "(" + str + ")");
				//response.end(str);
			})
		}).on('error', function(e) {
					//监听resquest的错误信息
					console.log(e);
			//输出	
		}).end();
			
	
	
}