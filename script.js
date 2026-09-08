/* =========================
   WELCOME / PASSWORD
========================= */

function checkPassword() {

    const password =
        document.getElementById("password").value;

    const message =
        document.getElementById("message");


    const correctPassword = "birthday";


    if (password === correctPassword) {

        message.innerHTML =
            "Opening your surprise... ❤️";

        // Start memories music after the user's click
        const memoriesMusic =
            document.getElementById("memoriesMusic");

        if (memoriesMusic) {
            memoriesMusic.currentTime = 0;
            memoriesMusic.play().catch(() => {});
        }


        setTimeout(() => {

            document.querySelector(".welcome").style.opacity = "0";


            setTimeout(() => {

                document.querySelector(".welcome").style.display = "none";


                const wishPage =
                    document.getElementById("wishPage");


                wishPage.classList.add("active");


                startTyping();

            }, 1000);

        }, 700);

    }

    else {

        message.innerHTML =
            "Hmm... that's not it 😏 Try again.";

    }

}


/* =========================
   TYPING EFFECT
========================= */

function startTyping() {

    const text =
        "Today isn't just another day... it's the day someone very special came into this world. And I wanted to make sure your birthday felt a little more special. ❤️";


    const element =
        document.getElementById("typingText");


    let index = 0;


    element.innerHTML = "";


    function type() {

        if (index < text.length) {

            element.innerHTML +=
                text.charAt(index);

            index++;

            setTimeout(type, 35);

        }

    }


    type();

}

/* =========================
   OPEN MEMORIES
========================= */

function openMemories() {

    const wishPage =
        document.getElementById("wishPage");

    const memoriesPage =
        document.getElementById("memoriesPage");

    const memoriesMusic =
        document.getElementById("memoriesMusic");

    if (memoriesMusic) {
        memoriesMusic.play().catch(() => {});
    }

    wishPage.classList.remove("active");

    setTimeout(() => {

        memoriesPage.classList.add("active");

    }, 600);

}

/* =====================================================
   CINEMATIC MEMORIES
===================================================== */

let memoryStarted = false;

let viewedPhotos = new Set();

let activePhoto = null;

const totalPhotos = 10;


/* -----------------------------------------------------
   GIRL CLICK
----------------------------------------------------- */

function girlClicked() {

    if (memoryStarted) {
        return;
    }

    memoryStarted = true;

    const intro =
        document.getElementById("memoryIntro");

    const boxScene =
        document.getElementById("memoryBoxScene");

    intro.classList.add("hide");

    setTimeout(() => {

        boxScene.classList.add("active");

    }, 900);
}


/* -----------------------------------------------------
   OPEN BOX
----------------------------------------------------- */

function openMemoryBox() {

    const box =
        document.getElementById("memoryBox");

    const boxScene =
        document.getElementById("memoryBoxScene");

    const explosion =
        document.getElementById("photoExplosion");


    box.classList.add("opening");

    setTimeout(() => {

        box.classList.add("explode");

    }, 500);


    setTimeout(() => {

        boxScene.classList.remove("active");

        createExplosionPhotos();

        explosion.classList.add("active");

    }, 1100);


    setTimeout(() => {

        highlightFirstPhoto();

    }, 2300);
}


/* -----------------------------------------------------
   CREATE PHOTOS
----------------------------------------------------- */

function createExplosionPhotos() {

    const container =
        document.getElementById("photoExplosion");

    container.innerHTML = "";

    viewedPhotos.clear();


    for (
        let i = 1;
        i <= totalPhotos;
        i++
    ) {

        const card =
            document.createElement("div");

        card.className =
            "explosion-photo";


        const image =
            document.createElement("img");

        image.src =
            `assets/photos/photo.${i}.jpg.jpeg`;

        image.alt =
            `Memory ${i}`;


        card.appendChild(image);


        /*
         * Initial position = center
         */

        card.style.left =
            "50%";

        card.style.top =
            "50%";

        card.style.transform =
            `
            translate(-50%, -50%)
            scale(0.1)
            rotate(${randomRotation()}deg)
            `;


        /*
         * Click
         */

        card.onclick = () => {

            openMemoryPhoto(i, card);

        };


        container.appendChild(card);


        /*
         * Explosion entrance
         */

        setTimeout(() => {

            const position =
                getPhotoPosition(i);

            card.style.left =
                position.left;

            card.style.top =
                position.top;

            card.style.transform =
                `
                translate(-50%, -50%)
                scale(0.65)
                rotate(${position.rotation}deg)
                `;

            card.classList.add("visible");

        }, i * 90);

    }
}


