$(function() {

	var $enemies = [];
	var level = $("#level");
	var levelW = level.width();
	var levelH = level.height();
	var score = 0;
	var hasLost = true;

	startButton();

	// Function to start the game
	function start(){
		score = 0;
		$("#ground").removeAttr('style');
		$("#background").removeAttr('style');

		player();
		jump();
		duck();
		spawnEnemies();
		increaseScore();
		loseLogic();
	}

	function startButton() {
		$("#playbutton").click(function() {
			playbutton.style.display = 'none';
			start();
		});
	}

	// If player wins
	function loseLogic() {
		$.each($enemies, function(index, value) {
			var collisionDetected = collision($(value), $("#player"));
			console.log(collision);
		});	
	}

	function reset() {
		// Set Score back to nil
		score = 0;
		$('#score').text('score: ' + score);
		
		// Remove Enemies 
		$.each($enemies, function(index, value) {
			value.remove();
			$enemies = [];
		})

		setTimeout(function() {
			$("#ground").css("animation", "0s");
			$("#background").css("animation", "0s");
			$("#player").clearQueue();
		}, 5);



		playbutton.style.display = 'block';
	}

	function collision(enemy, player) {
		setInterval(function() {
			if(checkCollisions(enemy, player)){
				alert("You have lost! score: " + score);
				reset();
			}
		}, 20);
	}

	function spawnEnemies() {
		for(var i = 0; i < 4; i++){
			// var enemy = $('#enemy').append('<div id="enemy"></div>');
			$enemies.push($('<div>', { class: 'enemy', bird: 'bird' + i}));
			$("#level").append($enemies);
		}
	}

	function increaseScore() {
		setInterval(function() {
			score++
			$('#score').text('score: ' + score);
		}, 100);		
	}

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


	function jump() {
		$("body").keydown(function(e) {
			if(e.keyCode == 38){
				$("#player").animate({top: '7%'}, "slow", function() {
 				console.log("player jumped");
 				});
				$("#player").animate({top: '50%'}, "slow", function() {
 				console.log("player landed");
 				});
			}
		});	
		$("body").keyup(function(e) {
			if(e.keyCode == 38){
				$("#player").clearQueue();
				$("#player").dequeue();
			}
		});	

	}

	// function accelerate() {
	// 	$("body").keydown(function(e) {
	// 		if(e.keyCode == 39){
	// 			$("#player").animate({top: '7%'}, "slow", function() {
 // 				console.log("player jumped");
 // 				});
	// 			$("#player").stop().animate({top: '50%'}, "slow", function() {
 // 				console.log("player landed");
 // 				});
	// 		}
	// 	});	
	// }

	function duck() {
		 $("#duckButton").click(function() {
			$("#player").animate({top: '75%'}, "fast");
			$("#player").animate({top: '50%'}, "fast");

		});
	}

	  // Collision detection
	function getPositions(box) {
	  var $box = $(box);
	  var pos = $box.position();
	  var width = $box.width();
	  var height = $box.height();
	  return [ [ pos.left, pos.left + width ], [ pos.top, pos.top + height ] ];
	}
	        
	function comparePositions(p1, p2) {
	  var x1 = p1[0] < p2[0] ? p1 : p2;
	  var x2 = p1[0] < p2[0] ? p2 : p1;
	  return x1[1] > x2[0] || x1[0] === x2[0] ? true : false;
	}

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