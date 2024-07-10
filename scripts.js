document.addEventListener("DOMContentLoaded", () => {
    // Smooth scrolling for links within the SAME page
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    window.addEventListener('scroll', () => {
        scrollCount++;
        if (!surpriseTriggered && scrollCount >= surpriseThreshold) {
            triggerSurprise();
            showRandomLoveNote();
        } else {
            // Show a new love note on each scroll until the surprise is triggered
            showRandomLoveNote();
        }
    });

    // Carousel functionality (Only on the gallery page)
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) { // Check if carousel exists on this page
        const carouselItems = document.querySelectorAll('.carousel-item');
        const totalItems = carouselItems.length;
        let currentIndex = 0;

        document.querySelector('.carousel-button.next').addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % totalItems;
            updateCarousel();
        });

        document.querySelector('.carousel-button.prev').addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + totalItems) % totalItems;
            updateCarousel();
        });

        function updateCarousel() {
            const offset = -currentIndex * 100;
            carouselContainer.style.transform = `translateX(${offset}%)`;
        }
    }

    let surpriseTriggered = false;
    const surpriseThreshold = 18;
    let scrollCount = 0;
    let currentLoveNoteIndex = 3; // Start by showing 3 notes

    const loveNotesContainer = document.querySelector('.love-notes-container');
    const loveNotesTitle = document.querySelector('#love-notes h2');
    const loveNotes = [
        "You're my everything.",
        "I cherish every moment with you.",
        "You make my heart skip a beat.",
        "You light up my world.",
        "Your smile is my sunshine.",
        "I love the way you make me laugh.",
        "You're my best friend and soulmate.",
        "You're the reason I believe in love.",
        "You're my dream come true.",
        "I can't wait to spend forever with you.",
        "I'll love you always and forever.",
        "You're my favorite adventure.",
        "Your happiness is my happiness.",
        "I love you more than pizza.",
        "You complete me.",
        "You're the missing piece to my puzzle.",
        "I can't imagine my life without you.",
        "I love you to the moon and back.",
        "You're the best thing that's ever happened to me.",
        "I fall in love with you more every day."
    ];

    if (loveNotesContainer) { 
        // Display the initial three love notes
        for (let i = 0; i < 3; i++) {
            const noteElement = document.createElement('div');
            noteElement.classList.add('love-note');
            noteElement.textContent = loveNotes[i];
            loveNotesContainer.appendChild(noteElement);
        }

        // Add click event listener to the Love Notes title
        loveNotesTitle.addEventListener('click', showNextLoveNote); 
    }

    function showNextLoveNote() {
        if (currentLoveNoteIndex < loveNotes.length) {
            // Remove the first love note
            loveNotesContainer.removeChild(loveNotesContainer.firstChild);

            // Add the next love note
            const noteElement = document.createElement('div');
            noteElement.classList.add('love-note');
            noteElement.textContent = loveNotes[currentLoveNoteIndex];
            loveNotesContainer.appendChild(noteElement);
            currentLoveNoteIndex++;

            // Trigger surprise if all notes have been shown
            if (currentLoveNoteIndex === loveNotes.length) {
                triggerSurprise();
            }
        }
    }
    window.addEventListener('scroll', () => {
        scrollCount++;

        if (scrollCount >= surpriseThreshold && !surpriseTriggered) {
            triggerSurprise();
        }
    });


    // Function to trigger the surprise
    function triggerSurprise() {
        surpriseTriggered = true;
        const mainElement = document.querySelector('main');
        

        // Confetti Explosion
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });


        // Optional: Play a surprise sound effect
        // const audio = new Audio('surprise-sound.mp3'); 
        // audio.play();

        // Optional: Romantic Background Music
        // You could start playing a romantic song here.
    }

});