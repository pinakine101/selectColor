"use strict"
/*Plan
1. Сделать выбор цвета по клику на цвете
2. Функция добавить/убрать блока
3. Выпадающее меню для меню
4. Кнопка "canculate color"
5. Сверстать все страницы
6. Добавить функционал поска по сайту
*/

//____Tabs_________//
let tabsBtn = document.querySelectorAll(".tabs__nav-btn");
let intro_1 = document.querySelectorAll(".intro_1")

tabsBtn.forEach(function(item) {
    item.addEventListener("click", function() {
        let currentBtn = item;
        let tabId = currentBtn.getAttribute ("data-tab");
        let currentTab = document.querySelector(tabId);

         if( ! currentBtn.classList.contains('active') )
         {

            tabsBtn.forEach(function(item){
                item.classList.remove('active');
            });

            intro_1.forEach(function(item){
                item.classList.remove('active');
            });

            currentBtn.classList.add('active');
            currentTab.classList.add('active');
         }
    });
});
document.querySelector('.tabs__nav-btn:nth-child(1)').click();
//____Tabs_________//

let color1 = document.querySelectorAll(".color1");

intro_1.forEach(function(item) {
    item.addEventListener("click", function() {
		$('#colorSelector').ColorPicker({
			color: '#0000ff',
			onShow: function (colpkr) {
				$(colpkr).fadeIn(500);
				return false;
			},
			onHide: function (colpkr) {
				$(colpkr).fadeOut(500);
				return false;
			},
			onChange: function (hsb, hex, rgb) {
				$('#colorSelector div').css('backgroundColor', '#' + hex);
			}
		});
 });
});

 	
		//let x = color1;
		// document.body.appendChild(x);
		
		//});

//____Change Color_________//

/*let color1 = document.querySelector(".color1");
let color4 = document.querySelector(".color4");

color1.forEach(function(item) {
	item.addEventListener("click", function(){
		color4.style = item.getAttribute('style');
		
	});	
	});
	function myFunction() {
    let x = document.createElement("INPUT");
    x.setAttribute("type", "color");
    document.body.appendChild(x);
}*/


	
	
/*function changeColor(){
	let x = 260;
	let y = 100;
	let z = 60;

	let a  = x - 140;
	 
	let b = y/2 ;
	let c = z+90 ; if (c >= 100) { c = c - 100};
	
	pan.style.background = `hsl(${x}, ${y}%, ${z}%)`;
	pan1.style.background = `hsl(${a}, ${b}%, ${c}%)`;
	//pan1.style.background = `hsl(" + a + "," + b +" % ," + c +" %)`;
//	`hsla(${hue},${saturation}%,${lightness}%,${alpha})`	
};
changeColor();
console.log(pan1.style.background);

function generateHslaColors (saturation, lightness, alpha, amount) {
	let colors = []
	let huedelta = Math.trunc(360 / amount)
  
	for (let i = 0; i < amount; i++) {
	  let hue = i * huedelta
	  colors.push(`hsla(${hue},${saturation}%,${lightness}%,${alpha})`)
	}
  
	return colors
  }

	/*let x = 256 / 4;
	let y = Math.floor(256 / 2);
	let z = Math.floor(256 / 3);*/
	
/*function change() {
	var x = Math.floor(Math.random() * 256); // range is 0-255
	var y = Math.floor(Math.random() * 256);
	var z = Math.floor(Math.random() * 256);
	var thergb = "rgb(" + x + "," + y + "," + z + ")"; 

	document.body.style.background=thergb;
}
*/