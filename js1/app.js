"use strict"
/*Plan
1. Сделать выбор цвета по клику на цвете - DONE
2   выбор образца цвета по движению мыши - DONE
3. Функция добавить/убрать блока - DONE
4. Выпадающее меню для меню
5. Кнопка "canculate color" - DONE
6. Сверстать все страницы
7. Добавить функционал поиска по сайту
сайтmap octopus.do/ffvvih840cc

*/
document.addEventListener('DOMContentLoaded', () => {


	let tabsBtn = document.querySelectorAll(".tabs__nav-btn");
	let tabsContent = document.querySelectorAll(".intro_1");
	let tabsNav = document.querySelector(".tabs__nav");
	let intro_1 = document.querySelectorAll(".intro_1")
	let colors = document.querySelectorAll('span');
	let icon = document.querySelector('.icon');
	let editButt = document.querySelectorAll('.butt');
	let cou = 1;
	let cou1 = 2;
	let cou2 = 3;
	let buff;
	let textColor = document.createElement('textCol');

	function showColorText() {
		intro_1.forEach((item, i) => {
			if (tabsBtn[i].classList.contains('active')) {
				const color = intro_1[i].querySelector('span.active');
				$(color).each(function (i, el) {
					const item = $(el).css("backgroundColor");
					let col = rgb2hex(item);
					buff = col;
				})
			};
		});
	};

	//______Active Color_________//

	intro_1.forEach(function (item) {
		item.addEventListener('click', (e) => {
			const target = e.target;
			
			if (!target.classList.contains("active")) {
				$(intro_1).children().removeClass('active');
				textColor.classList.remove('textColor');
			};

			textColor.classList.add('textColor');
			target.classList.add('active');
			showColorText();
			textColor.innerHTML = `<p> ${buff}</p>`;
			target.append(textColor);
			editButt[0].removeEventListener('click', gammaListPlus);
			editButt[1].removeEventListener('click', gammaListMinus);
			editButt[0].addEventListener('click', actColorCalc);
			sliceColor();
		});
	});

	intro_1.forEach(function (item) {
		item.addEventListener('dblclick', (e) => {
			const target = e.target;
			target.classList.remove('active');
			textColor.remove();
			editButt[0].addEventListener('click', gammaListPlus);
			editButt[1].addEventListener('click', gammaListMinus);
		});
	});

	//_______Buttuns_______///

	icon.addEventListener('click', () => {
		actColorCalc();
		// changeColorSiwp();
		// shuffleArray(arrTon2);
		// shuffleArray(arrTon);
		// calcColor(cou, cou1, cou2)

	});
	
	function gammaListPlus(){
		counterPlus(arrTon);
		cou++, cou1++, cou2++;
		calcColor(cou, cou1, cou2)
	};

	function gammaListMinus(){
		counterMinus(arrTon);
		cou--, cou1--, cou2--;
		calcColor(cou, cou1, cou2)
	};

	editButt[0].addEventListener('click', gammaListPlus);
	editButt[1].addEventListener('click', gammaListMinus);

	var y = 3;

	function addColor() {
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
			if (tabsBtn[i].classList.contains('active')) {
				if (y >= arryAddColor.length) {
					y = 0
				};
				let newColor = $(arryAddColor[y++]).insertAfter('span.active');
				if (tabsBtn[0].classList.contains('active')) {
					$(newColor).css("background-color", `${arrTon[y]}`);
				}
				if (tabsBtn[1].classList.contains('active')) {
					$(newColor).css("background-color", `${arrTon2[y]}`);
				}
				console.log(y);
			};
		});
	};

	editButt[2].addEventListener('click', addColor);

	editButt[3].addEventListener('click', () => {
		document.querySelector('span.active').style.display = 'none';
	});

	editButt[4].addEventListener('click', () => {
		contButt[4].classList.toggle('buttRotate90');
		intro_1.forEach((i) => {
			i.classList.toggle('row');
			if (i.classList.contains('row')) {
				axisSort = 'x'
			} else {
				axisSort = 'y'
			};
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

	function showTabsContent(i) {
		tabsContent[i].style.display = 'flex';
		tabsBtn[i].classList.add('active');
		
	};

	hideTabContent();
	showTabsContent(0);

	function clickTabsBtn(event){
		let target = event.target;
		if (target && target.classList.contains('tabs__nav-btn')) {
			tabsBtn.forEach((item, i) => {
				if (target == item) {
					hideTabContent();
					showTabsContent(i);
				};
			});
		}; 
	};
	
	$(tabsBtn).on('click', clickTabsBtn);

	function onClick(a){
		a.addEventListener('click', ()=>{
			calcColor(cou, cou1, cou2);
		},{once:true});
	}
	onClick(tabsBtn[1]);
	onClick(tabsBtn[2]);
	onClick(tabsBtn[3]);
	onClick(tabsBtn[4]);

	//______ColorPicker_________//

	let deleteColPick = function () {
		$('.colorpickerHolder').remove();
	};

	intro_1.forEach(function (color) {
		color.addEventListener("contextmenu", colorPicker);
		color.addEventListener("click", deleteColPick);
	});

	$(intro_1).on("contextmenu", false);

	function rgb2hex(color) {
		return "#" + (color.match(/\b(\d+)\b/g).map(function (digit) {
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
	let result;

	function sliceColor(){
		$('span.active').each(function (indx, el) {
			const color = $(el).css("backgroundColor"),
				[r, g, b] = color.match(/\d+/g);
			const colHsl = RGB2HSL(r, g, b);
			result = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(colHsl).slice(1);
			// console.log(result)
			return result;
		});
	};
	
	function actColorCalc() {
			let i =0;

			let h = result[0],
				s = result[1],
				l = result[2],
				r;
				r = 10;
		let	ArrLig = [
			- 5, - 10

			];
			// document.querySelector('.color1').style.background = `hsl(${h }, ${s}%, ${l-r }%)`;
			$('span.active').siblings('.color1').css("background", `hsl(${h }, ${s}%, ${ArrLig[1] }%)`);
			console.log(l);
			$('span.active').siblings('.color2').css("background", `hsl(${+h + 180}, ${+s + 200}%, ${l -= 10}%)`);
			$('span.active').siblings('.color3').css("background", `hsl(${+h + 60}, ${s + 10}%, ${l}%)`);
			$('span.active').siblings('.color4').css("background", `hsl(${+h + 10}, ${s + 10}%, ${l }%)`);
			$('span.active').siblings('.color5').css("background", `hsl(${h}, ${s}%, ${l}%)`);
			$('span.active').siblings('.color6').css("background", `hsl(${+h + 180}, ${+s + 200}%, ${l}%)`);
			$('span.active').siblings('.color7').css("background", `hsl(${+h + 60}, ${s + 10}%, ${l}%)`);
			$('span.active').siblings('.color8').css("background", `hsl(${+h + 10}, ${s + 10}%, ${l }%)`);


			$('span.active').css('backgroundColor', `hsl(${result[0]}, ${result[1]}%, ${result[2]}%)`);
			
			console.log(result[2]);
	};
	// actColorCalc()

	function randomInteger(min, max) {
		// случайное число от min до (max+1)
		let rand = min + Math.random() * (max - min);
		return Math.floor(rand);
	}

	class colorGamma {
		constructor(tabsBtn, array) {
			this.tabsBtn = tabsBtn;
			this.array = array;
		}
		fillColor() {
			if (this.tabsBtn.classList.contains('active')) {
				return this.array;
			}
		}
	};

	class calculationColor {
		constructor(counter, tabsBtn, arrCol) {
			this.counter = counter;
			this.tabsBtn = tabsBtn;
			this.arrCol = arrCol;
		}
	};

	class ColorType {
		constructor(Hue, Sat, Light) {
			this.Hue = Hue;
			this.Sat = Sat;
			this.Light = Light;
		}
		calcTone(a, b, c, d) {
			this.Hue = randomInteger(a, b);
			if (this.Hue > a && this.Hue < b) {
				this.Sat = c, this.Light = d
			}
			let res = `hsl(${this.Hue}, ${this.Sat}%, ${this.Light}%)`;
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
		[new ColorType().calcTone(281, 324, 20, 58)],
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

	function calcColor(a, b, c) {

		intro_1.forEach((item, i) => {

			let color1 = intro_1[i].querySelectorAll('.color1');
			let color2 = intro_1[i].querySelectorAll('.color2');
			let color3 = intro_1[i].querySelectorAll('.color3');

				
				

			if (tabsBtn[i].classList.contains('active')) {

				

				color1.forEach((item) => {
					
					item.style.background = new colorGamma(tabsBtn[0], arrTon[a]).fillColor();
					item.style.background = new colorGamma(tabsBtn[1], arrTon2[a]).fillColor();
					item.style.background = new colorGamma(tabsBtn[2], arrTon[a]).fillColor();
					console.log(a);
				});

				color2.forEach((item) => {
					item.style.background = new colorGamma(tabsBtn[0], arrTon[b]).fillColor();
					item.style.background = new colorGamma(tabsBtn[1], arrTon2[b]).fillColor();
					item.style.background = new colorGamma(tabsBtn[2], arrTon[b]).fillColor();
					console.log(b);
				});

				color3.forEach((item) => {
					item.style.background = new colorGamma(tabsBtn[0], arrTon[c]).fillColor();
					item.style.background = new colorGamma(tabsBtn[1], arrTon2[c]).fillColor();
					item.style.background = new colorGamma(tabsBtn[2], arrTon[c]).fillColor();
					console.log(c);
				})
			};

		});
		// $('span.active').css('backgroundColor', `hsl(${result[0]}, ${result[1]}%, ${result[2]}%)`);
	};

	calcColor(cou, cou1, cou2)
	
	//___COUNTER____///

	function counterPlus(a) {
		
			if (cou == a.length-1) {
				cou =-1
			};
			if (cou1 == a.length-1) {
				cou1 = -1
			};
			if (cou2 == a.length-1) {
				cou2 = -1
			};
		};

	function counterMinus(a) {
		
		if (cou == 0) {
			cou = a.length 
		};
		if (cou1 == 0) {
			cou1 = a.length
		};
		if (cou2 == 0) {
			cou2 = a.length
		};
		
	}
	
	// function wheel() {
		// window.addEventListener("mousewheel", function (e) {
			
		// 	if (e.wheelDelta / 120 > 0) {
		// 		calcColor(cou++, cou1++, cou2++);
		// 		console.log('plus');
		// 	} else {
		// 		calcColor(cou--, cou1--, cou2--);
		// 		console.log('minus');
		// 	}
		// });
	// }
	// wheel();

	


	//______SORTABLE_______////

	let axisSort = 'y';

	window.addEventListener('mousemove', function (event) {
		if (event.clientX > 0 && event.clientX < 30 ||
			event.clientY > 115 && event.clientY < 145) {
			document.documentElement.style.cursor = "move";
			$(function () {
				$('div').sortable({
					"disabled": false,
					axis: axisSort
				});

			});
		} else {
			document.documentElement.style.cursor = "default";
			$(function () {
				$('div').sortable({
					"disabled": true
				});
			});
		};

	});

///____Convert RGB to HSL______////

	function RGB2HSL(r, g, b) {

		r /= 255;
		g /= 255;
		b /= 255;
		let cmin = Math.min(r, g, b),
			cmax = Math.max(r, g, b),
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

	colors.forEach(function (item) {
		item.addEventListener('mouseover', (e) => {
			const target = e.target;

			target.addEventListener('mousedown', function (event) {
				clickStartX = event.clientX;
				clickStartY = event.clientY;
				
				// console.log(event)
			}, false);

			target.addEventListener('mouseup', function (event) {
				clickEndX = event.clientX;
				clickEndY = event.clientY;
				handleGesure();
				// console.log(event)
			}, false);
		});
	});

	function handleGesure() {
		let xAbs = Math.abs(clickStartX - clickEndX);
		let yAbs = Math.abs(clickStartY - clickEndY);

		if (xAbs >30 || yAbs > 30) {
			if (xAbs > yAbs) {
				if (clickEndX < clickStartX) {
					$('span.active').css('backgroundColor', 
						`hsl(${result[0]}, ${result[1]}%, ${result[2] -= 5}%)`);
						console.log(result[2])
						console.log('left')
				} else {
					$('span.active').css('backgroundColor', 
						`hsl(${result[0]}, ${result[1]}%, ${+result[2] + 5}%)`);
						console.log(result[2])
						console.log('right')
				}
			} else {
				if (clickEndY < clickStartY) {
					$('span.active').css('backgroundColor', 
						`hsl(${result[0]}, ${+result[1]+ 10}%, ${result[2] }%)`);
						console.log('up')
				} else {
					$('span.active').css('backgroundColor', 
						`hsl(${result[0]}, ${result[1]-= 10}%, ${result[2] }%)`);
						console.log('down')
				}
			}
		}
	};


	var initialPoint;
	var finalPoint;
	intro_1.forEach(function (item) {
		item.addEventListener('touchstart', function (event) {
			event.preventDefault();
			event.stopPropagation();
			initialPoint = event.changedTouches[0];
		}, false);

		item.addEventListener('touchend', function (event) {
			event.preventDefault();
			event.stopPropagation();
			finalPoint = event.changedTouches[0];
			var xAbs = Math.abs(initialPoint.pageX - finalPoint.pageX);
			var yAbs = Math.abs(initialPoint.pageY - finalPoint.pageY);
			if (xAbs > 10 || yAbs > 10) {
				if (xAbs > yAbs) {
					if (finalPoint.pageX < initialPoint.pageX) {
						changeColorSiwp();
						console.log('left!');
					} else {
						console.log('right!');/*СВАЙП ВПРАВО*/
					}
				} else {
					if (finalPoint.pageY < initialPoint.pageY) {
						// calcColor(cou++, cou1++, cou2++);
						console.log('up!');
					} else {
						// calcColor(cou--, cou1--, cou2--);
						console.log('down!');
					}
				}
			}
		}, false);
	});

// ХОРОШАЯ ГАММА 
	// H_2 = H_1 - 100; S_2 = 100;	L_2 =  L_1 + 3;
	// H_3 = H_1 - 180;	S_3 = 32;	L_3 = 14;


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