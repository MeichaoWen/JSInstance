function getStyle(obj, name) {
	if (obj.currentStyle) {
		return obj.currentStyle[name]
	} else {
		return getComputedStyle(obj, false)[name]
	}
}

function startMove(obj, attr, iTarget, fnEnd) {
	clearInterval(obj.timer)
	obj.timer = setInterval(function () {
		var cur = 0
		if (attr == 'opacity') {
			cur = Math.round(parseFloat(getStyle(obj, attr)) * 100)
		} else {
			cur = parseInt(getStyle(obj, attr))
		}
		var speed = (iTarget - cur) / 3
		speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed)
		if (cur == iTarget) {
			clearInterval(obj.timer)
			if(fnEnd)fnEnd() //如果有回调函数，执行
		} else {
			if (attr == 'opacity') {
				obj.style.opacity = (cur + speed) / 100
			} else {
				obj.style[attr] = cur + speed + 'px'
			}
		}
	}, 30)
}