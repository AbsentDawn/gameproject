$(function() {


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


function jump() {
	 $("button").click(function() {
		$("#player").animate({top: '34%'}, "slow", checkCollisions);
		$("#player").animate({top: '50%'}, "slow", checkCollisions);

	});
}

$("#enemy1").animate({left: '-0.750'}, "slow", checkCollisions);
jump();



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

function checkCollisions(){
  var box = $("#enemy1")[0];
  var pos = getPositions(box);

  var pos2 = getPositions(this);
  var horizontalMatch = comparePositions(pos[0], pos2[0]);
  var verticalMatch = comparePositions(pos[1], pos2[1]);            
  var match = horizontalMatch && verticalMatch;
  if (match) { 
  	console.log("Collision");
  }
}

});