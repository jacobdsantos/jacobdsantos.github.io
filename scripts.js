
document.addEventListener("DOMContentLoaded", () => {
    // SMOOTH SCROLLING FOR LINKS WITHIN THE SAME PAGE
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // TOGGLE MEDIA CONTENT (e.g., images, videos)
    const momentContents = document.querySelectorAll('.moment-content');
    momentContents.forEach(momentContent => {
        momentContent.addEventListener('click', function () {
            toggleMedia(this);
        });
    });
    function toggleMedia(clickedElement) {
        const mediaContainer = clickedElement.nextElementSibling;
        if (mediaContainer.style.display === 'none' || mediaContainer.style.display === '') {
            mediaContainer.style.display = 'block';
        } else {
            mediaContainer.style.display = 'none';
        }
    }

    // RESPONSIVE H1 FONT SIZE
    const h1Element = document.querySelector('h1');
    function adjustH1FontSize() {
        const windowWidth = window.innerWidth;
        let fontSize = Math.min(windowWidth * 0.5, 150); // Adjust the factor as needed
        h1Element.style.fontSize = fontSize + 'px';
    }
    adjustH1FontSize(); // Initial adjustment
    window.addEventListener('resize', adjustH1FontSize); // Adjust on window resize

    // CAROUSEL FUNCTIONALITY (Gallery Page Only)
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) { 
        const carouselItems = document.querySelectorAll('.carousel-item');
        const totalItems = carouselItems.length;
        let currentIndex = 0;

        function updateCarousel() {
            const offset = -currentIndex * 100;
            carouselContainer.style.transform = `translateX(${offset}%)`;
        }

        document.querySelector('.carousel-button.next').addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % totalItems;
            updateCarousel();
        });

        document.querySelector('.carousel-button.prev').addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + totalItems) % totalItems;
            updateCarousel();
        });
    }

    // LOVE NOTES & SURPRISE
    let surpriseTriggered = false;
    const surpriseThreshold = 5; 
    let scrollCount = 0;
    let currentLoveNoteIndex = 10; 
    
    const loveNotesContainer = document.querySelector('.love-notes-container');
    const loveNotes = [
        "You're my everything.",
        "I cherish every moment with you.",
        "You make my heart skip a beat.",
        "Mahal na mahal kita",
        "I am always here to support you",
        "You can do it. Trust in the Lord",
        "Don't worry about anything. Pray and pray",
        "I always miss you every time.",
        "I am excited to show this to you.",
        "I want to be with you forever",
        "Let's get married soon.",
        "Have a peace of mind. I won't hurt you again.",
        "I want you to be the happiest girl in the world",
        "I appreciate you.",
        "Thank you for everything.",
        "Thank you for your love.",
        "Thank you for the memories and let's create more.",
        "Always remember that I'm proud of you.",
        "We can overcome this.",
        "I love you so much!",
        "I love you very very much!",
        "I love you always!",
        "I love you so much it hurts",
        "I love you baby. My baby girl.",
        "My original and one and only baby.",
        "All my love goes to you.",
        "You light up my world.",
        "Your smile is my sunshine.",
        "I love the way you make me laugh.",
        "You're my best friend and soulmate.",
        "You're my dream come true.",
        "I can't wait to spend forever with you.",
        "I'll love you always and forever.",
        "You're my favorite adventure.",
        "Your happiness is my happiness.",
        "You complete me.",
        "I can't imagine my life without you.",
        "I love you to the moon and back.",
        "You're the best thing that's ever happened to me.",
        "I fall in love with you more every day."
    ]; 

    function showNextLoveNote() {
        if (currentLoveNoteIndex < loveNotes.length) {
            if (loveNotesContainer.children.length >= 3) {
                loveNotesContainer.removeChild(loveNotesContainer.firstChild);
            }

            const noteElement = document.createElement('div');
            noteElement.classList.add('love-note');
            noteElement.textContent = loveNotes[currentLoveNoteIndex];
            loveNotesContainer.appendChild(noteElement);

            const containerRect = loveNotesContainer.getBoundingClientRect();
            const noteRect = noteElement.getBoundingClientRect();
            const maxX = containerRect.width - noteRect.width;
            const maxY = containerRect.height - noteRect.height;
            const randomX = Math.random() * maxX;
            const randomY = Math.random() * maxY;
            noteElement.style.left = randomX + 'px';
            noteElement.style.top = randomY + 'px';
            noteElement.style.opacity = 1; 

            currentLoveNoteIndex++;
        } else {
            triggerSurprise(); 
        }
    }

    if (loveNotesContainer) {
        setInterval(showNextLoveNote, 3000); 
        
    }
  

    window.addEventListener('scroll', () => {
        scrollCount++;
        if (scrollCount >= surpriseThreshold && !surpriseTriggered) {
            triggerSurprise();
        }
    });
    
    function triggerSurprise() {
        surpriseTriggered = true;
        const mainElement = document.querySelector('main');

        // Confetti Explosion
        confetti({
            particleCount: 5000,
            angle: 180,
            spread: 1000,
            startVelocity: 60,
            origin: { y: 0, x: 0.5 },
            colors: ['#f2c0cb', '#d87093', '#ffffff', '#ff7f7f'], // Light Pink, Dark Pink, White, Light Red
            scalar: 0.8,                     // Adjust the size
            disableForReducedMotion: true
          });

    }
    
    const audio = document.getElementById('background-music');
    const playButton = document.createElement('button'); // Create button element dynamically
    playButton.id = 'play-button';                       
    playButton.setAttribute('aria-label', 'Play Music'); // Add aria label for accessibility
    playButton.innerHTML = '<i class="fas fa-play"></i>';// Add play icon using Font Awesome
    document.querySelector('.hero-content').appendChild(playButton); // Append to hero-content

    let isPlaying = false;

    // Play/Pause on Button Click
    playButton.addEventListener('click', () => {
        if (isPlaying) {
            fadeInOut(audio, 'out', 0.5);
            playButton.innerHTML = '<i class="fas fa-play"></i>';  // Switch to play icon
        } else {
            audio.play().then(() => {
                fadeInOut(audio, 'in', 0.5);
            });
            playButton.innerHTML = '<i class="fas fa-pause"></i>'; // Switch to pause icon
        }
        isPlaying = !isPlaying;
    });

    function fadeInOut(audio, direction, duration) {
        const interval = 10; // milliseconds
        let vol = direction === 'in' ? 0 : audio.volume;
        const targetVol = direction === 'in' ? 0.5 : 0; // Adjust the final volume if needed
        const delta = targetVol - vol;
        const steps = duration / interval;

        const fade = setInterval(() => {
            vol += delta / steps;
            audio.volume = vol;

            if ((direction === 'in' && vol >= targetVol) || (direction === 'out' && vol <= targetVol)) {
                clearInterval(fade);
                if (direction === 'out') {
                    audio.pause();
                }
            }
        }, interval);
    }


    // TYPEWRITER EFFECT
    const typewriterText = document.getElementById('typewriter-text');
    if (typewriterText) {
        const sentences = [
          "A love letter dedicated to - Clarize Ann V. Villa.",
          
          "Hi baby, I am well-aware that 'love letters are supposed to be written', but I want you to be the most special woman today, because you're so beautiful. I really want to see your smile all the time, and that's why I'm writing this digital 'love letter' for you. Ang tagal ko nag-isip, kung anong gagawin ko for your birthday, and how can I make you happy. This is what I thought of doing. Matagal na tayong magkasama, and alam ko na minsan, nakakaramdam ka rin ng hirap. Kahit sa pag pili lang kung saan tayo kakain, saan tayo pupunta, or anong gagawin natin, nahihirapan na tayo hahaha. Ganun talaga siguro no kapag matagal nang magkasama? 11 years ba naman na tayo. Sa totoo lang, hindi ko alam kung ano pa yung pwede kong i-regalo sa'yo. Dahil may occasion man o wala, binibilhan natin yung isa't isa ng kung ano ano. This time, gusto ko naman bigyan ka ng something a little bit special haha. Sana mapasaya kita kahit sa simpleng paraan lang, at ito din pala yung unang pag-gagamitan mo ng regalo ko hahaha. Siguro nung binili natin yan, iniisip mo pinilit ko lang bilhin, para lang may maibigay akong regalo sa'yo. Tapos nakasimangot ka ayaw mo tanggapin, hindi mo alam planado na pala 'yan, hahaha. Kaya mag-smile ka na baby, okay? Tapos tumingin ka sa'kin. I love you! I know very well na deserve mo yan. Don't worry about anything, I got this haha.",
          
          "These past months, I know it's been so hard for the both of us. I won't dwell anymore on what happened recently, and I want to continue ahead sa future natin. I am still very sorry for what I did, and I am also very thankful because you love me so much. I am always grateful for you; for your support, for your care, and for all your love. I want us to start prioritizing what's really important in life, and that is to serve the Lord. Let's continue growing and become the best version of ourselves. Mas magiging mahirap, mas magiging challenging, pero I know as long as we have each other, we can overcome it by God's grace. Don't stop in pursuing your dreams, and just continue doing what you love to do. I will always be here to support you and encourage you. I will always pray for you. As for me, I will focus on becoming a better partner for you, and to be capable enough to give you a good life. Don't trust me, trust in the Lord with all your heart and acknowledge Him in all your ways, and He will make your paths straight.",

          "This will be the last line of my long and mema-love letter haha. I just want to say that even though madalas tayong mag-away at nasasaktan na'tin yung isa't isa. Always remember na I love you so much. I'm not good at expressing my feelings, I'm not good at sharing to others, pero I know na mahal na mahal kita, at importante ka sa buhay ko. Hindi 'man kita madalas mai-post tulad ng iba, o hindi man ako active sa mga social media, pero I want you to know na I am proud of you, and I am not ashamed of anyone. I am just contented on what I have, and all I have is you. I sincerely appreciate you, and again, I am thankful for you and for having you in my life. I appreciate everything you do for me, all of your efforts, and all of your sacrifices. You are beautiful, you are wonderful and you are enough. Never think less of yourself, because you are more than what you think. We will have our own time, and we already have peace and you add joy to my life. I will do my utmost best, to give you peace of mind and to relieve you from all of your worries. Kahit hindi na natin alam yung mga pwedeng gawin, let's explore and create more memories that we can treasure forever. To more adventures, camping, hiking, roadtrips, beach, bonding, foodtrips, games, out-of-town, out-of-the-country (soon), activities, and to years of laughter, tears, and endless memories. I will always love you and will continue to love you more in each passing day. Happy birthday baby! Happy anniversary! ❤️",

          "Forever yours, Jacob D. Santos."

        ]; 

        let sentenceIndex = 0;
        let charIndex = 0;
        const typingSpeed = 50;
        const punctuationPause1 = 300;
        const punctuationPause2 = 600;
    
        function type() {
            if (sentenceIndex < sentences.length) {
                if (charIndex < sentences[sentenceIndex].length) {
                    const currentChar = sentences[sentenceIndex].charAt(charIndex);
                    typewriterText.textContent += currentChar;
                    charIndex++;
    
                    if (currentChar === ",") {
                        setTimeout(type, punctuationPause1);
                    } else if (currentChar === "." || currentChar === "?" || currentChar === "!") {
                        setTimeout(type, punctuationPause2);
                    } else {
                        setTimeout(type, typingSpeed);
                    }
                } else {
                    typewriterText.textContent += "\n\n"; 
                    sentenceIndex++;
                    charIndex = 0;
                    setTimeout(type, typingSpeed);
                }
            } else {
                triggerSurprise();
            }
        }
        type(); 
    }
    });
