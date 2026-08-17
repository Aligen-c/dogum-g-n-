/* ===================================================== */
/* DOĞUM GÜNÜ */
/* ===================================================== */

const DOGUM_GUNU = "2006-08-18";


/* ===================================================== */
/* MÜZİK */
/* ===================================================== */

const birthdayAudio =
    document.getElementById("birthdayAudio");

const song1Audio =
    document.getElementById("song1Audio");

const song2Audio =
    document.getElementById("song2Audio");

const song3Audio =
    document.getElementById("song3Audio");

const song4Audio =
    document.getElementById("song4Audio");


birthdayAudio.volume = 0.40;

song1Audio.volume = 0.30;
song2Audio.volume = 0.30;
song3Audio.volume = 0.30;
song4Audio.volume = 0.30;


const ANA_SARKILAR = [

    {
        audio: song1Audio,
        ad: "Yaşlı Amca - Ve Ben",
        sure: 120
    },

    {
        audio: song2Audio,
        ad: "Yalın - Olur Ya",
        sure: 90
    },

    {
        audio: song3Audio,
        ad: "Yaşlı Amca - Kal Ki",
        sure: 120
    },

    {
        audio: song4Audio,
        ad: "Simge - Kalpsiz Bir Serseri",
        sure: 90
    }

];


let aktifSarkiIndex = 0;
let playlistBasladi = false;
let sarkiDegisiyor = false;


const musicPlayer =
    document.getElementById("musicPlayer");

const musicTitle =
    document.getElementById("musicTitle");

const musicStatus =
    document.getElementById("musicStatus");

const musicProgress =
    document.getElementById("musicProgress");

const musicTime =
    document.getElementById("musicTime");

const playPauseButton =
    document.getElementById("playPauseButton");


function muzikleriHazirla() {

    birthdayAudio.load();

    ANA_SARKILAR.forEach(
        function(sarki) {

            sarki.audio.load();

        }
    );

}


muzikleriHazirla();


function dogumGunuMuziginiBaslat() {

    playlistBasladi = false;

    ANA_SARKILAR.forEach(
        function(sarki) {

            sarki.audio.pause();

            sarki.audio.currentTime = 0;

        }
    );

    birthdayAudio.currentTime = 0;
    birthdayAudio.loop = true;

    birthdayAudio.play().catch(
        function(error) {

            console.error(error);

        }
    );

}


function dogumGunuMuziginiDurdur() {

    birthdayAudio.pause();

    birthdayAudio.currentTime = 0;

}


function anaSarkilariBaslat() {

    dogumGunuMuziginiDurdur();

    ANA_SARKILAR.forEach(
        function(sarki) {

            sarki.audio.pause();

            sarki.audio.currentTime = 0;

        }
    );

    playlistBasladi = true;

    aktifSarkiIndex = 0;

    musicPlayer.classList.remove(
        "hidden-player"
    );

    aktifSarkiyiCal(true);

}


function aktifSarkiyiCal(bastanBaslat) {

    const sarki =
        ANA_SARKILAR[aktifSarkiIndex];

    if (bastanBaslat) {

        sarki.audio.currentTime = 0;

    }

    musicTitle.textContent =
        sarki.ad;

    musicStatus.textContent =
        "Şimdi çalıyor";

    playPauseButton.textContent =
        "⏸";

    musicPlayer.classList.remove(
        "paused"
    );

    playerGuncelle();

    sarki.audio.play().catch(
        function(error) {

            console.error(error);

        }
    );

}


function muzigiDuraklatDevamEt() {

    if (!playlistBasladi) {

        return;

    }

    const sarki =
        ANA_SARKILAR[aktifSarkiIndex];

    if (sarki.audio.paused) {

        sarki.audio.play();

        playPauseButton.textContent =
            "⏸";

        musicStatus.textContent =
            "Şimdi çalıyor";

        musicPlayer.classList.remove(
            "paused"
        );

    }

    else {

        sarki.audio.pause();

        playPauseButton.textContent =
            "▶";

        musicStatus.textContent =
            "Duraklatıldı";

        musicPlayer.classList.add(
            "paused"
        );

    }

}


function arkaPlanMuziginiDurdur() {

    if (!playlistBasladi) {

        return false;

    }

    const sarki =
        ANA_SARKILAR[aktifSarkiIndex];

    if (!sarki.audio.paused) {

        sarki.audio.pause();

        playPauseButton.textContent =
            "▶";

        musicStatus.textContent =
            "Video oynatılıyor";

        musicPlayer.classList.add(
            "paused"
        );

        return true;

    }

    return false;

}


function arkaPlanMuziginiDevamEttir() {

    if (!playlistBasladi) {

        return;

    }

    const sarki =
        ANA_SARKILAR[aktifSarkiIndex];

    sarki.audio.play().catch(
        function() {}
    );

    playPauseButton.textContent =
        "⏸";

    musicStatus.textContent =
        "Şimdi çalıyor";

    musicPlayer.classList.remove(
        "paused"
    );

}


function sonrakiSarkiyaGec() {

    if (
        !playlistBasladi ||
        sarkiDegisiyor
    ) {

        return;

    }

    sarkiDegisiyor = true;

    const mevcut =
        ANA_SARKILAR[aktifSarkiIndex];

    mevcut.audio.pause();

    mevcut.audio.currentTime = 0;

    aktifSarkiIndex++;

    if (
        aktifSarkiIndex >=
        ANA_SARKILAR.length
    ) {

        aktifSarkiIndex = 0;

    }

    sarkiDegisiyor = false;

    aktifSarkiyiCal(true);

}


function sureyiYaz(saniye) {

    saniye =
        Math.floor(saniye);

    const dakika =
        Math.floor(saniye / 60);

    const kalan =
        saniye % 60;

    return (
        dakika +
        ":" +
        String(kalan).padStart(2, "0")
    );

}


