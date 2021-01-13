"use strict"

const tabsBtn = document.querySelectorAll(".tabs__nav-btn");
const tabsItems = document.querySelectorAll(".intro_1")



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

            tabsItems.forEach(function(item){
                item.classList.remove('active');
            });

            currentBtn.classList.add('active');
            currentTab.classList.add('active');
         }
    });
});
document.querySelector('.tabs__nav-btn:nth-child(3)').click();



/*function change() {
	var x = Math.floor(Math.random() * 256); // range is 0-255
	var y = Math.floor(Math.random() * 256);
	var z = Math.floor(Math.random() * 256);
	var thergb = "rgb(" + x + "," + y + "," + z + ")"; 

	document.body.style.background=thergb;
}

// JavaScript Document*/