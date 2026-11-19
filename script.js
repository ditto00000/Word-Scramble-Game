// Mengambil elemen HTML yang dibutuhkan
const scrambledWordElement = document.getElementById("scrambledWord");
const hintElement = document.getElementById("hint");
const answerInput = document.getElementById("answer");
const messageElement = document.getElementById("message");
const scoreElement = document.getElementById("score");
const questionElement = document.getElementById("question");

const checkButton = document.getElementById("checkBtn");
const nextButton = document.getElementById("nextBtn");
const restartButton = document.getElementById("restartBtn");

// Variabel permainan
let questions = [];
let currentIndex = 0;
let score = 0;
let answered = false;
let gameFinished = false;

// Mengacak susunan huruf dalam sebuah kata
function scrambleWord(word) {
  const letters = word.split("");

  // Ulangi pengacakan jika hasilnya masih sama dengan kata asli
  do {
    for (let i = letters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [letters[i], letters[j]] = [letters[j], letters[i]];
    }
  } while (letters.join("") === word);

  return letters.join("");
}

// Mengacak urutan soal
function shuffleQuestions() {
  questions = [...words];

  for (let i = questions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [questions[i], questions[j]] = [questions[j], questions[i]];
  }
}

// Menampilkan soal yang sedang dimainkan
function showQuestion() {
  if (currentIndex >= questions.length) {
    endGame();
    return;
  }

  const currentWord = questions[currentIndex];

  scrambledWordElement.textContent = scrambleWord(currentWord.word);
  hintElement.textContent = "Petunjuk: " + currentWord.hint;
  questionElement.textContent = currentIndex + 1;

  answerInput.value = "";
  answerInput.disabled = false;
  answerInput.style.display = "block";

  messageElement.textContent = "";
  messageElement.className = "message";

  answered = false;
  nextButton.disabled = true;
  checkButton.disabled = false;
  answerInput.focus();
}

// Memeriksa jawaban pengguna
function checkAnswer() {
  if (answered || gameFinished) return;

  const userAnswer = answerInput.value.trim().toUpperCase();
  const correctAnswer = questions[currentIndex].word;

  if (userAnswer === "") {
    messageElement.textContent = "Silakan masukkan jawaban terlebih dahulu!";
    messageElement.className = "message wrong";
    return;
  }

  if (userAnswer === correctAnswer) {
    score += 10;
    scoreElement.textContent = score;

    messageElement.textContent = "Benar! Jawabanmu tepat!";
    messageElement.className = "message correct";

    answered = true;
    answerInput.disabled = true;
    checkButton.disabled = true;
    nextButton.disabled = false;
  } else {
    messageElement.textContent = "Jawaban salah! Coba lagi.";
    messageElement.className = "message wrong";
  }
}

// Berpindah ke soal berikutnya
function nextQuestion() {
  if (!answered || gameFinished) return;

  currentIndex++;
  showQuestion();
}

// Menampilkan hasil akhir permainan
function endGame() {
  gameFinished = true;

  scrambledWordElement.textContent = "PERMAINAN SELESAI!";
  hintElement.textContent = "Kamu telah menyelesaikan seluruh soal!";
  questionElement.textContent = questions.length;

  answerInput.value = "";
  answerInput.disabled = true;
  answerInput.style.display = "none";

  messageElement.textContent = "Skor akhir kamu: " + score + " / " + (words.length * 10);
  messageElement.className = "message correct";

  checkButton.disabled = true;
  nextButton.disabled = true;
}

// Mengulang permainan dari awal
function restartGame() {
  currentIndex = 0;
  score = 0;
  answered = false;
  gameFinished = false;

  scoreElement.textContent = "0";

  shuffleQuestions();
  showQuestion();
}

// Menjalankan tombol
checkButton.addEventListener("click", checkAnswer);
nextButton.addEventListener("click", nextQuestion);
restartButton.addEventListener("click", restartGame);

// Memeriksa jawaban saat tombol Enter ditekan
answerInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    checkAnswer();
  }
});

// Memulai permainan saat halaman dibuka
shuffleQuestions();
showQuestion();