function playerGuncelle() {

    if (!playlistBasladi) {

        return;

    }

    const sarki =
        ANA_SARKILAR[aktifSarkiIndex];

    const simdiki =
        Math.min(
            sarki.audio.currentTime,
            sarki.sure
        );

    const yuzde =
        Math.min(
            (simdiki / sarki.sure) * 100,
            100
        );

    musicProgress.style.width =
        yuzde + "%";

    musicTime.textContent =
        sureyiYaz(simdiki) +
        " / " +
        sureyiYaz(sarki.sure);

}


ANA_SARKILAR.forEach(
    function(sarki, index) {

        sarki.audio.addEventListener(
            "timeupdate",
            function() {

                if (
                    playlistBasladi &&
                    aktifSarkiIndex === index
                ) {

                    playerGuncelle();

                    if (
                        sarki.audio.currentTime >=
                        sarki.sure
                    ) {

                        sonrakiSarkiyaGec();

                    }

                }

            }
        );

        sarki.audio.addEventListener(
            "ended",
            function() {

                if (
                    playlistBasladi &&
                    aktifSarkiIndex === index
                ) {

                    sonrakiSarkiyaGec();

                }

            }
        );

    }
);


/* ===================================================== */
/* KALPLER */
/* ===================================================== */

const heartsContainer =
    document.getElementById("hearts");


function createHeart() {

    const heart =
        document.createElement("div");

    heart.className =
        "heart";

    heart.textContent =
        Math.random() > 0.5
            ? "♡"
            : "♥";

    heart.style.left =
        Math.random() * 100 + "vw";

    heart.style.fontSize =
        (
            Math.random() * 18 + 10
        ) +
        "px";

    const sure =
        Math.random() * 5 + 6;

    heart.style.animationDuration =
        sure + "s";

    heartsContainer.appendChild(
        heart
    );

    setTimeout(
        function() {

            heart.remove();

        },

        sure * 1000
    );

}


setInterval(
    createHeart,
    450
);


/* ===================================================== */
/* EKRANLAR */
/* ===================================================== */

function ekranAc(id) {

    document
        .querySelectorAll(".screen")
        .forEach(
            function(screen) {

                screen.classList.remove(
                    "active"
                );

            }
        );

    setTimeout(
        function() {

            const target =
                document.getElementById(id);

            if (!target) {

                return;

            }

            target.classList.add(
                "active"
            );

            target.scrollTop = 0;

        },

        250
    );

}


function basla() {

    ekranAc(
        "sifreEkrani"
    );

}


function devamEt() {

    anaSarkilariBaslat();

    ekranAc(
        "menuEkrani"
    );

}


function bolumAc(id) {

    ekranAc(id);

}


function anaMenuyeDon() {

    fotografKapat();

    videoKapat(false);

    ekranAc(
        "menuEkrani"
    );

}


/* ===================================================== */
/* DOĞUM GÜNÜ */
/* ===================================================== */

function dogumGunuKontrol() {

    const input =
        document.getElementById(
            "birthday"
        );

    const mesaj =
        document.getElementById(
            "sifreMesaji"
        );

    if (!input.value) {

        mesaj.textContent =
            "Önce bir tarih seç bakalım 👀❤️";

        return;

    }

    if (
        input.value ===
        DOGUM_GUNU
    ) {

        mesaj.textContent =
            "Erişim onaylandı ❤️";

        dogumGunuMuziginiBaslat();

        setTimeout(
            function() {

                ekranAc(
                    "pastaEkrani"
                );

            },

            400
        );

    }

    else {

        mesaj.textContent =
            "Kendi doğum gününü de mi unuttun? 😭❤️";

    }

}


/* ===================================================== */
/* MİKROFON */
/* ===================================================== */

let audioContext;
let analyser;
let dataArray;
let microphoneStream;
let listening = false;
let candlesAreOut = false;
let baseline = 0;
let blowFrames = 0;


async function hazirim() {

    document
        .getElementById(
            "wishControls"
        )
        .classList
        .add(
            "hidden"
        );

    document
        .getElementById(
            "microphoneArea"
        )
        .classList
        .remove(
            "hidden"
        );

    const status =
        document.getElementById(
            "micStatus"
        );

    try {

        microphoneStream =
            await navigator
                .mediaDevices
                .getUserMedia({
                    audio: true
                });

        audioContext =
            new (
                window.AudioContext ||
                window.webkitAudioContext
            )();

        analyser =
            audioContext.createAnalyser();

        analyser.fftSize = 1024;

        const microphone =
            audioContext
                .createMediaStreamSource(
                    microphoneStream
                );

        microphone.connect(
            analyser
        );

        dataArray =
            new Uint8Array(
                analyser.fftSize
            );

        status.textContent =
            "Ortam sesini dinliyorum... 🤫";

        await calibrateMicrophone();

        status.textContent =
            "Hazır! Şimdi mumlara üfle 💨";

        listening = true;

        detectBlow();

    }

    catch (error) {

        status.textContent =
            "Mikrofon açılamadı ama sorun değil ❤️ Aşağıdaki Üfle butonuna basabilirsin.";

    }

}


function calibrateMicrophone() {

    return new Promise(
        function(resolve) {

            let toplam = 0;
            let sayi = 0;

            const interval =
                setInterval(
                    function() {

                        toplam += getVolume();

                        sayi++;

                    },

                    50
                );

            setTimeout(
                function() {

                    clearInterval(interval);

                    baseline =
                        toplam /
                        Math.max(sayi, 1);

                    resolve();

                },

                1000
            );

        }
    );

}


function getVolume() {

    if (
        !analyser ||
        !dataArray
    ) {

        return 0;

    }

    analyser.getByteTimeDomainData(
        dataArray
    );

    let toplam = 0;

    for (
        let i = 0;
        i < dataArray.length;
        i++
    ) {

        const value =
            (dataArray[i] - 128) / 128;

        toplam +=
            value * value;

    }

    return Math.sqrt(
        toplam /
        dataArray.length
    );

}


