let mengetik = false;
let audioContext = new (window.AudioContext || window.webkitAudioContext)();
let audioBuffer;

// Load audio
fetch('assets/keyboard-sound.mp3')
    .then(response => response.arrayBuffer())
    .then(data => audioContext.decodeAudioData(data))
    .then(buffer => {
        audioBuffer = buffer;
    });

// Fungsi untuk memulai sound
function playSound() {
    let source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContext.destination);
    source.start(0);
}

// Fungsi KeyDown
function handleKeyDown(event) {
    const text = document.getElementById('text');
    if (!mengetik) {
        text.textContent = "";
        mengetik = true;
    }

    if (event.key === "Backspace" && event.ctrlKey) {
        let kata = text.textContent.trim().split(" ");
        kata.pop();
        text.textContent = kata.join(" ") + " ";
    } else if (event.key === "Backspace") {
        text.textContent = text.textContent.slice(0, -1);
    } else if (event.key.length === 1) {
        text.textContent += event.key;
    }

    let keyElement = getKeyElement(event);
    if (keyElement) {
        keyElement.classList.add('key--active');
    }
    playSound();
}

// Fungsi KeyUp
function handleKeyUp(event) {
    let keyElement = getKeyElement(event);
    if (keyElement) {
        keyElement.classList.remove('key--active');
    }
}

// Fungsi untuk mengambil elemen
function getKeyElement(event) {
    let keyElement;
    const key = event.key.toUpperCase();

    switch (event.code) {
        case "Space":
            keyElement = document.getElementById('key-Space');
            event.preventDefault();
            break;
        case "Enter":
            keyElement = document.getElementById('key-Enter');
            break;
        case "Backslash":
            keyElement = document.getElementById("key-oneandhalf");
            break;
        case "Backspace":
            keyElement = document.getElementById('key-Backspace');
            break;
        case "CapsLock":
            keyElement = document.getElementById('key-CapsLock');
            break;
        case "Tab":
            keyElement = document.getElementById('key-Tab');
            event.preventDefault();
            break;
        case "ShiftLeft":
        case "ShiftRight":
            keyElement = document.getElementById('key-ShiftLeft');
            break;
        case "ControlLeft":
        case "ControlRight":
            keyElement = document.getElementById('key-ControlLeft');
            break;
        case "AltLeft":
        case "AltRight":
            keyElement = document.getElementById('key-MetaLeft');
            event.preventDefault();
            break;
        case "MetaLeft":
        case "MetaRight":
            keyElement = document.getElementById('key-AltLeft');
            event.preventDefault();
            break;
        default:
            if (event.code.startsWith("Arrow")) {
                keyElement = document.getElementById(`key-${event.code}`);
                event.preventDefault();
            } else {
                keyElement = document.getElementById(`key-${key}`);
            }
    }
    return keyElement;
}

// event listeners
document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);
