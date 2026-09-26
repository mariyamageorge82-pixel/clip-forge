let selectedQuality = "720p";
let downloadTimer = null;


// ================================
// ANALYZE URL
// ================================

function analyzeVideo() {

    const input = document.getElementById("videoUrl");
    const url = input.value.trim();

    // Empty URL
    if (!url) {
        showToast("Please paste a video URL first.");
        input.focus();
        return;
    }

    // Check URL format
    let parsedURL;

    try {
        parsedURL = new URL(url);
    } catch {
        showToast("❌ Invalid URL.");
        return;
    }

    // Only allow HTTP/HTTPS
    if (
        parsedURL.protocol !== "http:" &&
        parsedURL.protocol !== "https:"
    ) {
        showToast("❌ Only HTTP and HTTPS URLs are supported.");
        return;
    }

    const resultCard = document.getElementById("resultCard");

    document.getElementById("videoUrlText").textContent = url;

    document.getElementById("videoTitle").textContent =
        "Video ready to process";

    resultCard.style.display = "block";

    resultCard.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

    showToast("✓ URL looks valid.");
}


// ================================
// QUALITY SELECTION
// ================================

function selectQuality(button) {

    document.querySelectorAll(".quality").forEach(btn => {
        btn.classList.remove("active");
    });

    button.classList.add("active");

    selectedQuality = button.dataset.quality;

    document.getElementById("selectedQuality").textContent =
        selectedQuality;
}


// ================================
// PRO QUALITY
// ================================

function showProMessage() {

    showToast("🔒 This quality requires ClipForge Pro.");
}


// ================================
// DOWNLOAD
// ================================

function downloadVideo() {

    const input = document.getElementById("videoUrl");
    const url = input.value.trim();

    // Don't download if empty
    if (!url) {
        showToast("❌ Paste a video URL first.");
        return;
    }

    // Validate URL again
    let parsedURL;

    try {
        parsedURL = new URL(url);
    } catch {
        showToast("❌ Invalid URL. Download cancelled.");
        return;
    }

    // Protocol check
    if (
        parsedURL.protocol !== "http:" &&
        parsedURL.protocol !== "https:"
    ) {
        showToast("❌ Invalid video URL.");
        return;
    }

    // Prevent multiple downloads
    if (downloadTimer) {
        showToast("A download is already running.");
        return;
    }

    startDownloadAnimation();
}


// ================================
// DOWNLOAD ANIMATION
// ================================

function startDownloadAnimation() {

    const resultCard = document.getElementById("resultCard");

    const downloadButton =
        document.querySelector(".download-button");

    // Disable button
    downloadButton.disabled = true;

    downloadButton.innerHTML = `
        <span>↓</span>
        Downloading...
    `;

    // Create progress UI
    const progressContainer =
        document.createElement("div");

    progressContainer.className = "download-progress";

    progressContainer.innerHTML = `
        <div class="progress-top">
            <span>Downloading</span>
            <strong id="downloadPercent">0%</strong>
        </div>

        <div class="progress-track">
            <div
                class="progress-bar"
                id="progressBar"
            ></div>
        </div>

        <div class="progress-status" id="downloadStatus">
            Preparing download...
        </div>
    `;

    resultCard.appendChild(progressContainer);


    let progress = 0;

    const progressBar =
        document.getElementById("progressBar");

    const percentText =
        document.getElementById("downloadPercent");

    const statusText =
        document.getElementById("downloadStatus");


    downloadTimer = setInterval(() => {

        // Random small progress
        progress += Math.floor(Math.random() * 8) + 2;

        if (progress >= 100) {
            progress = 100;
        }

        progressBar.style.width = `${progress}%`;

        percentText.textContent = `${progress}%`;


        // Status messages
        if (progress < 25) {

            statusText.textContent =
                "Connecting to video source...";

        } else if (progress < 50) {

            statusText.textContent =
                "Preparing video...";

        } else if (progress < 75) {

            statusText.textContent =
                `Processing ${selectedQuality}...`;

        } else if (progress < 100) {

            statusText.textContent =
                "Finishing download...";

        } else {

            statusText.textContent =
                "✓ Download complete!";

            downloadButton.disabled = false;

            downloadButton.innerHTML = `
                <span>✓</span>
                Download Complete
            `;

            clearInterval(downloadTimer);

            downloadTimer = null;

            showToast("✓ Download complete!");

            setTimeout(() => {

                downloadButton.innerHTML = `
                    <span>↓</span>
                    Download ${selectedQuality}
                `;

                progressContainer.remove();

            }, 2500);
        }

    }, 350);
}


// ================================
// DONATE
// ================================

function donate() {

    showToast("❤️ Donation system coming soon.");
}


// ================================
// PRO
// ================================

function showComingSoon() {

    showToast("ClipForge Pro payments are coming soon.");
}


// ================================
// NAVIGATION
// ================================

function scrollToPricing() {

    document.getElementById("pricing").scrollIntoView({
        behavior: "smooth"
    });
}


// ================================
// TOAST
// ================================

function showToast(message) {

    const toast = document.getElementById("toast");

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(window.toastTimeout);

    window.toastTimeout = setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);
}


// ================================
// ENTER KEY
// ================================

document
    .getElementById("videoUrl")
    .addEventListener("keydown", function(event) {

        if (event.key === "Enter") {
            analyzeVideo();
        }

    });