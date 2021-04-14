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

//pragraphs building blocks
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

/**
 * no return value
 *
 *@param {element} sec : the section element
 * Takes a section as a parameter and creates a list entry for it with
 * a link in the navigation bar
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


/**
 * NO return Value
 *creates the list entry for every section in the page using
 * appendNav helper function
 */

function buildNav(){
    const sections = document.querySelectorAll("section");
    for(let i=0; i<sections.length; i++){
        appendNav(sections[i]);
    }
}

/**
 * no return value
 *
 *@param {event} event : the event object
 * takes the event object as a parameter and checks if a link is clicked to
 * scroll to the desired section
 */

function scroll(event){
    if(event.target.nodeName == 'A'){
        const sec = document.querySelector("#" + event.target.getAttribute("data-dest"));
        sec.scrollIntoView({"behavior": "smooth"});
    }
}

/**
 * no return value
 *
 *@param {element} el : element
 * Takes an element as a parameter and checks if it's in viewport - seen by the page viewer
 */

function ElementInViewport (el) {

    var rectangle = el.getBoundingClientRect();

    return (
        rectangle.top >= 0 &&
        rectangle.left >= 0 &&
        rectangle.bottom <= (window.innerHeight || document.documentElement.clientHeight) && 
        rectangle.right <= (window.innerWidth || document.documentElement.clientWidth) 
    );
}

/**
 * no return value
 *
 * checks the sections to see if there is a section in viewport and hence
 * applies the appropriate css to that section
 */

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

/**
 * returns element sec
 *
 * creates a new section element and assigns the appropriate attributes
 */

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

/**
 * no return value
 *
 * adds four new sections to the page
 */

function addSections(){
    for(let i=0; i<4; i++){
        const sec = createSection();
        main.appendChild(sec);
    }
}


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/
addSections();

// build the nav
buildNav();

// Add class 'active' to section when near top of viewport
document.addEventListener('scroll', highlight);

// Scroll to anchor ID using scrollTO event
document.addEventListener('click', scroll);
/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

// Scroll to section on link click

// Set sections as active