$(function() {


 var player = $("#player");
 var enemy1 = $("#enemy1");

 $("#player").animateSprite({
    fps: 10,
    animations: {
        walkRight: [0, 1, 2, 3, 4, 5],
        jump: [7, 8]
    },

    loop: true,
    complete: function(){
        // use complete only when you set animations with 'loop: false'
        console.log("animation End");
    }
});


function jump() {
	 $("button").click(function() {
		$("#player").animate({top: '34%'}, "slow");
		$("#player").animate({top: '50%'}, "slow");
	});
}

jump();




// if (collision(player, enemy1)){
// 	console.log("collision");
// }

// function collision($div1, $div2) {
//         var x1 = $div1.offset().left;
//         var y1 = $div1.offset().top;
//         var h1 = $div1.outerHeight(true);
//         var w1 = $div1.outerWidth(true);
//         var b1 = y1 + h1;
//         var r1 = x1 + w1;
//         var x2 = $div2.offset().left;
//         var y2 = $div2.offset().top;
//         var h2 = $div2.outerHeight(true);
//         var w2 = $div2.outerWidth(true);
//         var b2 = y2 + h2;
//         var r2 = x2 + w2;

//         if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
//         return true;
//       }

//   )
// }

});