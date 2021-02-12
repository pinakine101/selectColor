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

//____Tabs_________//

let tabsBtn = document.querySelectorAll(".tabs__nav-btn");
let intro_1 = document.querySelectorAll(".intro_1")

// $('.intro').each(function() {
// 	let ths = $(this);
// 	ths.find('.intro_1').not(':first').hide();
// 	ths.find('.tabs__nav-btn').click(function() {
// 		ths.find('.tabs__nav-btn').removeClass('active').eq($(this).index()).addClass('active');
// 		ths.find('.intro_1').hide().eq($(this).index()).fadeIn()
// 	}).eq(0).addClass('active');
// });

tabsBtn.forEach(function (item) {
	item.addEventListener("click", function activeTab() {
		let currentBtn = item;
		let tabId = currentBtn.getAttribute("data-tab");
		let currentTab = document.querySelector(tabId);
		let colors = document.querySelectorAll('.color');

		// colors.forEach(function(item){
		// 	item.classList.remove('active');
		// });

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

			return currentBtn;
		}
	});
});


document.querySelector('.tabs__nav-btn:nth-child(1)').click();

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

	function rgb2hex(rgb) {
		rgb = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+))?\)$/);

		function hex(x) {
			return ("0" + parseInt(x).toString(16)).slice(-2);
		}
		return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
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
	// console.log(rgb2hex(spanColor));
}


colors.forEach(function (color) {
	color.addEventListener("click", function () {
		let colorAct = color;

		if (!color.classList.contains("active")) {
			colors.forEach(function (color) {
				color.classList.remove('active');
			});
		};
		colorAct.classList.add('active');

		// console.log(colorAct);
		return colorAct;
	});
	color.addEventListener("mouseout", function () {
		colors.forEach(function (color) {
			color.classList.remove('active');
		});
	});
});

let clickStartX = 0;
let clickStartY = 0;
let clickEndX = 0;
let clickEndY = 0;

let gesuredZone = document.querySelectorAll('.color');



colors.forEach(function(color) { 

	color.addEventListener('mousedown', function(event) {
		clickStartX = event.pageX;
		clickStartY = event.pageY;
		console.log(event)
	}, false);

	color.addEventListener('mouseup', function(event) {
		clickEndX = event.pageX;
		clickEndY = event.pageY;
		handleGesure();
		console.log(event)
	}, false); 

	function handleGesure() {
		let swiped = 'swiped:';
		if (clickEndX < clickStartX   &&  clickEndY - clickStartY < 150 ) {
			console.log(swiped + 'left!')
		}
		if (clickEndX > clickStartX  &&  clickEndY - clickStartY < 150) {
			console.log(swiped + 'right!');}
		
		if (clickEndY > clickStartY && clickEndX - clickStartX < 150) {
			console.log(swiped + 'down!')
		}
		if (clickEndY < clickStartY && clickStartX - clickEndX < 150) { 
			console.log(swiped + 'up!');
		}
		// if (touchendY == touchstartY) {
		// 	alert('tap!');
		// }
	}
});

var initialPoint;
var finalPoint;
colors.forEach(function (color) {
	color.addEventListener('touchstart', function (event) {
		event.preventDefault();
		event.stopPropagation();
		initialPoint = event.changedTouches[0];
	}, false);

	color.addEventListener('touchend', function (event) {
		event.preventDefault();
		event.stopPropagation();
		finalPoint = event.changedTouches[0];
		var xAbs = Math.abs(initialPoint.pageX - finalPoint.pageX);
		var yAbs = Math.abs(initialPoint.pageY - finalPoint.pageY);
		if (xAbs > 10 || yAbs > 10) {
			if (xAbs > yAbs) {
				if (finalPoint.pageX < initialPoint.pageX) {
					console.log('left!');
				} else {
					console.log('right!');/*СВАЙП ВПРАВО*/
				}
			} else {
				if (finalPoint.pageY < initialPoint.pageY) {
					console.log('up!');
				} else {
					console.log('down!');
				}
			}
		}
	}, false);
});





