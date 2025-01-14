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

//new
// Add event listener to the input field of Preview Tommorow Classes
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