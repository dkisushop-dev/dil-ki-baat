// --- Elements ko Select karna --- 
const micBtn = document.getElementById('mic-btn');
const musicBtn = document.getElementById('music-btn');
const bgMusic = document.getElementById('bg-music');
const textareaBox = document.getElementById('confession-text');
const burdenCount = document.getElementById('burden-count');
const releaseBtn = document.querySelector('.release-btn');

// --- 1. Voice Recognition (Bol kar type karna) --- 
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
  const recognition = new SpeechRecognition();
  recognition.lang = 'hi-IN'; // Hindi/Hinglish support
  
  micBtn.addEventListener('click', () => {
    recognition.start();
    micBtn.textContent = "Sun raha hoon... 🤫";
    micBtn.classList.add('mic-active');
  });

  recognition.onresult = (event) => {
    textareaBox.value += event.results[0][0].transcript + " ";
  };

  recognition.onend = () => {
    micBtn.textContent = "Boliye (Mic) 🎙️";
    micBtn.classList.remove('mic-active');
  };
}

// --- 2. Music Feature (Music ON/OFF) --- 
musicBtn.addEventListener('click', () => {
  if (bgMusic.paused) {
    bgMusic.play().catch(() => alert("Kripya page par pehle kahi click karein!"));
    musicBtn.textContent = "Music On ⏸️";
    musicBtn.classList.add('music-active');
  } else {
    bgMusic.pause();
    musicBtn.textContent = "Soothing Music 🎵";
    musicBtn.classList.remove('music-active');
  }
});

// --- 3. Let it Go (Text gayab karna + Counter) --- 
releaseBtn.addEventListener('click', () => {
  if (textareaBox.value.trim() !== "") {
    textareaBox.classList.add('fade-out');
    
    // Counter ki ginti badhayein
    let current = parseInt(burdenCount.textContent.replace(',', ''));
    burdenCount.textContent = (current + 1).toLocaleString();
    
    setTimeout(() => {
      textareaBox.value = "";
      textareaBox.classList.remove('fade-out');
      alert("Aapka bojh hawa me guum ho gaya... Releasing feels good! 🌌");
    }, 1500);
  } else {
    alert("Pehle kuch likhiye ya boliye! 😉");
  }
});