function detectBlow() {

    if (
        !listening ||
        candlesAreOut
    ) {

        return;

    }

    const volume =
        getVolume();

    document
        .getElementById(
            "soundLevel"
        )
        .style
        .width =
        Math.min(
            volume * 700,
            100
        )
        +
        "%";

    const threshold =
        Math.max(
            0.05,
            baseline * 3
        );

    if (
        volume > threshold
    ) {

        blowFrames++;

    }

    else {

        blowFrames =
            Math.max(
                0,
                blowFrames - 1
            );

    }

    if (
        blowFrames >= 6
    ) {

        mumlariSondur();

        return;

    }

    requestAnimationFrame(
        detectBlow
    );

}


function normalUfle() {

    mumlariSondur();

}


function mumlariSondur() {

    if (candlesAreOut) {

        return;

    }

    candlesAreOut = true;
    listening = false;

    document
        .querySelectorAll(
            ".candle"
        )
        .forEach(
            function(candle, index) {

                setTimeout(
                    function() {

                        candle.classList.add(
                            "blown"
                        );

                    },

                    index * 160
                );

            }
        );

    if (microphoneStream) {

        microphoneStream
            .getTracks()
            .forEach(
                function(track) {

                    track.stop();

                }
            );

    }

    setTimeout(
        createConfetti,
        400
    );

    setTimeout(
        function() {

            document
                .getElementById(
                    "microphoneArea"
                )
                .classList
                .add(
                    "hidden"
                );

            document
                .getElementById(
                    "finalWish"
                )
                .classList
                .remove(
                    "hidden"
                );

        },

        1000
    );

}


function createConfetti() {

    const container =
        document.getElementById(
            "confetti"
        );

    const colors = [
        "#56b9ff",
        "#9b68ff",
        "#ff6ca5",
        "#ff4f5e",
        "#ffffff"
    ];

    for (
        let i = 0;
        i < 120;
        i++
    ) {

        const piece =
            document.createElement(
                "div"
            );

        piece.className =
            "confetti-piece";

        piece.style.left =
            Math.random() * 100 + "%";

        piece.style.background =
            colors[
                Math.floor(
                    Math.random() *
                    colors.length
                )
            ];

        piece.style.animationDuration =
            (
                Math.random() * 2.5 + 2
            )
            +
            "s";

        container.appendChild(
            piece
        );

        setTimeout(
            function() {

                piece.remove();

            },

            5000
        );

    }

}


/* ===================================================== */
/* YEMEK */
/* ===================================================== */

let yemekSoruNo = 1;
let yemekArsiviOlusturuldu = false;


function yemekBolumunuAc() {

    yemekSoruNo = 1;

    document
        .getElementById(
            "foodQuizWrapper"
        )
        .classList
        .remove(
            "hidden"
        );

    document
        .getElementById(
            "foodArchive"
        )
        .classList
        .add(
            "hidden"
        );

    yemekSorusuGuncelle();

    ekranAc(
        "yemekEkrani"
    );

}


function metniNormallestir(metin) {

    return metin
        .toLocaleLowerCase("tr-TR")
        .trim()
        .replaceAll("ı", "i")
        .replaceAll("ğ", "g")
        .replaceAll("ü", "u")
        .replaceAll("ş", "s")
        .replaceAll("ö", "o")
        .replaceAll("ç", "c")
        .replace(/\s+/g, " ");

}


function yemekSorusuGuncelle() {

    const step =
        document.getElementById(
            "quizStep"
        );

    const soru =
        document.getElementById(
            "foodQuestion"
        );

    const alt =
        document.getElementById(
            "foodQuestionSubtitle"
        );

    const input =
        document.getElementById(
            "foodAnswer"
        );

    const mesaj =
        document.getElementById(
            "foodAnswerMessage"
        );

    input.value = "";
    mesaj.textContent = "";

    if (
        yemekSoruNo === 1
    ) {

        step.textContent =
            "SORU 1 / 2";

        soru.textContent =
            "En sevdiğin yemek ne?";

        alt.textContent =
            "Bunu bilmen gerekiyor hanımefendi 👀";

    }

    else {

        step.textContent =
            "SORU 2 / 2";

        soru.textContent =
            "Peki benim en sevdiğim yemek ne?";

        alt.textContent =
            "Hadi bakalım, şimdi biraz daha zor 😌";

    }

}


function yemekCevabiniKontrolEt() {

    const input =
        document.getElementById(
            "foodAnswer"
        );

    const mesaj =
        document.getElementById(
            "foodAnswerMessage"
        );

    const cevap =
        metniNormallestir(
            input.value
        );

    if (
        yemekSoruNo === 1
    ) {

        if (
            cevap === "manti"
        ) {

            mesaj.textContent =
                "Bunu bilmek kolaydı zaten 😌♡";

            yemekSoruNo = 2;

            setTimeout(
                yemekSorusuGuncelle,
                1000
            );

        }

        else {

            mesaj.textContent =
                "Kendi en sevdiğin yemeği de mi unuttun hanımefendi 😭";

        }

    }

    else {

        if (
            cevap === "tavuk doner" ||
            cevap === "tavukdoner"
        ) {

            mesaj.textContent =
                "Tamam, beni gerçekten tanıyorsun ♡";

            setTimeout(
                yemekArsiviniAc,
                1000
            );

        }

        else {

            mesaj.textContent =
                "Oha sevgilinin en sevdiği yemeği bilmiyor musun? 👀 Bir daha düşün bakalım.";

        }

    }

}


document
    .getElementById(
        "foodAnswer"
    )
    .addEventListener(
        "keydown",
        function(event) {

            if (
                event.key === "Enter"
            ) {

                yemekCevabiniKontrolEt();

            }

        }
    );


