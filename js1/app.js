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
let colors = document.querySelectorAll('span');
let icon = document.querySelector('.icon');
let contButt = document.querySelectorAll('.butt');


//______Active Color_________//

intro_1.forEach(function (item){
	
	item.addEventListener('click', (e)=>{
		const target = e.target;
		if (!target.classList.contains("active")) {
			let colors = document.querySelectorAll('span');
			colors.forEach(function (item1) {
				item1.classList.remove('active');
			});
		};
		target.classList.toggle('active');
	});
});

//_______Buttuns_______///

icon.addEventListener('click', ()=>{
	// showColorText ();
	calcColor (showColorText);
	// console.log(result[0])
});

let arr = [
	'color1',
	'color2',
	'color3',
	'color4',
	'color5',
	'color6',
	'color7',
	'color8'
];

var y = 2;
contButt[0].addEventListener('click',  () => {
	let newColor = document.createElement('span');
	intro_1.forEach((item, i) => {
		if (tabsBtn[i].classList.contains('active')) {
				newColor.classList.add( arr [y++ % arr.length]);
		};
		$(newColor).insertAfter('span.active');
	});

});

contButt[1].addEventListener('click', () => {
	let colorActive = document.querySelector('span.active');
	colorActive.style.display = 'none'; 
		});

	
