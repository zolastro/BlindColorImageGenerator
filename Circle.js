var textColors = ["#CA9C7F", "#FBBF66", "#FDC168", "#EEAC80", "#E68A53", "#FCC87E", "#C09770", "#F5BF73"];
// var textColors = ["blue"];
var backgroundColors = ["#919349", "#E1D270", "#ACAF66", "#A6AA95", "#96994A", "#B8C090", "#CED4AD", "#DFD67F"]
function TextCircle(x, y) {
  this.x = x;
  this.y = y;
  this.r = 5;
  var index =  int(random(0, textColors.length));
  this.color = textColors[index];
  this.growing = true;

  this.grow = function() {
    if (this.growing && this.r < 15) {
      this.r += 2;
    }
  }

  this.show = function() {
    stroke(this.color);
    strokeWeight(2);
    fill(this.color);
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
  }

  this.edges = function() {
    return (this.x + this.r >= width || this.x - this.r <= 0 || this.y + this.r >= height || this.y - this.r <= 0)
  }
}


function BackgroundCircle(x, y) {
  this.x = x;
  this.y = y;
  this.r = 5;
  var index =  int(random(0, backgroundColors.length));
  this.color = backgroundColors[index];
  this.growing = true;

  this.grow = function() {
    if (this.growing && this.r < 15) {
      this.r += 2;
    }
  }

  this.show = function() {
    stroke(this.color);
    fill(this.color);
    strokeWeight(2);
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
  }

  this.edges = function() {
    return (this.x + this.r >= width || this.x - this.r <= 0 || this.y + this.r >= height || this.y - this.r <= 0)
  }
}