const YEMEK_DOSYALARI = [

    { tip: "resim", src: "images/Yemek1.jpg" },
    { tip: "resim", src: "images/Yemek2.jpg" },
    { tip: "resim", src: "images/Yemek3.jpg" },
    { tip: "resim", src: "images/Yemek4.jpg" },
    { tip: "resim", src: "images/Yemek5.jpg" },
    { tip: "resim", src: "images/Yemek6.jpg" },
    { tip: "resim", src: "images/Yemek7.jpg" },

    {
        tip: "video",
        src: "images/Yemek8.mp4"
    },

    { tip: "resim", src: "images/Yemek9.jpg" },
    { tip: "resim", src: "images/Yemek10.jpg" },
    { tip: "resim", src: "images/Yemek11.jpg" },
    { tip: "resim", src: "images/Yemek12.jpg" },
    { tip: "resim", src: "images/Yemek13.jpg" },
    { tip: "resim", src: "images/Yemek14.jpg" }

];


function yemekArsiviniAc() {

    document
        .getElementById(
            "foodQuizWrapper"
        )
        .classList
        .add(
            "hidden"
        );

    document
        .getElementById(
            "foodArchive"
        )
        .classList
        .remove(
            "hidden"
        );

    if (
        !yemekArsiviOlusturuldu
    ) {

        yemekArsiviniOlustur();

        yemekArsiviOlusturuldu = true;

    }

}


function yemekArsiviniOlustur() {

    const timeline =
        document.getElementById(
            "foodTimeline"
        );

    timeline.innerHTML = "";

    const yemekYazilari = [

        "Puanım: 10/10. Tekrar izlenir.",

        "Şefin notu: Fazla tatlı.",

        "Müşteri yorumu: Bu kadar tatlı yemek yenmez.",

        "Sipariş durumu: Başarıyla bitirildi.",

        "Bir lokma yemek, bir sürü güzel anı ♡",

        "Yemekten daha güzel olan tek şey yanımda oturan kişi.",

        "Afiyet olsun hanımefendi, yine çok tatlısınız.",

        "Menüde olmayan ama masadaki en güzel şey sensin ♡"

    ];


    YEMEK_DOSYALARI.forEach(
        function(medya, index) {

            const siraNo =
                index + 1;

            const entry =
                document.createElement(
                    "article"
                );

            entry.className =
                "food-entry";

            const wrapper =
                document.createElement(
                    "div"
                );

            wrapper.className =
                "food-media-wrapper";


            if (
                medya.tip === "resim"
            ) {

                const image =
                    document.createElement(
                        "img"
                    );

                image.src =
                    medya.src;

                wrapper.appendChild(
                    image
                );

            }

            else {

                const label =
                    document.createElement(
                        "span"
                    );

                label.className =
                    "food-video-label";

                label.textContent =
                    "🎬 canlı kanıt";

                const video =
                    document.createElement(
                        "video"
                    );

                video.src =
                    medya.src;

                video.controls = true;
                video.playsInline = true;

                let muzikDurduruldu =
                    false;

                video.addEventListener(
                    "play",
                    function() {

                        muzikDurduruldu =
                            arkaPlanMuziginiDurdur();

                    }
                );

                video.addEventListener(
                    "ended",
                    function() {

                        if (
                            muzikDurduruldu
                        ) {

                            arkaPlanMuziginiDevamEttir();

                        }

                    }
                );

                wrapper.appendChild(
                    label
                );

                wrapper.appendChild(
                    video
                );

            }


            const ticket =
                document.createElement(
                    "div"
                );

            ticket.className =
                "food-ticket";

            const top =
                document.createElement(
                    "div"
                );

            top.className =
                "food-ticket-top";

            top.innerHTML =
                "<span>SİPARİŞ NO: "
                +
                String(siraNo).padStart(2, "0")
                +
                "</span><span>"
                +
                (
                    medya.tip === "video"
                        ? "KANIT: VİDEOLU"
                        : siraNo === 2
                            ? "DURUM: SÜT MOLASI"
                            : "DURUM: BİTİRİLDİ"
                )
                +
                "</span>";

            const title =
                document.createElement(
                    "h3"
                );

            const description =
                document.createElement(
                    "p"
                );


            if (
                siraNo === 2
            ) {

                title.textContent =
                    "Süt molası 🥛";

                description.textContent =
                    "Sütünü içerken de aşırı tatlısın hanımefendi ♡";

            }

            else if (
                siraNo === 14
            ) {

                title.textContent =
                    "Allah beni de yiyoru";

                description.textContent =
                    "Dünyanın en güzel ısırığı";

            }

            else if (
                medya.tip === "video"
            ) {

                title.textContent =
                    "Hareketli kanıt yakalandı 🎬";

                description.textContent =
                    "Fotoğraf yetmedi, bu anın hareketli kanıtı da varmış 😌";

            }

            else {

                title.textContent =
                    siraNo % 3 === 1
                        ? "Şefin özel seçimi ♡"
                        : siraNo % 3 === 2
                            ? "Yemek yerken yakalandın"
                            : "Menünün en tatlı kısmı";

                description.textContent =
                    yemekYazilari[
                        index %
                        yemekYazilari.length
                    ];

            }


            const rating =
                document.createElement(
                    "span"
                );

            rating.className =
                "food-rating";

            rating.textContent =
                "★★★★★";


            ticket.appendChild(top);
            ticket.appendChild(title);
            ticket.appendChild(description);
            ticket.appendChild(rating);

            entry.appendChild(wrapper);
            entry.appendChild(ticket);

            timeline.appendChild(entry);

        }
    );

}


/* ===================================================== */
/* VİDEO SORUSU */
/* ===================================================== */

const VIDEO_YILI = "2031";

let videoSorusuCozuldu = false;
let videoGalerisiOlusturuldu = false;


function videoBolumunuAc() {

    ekranAc(
        "videoEkrani"
    );

    if (
        videoSorusuCozuldu
    ) {

        document
            .getElementById(
                "videoQuestionWrapper"
            )
            .classList
            .add(
                "hidden"
            );

        document
            .getElementById(
                "videosArchive"
            )
            .classList
            .remove(
                "hidden"
            );

    }

    else {

        document
            .getElementById(
                "videoQuestionWrapper"
            )
            .classList
            .remove(
                "hidden"
            );

        document
            .getElementById(
                "videosArchive"
            )
            .classList
            .add(
                "hidden"
            );

    }

}


