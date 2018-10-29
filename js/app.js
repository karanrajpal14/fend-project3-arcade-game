// Enemies our player must avoid
class Enemy {
    // Initializing enemy attributes
    constructor(x, y, speed) {
        this.xdiff = 101;
        this.x = x;
        this.y = y + 55;
        this.speed = speed;
        this.boundary = this.xdiff * 5;
        this.initPos = -this.xdiff;
        this.sprite = 'images/enemy-bug.png';
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    update(dt) {
        // Moves the enemy and adds a "walk-in" and "walk-out"
        // effect
        if (this.x < this.boundary) {
            this.x += this.speed * dt;
        }
        else {
            this.x = this.initPos;
        }
    }

    // Draw the enemy on the screen
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Boy {
    constructor() {
        this.xdiff = 101;
        this.ydiff = 83;
        this.initx = this.xdiff * 2;
        this.inity = (this.ydiff * 4) + 55;
        this.x = this.initx;
        this.y = this.inity;
        this.sprite = 'images/char-boy.png';
        this.gameWon = false;
    }

    // Render boy at x,y coord
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    update(){
        // Detect collisions and reset player position upon collision
        allEnemies.forEach(enemy => {
            if(
                this.y === enemy.y &&
                (enemy.x + enemy.xdiff/2 > this.x && enemy.x < this.x + this.xdiff/2)
                ){
                this.reset();
            }
        });
        // Declares game won if player reaches the river
        if(this.y === -28){
            this.gameWon = true;
        }
    }

    // Resets player position upon collision
    reset () {
        this.x = this.initx;
        this.y = this.inity;
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
                break;
        }
    }
}

// Randomly assign speeds to enemies
function getRandomInt() {
  min = 400;
  max = 600;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const player = new Boy();
const bugger1 = new Enemy(-101, 0, getRandomInt());
const bugger2 = new Enemy(-101, 83, getRandomInt());
const bugger3 = new Enemy((-101 * 2.5), (83 *2), getRandomInt());
const allEnemies = [];

allEnemies.push(bugger1, bugger2, bugger3);

// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
