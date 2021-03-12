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

//_______Tabs_________//

let tabsBtn = document.querySelectorAll(".tabs__nav-btn");
let intro_1 = document.querySelectorAll(".intro_1")

tabsBtn.forEach(function (item) {
	item.addEventListener("click", function activeTab() {
		let currentBtn = item;
		let tabId = currentBtn.getAttribute("data-tab");
		let currentTab = document.querySelector(tabId);
		let colors = document.querySelectorAll('.color');

			if (!currentBtn.classList.contains('active')) {

			tabsBtn.forEach(function (item) {
				item.classList.remove('active');
			});

			intro_1.forEach(function (item) {
				item.classList.remove('active');
			});

			colors.forEach(function (item) {
				item.classList.remove('active');
			});

			currentBtn.classList.add('active');
			currentTab.classList.add('active');

		}
	});
});
document.querySelector('.tabs__nav-btn:nth-child(1)').click();


//______ColorPicker_________//

let deleteElement = function () {
	$('.colorpickerHolder').remove();
};

let colors = document.querySelectorAll('.color');

colors.forEach(function (color) {
	color.addEventListener("contextmenu", colorPicker);
	color.addEventListener("mouseover", deleteElement);
});

$(colors).on("contextmenu", false);

function colorPicker(e) {

	const contextBox = document.createElement('ColPick');
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
		onChange: function (hsb, hex, rgb) {
			$(span).css('backgroundColor', '#' + hex, );
		}
	});
}

//______Active Color_________//

colors.forEach(function (color) {
	color.addEventListener("click", function select() {
		
		if (!color.classList.contains("active")) {
			colors.forEach(function (color) {
				color.classList.remove('active');
			});
		};
		color.classList.add('active');
	});
	color.addEventListener("dblclick", function () {
		colors.forEach(function (color) {
			color.classList.remove('active');
		});
	});
});



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
					
					changeColorLeft();
					
					 console.log('left!');
				} else {
				 changeColorLeft (colAct)
					console.log('right!');/*СВАЙП ВПРАВО*/
				}
			} else {
				if (clickEndY < clickStartY) {
					console.log('up!');
				} else {
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

/*______CalcColor____________________
из выбранного цвета генерируется массив цветов в 
девяти параметрах тона и в 9 параметрах цвета_*/
let color1 = document.querySelector('#color1');

document.addEventListener("DOMContentLoaded", function() {
	
	let h = randomInteger(1, 170);
	let s = randomInteger(50,100);
	let l = randomInteger(50,100);

	let a = h-30, b = s+50, c= l-10;
	
	if (h >= 30 && h <=100) {
		s -=  10,
		l -= 20;
	};
	// color1.style.background = `rgb(${h}, ${s}, ${l})`;
	color1.style.background = `hsl(${h}, ${s}%, ${l}%)`;
	let intro_1 = document.querySelectorAll('.intro_1');
	
	intro_1.innerHTML +=  `<span class="color" id ="color2" ></span>`;
	
	// intro_1.classList.add('#color2');
	color2.style.background = `hsl(${a}, ${b}%, ${c}%)`;
	console.log(color2);
  });

function calcColor (h, s, l){	
		
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


// function setTheme(H, inputType) {
// 	// Convert hex to RGB first
// 	let r = 0, g = 0, b = 0;
// 	// if (H.length == 4) {
// 	//   r = "0x" + H[1] + H[1];
// 	//   g = "0x" + H[2] + H[2];
// 	//   b = "0x" + H[3] + H[3];
// 	// } else if (H.length == 7) {
// 	//   r = "0x" + H[1] + H[2];
// 	//   g = "0x" + H[3] + H[4];
// 	//   b = "0x" + H[5] + H[6];
// 	// }
// 	// Then to HSL
//
	
// 	document.documentElement.style.setProperty(`--${inputType}-color-h`, h);
// 	document.documentElement.style.setProperty(`--${inputType}-color-s`, s + '%');
// 	document.documentElement.style.setProperty(`--${inputType}-color-l`, l + '%');
//   }

//   console.log(setTheme(colors))



	


	// $(colAct).each(function(indx, el){
	// 	$(el).css("backgroundColor").style.setProperty(' --primary-color--dark', el.target)
	//   });
			// $(colAct).each(function(indx, el){
			// 	let  color = root.setProperty(' --primary-color--dark', item);
			// 	// let  color = $(el).css("backgroundColor"), [r,g,b] = color.match(/\d+/g);
			// 	setTheme();
			// 	//  r =+r+ 15;
			// 	//  g = +g+ 15;
			// 	//  b =+b+ 15;
			// 	 colAct.style.backgroundColor = color;
				//  colAct.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;

	// let colAct = document.querySelector('.color.active');
	// colAct.classList.add('.color4');
	// console.log(colAct);


	//
	
					// $(item).each(function(indx, el){
						
					// 	let  color = $(el).css("backgroundColor"), [h,s,l] = color.match(/\d+/g);
					// 	 h -= 15;
					// 	 s = +s+ 15;
					// 	 l =+l+ 15;
					// 	item.style.backgroundColor = `hsl(${h}, ${s}%, ${l}%)`;
					// 	rgb2Hsl(color);
					// 	console.log (item);
					// 		});

// rgbToHsl();
// let	x = 100,
// 	y = 50,
// 	z = 50;
// let = ChangedColor;
// ChangedColor = `hsl(${x}, ${y}%, ${z}%)`;
