import "./App.css";
import { useEffect, useMemo, useRef } from "react";

function App() {
  const canvasRef = useRef();
  const particles = useMemo(() => {}, []);

  useEffect(() => {
    const particles = new Particles(canvasRef.current);
    particles.initCanvas();
    particles.animation();
    return () => {
      particles.cancel();
    };
  }, [particles]);
  return (
    <div><div>HEADER</div>
      <canvas ref={canvasRef}></canvas>
      <div>FOOTER</div>
    </div>
  );
}

export default App;
class Particles {
  particles = [];
  maxDistance = 120;

  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
  }

  initCanvas() {
    this.dx = window.innerWidth;
    this.dy = window.innerHeight;

    this.canvas.width = this.dx;
    this.canvas.height = this.dy;

    this.lastTime = [];
    this.endPoints = [];
    this.lastDrawTime = performance.now();
  }

  drawFPS() {
    const now = performance.now();
    if (this.lastTime.length >= 10) {
      const delta = now - this.lastTime[0];
      const fps = Math.floor((1000 / delta) * 10);
      this.ctx.clearRect(0, 0, 400, 100);
      this.ctx.fillStyle = "#000000";
      this.ctx.font = "48px Arial";
      this.ctx.fillText(`${fps} FPS`, 20, 50);
      this.ctx.fillText(`32 channels`, 200, 50);
    }
    this.lastTime.push(now);
    this.lastTime.splice(0, this.lastTime.length - 10);
  }

  drawLines() {
    console.log("DEBUG", Math.random());
    const colors = [
      [0, 0, 0],
      [255, 0, 0],
      [0, 255, 0],
      [0, 0, 255],
      [255, 255, 0],
      [255, 0, 255],
      [0, 255, 255],
      [128, 128, 0],
      [0, 0, 0],
      [255, 0, 0],
      [0, 255, 0],
      [0, 0, 255],
      [255, 255, 0],
      [255, 0, 255],
      [0, 255, 255],
      [128, 128, 0],
      [0, 0, 0],
      [255, 0, 0],
      [0, 255, 0],
      [0, 0, 255],
      [255, 255, 0],
      [255, 0, 255],
      [0, 255, 255],
      [128, 128, 0],
      [0, 0, 0],
      [255, 0, 0],
      [0, 255, 0],
      [0, 0, 255],
      [255, 255, 0],
      [255, 0, 255],
      [0, 255, 255],
      [128, 128, 0],
    ];
    const shift = 1;
    const channels = 32;
    this.ctx.drawImage(
      this.canvas,
      shift,
      100,
      this.dx - shift,
      this.dy - 100,
      0,
      100,
      this.dx - shift,
      this.dy - 100
    );
    this.ctx.fillStyle = "#ffffff";
    this.ctx.fillRect(this.dx - shift, 0, shift, this.dy);

    for (let i = 0; i < channels; i++) {
      const endPoint = Math.random() * 700;
      if (this.endPoints.length) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = `rgba(${colors[i][0]},${colors[i][1]},${colors[i][0]},1)`;
        this.ctx.lineWidth = 1;
        this.ctx.moveTo(this.dx - shift, this.dy - this.endPoints[i]);
        this.ctx.lineTo(this.dx - 1, this.dy - endPoint);
        this.ctx.stroke();
        this.ctx.closePath();
      }
      this.endPoints[i] = endPoint;
    }
  }

  animation() {
    const now = performance.now();
    if (now - this.lastDrawTime > 0) {
      this.drawLines();
      this.lastDrawTime = now;
    }

    this.drawFPS();
    this.animationFrame = window.requestAnimationFrame(() => this.animation());
  }

  cancel() {
    window.cancelAnimationFrame(this.animationFrame);
  }
}
