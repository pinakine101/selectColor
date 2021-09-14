"use strict"
/*Plan_Committtttttttt
1. Сделать выбор цвета по клику на цвете - DONE
2   выбор образца цвета по движению мыши - DONE
3. Функция добавить/убрать блока - DONE
4. Выпадающее меню для меню  DONE
5. Кнопка "canculate color" - DONE
6. Сверстать три страницы
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
	let color1 = document.querySelector('.color1')

	let counter = [0,1,2,3,4,5,6,7];
		let cou1 = 0, cou2 = 1, cou3 = 2, cou4 = 3, 
		cou5 = 4, cou6 = 5, cou7 = 6, cou8 = 7;
	 //счётчики пребора цветов в каждом блоке
	// let spanActive = $('span.active');
	let spanActive = document.querySelector('span.active')
	let textColorBuffer; // содержит имя цвета
	let textColor = document.createElement('textCol'); // показывает имя цвета
	let forslice ;


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
let arraySatur = [
	50, 50, 50, 50,  50, 50, 50, 50
];
// let arraySatur = [
// 	20, 15, 10, 5, 20, 15, 10, 5,
// ];
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

	//______Active Color_________//

	
	function findColorName() {
		// находим в активном табе активный цвет 
		tabsContent.forEach((item, i) => {
			if (tabsBtn[i].classList.contains('active')) {
				const color = tabsContent[i].querySelector('span.active');
				//помещаем в  переменную *textColorBuffer*  имя HEX активного цвета
			
				textColorBuffer = rgb2hex(color.style.background);
				// sliceColor(spanActive);
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
				sliceColor()
			console.log(result[0], result[1], result[2]);
		
		}

	tabsContent.forEach(function (item, i) { // вешаем на контейнер с цветами фунцию активного цвета
		item.addEventListener('click', activeColor);
	});

		function deletActivColor(e){  //функионал режима БЕЗ *span.active*
			const target = e.target;
				target.classList.remove('active');
				textColor.remove();
				editButtns[0].addEventListener('click', calcCouMinus);  //добовляем оброботчики перебора гаммы в режиме  *span.active*
				editButtns[1].addEventListener('click', calcCouPlus);
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


	function calcCouPlus(){ // запускаем перебор гаммы в plus режима БЕЗ *span.active*
		actColorCalc(color1, arrayHue, arraySatur, arrayLight, counterPlus);
		
	};
	function calcCouMinus(){ // запускаем перебор гаммы в minus режима БЕЗ *span.active*
		actColorCalc(color1, arrayHue, arraySatur, arrayLight, counterMinus);
		
	
		// calcColor(counterMinus)
		console.log('actColorCalc')
	};
    function actCalcCouPus(){ // запускаем перебор гаммы в *+* режима  *span.active*
		actColorCalc(spanActive, arrayHue, arraySatur, arrayLight, counterPlus);
		forslice = document.querySelector('span.active');
		sliceColor()
		
		
	};
	function actCalcCouMinus(){ // запускаем перебор гаммы в *-* режима *span.active*
		actColorCalc(spanActive, arrayHue,arraySatur, arrayLight, counterMinus);
		forslice = document.querySelector('span.active');
		sliceColor()

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
				counterPlus(arrayHue);
				y++;
				let newColor = $(arrStyleColor[cou1]).insertAfter('span.active');
				if (tabsBtn[0].classList.contains('active')){
					$(newColor).css("background-color", `hsl(${arrayHue[cou1]}, ${arraySatur[cou1]}%, ${ arrayLight[cou1]}%)`);
				};
				if (tabsBtn[1].classList.contains('active')){
					$(newColor).css("background-color", `hsl(${arrayHue[cou1]}, ${arraySatur[cou1]}%, ${ arrayLight[cou1]}%)`);
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



	$(tabsBtn).on('click', clickTabsBtn);

	function onClickTab(e){
		e.addEventListener('click', ()=>{
			
			// calcColor(counterPlus);
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
console.log($('.color1').css("backgroundColor"))


	function sliceColor(e){
		e = forslice;
		$(e).each(function () {
			const color = $(this).css("backgroundColor"),
				[r, g, b] = color.match(/\d+/g);
			const colHsl = RGB2HSL(r, g, b);
			result = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(colHsl).slice(1);
			
			return result;
		});
		return e;
	};

	
	function actColorCalc( mainColor, gammaHue, gammaSat, gammaLight, callback) {

		forslice = mainColor;
		
			arrStyleColor.forEach((item, i)=>{
					i = counter[i];
					let newArrayLight = gammaLight.map((item, i) =>{
						let delta;
							 if(result[2]<= 100 && result[2] > 97){delta = 100 - (result[2]/1.23)}
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

					let newArrayHue = gammaHue.map(item =>{
						let deltaHue = (180- result[0]);
						return  +item - deltaHue ;
					});

					// counterPlus(newArrayHue);
					// counterPlus(arrStyleColor);
					

					// $('span.active').siblings(item).css("background", 
					// 		`hsl(${newArrayHue[cou2]}, ${100}%, ${newArrayLight[i]}%)`);

						   if(newArrayHue[counter[0]]>= 0  && newArrayHue[counter[0]]<= 360)  
					{$(tabsContent).children(arrStyleColor[0]).css("background", `hsl(${newArrayHue[counter[0]]}, ${gammaSat[0]}%, ${ +newArrayLight[i] + 85 }%)`)
					 $(tabsContent).children(arrStyleColor[1]).css("background", `hsl(${newArrayHue[counter[1]]}, ${gammaSat[1]}%, ${ +newArrayLight[i] + 82 }%)`)
					 $(tabsContent).children(arrStyleColor[2]).css("background", `hsl(${newArrayHue[counter[2]]}, ${gammaSat[2]}%, ${ +newArrayLight[i] + 79 }%)`)
					 $(tabsContent).children(arrStyleColor[3]).css("background", `hsl(${newArrayHue[counter[3]]}, ${gammaSat[3]}%, ${ +newArrayLight[i] + 46 }%)`)
					 $(tabsContent).children(arrStyleColor[4]).css("background", `hsl(${newArrayHue[counter[4]]}, ${gammaSat[4]}%, ${ +newArrayLight[i] + 43 }%)`)
					 $(tabsContent).children(arrStyleColor[5]).css("background", `hsl(${newArrayHue[counter[5]]}, ${gammaSat[5]}%, ${ +newArrayLight[i] + 22 }%)`)
					 $(tabsContent).children(arrStyleColor[6]).css("background", `hsl(${newArrayHue[counter[6]]}, ${gammaSat[6]}%, ${ +newArrayLight[i] + 14 }%)`)
					 $(tabsContent).children(arrStyleColor[7]).css("background", `hsl(${newArrayHue[counter[7]]}, ${gammaSat[7]}%, ${ +newArrayLight[i] + 9  }%)`)
					}
				// 	else if( newArrayHue[cou2] >= 23  && newArrayHue[cou2] <= 48)  
				//    {$(tabsContent).children(arrStyleColor[0]).css("background", `hsl(${newArrayHue[cou1]}, ${gammaSat[cou1]     }%, ${ +newArrayLight[i] + 81 }%)`)
				// 	$(tabsContent).children(arrStyleColor[1]).css("background", `hsl(${newArrayHue[cou2]}, ${gammaSat[cou2]     }%, ${ +newArrayLight[i] + 75 }%)`)
				// 	$(tabsContent).children(arrStyleColor[2]).css("background", `hsl(${newArrayHue[cou3]}, ${gammaSat[cou3]     }%, ${ +newArrayLight[i] + 65 }%)`)
				// 	$(tabsContent).children(arrStyleColor[3]).css("background", `hsl(${newArrayHue[cou4]}, ${gammaSat[cou4] +10 }%, ${ +newArrayLight[i] + 42 }%)`)
				// 	$(tabsContent).children(arrStyleColor[4]).css("background", `hsl(${newArrayHue[cou5]}, ${gammaSat[cou5]     }%, ${ +newArrayLight[i] + 36 }%)`)
				// 	$(tabsContent).children(arrStyleColor[5]).css("background", `hsl(${newArrayHue[cou6]}, ${gammaSat[cou6]     }%, ${ +newArrayLight[i] + 23 }%)`)
				// 	$(tabsContent).children(arrStyleColor[6]).css("background", `hsl(${newArrayHue[cou7]}, ${gammaSat[cou7]     }%, ${ +newArrayLight[i] + 13 }%)`)
				// 	$(tabsContent).children(arrStyleColor[7]).css("background", `hsl(${newArrayHue[cou8]}, ${gammaSat[cou8] +30 }%, ${ +newArrayLight[i] + 9  }%)`)
				// 	}
				// 	else if( newArrayHue[cou2] >= 49  && newArrayHue[cou2] <= 93) 
				//    {$(tabsContent).children(arrStyleColor[0]).css("background", `hsl(${newArrayHue[cou1]}, ${gammaSat[cou1]     }%, ${ +newArrayLight[i] + 78 }%)`)
				// 	$(tabsContent).children(arrStyleColor[1]).css("background", `hsl(${newArrayHue[cou2]}, ${gammaSat[cou2]     }%, ${ +newArrayLight[i] + 68 }%)`)
				// 	$(tabsContent).children(arrStyleColor[2]).css("background", `hsl(${newArrayHue[cou3]}, ${gammaSat[cou3]     }%, ${ +newArrayLight[i] + 53 }%)`)
				// 	$(tabsContent).children(arrStyleColor[3]).css("background", `hsl(${newArrayHue[cou4]}, ${gammaSat[cou4] +35 }%, ${ +newArrayLight[i] + 31 }%)`)
				// 	$(tabsContent).children(arrStyleColor[4]).css("background", `hsl(${newArrayHue[cou5]}, ${gammaSat[cou5] +5  }%, ${ +newArrayLight[i] + 28 }%)`)
				// 	$(tabsContent).children(arrStyleColor[5]).css("background", `hsl(${newArrayHue[cou6]}, ${gammaSat[cou6] +30 }%, ${ +newArrayLight[i] + 15 }%)`)
				// 	$(tabsContent).children(arrStyleColor[6]).css("background", `hsl(${newArrayHue[cou7]}, ${gammaSat[cou7] +5  }%, ${ +newArrayLight[i] + 11 }%)`)
				// 	$(tabsContent).children(arrStyleColor[7]).css("background", `hsl(${newArrayHue[cou8]}, ${gammaSat[cou8] +10 }%, ${ +newArrayLight[i] + 7  }%)`)
				// 	}
				// 	else if( newArrayHue[cou2] >= 94 && newArrayHue[cou2] <= 158) 
				//    {$(tabsContent).children(arrStyleColor[0]).css("background", `hsl(${newArrayHue[cou1]}, ${gammaSat[cou1]     }%, ${ +newArrayLight[i] + 81 }%)`)
				// 	$(tabsContent).children(arrStyleColor[1]).css("background", `hsl(${newArrayHue[cou2]}, ${gammaSat[cou2]     }%, ${ +newArrayLight[i] + 74 }%)`)
				// 	$(tabsContent).children(arrStyleColor[2]).css("background", `hsl(${newArrayHue[cou3]}, ${gammaSat[cou3]     }%, ${ +newArrayLight[i] + 55 }%)`)
				// 	$(tabsContent).children(arrStyleColor[3]).css("background", `hsl(${newArrayHue[cou4]}, ${gammaSat[cou4] +20 }%, ${ +newArrayLight[i] + 32 }%)`)
				// 	$(tabsContent).children(arrStyleColor[4]).css("background", `hsl(${newArrayHue[cou5]}, ${gammaSat[cou5]     }%, ${ +newArrayLight[i] + 29 }%)`)
				// 	$(tabsContent).children(arrStyleColor[5]).css("background", `hsl(${newArrayHue[cou6]}, ${gammaSat[cou6]     }%, ${ +newArrayLight[i] + 18 }%)`)
				// 	$(tabsContent).children(arrStyleColor[6]).css("background", `hsl(${newArrayHue[cou7]}, ${gammaSat[cou7]     }%, ${ +newArrayLight[i] + 13 }%)`)
				// 	$(tabsContent).children(arrStyleColor[7]).css("background", `hsl(${newArrayHue[cou8]}, ${gammaSat[cou8]     }%, ${ +newArrayLight[i] + 9  }%)`)
				//    }
				// 	else if( newArrayHue[cou2] >= 159 && newArrayHue[cou2] <= 199) 
				//    {$(tabsContent).children(arrStyleColor[0]).css("background", `hsl(${newArrayHue[cou1]}, ${gammaSat[cou1]     }%, ${ +newArrayLight[i] + 83 }%)`)
				// 	$(tabsContent).children(arrStyleColor[1]).css("background", `hsl(${newArrayHue[cou2]}, ${gammaSat[cou2]     }%, ${ +newArrayLight[i] + 77 }%)`)
				// 	$(tabsContent).children(arrStyleColor[2]).css("background", `hsl(${newArrayHue[cou3]}, ${gammaSat[cou3]     }%, ${ +newArrayLight[i] + 60 }%)`)
				// 	$(tabsContent).children(arrStyleColor[3]).css("background", `hsl(${newArrayHue[cou4]}, ${gammaSat[cou4] +10 }%, ${ +newArrayLight[i] + 33 }%)`)
				// 	$(tabsContent).children(arrStyleColor[4]).css("background", `hsl(${newArrayHue[cou5]}, ${gammaSat[cou5] +10 }%, ${ +newArrayLight[i] + 27 }%)`)
				// 	$(tabsContent).children(arrStyleColor[5]).css("background", `hsl(${newArrayHue[cou6]}, ${gammaSat[cou6] +10 }%, ${ +newArrayLight[i] + 17 }%)`)
				// 	$(tabsContent).children(arrStyleColor[6]).css("background", `hsl(${newArrayHue[cou7]}, ${gammaSat[cou7] +20 }%, ${ +newArrayLight[i] + 11 }%)`)
				// 	$(tabsContent).children(arrStyleColor[7]).css("background", `hsl(${newArrayHue[cou8]}, ${gammaSat[cou8] +20 }%, ${ +newArrayLight[i] + 8  }%)`)
				//    }
				// 	else if( newArrayHue[cou2] >= 200 && newArrayHue[cou2] <= 241) 
				//    {$(tabsContent).children(arrStyleColor[0]).css("background", `hsl(${newArrayHue[cou1]}, ${gammaSat[cou1] +30 }%, ${ +newArrayLight[i] + 85 }%)`)
				// 	$(tabsContent).children(arrStyleColor[1]).css("background", `hsl(${newArrayHue[cou2]}, ${gammaSat[cou2] +50 }%, ${ +newArrayLight[i] + 82 }%)`)
				// 	$(tabsContent).children(arrStyleColor[2]).css("background", `hsl(${newArrayHue[cou3]}, ${gammaSat[cou3] +70 }%, ${ +newArrayLight[i] + 74 }%)`)
				// 	$(tabsContent).children(arrStyleColor[3]).css("background", `hsl(${newArrayHue[cou4]}, ${gammaSat[cou4] +20 }%, ${ +newArrayLight[i] + 53 }%)`)
				// 	$(tabsContent).children(arrStyleColor[4]).css("background", `hsl(${newArrayHue[cou5]}, ${gammaSat[cou5]     }%, ${ +newArrayLight[i] + 41 }%)`)
				// 	$(tabsContent).children(arrStyleColor[5]).css("background", `hsl(${newArrayHue[cou6]}, ${gammaSat[cou6] +5  }%, ${ +newArrayLight[i] + 28 }%)`)
				// 	$(tabsContent).children(arrStyleColor[6]).css("background", `hsl(${newArrayHue[cou7]}, ${gammaSat[cou7] +10 }%, ${ +newArrayLight[i] + 20 }%)`)
				// 	$(tabsContent).children(arrStyleColor[7]).css("background", `hsl(${newArrayHue[cou8]}, ${gammaSat[cou8] +20 }%, ${ +newArrayLight[i] + 15  }%)`)
				//    }
				// 	else if( newArrayHue[cou2] >= 242 && newArrayHue[cou2] <= 280) 
				//    {$(tabsContent).children(arrStyleColor[0]).css("background", `hsl(${newArrayHue[cou1]}, ${gammaSat[cou1] +20  }%, ${ +newArrayLight[i] + 84 }%)`)
				// 	$(tabsContent).children(arrStyleColor[1]).css("background", `hsl(${newArrayHue[cou2]}, ${gammaSat[cou2] +20  }%, ${ +newArrayLight[i] + 79 }%)`)
				// 	$(tabsContent).children(arrStyleColor[2]).css("background", `hsl(${newArrayHue[cou3]}, ${gammaSat[cou3] +30  }%, ${ +newArrayLight[i] + 75 }%)`)
				// 	$(tabsContent).children(arrStyleColor[3]).css("background", `hsl(${newArrayHue[cou4]}, ${gammaSat[cou4] +30  }%, ${ +newArrayLight[i] + 68 }%)`)
				// 	$(tabsContent).children(arrStyleColor[4]).css("background", `hsl(${newArrayHue[cou5]}, ${gammaSat[cou5] +30  }%, ${ +newArrayLight[i] + 65 }%)`)
				// 	$(tabsContent).children(arrStyleColor[5]).css("background", `hsl(${newArrayHue[cou6]}, ${gammaSat[cou6] +30  }%, ${ +newArrayLight[i] + 55 }%)`)
				// 	$(tabsContent).children(arrStyleColor[6]).css("background", `hsl(${newArrayHue[cou7]}, ${gammaSat[cou7] +30  }%, ${ +newArrayLight[i] + 48 }%)`)
				// 	$(tabsContent).children(arrStyleColor[7]).css("background", `hsl(${newArrayHue[cou8]}, ${gammaSat[cou8] +30  }%, ${ +newArrayLight[i] + 40 }%)`)
				//    }
				// 	else if( newArrayHue[cou2] >= 281 && newArrayHue[cou2] <= 352) 
				//    {$(tabsContent).children(arrStyleColor[0]).css("background", `hsl(${newArrayHue[cou1]}, ${gammaSat[cou1]     }%, ${ +newArrayLight[i] + 85 }%)`)
				// 	$(tabsContent).children(arrStyleColor[1]).css("background", `hsl(${newArrayHue[cou2]}, ${gammaSat[cou2]     }%, ${ +newArrayLight[i] + 83 }%)`)
				// 	$(tabsContent).children(arrStyleColor[2]).css("background", `hsl(${newArrayHue[cou3]}, ${gammaSat[cou3] +10 }%, ${ +newArrayLight[i] + 77 }%)`)
				// 	$(tabsContent).children(arrStyleColor[3]).css("background", `hsl(${newArrayHue[cou4]}, ${gammaSat[cou4] +10 }%, ${ +newArrayLight[i] + 64 }%)`)
				// 	$(tabsContent).children(arrStyleColor[4]).css("background", `hsl(${newArrayHue[cou5]}, ${gammaSat[cou5]     }%, ${ +newArrayLight[i] + 55 }%)`)
				// 	$(tabsContent).children(arrStyleColor[5]).css("background", `hsl(${newArrayHue[cou6]}, ${gammaSat[cou6]     }%, ${ +newArrayLight[i] + 33}%)`)
				// 	$(tabsContent).children(arrStyleColor[6]).css("background", `hsl(${newArrayHue[cou7]}, ${gammaSat[cou7]     }%, ${ +newArrayLight[i] + 25 }%)`)
				// 	$(tabsContent).children(arrStyleColor[7]).css("background", `hsl(${newArrayHue[cou8]}, ${gammaSat[cou8] -5  }%, ${ +newArrayLight[i] + 18 }%)`)
				//    }
				// 	else if(newArrayHue[cou2] >= 353  && newArrayHue[cou2] <= 360)  
				// 	{$(tabsContent).children(arrStyleColor[0]).css("background", `hsl(${newArrayHue[cou1]}, ${gammaSat[cou1]     }%, ${ +newArrayLight[i] + 85 }%)`)
				// 	 $(tabsContent).children(arrStyleColor[1]).css("background", `hsl(${newArrayHue[cou2]}, ${gammaSat[cou2]     }%, ${ +newArrayLight[i] + 82 }%)`)
				// 	 $(tabsContent).children(arrStyleColor[2]).css("background", `hsl(${newArrayHue[cou3]}, ${gammaSat[cou3]     }%, ${ +newArrayLight[i] + 75 }%)`)
				// 	 $(tabsContent).children(arrStyleColor[3]).css("background", `hsl(${newArrayHue[cou4]}, ${gammaSat[cou4]     }%, ${ +newArrayLight[i] + 48 }%)`)
				// 	 $(tabsContent).children(arrStyleColor[4]).css("background", `hsl(${newArrayHue[cou5]}, ${gammaSat[cou5]     }%, ${ +newArrayLight[i] + 35 }%)`)
				// 	 $(tabsContent).children(arrStyleColor[5]).css("background", `hsl(${newArrayHue[cou6]}, ${gammaSat[cou6]     }%, ${ +newArrayLight[i] + 22 }%)`)
				// 	 $(tabsContent).children(arrStyleColor[6]).css("background", `hsl(${newArrayHue[cou7]}, ${gammaSat[cou7]     }%, ${ +newArrayLight[i] + 14 }%)`)
				// 	 $(tabsContent).children(arrStyleColor[7]).css("background", `hsl(${newArrayHue[cou8]}, ${gammaSat[cou8]     }%, ${ +newArrayLight[i] + 9  }%)`)
				// 	}

					//    if(newArrayLight[i] == 100){$(tabsContent).siblings(item).css("background", `hsl(${newArrayHue[i]}, ${50}%, ${ newArrayLight[i]-11}%)`)}
					// else if(newArrayLight[i] == 0){$(tabsContent).siblings(item).css("background", `hsl(${newArrayHue[i]}, ${50}%, ${ newArrayLight[i]+11}%)`)}
			});

			$('span.active').css('backgroundColor', `hsl(${result[0]}, ${result[1]}%, ${result[2]}%)`);
			
			// callback(counterPlus);
			// callback(counterPlus);
			
		
		sliceColor()
	};

	forslice = color1;
		sliceColor()
	actColorCalc(color1, arrayHue, arraySatur, arrayLight, counterPlus);


	// actColorCalc()

	function randomInteger(min, max) {
		// случайное число от min до (max+1)
		let rand = min + Math.random() * (max - min);
		return Math.floor(rand);
	}

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
	
	
	//___COUNTER____///
	function counterPlus(a) {

		counter.forEach((item, i)=>{
			item++;
			if (item > a.length-1) {
				item = 0
			};
		});
			console.log('plus')
			return a;
			
		};

	function counterMinus(a) {
		counter.forEach((item, i)=>{
			item--;
			if (item < 0) {
				item = a.length-1 
			};
			console.log('minus');

		});
		
		
		return a;
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