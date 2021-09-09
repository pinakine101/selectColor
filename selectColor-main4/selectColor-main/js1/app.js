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
document.addEventListener('DOMContentLoaded', ()=> {


let tabsBtn = document.querySelectorAll(".tabs__nav-btn");
let tabsContent = document.querySelectorAll(".intro_1");
let tabsNav = document.querySelector(".tabs__nav");
let intro_1 = document.querySelectorAll(".intro_1")
// let colors = document.querySelectorAll('span');
let icon = document.querySelector('.icon');
let contButt = document.querySelectorAll('.butt');
let cou = 0;
let cou1 = 1;
let cou2 = 4;


let buff;


function showColorText (){
	intro_1.forEach((item, i) => {
		if (tabsBtn[i].classList.contains('active')) {
			const color = intro_1[i].querySelector('span.active');
			$(color).each(function (i, el) {
			const  item = $(el).css("backgroundColor");
			let col = rgb2hex(item);
			buff = col;
			})
		};
	});
};

// })
//______Active Color_________//

let textColor = document.createElement('textCol');

$(intro_1).on("mousewheel");

intro_1.forEach(function (item){
	item.addEventListener('click', (e)=>{
		const target = e.target;
		$(intro_1).off("mousewheel");
		if (!target.classList.contains("active")) {
					$(intro_1).children().removeClass('active');
					textColor.classList.remove('textColor');
		};	
		
		textColor.classList.add('textColor');
		target.classList.add('active');
		showColorText();
		textColor.innerHTML = `<p> ${buff}</p>`;
		target.append(textColor);

	});
});



intro_1.forEach(function (item){
	item.addEventListener('dblclick', (e)=>{
		const target = e.target;
		target.classList.remove('active');
		textColor.remove();
		$(intro_1).on("mousewheel", wheel);
	});
});
	


//_______Buttuns_______///


icon.addEventListener('click', ()=>{
	actColorCalc ();
	// shuffleArray(arrTon2);
	// shuffleArray(arrTon);
	// calcColor(cou, cou1, cou2)
	
});

var y = 2;
function addColor(){
	let arryAddColor = [
		'<span class = color1 ></span>',
		'<span class = color2 ></span>',
		'<span class = color3 ></span>',
		'<span class = color4 ></span>',
		'<span class = color5 ></span>',
		'<span class = color6 ></span>',
		'<span class = color7 ></span>',
		'<span class = color8 ></span>'
	];

	intro_1.forEach((item, i) => {
		// y++;
		if (tabsBtn[i].classList.contains('active')) {
			if (y >= arryAddColor.length) {y = 0 };
			// counterPlus();
			
			let newColor = $(arryAddColor[y++]).insertAfter('span.active');
			if (tabsBtn[0].classList.contains('active')){
				$(newColor).css("background-color", `${arrTon[y]}`);
			}
			if (tabsBtn[1].classList.contains('active')){
				$(newColor).css("background-color", `${arrTon2[y]}`);
			}
			console.log (y);
		};
	});
};

contButt[0].addEventListener('click', addColor);

contButt[1].addEventListener('click', () => {
	document.querySelector('span.active').style.display = 'none';
	});

contButt[2].addEventListener('click', () => {
		contButt[2].classList.toggle('buttRotate90');
		intro_1.forEach((i) => {
			i.classList.toggle('row');
			if (i.classList.contains('row')){axisSort = 'x'} else {axisSort = 'y'};
			console.log(axisSort);
		});
		
});

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

tabsNav.addEventListener('click', (event) =>{
	let count = 0;
	let count1 = 0;
	let count2 = 0;
	let count3 = 0;
	let count4 = 0;
	let count5 = 0;
	let count6 = 0;
	let count7 = 0;
	
	let target = event.target;
	if (target && target.classList.contains('tabs__nav-btn')) {
		
		tabsBtn.forEach((item, i) => {
			if (target == item) {
				hideTabContent();
				showTabsContent(i);
			if(tabsBtn[0].classList.contains('active')&& count <0){count++; calcColor(cou, cou1, cou2)};
			if(tabsBtn[1].classList.contains('active')&& count1 <1){count1++; calcColor(cou, cou1, cou2)};
			if(tabsBtn[2].classList.contains('active')&& count2 <1){count2++; calcColor(cou, cou1, cou2)};
			
			};
		});
	};
});

//______ColorPicker_________//

let deleteColPick = function () {
	$('.colorpickerHolder').remove();
	
};

intro_1.forEach(function (color) {
	color.addEventListener("contextmenu", colorPicker);
	color.addEventListener("click", deleteColPick);
	
});

$(intro_1).on("contextmenu", false);

function rgb2hex (color) { 
	return "#"+(color.match(/\b(\d+)\b/g).map(function(digit) { 
		return ('0' + parseInt(digit).toString(16)).slice(-2) 
	})).join(''); 
};

function colorPicker(e) {
	const contextBox = document.createElement('ColPick');
	contextBox.classList.add('colorpickerHolder');
	document.querySelector('body').append(contextBox);
	let span = e.target;
	let box = $('.colorpickerHolder');
	let spanColor = $(span).css('backgroundColor');
	let col = rgb2hex(spanColor);
	
		$(box).css({
		"position": "absolute",
		"left": e.pageX + "px",
		"top": e.pageY + "px"
	});

	$(box).ColorPicker({
		
		flat: true,
		color: col,
		onChange: function (hsb, hex, rgb) {
			$(span).css('backgroundColor', '#' + hex, );
		}
	});
	
}

/*______CalcColor____________________
из выбранного цвета генерируется массив цветов в 
8 параметрах тона и в 8 параметрах цвета_*/



function actColorCalc () {
	
	$('span.active').each(function (indx, el) {
		let colAct = document.querySelector('span.active')
		const  color = $(el).css("backgroundColor"), [r,g,b] = color.match(/\d+/g);
		const colHsl = RGB2HSL(r, g, b);
		const regexp = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g;
		let result = regexp.exec(colHsl).slice(1);
		let h = result[0];
		let s = result[1];
		let l = result[2];

		
		$('el:contains("active")').css('backgroundColor', `hsl(${h}, ${s}%, ${l}%)`);
		if (cou > arrTon.length) {cou = 0 };
		$('span').siblings('.color1').css( "background", `${arrTon[cou++]}` );
		$('span').siblings('.color2').css( "background", `${arrTon[cou++]}` );
		$('span').siblings('.color3').css( "background", `${arrTon[cou++]}` );
	
		});
	
	};
	

function randomInteger(min, max) {
		// случайное число от min до (max+1)
		let rand = min + Math.random() * (max  - min);
		return Math.floor(rand);
}

class colorGamma {
	constructor (tabsBtn,  array) {
		this.tabsBtn = tabsBtn;
		this.array = array;
	}
	fillColor() {
		if(this.tabsBtn.classList.contains('active')){
			return this.array;
		}
	}
};

class calculationColor {
	constructor (counter, tabsBtn, arrCol){
		this.counter = counter;
		this.tabsBtn = tabsBtn;
		this.arrCol = arrCol;
	}
};

class ColorType {
	constructor (Hue, Sat, Light) {
		this.Hue = Hue;
		this.Sat = Sat;
		this.Light = Light;
	}
	calcTone(a, b, c, d) {
		this.Hue =  randomInteger(a, b);
		if (this.Hue > a && this.Hue < b) {this.Sat = c, this.Light = d}
		let res =`hsl(${this.Hue}, ${this.Sat}%, ${this.Light}%)`;
		return res;
	};
};

let arrTon = [
	[new ColorType().calcTone(0, 40, 100, 17)],
	[new ColorType().calcTone(41, 96, 100, 22)],
	[new ColorType().calcTone(97, 153, 100, 34)],
	[new ColorType().calcTone(154, 200, 100, 46)],
	[new ColorType().calcTone(200, 281, 100, 57)],
	[new ColorType().calcTone(281, 324, 50, 68)],
	[new ColorType().calcTone(325, 360, 100, 77)],
];

let arrTon2 = [
	[new ColorType().calcTone(0, 40, 20, 57)],
	[new ColorType().calcTone(41, 96, 20, 52)],
	[new ColorType().calcTone(97, 153, 20, 54)],
	[new ColorType().calcTone(154, 200, 20, 56)],
	[new ColorType().calcTone(200, 281, 20, 57)],
	[new ColorType().calcTone(281, 324, 90, 58)],
	[new ColorType().calcTone(325, 360, 10, 57)]
];





function shuffleArray(array) {
		for (var i = array.length - 1; i > 0; i--) {
			var j = Math.floor(Math.random() * (i + 1));
			var temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}
	};

	//___COUNTER____///

function counterPlus(a){
	
	if (cou == a.length) {cou = 0 };
	if (cou1 == a.length) {cou1 = 0 } ;
	if (cou2 == a.length) {cou2 = 0 } ;
	// console.log(cou);
};

function counterMinus(a) {
if (cou == -1) {cou = a.length-1};
if (cou1 == -1) {cou1= a.length-1};
if (cou2 == -1) {cou2 = a.length-1};
// i=10;i>=0;i--
}   


// function wheel(){
// 	window.addEventListener('mousewheel', (e)=>{
	
// 		let wheelDelta = 0;
// 	   if(e.wheelDelta /120 > 0) {
// 		   calcColor(cou++, cou1++, cou2++ );
// 		   console.log('plus');
// 	   }
// 	   else {calcColor(cou--, cou1--, cou2--);
// 		   console.log('minus');
// 		   }
// 	   });
// 	}
// 	
function wheel(){
	$(intro_1).on("mousewheel", function(e) {
		let wheelDelta = 0;
	if(e.wheelDelta /80 > 0) {
		calcColor(cou++, cou1++, cou2++ );
		console.log('plus');
	}
	else {calcColor(cou--, cou1--, cou2--);
		console.log('minus');
		}
	});
}
wheel();

function calcColor (a, b, c){	
	
	intro_1.forEach((item, i) => {
		
		let color1 = intro_1[i].querySelectorAll('.color1');
		let color2 = intro_1[i].querySelectorAll('.color2');
		let color3 = intro_1[i].querySelectorAll('.color3');

		if (tabsBtn[i].classList.contains('active')) {

			counterPlus(arrTon);
			counterMinus(arrTon);

			color1.forEach((item) =>{
				item.style.background =	new colorGamma(tabsBtn[0], arrTon[a]).fillColor();
				item.style.background =	new colorGamma(tabsBtn[1], arrTon2[a]).fillColor();
				item.style.background =	new colorGamma(tabsBtn[2], arrTon[a]).fillColor();
				console.log(a);
			});

			color2.forEach((item) =>{
				item.style.background =	new colorGamma(tabsBtn[0], arrTon[b]).fillColor();
				item.style.background =	new colorGamma(tabsBtn[1], arrTon2[b]).fillColor();
				item.style.background =	new colorGamma(tabsBtn[2], arrTon[b]).fillColor();
				console.log(b)
			});
		
			color3.forEach((item) =>{
				item.style.background =	new colorGamma(tabsBtn[0], arrTon[c]).fillColor();
				item.style.background =	new colorGamma(tabsBtn[1], arrTon2[c]).fillColor();
				item.style.background =	new colorGamma(tabsBtn[2], arrTon[c]).fillColor();
				console.log(c)
			})
		};
		
	});
	// console.log('гамма работает')
	// return a, b, c;
};


	
calcColor(cou, cou1, cou2)

function changeColorSiwp (h, s, l){	
		
	$('span.active').each(function(indx, el) {

		// let colAct = document.querySelector('span.active');
		const  color = $(el).css("backgroundColor"), [r,g,b] = color.match(/\d+/g);
		const colHsl = RGB2HSL(r, g, b);
		const regexp = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g;
		let res = regexp.exec(colHsl).slice(1);
		let h =  res[0] = + res[0] + 10;
		el.style.backgroundColor = `hsl(${h}, ${res[1]}%, ${res[2]}%)`;
		console.log (el);
		// return h, s, l;
	});
};


//______SORTABLE_______////

let axisSort = 'y';

window.addEventListener('mousemove', function (event){
	if (event.clientX > 0 && event.clientX <30 
		|| event.clientY > 115 && event.clientY <145) {
		document.documentElement.style.cursor = "move";
		$(function () {
			$('div').sortable( {"disabled": false, axis: axisSort});
			
			} );
	} else  {document.documentElement.style.cursor = "default";
	$(function () {
		$('div').sortable( {"disabled": true });
		} );
	};
	
}) ;

	//  let coco = RGB2HSL(r,g,b);

	//  function rgb2hex (color) { return "#"+(color.match(/\b(\d+)\b/g).map(function(digit)
	//  { return ('0' + parseInt(digit).toString(16)).slice(-2) })).join(''); };
	 
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

	// ХОРОШАЯ ГАММА 
			// H_2 = H_1 - 100; S_2 = 100;	L_2 =  L_1 + 3;
			// H_3 = H_1 - 180;	S_3 = 32;	L_3 = 14;


//______Swip_________//

let clickStartX = 0;
let clickStartY = 0;
let clickEndX = 0;
let clickEndY = 0;

intro_1.forEach(function (item){
	item.addEventListener('click', (e)=>{
		const target = e.target;
   
		target.addEventListener('mousedown', function(event) {
			clickStartX = event.clientX;
			clickStartY = event.clientY;
			// console.log(event)
		}, false);

		target.addEventListener('mouseup', function(event) {
			clickEndX = event.clientX;
			clickEndY = event.clientY;
			handleGesure();
			// console.log(event)
		}, false); 
	});
});


function handleGesure() {
		var xAbs = Math.abs(clickStartX - clickEndX);
		var yAbs = Math.abs(clickStartY - clickEndY);
		if (xAbs > 10 || yAbs > 10) {
			if (xAbs > yAbs) {
				if (clickEndX <clickStartX) {
					
					changeColorSiwp();
					
					 console.log('left!');
				} else {
				//  changeColorLeft (colAct)
					console.log('right!');/*СВАЙП ВПРАВО*/
				}
			} else {
				if (clickEndY < clickStartY) {
                    changeColorUp()
					console.log('up!');
				} else {
                    changeColorDown()
					console.log('down!');
				}
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


	
});