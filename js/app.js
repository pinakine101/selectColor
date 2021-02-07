"use strict"
/*Plan
1. Сделать выбор цвета по клику на цвете
1.1   выбор образца цвета по движению мыши
2. Функция добавить/убрать блока
3. Выпадающее меню для меню
4. Кнопка "canculate color"
5. Сверстать все страницы
6. Добавить функционал поска по сайту
*/

//____Tabs_________//

let tabsBtn = document.querySelectorAll(".tabs__nav-btn");
let intro_1 = document.querySelectorAll(".intro_1")

tabsBtn.forEach(function(item) {
    item.addEventListener("click", function() {
        let currentBtn = item;
        let tabId = currentBtn.getAttribute ("data-tab");
        let currentTab = document.querySelector(tabId);

         if( ! currentBtn.classList.contains('active') )
         {

            tabsBtn.forEach(function(item){
                item.classList.remove('active');
            });

            intro_1.forEach(function(item){
                item.classList.remove('active');
            });

            currentBtn.classList.add('active');
            currentTab.classList.add('active');
         }
    });
});
document.querySelector('.tabs__nav-btn:nth-child(1)').click();





// colors.forEach(function(item) {
// 	item.addEventListener("click", function() {
// 		let colorId = item;
// 		item = document.getElementById(colorId);
// 		console.log(colorId);
	
//  });
//  });


// let H = 120;
// let S = 50;
// let B = 30;

$("body").on("contextmenu", false);	

let colorsActive = document.querySelectorAll('.color');

// colorsActive.forEach(function(item) {
// 	item.removeEventListener("click" , conMen);
// 	console.log(item);
// });
// let i =0;
// const deletLisener = (e) => {
// 	i++;
// 	if(i>1){
// 		e.removeEventListener("contextmenu", deletLisener);
// 	}
// }

colorsActive.forEach(function(item) {
	item.addEventListener("contextmenu", colorPick)
		
		// let currentColor = item;

        //  if( ! currentColor.conMen() )
        //  {

        //     item.forEach(function(item){
        //         item.remove(conMen);
		// 	});
		// 	item.forEach(conMen);
		// }
		
});
$(span).css('background-color')
function colorPick(e){
	let span = e.target;

	

		console.log(activeColor);
		
	$('.boxColorPick').css({"position":"absolute",
		"left":e.clientX+"px","top":e.clientY+"px" });

	$('.boxColorPick').ColorPicker({
		// layout:'hex',

		// flat: true,
		eventName: 'mouseover',
		color:({h:H, s:S, b:B}),
		onChange: function (hsb, hex, rgb) {
			
			$(span).css('backgroundColor', '#' + hex);
			// $(el).colpickHide();
			 }
		});
		
		console.log(span);
		return span;

};
// 
$(function() {
	$(span).each(function(indx, el){
	let activeColor = $(span).css('background-color'),
			[r,g,b] = activeColor.match(/\d+/g);
			$(this).text([r,g,b])
		});
	});
// 		item.addEventListener("click");
// 		colpickHide();
// 	});		
		 



// $('.box').on('mouseover',  function() {
// 			$('.box').ColorPicker({
// 				eventName: 'contextmenu',
// 				color:({h:H, s:S, b:B}),
// 				onChange: function (hsb, hex, rgb) {
// 				$('.color1').css('backgroundColor', '#' + hex);
// 					 }
// 				});
// 			});
		
// let col1 = document.querySelector('.color1');
// console.log(col1.background-color);

// if (document.addEventListener) { // IE >= 9; other browsers
// 	document.addEventListener('contextmenu', function(e) {
// 		contextColor();
// 		e.preventDefault();
// 	}, false);
// } else { // IE < 9
// 	document.attachEvent('oncontextmenu', function() {
// 		document.querySelector('.contextMenu').style.display = 'none';
// 		window.event.returnValue = false;
// 	});
// }


	
	
//  $(document).ready(function() {
// 			$(document).bind("contextmenu",function(e){
// 					return false;
// 				});
// 		$(".intro1").mousedown(function(e){
// 				//to block browsers default right click
// 				if( e.button == 2 ) {
		
// 					$("#contextMenu").css("left", e.pageX);
// 					$("#contextMenu").css("top", e.pageY);
// 					$("#contextMenu").fadeIn(50, startFocusOut());
// 				}
// 			  });

// 			  function startFocusOut() {
// 				$(document).on("click", function () {   
// 					$("#contextMenu").hide(50);
// 					$(document).off("click");           
// 				});
// 			}
// 	});
	//https://jsfiddle.net/PCLwU/1/

// let color1 = document.querySelectorAll(".color1");

// document.getElementById("selectcolor").input = false;

// intro_1.forEach(function(color1) {
//     color1.addEventListener("click", function() {

// 		color1.setAttribute("type", "color");
// 		console.log(color1);	
//  });
// });
//let x = document.getElementById('blue');	
		//x.setAttribute("type", "color");
		

 	
		

//____Change Color_________//

/*let color1 = document.querySelector(".color1");
let color4 = document.querySelector(".color4");

color1.forEach(function(item) {
	item.addEventListener("click", function(){
		color4.style = item.getAttribute('style');
		
	});	
	});
	function myFunction() {
    let x = document.createElement("INPUT");
    x.setAttribute("type", "color");
    document.body.appendChild(x);
}
	
function changeColor(){
	let x = 260;
	let y = 100;
	let z = 60;

	let a  = x - 140;
	 
	let b = y/2 ;
	let c = z+90 ; if (c >= 100) { c = c - 100};
	
	pan.style.background = `hsl(${x}, ${y}%, ${z}%)`;
	pan1.style.background = `hsl(${a}, ${b}%, ${c}%)`;
	pan1.style.background = `hsl(" + a + "," + b +" % ," + c +" %)`;
//	`hsla(${hue},${saturation}%,${lightness}%,${alpha})`	
};
changeColor();
console.log(pan1.style.background);

function generateHslaColors (saturation, lightness, alpha, amount) {
	let colors = []
	let huedelta = Math.trunc(360 / amount)
  
	for (let i = 0; i < amount; i++) {
	  let hue = i * huedelta
	  colors.push(`hsla(${hue},${saturation}%,${lightness}%,${alpha})`)
	}
  
	return colors
  }

	/*let x = 256 / 4;
	let y = Math.floor(256 / 2);
	let z = Math.floor(256 / 3);
	
function change() {
	var x = Math.floor(Math.random() * 256); // range is 0-255
	var y = Math.floor(Math.random() * 256);
	var z = Math.floor(Math.random() * 256);
	var thergb = "rgb(" + x + "," + y + "," + z + ")"; 

	//document.body.style.background=thergb;*/
