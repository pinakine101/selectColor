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

//  poem___________ChooCol______________   //


document.addEventListener('DOMContentLoaded', () => {

// ___________character

	let tabsBtn = document.querySelectorAll(".tabs__nav-btn"); // кнопки на ТАБЕ
	let tabsContent = document.querySelectorAll(".intro_1"); //содержимое в ТАБЕ
	// let tabsNav = document.querySelector(".tabs__nav"); 
	// let intro = document.querySelector(".intro")
	// let colors = document.querySelectorAll('span');
	let icon = document.querySelector('.icon'); // кнопка рандомного подбора
	let editButtns = document.querySelectorAll('.butt'); // кнопки редактирования гаммы
	let result = []; // цвет разделенный на HSL каналы в массиве из трёх значений

	// let cout = [
		let cou1 = 0, cou2 = 1, cou3 = 2, cou4 = 3, 
		cou5 = 4, cou6 = 5, cou7 = 6, cou8 = 7;
	 //счётчики пребора цветов в каждом блоке
	// let spanActive = $('span.active');
	let spanActive = document.querySelector('span.active')
	let textColorBuffer; // содержит имя цвета
	let textColor = document.createElement('textCol'); // показывает имя цвета

	//______Active Color_________//

	
	function findColorName() {
		// находим в активном табе активный цвет 
		tabsContent.forEach((item, i) => {
			if (tabsBtn[i].classList.contains('active')) {
				const color = tabsContent[i].querySelector('span.active');
				//помещаем в  переменную *textColorBuffer*  имя HEX активного цвета
			
				textColorBuffer = rgb2hex(color.style.background);
				sliceColor(spanActive);
			};
		});
	};
	
		function activeColor(e){ //функионал режима *span.active*
			//получаем элемент клика	
			const target = e.target;
			//если клик не на *span.active* убираем класс *active, скрываем контейнер с именем цвета
			if (!target.classList.contains("active")) {
				$(tabsContent).children().removeClass('active');
				textColor.classList.remove('textColor');
			};
			textColor.classList.add('textColor'); // показываем контейнер с именем цвета, добовляем *active,
			target.classList.add('active');

			target.append(textColor);  //добовляем контейнер с именем цвета

			findColorName(); //вызываем имя цвета

			// проверяем на класс и добавляем имя цвета
			if (target.classList.contains('color1')){textColor.innerHTML = `<input type = "hide" value= "${textColorBuffer} цвет потолка" > </input>` };
			if (target.classList.contains('color2')){textColor.innerHTML = `<input type = "hide" value= "${textColorBuffer} цвет стен" > </input>` };
			if (target.classList.contains('color3')){textColor.innerHTML = `<input type = "hide" value= "${textColorBuffer} цвет декора" ></input>`};
			if (target.classList.contains('color4')){textColor.innerHTML = `<input type = "hide" value= "${textColorBuffer} цвет текстиля" > </input>` };
			if (target.classList.contains('color5')){textColor.innerHTML = `<input type = "hide" value= "${textColorBuffer} цвет мебели" > </input>` };
			if (target.classList.contains('color6')){textColor.innerHTML = `<input type = "hide" value= "${textColorBuffer} цвет аксессуаров" > </input>` };
			if (target.classList.contains('color7')){textColor.innerHTML = `<input type = "hide" value= "${textColorBuffer} цвет ковра" > </input>` };
			if (target.classList.contains('color8')){textColor.innerHTML = `<input type = "hide" value= "${textColorBuffer} цвет пола" > </input>` };


			editButtns[0].removeEventListener('click', calcCouPlus);//удаляем пребор гаммы в "+" без *span.active*  
			editButtns[1].removeEventListener('click', calcCouMinus); //удаляем пребор гаммы в "-" без *span.active*  
			editButtns[0].addEventListener('click', actCalcCouPus); //добавляем пребор гаммы в "+" с *span.active*  
			editButtns[1].addEventListener('click', actCalcCouMinus); //добавляем пребор гаммы в "-" с *span.active*  
			window.removeEventListener('mousemove', sorTable); //удаляем возможность перетаскивания блоков
			forslice = document.querySelector('span.active');
			sliceColor(spanActive)
			console.log(result[0], result[1], result[2]);
		
		}

	tabsContent.forEach(function (item, i) { // вешаем на контейнер с цветами фунцию активного цвета
		item.addEventListener('click', activeColor);
	});

		function deletActivColor(e){  //функионал режима БЕЗ *span.active*
			const target = e.target;
				target.classList.remove('active');
				textColor.remove();
				editButtns[0].addEventListener('click', calcCouPlus);  //добовляем оброботчики перебора гаммы в режиме  *span.active*
				editButtns[1].addEventListener('click', calcCouMinus);
				editButtns[0].removeEventListener('click', actCalcCouPus); //удаляем оброботчики перебора гаммы в режиме БЕЗ *span.active*
				editButtns[1].removeEventListener('click', actCalcCouMinus);
				window.addEventListener('mousemove', sorTable); //включаем возможность перетаскивания блоков

				// оповещение о копировании имени цвета
				navigator.clipboard.writeText(textColorBuffer); //пишем в буфер обмена имя цвета
				let copied = document.createElement('div'); //созаем элемент оповещения о копировании
				copied.classList.add('copied');// добовляем класс видимости
				document.querySelector('body').append(copied);// добовляем элемент в тело
				copied.innerHTML = `<p>Copied!</p>`; // добовляем элемент в тело
				$(copied).css({ // привязываем элемент к позиции курсора
					"left": e.clientX + "px",
					"top": e.clientY + "px"
				});
				function deleteCopied(){ // удаляем элемент через 2 секунды
					copied.classList.remove('copied');
				}; setTimeout(deleteCopied, 2000);
		}
		
	tabsContent.forEach(function (item) {  // вешаем функцию режима БЕЗ *span.active*
		item.addEventListener('dblclick', deletActivColor);
	});


	function calcCouPlus(){ // запускаем перебор гаммы в *+* режима БЕЗ *span.active*
		calcColor(counterPlus)
		console.log('privet')
	};
	function calcCouMinus(){ // запускаем перебор гаммы в *-* режима БЕЗ *span.active*
		calcColor(counterMinus)
		console.log('privet2')
	};
    function actCalcCouPus(){ // запускаем перебор гаммы в *+* режима  *span.active*
		actColorCalc(arrayHue, arrayLight, counterPlus);
		
		
	};
	function actCalcCouMinus(){ // запускаем перебор гаммы в *-* режима *span.active*
		actColorCalc(arrayHue, arrayLight, counterMinus)

	}
	//_______Buttuns_______///



	const container_buttons = document.querySelector('.container_buttons');
		container_buttons.addEventListener('click', (e)=>{
			e.target.removeEventListener('click', activeColor);
		})

	icon.addEventListener('click', () => {
		test()
		// changeColorSiwp();
		// shuffleArray(arrTon2);
		// shuffleArray(arrTon);
		// calcColor(cou, cou1, cou2)

	});
	
	editButtns[0].addEventListener('click', calcCouPlus);
	editButtns[1].addEventListener('click', calcCouMinus);

	var y = 0;

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

		tabsContent.forEach((item, i) => {
			if (tabsBtn[i].classList.contains('active')) {
				if (y >= arryAddColor.length-1) {
					y = 1
				};
				counterPlus(arryTable_3_Step);
				y++;
				let newColor = $(arryAddColor[y]).insertAfter('span.active');
				if (tabsBtn[0].classList.contains('active')){
					$(newColor).css("background-color", `${arryTable_1_Step[ cou1 ]}`);
				};
				if (tabsBtn[1].classList.contains('active')){
					$(newColor).css("background-color", `${arryTable_5_Step[ cou1 ]}`);
				};

			};
		});
	};

	editButtns[2].addEventListener('click', addColor);

	editButtns[3].addEventListener('click', () => {
		document.querySelector('span.active').style.display = 'none';
	});

	editButtns[4].addEventListener('click', () => {
		editButtns[4].classList.toggle('buttRotate90');
		tabsContent.forEach((i) => {
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


	// function colorGallery (colorClass, room, ){
	// 	let colorClassTarget = colorClass.target;
	// 	if (colorClassTarget && colorClassTarget.classList.contains('color1')) {
	// 		counterPlus(arryTable_3_Step);
	// 		colorClassTarget.style.background = arryTable_3_Step[ cou1 ];
	// 		console.log('привет')
	// 	}

	// 	console.log(colorClassTarget);

	// }
	// $(tabsContent).on('click', colorGallery);

	$(tabsBtn).on('click', clickTabsBtn);

	function onClickTab(e){
		e.addEventListener('click', ()=>{
			sliceColor();
			calcColor(counterPlus);
		},{once:true});
	}
		// onClick(tabsBtn[0]);
		onClickTab(tabsBtn[1]);
		onClickTab(tabsBtn[2]);
		onClickTab(tabsBtn[3]);
		onClickTab(tabsBtn[4]);
		onClickTab(tabsBtn[5]);
		onClickTab(tabsBtn[6]);
		onClickTab(tabsBtn[7]);
	

	//______ColorPicker_________//

	let deleteColPick = function () {
		$('.colorpickerHolder').remove();
	};

	tabsContent.forEach(function (color) {
		color.addEventListener("contextmenu", colorPicker);
		color.addEventListener("click", deleteColPick);
	});

	$(tabsContent).on("contextmenu", false);



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

	let forslice ;

	function sliceColor(e){
		e = forslice;
		$(e).each(function () {
			const color = $(this).css("backgroundColor"),
				[r, g, b] = color.match(/\d+/g);
			const colHsl = RGB2HSL(r, g, b);
			result = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(colHsl).slice(1);
			
			// console.log(result)
			return result;
		});
		// return e;
	
	};
	
	

	let arrHSL;

// function matrixOfColor (h, s, l){
// 	// sliceColor();
// 	// switch (result[1]) {
// 	// 	case 43.5:
// 	// 		s = s + result[1];
// 	// 		break;
// 	// 	case 20:
// 	// 		s = s - result[1];
// 	// 	break;
// 	// == randomInteger(0 , 50 )}
// 	let	;
// 	if (result[1] < 50 ){s = s + 40};
// 	// else {s - 10 };

// 	if (result[2] < 50){l = l  + 40};
// 	// else {l - 10};

// 		// h = result[0] - h;
// 		// s = result[1] - s;
// 		// l = result[2] - l;

	
// 	// console.log( result[0])
// 	return res;

// };
//
class ActColorType {
	constructor(Hue, Sat, Light) {
		this.Hue = Hue;
		this.Sat = Sat;
		this.Light = Light;
	}
	
	calcTone(h, s, l) {
		this.Hue =  result[0]; 
		this.Sat =  result[1]; 
		this.Light =  result[2];
		
		let res;
		if(this.Hue == randomInteger(0, 20)){
			$('span.active').siblings('.color1').css("background",  
			`hsl(${ 20 }, ${ randomInteger(5, 100) }%, ${ randomInteger(22, 28)}%)`)	
	
		}
		// h = + this.Hue + h;
		// // if(this.Hue < 20 ){s = 33, l = 94}
		// if(this.Sat < 10 ){s = + this.Sat + s +10}
		// else if(this.Sat < 50 ){s =  +this.Sat + s}
		// else if(this.Sat > 90 ){s =  this.Sat - s};

		// if(this.Light < 13 ){l = + this.Light + l +10}
		// else if(this.Light < 50 ){l = + this.Light + l}
		// else if(this.Light > 90 ){l = this.Light - l};
		
		// else { s = this.Sat - s ; l = this.Light - l};

		// h = -this.Hue - h;
		res = `hsl(${ h }, ${ s }%, ${ l }%)`;
		return res;
	};

};

const satSteps = [
	100, 80, 60, 40, 20, 10 , 5, 3
];

const light_Red_Steps_6 =[
	22, 24, 26, 26,28, 28, 28, 28
];

const light_Delta =[
	5, 10, 20, 5, 19, 20, 4, 84
];

const hueSteps =[
	353, 22, 48, 94, 159, 200, 242, 281
];


let massColors = [
	
];

// function iLlWin (){
// 	+result[0] + 10,
// 	result[1]- satSteps [cou1], 
// 	result[2] - light_Delta[cou1];

// 	if( result[0] < 22 && result[0]>0 && result[2] >22 && result[2] <28 ) { 
// 		massColors.push(result[2])
// 		};
// 		console.log[massColors]
// }
let arrayLight =[
	97,	93,	72,	53,  	48,	28,	18,	13
];
// let arrayLight = [
// 	60,	53,	483,	72, 72,	28,	90, 48
// ];

// let arrayHue = [
// 	353, 22, 48, 94,  159, 200, 242, 281
// ];
let arrayHue = [
	159, 190, 210, 250,  220, 48, 70, 180
];

// let arrayHue = [
// 	240, 159, 94, 315,  296, 161, 308, 271
// ];
// let arraySatur = [
// 	50, 50, 50, 50,  50, 50, 50, 50
// ];
let arraySatur = [
<<<<<<< HEAD
	40, 40, 40, 60,  80, 90, 95, 100
=======
	20, 15, 10, 5, 20, 15, 10, 5,
>>>>>>> 172a8b6e33bf7dcd8b9e94e2be0f27462ada0ae2
];
// let arraySatur = [
// 	97,	93,	72,	53,  	48,	28,	18,	13
// ];

let arrStyleColor =[
	'.color1',
	'.color2',
	'.color3',
	'.color4',
	'.color5',
	'.color6',
	'.color7',
	'.color8',
];



	function actColorCalc(gammaHue, gammaLight, callback) {
			arrStyleColor.forEach((item, i)=>{
					
					// if (i > gamma.length-1) {
					// 	i = 0
					// };
					let newArrayLight = gammaLight.map((item, i) =>{
<<<<<<< HEAD
						
							 if(result[2]<= 100 && result[2] > 97){delta = 100 - (result[2]/1.08)}
=======
						let delta;
							 if(result[2]<= 100 && result[2] > 97){delta = 100 - (result[2]/1.23)}
>>>>>>> 172a8b6e33bf7dcd8b9e94e2be0f27462ada0ae2
						else if(result[2] <= 13 && result[2] >= 0) {delta =0}

						else if(result[2] <= gammaLight[0]  && result[2] >=  gammaLight[1])   {delta = gammaLight[0] - result[2]}
						else if(result[2] <= gammaLight[1]  && result[2] >=  gammaLight[2])   {delta = gammaLight[1] - result[2]}
						else if(result[2] <= gammaLight[2]  && result[2] >=  gammaLight[3])   {delta = gammaLight[2] - result[2]}
						else if(result[2] <= gammaLight[3]  && result[2] >=  gammaLight[4])   {delta = gammaLight[3] - result[2]}
						else if(result[2] <= gammaLight[4]  && result[2] >=  gammaLight[5])   {delta = gammaLight[4] - result[2]}
						else if(result[2] <= gammaLight[5]  && result[2] >=  gammaLight[6])   {delta = gammaLight[5] - result[2]}
						else if(result[2] <= gammaLight[6]  && result[2] >=  gammaLight[7])   {delta = gammaLight[6] - result[2]}
						else if(result[2] <= gammaLight[7]  && result[2] >=  gammaLight[0])   {delta = gammaLight[7] - result[2]}

						return item - delta;
					});
<<<<<<< HEAD
					
					let newArrayHue = gammaHue.map(item =>{
						// let deltaHue;
						// if(gammaHue[i]){ deltaHue = gammaHue[i] - (result[0]/18) };

							

						// console.log(item)
						return  item;
						
=======

					let newArrayHue = gammaHue.map(item =>{
						let deltaHue = (200- result[0]);
						return  +item + deltaHue ;
>>>>>>> 172a8b6e33bf7dcd8b9e94e2be0f27462ada0ae2
					});

					    

					// counterPlus(newArrayHue);
<<<<<<< HEAD
					// counterPlus(newArrayLight);
					console.log(newArrayHue[cou2])
=======
					// counterPlus(arrStyleColor);
					
>>>>>>> 172a8b6e33bf7dcd8b9e94e2be0f27462ada0ae2

					$('span.active').siblings(item).css("background", 
							`hsl(${newArrayHue[cou2]}, ${100}%, ${newArrayLight[i]}%)`);

<<<<<<< HEAD

					if(newArrayHue[cou1]<= 22  && newArrayHue[cou1]>= 354)  
					{$('span.active').siblings(item).css("background", `hsl(${newArrayHue[cou2]}, ${100}%, ${newArrayLight[i]-0}%)`)}

					else if( newArrayHue[cou2] <= 48  && newArrayHue[cou2] >= 23)  
					{$('span.active').siblings(item).css("background", `hsl(${newArrayHue[cou2]}, ${100}%, ${newArrayLight[i]-20}%)`)}

					else if( newArrayHue[cou2] <= 94  && newArrayHue[cou2] >= 49) 
					{$('span.active').siblings(item).css("background", `hsl(${newArrayHue[cou2]}, ${100}%, ${newArrayLight[i]-20}%)`)}
=======
						   if(newArrayHue[cou2]>= 0  && newArrayHue[cou2]<= 22)  
					{$(tabsContent).children(arrStyleColor[0]).css("background", `hsl(${newArrayHue[cou1]}, ${gammaSat[cou1]}%, ${ +newArrayLight[i] + 85 }%)`)
					 $(tabsContent).children(arrStyleColor[1]).css("background", `hsl(${newArrayHue[cou2]}, ${gammaSat[cou2]}%, ${ +newArrayLight[i] + 82 }%)`)
					 $(tabsContent).children(arrStyleColor[2]).css("background", `hsl(${newArrayHue[cou3]}, ${gammaSat[cou3]}%, ${ +newArrayLight[i] + 79 }%)`)
					 $(tabsContent).children(arrStyleColor[3]).css("background", `hsl(${newArrayHue[cou4]}, ${gammaSat[cou4]}%, ${ +newArrayLight[i] + 46 }%)`)
					 $(tabsContent).children(arrStyleColor[4]).css("background", `hsl(${newArrayHue[cou5]}, ${gammaSat[cou5]}%, ${ +newArrayLight[i] + 43 }%)`)
					 $(tabsContent).children(arrStyleColor[5]).css("background", `hsl(${newArrayHue[cou6]}, ${gammaSat[cou6]}%, ${ +newArrayLight[i] + 22 }%)`)
					 $(tabsContent).children(arrStyleColor[6]).css("background", `hsl(${newArrayHue[cou7]}, ${gammaSat[cou7]}%, ${ +newArrayLight[i] + 14 }%)`)
					 $(tabsContent).children(arrStyleColor[7]).css("background", `hsl(${newArrayHue[cou8]}, ${gammaSat[cou8]}%, ${ +newArrayLight[i] + 9  }%)`)
					}
					else if( newArrayHue[cou2] >= 23  && newArrayHue[cou2] <= 48)  
				   {$(tabsContent).children(arrStyleColor[0]).css("background", `hsl(${newArrayHue[cou1]}, ${gammaSat[cou1]     }%, ${ +newArrayLight[i] + 81 }%)`)
					$(tabsContent).children(arrStyleColor[1]).css("background", `hsl(${newArrayHue[cou2]}, ${gammaSat[cou2]     }%, ${ +newArrayLight[i] + 75 }%)`)
					$(tabsContent).children(arrStyleColor[2]).css("background", `hsl(${newArrayHue[cou3]}, ${gammaSat[cou3]     }%, ${ +newArrayLight[i] + 65 }%)`)
					$(tabsContent).children(arrStyleColor[3]).css("background", `hsl(${newArrayHue[cou4]}, ${gammaSat[cou4] +10 }%, ${ +newArrayLight[i] + 42 }%)`)
					$(tabsContent).children(arrStyleColor[4]).css("background", `hsl(${newArrayHue[cou5]}, ${gammaSat[cou5]     }%, ${ +newArrayLight[i] + 36 }%)`)
					$(tabsContent).children(arrStyleColor[5]).css("background", `hsl(${newArrayHue[cou6]}, ${gammaSat[cou6]     }%, ${ +newArrayLight[i] + 23 }%)`)
					$(tabsContent).children(arrStyleColor[6]).css("background", `hsl(${newArrayHue[cou7]}, ${gammaSat[cou7]     }%, ${ +newArrayLight[i] + 13 }%)`)
					$(tabsContent).children(arrStyleColor[7]).css("background", `hsl(${newArrayHue[cou8]}, ${gammaSat[cou8] +30 }%, ${ +newArrayLight[i] + 9  }%)`)
					}
					else if( newArrayHue[cou2] >= 49  && newArrayHue[cou2] <= 93) 
				   {$(tabsContent).children(arrStyleColor[0]).css("background", `hsl(${newArrayHue[cou1]}, ${gammaSat[cou1]     }%, ${ +newArrayLight[i] + 78 }%)`)
					$(tabsContent).children(arrStyleColor[1]).css("background", `hsl(${newArrayHue[cou2]}, ${gammaSat[cou2]     }%, ${ +newArrayLight[i] + 68 }%)`)
					$(tabsContent).children(arrStyleColor[2]).css("background", `hsl(${newArrayHue[cou3]}, ${gammaSat[cou3]     }%, ${ +newArrayLight[i] + 53 }%)`)
					$(tabsContent).children(arrStyleColor[3]).css("background", `hsl(${newArrayHue[cou4]}, ${gammaSat[cou4] +35 }%, ${ +newArrayLight[i] + 31 }%)`)
					$(tabsContent).children(arrStyleColor[4]).css("background", `hsl(${newArrayHue[cou5]}, ${gammaSat[cou5] +5  }%, ${ +newArrayLight[i] + 28 }%)`)
					$(tabsContent).children(arrStyleColor[5]).css("background", `hsl(${newArrayHue[cou6]}, ${gammaSat[cou6] +30 }%, ${ +newArrayLight[i] + 15 }%)`)
					$(tabsContent).children(arrStyleColor[6]).css("background", `hsl(${newArrayHue[cou7]}, ${gammaSat[cou7] +5  }%, ${ +newArrayLight[i] + 11 }%)`)
					$(tabsContent).children(arrStyleColor[7]).css("background", `hsl(${newArrayHue[cou8]}, ${gammaSat[cou8] +10 }%, ${ +newArrayLight[i] + 7  }%)`)
					}
					else if( newArrayHue[cou2] >= 94 && newArrayHue[cou2] <= 158) 
				   {$(tabsContent).children(arrStyleColor[0]).css("background", `hsl(${newArrayHue[cou1]}, ${gammaSat[cou1]     }%, ${ +newArrayLight[i] + 81 }%)`)
					$(tabsContent).children(arrStyleColor[1]).css("background", `hsl(${newArrayHue[cou2]}, ${gammaSat[cou2]     }%, ${ +newArrayLight[i] + 74 }%)`)
					$(tabsContent).children(arrStyleColor[2]).css("background", `hsl(${newArrayHue[cou3]}, ${gammaSat[cou3]     }%, ${ +newArrayLight[i] + 55 }%)`)
					$(tabsContent).children(arrStyleColor[3]).css("background", `hsl(${newArrayHue[cou4]}, ${gammaSat[cou4] +20 }%, ${ +newArrayLight[i] + 32 }%)`)
					$(tabsContent).children(arrStyleColor[4]).css("background", `hsl(${newArrayHue[cou5]}, ${gammaSat[cou5]     }%, ${ +newArrayLight[i] + 29 }%)`)
					$(tabsContent).children(arrStyleColor[5]).css("background", `hsl(${newArrayHue[cou6]}, ${gammaSat[cou6]     }%, ${ +newArrayLight[i] + 18 }%)`)
					$(tabsContent).children(arrStyleColor[6]).css("background", `hsl(${newArrayHue[cou7]}, ${gammaSat[cou7]     }%, ${ +newArrayLight[i] + 13 }%)`)
					$(tabsContent).children(arrStyleColor[7]).css("background", `hsl(${newArrayHue[cou8]}, ${gammaSat[cou8]     }%, ${ +newArrayLight[i] + 9  }%)`)
				   }
					else if( newArrayHue[cou2] >= 159 && newArrayHue[cou2] <= 199) 
				   {$(tabsContent).children(arrStyleColor[0]).css("background", `hsl(${newArrayHue[cou1]}, ${gammaSat[cou1]     }%, ${ +newArrayLight[i] + 83 }%)`)
					$(tabsContent).children(arrStyleColor[1]).css("background", `hsl(${newArrayHue[cou2]}, ${gammaSat[cou2]     }%, ${ +newArrayLight[i] + 77 }%)`)
					$(tabsContent).children(arrStyleColor[2]).css("background", `hsl(${newArrayHue[cou3]}, ${gammaSat[cou3]     }%, ${ +newArrayLight[i] + 60 }%)`)
					$(tabsContent).children(arrStyleColor[3]).css("background", `hsl(${newArrayHue[cou4]}, ${gammaSat[cou4] +10 }%, ${ +newArrayLight[i] + 33 }%)`)
					$(tabsContent).children(arrStyleColor[4]).css("background", `hsl(${newArrayHue[cou5]}, ${gammaSat[cou5] +10 }%, ${ +newArrayLight[i] + 27 }%)`)
					$(tabsContent).children(arrStyleColor[5]).css("background", `hsl(${newArrayHue[cou6]}, ${gammaSat[cou6] +10 }%, ${ +newArrayLight[i] + 17 }%)`)
					$(tabsContent).children(arrStyleColor[6]).css("background", `hsl(${newArrayHue[cou7]}, ${gammaSat[cou7] +20 }%, ${ +newArrayLight[i] + 11 }%)`)
					$(tabsContent).children(arrStyleColor[7]).css("background", `hsl(${newArrayHue[cou8]}, ${gammaSat[cou8] +20 }%, ${ +newArrayLight[i] + 8  }%)`)
				   }
					else if( newArrayHue[cou2] >= 200 && newArrayHue[cou2] <= 241) 
				   {$(tabsContent).children(arrStyleColor[0]).css("background", `hsl(${newArrayHue[cou1]}, ${gammaSat[cou1] +30 }%, ${ +newArrayLight[i] + 85 }%)`)
					$(tabsContent).children(arrStyleColor[1]).css("background", `hsl(${newArrayHue[cou2]}, ${gammaSat[cou2] +50 }%, ${ +newArrayLight[i] + 82 }%)`)
					$(tabsContent).children(arrStyleColor[2]).css("background", `hsl(${newArrayHue[cou3]}, ${gammaSat[cou3] +70 }%, ${ +newArrayLight[i] + 74 }%)`)
					$(tabsContent).children(arrStyleColor[3]).css("background", `hsl(${newArrayHue[cou4]}, ${gammaSat[cou4] +20 }%, ${ +newArrayLight[i] + 53 }%)`)
					$(tabsContent).children(arrStyleColor[4]).css("background", `hsl(${newArrayHue[cou5]}, ${gammaSat[cou5]     }%, ${ +newArrayLight[i] + 41 }%)`)
					$(tabsContent).children(arrStyleColor[5]).css("background", `hsl(${newArrayHue[cou6]}, ${gammaSat[cou6] +5  }%, ${ +newArrayLight[i] + 28 }%)`)
					$(tabsContent).children(arrStyleColor[6]).css("background", `hsl(${newArrayHue[cou7]}, ${gammaSat[cou7] +10 }%, ${ +newArrayLight[i] + 20 }%)`)
					$(tabsContent).children(arrStyleColor[7]).css("background", `hsl(${newArrayHue[cou8]}, ${gammaSat[cou8] +20 }%, ${ +newArrayLight[i] + 15  }%)`)
				   }
					else if( newArrayHue[cou2] >= 242 && newArrayHue[cou2] <= 280) 
				   {$(tabsContent).children(arrStyleColor[0]).css("background", `hsl(${newArrayHue[cou1]}, ${gammaSat[cou1] +20  }%, ${ +newArrayLight[i] + 84 }%)`)
					$(tabsContent).children(arrStyleColor[1]).css("background", `hsl(${newArrayHue[cou2]}, ${gammaSat[cou2] +20  }%, ${ +newArrayLight[i] + 79 }%)`)
					$(tabsContent).children(arrStyleColor[2]).css("background", `hsl(${newArrayHue[cou3]}, ${gammaSat[cou3] +30  }%, ${ +newArrayLight[i] + 75 }%)`)
					$(tabsContent).children(arrStyleColor[3]).css("background", `hsl(${newArrayHue[cou4]}, ${gammaSat[cou4] +30  }%, ${ +newArrayLight[i] + 68 }%)`)
					$(tabsContent).children(arrStyleColor[4]).css("background", `hsl(${newArrayHue[cou5]}, ${gammaSat[cou5] +30  }%, ${ +newArrayLight[i] + 65 }%)`)
					$(tabsContent).children(arrStyleColor[5]).css("background", `hsl(${newArrayHue[cou6]}, ${gammaSat[cou6] +30  }%, ${ +newArrayLight[i] + 55 }%)`)
					$(tabsContent).children(arrStyleColor[6]).css("background", `hsl(${newArrayHue[cou7]}, ${gammaSat[cou7] +30  }%, ${ +newArrayLight[i] + 48 }%)`)
					$(tabsContent).children(arrStyleColor[7]).css("background", `hsl(${newArrayHue[cou8]}, ${gammaSat[cou8] +30  }%, ${ +newArrayLight[i] + 40 }%)`)
				   }
					else if( newArrayHue[cou2] >= 281 && newArrayHue[cou2] <= 352) 
				   {$(tabsContent).children(arrStyleColor[0]).css("background", `hsl(${newArrayHue[cou1]}, ${gammaSat[cou1]     }%, ${ +newArrayLight[i] + 85 }%)`)
					$(tabsContent).children(arrStyleColor[1]).css("background", `hsl(${newArrayHue[cou2]}, ${gammaSat[cou2]     }%, ${ +newArrayLight[i] + 83 }%)`)
					$(tabsContent).children(arrStyleColor[2]).css("background", `hsl(${newArrayHue[cou3]}, ${gammaSat[cou3] +10 }%, ${ +newArrayLight[i] + 77 }%)`)
					$(tabsContent).children(arrStyleColor[3]).css("background", `hsl(${newArrayHue[cou4]}, ${gammaSat[cou4] +10 }%, ${ +newArrayLight[i] + 64 }%)`)
					$(tabsContent).children(arrStyleColor[4]).css("background", `hsl(${newArrayHue[cou5]}, ${gammaSat[cou5]     }%, ${ +newArrayLight[i] + 55 }%)`)
					$(tabsContent).children(arrStyleColor[5]).css("background", `hsl(${newArrayHue[cou6]}, ${gammaSat[cou6]     }%, ${ +newArrayLight[i] + 33}%)`)
					$(tabsContent).children(arrStyleColor[6]).css("background", `hsl(${newArrayHue[cou7]}, ${gammaSat[cou7]     }%, ${ +newArrayLight[i] + 25 }%)`)
					$(tabsContent).children(arrStyleColor[7]).css("background", `hsl(${newArrayHue[cou8]}, ${gammaSat[cou8] -5  }%, ${ +newArrayLight[i] + 18 }%)`)
				   }
					else if(newArrayHue[cou2] >= 353  && newArrayHue[cou2] <= 360)  
					{$(tabsContent).children(arrStyleColor[0]).css("background", `hsl(${newArrayHue[cou1]}, ${gammaSat[cou1]     }%, ${ +newArrayLight[i] + 85 }%)`)
					 $(tabsContent).children(arrStyleColor[1]).css("background", `hsl(${newArrayHue[cou2]}, ${gammaSat[cou2]     }%, ${ +newArrayLight[i] + 82 }%)`)
					 $(tabsContent).children(arrStyleColor[2]).css("background", `hsl(${newArrayHue[cou3]}, ${gammaSat[cou3]     }%, ${ +newArrayLight[i] + 75 }%)`)
					 $(tabsContent).children(arrStyleColor[3]).css("background", `hsl(${newArrayHue[cou4]}, ${gammaSat[cou4]     }%, ${ +newArrayLight[i] + 48 }%)`)
					 $(tabsContent).children(arrStyleColor[4]).css("background", `hsl(${newArrayHue[cou5]}, ${gammaSat[cou5]     }%, ${ +newArrayLight[i] + 35 }%)`)
					 $(tabsContent).children(arrStyleColor[5]).css("background", `hsl(${newArrayHue[cou6]}, ${gammaSat[cou6]     }%, ${ +newArrayLight[i] + 22 }%)`)
					 $(tabsContent).children(arrStyleColor[6]).css("background", `hsl(${newArrayHue[cou7]}, ${gammaSat[cou7]     }%, ${ +newArrayLight[i] + 14 }%)`)
					 $(tabsContent).children(arrStyleColor[7]).css("background", `hsl(${newArrayHue[cou8]}, ${gammaSat[cou8]     }%, ${ +newArrayLight[i] + 9  }%)`)
					}

					//    if(newArrayLight[i] == 100){$(tabsContent).siblings(item).css("background", `hsl(${newArrayHue[i]}, ${50}%, ${ newArrayLight[i]-11}%)`)}
					// else if(newArrayLight[i] == 0){$(tabsContent).siblings(item).css("background", `hsl(${newArrayHue[i]}, ${50}%, ${ newArrayLight[i]+11}%)`)}
			});
>>>>>>> 172a8b6e33bf7dcd8b9e94e2be0f27462ada0ae2

					else if( newArrayHue[cou2] <= 159 && newArrayHue[cou2] >= 95) 
					{$('span.active').siblings(item).css("background", `hsl(${newArrayHue[cou2]}, ${100}%, ${newArrayLight[i]-20}%)`)}

					else if( newArrayHue[cou2] <= 200 && newArrayHue[cou2] >= 160) 
					{$('span.active').siblings(item).css("background", `hsl(${newArrayHue[cou2]}, ${100}%, ${newArrayLight[i]-20}%)`)}

					else if( newArrayHue[cou2] <= 242 && newArrayHue[cou2] >= 201) 
					{$('span.active').siblings(item).css("background", `hsl(${newArrayHue[cou2]}, ${100}%, ${newArrayLight[i]-20}%)`)}

					else if( newArrayHue[cou2] <= 281 && newArrayHue[cou2] >= 243) 
					{$('span.active').siblings(item).css("background", `hsl(${newArrayHue[cou2]}, ${100}%, ${newArrayLight[i]-20}%)`)}

					else if( newArrayHue[cou2] <= 353 && newArrayHue[cou2] >= 282) 
					{$('span.active').siblings(item).css("background", `hsl(${newArrayHue[cou2]}, ${100}%, ${newArrayLight[i]-20}%)`)}
				
			});
			
			callback(arrStyleColor);
			$('span.active').css('backgroundColor', `hsl(${result[0]}, ${result[1]}%, ${result[2]}%)`);
			
			// callback(counterPlus);
			// return gamma
			
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
//21,  48,  100,  97
	let arryTable_1_Step = [
		[new ColorType().calcTone(206, 208, 42,   97)],   /*КРАСНЫЙ*/
		[new ColorType().calcTone(0,   20,  33,   97)],
		[new ColorType().calcTone(200, 208, 42,   91)],   /*ОРАНЖЕВЫЙ*/
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
		arryTable_8_Step[3],
		arryTable_1_Step[2],
		arryTable_2_Step[0],
		arryTable_3_Step[10],
		arryTable_4_Step[14],
		arryTable_5_Step[5],
		arryTable_6_Step[0],
		arryTable_8_Step[6]
	];

	function shuffleArray(array) {
		for (var i = array.length - 1; i > 0; i--) {
			var j = Math.floor(Math.random() * (i + 1));
			var temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}
	};
	
	
	function test(){
		tabsContent.forEach((item, i) => {
			let span = item.querySelectorAll("span");
			
	let	sleepRoom = [
							
		arryTable_6_Step[ cou1 ],
		arryTable_3_Step[ cou1 ]
	];
	
	let	gostinaya = [
	
		arryTable_1_Step[ cou1 ],
		arryTable_2_Step[ cou1 ]
	];
			function getColor(arraySpace){
				counterPlus(arryTable_1_Step);
				
						span[0].style.background = `${arraySpace[0]}`;
						span[1].style.background = `${arraySpace[1]}`;
						};
		
			let idTabsContent = item.getAttribute('id');

			if(tabsBtn[i].classList.contains('active') ){

				
				if (idTabsContent == 'sleepRoom'){getColor(sleepRoom)}
				else if (idTabsContent == 'gostinaya'){getColor(gostinaya)};
		
				
				console.log(idTabsContent);
			};	
		});	
	}
	
	
	
	function calcColor(callback) {
		
		tabsContent.forEach((item, i) => {

			let color1 =  tabsContent[i].querySelectorAll('.color1');
			let color2 =  tabsContent[i].querySelectorAll('.color2');
			let color3 =  tabsContent[i].querySelectorAll('.color3');
			let color4 =  tabsContent[i].querySelectorAll('.color4');
			let color5 =  tabsContent[i].querySelectorAll('.color5');
			let color6 =  tabsContent[i].querySelectorAll('.color6');
			let color7 =  tabsContent[i].querySelectorAll('.color7');
			let color8 =  tabsContent[i].querySelectorAll('.color8');
				

			if (tabsBtn[i].classList.contains('active')) {
				callback(arryTable_1_Step);
				color1.forEach((item) => {
				
					item.style.background = new colorGamma(tabsBtn[0], arryTable_2_Step[ cou1 ]).fillColor() ;
					item.style.background = new colorGamma(tabsBtn[1], arrTon[ cou1 ]).fillColor();
					item.style.background = new colorGamma(tabsBtn[2], arrTon[ cou1 ]).fillColor();
					item.style.background = new colorGamma(tabsBtn[3], arrTon[ cou1 ]).fillColor();
					item.style.background = new colorGamma(tabsBtn[4], arrTon[ cou1 ]).fillColor();
					item.style.background = new colorGamma(tabsBtn[5], arrTon[ cou1 ]).fillColor();
					item.style.background = new colorGamma(tabsBtn[6], arrTon[ cou1 ]).fillColor();
					item.style.background = new colorGamma(tabsBtn[7], arryTable_1_Step[ cou1 ]).fillColor();
				});

				color2.forEach((item) => {
					item.style.background = new colorGamma(tabsBtn[0], arryTable_1_Step[ cou1 ]).fillColor();
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
					item.style.background = new colorGamma(tabsBtn[0], arryTable_4_Step[ cou3 ]).fillColor();
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
					item.style.background = new colorGamma(tabsBtn[0], arryTable_7_Step[ cou7 ]).fillColor();
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
	};

	calcColor(counterPlus);
	
	//___COUNTER____///
	function counterPlus(a) {
		cou1++; cou2++; cou3++; cou4++;  cou5++; cou6++; cou7++; cou8++;
		// cout.forEach((item)=>{
		// 	item++
		// 	if(item > a.length-1){ item = 0}
		// 		})
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
			console.log('plus')
			// return a;
			
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
		console.log('minus');
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

///____Convert RGB to HEX______////

	function rgb2hex(rgb) {
		// let sep = rgb.indexOf(",") > -1 ? "," : " ";
		// rgb = rgb.substr(4).split(")")[0].split(sep);
	  
		// // Convert %s to 0–255
		// for (let R in rgb) {
		//   let r = rgb[R];
		//   if (r.indexOf("%") > -1)
		// 	rgb[R] = Math.round(r.substr(0,r.length - 1) / 100 * 255);
		// 	/* Example:
		// 	75% -> 191
		// 	75/100 = 0.75, * 255 = 191.25 -> 191
		// 	*/
		// }

		// Choose correct separator
		let sep = rgb.indexOf(",") > -1 ? "," : " ";
		// Turn "rgb(r,g,b)" into [r,g,b]
		rgb = rgb.substr(4).split(")")[0].split(sep);
	  
		let r = (+rgb[0]).toString(16),
			g = (+rgb[1]).toString(16),
			b = (+rgb[2]).toString(16);
	  
		if (r.length == 1)
		  r = "0" + r;
		if (g.length == 1)
		  g = "0" + g;
		if (b.length == 1)
		  b = "0" + b;
	  
		return  r + g + b;

		// return "#" + (rgb.match(/\b(\d+)\b/g).map(function (digit) {
		// 	return ('0' + parseInt(digit).toString(16)).slice(-2)
		// })).join('');
	};
	
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

	tabsContent.forEach(function (item) {
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
					counterPlus(spaRoomColor1);
					$('span.active').css('backgroundColor', 
					`${arryTable_3_Step[ cou1 ]}`);
					console.log('left')
				} else {
					counterMinus(spaRoomColor1);
					$('span.active').css('backgroundColor', 
					`${arryTable_3_Step[ cou1 ]}`);
						
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
	tabsContent.forEach(function (item) {
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