/* -----------------------------------------------------
   RANDOM ROTATION
----------------------------------------------------- */

function randomRotation() {

    return (
        Math.random() * 30 - 15
    ).toFixed(1);
}


/* -----------------------------------------------------
   PHOTO POSITIONS
----------------------------------------------------- */

function getPhotoPosition(index) {

    const positions = [

        {
            left: "18%",
            top: "25%",
            rotation: -12
        },

        {
            left: "35%",
            top: "18%",
            rotation: 8
        },

        {
            left: "52%",
            top: "20%",
            rotation: -6
        },

        {
            left: "70%",
            top: "25%",
            rotation: 12
        },

        {
            left: "82%",
            top: "43%",
            rotation: -9
        },

        {
            left: "68%",
            top: "68%",
            rotation: 7
        },

        {
            left: "48%",
            top: "76%",
            rotation: -11
        },

        {
            left: "29%",
            top: "70%",
            rotation: 10
        },

        {
            left: "15%",
            top: "55%",
            rotation: -7
        },

        {
            left: "50%",
            top: "48%",
            rotation: 5
        }

    ];


    return positions[index - 1];
}


/* -----------------------------------------------------
   FIRST PHOTO
----------------------------------------------------- */

function highlightFirstPhoto() {

    const photos =
        document.querySelectorAll(
            ".explosion-photo"
        );

    if (!photos.length) {
        return;
    }


    photos[0].classList.add(
        "highlight"
    );


    photos[0].style.transform =
        `
        translate(-50%, -50%)
        scale(0.95)
        rotate(0deg)
        `;
}


/* -----------------------------------------------------
   OPEN PHOTO
----------------------------------------------------- */

function openMemoryPhoto(
    number,
    card
) {

    /*
     * Don't allow another photo
     * until current one is finished
     */

    if (viewedPhotos.has(number)) {
        return;
    }


    activePhoto = number;


    const viewer =
        document.getElementById(
            "memoryViewer"
        );

    const viewerPhoto =
        document.getElementById(
            "viewerPhoto"
        );

    const caption =
        document.getElementById(
            "viewerCaption"
        );

    const counter =
        document.getElementById(
            "viewerCounter"
        );


    /*
     * Set image
     */

    viewerPhoto.src =
        `assets/photos/photo.${number}.jpg.jpeg`;


    /*
     * Captions
     */

    const captions = [

        "And it all started with moments like this... ❤️",

        "One of those memories I never want to forget. ❤️",

        "A little moment that became a beautiful memory. ✨",

        "Some pictures say more than words ever could. ❤️",

        "This one still makes me smile. ❤️",

        "Another little piece of our story. ✨",

        "A moment worth keeping forever. ❤️",

        "If memories could be framed, I'd frame this one.",

        "Just a beautiful little moment to remember. ❤️",

        "To many more moments like these. ❤️"

    ];


    caption.innerText =
        captions[number - 1];


    counter.innerText =
        `${String(number).padStart(2, "0")} / 10`;


    /*
     * Show viewer
     */

    viewer.classList.add("active");


    /*
     * Highlight selected card
     */

    document
        .querySelectorAll(
            ".explosion-photo"
        )
        .forEach(photo => {

            photo.classList.remove(
                "highlight"
            );

        });


    card.classList.add(
        "highlight"
    );


    /*
     * After 4.5 seconds:
     *
     * fade viewer
     * mark photo viewed
     * activate next
     */

    setTimeout(() => {

        closeMemoryViewer();

        viewedPhotos.add(number);

        card.classList.remove(
            "highlight"
        );

        card.classList.add(
            "viewed"
        );


        setTimeout(() => {

            activateNextPhoto();

        }, 700);

    }, 4500);
}


