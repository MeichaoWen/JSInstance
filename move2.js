function getStyle(obj, name) {
	if (obj.currentStyle) {
		return obj.currentStyle[name]
	} else {
		return getComputedStyle(obj, false)[name]
	}
}

function startMove(obj, json, fnEnd) {
	clearInterval(obj.timer)
	obj.timer = setInterval(function () {
		var bStop = true
		for (var attr in json) {
			var cur = 0
			if (attr == 'opacity') {
				cur = Math.round(parseFloat(getStyle(obj, attr)) * 100)
			} else {
				cur = parseInt(getStyle(obj, attr))
			}
			var speed = (json[attr] - cur) / 3
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed)
			if (cur != json[attr]) //如果运动未执行完毕，将 bStop 设置为 false
			{
				bStop = false
			}
			if (attr == 'opacity') {
				obj.style.opacity = (cur + speed) / 100
			} else {
				obj.style[attr] = cur + speed + 'px'
			}
		}
		if (bStop) { //只有当所有运动执行完毕时，才会清除定时器
			clearInterval(obj.timer)
			if (fnEnd) fnEnd()
		}
	}, 30)
}