function videoYiliniKontrolEt() {

    const input =
        document.getElementById(
            "videoYearAnswer"
        );

    const mesaj =
        document.getElementById(
            "videoQuestionMessage"
        );

    if (
        input.value.trim() ===
        VIDEO_YILI
    ) {

        mesaj.textContent =
            "2031... Evimizde, birlikte. ♡";

        videoSorusuCozuldu = true;

        setTimeout(
            function() {

                document
                    .getElementById(
                        "videoQuestionWrapper"
                    )
                    .classList
                    .add(
                        "hidden"
                    );

                document
                    .getElementById(
                        "videosArchive"
                    )
                    .classList
                    .remove(
                        "hidden"
                    );

                if (
                    !videoGalerisiOlusturuldu
                ) {

                    videoGalerisiniOlustur();

                    videoGalerisiOlusturuldu =
                        true;

                }

            },

            900
        );

    }

    else {

        mesaj.textContent =
            "Yok yok, bizim evimize biraz daha yaklaş 👀♡";

    }

}


document
    .getElementById(
        "videoYearAnswer"
    )
    .addEventListener(
        "keydown",
        function(event) {

            if (
                event.key === "Enter"
            ) {

                videoYiliniKontrolEt();

            }

        }
    );


/* ===================================================== */
/* 26 VİDEO */
/* ===================================================== */

const VIDEO_SAYISI = 26;


const videolar =
    Array.from(
        {
            length: VIDEO_SAYISI
        },

        function(_, index) {

            return {

                src:
                    "videolar/video"
                    +
                    (
                        index + 1
                    )
                    +
                    ".mp4"

            };

        }
    );


let aktifVideoIndex = 0;

let modalVideoMuzigiDurdurdu =
    false;


const modalVideo =
    document.getElementById(
        "modalVideo"
    );


const videoModal =
    document.getElementById(
        "videoModal"
    );


function videoGalerisiniOlustur() {

    const gallery =
        document.getElementById(
            "videoGallery"
        );

    gallery.innerHTML = "";

    const titles = [

        "Bizden küçük bir sahne ♡",

        "Bu anı tekrar izleyelim",

        "Kameraya yakalanan biz",

        "Biraz hareketli anılar",

        "Bizim filmimizden ♡"

    ];


    videolar.forEach(
        function(videoBilgisi, index) {

            const card =
                document.createElement(
                    "article"
                );

            card.className =
                "video-card";


            const frame =
                document.createElement(
                    "div"
                );

            frame.className =
                "video-frame";


            const preview =
                document.createElement(
                    "video"
                );

            preview.className =
                "video-preview";

            preview.src =
                videoBilgisi.src;

            preview.muted = true;
            preview.playsInline = true;
            preview.preload = "metadata";


            preview.addEventListener(
                "loadedmetadata",
                function() {

                    try {

                        if (
                            preview.duration > 0.5
                        ) {

                            preview.currentTime =
                                0.35;

                        }

                    }

                    catch (error) {}

                }
            );


            const overlay =
                document.createElement(
                    "div"
                );

            overlay.className =
                "video-play-overlay";

            const play =
                document.createElement(
                    "div"
                );

            play.className =
                "video-play-button";

            play.textContent =
                "▶";

            overlay.appendChild(play);

            frame.appendChild(preview);
            frame.appendChild(overlay);


            const bottom =
                document.createElement(
                    "div"
                );

            bottom.className =
                "video-card-bottom";

            bottom.innerHTML =
                `
                <span class="video-card-number">
                    SAHNE ${String(index + 1).padStart(2, "0")}
                </span>

                <h3>
                    ${titles[index % titles.length]}
                </h3>

                <p>
                    İzlemek için dokun 🎬
                </p>
                `;


            card.appendChild(frame);
            card.appendChild(bottom);

            card.addEventListener(
                "click",
                function() {

                    videoAc(index);

                }
            );

            gallery.appendChild(card);

        }
    );

}


function videoAc(index) {

    aktifVideoIndex =
        index;

    videoModalGuncelle();

    videoModal.classList.remove(
        "hidden"
    );

    modalVideoMuzigiDurdurdu =
        arkaPlanMuziginiDurdur();

    modalVideo.play().catch(
        function() {}
    );

}


function videoModalGuncelle() {

    modalVideo.pause();

    modalVideo.src =
        videolar[
            aktifVideoIndex
        ].src;

    modalVideo.load();

    document
        .getElementById(
            "videoModalCounter"
        )
        .textContent =
        String(
            aktifVideoIndex + 1
        )
        .padStart(2, "0")
        +
        " / "
        +
        VIDEO_SAYISI;

    document
        .getElementById(
            "videoModalCaption"
        )
        .textContent =
        "Bizim filmimizden "
        +
        (
            aktifVideoIndex + 1
        )
        +
        ". sahne ♡";

}


function videoKapat(
    muzigiBaslat = true
) {

    if (!videoModal) {

        return;

    }

    const acik =
        !videoModal
            .classList
            .contains(
                "hidden"
            );

    modalVideo.pause();

    videoModal.classList.add(
        "hidden"
    );

    if (
        acik &&
        muzigiBaslat &&
        modalVideoMuzigiDurdurdu
    ) {

        arkaPlanMuziginiDevamEttir();

    }

    modalVideoMuzigiDurdurdu =
        false;

}


function sonrakiVideo() {

    aktifVideoIndex =
        (
            aktifVideoIndex + 1
        )
        %
        videolar.length;

    videoModalGuncelle();

    modalVideo.play().catch(
        function() {}
    );

}


function oncekiVideo() {

    aktifVideoIndex--;

    if (
        aktifVideoIndex < 0
    ) {

        aktifVideoIndex =
            videolar.length - 1;

    }

    videoModalGuncelle();

    modalVideo.play().catch(
        function() {}
    );

}


