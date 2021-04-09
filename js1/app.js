"use strict"
/*Plan
1. Сделать выбор цвета по клику на цвете - DONE
2   выбор образца цвета по движению мыши - DONE
3. Функция добавить/убрать блока
4. Выпадающее меню для меню
5. Кнопка "canculate color"
6. Сверстать все страницы
7. Добавить функционал поиска по сайту
*/
*/задачи на 01 04: переделать табы, второй клик по спану убирает актив*/


let tabsBtn = document.querySelectorAll(".tabs__nav-btn");
let intro_1 = document.querySelectorAll(".intro_1");
let tabsContent = document.querySelectorAll(".intro_1");
let tabsNav = document.querySelector(".tabs__nav");

let colors = document.querySelectorAll('span');
let butt = document.querySelector('.icon');

let spa = document.querySelector('#Спальня');
let gost = document.querySelector('#Гостинная');
let kitch = document.querySelector('#Кухня');
let dets = document.querySelector('#Детская');

// let color1 = document.querySelectorAll('.color1');
// let color2 = document.querySelectorAll('.color2');
// let color3 = document.querySelectorAll('.color3');
// let color4 = document.querySelectorAll('.color4');
// let color5 = document.querySelectorAll('.color5');
// let color6 = document.querySelectorAll('.color6');

let res;
let actColor = document.querySelector('intro_1.active');
// let dd = $('intro_1.active').children('.color1');

butt.addEventListener('click',()=> {
	 loadColor ();
	;});

	$( function() {
		$( ".intro_1" ).sortable();
		$( ".intro_1" ).disableSelection();
	  } );

	  $( function() {
		$( "span" ).resizable({
		  containment: ".intro_1"
		});
	  } );
//_______Tabs_________//

function hideTabContent() {
	tabsContent.forEach(item => {
		item.style.display = 'none';
	});
	tabsBtn.forEach(item => {
		item.classList.remove('active');
	});
};

function showTabsContent(i){
	tabsContent[i].style.display = 'flex'; 
	tabsBtn[i].classList.add('active');
};


hideTabContent();
showTabsContent(0);

let isCalled = false;
tabsNav.addEventListener('click', (event) =>{
	const target = event.target;

	if (target && target.classList.contains('tabs__nav-btn')) {
		tabsBtn.forEach((item, i) => {
			if (target == item) {
				hideTabContent();
				showTabsContent(i);
				if (item.classList.contains('active')){
					if(!isCalled) {
						isCalled = true;
						loadColor ()}};
			};
		});
	};
});




//______ColorPicker_________//


let deleteColPick = function () {
	$('.colorpickerHolder').remove();
};

colors.forEach(function (color) {
	color.addEventListener("contextmenu", colorPicker);
	color.addEventListener("mouseup", deleteColPick);
});

tabsContent.forEach(function (color) {
	color.addEventListener("contextmenu", colorPicker);
	color.addEventListener("mouseup", deleteColPick);
});
$('.intro_1').on("contextmenu", false);


function colorPicker(e) {

	const contextBox = document.createElement('div');
	contextBox.classList.add('colorpickerHolder');
	document.querySelector('body').append(contextBox);

	let span = e.target;
	let box = $('.colorpickerHolder');
	let spanColor = $(span).css('backgroundColor');
	let col = rgb2hex(spanColor);

	function rgb2hex (color) { return "#"+(color.match(/\b(\d+)\b/g).map(function(digit)
	{ return ('0' + parseInt(digit).toString(16)).slice(-2) })).join(''); };

		$(box).css({
		"position": "absolute",
		"left": e.pageX + "px",
		"top": e.pageY + "px"
	});

	$(box).ColorPicker({
		flat: true,
		color: col,
		onSubmit: deleteColPick,
		onChange: function (hsb, hex, rgb) {
			$(span).css('backgroundColor', '#' + hex, );
		}
	});
}

//______Active Color_________//

var isMenuShow = false;
colors.forEach(function (item) {
	item.addEventListener("click", function () {
		if (!item.classList.contains("active")) {
			colors.forEach(function (item) {
				item.classList.remove('active');
			});
		};
		item.classList.add('active');
		item.addEventListener("dblclick", function () {
			item.classList.remove('active');
		})
	});
});


tabsBtn.forEach((item,)=>{
    item.addEventListener("click", ()=>{
        // $('.intro_1.active').children('.color1').addClass('active');
        if (item.classList.contains('active')){
            if(!isCalled) {
                isCalled = true;
                loadColor ()}};
        });
    });

