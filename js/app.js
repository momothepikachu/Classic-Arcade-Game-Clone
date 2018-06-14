// Enemies our player must avoid
var Enemy = function() {
    this.randomRow = Math.floor(Math.random()*3);
    this.randomSpeed = Math.floor((Math.random()+0.8)*3)*3;
    this.sprite = 'images/enemy-bug.png';
    this.x = -101;
    this.y = 63 + this.randomRow*83;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += dt*40*this.randomSpeed;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(window.Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = []
var generator = function() {
    allEnemies.push(new Enemy());
    setInterval(function() {
        allEnemies.push(new Enemy());
    }, (Math.random()+0.2)*1000)
}
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.you = 'images/char-boy.png';
    this.x = 505/2-50;
    this.y = 312;
    this.up = 0;
    this.down = 0;
    this.left = 0;
    this.right = 0;
};

Player.prototype.update = function() {
    if (this.y===-20) {
        alert('You made it!!')
        this.y = 312;
        this.x = 202.5;
    }
    this.y += (this.down-this.up)*83;
    this.x += (this.right-this.left)*101;
    this.down=this.up=this.left=this.right= 0;
};

Player.prototype.render = function() {
    ctx.drawImage(window.Resources.get(this.you), this.x, this.y);
}

Player.prototype.handleInput = function(key) {
    switch(key) {
        case 'left':
            if (this.x>0.5) {
                this.left += 1;
            }
            break;
        case 'right':
            if (this.x<404.5) {
                this.right += 1;
            }
            break;
        case 'up':
            this.up += 1;
            break;
        case 'down':
            if (this.y<312) {
                this.down += 1;
            }
            break;
    }

}

// Place the player object in a variable called player
var player = new Player();


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
