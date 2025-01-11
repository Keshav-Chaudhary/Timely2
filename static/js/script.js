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
// Function to filter classes
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

//for sugestions
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
//for sugestions
document.addEventListener('click', (e) => {
    const suggestionsBox = document.getElementById('suggestions');
    if (!document.getElementById('day-input').contains(e.target)) {
        suggestionsBox.classList.add('hidden');
    }
});