/* -----------------------------------------------------
   CLOSE VIEWER
----------------------------------------------------- */

function closeMemoryViewer() {

    const viewer =
        document.getElementById(
            "memoryViewer"
        );

    viewer.classList.remove(
        "active"
    );
}


/* -----------------------------------------------------
   NEXT PHOTO
----------------------------------------------------- */

function activateNextPhoto() {

    /*
     * Find first unviewed photo
     */

    let next =
        null;


    for (
        let i = 1;
        i <= totalPhotos;
        i++
    ) {

        if (
            !viewedPhotos.has(i)
        ) {

            next = i;

            break;
        }
    }


    /*
     * All photos completed
     */

    if (next === null) {

        finishMemories();

        return;
    }


    const photos =
        document.querySelectorAll(
            ".explosion-photo"
        );


    const nextCard =
        photos[next - 1];


    nextCard.classList.add(
        "highlight"
    );


    /*
     * Bring next photo forward
     */

    nextCard.style.zIndex =
        "80";


    nextCard.style.transform =
        `
        translate(-50%, -50%)
        scale(0.95)
        rotate(0deg)
        `;

}


/* -----------------------------------------------------
   FINISH MEMORIES
----------------------------------------------------- */

function finishMemories() {

    const explosion =
        document.getElementById(
            "photoExplosion"
        );

    const finished =
        document.getElementById(
            "memoriesFinished"
        );

    const finishedPhotos =
        document.getElementById(
            "finishedPhotos"
        );


    /*
     * Fade photos away
     */

    explosion.style.opacity =
        "0";


    /*
     * Small photo recap
     */

    finishedPhotos.innerHTML = "";


    for (
        let i = 1;
        i <= totalPhotos;
        i++
    ) {

        const img =
            document.createElement("img");


        img.src =
            `assets/photos/photo.${i}.jpg.jpeg`;


        img.className =
            "finished-mini";


        img.style.setProperty(
            "--rotation",
            `${Math.random() * 16 - 8}deg`
        );


        img.style.animationDelay =
            `${i * 0.08}s`;


        finishedPhotos.appendChild(
            img
        );
    }


    /*
     * Show final screen
     */

    setTimeout(() => {

        finished.classList.add(
            "active"
        );

    }, 1000);
}


/* =========================
   CAKE
========================= */

function openCake() {

    const memoriesPage =
        document.getElementById("memoriesPage");

    const memoriesMusic =
        document.getElementById("memoriesMusic");

    const cakeMusic =
        document.getElementById("cakeMusic");

    if (memoriesMusic) {
        memoriesMusic.pause();
        memoriesMusic.currentTime = 0;
    }

    if (cakeMusic) {
        cakeMusic.currentTime = 0;
        cakeMusic.play().catch(() => {});
    }


    const cakePage =
        document.getElementById("cakePage");


    memoriesPage.classList.remove("active");


    setTimeout(() => {

        cakePage.classList.add("active");

    }, 600);

}


/* =========================
   CANDLE BLOW
========================= */

let blownCandles = 0;


function blowCandle(candle) {

    if (
        candle.classList.contains("blown")
    ) {

        return;

    }


    candle.classList.add("blown");


    blownCandles++;


    if (blownCandles === 5) {

        completeWish();

    }

}


/* =========================
   COMPLETE WISH
========================= */

function completeWish() {

    const instruction =
        document.getElementById("wishInstruction");


    const heading =
        document.getElementById("cakeHeading");


    instruction.innerHTML =
        "Your wish is on its way... ✨❤️";


    heading.innerHTML =
        'Happy Birthday, <span>Beautiful ❤️</span>';


    heading.classList.add("wish-complete");


    createConfetti();

}