function videoBolumundenCik() {

    videoKapat();

    ekranAc(
        "menuEkrani"
    );

}


/* ===================================================== */
/* MEKTUP */
/* ===================================================== */

function mektupBolumunuAc() {

    document
        .getElementById(
            "envelopeArea"
        )
        .classList
        .remove(
            "hidden"
        );

    document
        .getElementById(
            "letterPaper"
        )
        .classList
        .add(
            "hidden"
        );

    ekranAc(
        "mektupEkrani"
    );

}


function mektubuAc() {

    document
        .getElementById(
            "envelopeArea"
        )
        .classList
        .add(
            "hidden"
        );

    document
        .getElementById(
            "letterPaper"
        )
        .classList
        .remove(
            "hidden"
        );

    document
        .getElementById(
            "mektupEkrani"
        )
        .scrollTo({
            top: 0,
            behavior: "smooth"
        });

}


/* ===================================================== */
/* FOTOĞRAF YAZILARI */
/* ===================================================== */

const KARE_SAYISI = 30;


const fotografYazilari = [

    "Seninle olan her anı seviyorum ♡",

    "Tilki tavşan fotoğrafımız(tesadüfen).",

    "Omzum > senin için yaratılmış.",

    "Elini böyle koyuşuna bayılıyorum. Kalbim ♡",

    "En güzel dondurma",

    "1+1=11 ♡",

    "Aynaları güzelleştiriyoruz sayende",

    "Adam: Çok yakışıyorsunuz + Biz: Biliyoruz",

    "ŞU ŞEKERLİK NEDİR!!!",

    "En güzel söz ♡",

    "Her yaşında elinden böyle tutacağım aşkım",

    "Sen,ben ve harikalaştırdığımız Galata kulesi ",

    "Birlikte olduğumuz her gün çok güzel.",

    "Yanaklarına doyamıyorum hep böyle öpeceğim ♡",

    "Yanında zaman başka akıyor.",

    "En güzel açı biziz bebeğim",

    "Biz olmak çok güzel ♡",

    "Dünyanın en güzeli ♡. Başkan hanım!!!",

    "Fotoğrafın sesi oluyormuş sayende öğrendim bitanemm",

    "Her şeyin başlangıcı ♡",

    "En güzel hediyesin. Ömrümm ♡",

    "Biraz da dinlenmece",

    "İyi ki varsın. Hep ol ♡",

    "İlk tren yolculuğumuzz. Seninle olmak çok güzel bebeğim ♡",

    "Birlikte daha nice yerlere.",

    "Seninle her şey daha güzel.",

    "Her fotoğrafın arkasında başka bir hikâyemiz var.",

    "Gülüşümüz hep böyle kalsın ruhum.",

    "Daha yaşayacağımız çok şey var.",

    "Ve bunlar daha başlangıç... Seni çok seviyorum karım ♡"

];


