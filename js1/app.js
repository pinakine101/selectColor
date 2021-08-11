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
	
	// function setHeiHeight() {
	// 	$('.intro').css({
	// 		height: $(window).height() + 'px'
	// 	});
	// }
	// setHeiHeight(); // устанавливаем высоту окна при первой загрузке страницы
	// $(window).resize( setHeiHeight ); // обновляем при изменении размеров окна
	

	let textColorBuffer;

	function showColorText() {
		intro_1.forEach((item, i) => {
			if (tabsBtn[i].classList.contains('active')) {
				const color = intro_1[i].querySelector('span.active');
				$(color).each(function (i, el) {
					const item = $(el).css("backgroundColor");
					// textSpace = el.innerHTML;
					// textColorBuffer = rgb2hex(item) +' '+	$(el).text();
					textColorBuffer = rgb2hex(item) ;
					
			
					// console.log(textColorBuffer);
				})
			};
		});
	};

	//______Active Color_________//
	let colorObj = [
	'цвет потолка',
	'цвет стен',
	'цвет декора',	
	]

	let textColor = document.createElement('textCol');
	
	intro_1.forEach(function (item, i) {
		item.addEventListener('click', (e) => {

			const target = e.target;
			
			if (!target.classList.contains("active")) {
				$(intro_1).children().removeClass('active');
				textColor.classList.remove('textColor');
			};
			textColor.classList.add('textColor');
			target.classList.add('active');
			showColorText();
			
			if (target.classList.contains('color1')){textColor.innerHTML = `<p> ${textColorBuffer}  цвет потолка </p>`; };
			if (target.classList.contains('color2')){textColor.innerHTML = `<p> ${textColorBuffer}  цвет стен </p>`; };
			if (target.classList.contains('color3')){textColor.innerHTML = `<p> ${textColorBuffer}  цвет декора </p>`; };
			if (target.classList.contains('color4')){textColor.innerHTML = `<p> ${textColorBuffer}  цвет текстиля </p>`; };
			if (target.classList.contains('color5')){textColor.innerHTML = `<p> ${textColorBuffer}  цвет мебели </p>`; };
			if (target.classList.contains('color6')){textColor.innerHTML = `<p> ${textColorBuffer}  цвет аксессуаров </p>`; };
			if (target.classList.contains('color7')){textColor.innerHTML = `<p> ${textColorBuffer}  цвет ковра </p>`; };
			if (target.classList.contains('color8')){textColor.innerHTML = `<p> ${textColorBuffer}  цвет пола </p>`; };
			target.append(textColor);
			// target.append(textColorSpace);
			
			editButt[0].removeEventListener('click', calcCouPlus);
			editButt[1].removeEventListener('click', calcCouMinus);
			editButt[0].addEventListener('click', actCalcCouPus);
			editButt[1].addEventListener('click', actCalcCouMinus);
			window.removeEventListener('mousemove', sorTable);

			console.log(target)
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

	let arryTable_1_Step = [
		[new ColorType().calcTone(0,   20,  100,  97)],   /*КРАСНЫЙ*/
		[new ColorType().calcTone(0,   20,  33,   97)],
		[new ColorType().calcTone(21,  48,  100,  97)],   /*ОРАНЖЕВЫЙ*/
		[new ColorType().calcTone(21,  48,  33,   97)], 
		[new ColorType().calcTone(49,  95,  100,  92)],   /*ЖЕЛТЫЙ*/
		[new ColorType().calcTone(49,  95,  50,   92)], 
		[new ColorType().calcTone(96,  158, 100,  95)],   /*ЗЕЛЕНЫЙ*/
		[new ColorType().calcTone(96,  158, 75,   95)],
		[new ColorType().calcTone(159, 200, 100,  96)],   /*БИРЮЗОВЫЙ*/
		[new ColorType().calcTone(159, 200, 68,   96)],
		[new ColorType().calcTone(201, 240, 100,  97)],   /*ГОЛУБОЙ*/
		[new ColorType().calcTone(201, 240, 63,   97)],
		[new ColorType().calcTone(241, 280, 100,  98)],   /*СИНИЙ*/
		[new ColorType().calcTone(241, 280, 29,   97)],
		[new ColorType().calcTone(280, 360, 100,  97)],    /*ФИОЛЕТОВЫЙ*/
		[new ColorType().calcTone(280, 360, 33,   97)] 
	];
	
	let arryTable_2_Step = [
		[new ColorType().calcTone(0,   20,  100,  95)],   /*КРАСНЫЙ*/
		[new ColorType().calcTone(0,   20,  43,   93)],
		[new ColorType().calcTone(21,  48,  100,  92)],   /*ОРАНЖЕВЫЙ*/
		[new ColorType().calcTone(21,  48,  78,   91)], 
		[new ColorType().calcTone(49,  95,  100,  78)],   /*ЖЕЛТЫЙ*/
		[new ColorType().calcTone(49,  95,  53,   85)], 
		[new ColorType().calcTone(96,  158, 100,  84)],   /*ЗЕЛЕНЫЙ*/
		[new ColorType().calcTone(96,  158, 58,   86)],
		[new ColorType().calcTone(159, 200, 100,  89)],   /*БИРЮЗОВЫЙ*/
		[new ColorType().calcTone(159, 200, 66,   88)],
		[new ColorType().calcTone(201, 240, 100,  92)],   /*ГОЛУБОЙ*/
		[new ColorType().calcTone(201, 240, 55,   91)],
		[new ColorType().calcTone(241, 280, 100,  96)],   /*СИНИЙ*/
		[new ColorType().calcTone(241, 280, 33,   94)],
		[new ColorType().calcTone(280, 360, 100,  95)],    /*ФИОЛЕТОВЫЙ*/
		[new ColorType().calcTone(280, 360, 43,   93)] 
	];
	
	

	let arryTable_3_Step = [
		[new ColorType().calcTone(0,   20,  100,  79)],   /*КРАСНЫЙ*/
		[new ColorType().calcTone(0,   20,  55,   78)],
		[new ColorType().calcTone(21,  48,  100,  65)],   /*ОРАНЖЕВЫЙ*/
		[new ColorType().calcTone(21,  48,  84,   69)], 
		[new ColorType().calcTone(49,  95,  100,  50)],   /*ЖЕЛТЫЙ*/
		[new ColorType().calcTone(49,  95,  53,   85)], 
		[new ColorType().calcTone(96,  158, 100,  44)],   /*ЗЕЛЕНЫЙ*/
		[new ColorType().calcTone(96,  158, 43,   63)],
		[new ColorType().calcTone(159, 200, 100,  44)],   /*БИРЮЗОВЫЙ*/
		[new ColorType().calcTone(159, 200, 59,   61)],
		[new ColorType().calcTone(201, 240, 100,  70)],   /*ГОЛУБОЙ*/
		[new ColorType().calcTone(201, 240, 70,   74)],
		[new ColorType().calcTone(241, 280, 100,  85)],   /*СИНИЙ*/
		[new ColorType().calcTone(241, 280, 50,   82)],
		[new ColorType().calcTone(280, 360, 100,  81)],    /*ФИОЛЕТОВЫЙ*/
		[new ColorType().calcTone(280, 360, 53,   89)] 
	];
	
	let arryTable_4_Step = [
		[new ColorType().calcTone(0,   20,  100,  46)],   /*КРАСНЫЙ*/
		[new ColorType().calcTone(0,   20,  28,   48)],
		[new ColorType().calcTone(21,  48,  100,  42)],   /*ОРАНЖЕВЫЙ*/
		[new ColorType().calcTone(21,  48,  34,   50)], 
		[new ColorType().calcTone(49,  95,  100,  31)],   /*ЖЕЛТЫЙ*/
		[new ColorType().calcTone(49,  95,  36,   41)], 
		[new ColorType().calcTone(96,  158, 100,  32)],   /*ЗЕЛЕНЫЙ*/
		[new ColorType().calcTone(96,  158, 26,   44)],
		[new ColorType().calcTone(159, 200, 100,  33)],   /*БИРЮЗОВЫЙ*/
		[new ColorType().calcTone(159, 200, 22,   47)],
		[new ColorType().calcTone(201, 240, 100,  46)],   /*ГОЛУБОЙ*/
		[new ColorType().calcTone(201, 240, 39,   52)],
		[new ColorType().calcTone(241, 280, 100,  72)],   /*СИНИЙ*/
		[new ColorType().calcTone(241, 280, 44,   55)],
		[new ColorType().calcTone(280, 360, 100,  64)],    /*ФИОЛЕТОВЫЙ*/
		[new ColorType().calcTone(280, 360, 33,   58)] 
	];

	let arryTable_5_Step = [
		[new ColorType().calcTone(0,   20,  93,   43)],   /*КРАСНЫЙ*/
		[new ColorType().calcTone(0,   20,  34,   55)],
		[new ColorType().calcTone(21,  48,  100,  36)],   /*ОРАНЖЕВЫЙ*/
		[new ColorType().calcTone(21,  48,  38,   46)], 
		[new ColorType().calcTone(49,  95,  100,  28)],   /*ЖЕЛТЫЙ*/
		[new ColorType().calcTone(49,  95,  36,   39)], 
		[new ColorType().calcTone(96,  158, 100,  29)],   /*ЗЕЛЕНЫЙ*/
		[new ColorType().calcTone(96,  158, 33,   39)],
		[new ColorType().calcTone(159, 200, 100,  27)],   /*БИРЮЗОВЫЙ*/
		[new ColorType().calcTone(159, 200, 34,   40)],
		[new ColorType().calcTone(201, 240, 100,  41)],   /*ГОЛУБОЙ*/
		[new ColorType().calcTone(201, 240, 37,   48)],
		[new ColorType().calcTone(241, 280, 100,  67)],   /*СИНИЙ*/
		[new ColorType().calcTone(241, 280, 55,   63)],
		[new ColorType().calcTone(280, 360, 100,  55)],    /*ФИОЛЕТОВЫЙ*/
		[new ColorType().calcTone(280, 360, 41,   54)] 
	];

	let arryTable_6_Step = [
		[new ColorType().calcTone(0,   20,  100,  22)],   /*КРАСНЫЙ*/
		[new ColorType().calcTone(0,   20,  31,   29)],
		[new ColorType().calcTone(21,  48,  100,  23)],   /*ОРАНЖЕВЫЙ*/
		[new ColorType().calcTone(21,  48,  36,   27)], 
		[new ColorType().calcTone(49,  95,  100,  15)],   /*ЖЕЛТЫЙ*/
		[new ColorType().calcTone(49,  95,  35,   22)], 
		[new ColorType().calcTone(96,  158, 100,  16)],   /*ЗЕЛЕНЫЙ*/
		[new ColorType().calcTone(96,  158, 33,   23)],
		[new ColorType().calcTone(159, 200, 100,  17)],   /*БИРЮЗОВЫЙ*/
		[new ColorType().calcTone(159, 200, 33,   24)],
		[new ColorType().calcTone(201, 240, 100,  23)],   /*ГОЛУБОЙ*/
		[new ColorType().calcTone(201, 240, 36,   27)],
		[new ColorType().calcTone(241, 280, 100,  49)],   /*СИНИЙ*/
		[new ColorType().calcTone(241, 280, 38,   36)],
		[new ColorType().calcTone(280, 360, 100,  27)],    /*ФИОЛЕТОВЫЙ*/
		[new ColorType().calcTone(280, 360, 35,   30)] 
	];

	let arryTable_7_Step = [
		[new ColorType().calcTone(0,   20,  100,  14)],   /*КРАСНЫЙ*/
		[new ColorType().calcTone(0,   20,  31,   18)],
		[new ColorType().calcTone(21,  48,  100,  13)],   /*ОРАНЖЕВЫЙ*/
		[new ColorType().calcTone(21,  48,  33,   17)], 
		[new ColorType().calcTone(49,  95,  100,  11)],   /*ЖЕЛТЫЙ*/
		[new ColorType().calcTone(49,  95,  32,   14)], 
		[new ColorType().calcTone(96,  158, 100,  11)],   /*ЗЕЛЕНЫЙ*/
		[new ColorType().calcTone(96,  158, 32,   15)],
		[new ColorType().calcTone(159, 200, 100,  11)],   /*БИРЮЗОВЫЙ*/
		[new ColorType().calcTone(159, 200, 33,   16)],
		[new ColorType().calcTone(201, 240, 100,  15)],   /*ГОЛУБОЙ*/
		[new ColorType().calcTone(201, 240, 31,   18)],
		[new ColorType().calcTone(241, 280, 100,  30)],   /*СИНИЙ*/
		[new ColorType().calcTone(241, 280, 33,   23)],
		[new ColorType().calcTone(280, 360, 100,  18)],    /*ФИОЛЕТОВЫЙ*/
		[new ColorType().calcTone(280, 360, 32,   20)] 
	];

	let arryTable_8_Step = [
		[new ColorType().calcTone(0,   20,  100,  9)],   /*КРАСНЫЙ*/
		[new ColorType().calcTone(0,   20,  35,   13)],
		[new ColorType().calcTone(21,  48,  100,  9)],   /*ОРАНЖЕВЫЙ*/
		[new ColorType().calcTone(21,  48,  34,   13)], 
		[new ColorType().calcTone(49,  95,  100,  7)],   /*ЖЕЛТЫЙ*/
		[new ColorType().calcTone(49,  95,  33,   11)], 
		[new ColorType().calcTone(96,  158, 100,  7)],   /*ЗЕЛЕНЫЙ*/
		[new ColorType().calcTone(96,  158, 33,   11)],
		[new ColorType().calcTone(159, 200, 100,  7)],   /*БИРЮЗОВЫЙ*/
		[new ColorType().calcTone(159, 200, 33,   11)],
		[new ColorType().calcTone(201, 240, 100,  9)],   /*ГОЛУБОЙ*/
		[new ColorType().calcTone(201, 240, 33,   12)],
		[new ColorType().calcTone(241, 280, 100,  26)],   /*СИНИЙ*/
		[new ColorType().calcTone(241, 280, 34,   18)],
		[new ColorType().calcTone(280, 360, 100,  15)],    /*ФИОЛЕТОВЫЙ*/
		[new ColorType().calcTone(280, 360, 26,   14)] 
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
		arryTable_8_Step[3],
		arryTable_1_Step[2],
		arryTable_2_Step[0],
		arryTable_3_Step[10],
		arryTable_4_Step[14],
		arryTable_5_Step[5],
		arryTable_6_Step[0],
		arryTable_8_Step[6],
	];

	function shuffleArray(array) {
		for (var i = array.length - 1; i > 0; i--) {
			var j = Math.floor(Math.random() * (i + 1));
			var temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}
	};
let color1Text; 
let color2Text; 

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
				callback(arryTable_1_Step);
				color1.forEach((item) => {
				
					item.style.background = new colorGamma(tabsBtn[0], arryTable_1_Step[ cou1 ]).fillColor() ;
					item.style.background = new colorGamma(tabsBtn[1], arrTon[ cou1 ]).fillColor();
					item.style.background = new colorGamma(tabsBtn[2], arrTon[ cou1 ]).fillColor();
					item.style.background = new colorGamma(tabsBtn[3], arrTon[ cou1 ]).fillColor();
					item.style.background = new colorGamma(tabsBtn[4], arrTon[ cou1 ]).fillColor();
					item.style.background = new colorGamma(tabsBtn[5], arrTon[ cou1 ]).fillColor();
					item.style.background = new colorGamma(tabsBtn[6], arrTon[ cou1 ]).fillColor();
					item.style.background = new colorGamma(tabsBtn[7], arrTon[ cou1 ]).fillColor();
				});

				color2.forEach((item) => {
					item.style.background = new colorGamma(tabsBtn[0], arryTable_2_Step[ cou2 ]).fillColor();
					item.style.background = new colorGamma(tabsBtn[1], arrTon[ cou2 ]).fillColor();
					item.style.background = new colorGamma(tabsBtn[2], arrTon[ cou2 ]).fillColor();
					item.style.background = new colorGamma(tabsBtn[3], arrTon[ cou2 ]).fillColor();
					item.style.background = new colorGamma(tabsBtn[4], arrTon[ cou2 ]).fillColor();
					item.style.background = new colorGamma(tabsBtn[5], arrTon[ cou2 ]).fillColor();
					item.style.background = new colorGamma(tabsBtn[6], arrTon[ cou2 ]).fillColor();
					item.style.background = new colorGamma(tabsBtn[7], arrTon[ cou2 ]).fillColor();
				});
				color3.forEach((item) => {
					item.style.background = new colorGamma(tabsBtn[0],  arryTable_3_Step[ cou2 ]).fillColor();
					item.style.background = new colorGamma(tabsBtn[1], arrTon2[ cou3 ]).fillColor();
					item.style.background = new colorGamma(tabsBtn[2], arrTon[ cou3 ]).fillColor();
					item.style.background = new colorGamma(tabsBtn[3], arrTon[ cou3 ]).fillColor();
					item.style.background = new colorGamma(tabsBtn[4], arrTon[ cou3 ]).fillColor();
					item.style.background = new colorGamma(tabsBtn[5], arrTon[ cou3 ]).fillColor();
					item.style.background = new colorGamma(tabsBtn[6], arrTon[ cou3 ]).fillColor();
					item.style.background = new colorGamma(tabsBtn[7], arrTon[ cou3 ]).fillColor();
				});
				color4.forEach((item) => {
					item.style.background = new colorGamma(tabsBtn[0], spaRoomColor1[ cou4 ]).fillColor();
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
					item.style.background = new colorGamma(tabsBtn[0], arryTable_8_Step[ cou5 ]).fillColor();
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
					item.style.background = new colorGamma(tabsBtn[0], spaRoomColor1[ cou6 ]).fillColor();
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
					item.style.background = new colorGamma(tabsBtn[0], arryTable_7_Step[ cou8 ]).fillColor();
					item.style.background = new colorGamma(tabsBtn[1], arrTon[ cou8 ]).fillColor();
					item.style.background = new colorGamma(tabsBtn[2], arrTon[ cou8 ]).fillColor();
					item.style.background = new colorGamma(tabsBtn[3], arrTon[ cou8 ]).fillColor();
					item.style.background = new colorGamma(tabsBtn[4], arrTon[ cou8 ]).fillColor();
					item.style.background = new colorGamma(tabsBtn[5], arrTon[ cou8 ]).fillColor();
					item.style.background = new colorGamma(tabsBtn[6], arrTon[ cou8 ]).fillColor();
					item.style.background = new colorGamma(tabsBtn[7], arrTon[ cou8 ]).fillColor();
					console.log(cou8);
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