/* =========================
   CONFETTI
========================= */

function createConfetti() {

    for (
        let i = 0;
        i < 100;
        i++
    ) {

        const confetti =
            document.createElement("div");


        confetti.classList.add("confetti");


        confetti.style.left =
            Math.random() * 100 + "vw";


        confetti.style.animationDelay =
            Math.random() * 1.5 + "s";


        confetti.style.width =
            (5 + Math.random() * 7) + "px";


        confetti.style.height =
            (8 + Math.random() * 10) + "px";


        document.body.appendChild(confetti);


        setTimeout(() => {

            confetti.remove();

        }, 4500);

    }

}


/* =========================
   FINISH CAKE
========================= */

function finishCake() {

    if (candlesBlown < 5) {
        const instruction = document.getElementById("wishInstruction");
        if (instruction) {
            instruction.innerHTML = "First, make a wish and blow out all 5 candles 🕯️❤️";
        }
        return;
    }

    const cakePage =
        document.getElementById("cakePage");

    if (cakePage) {
        cakePage.classList.add("cake-finished");
    }

    setTimeout(() => {
        openGiftPage();
    }, 900);
}
/* =====================================================
   CINEMATIC CANDLE INTERACTION
===================================================== */

let candlesBlown = 0;


/* -----------------------------------------------------
   BLOW CANDLE
----------------------------------------------------- */

function blowCandle(candle) {

    // Already blown candle ko dobara click na hone do
    if (candle.classList.contains("blown")) {
        return;
    }


    // Candle ko blown state do
    candle.classList.add("blown");


    // Flame ko extinguish karo
    const flame =
        candle.querySelector(".flame");

    if (flame) {

        flame.style.animation =
            "none";

        flame.style.opacity =
            "0";

        flame.style.transform =
            "translateX(-50%) scale(0.2)";

    }


    // Count increase
    candlesBlown++;


    // Sabhi candles blow ho gayi?
    if (candlesBlown >= 5) {

        setTimeout(() => {

            allCandlesBlown();

        }, 700);

    }

}


/* -----------------------------------------------------
   ALL CANDLES BLOWN
----------------------------------------------------- */

function allCandlesBlown() {

    const instruction =
        document.getElementById(
            "wishInstruction"
        );

    const surprise =
        document.getElementById(
            "cakeSurprise"
        );


    // Instruction hide
    if (instruction) {

        instruction.style.opacity =
            "0";

        instruction.style.transform =
            "translateY(10px)";

        setTimeout(() => {

            instruction.style.display =
                "none";

        }, 500);

    }


    // Surprise message show
    if (surprise) {

        surprise.style.display =
            "block";

        surprise.style.animation =
            "cakeSurpriseAppear 1s ease forwards";

    }


    // Cake ko glow do
    const cakeScene =
        document.getElementById(
            "cakeScene"
        );

    if (cakeScene) {

        cakeScene.classList.add(
            "candles-finished"
        );

    }


    // Confetti
    createCakeConfetti();


    // Balloons
    createCakeBalloons();


    // Heading change
    const heading =
        document.getElementById(
            "cakeHeading"
        );

    if (heading) {

        heading.innerHTML =
            `Happy Birthday <span>My Love</span> ❤️`;

    }

}
/* =====================================================
   CAKE CONFETTI
===================================================== */

function createCakeConfetti() {

    const container =
        document.getElementById("confettiContainer");

    if (!container) return;

    container.innerHTML = "";

    const pieces = 80;

    for (let i = 0; i < pieces; i++) {

        const piece =
            document.createElement("span");

        piece.className =
            "cake-confetti";

        piece.style.left =
            Math.random() * 100 + "%";

        piece.style.animationDelay =
            Math.random() * 1.5 + "s";

        piece.style.animationDuration =
            (2.5 + Math.random() * 2) + "s";

        piece.style.transform =
            `rotate(${Math.random() * 360}deg)`;

        container.appendChild(piece);
    }
}


