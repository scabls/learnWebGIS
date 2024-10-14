//canvas绘图基于一个默认的坐标系(画布的左上角是原点 向右是x正方向 向下是Y正方向) 这个坐标系 是可以更改
//希望将坐标点 调整到100,100
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;
function drawClock() {
  ctx.save();
  //准备基本的预设
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.scale(0.4, 0.4);
  ctx.rotate(-Math.PI / 2);
  ctx.lineWidth = 8;
  ctx.lineCap = "round";
  ctx.fillStyle = "white";
  ctx.strokeStyle = "black";
  ctx.save(); //每次绘制刻度线的时候都是预设的状态值开始绘制
  //绘制小时 的刻度线
  for (let i = 0; i < 12; i++) {
    ctx.beginPath();
    ctx.moveTo(100, 0);
    ctx.lineTo(120, 0);
    ctx.stroke();
    ctx.rotate(Math.PI / 6);
  }
  ctx.restore();
  //绘制分钟的 刻度线
  ctx.save();
  ctx.lineWidth = 5;
  for (let i = 0; i < 60; i++) {
    if (i % 5 !== 0) {
      ctx.beginPath();
      ctx.moveTo(115, 0);
      ctx.lineTo(120, 0);
      ctx.stroke();
    }
    ctx.rotate(Math.PI / 30);
  }
  ctx.restore();
  //绘制的动态的3根针
  //肯定要知道当前的时分秒
  let time = new Date();
  let sec = time.getSeconds();
  let min = time.getMinutes();
  let hour = time.getHours();
  hour = hour > 12 ? hour - 12 : hour;
  ctx.save();
  //绘制时针
  //旋转坐标系的角度 根据 时 分 秒 3个数据来算
  ctx.rotate(
    (Math.PI / 6) * hour + (Math.PI / 360) * min + (Math.PI / 21600) * sec
  );
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.moveTo(-20, 0);
  ctx.lineTo(80, 0);
  ctx.stroke();
  ctx.restore();
  //绘制分针
  ctx.save();
  ctx.rotate((Math.PI / 30) * min + (Math.PI / 1800) * sec);
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.moveTo(-25, 0);
  ctx.lineTo(112, 0);
  ctx.stroke();
  ctx.restore();
  //绘制秒针
  ctx.save();
  ctx.rotate((Math.PI / 30) * sec);
  ctx.fillStyle = "red";
  ctx.strokeStyle = "red";
  ctx.lineWidth = 6;
  ctx.beginPath()
  ctx.moveTo(-30,0)
  ctx.lineTo(84,0)
  ctx.stroke()
  ctx.restore();
  ctx.restore();
  requestAnimationFrame(drawClock);
}
drawClock();
