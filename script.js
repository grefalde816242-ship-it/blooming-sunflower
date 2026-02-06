const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Sunflower {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.petalCount = 40;
    this.maxPetalLength = 160;
    this.petalWidth = 20;
    this.growth = 0;
    this.windOffset = Math.random() * 1000;
  }

  drawStem() {
    const sway = Math.sin(Date.now() * 0.002 + this.windOffset) * 10;
    ctx.strokeStyle = "#2e7d32";
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + sway, canvas.height);
    ctx.stroke();
  }

  drawCenter() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 40, 0, Math.PI * 2);
    ctx.fillStyle = "#5d4037";
    ctx.fill();
  }

  drawPetals() {
    const sway = Math.sin(Date.now() * 0.002 + this.windOffset) * 0.2;
    for (let i = 0; i < this.petalCount; i++) {
      const angle = (Math.PI * 2 / this.petalCount) * i + sway;
      const length = Math.min(this.growth, this.maxPetalLength);

      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(angle);
      ctx.beginPath();
      ctx.ellipse(0, -length / 2, this.petalWidth, length, 0, 0, Math.PI * 2);
      ctx.fillStyle = "#fdd835";
      ctx.fill();
      ctx.restore();
    }
  }

  update() {
    if (this.growth < this.maxPetalLength) this.growth += 2;
    this.drawStem();
    this.drawPetals();
    this.drawCenter();
  }
}

class Pollen {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = -10;
    this.radius = 2 + Math.random() * 3;
    this.speedY = 1 + Math.random() * 2;
    this.speedX = Math.random() * 1 - 0.5;
  }

  update() {
    this.y += this.speedY;
    this.x += this.speedX;
    if (this.y > canvas.height) this.reset();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#fff176";
    ctx.fill();
  }
}

const sunflowers = [new Sunflower(canvas.width / 2, canvas.height / 2 + 50)];
const pollens = Array.from({ length: 100 }, () => new Pollen());

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  sunflowers.forEach(s => s.update());
  pollens.forEach(p => p.update());
  requestAnimationFrame(animate);
}

canvas.addEventListener("click", (e) => {
  sunflowers.push(new Sunflower(e.clientX, e.clientY));
});

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

animate();
