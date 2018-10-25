// Enemies our player must avoid
var Enemy = function (x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.xdiff = 101;
    this.x = x;
    this.y = y + 55;
    this.speed = speed;
    this.boundary = this.xdiff * 5;
    this.initPos = -this.xdiff;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < this.boundary) {
        this.x += this.speed * dt;
    }
    else {
        this.x = this.initPos;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Boy {
    constructor() {
        this.xdiff = 101;
        this.ydiff = 83;
        this.initx = this.xdiff * 2;
        this.inity = (this.ydiff * 5) - 10;
        this.x = this.initx;
        this.y = this.inity;
        this.sprite = 'images/char-boy.png';
    }

    // Render boy at x,y coord
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // move boy using arrow keys
    handleInput(input) {
        switch (input) {
            case 'up':
                if (this.y > 0) {
                    this.y -= this.ydiff;
                }
                break;
            case 'down':
                if (this.y < this.ydiff * 4) {
                    this.y += this.ydiff;
                }
                break;
            case 'left':
                if (this.x > 0) {
                    this.x -= this.xdiff;
                }
                break;
            case 'right':
                if (this.x < this.xdiff * 4) {
                    this.x += this.xdiff;
                }
                break;
            default: 
                alert('Please use arrow keys to move player');
                break;
        }
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const player = new Boy();
const bugger1 = new Enemy(-101, 0, 200);
const bugger2 = new Enemy(-101, 83, 300);
const bugger3 = new Enemy((-101 * 2.5), 83, 400);
const allEnemies = [];

allEnemies.push(bugger1, bugger2, bugger3);
console.log(allEnemies);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