const arkaYazilari = [

    "Bu fotoğrafa baktığımda aklıma ilk gelen şey, seninle geçirdiğim zamanın ne kadar hızlı aktığı. Yanındayken saatlerin biraz daha yavaş geçmesini isterdim. Ve tabiki ilk filmimizi izlemiştik. O anı hatırlamak bana çok güzel hissettiriyor.",

    "Sanırım sende en sevdiğim şeylerden biri bu: yanında özel bir şey yapmamıza gerek yok. Senin şu tatlılığın anı özel hâle getiriyor bebeğim. ",

    "Seninle her başarıyı kutlamak istiyorum bebeğim. Seninle gurur duyuyorum. Her zaman yanında olacağım. Daha nice terfi kutlaması yapıp pastaları yicez birlikte aşkım.",

    "Eskişehire bir anda gitmemiz zaten aşırı iyiydi. Ama ondan daha iyi olanda bu fotoğraftır bence gerçekten geleceğimiz biz harikayız aşkım ileride çocuklarımıza göstereceğimiz harika anılarımızdan biri. (Bir sır, annem karı koca gibi çıkmışsınız demişti) Öyleyiz zaten ♡",

    "Evimiz için magnet ve kupa aldıktan sonra sevgilimin ısmarladığı harika dondurmayı yerken bir kez daha sana ne kadar aşık olduğumu hatırlıyorum.",

    "Mesela bu sözü seni tanıyana kadar bilmiyordum. Seninle öğrendim ve hissettim. O kadar hoş ki biz olmak birbirimizi tamamlamak. Kırmızı ip olayı gerçek aşkım ve biz olma keyfini seninle bir ömür tatma vakti.",

    "Sokaktaki aynaların bu kadar güzel olabileceğini düşünmezdim. Aaa çünkü sen varsın aynada ondan bu kadar güzell ♡",

    "Aşkım gerçekten aşırı iyi olay değil mi. Tanıdağımız insanlar bizi gördükleri gibi gülümseyip samimi bir şekilde çok yakışıyorsunuz diyor ve bizi sadece görüp bunu hissediyorlar. Sanırım birbirimiz için yaratıldığımız çok belli ♡",

    "Kahve içerken seninle sohbet etmek, kahve içmekten daha güzel oluyor. Bir de geçen küçük çocukların bakışları çok komikti. Sunum tepsisi zaten yani maşallah oradaki aynayı bile güzelleştirdin. Şu kadar tatlı olman bir de bayılıyorum ya aşkımm.",

    "Biliyor musun hiç unutmayacağım o ilk evet diyişin. Sonrasında tabi birkaç kez dedik ama bunun yeri hissettirdiği bende çok farklı aşkım. Eminim senin içinde öyledir, yani resmen içimden bir anda sormak geldi ve senin sonra evet yazışın. Seni çok seviyorum ömrüm ♡",

    "Aşkım evli çiftler böyle yüzüğünü gösteriyor demiştin ya işte bizde öyleyiz. Ama seninle evlenmek için birazcık zamanımız var. O yüzden şimdilik bu fotoğrafı hatıra olarak saklıyorum. Evlenince de gidip çekeriz ♡",

    "Bir gün bu fotoğraflara yıllar sonra tekrar baktığımızı düşünmek hoşuma gidiyor. Bir de yani nasıl bir anda fotoğraf çekilip bu kadar harika bir açı çıkabiliyor ki nedir bu yetenek kadın, aşırı iyisin her konuda yetenekli olman hoşuma gidiyor.",

    "Denizin kenarı ve biz. Güneşin bile senin ışığının yanında sönük kalması, çok güzelsin aşkım.",

    "Etrafımızın aşırı kalabalık olduğu bir anda seninle birlikte olmanın verdiği huzur ve güven hissi bambaşka. Sadece sana odaklanıyorum ve ıspartaya gidicen diye o kadar çok öpmüştüm ki seni hiçbiri de yetmedi o yüzden hemen seni öpmeliyim aşkımm.",

    "Huzur dediğimiz şey bir yer olmayabilir. Bazen bir insan olabiliyor. Uzak mesafe bize bir şeyler katıyor ve bir gün evimizde yanyana olmanın tadını daha iyi anlamamızı sağlamış olacak.",

    "Fotoğrafı çekerken ne kadar eğlenmiştik, ağaca benim telefonu sabitleyişimiz, poz verirken seni böyle içime çekmek istemem sonra dayanamayıp kucağımda döndürmem ve o gülüşün neşemiz, çok güzeliz yavrum ♡",

    "Evet Onur Hocam, gene biz çalışıyoruz işte çünkü bir hayat kuracağız. Her sınav öncesi buradaysak nolmuş yani. Karım da ne kadar güzel çıkmış, gerçekten odağım dağıldı bakarken ♡",

    "Yani en çok eğlendiğim slayt anı, tamam yalan yok beklerken sınav yorgunluğundan azıcık uyudum ama dinlerken seni daha da hayran oldum. Soru cevaplarımız aşkım yoruldum diyip gelip sarılman sonrasında pes etmeyip en iyi şekilde hazırlanman. VE BAŞKANLIĞI KAPMIŞ OLMAN. Aşkım gerçekten seninle çok gurur duyuyorum. Daha nice başarılara birlikte inş ömrüm",

    "Ne kadar istediysem sana sürpriz doğum günü hazırlama ve seni yazın görme fırsatını yakaladık aşkım. Aşırı güzeldi tekrardan teşekkür ederim. Bir de hediye daha yok sandın de mi. Her zaman sana bir sürü sürpriz yapıcam yavrum ♡",

    "Bu sitede otuz fotoğraf var ama seni sevdiğim otuz sebebi seçmek çok daha zor olurdu. Çünkü nereden başlayacağımı bilemezdim. Ama bu fotoğraf başlangıcı çok güzel hatırlatıyor, hayatımda hep olacak karımla ilk konserimiz çıkmaya başladığımız gün ve harika duygular. Daha bir sürü biriktireceğiz aşkım ♡ (Gıdığın da yok bi kere)",

    "Bu kadar güzel bir doğum günü geçireceğimi hiç düşünmezdim. Hatta hayatımdaki en güzel hediyeyle tanışacağımı da hiç düşünmezdim. Senin sayende gerçek oldu bunlar aşkım, iyi ki varsın hep ol. Bende inş sana böyle güzel bir doğum günü yaşatabilmişimdir yavrum ♡ ",

    "Ya omzuma kafanı koyup ders dinlemen nasıl bu kadar harika hissettiriyor ki baksana ne kadar gülmüşüm sayende ne kadar mutluyum harikasın aşkım ♡",

    "Gitar çalarken sana sarılmak öpmek o güzel sesinle düet yaptığımız zaman, birlikte voleybol oynayışımız futbolda harika defans yeteneğin. Bir günde ne kadar güzel aktiviteler yapmışız ve her an aklımda biliyor musun aşkım özellikle can ozanı söylerken bakışların gülümsemen ne kadar ses olursa olsun senin sesini duyunca diğer sesler yok oluyor. Bandana da çok yakışmış hanımefendi, bir de gülüşün içimi ısıttı aşkım.",

    "İlk tren yolculuğumuz ve harikaydı. Sabah ucu ucuna yetişmemiz sonrasında yaslanıp uyuman öpüşmelerimiz, gerçekten anı güzelleştiriyorsun ve varlığın yetiyor bunun için canım aşkım",

    "Sevgilimin başarıyla görevini yaptığı harika etkinlik ve ileride okulumuza konuşmacı olarak geldiğimizde anlatacağımız bir anımız daha, o zamanlarda da konuşmacı olarak evli kişiler gelmişti bizde geleneği devam ettiriyor olacağız. Ve biz daha iyiyiz. Genç ailesi",

    "Bu fotoğrafın güzel olmasının sebebi ışığı ya da açısı değil bence. İçinde sen varsın,  biz varız.",

    "Ev alışverişi provası yaptığımız zaman, tabi bizim harika zevkimiz yanında bunlar dandikti. Çok şükür ki ileride senle gerekirse kendimiz yaptırcaz ev eşyalarımızı. Ha bi de tabiki aklımda bir köşeyi istediğin gibi dizayn edeceksin ♡",

    "Kadıköyün deli gibi esen rüzgarında rastgele bir bankta oturup ettiğimiz güzel sohbet sonrası sevgilimin bildiği harika mekanda içimiz ısınarak sohbete devam ettik. Ve bu fotoğraf harika aşkım.",

    "Benimle duyduğun gurur ve övgün aşırı hoş, gerçekten sayende kendimi daha da iyi hissediyorum aşkım",

    "Dudaklarını anlatmasam olmazdı tabiki, bana bulunduğumuz yeri unutturan doyamadığım ve huzur veren o harika yumuşak saatlerce öptüğüm dudakların. Çok seviyorum. Hep böyle güzel öpüşelim canım aşkım. Seni her şeyden çok seviyorum ruhum, yavrum, karım ♡"

];


