"use strict"
let intro_1 = document.querySelector('.intro_1');
let intro_2 = document.querySelector('.intro_2');
let intro_3 = document.querySelector('.intro_3');

function changeColor() {
    let x = 281;
    let y = 0;
    let z = 0;
    let colorHls = Hls( '"+ x +",  "+ y +" , "+ z +"');
    intro_1.backround = colorHls;
}



changeColor();