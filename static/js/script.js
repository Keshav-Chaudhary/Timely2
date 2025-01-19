// Function to show modal
function showModal(subject, professor, prof_hours, ta_name, ta_hours, grading_component) {
    document.getElementById("professorName").textContent = professor;
    document.getElementById("professorHours").textContent = prof_hours;
    document.getElementById("taName").textContent = ta_name;
    document.getElementById("taHours").textContent = ta_hours;
    document.getElementById("gradingComponent").textContent = grading_component;

    const modal = document.getElementById("infoModal");
    modal.classList.remove('hidden');
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
}
// Function to close modal
function closeModal() {
    const modal = document.getElementById("infoModal");
    modal.classList.remove('show');
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 500); 
}
// Function to toggle mobile menu
function toggleMenu() {
    const menu = document.getElementById("mobile-menu");
    const icon = document.getElementById("hamburger-icon");

    menu.classList.toggle("hidden");
    icon.classList.toggle("rotate-180");
}
function filterClasses() {
    const filterValue = document.getElementById('statusFilter').value;
    const classItems = document.querySelectorAll('.class-item');

    classItems.forEach(classItem => {
        const classStatus = classItem.getAttribute('data-status');

        if (filterValue === 'all' || classStatus === filterValue) {
            classItem.style.display = 'block';
        } else {
            classItem.style.display = 'none';
        }
    });
}
//toggle filter
function toggleFilter() {
    const mobileFilter = document.getElementById('mobileFilterDropdown');
    mobileFilter.classList.toggle('hidden');
}
// func to show suggestions
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
function showSuggestions(input) {
    const suggestionsBox = document.getElementById('suggestions');
    suggestionsBox.innerHTML = '';
    suggestionsBox.classList.add('hidden');

    if (input.length > 0) {
        const matches = days.filter(day => day.toLowerCase().startsWith(input.toLowerCase()));
        
        if (matches.length > 0) {
            matches.forEach(match => {
                const li = document.createElement('li');
                li.textContent = match;
                li.className = 'px-4 py-2 hover:bg-gray-600 cursor-pointer';
                li.onclick = function () {
                    document.getElementById('day-input').value = match;
                    suggestionsBox.classList.add('hidden');
                };
                suggestionsBox.appendChild(li);
            });
            suggestionsBox.classList.remove('hidden');
        }
    }
}

// Hide suggestions
document.addEventListener('click', (e) => {
    const suggestionsBox = document.getElementById('suggestions');
    if (!document.getElementById('day-input').contains(e.target)) {
        suggestionsBox.classList.add('hidden');
    }
});

// Added event listener to Preview Tommorow Classes
document.addEventListener("DOMContentLoaded", function() {
    const previewBtn = document.getElementById("preview-btn");
    const classSchedule = document.getElementById("class-schedule");

    previewBtn.addEventListener("click", function() {
        classSchedule.classList.toggle("hidden");
        if (classSchedule.classList.contains("hidden")) {
            previewBtn.textContent = "Preview";
        } else {
            previewBtn.textContent = "Hide";
        }
    });
});

//new
//qr scanner
document.addEventListener("DOMContentLoaded", () => {
    console.log("Script loaded and DOM is ready.");
    const video = document.getElementById("qr-video");
    const resultDiv = document.getElementById("result");
    const startScanBtn = document.getElementById("start-scan");
    const stopScanBtn = document.getElementById("stop-scan");
    const copyResultBtn = document.getElementById("copy-result");
    const clearResultBtn = document.getElementById("clear-result");
    const loadingDiv = document.getElementById("loading");
    let scanning = false;
    
    const startScan = async () => {
        try {
            console.log("Attempting to access camera...");
            loadingDiv.classList.remove("hidden");
    
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                throw new Error("Camera access is not supported in this browser.");
            }
    
            const stream = await navigator.mediaDevices.getUserMedia({ 
                video: { facingMode: "environment" }
            });
    
            console.log("Camera access granted.");
            loadingDiv.classList.add("hidden");
    
            video.srcObject = stream;
            video.setAttribute("playsinline", true); 
            video.play();
    
            startScanBtn.classList.add("hidden");
            stopScanBtn.classList.remove("hidden");
    
            scanning = true;
            requestAnimationFrame(scan);
        } catch (err) {
            console.error("Error accessing camera: ", err);
            resultDiv.innerText = "Error accessing camera. Please ensure camera permissions are granted.";
            loadingDiv.classList.add("hidden");
        }
    };
    const scan = () => {
        if (!scanning) return;
    
        if (video.readyState === video.HAVE_ENOUGH_DATA) {
            const canvas = document.createElement("canvas");
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const context = canvas.getContext("2d");
    
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    
            const code = jsQR(imageData.data, imageData.width, imageData.height, {
                inversionAttempts: "dontInvert",
            });
    
            if (code) {
                console.log("QR Code detected:", code.data);
                displayResult(code.data);
                stopScan();
            } else {
                requestAnimationFrame(scan);
            }
        } else {
            requestAnimationFrame(scan);
        }
    };
    
    const stopScan = () => {
        scanning = false;
        if (video.srcObject) {
            video.srcObject.getTracks().forEach(track => track.stop());
        }
        startScanBtn.classList.remove("hidden");
        stopScanBtn.classList.add("hidden");
    };
    
    const displayResult = (result) => {
        resultDiv.innerHTML = `
            <a href="${result}" class="text-blue-400 hover:text-blue-300 transition-colors duration-300 flex items-center justify-center" target="_blank">
                <i class="fas fa-link mr-2"></i> Click Here
            </a>
        `;
        copyResultBtn.classList.remove("hidden");
        clearResultBtn.classList.remove("hidden");
    };
    
    copyResultBtn.addEventListener("click", () => {
        const resultText = resultDiv.querySelector("a").href;
        navigator.clipboard.writeText(resultText).then(() => {
            alert("Result copied to clipboard!");
        }).catch(err => {
            console.error("Error copying to clipboard: ", err);
        });
    });
    
    clearResultBtn.addEventListener("click", () => {
        resultDiv.innerText = "";
        copyResultBtn.classList.add("hidden");
        clearResultBtn.classList.add("hidden");
    });
    
    document.getElementById('qr-image-input').addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement("canvas");
                    canvas.width = img.width;
                    canvas.height = img.height;
                    const context = canvas.getContext("2d");
                    context.drawImage(img, 0, 0, canvas.width, canvas.height);
    
                    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
                    const code = jsQR(imageData.data, imageData.width, imageData.height, {
                        inversionAttempts: "dontInvert",
                    });
    
                    if (code) {
                        console.log("QR Code detected in image:", code.data);
                        displayResult(code.data);
                    } else {
                        resultDiv.innerText = "No QR code found in the image.";
                    }
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
    startScanBtn.addEventListener("click", startScan);
    stopScanBtn.addEventListener("click", stopScan);    
});
