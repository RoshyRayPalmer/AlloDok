const NavBar = document.querySelector('.nav-bar') // navBar
const ToggleBtn = document.querySelector('.toggle-nav')
const closeNav = document.querySelector('.close-nav')
const links = document.querySelector('.links')


ToggleBtn.addEventListener('click',()=>{
    links.classList.toggle('links-show')
})
closeNav.addEventListener('click', ()=>{
    links.classList.remove('links-show')
})
function fadingScroll(){
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300 ) {
        NavBar.classList.add('navbar-fading');
    }else{
        NavBar.classList.remove('navbar-fading');

    }
}
//**** Slider İmages */
let compteur = 0;
let timer, slideContent, slides, slideWidth, speed, transition;

//***** QUestion & Answer Variable */
const questions = document.querySelectorAll('.questions')
const answer = document.querySelectorAll('.answer')
var ListQ = [], index

// Cover Fading variables
let PicsCover =[];
const coverİmg = document.querySelectorAll('.cover-images img')
let firsİndex = 0;

//navbar scroll fading
window.onscroll = function (){fadingScroll();}



// Fading image cover
function coverFading(){
    for (let i = 0; i < coverİmg.length; i++) {
        coverİmg[i].style.display ='none';        
    }
    firsİndex++
    if(firsİndex > coverİmg.length){
        firsİndex = 1;
    }
    coverİmg[firsİndex - 1].style.display = 'block';
}
setInterval(coverFading,3000);

// Slider İmages


// recuperation diaporama
const diapo = document.querySelector('.carousel-slides');

// recuperation data speed
speed = diapo.dataset.speed;
transition = diapo.dataset.transition;

slideContent = document.querySelector('.carousel-content'); // elem.

/*clonage de la premiere image pour pouvoire
l'injecter dans la deniere element du diaporama
*/
let firstİmage = slideContent.firstElementChild.cloneNode(true);

// injection limage dans le tableau.
slideContent.appendChild(firstİmage);

slides = Array.from(slideContent.children);// tableau des slides 

//recuperation largeur d'une slide
slideWidth = diapo.getBoundingClientRect().width;
//recuperation les fleches.
let next = document.querySelector('#arrow-right');
let prev = document.querySelector('#arrow-left');

// ajouter evenements directionel.
next.addEventListener('click', slideNext);
prev.addEventListener('click', slideprev);

/*
fonction qui permet de defiler l'image vers la droite
*/
function slideNext(){
    compteur++; // incrementation des conpteur 
    slideContent.style.transition = '1s linear';
    let decal = -slideWidth * compteur;
    slideContent.style.transform =`translateX(${decal}px)`;

    //attend la fin de la transition et on rebobine de façon cachée
    setTimeout(function(){
        if (compteur >= slides.length - 1) {
            compteur = 0;
            slideContent.style.transition ='unset';
            slideContent.style.transform ='translateX(0)'; 

        }
    },1000)

}
// automatisation de defilment
timer = setInterval(slideNext, 5000);
/*
fonction qui permet de defiler l'image vers la gauche
*/
function slideprev (){
    compteur--;
    slideContent.style.transition = '1s linear';
    
    if (compteur < 0) {
        compteur = slides.length - 1;
        let decal = -slideWidth * compteur;
        slideContent.style.transition = 'unset';
        slideContent.style.transform =`translateX(${decal}px)`;
       setTimeout(slideprev, 1)
    }

    let decal = -slideWidth * compteur;
    slideContent.style.transform =`translateX(${decal}px)`;
}

//** Questions Answer show */

    // recupation d'elements html pour creer un tableau
    for (let q = 0; q < questions.length; q++) {
        ListQ.push(questions[q].innerHTML) 
        //  console.log(answer);

        
        //***** get element index cliques.
        for (let i = 0; i < questions.length; i++) {
            questions[i].addEventListener('click', function(e){
                index = ListQ.indexOf(this.innerHTML) 
                // add index for table index
                // Show the answer 
                for(let i = 0; i < answer.length; i++){
                if (answer[i].getAttribute('data-clic') - 1 === index) {
                    answer[i].classList.toggle('show_answer')
                    questions[i].classList.toggle('question_bg')

                }
             }
            }) 
        }
    }



