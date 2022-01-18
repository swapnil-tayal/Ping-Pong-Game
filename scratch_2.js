// Variables
var paddleHeight = 150;
var paddleWidth = 30;
var ballRadius = 25;
var halfPaddleHeight = paddleHeight / 2;
var speedOfPaddle1 = 0;
var positionOfPaddle1 = 220;
var speedOfPaddle2 = 0;
var positionOfPaddle2 = 220;
var topPositionOfBall = 210;
var leftPositionOfBall = 520;
var topSpeedOfBall = 100;
var leftSpeedOfBall = 0;
var score1 = 0;
var score2 = 0;

//Start Ball Function
function startBall() {
	topPositionOfBall = 210;
	leftPositionOfBall = 520;
	if (Math.random() < 0.5) {
		var side = 1
	} else {
		var side = -1
	}
	topSpeedOfBall = 5;
	leftSpeedOfBall = side * (Math.random() * 6 + 5);
};

//Adding Keys Function(Increasing Speed On Key-down)
document.addEventListener('keydown', function (e) {
     if (e.keyCode == 87 || e.which == 87) { // W key
      speedOfPaddle1 = -10;
     }
     if (e.keyCode == 83 || e.which == 83) { // S Key
      speedOfPaddle1 = 10;
     }
     if (e.keyCode == 38 || e.which == 38) { // up arrow
      speedOfPaddle2 = -10;
     }
     if (e.keyCode == 40 || e.which == 40) { // down arrow
      speedOfPaddle2 = 10;
     }
}, false);

//Adding Keys Function(Making Speed Zero On Key-Up)
document.addEventListener('keyup', function (e) {
	if (e.keyCode == 87 || e.which == 87) {
		speedOfPaddle1 = 0;
	}
	if (e.keyCode == 83 || e.which == 83) {
		speedOfPaddle1 = 0;
	}
	if (e.keyCode == 38 || e.which == 38) {
		speedOfPaddle2 = 0;
	}
	if (e.keyCode == 40 || e.which == 40) {
		speedOfPaddle2 = 0;
	}
}, false);

//Making An Interval Function To Make Visible Changes 60 times a Second
window.setInterval(function show() {

    //Adjusting Position of Paddles
	positionOfPaddle1 += speedOfPaddle1;
	positionOfPaddle2 += speedOfPaddle2;

    //Adjusting Position of Balls
	topPositionOfBall += topSpeedOfBall;
	leftPositionOfBall += leftSpeedOfBall;

    //Make it Single Player (Uncomment Below Statement)
    //positionOfPaddle2 = topPositionOfBall - paddleHeight/2

    //Conditions for the Paddles so they don't leave the Window
	if (positionOfPaddle1 <= 1) {
		positionOfPaddle1 = 1;
	}
	if (positionOfPaddle2 <= 1) {
		positionOfPaddle2 = 1;
	}
	if (positionOfPaddle1 >= window.innerHeight - paddleHeight) {
		positionOfPaddle1 = window.innerHeight - paddleHeight;
	}
	if (positionOfPaddle2 > window.innerHeight - paddleHeight) {
		positionOfPaddle2 = window.innerHeight - paddleHeight;
	}

    //Condition For Reflecting back the Ball
	if (topPositionOfBall <= 10 || topPositionOfBall >= window.innerHeight - ballRadius) {
		topSpeedOfBall = -topSpeedOfBall
	}

    //Ball Bounces Back From Paddles
	if (leftPositionOfBall <= paddleWidth){
	    if (topPositionOfBall > positionOfPaddle1 && topPositionOfBall < positionOfPaddle1 + paddleHeight){
	        leftSpeedOfBall = -leftSpeedOfBall;
	        var audio = new Audio('mixkit-retro-game-notification-212.wav')
            audio.play()
        }else {
            score2++;
            var audio = new Audio('mixkit-falling-empty-can-389.wav')
            audio.play()
            startBall()}
	}
	if (leftPositionOfBall >= window.innerWidth - ballRadius - paddleWidth){
        if (topPositionOfBall > positionOfPaddle2 && topPositionOfBall < positionOfPaddle2 + paddleHeight){
            leftSpeedOfBall = -leftSpeedOfBall;
            var audio = new Audio('mixkit-retro-game-notification-212.wav')
            audio.play()
        }else {
            score1++
            var audio = new Audio('mixkit-falling-empty-can-389.wav')
            audio.play()
            startBall()}
    }

    //Updating Position of Paddles
	document.getElementById("paddle1").style.top = (positionOfPaddle1) + "px";
	document.getElementById("paddle2").style.top = (positionOfPaddle2) + "px";

    //Updating Position of Ball
	document.getElementById("ball").style.top = (topPositionOfBall) + "px";
	document.getElementById("ball").style.left = (leftPositionOfBall) + "px";

    //Updating Scores
    document.getElementById('score1').innerHTML = score1.toString()
    document.getElementById('score2').innerHTML = score2.toString()

}, 1000/80);
