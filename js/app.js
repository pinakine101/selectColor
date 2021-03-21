"use strict"
/*Plan
1. Сделать выбор цвета по клику на цвете - DONE
2   выбор образца цвета по движению мыши
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
document.querySelector('.tabs__nav-btn:nth-child(3)').click();


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

//______ChangeColor_________//

function changeColorLeft (){
// let colAct = document.querySelector('#color4');
	let colAct = document.querySelector('.color.active');
	
	let colHSL = document.documentElement.style.setProperty('--darken',"15%");
	// colHSL += + 10;
	colAct.style.backgroundColor = colHSL;
	
		
		console.log (colAct);	

			// $(colAct).each(function(indx, el){
			// 	let  color = $(el).css("backgroundColor"), [h,s,l] = color.match(/\d+/g);
			// 	 h =+h+ 10;
			// 	 s = +s+ 10;
			// 	 l =+l+ 10;
			// 	 colAct.style.backgroundColor = `rgb(${h}, ${s}, ${l})`;
			// 	console.log (colAct);
			// 		});
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

function handleGesure() {
		var xAbs = Math.abs(clickStartX - clickEndX);
		var yAbs = Math.abs(clickStartY - clickEndY);
		if (xAbs > 10 || yAbs > 10) {
			if (xAbs > yAbs) {
				if (clickEndX <clickStartX) {
					changeColorLeft();
					
					 console.log('left!');
				} else {
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
// 	r /= 255;
// 	g /= 255;
// 	b /= 255;
// 	let cmin = Math.min(r,g,b),
// 		cmax = Math.max(r,g,b),
// 		delta = cmax - cmin,
// 		h = 0,
// 		s = 0,
// 		l = 0;
  
// 	if (delta == 0)
// 	  h = 0;
// 	else if (cmax == r)
// 	  h = ((g - b) / delta) % 6;
// 	else if (cmax == g)
// 	  h = (b - r) / delta + 2;
// 	else
// 	  h = (r - g) / delta + 4;
  
// 	h = Math.round(h * 60);
  
// 	if (h < 0)
// 	  h += 360;
  
// 	l = (cmax + cmin) / 2;
// 	s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
// 	s = +(s * 100).toFixed(1);
// 	l = +(l * 100).toFixed(1);
	
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
