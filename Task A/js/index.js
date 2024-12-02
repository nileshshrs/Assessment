const cards = document.querySelectorAll('.card');
const totalCards = cards.length;
let currentIndex = 0;

function updateCarousel() {
  cards.forEach((card, index) => {
    // Calculate the relative position
    const position = (index - currentIndex + totalCards) % totalCards;

    const offsetY = 100;  
    const depth = 100;   

    if (position === 0) {
      // Center card
      card.style.transform = `translate3d(0px, 0px, 0px)`;
      card.style.opacity = '1';
      card.style.boxShadow = '0 20px 50px rgba(0, 34, 45, 0.5)';
    } else if (position === 1) {
      // Card above the center
      card.style.transform = `translate3d(10px, -${offsetY}px, -${depth}px)`;
      card.style.opacity = '0.6';
      card.style.boxShadow = 'none';
    } else if (position === 2) {
      // Card below the center
      card.style.transform = `translate3d(10px, ${offsetY}px, -${depth}px)`;
      card.style.opacity = '0.3';
      card.style.boxShadow = 'none';
    } else {
      // Other cards
      card.style.transform = `translate3d(10px, 0px, -${depth}px)`;
      card.style.opacity = '0.1';
      card.style.boxShadow = 'none';
    }
  });
}

function startCarousel() {
  setInterval(() => {
    currentIndex = (currentIndex + 1) % totalCards; 
    updateCarousel();
  }, 2000); 
}

updateCarousel();
startCarousel();
