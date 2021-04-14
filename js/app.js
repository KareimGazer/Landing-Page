/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/

const navList = document.querySelector("#navbar__list");
const main = document.querySelector("main");
let sectionsNum = 3;//initially it's three then it's increased with more sections added
//const sections = document.querySelectorAll("section");
let p1 = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Morbi fermentum metus faucibus lectus pharetra dapibus. 
          Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. 
          Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. `;

let p2 =  `Sed convallis sollicitudin mauris ac tincidunt. 
          Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. 
          Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. 
          Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. 
          Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.`;

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

function appendNav(sec){
    const element = document.createElement("LI");
    const link = document.createElement("A");
    link.textContent =  sec.getAttribute("data-nav");
    link.setAttribute("data-dest", sec.getAttribute("id"));
    link.setAttribute("class", "menu__link");
    element.appendChild(link);
    navList.appendChild(element);
}

function buildNav(){
    const sections = document.querySelectorAll("section");
    for(let i=0; i<sections.length; i++){
        appendNav(sections[i]);
    }
}

function scroll(event){
    if(event.target.nodeName == 'A'){
        const sec = document.querySelector("#" + event.target.getAttribute("data-dest"));
        sec.scrollIntoView();
    }
}


function ElementInViewport (el) {

    var rectangle = el.getBoundingClientRect();

    return (
        rectangle.top >= 0 &&
        rectangle.left >= 0 &&
        rectangle.bottom <= (window.innerHeight || document.documentElement.clientHeight) && 
        rectangle.right <= (window.innerWidth || document.documentElement.clientWidth) 
    );
}

function highlight(){
    const sections = document.querySelectorAll("section");
    for(let i=0; i<sections.length; i++){
        const sec = sections[i];
        if(ElementInViewport(sec)){
            sec.classList.add("your-active-class");
        }
        else{
            sec.classList.remove("your-active-class");
        }
    }
}


function createSection(){
    sectionsNum++;
    const sec = document.createElement("SECTION");
    sec.setAttribute("id", "Section" + sectionsNum);
    sec.setAttribute("data-nav", "Section" + sectionsNum);
    sec.setAttribute("class", "section");
    const div = document.createElement("DIV");
    div.classList.add("landing__container");
    sec.appendChild(div);
    const h2 = document.createElement("H2");
    h2.textContent = "Section" + sectionsNum;
    div.appendChild(h2);
    const par1 = document.createElement("P");
    par1.textContent = p1;
    div.appendChild(par1);
    const par2 = document.createElement("P");
    par2.textContent = p2;
    div.appendChild(par2);
    return sec;
}

function addSection(){
    const sec = createSection();
    main.appendChild(sec);
    appendNav(sec);
}

function scrollEnd(){
    const footer = document.querySelector(".page__footer");
    if((window.innerHeight + window.scrollY) >= document.body.offsetHeight && sectionsNum<7){
        addSection();
    }
}


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/


// build the nav
buildNav();

// Add class 'active' to section when near top of viewport
document.addEventListener('scroll', highlight);

// Scroll to anchor ID using scrollTO event
document.addEventListener('click', scroll);
document.addEventListener('scroll', scrollEnd);
/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

// Scroll to section on link click

// Set sections as active