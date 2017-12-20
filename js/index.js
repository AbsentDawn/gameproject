$(function() {

	var $enemies = [];
	var level = $("#level");
	var levelW = level.width();
	var levelH = level.height();

	start();

	// Functionk to start the game
	function start(){
		spawnEnemies();
		duck();
		jump();
		player();
		
	}


	function collision() {
		setInterval(function() {
			checkCollisions($(".enemy"), $("#player"));
		}, 20);
	}

	function spawnEnemies() {
		for(var i = 0; i < 4; i++){
			// var enemy = $('#enemy').append('<div id="enemy"></div>');
			$enemies.push($('<div>', { id: 'enemy' + i}));
			$(".enemy").append($enemies);
			randomEnemies($enemies);
			console.log($enemies);
		}
	}

	function randomEnemies($selector) {
		for(var i = 0; i < $selector.length; i++) {
			// $selector.width = Math.floor(Math.random() * levelW);
    		console.log($selector);
		}
	}

	function player(){
		 $("#player").animateSprite({
		    fps: 10,
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
		 $("#jumpButton").click(function() {
			$("#player").animate({top: '15%'}, "slow");
			$("#player").animate({top: '50%'}, "slow");

		});
	}

	function duck() {
		 $("#duckButton").click(function() {
			$("#player").animate({top: '75%'}, "slow");
			$("#player").animate({top: '50%'}, "slow");

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