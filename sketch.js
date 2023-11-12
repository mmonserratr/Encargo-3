let hearts = [];
let sparks = [];

function setup() {
 createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);

  // Actualizar y mostrar los destellos
  for (let i = sparks.length - 1; i >= 0; i--) {
    sparks[i].update();
    sparks[i].display();
    if (sparks[i].isOffscreen()) {
      sparks.splice(i, 1);
    }
  }

  // Actualizar y mostrar los corazones
  for (let i = hearts.length - 1; i >= 0; i--) {
    hearts[i].update();
    hearts[i].display();
    if (hearts[i].isOffscreen()) {
      hearts.splice(i, 1);
    }
  }
}

function mouseClicked() {
  let heart = new Heart(mouseX, mouseY);
  hearts.push(heart);
}

class Heart {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 20;
    this.speed = createVector(random(-2, 2), random(-3, -1));
    this.prevX = x;
    this.prevY = y;
    this.shadowColor = color(250); // Cambia el color de la sombra a blanco

    // Destellos
    for (let i = 0; i < 5; i++) {
      let spark = new Spark(this.x, this.y);
      sparks.push(spark);
    }
  }

  update() {
    this.prevX = this.x;
    this.prevY = this.y;
    this.x += this.speed.x;
    this.y += this.speed.y;
    this.speed.y += 0.1;
  }

  display() {
    noStroke();

    // Dibujar la sombra
    fill(this.shadowColor);
    ellipse(this.prevX, this.prevY + this.size * 0.8, this.size * 2, this.size * 1.5);

    // Dibujar el corazón principal
    fill(255, 0, 0);
    beginShape();
    vertex(this.x, this.y);
    bezierVertex(this.x - this.size / 2, this.y - this.size / 2, this.x - this.size, this.y + this.size / 3, this.x, this.y + this.size);
    bezierVertex(this.x + this.size, this.y + this.size / 3, this.x + this.size / 2, this.y - this.size / 2, this.x, this.y);
    endShape(CLOSE);
  }

  isOffscreen() {
    return this.y - this.size > height;
  }
}

class Spark {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = createVector(random(-2, 2), random(-5, -2));
    this.size = 3;
    this.alpha = 255;
  }

  update() {
    this.x += this.speed.x;
    this.y += this.speed.y;
    this.alpha -= 5;
  }

  display() {
    noStroke();
    fill(255, 255, 0, this.alpha);
    ellipse(this.x, this.y, this.size);
  }

  isOffscreen() {
    return this.alpha <= 0;
  }
}
