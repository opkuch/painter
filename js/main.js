'use strict'

var gCanvas, gCtx

var gSettings = {
  shape: 'square',
  bgColor: '#8b0000',
  strokeColor: '',
  startPaint: false,
}

var gStartPos
const gTouchEvs = ['touchstart', 'touchmove']

function init() {
  gCanvas = document.getElementById('canvas')
  gCtx = gCanvas.getContext('2d')
  gCanvas.width = document.body.clientWidth
  gCanvas.height = document.body.clientHeight
  console.log(gCanvas)
}

function drawTriangle(x, y) {
  gCtx.beginPath() //Starts a new path -> Call this method when you want to create a new path.
  gCtx.lineWidth = 2
  gCtx.moveTo(x, y) //Moves the starting point of a new sub-path to the (x, y) coordinates.
  gCtx.lineTo(x + 50, y + 150 ) //Connects the last point in the current sub-path to the specified (x, y) coordinates with a straight line.
  gCtx.lineTo(x - 50, y + 150)
  /* 
    Causes the point of the pen to move back to the start of the current sub-path.
     It tries to draw a straight line from the current point to the start.
    */
  gCtx.closePath()
  // gCtx.lineTo(x, y);
  gCtx.fillStyle = gSettings.bgColor //Color or style to use inside shapes. Default #000 (black).
  gCtx.fill() //Fills the current sub-paths with the current fill style.
  gCtx.strokeStyle = gSettings.strokeColor //Color or style to use for the lines around shapes. Default #000 (black).
  gCtx.stroke() //Strokes the current sub-paths with the current stroke style.
}

function drawRect(x, y) {
  gCtx.beginPath()
  gCtx.rect(x, y, 50, 50)
  gCtx.fillStyle = gSettings.bgColor
  gCtx.fillRect(x, y, 50, 50)
  gCtx.strokeStyle = gSettings.strokeColor
  gCtx.stroke()
}

function drawArc(x, y) {
  gCtx.beginPath()
  gCtx.lineWidth = 6
  //the x,y cords of the center , The radius of the circle, The starting angle, The ending angle, in radians
  gCtx.arc(x, y, 30, 0, 2 * Math.PI) //use to create a circle //Adds a circular arc to the current path.
  gCtx.strokeStyle = gSettings.strokeColor
  gCtx.stroke()
  gCtx.fillStyle = gSettings.bgColor
  gCtx.fill()
}

function draw(pos) {
  const { x, y } = pos
  switch (gSettings.shape) {
    case 'triangle':
      drawTriangle(x, y)
      break
    case 'square':
      drawRect(x, y)
      break
    case 'circle':
      drawArc(x, y)
  }
}

function getEvPos(ev) {
  //Gets the offset pos , the default pos
  var pos = {
    x: ev.offsetX,
    y: ev.offsetY,
  }
  // Check if its a touch ev
  if (gTouchEvs.includes(ev.type)) {
    //soo we will not trigger the mouse ev
    ev.preventDefault()
    //Gets the first touch point
    ev = ev.changedTouches[0]
    //Calc the right pos according to the touch screen
    pos = {
      x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
      y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
    }
  }
  return pos
}

function onDown(ev) {
  const pos = getEvPos(ev)
  draw(pos)
  gSettings.startPaint = true
  gStartPos = pos
}

function onMove(ev) {
  if (!gSettings.startPaint) return
  const pos = getEvPos(ev)
  if (gStartPos) draw(pos)
  gStartPos = pos
}

function onUp() {
  gSettings.startPaint = false
}

function clearCanvas() {
  gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
}

function setShape(shape) {
  gSettings.shape = shape
}

function setBgColor(color) {
  gSettings.bgColor = color
}

function setStrokeColor(color) {
  gSettings.strokeColor = color
}

function downloadImg(elLink) {
    var imgContent = gCanvas.toDataURL('image/jpeg', 1.0)
    console.log(imgContent)
    elLink.href = imgContent
}
