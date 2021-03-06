var canvas = document.getElementById('x')
var context = canvas.getContext('2d')
var lineWidth = 5
autoSetCanvasSize(canvas)
listenToUser(canvas, context)
red.onclick = function(e){
	context.fillStyle = 'red'
	context.strokeStyle = 'red'
	red.classList.add('active')
	green.classList.remove('active')
	blue.classList.remove('active')
	yellow.classList.remove('active')
	black.classList.remove('active')
}
green.onclick = function(e){
	context.fillStyle = 'green'
	context.strokeStyle = 'green'
	green.classList.add('active')
	red.classList.remove('active')
	blue.classList.remove('active')
	yellow.classList.remove('active')
	black.classList.remove('active')
}
blue.onclick = function(e){
	context.fillStyle = 'blue'
	context.strokeStyle = 'blue'
	blue.classList.add('active')
	green.classList.remove('active')
	red.classList.remove('active')
	yellow.classList.remove('active')
	black.classList.remove('active')
}
yellow.onclick = function(e){
	context.fillStyle = 'yellow'
	context.strokeStyle = 'yellow'
	yellow.classList.add('active')
	green.classList.remove('active')
	blue.classList.remove('active')
	red.classList.remove('active')
	black.classList.remove('active')
}
black.onclick = function(e){
	context.fillStyle = 'black'
	context.strokeStyle = 'black'
	black.classList.add('active')
	green.classList.remove('active')
	blue.classList.remove('active')
	red.classList.remove('active')
	yellow.classList.remove('active')
}
thin.onclick = function (e) {
	lineWidth = 5
}
thick.onclick = function(e) {
	lineWidth = 7
}
clear.onclick = function (e) {
	context.clearRect(0, 0, canvas.width, canvas.height)
}
save.onclick = function (e) {
	var url = canvas.toDataURL('image/png')
	var a = document.createElement('a')
	a.href = url
	document.body.appendChild(a)
	a.download = '我的画板'
	a.target = '_blank'
	
	a.click(                              )
}
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
	context.lineWidth = lineWidth
	context.moveTo(x1, y1)
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
	eraser.onclick = function (e) {
		eraserEnabled = true
		eraser.classList.add('active')
		pen.classList.remove('active')
	}
	pen.onclick = function (e) {
		eraserEnabled = false
		pen.classList.add('active')
		eraser.classList.remove('active')
	}
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
			e.preventDefault()
			var x = e.touches[0].clientX +0.5
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
					context.clearRect(x-10, y-10, 20, 20)
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
}
