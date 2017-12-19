$(function() {

 $("#player").animateSprite({
    fps: 10,
    animations: {
        walkRight: [0, 1, 2, 3, 4, 5]
    },
    loop: true,
    complete: function(){
        // use complete only when you set animations with 'loop: false'
        alert("animation End");
    }
});




});