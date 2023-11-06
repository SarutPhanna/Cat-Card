const carousel = document.querySelector('.carousel');
const firstImg = carousel.querySelectorAll('img')[0];
const arrowIcons = document.querySelectorAll('.wrapper i');

let isDragStart = false; 
let prevPageX, prevScrollLeft,positionDiff;
let firstImgWidth = firstImg.clientWidth + 14;

arrowIcons.forEach(icon => {
    icon.addEventListener('click',() => {  
        carousel.scrollLeft += icon.id === 'left' ? -firstImgWidth : firstImgWidth;
    });
});

const autoSlide = () =>{
    if (carousel.scrollLeft === (carousel.scrollWidth - carousel.clientWidth)) return;
    positionDiff = Math.abs(positionDiff);
    let firstImgWidth = firstImg.clientWidth + 14;
    let vaIDifference = firstImgWidth - positionDiff;

    if(carousel.scrollLeft > prevScrollLeft){
        return carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? vaIDifference : -positionDiff;
    }
    carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? vaIDifference : -positionDiff;
};

const dragStart = (e) => {
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    if (!isDragStart) return;
    e.preventDefault();
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    carousel.scrollLeft = prevScrollLeft - positionDiff;
}

const dragStop = () => {
    isDragStart = false;
    autoSlide();
}

carousel.addEventListener('mousedown', dragStart);
carousel.addEventListener('touchstart', dragStart);

carousel.addEventListener('mousemove', dragging);
carousel.addEventListener('touchmove', dragging);


carousel.addEventListener('mouseup', dragStop);
carousel.addEventListener('mouseleave', dragStop);
carousel.addEventListener('touchend', dragStop);