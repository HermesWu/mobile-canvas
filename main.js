var canvas = document.getElementById('x')
var context = canvas.getContext('2d')
autoSetCanvasSize(canvas)
listenToUser(canvas, context)
/**
 *
 *私有工具函数
 */
function getSize (canvas) {
	var pageWidth = document.documentElement.clientWidth
	var pageHeight = document.documentElement.clientHeight
	canvas.width = pageWidth
	canvas.height = pageHeight
}

function drawCirle (x, y, radius) {
	context.beginPath()
	context.arc(x, y, radius, 0, Math.PI *2)
	context.fill()
}
function drawLine (x1, y1, x2, y2) {
	context.beginPath()
	context.moveTo(x1, y1)
	context.lineWidth = 5
	context.lineTo(x2, y2)
	context.stroke()
	context.closePath()

}
function autoSetCanvasSize(canvas) {
	getSize(canvas)
	window.onresize = function () {
		getSize(canvas)
	}	
}
function listenToUser(canvas, context) {
	var lastPoint = {'x': undefined, 'y': undefined}
	var using = false
	var eraserEnabled = false
	if(document.body.ontouchstart !== undefined) {
		canvas.ontouchstart = function (e) {
			var x = e.touches[0].clientX
			var y = e.touches[0].clientY
			using = true
			if(eraserEnabled) {
				context.clearRect(x-5, y-5, 10, 10)
			}else {
			 	lastPoint= {'x': x, 'y': y}
			}
		}
		canvas.ontouchmove = function (e) {
			e.preventDefault();
			var x = e.touches[0].clientX
			var y = e.touches[0].clientY
			if(using) {
				if(eraserEnabled) {
					context.clearRect(x-5, y-5, 10, 10)
				}
				else{
					var newPoint = {'x': x, 'y': y}
					drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
					lastPoint = newPoint
				}
			}
		}
		canvas.ontouchend = function (e) {
			using = false
		}
	}else {
		canvas.onmousedown = function (e) {
			var x = e.clientX
			var y = e.clientY
			using = true
			if(eraserEnabled) {
				context.clearRect(x-5, y-5, 10, 10)
			}else {
			 	lastPoint= {'x': x, 'y': y}
			}
		}
		canvas.onmousemove = function (e) {
			var x = e.clientX
			var y = e.clientY
			if(using) {
				if(eraserEnabled) {
					context.clearRect(x-5, y-5, 10, 10)
				}
				else{
					var newPoint = {'x': x, 'y': y}
					drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
					lastPoint = newPoint
				}
			}
		}
		canvas.onmouseup = function (e) {
			using = false
		}
	}

	
	
	eraser.onclick = function (e) {
		eraserEnabled = true
		actions.className = 'actions x'
	}
	brush.onclick = function (e) {
		eraserEnabled = false
		actions.className = 'actions'
	}
}