/* =====================================================
   CAKE BALLOONS
===================================================== */

function createCakeBalloons() {

    const container =
        document.getElementById(
            "balloonsContainer"
        );

    if (!container) return;

    container.innerHTML = "";

    const balloonCount = 10;

    for (let i = 0; i < balloonCount; i++) {

        const balloon =
            document.createElement("div");

        balloon.className =
            "cake-balloon";

        balloon.innerHTML = `
            <div class="balloon-body"></div>
            <div class="balloon-string"></div>
        `;

        balloon.style.left =
            (5 + Math.random() * 90) + "%";

        balloon.style.animationDelay =
            (Math.random() * 1.5) + "s";

        balloon.style.animationDuration =
            (5 + Math.random() * 3) + "s";

        container.appendChild(balloon);
    }
}
/* =====================================================
   GIFT BOX INTERACTION
===================================================== */

function openGiftPage() {

    const cakeMusic =
        document.getElementById("cakeMusic");

    if (cakeMusic) {
        cakeMusic.pause();
    }

    const cakePage =
        document.getElementById("cakePage");

    const giftPage =
        document.getElementById("giftPage");

    if (cakePage) {
        cakePage.classList.remove("active");
    }

    setTimeout(() => {

        if (giftPage) {
            giftPage.classList.add("active");
        }

    }, 700);
}


function openGift() {

    const scene =
        document.getElementById("giftBoxScene");

    const surprise =
        document.getElementById("giftSurprise");

    if (!scene || scene.classList.contains("opened")) {
        return;
    }

    scene.classList.add("opened");

    setTimeout(() => {

        if (surprise) {
            surprise.style.display = "block";
        }

    }, 1000);
}

/* =====================================================
   LETTER / FINAL PAGE FLOW
===================================================== */

function openLetter(event) {
    if (event) event.stopPropagation();

    const giftPage = document.getElementById("giftPage");
    const letterPage = document.getElementById("letterPage");

    if (giftPage) giftPage.classList.remove("active");

    setTimeout(() => {
        if (letterPage) {
            letterPage.classList.add("active");
        }
    }, 700);
}

function openEnvelope() {
    const scene = document.getElementById("envelopeScene");
    const finished = document.getElementById("letterFinished");

    if (!scene || scene.classList.contains("opened")) return;

    scene.classList.add("opened");

    setTimeout(() => {
        if (finished) {
            finished.style.display = "block";
        }
    }, 1200);
}

function openFinalEnding() {
    const cakeMusic =
        document.getElementById("cakeMusic");

    if (cakeMusic) {
        cakeMusic.pause();
    }

    const letterPage = document.getElementById("letterPage");
    const finalPage = document.getElementById("finalPage");

    if (letterPage) letterPage.classList.remove("active");

    setTimeout(() => {
        if (finalPage) {
            finalPage.classList.add("active");
        }
        createFinalStars();
        createFinalHearts();
    }, 900);
}

function createFinalStars() {
    const container = document.getElementById("finalStars");
    if (!container) return;

    container.querySelectorAll(".final-star").forEach(star => star.remove());

    for (let i = 0; i < 35; i++) {
        const star = document.createElement("span");
        star.className = "final-star";
        star.style.left = (Math.random() * 100) + "%";
        star.style.top = (Math.random() * 100) + "%";
        star.style.animationDelay = (Math.random() * 3) + "s";
        star.style.animationDuration = (2 + Math.random() * 3) + "s";
        container.appendChild(star);
    }
}

function createFinalHearts() {
    for (let i = 0; i < 12; i++) {
        setTimeout(() => {
            const heart = document.createElement("div");
            heart.className = "final-heart";
            heart.textContent = Math.random() > .5 ? "❤️" : "♡";
            heart.style.left = (5 + Math.random() * 90) + "vw";
            heart.style.animationDelay = (Math.random() * 1.5) + "s";
            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), 6500);
        }, i * 220);
    }
}

function replaySurprise() {
    window.location.reload();
}
