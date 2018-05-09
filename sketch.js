var circles;
var spots;
var minRadius = 10;
var hasFinishedText = false;
function preload() {
  img = loadImage("assets/20.png");
}

function setup() {
  console.log(img);
  createCanvas(img.width, img.height);
  var density = displayDensity();
  pixelDensity(1);
  img.loadPixels();
  spots = [];
  circles = [];
  for (var x = 0; x < img.width; x++) {
    for (var y = 0; y < img.height; y++) {
      var index = x + y * img.width;
      var c = img.pixels[index*4];
      var b = brightness([c]);
      if (b > 1) {
        spots.push(createVector(x, y));
      }
    }
  }

  console.log(img.width);
  console.log(img.height);
  console.log("pixels", img.pixels.length);
  console.log("spots", spots.length);
  console.log(density)

}

function draw() {
  background(255);
  // frameRate(20)

  var total = 10;
  var count = 0;
  var attempts = 0;

  if(!hasFinishedText) {
    while (count < total) {
      var newC = newTextCircle();
      if (newC !== null) {
        circles.push(newC);
        count++;
      }
      attempts++;
      if (attempts > 10000) {
        hasFinishedText = true;
        break;
      }
    }
  } else {
    while (count < total) {
      var newC = newBackgroundCircle();
      if (newC !== null) {
        circles.push(newC);
        count++;
      }
      attempts++;
      if(attempts > 1000) {
        minRadius = 8;
      }
      if (attempts > 2000) {
        noLoop();
        console.log("finished");
        break;
      }
    }
  }
  

  for (var i = 0; i < circles.length; i++) {
    var circle = circles[i];

    if (circle.growing) {
      if (circle.edges()) {
        circle.growing = false;
      } else {
        for (var j = 0; j < circles.length; j++) {
          var other = circles[j];
          if (circle !== other) {
            var d = dist(circle.x, circle.y, other.x, other.y);
            var distance = circle.r + other.r;

            if (d - minRadius/2 < distance) {
              circle.growing = false;
              break;
            }
          }
        }
      }
    }

    circle.show();
    circle.grow();
  }
}

function newTextCircle() {
  var r = int(random(0, spots.length));
  var spot = spots[r];
  var x = spot.x;
  var y = spot.y;

  var valid = true;
  for (var i = 0; i < circles.length; i++) {
    var circle = circles[i];
    var d = dist(x, y, circle.x, circle.y);
    if (d < circle.r + minRadius) {
      valid = false;
      break;
    }
  }
  if (valid) {
    return new TextCircle(x, y);
  } else {
    return null;
  }
}


function newBackgroundCircle() {
  var x = int(random(width));
  var y = int(random(height));

  var valid = true;
  for (var i = 0; i < circles.length; i++) {
    var circle = circles[i];
    var d = dist(x, y, circle.x, circle.y);
    if (d < circle.r + minRadius) {
      valid = false;
      break;
    }
  }
  if (valid) {
    return new BackgroundCircle(x, y);
  } else {
    return null;
  }
}
