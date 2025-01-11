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