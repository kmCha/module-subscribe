# 模块间通信－观察者模式

## test
```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>模块间通信</title>
</head>
<body>
	<button>点我发送请求</button>
	<p></p>
	<script type="text/javascript" src="../src/module-subscribe.js"></script>
	<script type="text/javascript">
	window.onload = function() {
		var p = document.getElementsByTagName("p")[0];

		var ajax = (function() {
			var _send = function() {
				p.innerHTML = "正在发送ajax请求";
				setTimeout(function() {
					p.innerHTML = "请求成功返回";
					middle.trigger("ajaxSuccess", "success");
				}, 3000);
			};
			return {
				send: _send
			};
		})();
		var loadImg = (function() {
			middle.listen("ajaxSuccess", function(data) {
				loadImg.init(data);
			});

			var _init = function(data) {
				if(data === "success")
				alert("加载图片");
			};
			return {
				init: _init
			};
		})();
		document.getElementsByTagName("button")[0].onclick = function() {
			ajax.send();
		};
	};
	</script>
</body>
</html>
```