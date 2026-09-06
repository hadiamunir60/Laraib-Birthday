document.addEventListener("DOMContentLoaded", () => {
let birthdayTimers = [];
    // =========================================================
    // ELEMENTS
    // =========================================================

    const username = document.getElementById("username");
    const password = document.getElementById("password");

    const loginButton = document.getElementById("loginButton");
    const loginError = document.getElementById("loginError");
    const passwordEye = document.getElementById("passwordEye");
    const successMessage = document.getElementById("successMessage");

    const loginScreen = document.querySelector(".login-screen");
    const loginContainer = document.querySelector(".login-container");

    const screen2 = document.getElementById("screen2");
    const screen3 = document.getElementById("screen3");
    const screen4 = document.getElementById("screen4");
    const screen5 = document.getElementById("screen5");
    const screen6 = document.getElementById("screen6");
    const screen7 = document.getElementById("screen7");
    const screen8 = document.getElementById("screen8");


    // =========================================================
    // SCREEN 8 ELEMENTS
    // =========================================================

    const screen8Replay =
        document.getElementById("screen8Replay");

    const screen8Finish =
        document.getElementById("screen8Finish");

    const screen8End =
        document.getElementById("screen8End");

    const finalEndMessage =
        document.getElementById("finalEndMessage");
    // =========================================================
// SCREEN 9 ELEMENT
// =========================================================

const screen9 =
    document.getElementById("screen9");

let screen9Timer = null;

// =========================================================
// MUSIC SYSTEM — SCREEN WISE
// =========================================================

const birthdayMusic = document.getElementById("birthdayMusic");

const musicFiles = {
    romantic: "/static/music/romantic.mp3",
    sad: "/static/music/sad.mp3",
    birthday: "/static/music/Happy Birthday.mp3"
};

let currentMusic = null;
let musicFadeTimer = null;


// ---------------------------------------------------------
// FADE MUSIC
// ---------------------------------------------------------

function fadeMusic(targetVolume, duration = 700) {

    if (!birthdayMusic) return;

    clearInterval(musicFadeTimer);

    const startVolume = birthdayMusic.volume;
    const difference = targetVolume - startVolume;

    const steps = 20;
    let step = 0;

    musicFadeTimer = setInterval(() => {

        step++;

        birthdayMusic.volume =
            Math.max(
                0,
                Math.min(
                    1,
                    startVolume + difference * (step / steps)
                )
            );

        if (step >= steps) {
            clearInterval(musicFadeTimer);
        }

    }, duration / steps);
}


// ---------------------------------------------------------
// PLAY MUSIC
// ---------------------------------------------------------

function playMusic(type) {

    if (!birthdayMusic) return;

    const file = musicFiles[type];

    if (!file) return;

    // Same music already playing
    if (
        currentMusic === type &&
        !birthdayMusic.paused
    ) {
        return;
    }

    clearInterval(musicFadeTimer);

    // Agar koi music already chal raha hai
    if (!birthdayMusic.paused) {

        fadeMusic(0, 500);

        setTimeout(() => {

            birthdayMusic.pause();

            startNewMusic(type);

        }, 520);

    } else {

        startNewMusic(type);

    }

}


// ---------------------------------------------------------
// START NEW MUSIC
// ---------------------------------------------------------

function startNewMusic(type) {

    if (!birthdayMusic) return;

    currentMusic = type;

    birthdayMusic.src = musicFiles[type];

    birthdayMusic.loop = true;

    birthdayMusic.volume = 0;

    birthdayMusic.load();

    const playPromise = birthdayMusic.play();

    if (playPromise !== undefined) {

        playPromise
            .then(() => {

                fadeMusic(0.35, 800);

            })
            .catch(() => {

                console.log(
                    "Music waiting for user interaction."
                );

            });

    }

}

// ---------------------------------------------------------
// RESUME MUSIC AFTER USER INTERACTION
// ---------------------------------------------------------

document.addEventListener("click", () => {

    if (
        birthdayMusic &&
        birthdayMusic.paused &&
        currentMusic
    ) {
        birthdayMusic.play()
            .then(() => {
                fadeMusic(0.35, 800);
            })
            .catch(() => {});
    }

});

// ---------------------------------------------------------
// STOP MUSIC
// ---------------------------------------------------------

function stopMusic() {

    if (!birthdayMusic) return;

    clearInterval(musicFadeTimer);

    fadeMusic(0, 400);

    setTimeout(() => {

        birthdayMusic.pause();

        birthdayMusic.currentTime = 0;

        currentMusic = null;

    }, 450);

}


    // =========================================================
    // SCREEN NAVIGATION
    // =========================================================

    const screens = [
        loginScreen,
        screen2,
        screen3,
        screen4,
        screen5,
        screen6,
        screen7,
        screen8
    ];


    function hideAllScreens() {

        screens.forEach(screen => {

            if (!screen) return;

            screen.classList.remove("active");
            screen.style.display = "none";

        });

    }


    // =========================================================
    // ROSE PETALS
    // =========================================================

    function createRosePetals() {

        if (!screen8) return;

        // Purane petals remove
        const oldPetals =
            screen8.querySelector(".rose-petals");

        if (oldPetals) {
            oldPetals.remove();
        }


        // Petals container
        const petalsContainer =
            document.createElement("div");

        petalsContainer.className = "rose-petals";


        // 35 falling petals
        for (let i = 0; i < 35; i++) {

            const petal =
                document.createElement("span");

            petal.className = "rose-petal";

            // Random horizontal position
            petal.style.left =
                Math.random() * 100 + "%";

            // Random delay
            petal.style.animationDelay =
                Math.random() * 6 + "s";

            // Random speed
            petal.style.animationDuration =
                6 + Math.random() * 6 + "s";

            // Random size
            const size =
                10 + Math.random() * 12;

            petal.style.width =
                size + "px";

            petal.style.height =
                (size * 0.75) + "px";

            // Random rotation
            petal.style.transform =
                `rotate(${Math.random() * 360}deg)`;

            petalsContainer.appendChild(petal);

        }


        // Background mein add
        screen8.insertBefore(
            petalsContainer,
            screen8.firstChild
        );

    }


   function showScreen(targetScreen) {

    if (!targetScreen) return;

    hideAllScreens();

    targetScreen.style.display = "flex";

    setTimeout(() => {

        targetScreen.classList.add("active");

    }, 20);


    // =====================================================
    // SCREEN WISE MUSIC
    // =====================================================

    // Screen 2 → Romantic
    if (targetScreen === screen2) {

        playMusic("romantic");

    }

    // Screen 3 → Romantic
    else if (targetScreen === screen3) {

        playMusic("romantic");

    }

    // Screen 4 → Sad
    else if (targetScreen === screen4) {

        playMusic("sad");

    }

    // Screen 5 → Romantic
    else if (targetScreen === screen5) {

        playMusic("romantic");

    }

    // Screen 6 → Romantic
    else if (targetScreen === screen6) {

        playMusic("romantic");

    }

    // Screen 7 → Sad
    else if (targetScreen === screen7) {

        playMusic("sad");

    }

    // Screen 8 → Birthday
    else if (targetScreen === screen8) {

    playMusic("birthday");

    createRosePetals();

}

    // Login screen → NO MUSIC
    else if (targetScreen === loginScreen) {

        stopMusic();

    }

}


    // =========================================================
    // PASSWORD SHOW / HIDE
    // =========================================================

    if (passwordEye && password) {

        passwordEye.addEventListener("click", () => {

            if (password.type === "password") {

                password.type = "text";
                passwordEye.textContent = "🙈";

            } else {

                password.type = "password";
                passwordEye.textContent = "👁";

            }

        });

    }


    // =========================================================
    // LOGIN / UNLOCK DOOR
    // =========================================================

    if (loginButton) {

        loginButton.addEventListener("click", () => {

            const enteredUsername =
                username ? username.value.trim() : "";

            const enteredPassword =
                password ? password.value : "";


            if (
                enteredUsername === "LaraibYousaf" &&
                enteredPassword === "Laraib@07"
            ) {

                if (loginError) {
                    loginError.textContent = "";
                }

                if (successMessage) {
                    successMessage.style.display = "block";
                }

                loginButton.style.display = "none";


                if (loginContainer) {

                    loginContainer.classList.add("door-open");

                }


                setTimeout(() => {

                    showScreen(screen2);


                }, 1500);


            } else {

                if (loginError) {

                    loginError.textContent =
                        "Hmm... not quite. Try again. 👀";

                }

            }

        });

    }


    // =========================================================
    // ENTER KEY LOGIN
    // =========================================================

    if (username) {

        username.addEventListener("keydown", event => {

            if (
                event.key === "Enter" &&
                loginButton
            ) {

                loginButton.click();

            }

        });

    }


    if (password) {

        password.addEventListener("keydown", event => {

            if (
                event.key === "Enter" &&
                loginButton
            ) {

                loginButton.click();

            }

        });

    }


    // =========================================================
    // SCREEN 2 → SCREEN 3
    // =========================================================

    const screen2Next =
        document.getElementById("screen2Next");


    if (screen2Next) {

        screen2Next.addEventListener("click", () => {

            showScreen(screen3);

            startCandleSequence();

        });

    }


    // =========================================================
    // CANDLE SEQUENCE
    // =========================================================

    let candleTimers = [];


    function clearCandleTimers() {

        candleTimers.forEach(timer => {

            clearTimeout(timer);

        });

        candleTimers = [];

    }


    function startCandleSequence() {

        clearCandleTimers();


        const largeFlame =
            document.querySelector(".large-flame");

        const smallFlame =
            document.querySelector(".small-flame");

        const smallCandle =
            document.querySelector(".small-candle");

        const largeCandle =
            document.querySelector(".large-candle");

        const candleMessage =
            document.getElementById("candleMessage");


        if (!largeFlame || !smallFlame) return;


        largeFlame.style.opacity = "1";
        smallFlame.style.opacity = "1";


        if (smallCandle) {
            smallCandle.classList.remove("angry");
        }

        if (largeCandle) {
            largeCandle.classList.remove("blown");
        }

        if (candleMessage) {
            candleMessage.classList.remove("show");
        }


        // Large candle goes out
        candleTimers.push(

            setTimeout(() => {

                largeFlame.style.opacity = "0";

                if (largeCandle) {
                    largeCandle.classList.add("blown");
                }

            }, 1800)

        );


        // Small candle goes out
        candleTimers.push(

            setTimeout(() => {

                smallFlame.style.opacity = "0";

                if (smallCandle) {
                    smallCandle.classList.add("angry");
                }

            }, 3500)

        );


        // Candles return
        candleTimers.push(

            setTimeout(() => {

                if (smallCandle) {
                    smallCandle.classList.remove("angry");
                }

                if (largeCandle) {
                    largeCandle.classList.remove("blown");
                }

            }, 5200)

        );


        // Message
        candleTimers.push(

            setTimeout(() => {

                if (candleMessage) {
                    candleMessage.classList.add("show");
                }

            }, 6000)

        );

    }


    // =========================================================
    // SCREEN 3 → SCREEN 4
    // =========================================================

    const screen3Next =
        document.getElementById("screen3Next");


    if (screen3Next) {

        screen3Next.addEventListener("click", () => {

            showScreen(screen4);

        });

    }


    // =========================================================
    // SCREEN 4 — REASONS
    // =========================================================

    const reasonCards =
        document.querySelectorAll(".reason-card");

    const reasonReveal =
        document.getElementById("reasonReveal");

    const revealNumber =
        document.getElementById("revealNumber");

    const revealText =
        document.getElementById("revealText");

    const reasonClose =
        document.getElementById("reasonClose");


    const reasons = {

        1:
            "Your smile has a way of making an ordinary moment feel a little less ordinary. ❤️",

        2:
            "You have a personality that's genuinely hard to forget... and maybe that's slightly dangerous. 🤭",

        3:
            "Somehow, you make even the simplest conversations a little more interesting.",

        4:
            "You have this cute little way of being yourself without even trying. ❤️",

        5:
            "There’s just something about your presence that feels different... in the best way.",

        6:
            "You have a sneaky talent for staying on someone's mind longer than you probably should. 👀",

        7:
            "You're probably more special than you give yourself credit for.",

        8:
            "You bring your own kind of warmth into the little moments that matter.",

        9:
            "You're simply... you. And honestly, that's one of my favourite things about you. ❤️",

        10:
            "Because today is about celebrating someone who deserves a little extra attention. 🤭❤️"

    };


    reasonCards.forEach(card => {

        card.addEventListener("click", () => {

            const number =
                card.dataset.reason;


            if (revealNumber) {

                revealNumber.textContent =
                    String(number).padStart(2, "0");

            }


            if (revealText) {

                revealText.textContent =
                    reasons[number] ||
                    "A little secret just for you. ❤️";

            }


            if (reasonReveal) {

                reasonReveal.classList.add("show");

            }


            card.classList.add("opened");

        });

    });


    if (reasonClose) {

        reasonClose.addEventListener("click", () => {

            if (reasonReveal) {

                reasonReveal.classList.remove("show");

            }

        });

    }


    if (reasonReveal) {

        reasonReveal.addEventListener("click", event => {

            if (event.target === reasonReveal) {

                reasonReveal.classList.remove("show");

            }

        });

    }


    // =========================================================
    // SCREEN 4 → SCREEN 5
    // =========================================================

    const screen4Next =
        document.getElementById("screen4Next");


    if (screen4Next) {

        screen4Next.addEventListener("click", () => {

            if (reasonReveal) {

                reasonReveal.classList.remove("show");

            }

            showScreen(screen5);

        });

    }


    // =========================================================
    // SCREEN 5 — LETTER
    // =========================================================

    const letterWrapper =
        document.getElementById("letterWrapper");

    const letterOpenBtn =
        document.getElementById("letterOpenBtn");

    const letterFinal =
        document.getElementById("letterFinal");

    const screen5Next =
        document.getElementById("screen5Next");


    let letterTimer = null;


    if (letterOpenBtn) {

        letterOpenBtn.addEventListener("click", () => {

            if (!letterWrapper) return;


            if (letterTimer) {

                clearTimeout(letterTimer);
                letterTimer = null;

            }


            if (letterFinal) {

                letterFinal.classList.remove("show");

            }


            letterWrapper.classList.remove("opened");

            void letterWrapper.offsetWidth;

            letterWrapper.classList.add("opened");


            letterOpenBtn.style.opacity = "0.5";
            letterOpenBtn.style.pointerEvents = "none";


            letterTimer = setTimeout(() => {

                letterWrapper.classList.remove("opened");


                setTimeout(() => {

                    if (letterFinal) {

                        letterFinal.classList.add("show");

                    }

                    letterOpenBtn.style.opacity = "1";
                    letterOpenBtn.style.pointerEvents = "auto";

                }, 800);


            }, 10000);

        });

    }


    // =========================================================
    // SCREEN 5 → SCREEN 6
    // =========================================================

    if (screen5Next) {

        screen5Next.addEventListener("click", () => {

            showScreen(screen6);

        });

    }


    // =========================================================
    // SCREEN 6 — GIFT
    // =========================================================

    const giftBox =
        document.getElementById("giftBox");

    const giftOpenBtn =
        document.getElementById("giftOpenBtn");

    const giftMessage =
        document.getElementById("giftMessage");

    const screen6Next =
        document.getElementById("screen6Next");


    // =========================================================
    // OPEN GIFT → SCREEN 8
    // =========================================================

    if (giftOpenBtn) {

        giftOpenBtn.addEventListener("click", () => {

            if (giftBox) {

                giftBox.classList.add("gift-opened");

            }


            giftOpenBtn.style.opacity = "0";
            giftOpenBtn.style.pointerEvents = "none";


            if (giftMessage) {

                giftMessage.classList.add("show");

            }


            setTimeout(() => {

                showScreen(screen8);

            }, 1800);

        });

    }


    // =========================================================
    // SCREEN 6 → SCREEN 8
    // =========================================================

    if (screen6Next) {

        screen6Next.addEventListener("click", () => {

            showScreen(screen8);

        });

    }


    // =========================================================
    // SCREEN 7 → SCREEN 8
    // =========================================================

    const screen7Next =
        document.getElementById("screen7Next");


    if (screen7Next) {

        screen7Next.addEventListener("click", () => {

            showScreen(screen8);

        });

    }


  


    // =========================================================
    // RESET WEBSITE
    // =========================================================

    function resetWebsite() {

        clearCandleTimers();


        if (letterTimer) {

            clearTimeout(letterTimer);
            letterTimer = null;

        }


        // -----------------------------------------------------
        // LOGIN RESET
        // -----------------------------------------------------

        if (username) {

            username.value = "";

        }


        if (password) {

            password.value = "";
            password.type = "password";

        }


        if (passwordEye) {

            passwordEye.textContent = "👁";

        }


        if (loginError) {

            loginError.textContent = "";

        }


        if (successMessage) {

            successMessage.style.display = "none";

        }


        if (loginButton) {

            loginButton.style.display = "block";

        }


        if (loginContainer) {

            loginContainer.classList.remove("door-open");

        }


        // -----------------------------------------------------
        // LETTER RESET
        // -----------------------------------------------------

        if (letterWrapper) {

            letterWrapper.classList.remove("opened");

        }


        if (letterFinal) {

            letterFinal.classList.remove("show");

        }


        if (letterOpenBtn) {

            letterOpenBtn.style.opacity = "1";
            letterOpenBtn.style.pointerEvents = "auto";

        }


        // -----------------------------------------------------
        // GIFT RESET
        // -----------------------------------------------------

        if (giftBox) {

            giftBox.classList.remove("gift-opened");

        }


        if (giftMessage) {

            giftMessage.classList.remove("show");

        }


        if (giftOpenBtn) {

            giftOpenBtn.style.opacity = "1";
            giftOpenBtn.style.pointerEvents = "auto";
            giftOpenBtn.style.display = "inline-block";

        }


        // -----------------------------------------------------
        // REASONS RESET
        // -----------------------------------------------------

        if (reasonReveal) {

            reasonReveal.classList.remove("show");

        }


        reasonCards.forEach(card => {

            card.classList.remove("opened");

        });


        // -----------------------------------------------------
        // CANDLE RESET
        // -----------------------------------------------------

        const largeFlame =
            document.querySelector(".large-flame");

        const smallFlame =
            document.querySelector(".small-flame");

        const smallCandle =
            document.querySelector(".small-candle");

        const largeCandle =
            document.querySelector(".large-candle");

        const candleMessage =
            document.getElementById("candleMessage");


        if (largeFlame) {

            largeFlame.style.opacity = "1";

        }


        if (smallFlame) {

            smallFlame.style.opacity = "1";

        }


        if (smallCandle) {

            smallCandle.classList.remove("angry");

        }


        if (largeCandle) {

            largeCandle.classList.remove("blown");

        }


        if (candleMessage) {

            candleMessage.classList.remove("show");

        }


        // -----------------------------------------------------
        // SCREEN 8 RESET
        // -----------------------------------------------------

        if (finalEndMessage) {

            finalEndMessage.classList.remove("show");

        }


        if (screen8Replay) {

            screen8Replay.style.display =
                "inline-block";

        }


        if (screen8Finish) {

            screen8Finish.style.display =
                "inline-block";

        }


        if (screen8End) {

            screen8End.style.display =
                "inline-block";

        }


        // Old petals remove
        if (screen8) {

            const oldPetals =
                screen8.querySelector(".rose-petals");

            if (oldPetals) {

                oldPetals.remove();

            }

        }

    }

// =========================================================
// INITIAL SCREEN
// =========================================================

hideAllScreens();

if (screen9) {
    screen9.style.display = "none";
    screen9.classList.remove("active");
}

if (loginScreen) {

    loginScreen.style.display = "flex";
    loginScreen.classList.add("active");

}
    
        // =========================================================
    // SCREEN 8 → REPLAY → SCREEN 2
    // =========================================================

    if (screen8Replay) {

        screen8Replay.addEventListener("click", () => {

            // Agar Screen 9 ka timer chal raha ho to stop karo
            if (screen9Timer) {

                clearTimeout(screen9Timer);
                screen9Timer = null;

            }

            // Screen 9 hide
            if (screen9) {

                screen9.style.display = "none";
                screen9.classList.remove("active");

            }

            // Direct Screen 2 par jao
            showScreen(screen2);

        });

    }


    // =========================================================
    // SCREEN 8 → END HERE → SCREEN 9
    // =========================================================

    if (screen8Finish) {

        screen8Finish.addEventListener("click", () => {

            if (!screen9) return;


            // Purana Screen 9 timer cancel
            if (screen9Timer) {

                clearTimeout(screen9Timer);
                screen9Timer = null;

            }


            // Screen 8 hide
            hideAllScreens();


            // Screen 9 show
            screen9.style.display = "flex";
            screen9.classList.add("active");


            // 5 seconds ke baad website blank
            screen9Timer = setTimeout(() => {

                screen9.style.display = "none";
                screen9.classList.remove("active");

                document.body.innerHTML = "";

                document.body.style.margin = "0";
                document.body.style.padding = "0";
                document.body.style.width = "100vw";
                document.body.style.height = "100vh";
                document.body.style.background = "#050308";

                screen9Timer = null;

            }, 5000);

        });

    }
    hideAllScreens();

if (loginScreen) {
    loginScreen.style.display = "flex";
    loginScreen.classList.add("active");
}

});
