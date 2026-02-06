const inputBox = document.getElementById("input-box");
const categorySelect = document.getElementById("category-select");
const deadlineInput = document.getElementById("deadline-input");
const listContainer = document.getElementById("list-container");
const progressBar = document.getElementById("progress-bar");
const progressText = document.getElementById("progress-text");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = 'all';

function escapeHtml(text) {
    if (!text) return "";
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function saveLocal() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
    updateProgress();
}

function addTask() {
    const text = inputBox.value.trim();
    const category = categorySelect.value;
    const date = deadlineInput.value;

    if (text === '') {
        alert("豪稍奈想做特额事体落笔");
        return;
    }

    tasks.push({
        text: text,
        category: category,
        deadline: date,
        completed: false
    });

    inputBox.value = "";
    deadlineInput.value = "";
    saveLocal();
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveLocal();
}

function deleteTask(index, event) {
    event.stopPropagation();
    if(confirm("格章事体真额做特了伐?")) {
        tasks.splice(index, 1);
        saveLocal();
    }
}

function editTask(index, event) {
    event.stopPropagation();
    const newText = prompt("改一记:", tasks[index].text);
    if (newText !== null && newText.trim() !== "") {
        tasks[index].text = newText.trim();
        saveLocal();
    }
}

function formatDate(dateString) {
    if (!dateString) return "";
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('chs-CN');
}

function isLate(dateString, isCompleted) {
    if (!dateString || isCompleted) return false;
    const today = new Date();
    today.setHours(0,0,0,0);
    const taskDate = new Date(dateString + 'T00:00:00');
    return taskDate < today;
}

function filterTasks(status) {
    currentFilter = status;
    document.querySelectorAll('.filters span').forEach(span => span.classList.remove('active'));
    document.getElementById(`filter-${status}`).classList.add('active');
    renderTasks();
}

function renderTasks() {
    listContainer.innerHTML = "";

    tasks.forEach((task, index) => {
        if (currentFilter === 'pending' && task.completed) return;
        if (currentFilter === 'completed' && !task.completed) return;

        if (!task.category) task.category = "Pessoal";

        const lateClass = isLate(task.deadline, task.completed) ? "late" : "";
        const lateText = lateClass ? "(摸鬼!)" : "";
        const displayDate = task.deadline ? `📅 ${formatDate(task.deadline)} ${lateText}` : "";

        const li = document.createElement("li");
        if (task.completed) li.classList.add("checked");

        li.innerHTML = `
            <div class="icon-check" onclick="toggleTask(${index})"></div>
            
            <div class="task-content" onclick="toggleTask(${index})">
                <span class="task-text">
                    <span class="badge cat-${task.category.toLowerCase()}">${task.category}</span>
                    ${escapeHtml(task.text)}
                </span>
                <span class="task-date ${lateClass}">${displayDate}</span>
            </div>

            <div class="actions">
                <span onclick="editTask(${index}, event)">✎</span>
                <span onclick="deleteTask(${index}, event)">✕</span>
            </div>
        `;

        listContainer.appendChild(li);
    });

    if(tasks.length === 0) {
        listContainer.innerHTML = `
            <div class="empty-state">
                <span>🎉</span>
                <p>奈啦啦嘻嘻弄清爽!</p>
                <small>格记酷伊做莽了.</small>
            </div>
        `;
    }
}

function updateProgress() {
    if (tasks.length === 0) {
        progressBar.style.width = "0%";
        progressText.innerText = "0% 做特了";
        progressBar.classList.remove("victory");
        progressText.classList.remove("victory");
        return;
    }
    
    const completedCount = tasks.filter(t => t.completed).length;
    const percent = Math.round((completedCount / tasks.length) * 100);
    
    progressBar.style.width = percent + "%";
    progressText.innerText = percent + "% Concluído";

    if (percent === 100) {
        progressBar.classList.add("victory");
        progressText.classList.add("victory");
        progressText.innerText = "100% 做特 - 截棍! 🎉";
    } else {
        progressBar.classList.remove("victory");
        progressText.classList.remove("victory");
    }
}

function exportTasks() {
    if(tasks.length === 0) {
        alert("Lista vazia!");
        return;
    }
    const dataStr = JSON.stringify(tasks);
    const blob = new Blob([dataStr], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "backup_tarefas.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function importTasks(input) {
    const file = input.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const imported = JSON.parse(e.target.result);
            if(Array.isArray(imported)) {
                if(confirm("调成backup?")) {
                    tasks = imported;
                    saveLocal();
                    alert("恢复了!");
                }
            } else {
                alert("格文集无效");
            }
        } catch (err) {
            alert("读写错误.");
        }
    };
    reader.readAsText(file);
    input.value = '';
}

inputBox.addEventListener("keypress", function(e) {
    if (e.key === "Enter") addTask();
});

renderTasks();
updateProgress();
