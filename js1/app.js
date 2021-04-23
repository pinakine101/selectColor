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
// let intro_1 = document.querySelectorAll(".intro_1");
let tabsContent = document.querySelectorAll(".intro_1");
let tabsNav = document.querySelector(".tabs__nav");

let intro_1 = document.querySelectorAll(".intro_1")
let colors = document.querySelectorAll('span');
let icon = document.querySelector('.icon');
let contButt = document.querySelectorAll('.butt');

let colAct = document.querySelector('span.active');
let color1 = document.querySelector('.color1');
let color2 = document.querySelector('.color2');
let color3 = document.querySelector('.color3');
let color4 = document.querySelector('.color4');
let color5 = document.querySelector('.color5');
let color6 = document.querySelector('.color6');
let color7 = document.querySelector('.color7');
let color8 = document.querySelector('.color8');

//______Active Color_________//

// var isMenuShow = false;
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
	calcColor ();
} );

contButt[2].addEventListener('click', () => {
	
	contButt[2].classList.toggle('buttRotate90');
			
	intro_1.forEach((i) => {
		i.classList.toggle('row');
	});
	console.log('dd')
} );

contButt[1].addEventListener('click', () => {
	let colorActive = document.querySelector('span.active');
	colorActive.style.display = 'none'; 
	// colAct.remove()
	console.log('dd')
	});

	let arr = [
		color1.style.display = 'block',
		color2.style.display = 'block',
		color3.style.display = 'block',
		color4.style.display = 'block',
		color5.style.display = 'block',
		color6.style.display = 'block',
		color7.style.display = 'block',
		color8.style.display = 'block'
	];



contButt[0].addEventListener('click',  () => {
	
	intro_1.forEach((item, i) => {
		if (tabsBtn[i].classList.contains('active')) {
			var y = 0;
			
			arr.forEach((e, i)=>{
				for (i=0; i < arr.length; i++){
					arr[i];
				}
			})
				// arr[y++ % arr.length];
		};
		// newColor.innerHTML = 'newColor';
		// document.appendChild(newColor);
		// intro_1[0].appendChild(newColor);
		// $(newColor).insertAfter('span.active');
		
	});
});

// var y = 0;

// contButt[0].addEventListener('click',  () => {
// 	let newColor = document.createElement('span');
// 	intro_1.forEach((item, i) => {
// 		if (tabsBtn[i].classList.contains('active')) {
// 				newColor.classList.add(arr[y++ % arr.length]);
// 		};
// 		// newColor.innerHTML = 'newColor';
// 		// document.appendChild(newColor);
// 		// intro_1[0].appendChild(newColor);
// 		$(newColor).insertAfter('span.active');
		
// 	});
// });
			// случайное число от min до (max+1)
		// let	block = blocks[Math.floor(Math.random()*blocks.length)];
		// 	return Math.floor(block);
	
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
				// if (item.classList.contains('active')){
				// 	if(!isCalled) {
				// 		isCalled = true;
				// 		createGamma()}};
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

function colorPicker(e) {
	
	const contextBox = document.createElement('ColPick');
	contextBox.classList.add('colorpickerHolder');
	document.querySelector('body').append(contextBox);
	let span = e.target;
	let box = $('.colorpickerHolder');
	let spanColor = $(span).css('backgroundColor');
	let col = rgb2hex(spanColor);
	

	function rgb2hex (color) { 
		return "#"+(color.match(/\b(\d+)\b/g).map(function(digit) { 
			return ('0' + parseInt(digit).toString(16)).slice(-2) 
		})).join(''); 
	};

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

// document.addEventListener("DOMContentLoaded", 
// function createGamma(h, s, l) {
	
// 	 h = randomInteger(100, 170);
// 	 s = randomInteger(50,100);
// 	 l = randomInteger(50,100);

// 	let a = h-30, b = s+50, c= l-10;
// 	let H = h-20, S = s-20, L= l-5;
// 	let H1 = h-50, S1 = s+10, L1= l+10;
// 	let H2 = h+20, S2 = s-5, L2= l+5;
	
// 	if (h >= 30 && h <=100) {
// 		s -=  10,
// 		l -= 20;
// 	};
	
	
// 	color1.style.background = `hsl(${H}, ${S}%, ${L}%)`;
// 	color2.style.background = `hsl(${H2}, ${S2}%, ${L2}%)`;
// 	color3.style.background = `hsl(${H1}, ${S1}%, ${L1}%)`;
	
//   };

//   function createGamma2(h, s, l) {
	
// 	h = randomInteger(100, 170);
// 	s = randomInteger(50,100);
// 	l = randomInteger(50,100);

//    let a = h-30, b = s+50, c= l-10;
//    let d = h-20, e = s-20, f= l-5;
//    let H1 = h-50, S1 = s+10, L1= l+10;
//    let H2 = h+20, S2 = s-5, L2= l+5;
   
//    if (h >= 30 && h <=100) {
// 	   s -=  10,
// 	   l -= 20;
//    };
   
//    color1.style.background = `hsl(${h}, ${s}%, ${l}%)`;
//    color2.style.background = `hsl(${a}, ${b}%, ${c}%)`;
//    };
 

function calcColor (){	
	let colAct = document.querySelector('span.active');
	$('span.active').each(function (indx, el) {
		const  color = $(el).css("backgroundColor"), [r,g,b] = color.match(/\d+/g);
		const colHsl = RGB2HSL(r, g, b);
		const regexp = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g;
		let res = regexp.exec(colHsl).slice(1);

		let H = res[0],
		S = res[1],
		L = res[2];
	
		let H1 = +H+ 150,
		S1 = +S+ 10,
		L1 = L -5;

		let H2 = H - 10,
		S2 = +S+ 10,
		L2 = L -20;

		let H3 = +H+ 50,
		S3 = +S+ 10,
		L3 = L -20;
		
		colAct.style.backgroundColor = `hsl(${H}, ${S}%, ${L}%)`;

		color1.style.background = `hsl(${H1}, ${S1}%, ${L1}%)`;
		color2.style.background = `hsl(${H2}, ${S2}%, ${L2}%)`;
	 	color3.style.background = `hsl(${H3}, ${S3}%, ${L3}%)`;
		color4.style.background = `hsl(${H1}, ${S1}%, ${L1}%)`;
		color5.style.background = `hsl(${H2}, ${S2}%, ${L2}%)`;
	 	color6.style.background = `hsl(${H3}, ${S3}%, ${L3}%)`;
		color7.style.background = `hsl(${H1}, ${S1}%, ${L1}%)`;
		color8.style.background = `hsl(${H2}, ${S2}%, ${L2}%)`;
	 	
		
		
		
		// return H, S, L, H1, S1, L1;
		// console.log(target)
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
});