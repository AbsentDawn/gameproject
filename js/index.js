$(function() {

	var $enemies = [];
	var score = 0;
	var movement = [];
	var playerAnimation = player();
	var enemyAnimation = enemy();

		var buttons = {
		// Up key
		38: {
			top: "-=1"
		}, 

		// Right Key
		39: {
			left: "+=1"
		},

		// Down Key
		40: {
			top: "+=1"
		}
	}

	// Start the game
		startButton();

	$(document).on({
		keydown: keyDown, 
		keyup: keyUp
	});


	

	// Function running while in game
	function start(){
		score = 0;
		$("#ground").removeAttr('style');
		$("#background").removeAttr('style');
		// player();
		// jump();
		// accelerate();
		// duck();
		spawnPlayer(playerAnimation);
		spawnEnemies(enemyAnimation);
		increaseScore();
		loseLogic();
	}

	// start button
	function startButton() {
		$("#playbutton").click(function() {
			playbutton.style.display = 'none';
			start();
		});
	}

	// If player is hit
	function loseLogic() {
		$.each($enemies, function(index, value) {
			var collisionDetected = collision($(value), $("#player"));
			console.log(collision);
		});	
	}

	// Reset game
	function reset() {
		// Set Score back to nil
		score = 0;
		$('#score').text('score: ' + score);
		
		// Remove Enemies 
		$.each($enemies, function(index, value) {
			value.remove();
			$enemies = [];
		});

		// Keep everything static
		setTimeout(function() {
			$("#ground").css("animation", "0s");
			$("#background").css("animation", "0s");
			// $("#player").remove();
			$("#player").dequeue();
			// $("#player").clearQueue();
			// keepPlayerBack();
		}, 5);



		playbutton.style.display = 'block';
	}

	// Check for collision
	function collision(enemy, player) {
		setInterval(function() {
			if(checkCollisions(enemy, player)){
				alert("You have lost! score: " + score);
				reset();
			}
		}, 20);
	}

	function spawnPlayer(animation) {
		$('<div>', {id: 'player'});
		$("#level").append();
	}

	// Spawn Enemies
	function spawnEnemies(animation) {
		for(var i = 0; i < 4; i++){
			// var enemy = $('#enemy').append('<div id="enemy"></div>');
			$enemies.push($('<div>', { class: 'enemy', bird: 'bird' + i}));
			$("#level").append($enemies);
		}
	}

	// Increase score 
	function increaseScore() {
		setInterval(function() {
			score++
			$('#score').text('score: ' + score);
		}, 100);		
	}	


	// The player
	function player(){
		 $("#player").animateSprite({
		    fps: 12,
		    animations: {
		        walkRight: [0, 1, 2, 3, 4, 5]
		    },

		    loop: true,
		    complete: function(){
		        // use complete only when you set animations with 'loop: false'
		        console.log("animation End");
		    }
		});
	}

	// The enemy
	function enemy(){
		 $("#player").animateSprite({
		    fps: 12,
		    animations: {
		        flyLeft: [4, 3, 2, 1, 0, 9, 8, 7, 6, 5, 14, 13, 12, 11]

		    },

		    loop: true,
		    complete: function(){
		        // use complete only when you set animations with 'loop: false'
		        console.log("animation End");
		    }
		});
	}



	// function jump() {
	// 	$("body").keydown(function(e) {
	// 		if(e.keyCode == 38){
	// 			$("#player").animate({top: '7%'}, "slow", function() {
 // 				console.log("player jumped");
 // 				});
	// 			$("#player").animate({top: '50%'}, "slow", function() {
 // 				console.log("player landed");
 // 				});
	// 		}
	// 	});	

	// 	$("body").keyup(function(e) {
	// 		if(e.keyCode == 38){
				
	// 			$("#player").dequeue();
	// 			$("#player").clearQueue();
	// 		}
	// 	});	
	// }

	// function accelerate() {
	// 	$("body").keydown(function(e) {
	// 		var right = parseInt($("#player").css("left"));
	// 		if(e.keyCode == 39){
 // 				$("#player").css('left', right += 1);
	// 		}
	// 	});

	// 	$("body").keyup(function(e) {
	// 		$("#player").animate({left: '0%'}, "slow", function() {
 // 				console.log("player is in default position");
 // 			}); 
	// 	});	
	// }

	// function runAndJump() {
	// 	$("body").keydown(function(e){
	// 		var right = parseInt($("#player").css("left"));
	// 		if(e.keyCode == 38 && e.keyCode == 39) {
	// 			$("#player").css('left', right += 1);
	// 			$("#player").css('top',  right += 1);

	// 		}
	// 	});

	// 	$("body").keyup(function(e) {
	// 		$("#player").animate({left: '0%'}, "slow", function() {
 // 				console.log("player is in default position");
 // 			}); 
	// 	});	
	// }

	// function duck() {
	// 	 $("#duckButton").click(function() {
	// 		$("#player").animate({top: '75%'}, "fast");
	// 		$("#player").animate({top: '50%'}, "fast");

	// 	});
	// }

	// Key down events
	function keyDown(e) {
		var key = e.which;
		var animation = buttons[key];
		if(!movement[key]) {
			movement[key] = setInterval(theAnimation, 1);
			console.log("up", key, movement[key]);
		}

		function theAnimation() {
			$("#player").css(animation);
		}
	}

	// Key released events
	function keyUp(e) {
		var key = e.which
		movement[key] = clearInterval(movement[key]);
		$("#player").animate({top: '50%'}, "slow");
		$("#player").animate({left: '0%'}, "slow");
		console.log("up", key, movement[key]);
	}


	function keepPlayerBack() {
		$("#player").animate({top: '50%'}, "fast");
		$("#player").animate({left: '0%'}, "fast");
		console.log("down", key, movement[key])
	}

	  // Collision detection
	function getPositions(box) {
	  var $box = $(box);
	  var pos = $box.position();
	  var width = $box.width();
	  var height = $box.height();
	  return [ [ pos.left, pos.left + width ], [ pos.top, pos.top + height ] ];
	}
	
	 // Compare div positions 
	function comparePositions(p1, p2) {
	  var x1 = p1[0] < p2[0] ? p1 : p2;
	  var x2 = p1[0] < p2[0] ? p2 : p1;
	  return x1[1] > x2[0] || x1[0] === x2[0] ? true : false;
	}

	// Collision detection logic
	function checkCollisions(enemy, player){
	  var pos = getPositions(enemy);
	  var pos2 = getPositions(player);
	  var horizontalMatch = comparePositions(pos[0], pos2[0]);
	  var verticalMatch = comparePositions(pos[1], pos2[1]);            
	  var match = horizontalMatch && verticalMatch;
	  if (match) { 
	  	console.log("Collision");
	  }
  	 return match;
    }

});