document.querySelector('.color1').classList.add('active');


/*______CalcColor____________________
из выбранного цвета генерируется массив цветов в 
девяти параметрах тона и в 9 параметрах цвета_*/




function createGamma(h, s, l) {
    h = randomInteger(100, 170);
    s = randomInteger(50,100);
    l = randomInteger(50,100);
   };

function randomInteger(min, max) {
	// случайное число от min до (max+1)
	let rand = min + Math.random() * (max  - min);
	return Math.floor(rand);
}

// document.addEventListener("DOMContentLoaded", fillColor() );

  //   createGamma();
//сделать так что бы при загрузке таба запускалась фунция.


function splitColor (){	
	$('span.active').each(function reuslt (indx, el) {
		const  color = $(el).css("backgroundColor"), [r,g,b] = color.match(/\d+/g);
		const colHsl = RGB2HSL(r, g, b);
		const regexp = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g;
		res = regexp.exec(colHsl).slice(1);
	});
	return res;
};

function calc(){
    const HSL = splitColor();
    const H = HSL[0],
        S = HSL[1],
        L = HSL[2];
       return [H, S, L]
}

function randomInteger2(min, max) {
    	let rand = min + Math.random() * (max - min);
    	return Math.floor(rand);
      }

function loadColor (){
   let calcCol = fillColor();

    let kar = calc();
    let rand = randomInteger2(100, 350);
    let gamma = $('.intro_1').children();

        if (tabsBtn[0].classList.contains('active')) { 
            gamma[0].style.background = `hsl(${[kar[0]-150]}, ${kar[1]+10}%, ${kar[2]-10}%)`;
            gamma[1].style.background = `hsl(${rand}, ${kar[1]+20}%, ${kar[2]-20}%)`;
            gamma[2].style.background = `hsl(${rand}, ${kar[1]+10}%, ${kar[2]+10}%)`;
            gamma[3].style.background = `hsl(${rand}, ${kar[1]-20}%, ${kar[2]+5}%)`;
    
        }
        if (tabsBtn[1].classList.contains('active')){
        gamma[0].style.background = `hsl(${rand}, ${kar[1]+20}%, ${kar[2]+10}%)`;
        gamma[1].style.background = `hsl(${rand}, ${kar[1]-20}%, ${kar[2]+10}%)`;
        };
       
        console.log( calcCol)
};

function fillColor (){
    let colorActive =  document.querySelector('span.active');
    
       
    let kar = splitColor();
    let rand = randomInteger2(2, 360);

	
		
		let gamma = $('.intro_1').children();
	
    
  
        if (tabsBtn[0].classList.contains('active')) { 
		gamma[0].style.background = `hsl(${[kar[0]-150]}, ${kar[1]+10}%, ${kar[2]-10}%)`;
		gamma[1].style.background = `hsl(${rand}, ${kar[1]+20}%, ${kar[2]-20}%)`;
        gamma[2].style.background = `hsl(${rand}, ${kar[1]+10}%, ${kar[2]+10}%)`;
        gamma[3].style.background = `hsl(${rand}, ${kar[1]-20}%, ${kar[2]+5}%)`;
        }

        if (tabsBtn[1].classList.contains('active')){
            gamma[4].style.background = `hsl(${[rand]}, ${kar[1]+5}%, ${kar[2]-20}%)`;
            gamma[5].style.background = `hsl(${rand}, ${kar[1]-15}%, ${kar[2]-4}%)`;
            gamma[6].style.background = `hsl(${rand}, ${kar[1]+10}%, ${kar[2]+15}%)`;
            gamma[7].style.background = `hsl(${rand}, ${kar[1]-5}%, ${kar[2]+5}%)`;
        };
   
        colorActive.style.background = `hsl(${kar[0]}, ${kar[1]}%, ${kar[2]}%)`;
		console.log(gamma);
        // return karkar;
       
};
	function RGB2HSL(r, g, b){
			
		r /= 255;
		g /= 255;
		b /= 255;
		let cmin = Math.min(r,g,b),
			cmax = Math.max(r,g,b),
			delta = cmax - cmin,
			h = 0,
			s = 0,
			l = 0;
	  
		if (delta == 0)
		  h = 0;
		else if (cmax == r)
		  h = ((g - b) / delta) % 6;
		else if (cmax == g)
		  h = (b - r) / delta + 2;
		else
		  h = (r - g) / delta + 4;
	  
		h = Math.round(h * 60);
	  
		if (h < 0)
		  h += 360;
	  
		l = (cmax + cmin) / 2;
		s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
		s = +(s * 100).toFixed(1);
		l = +(l * 100).toFixed(1);
		
		return "hsl(" + h + "," + s + "%," + l + "%)";

	};

    