contButt[2].addEventListener('click', () => {
		contButt[2].classList.toggle('buttRotate90');
		intro_1.forEach((i) => {
			i.classList.toggle('row');
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
showTabsContent(2);

let isCalled = false;

tabsNav.addEventListener('click', (event) =>{
	const target = event.target;
	calcColor()
	if (target && target.classList.contains('tabs__nav-btn')) {
		tabsBtn.forEach((item, i) => {
			if (target == item) {
				hideTabContent();
				showTabsContent(i);
				// if (!tabsBtn[i].classList.contains('active')){
				// 	if(!isCalled) {
				// 		isCalled = true;
				// 		calcColor()}
				// 	else };
				// 		console.log(isCalled)
			};
		});
	};
});

//______ColorPicker_________//

let deleteColPick = function () {
	$('.colorpickerHolder').remove();
	showColorText ();
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

function handleGesure() {
		var xAbs = Math.abs(clickStartX - clickEndX);
		var yAbs = Math.abs(clickStartY - clickEndY);
		if (xAbs > 10 || yAbs > 10) {
			if (xAbs > yAbs) {
				if (clickEndX <clickStartX) {
					
					// changeColorLeft();
					
					 console.log('left!');
				} else {
				//  changeColorLeft (colAct)
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

/*______CalcColor____________________
из выбранного цвета генерируется массив цветов в 
девяти параметрах тона и в 9 параметрах цвета_*/


// let intro_1Active = document.querySelector('.tabs__nav-btn.active');

// butt.addEventListener('click',()=> {
	
// console.log(intro_1Active)});


// function createGamma(h, s, l) {
	
// 	 h = randomInteger(100, 170);
// 	 s = randomInteger(50,100);
// 	 l = randomInteger(50,100);

// 	let a = h-30, b = s+50, c= l-10;
// 	let H = h-20, S = s-20, L= l-5;
// 	let H1 = h-50, S1 = s+10, L1= l+10;
// 	let H2 = h+20, S2 = s-5, L2= l+5;
	
// 	// if (h >= 30 && h <=100) {
// 	// 	s -=  10,
// 	// 	l -= 20;
// 	// };
	
	
// 	color1.style.background = `hsl(${H}, ${S}%, ${L}%)`;
// 	color2.style.background = `hsl(${H2}, ${S2}%, ${L2}%)`;
// 	color3.style.background = `hsl(${H1}, ${S1}%, ${L1}%)`;
	
//   };



let result;

function actColor () {
	
	$(colors).each(function (indx, el) {
		const  color = $(el).css("backgroundColor"), [r,g,b] = color.match(/\d+/g);
		const colHsl = RGB2HSL(r, g, b);
		const regexp = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g;
		result = regexp.exec(colHsl).slice(1);
	});
}

function showColorText (){
	intro_1.forEach((item, i) => {
		if (tabsBtn[i].classList.contains('active')) {
			let color = intro_1[i].querySelectorAll('span');
			$(color).each(function (i, el) {
			let  item = $(el).css("backgroundColor");
			let col = rgb2hex(item)
			$(this).text(col);
			})
		};	
	});
};
// showColorText ();

 function calcColor (){	
	
	actColor ();
	
	let H,H_1,H_2,H_3,H_4,H_5,H_6,H_7,H_8,S,S_1,S_2,S_3,S_4,S_5,S_6,S_7,S_8,L,L_1,L_2,L_3,L_4,L_5,L_6,L_7,L_8;

	// H = result[0];
	// S = result[1];
	// L = result[2];

	// H_1 = +H+ 150;
	// S_1 = +S+ 50;
	// L_1 = +L+ 50;

	let colAct = document.querySelector('span.active');
	intro_1.forEach((item, i) => {
		if (tabsBtn[0].classList.contains('active')) {
			H_1 = 200;	S_1 = 50;	L_1 = 90;
			H_2 = 80;	S_2 =  20;	L_2 = 50;
			H_3 =  50;	S_3 = 10;	L_3 = 50;
		};
		if (tabsBtn[1].classList.contains('active')) {
			H_1 = 100;	S_1 = 50;	L_1 = 90;
			H_2 = 30;	S_2 = 20;	L_2 = 50;
			H_3 =  150;	S_3 = 10;	L_3 = 50;
		};
		if (tabsBtn[2].classList.contains('active')) {
			H_1 = 50;	S_1 = 50;	L_1 = 90;
			H_2 = 180;	S_2 = 20;	L_2 = 50;
			H_3 =  250;	S_3 = 10;	L_3 = 50;
		};

		if (tabsBtn[3].classList.contains('active')) {
			H_1 = 20;	S_1 = 50;	L_1 = 90;
			H_2 = 80;	S_2 = 20;	L_2 = 50;
			H_3 =  170;	S_3 = 10;	L_3 = 50;
		};

		if (tabsBtn[i].classList.contains('active')) {

			let color1 = intro_1[i].querySelectorAll('.color1');
			let color2 = intro_1[i].querySelectorAll('.color2');
			let color3 = intro_1[i].querySelectorAll('.color3');
			let color4 = intro_1[i].querySelectorAll('.color4');
			let color5 = intro_1[i].querySelectorAll('.color5');
			let color6 = intro_1[i].querySelectorAll('.color6');
			let color7 = intro_1[i].querySelectorAll('.color7');
			let color8 = intro_1[i].querySelectorAll('.color8');

		
	
			color1.forEach((item) =>{item.style.background = `hsl(${H_1}, ${S_1}%, ${L_1}%)`;})
			color2.forEach((item) =>{item.style.background = `hsl(${H_2}, ${S_2}%, ${L_2}%)`;})
			color3.forEach((item) =>{item.style.background = `hsl(${H_3}, ${S_3}%, ${L_3}%)`;})
			color4.forEach((item) =>{item.style.background = `hsl(${H_4}, ${S_4}%, ${L_4}%)`;})
			color5.forEach((item) =>{item.style.background = `hsl(${H_5}, ${S_5}%, ${L_5}%)`;})
			color6.forEach((item) =>{item.style.background = `hsl(${H_6}, ${S_6}%, ${L_6}%)`;})
			color7.forEach((item) =>{item.style.background = `hsl(${H_7}, ${S_7}%, ${L_7}%)`;})
			color8.forEach((item) =>{item.style.background = `hsl(${H_8}, ${S_8}%, ${L_8}%)`;})
			// colAct.style.backgroundColor = `hsl(${H}, ${S}%, ${L}%)`;
		};
	
	});
	
};

calcColor (showColorText);

function changeColorLeft (h, s, l){	
		
		$('.color.active').each(function(indx, el) {

			let colAct = document.querySelector('.color.active');
			const  color = $(el).css("backgroundColor"), [r,g,b] = color.match(/\d+/g);
			const colHsl = RGB2HSL(r, g, b);
			const regexp = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g;
			let res = regexp.exec(colHsl).slice(1);
			h =  res[0] = + res[0] + 10;
			colAct.style.backgroundColor = `hsl(${res[0]}, ${res[1]}%, ${res[2]}%)`;
			console.log (colAct);
			return h, s, l;
		});
};

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

	
// let colAct = document.querySelector('.color.active');
 
// let  coco = RGB2HSL(colAct);

// coco = `hsl(${4}, ${54}%, ${45}%)`;

// colActh = 360, s = 100, l = 50

// let h = 360, s = 100, l = 50 ;

function randomInteger(min, max) {
	// случайное число от min до (max+1)
	let rand = min + Math.random() * (max  - min);
	return Math.floor(rand);
}
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