const fotograflar =
    Array.from(
        {
            length: KARE_SAYISI
        },

        function(_, index) {

            return {

                src:
                    "images/kareler"
                    +
                    (
                        index + 1
                    )
                    +
                    ".jpg",

                yazi:
                    fotografYazilari[index],

                arka:
                    arkaYazilari[index]

            };

        }
    );


/* ===================================================== */
/* FOTOĞRAF GALERİSİ */
/* ===================================================== */

function galeriyiOlustur() {

    const gallery =
        document.getElementById(
            "polaroidGallery"
        );

    gallery.innerHTML = "";

    fotograflar.forEach(
        function(fotograf, index) {

            const card =
                document.createElement(
                    "article"
                );

            card.className =
                "scrap-card angle-"
                +
                (
                    index % 6 + 1
                );


            const inner =
                document.createElement(
                    "div"
                );

            inner.className =
                "scrap-inner";


            inner.addEventListener(
                "click",
                function(event) {

                    if (
                        event.target.closest(
                            "button"
                        )
                    ) {

                        return;

                    }

                    card.classList.toggle(
                        "flipped"
                    );

                }
            );


            const front =
                document.createElement(
                    "div"
                );

            front.className =
                "scrap-front";

            front.innerHTML =
                `
                <img
                    src="${fotograf.src}"
                    alt="Bizden Kare ${index + 1}"
                    loading="lazy"
                >

                <p class="scrap-caption">
                    ${fotograf.yazi}
                </p>

                <p class="flip-hint">
                    bu karenin arkasında bir şey var ♡
                </p>

                <span class="scrap-number">
                    ${String(index + 1).padStart(2, "0")}
                </span>
                `;


            const openButton =
                document.createElement(
                    "button"
                );

            openButton.className =
                "open-photo-button";

            openButton.textContent =
                "Fotoğrafı aç ↗";

            openButton.onclick =
                function(event) {

                    event.stopPropagation();

                    fotografAc(index);

                };

            front.appendChild(
                openButton
            );


            const back =
                document.createElement(
                    "div"
                );

            back.className =
                "scrap-back";

            back.innerHTML =
                `
                <span class="back-small">
                    Sana küçük bir not
                </span>

                <h4>
                    Bu kare bana şunu düşündürüyor...
                </h4>

                <p class="back-message"></p>

                <div class="back-heart">
                    ♡
                </div>
                `;

            back.querySelector(
                ".back-message"
            )
            .textContent =
                fotograf.arka;


            const geri =
                document.createElement(
                    "button"
                );

            geri.className =
                "turn-back-button";

            geri.textContent =
                "Fotoğrafa dön ↶";

            geri.onclick =
                function(event) {

                    event.stopPropagation();

                    card.classList.remove(
                        "flipped"
                    );

                };

            back.appendChild(
                geri
            );


            inner.appendChild(front);
            inner.appendChild(back);
            card.appendChild(inner);
            gallery.appendChild(card);

        }
    );

}


galeriyiOlustur();


/* ===================================================== */
/* FOTOĞRAF MODAL */
/* ===================================================== */

let aktifFotograf = 0;


const photoModal =
    document.getElementById(
        "photoModal"
    );


function fotografAc(index) {

    aktifFotograf =
        index;

    modalFotografiGuncelle();

    photoModal.classList.remove(
        "hidden"
    );

}


function fotografKapat() {

    if (photoModal) {

        photoModal.classList.add(
            "hidden"
        );

    }

}


function modalFotografiGuncelle() {

    document
        .getElementById(
            "modalPhoto"
        )
        .src =
        fotograflar[
            aktifFotograf
        ].src;

    document
        .getElementById(
            "modalCaption"
        )
        .textContent =
        fotograflar[
            aktifFotograf
        ].yazi;

    document
        .getElementById(
            "photoCounter"
        )
        .textContent =
        (
            aktifFotograf + 1
        )
        +
        " / "
        +
        fotograflar.length;

}


function sonrakiFotograf() {

    aktifFotograf =
        (
            aktifFotograf + 1
        )
        %
        fotograflar.length;

    modalFotografiGuncelle();

}


function oncekiFotograf() {

    aktifFotograf--;

    if (
        aktifFotograf < 0
    ) {

        aktifFotograf =
            fotograflar.length - 1;

    }

    modalFotografiGuncelle();

}


/* ===================================================== */
/* KLAVYE */
/* ===================================================== */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            !photoModal.classList.contains(
                "hidden"
            )
        ) {

            if (
                event.key === "ArrowRight"
            ) {

                sonrakiFotograf();

            }

            if (
                event.key === "ArrowLeft"
            ) {

                oncekiFotograf();

            }

            if (
                event.key === "Escape"
            ) {

                fotografKapat();

            }

            return;

        }


        if (
            !videoModal.classList.contains(
                "hidden"
            )
        ) {

            if (
                event.key === "ArrowRight"
            ) {

                sonrakiVideo();

            }

            if (
                event.key === "ArrowLeft"
            ) {

                oncekiVideo();

            }

            if (
                event.key === "Escape"
            ) {

                videoKapat();

            }

        }

    }
);


/* ===================================================== */
/* FOTOĞRAF NOTU */
/* ===================================================== */

const notAlani =
    document.getElementById(
        "seninNotun"
    );


const kayitliNot =
    localStorage.getItem(
        "bizimDunyamizNotu"
    );


if (kayitliNot) {

    notAlani.value =
        kayitliNot;

    karakterSay();

}


function karakterSay() {

    document
        .getElementById(
            "karakterSayaci"
        )
        .textContent =
        notAlani.value.length
        +
        " / 600";

}


function notuKaydet() {

    const not =
        notAlani.value.trim();

    const durum =
        document.getElementById(
            "notDurumu"
        );

    if (!not) {

        durum.textContent =
            "Önce bana minicik de olsa bir şey yaz ♡";

        return;

    }

    localStorage.setItem(
        "bizimDunyamizNotu",
        not
    );

    durum.textContent =
        "Bunu burada sakladım ♡";

}