//______Swip_________//

let clickStartX = 0;
let clickStartY = 0;
let clickEndX = 0;
let clickEndY = 0;

colors.forEach(function(color) { 
	color.addEventListener('mousedown', function(event) {
		clickStartX = event.clientX;
		clickStartY = event.clientY;
		// console.log(event)
	}, false);
	color.addEventListener('mouseup', function(event) {
		clickEndX = event.clientX;
		clickEndY = event.clientY;
		handleGesure();
		// console.log(event)
	}, false); 
});



function changeColorLeft(){	
    let HSL = splitColor();
    let colorActive =  document.querySelector('span.active');
        colorActive.style.background = `hsl(${HSL[0]}, ${HSL[1]}%, ${HSL[2]-2}%)`;
 };

 

function handleGesure() {
   
		let xAbs = Math.abs(clickStartX - clickEndX);
		let yAbs = Math.abs(clickStartY - clickEndY);
		if (xAbs > 10 || yAbs > 10) {
          
			if (xAbs > yAbs) {
				if (clickEndX <clickStartX) {
                   changeColorLeft()
					 console.log('left');
				} else {
                    changeColorRight();
					console.log('right!');/*СВАЙП ВПРАВО*/
				}
			// } else {
			// 	if (clickEndY < clickStartY) {
            //         changeColorUp()
			// 		console.log('up!');
			// 	} else {
            //         changeColorDown()
			// 		console.log('down!');
			// 	}
			}
		}
    };


    
// var initialPoint;
// var finalPoint;
// colors.forEach(function (color) {
// 	color.addEventListener('touchstart', function (event) {
// 		event.preventDefault();
// 		event.stopPropagation();
// 		initialPoint = event.changedTouches[0];
// 	}, false);

// 	color.addEventListener('touchend', function (event) {
// 		event.preventDefault();
// 		event.stopPropagation();
// 		finalPoint = event.changedTouches[0];
// 		var xAbs = Math.abs(initialPoint.pageX - finalPoint.pageX);
// 		var yAbs = Math.abs(initialPoint.pageY - finalPoint.pageY);
// 		if (xAbs > 10 || yAbs > 10) {
// 			if (xAbs > yAbs) {
// 				if (finalPoint.pageX < initialPoint.pageX) {
// 					changeColorLeft();
// 					console.log('left!');
// 				} else {
// 					console.log('right!');/*СВАЙП ВПРАВО*/
// 				}
// 			} else {
// 				if (finalPoint.pageY < initialPoint.pageY) {
// 					console.log('up!');
// 				} else {
// 					console.log('down!');
// 				}
// 			}
// 		}
// 	}, false);
// });



//______DobMat_________//

// let colAct = document.querySelector('.color.active');
 
// let  coco = RGB2HSL(colAct);

// coco = `hsl(${4}, ${54}%, ${45}%)`;

// colActh = 360, s = 100, l = 50



// let h = 360, s = 100, l = 50 ;


//   function randomInteger2(min, max, e, r) {
// 	// случайное число от min до (max+1)
// 	let rand = min + Math.random() * (max  - min) + (r-e);
// 	return Math.floor(rand);
//   }

// h = randomInteger2(20, 50, 80, 90);


// if (h >= 30 && h <=100) {
// 	s -=  10,
// 	l -= 20;
	
// };

// colAct.style.background = `hsl(${h}, ${s}%, ${l}%)`;
// // 					/
// 					console.log (h, s, l);
// 				// 		});
// };

// function generateHslaColors (saturation, lightness, alpha, amount) {
// 	let colorsQ = []
// 	let huedelta = Math.trunc(360 / amount)
  
// 	for (let i = 0; i < amount; i++) {
// 	  let hue = i * huedelta
// 	  colorsQ.style.backgroundColor = `hsla(${hue},${saturation}%,${lightness}%,${alpha})`;
// 	}
  
// 	console.log(colorsQ);
// };
// generateHslaColors(100, 50, 50);




	



