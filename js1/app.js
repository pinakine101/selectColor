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

	let result;

	let cou1 = 0;
	let cou2 = 1;
	let cou3 = 2;
	let cou4 = 3;
	let cou5 = 4;
	let cou6 = 5;
	let cou7 = 6;
	let cou8 = 7;


	let H, H1, H2, H3, H4, H5, H6, H7, H8;
	let S, S1, S2, S3, S4, S5, S6, S7, S8;
	let L, L1, L2, L3, L4, L5, L6, L7, L8;
			
	

	let buff;

	let textColor = document.createElement('textCol');

	function showColorText() {
		intro_1.forEach((item, i) => {
			if (tabsBtn[i].classList.contains('active')) {
				const color = intro_1[i].querySelector('span.active');
				$(color).each(function (i, el) {
					const item = $(el).css("backgroundColor");
					buff = rgb2hex(item);
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
			editButt[0].removeEventListener('click', calcCouPlus);
			editButt[1].removeEventListener('click', calcCouMinus);
			editButt[0].addEventListener('click', actCalcCouPus);
			editButt[1].addEventListener('click', actCalcCouMinus);
			window.removeEventListener('mousemove', sorTable);
			
		});
	});

	intro_1.forEach(function (item) {
		item.addEventListener('dblclick', (e) => {
			const target = e.target;
			target.classList.remove('active');
			textColor.remove();
			editButt[0].addEventListener('click', calcCouPlus);
			editButt[1].addEventListener('click', calcCouMinus);
			editButt[0].removeEventListener('click', actCalcCouPus);
			editButt[1].removeEventListener('click', actCalcCouMinus);
			window.addEventListener('mousemove', sorTable);
		});
	});

	function calcCouPlus(){
		calcColor(counterPlus)
	};
	function calcCouMinus(){
		calcColor(counterMinus)
	};
    function actCalcCouPus(){
		actColorCalc(counterPlus)
	};
	function actCalcCouMinus(){
		actColorCalc(counterMinus)
	}
	//_______Buttuns_______///

	icon.addEventListener('click', () => {
		actColorCalc();
		// changeColorSiwp();
		// shuffleArray(arrTon2);
		// shuffleArray(arrTon);
		// calcColor(cou, cou1, cou2)

	});
	
	editButt[0].addEventListener('click', calcCouPlus);
	editButt[1].addEventListener('click', calcCouMinus);

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
				if (y >= arryAddColor.length-1) {
					y = 1
				};
				y++;
				let newColor = $(arryAddColor[y]).insertAfter('span.active');
				if (tabsBtn[0].classList.contains('active')){
					$(newColor).css("background-color", `${arrTon[y]}`);
				};
				if (tabsBtn[1].classList.contains('active')){
					$(newColor).css("background-color", `${arrTon2[y]}`);
				};

			};
		});
	};

	editButt[2].addEventListener('click', addColor);

	editButt[3].addEventListener('click', () => {
		document.querySelector('span.active').style.display = 'none';
	});

	editButt[4].addEventListener('click', () => {
		editButt[4].classList.toggle('buttRotate90');
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
			sliceColor();
			calcColor(counterPlus);
		},{once:true});
	}
		onClick(tabsBtn[1]);
		onClick(tabsBtn[2]);
		onClick(tabsBtn[3]);
		onClick(tabsBtn[4]);
		onClick(tabsBtn[5]);
		onClick(tabsBtn[6]);
		onClick(tabsBtn[7]);
	

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


	function sliceColor(){
		$('span.active').each(function (indx, el) {
			const color = $(el).css("backgroundColor"),
				[r, g, b] = color.match(/\d+/g);
			const colHsl = RGB2HSL(r, g, b);
			result = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(colHsl).slice(1);

			return result;
		});
	};


		

	function actColorCalc(callback) {
		sliceColor();
		H = H1 = H2 = H3 = H4 = H5 = H6 = H7 = H8 = result[0]; 
		S = S1 = S2 = S3 = S4 = S5 = S6 = S7 = S8 = result[1]; 
		L = L1 = L2 = L3 = L4 = L5 = L6 = L7 = L8 = result[2];

		
	let	arrHue = [
		+H + 10, +H1 + 20, +H2 + 30, +H3 + 40, 
		+H4 + 50, +H5 + 60, +H6 + 70, +H7 + 10
		];
	let	arrSat = [
		+S + 10, +S1 +20, +S2 + +30, +S3 + 40, 
		+S4 + 50, +S5 + 10, +S6 + 100, +S7 + 30
	];
	let	arrLight = [
		+L + 10, +L1 +10, +L2 + 30, +L3 + 10, 
		+L4 + 15, +L5 + 20, +L6 + 30, +L7 + 40
		];

		if (S = S1 = S2 = S3 = S4 = S5 = S6 = S7 < 4 ){S = S1 = S2 = S3 = S4 = S5 = S6 = S7  + 10};
		if (S = S1 = S2 = S3 = S4 = S5 = S6 = S7 > 100 ){S = S1 = S2 = S3 = S4 = S5 = S6 = S7  - 50};
		if (  L = L1 = L2 = L3 = L4 = L5 = L6 = L7 < 20 ){ L = L1 = L2 = L3 = L4 = L5 = L6 = L7  + 10};
		if (  L = L1 = L2 = L3 = L4 = L5 = L6 = L7 > 100 ){ L = L1 = L2 = L3 = L4 = L5 = L6 = L7 - 50};

			// shuffleArray(arrHue, arrSat, arrLight);
			
			$('span.active').siblings('.color1').css("background", `hsl(${ arrHue[ cou1 ] }, ${ arrSat[ cou1 ] }%, ${ arrLight[ cou1 ] }%)`);
			$('span.active').siblings('.color2').css("background", `hsl(${ arrHue[ cou2 ] }, ${ arrSat[ cou2 ] }%, ${ arrLight[ cou2 ] }%)`);
			$('span.active').siblings('.color3').css("background", `hsl(${ arrHue[ cou3 ] }, ${ arrSat[ cou3 ] }%, ${ arrLight[ cou3 ] }%)`);
			$('span.active').siblings('.color4').css("background", `hsl(${ arrHue[ cou4 ] }, ${ arrSat[ cou4 ] }%, ${ arrLight[ cou4 ] }%)`);
			$('span.active').siblings('.color5').css("background", `hsl(${ arrHue[ cou5 ] }, ${ arrSat[ cou5 ] }%, ${ arrLight[ cou5 ] }%)`);
			$('span.active').siblings('.color6').css("background", `hsl(${ arrHue[ cou6 ] }, ${ arrSat[ cou6 ] }%, ${ arrLight[ cou6 ] }%)`);
			$('span.active').siblings('.color7').css("background", `hsl(${ arrHue[ cou7 ] }, ${ arrSat[ cou7 ] }%, ${ arrLight[ cou7 ] }%)`);
			$('span.active').siblings('.color8').css("background", `hsl(${ arrHue[ cou8 ] }, ${ arrSat[ cou8 ] }%, ${ arrLight[ cou8 ] }%)`);
			
			$('span.active').css('backgroundColor', `hsl(${result[0]}, ${result[1]}%, ${result[2]}%)`);
			
			callback(arrHue, arrSat, arrLight);
			// return arrHue, arrSat, arrLight;
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

	let arrLigth95 = [
		[new ColorType().calcTone(0, 20, 5.1, 95)],
		[new ColorType().calcTone(21, 48, 5.8, 45)],
		[new ColorType().calcTone(49, 95, 16, 95)],
		[new ColorType().calcTone(96, 153, 7, 45)],

		[new ColorType().calcTone(154, 200, 5.88, 95)],
		[new ColorType().calcTone(201, 240, 3.92, 45)],
		[new ColorType().calcTone(241, 360, 3.92, 95)],
		[new ColorType().calcTone(0,   1, 100, 45)]
	];

	let arrTon = [
		[new ColorType().calcTone(0, 40, 100, 17)],
		[new ColorType().calcTone(41, 96, 100, 22)],
		[new ColorType().calcTone(97, 153, 100, 34)],
		[new ColorType().calcTone(154, 200, 100, 46)],

		[new ColorType().calcTone(200, 281, 100, 57)],
		[new ColorType().calcTone(281, 324, 50, 68)],
		[new ColorType().calcTone(225, 350, 50, 57)],
		[new ColorType().calcTone(125, 250, 30, 47)]
	];

	let arrTon2 = [
		[new ColorType().calcTone(0, 40, 20, 57)],
		[new ColorType().calcTone(41, 96, 20, 52)],
		[new ColorType().calcTone(97, 153, 20, 54)],
		[new ColorType().calcTone(154, 200, 10, 56)],

		[new ColorType().calcTone(200, 281, 10, 57)],
		[new ColorType().calcTone(281, 324, 10, 58)],
		[new ColorType().calcTone(125, 260, 10, 37)],
		[new ColorType().calcTone(225, 160, 15, 37)]
	];

	let spaRoomColor1 = [
		arrLigth95[0],
		arrLigth95[5],
		arrTon[0],
		arrTon[4],
		arrTon2[2],
		arrTon2[0],
		arrTon2[1],
		arrTon2[2]
	];

	function shuffleArray(array) {
		for (var i = array.length - 1; i > 0; i--) {
			var j = Math.floor(Math.random() * (i + 1));
			var temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}
	};

	function calcColor(callback) {

		intro_1.forEach((item, i) => {

			let color1 = intro_1[i].querySelectorAll('.color1');
			let color2 = intro_1[i].querySelectorAll('.color2');
			let color3 = intro_1[i].querySelectorAll('.color3');
			let color4 = intro_1[i].querySelectorAll('.color4');
			let color5 = intro_1[i].querySelectorAll('.color5');
			let color6 = intro_1[i].querySelectorAll('.color6');
			let color7 = intro_1[i].querySelectorAll('.color7');
			let color8 = intro_1[i].querySelectorAll('.color8');
				

			if (tabsBtn[i].classList.contains('active')) {
				callback(arrTon);
				color1.forEach((item) => {
					
					item.style.background = new colorGamma(tabsBtn[0], spaRoomColor1[ cou1 ]).fillColor();
					item.style.background = new colorGamma(tabsBtn[1], arrTon[ cou1 ]).fillColor();
					item.style.background = new colorGamma(tabsBtn[2], arrTon[ cou1 ]).fillColor();
					item.style.background = new colorGamma(tabsBtn[3], arrTon[ cou1 ]).fillColor();
					item.style.background = new colorGamma(tabsBtn[4], arrTon[ cou1 ]).fillColor();
					item.style.background = new colorGamma(tabsBtn[5], arrTon[ cou1 ]).fillColor();
					item.style.background = new colorGamma(tabsBtn[6], arrTon[ cou1 ]).fillColor();
					item.style.background = new colorGamma(tabsBtn[7], arrTon[ cou1 ]).fillColor();
					// console.log(a);
				});

				color2.forEach((item) => {
					item.style.background = new colorGamma(tabsBtn[0], arrTon2[ cou2 ]).fillColor();
					item.style.background = new colorGamma(tabsBtn[1], arrTon[ cou2 ]).fillColor();
					item.style.background = new colorGamma(tabsBtn[2], arrTon[ cou2 ]).fillColor();
					item.style.background = new colorGamma(tabsBtn[3], arrTon[ cou2 ]).fillColor();
					item.style.background = new colorGamma(tabsBtn[4], arrTon[ cou2 ]).fillColor();
					item.style.background = new colorGamma(tabsBtn[5], arrTon[ cou2 ]).fillColor();
					item.style.background = new colorGamma(tabsBtn[6], arrTon[ cou2 ]).fillColor();
					item.style.background = new colorGamma(tabsBtn[7], arrTon[ cou2 ]).fillColor();
					// console.log(b);
				});
				color3.forEach((item) => {
					item.style.background = new colorGamma(tabsBtn[0], arrTon2[ cou3 ]).fillColor();
					item.style.background = new colorGamma(tabsBtn[1], arrTon2[ cou3 ]).fillColor();
					item.style.background = new colorGamma(tabsBtn[2], arrTon[ cou3 ]).fillColor();
					item.style.background = new colorGamma(tabsBtn[3], arrTon[ cou3 ]).fillColor();
					item.style.background = new colorGamma(tabsBtn[4], arrTon[ cou3 ]).fillColor();
					item.style.background = new colorGamma(tabsBtn[5], arrTon[ cou3 ]).fillColor();
					item.style.background = new colorGamma(tabsBtn[6], arrTon[ cou3 ]).fillColor();
					item.style.background = new colorGamma(tabsBtn[7], arrTon[ cou3 ]).fillColor();
					// console.log(c);
				});
				color4.forEach((item) => {
					item.style.background = new colorGamma(tabsBtn[0], arrTon2[ cou4 ]).fillColor();
					item.style.background = new colorGamma(tabsBtn[1], arrTon2[ cou4 ]).fillColor();
					item.style.background = new colorGamma(tabsBtn[2], arrTon[ cou4 ]).fillColor();
					item.style.background = new colorGamma(tabsBtn[3], arrTon[ cou4 ]).fillColor();
					item.style.background = new colorGamma(tabsBtn[4], arrTon[ cou4 ]).fillColor();
					item.style.background = new colorGamma(tabsBtn[5], arrTon[ cou4 ]).fillColor();
					item.style.background = new colorGamma(tabsBtn[6], arrTon[ cou4 ]).fillColor();
					item.style.background = new colorGamma(tabsBtn[7], arrTon[ cou4 ]).fillColor();
					// console.log(d);
				});
				color5.forEach((item) => {
					item.style.background = new colorGamma(tabsBtn[0], arrLigth95[ cou5 ]).fillColor();
					item.style.background = new colorGamma(tabsBtn[1], arrTon2[ cou5 ]).fillColor();
					item.style.background = new colorGamma(tabsBtn[2], arrTon[ cou5 ]).fillColor();
					item.style.background = new colorGamma(tabsBtn[3], arrTon[ cou5 ]).fillColor();
					item.style.background = new colorGamma(tabsBtn[4], arrTon[ cou5 ]).fillColor();
					item.style.background = new colorGamma(tabsBtn[5], arrTon[ cou5 ]).fillColor();
					item.style.background = new colorGamma(tabsBtn[6], arrTon[ cou5 ]).fillColor();
					item.style.background = new colorGamma(tabsBtn[7], arrTon[ cou5 ]).fillColor();
					// console.log(e);
				});
				color6.forEach((item) => {
					item.style.background = new colorGamma(tabsBtn[0], arrTon[ cou6 ]).fillColor();
					item.style.background = new colorGamma(tabsBtn[1], arrTon2[ cou6 ]).fillColor();
					item.style.background = new colorGamma(tabsBtn[2], arrTon[ cou6 ]).fillColor();
					item.style.background = new colorGamma(tabsBtn[3], arrTon[ cou6 ]).fillColor();
					item.style.background = new colorGamma(tabsBtn[4], arrTon[ cou6 ]).fillColor();
					item.style.background = new colorGamma(tabsBtn[5], arrTon[ cou6 ]).fillColor();
					item.style.background = new colorGamma(tabsBtn[6], arrTon[ cou6 ]).fillColor();
					item.style.background = new colorGamma(tabsBtn[7], arrTon[ cou6 ]).fillColor();
					// console.log(f);
				});
				color7.forEach((item) => {
					item.style.background = new colorGamma(tabsBtn[0], arrTon[ cou7 ]).fillColor();
					item.style.background = new colorGamma(tabsBtn[1], arrTon2[ cou7 ]).fillColor();
					item.style.background = new colorGamma(tabsBtn[2], arrTon[ cou7 ]).fillColor();
					item.style.background = new colorGamma(tabsBtn[3], arrTon[ cou7 ]).fillColor();
					item.style.background = new colorGamma(tabsBtn[4], arrTon[ cou7 ]).fillColor();
					item.style.background = new colorGamma(tabsBtn[5], arrTon[ cou7 ]).fillColor();
					item.style.background = new colorGamma(tabsBtn[6], arrTon[ cou7 ]).fillColor();
					item.style.background = new colorGamma(tabsBtn[7], arrTon[ cou7 ]).fillColor();
					// console.log(g);
				});
				color8.forEach((item) => {
					item.style.background = new colorGamma(tabsBtn[0], arrTon[ cou8 ]).fillColor();
					item.style.background = new colorGamma(tabsBtn[1], arrTon[ cou8 ]).fillColor();
					item.style.background = new colorGamma(tabsBtn[2], arrTon[ cou8 ]).fillColor();
					item.style.background = new colorGamma(tabsBtn[3], arrTon[ cou8 ]).fillColor();
					item.style.background = new colorGamma(tabsBtn[4], arrTon[ cou8 ]).fillColor();
					item.style.background = new colorGamma(tabsBtn[5], arrTon[ cou8 ]).fillColor();
					item.style.background = new colorGamma(tabsBtn[6], arrTon[ cou8 ]).fillColor();
					item.style.background = new colorGamma(tabsBtn[7], arrTon[ cou8 ]).fillColor();
					// console.log(h);
				});
			};
		});
		// $('span.active').css('backgroundColor', `hsl(${result[0]}, ${result[1]}%, ${result[2]}%)`);
	};

	calcColor(counterPlus);
	
	//___COUNTER____///

	

	function counterPlus(a) {
		cou1++; cou2++; cou3++; cou4++;  cou5++; cou6++; cou7++; cou8++;
		
			if (cou1 > a.length-1) {
				cou1 = 0
			};
			if (cou2 > a.length-1) {
				cou2 = 0
			};
			if (cou3 > a.length-1) {
				cou3 = 0
			};
			if (cou4 > a.length-1) {
				cou4 = 0
			};
			if (cou5 > a.length-1) {
				cou5 = 0
			};
			if (cou6 > a.length-1) {
				cou6 = 0
			};
			if (cou7 > a.length-1) {
				cou7 = 0
			};
			if (cou8 > a.length-1) {
				cou8 = 0
			};
			console.log(cou1, cou2, cou3,'plus')
			return a;
			
		};

	function counterMinus(a) {
		cou1--; cou2--; cou3--; cou4--; cou5--; cou6--; cou7--;  cou8--;
		if (cou1 < 0) {
			cou1 = a.length-1 
		};
		if (cou2 < 0) {
			cou2 = a.length-1
		};
		if (cou3 < 0) {
			cou3 = a.length-1
		};
		if (cou1 <0 )  {
			cou1 = a.length-1
		};
		if (cou2 <0 ) {
			cou2 = a.length-1
		};
		if (cou3 <0 ) {
			cou3 = a.length-1
		};
		if (cou4 <0) {
			cou4 = a.length-1
		};
		if (cou5<0) {
			cou5 = a.length-1
		};
		if (cou6 <0) {
			cou6 = a.length-1
		};
		if (cou7 <0) {
			cou7 = a.length-1
		};
		if (cou8<0) {
			cou8 = a.length-1
		};
		console.log(cou1, cou2, cou3, 'minus');
		return a;
	}
	// cou1, cou2, cou3, cou4, cou5, cou6, cou7, cou8,
	
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
	function sorTable(event) {
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
	};

	window.addEventListener('mousemove', sorTable);
	
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

	intro_1.forEach(function (item) {
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
					
				}, false);
			// }
		});
	});

	function handleGesure() {
		let xAbs = Math.abs(clickStartX - clickEndX);
		let yAbs = Math.abs(clickStartY - clickEndY);
		sliceColor();
		if (xAbs >10 || yAbs > 10) {
			
			if (xAbs > yAbs) {
				if (clickEndX < clickStartX) {
					$('span.active').css('backgroundColor', 
						`hsl(${result[0]}, ${result[1]}%, ${result[2] -5}%)`);
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
						`hsl(${+ result[0] + 3}, ${result[1]}%, ${result[2] }%)`);
						console.log(result[0]);
						console.log('up');
				} else {
					$('span.active').css('backgroundColor', 
						`hsl(${-result[0] - 3}, ${result[1]}%, ${result[2] }%)`);
						console.log(result[0])
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