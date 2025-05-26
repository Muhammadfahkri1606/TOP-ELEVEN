const API_KEY = "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";

/**
 * Fungsi untuk memanggil OpenAI Chat Completion API
 * @param {string} prompt - Pertanyaan atau instruksi untuk AI
 * @param {string} resultId - ID elemen HTML untuk menampilkan hasil
 */
async function askAI(prompt, resultId) {
  const resultElem = document.getElementById(resultId);
  resultElem.innerHTML = "⏳ AI sedang menganalisis...";
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 600,
        temperature: 0.7
      })
    });
    const data = await response.json();
    if (data.choices && data.choices.length > 0) {
      resultElem.innerHTML = data.choices[0].message.content.trim();
    } else {
      resultElem.innerHTML = "❌ AI tidak memberikan jawaban yang valid.";
    }
  } catch (error) {
    resultElem.innerHTML = "❌ Gagal mengakses AI. Cek koneksi internet atau API key.";
    console.error("Error API:", error);
  }
}

// Fungsi analisis atribut pemain
function analyzePlayer() {
  const name = document.getElementById("playerName").value.trim();
  const speed = document.getElementById("speed").value.trim();
  const passing = document.getElementById("passing").value.trim();
  const defending = document.getElementById("defending").value.trim();
  const shooting = document.getElementById("shooting").value.trim();

  if (!name) return alert("Mohon isi nama pemain.");
  const prompt = `
Pemain Top Eleven:
Nama: ${name}
- Kecepatan: ${speed}
- Passing: ${passing}
- Defending: ${defending}
- Shooting: ${shooting}

Berikan analisa AI:
- Posisi terbaik
- Role yang cocok
- Gaya bermain cocok
- Kelemahan utama
- Saran latihan terbaik
- Rating total
- Strategi taktik cocok untuk pemain ini
  `;

  askAI(prompt, "resultPlayer");
}

// Fungsi analisis taktik dan gaya bermain
function analyzeTactics() {
  const formation = document.getElementById("formation").value.trim();
  const style = document.getElementById("style").value.trim();

  if (!formation) return alert("Mohon isi formasi tim.");
  if (!style) return alert("Mohon isi gaya bermain.");

  const prompt = `
Saya pakai formasi ${formation} dan gaya bermain "${style}".
Analisa AI:
- Kelebihan dan kekurangan formasi
- Tim lawan ideal yang cocok/lawan
- Variasi taktik berdasarkan situasi
- Pemain kunci dalam formasi tersebut
- Saran rotasi & mentalitas bermain
  `;

  askAI(prompt, "resultTactics");
}

// Fungsi analisis counter lawan
function analyzeEnemy() {
  const enemyForm = document.getElementById("enemyFormation").value.trim();
  const enemyStyle = document.getElementById("enemyStyle").value.trim();

  if (!enemyForm) return alert("Mohon isi formasi lawan.");

  const prompt = `
Lawan pakai formasi ${enemyForm} dan gaya main "${enemyStyle}".
Analisa AI:
- Formasi terbaik untuk counter
- Gaya bermain yang bisa mengalahkan mereka
- Pemain kunci dan peran penting
- Tips in-game dan taktik perubahan saat tertinggal
  `;

  askAI(prompt, "resultEnemy");
}

// Fungsi analisis rekomendasi latihan pemain
function analyzeTraining() {
  const pos = document.getElementById("trainingPosition").value.trim();
  const role = document.getElementById("trainingRole").value.trim();

  if (!pos) return alert("Mohon isi posisi pemain.");

  const prompt = `
Saya ingin melatih pemain di posisi ${pos} dengan role "${role}" di Top Eleven.
Berikan:
- Drill latihan yang direkomendasikan
- Atribut utama untuk difokuskan
- Tips peningkatan cepat
- Booster latihan opsional
- Rekomendasi variasi latihan harian
  `;

  askAI(prompt, "resultTraining");
}

// Fungsi analisis worth beli pemain
function analyzeBuy() {
  const name = document.getElementById("buyPlayerName").value.trim();
  const speed = document.getElementById("buySpeed").value.trim();
  const passing = document.getElementById("buyPassing").value.trim();
  const defending = document.getElementById("buyDefending").value.trim();
  const shooting = document.getElementById("buyShooting").value.trim();
  const price = document.getElementById("buyPrice").value.trim();

  if (!name) return alert("Mohon isi nama pemain.");
  if (!price) return alert("Mohon isi harga tawaran.");

  const prompt = `
Saya ingin membeli pemain Top Eleven:
Nama: ${name}
Atribut:
- Kecepatan: ${speed}
- Passing: ${passing}
- Defending: ${defending}
- Shooting: ${shooting}
Harga tawaran: ${price} juta

Tolong analisa:
- Apakah pemain ini worth dibeli dengan harga tersebut?
- Berikan alasan kenapa layak atau tidak
- Saran jika ada harga ideal atau atribut harus ditingkatkan
  `;

  askAI(prompt, "resultBuy");
}
