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

function handleGesure(e) {
		var xAbs = Math.abs(clickStartX - clickEndX);
		var yAbs = Math.abs(clickStartY - clickEndY);
		if (xAbs > 10 || yAbs > 10) {
			if (xAbs > yAbs) {
				if (clickEndX <clickStartX) {
					changeColorLeft(e);
					
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



//______ChangeColor_________//





let input = document.querySelector('input')
let color4 = document.querySelector('#color4')

input.addEventListener('change', function(){
	color4.style.setProperty('--footer-color', input.value)
  })
console.log(color4);
