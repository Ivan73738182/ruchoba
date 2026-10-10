// Структура предметов и заданий
const subjects = [
    {
        id: 'math',
        name: 'Математика',
        icon: '📐',
        tasks: [
            { id: 1, question: 'Найдите значение: 2 + 2 × 2', answers: [
                { text: '4', correct: false }, { text: '6', correct: true },
                { text: '8', correct: false }, { text: '2', correct: false } ] },
            { id: 2, question: 'Сколько будет 7 × 8?', answers: [
                { text: '48', correct: false }, { text: '54', correct: false },
                { text: '56', correct: true }, { text: '64', correct: false } ] }
        ]
    },
    {
        id: 'rus',
        name: 'Русский язык',
        icon: '📖',
        tasks: [
            { id: 1, question: 'Сколько букв в слове «РУчеба»?', answers: [
                { text: '5', correct: false }, { text: '6', correct: true },
                { text: '7', correct: false }, { text: '4', correct: false } ] }
        ]
    },
    {
        id: 'world',
        name: 'Окружающий мир',
        icon: '🌍',
        tasks: [
            { id: 1, question: 'Какая планета ближе всего к Солнцу?', answers: [
                { text: 'Венера', correct: false }, { text: 'Меркурий', correct: true },
                { text: 'Марс', correct: false }, { text: 'Земля', correct: false } ] }
        ]
    }
];

let user = JSON.parse(localStorage.getItem('ruchoba-user') || 'null');
let progress = JSON.parse(localStorage.getItem('ruchoba-progress') || '{}');

// === Всё делаем после загрузки страницы ===
window.addEventListener('load', () => {
    console.log('РУчеба: скрипт загружен');

    const welcomeScreen = document.getElementById('welcome-screen');
    const subjectsScreen = document.getElementById('subjects-screen');
    const tasksScreen = document.getElementById('tasks-screen');
    const taskScreen = document.getElementById('task-screen');

    const startBtn = document.getElementById('startBtn');
    const classSelect = document.getElementById('classSelect');
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const formError = document.getElementById('formError');

    let currentSubject = null;
    let selectedGender = '';

    // === Обработчики кнопок пола ===
    const genderBtns = document.querySelectorAll('.gender-btn');
    console.log('Найдено кнопок пола:', genderBtns.length);

    genderBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            genderBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedGender = btn.dataset.gender;
            console.log('Выбран пол:', selectedGender);
        });
    });

    // === Экраны ===
    function showWelcome() {
        welcomeScreen.style.display = 'block';
        subjectsScreen.style.display = 'none';
        tasksScreen.style.display = 'none';
        taskScreen.style.display = 'none';
    }

    function showSubjects() {
        welcomeScreen.style.display = 'none';
        subjectsScreen.style.display = 'block';
        tasksScreen.style.display = 'none';
        taskScreen.style.display = 'none';

        const greeting = document.getElementById('greeting');
        if (greeting) {
            greeting.textContent = `Привет, ${user.firstName}! Ты в ${user.grade} классе.`;
        }
        renderSubjects();
    }

    // === Кнопка «Начать учиться» ===
    startBtn.addEventListener('click', () => {
        console.log('Кнопка нажата');
        const grade = classSelect.value;
        const fName = firstName.value.trim();
        const lName = lastName.value.trim();

        console.log('Данные:', { grade, fName, lName, selectedGender });

        if (!grade || !fName || !lName || !selectedGender) {
            formError.textContent = 'Заполни все поля, пожалуйста!';
            return;
        }

        user = { grade, firstName: fName, lastName: lName, gender: selectedGender };
        localStorage.setItem('ruchoba-user', JSON.stringify(user));
        console.log('Пользователь сохранён:', user);
        showSubjects();
    });

    // === Главный экран: предметы ===
    function renderSubjects() {
        const grid = document.getElementById('subjectsGrid');
        grid.innerHTML = '';

        subjects.forEach(sub => {
            const solved = sub.tasks.filter(t => progress[`${sub.id}-${t.id}`]).length;
            const total = sub.tasks.length;
            const percent = total === 0 ? 0 : Math.round((solved / total) * 100);

            const card = document.createElement('div');
            card.className = 'subject-card';
            card.innerHTML = `
                <div class="subject-icon">${sub.icon}</div>
                <div class="subject-name">${sub.name}</div>
                <div class="progress-circle">
                    <svg viewBox="0 0 36 36">
                        <circle class="bg" cx="18" cy="18" r="15.9"></circle>
                        <circle class="fg" cx="18" cy="18" r="15.9"
                            stroke-dasharray="${percent} 100" stroke-dashoffset="0"></circle>
                    </svg>
                    <span class="percent">${percent}%</span>
                </div>
                <div style="font-size:11px;color:#888;">${solved} из ${total}</div>
            `;
            card.addEventListener('click', () => openSubject(sub));
            grid.appendChild(card);
        });
    }

    // === Экран заданий по предмету ===
    function openSubject(sub) {
        currentSubject = sub;
        document.getElementById('subjectTitle').textContent = sub.name;
        const list = document.getElementById('taskList');
        list.innerHTML = '';

        sub.tasks.forEach(t => {
            const isSolved = progress[`${sub.id}-${t.id}`];
            const item = document.createElement('div');
            item.className = 'task-list-item' + (isSolved ? ' solved' : '');
            item.innerHTML = `
                <div class="info">
                    <span class="title">Задание ${t.id}</span>
                    <span class="status">${isSolved ? '✅ Решено' : 'Не решено'}</span>
                </div>
                <span class="arrow">→</span>
            `;
            item.addEventListener('click', () => openTask(sub, t));
            list.appendChild(item);
        });

        subjectsScreen.style.display = 'none';
        tasksScreen.style.display = 'block';
        taskScreen.style.display = 'none';
    }

    // === Экран задания ===
    function openTask(sub, task) {
        currentSubject = sub;
        document.getElementById('taskNumber').textContent = `Задание ${task.id}`;
        document.getElementById('taskSubject').textContent = sub.name;
        document.getElementById('taskQuestion').textContent = task.question;
        document.getElementById('result').textContent = '';
        document.getElementById('result').className = 'result';

        const answersDiv = document.getElementById('answers');
        answersDiv.innerHTML = '';

        task.answers.forEach(ans => {
            const btn = document.createElement('button');
            btn.className = 'answer';
            btn.textContent = ans.text;
            btn.dataset.correct = ans.correct;

            btn.addEventListener('click', () => {
                const isCorrect = ans.correct === true;
                answersDiv.querySelectorAll('.answer').forEach(b => {
                    b.classList.add('disabled');
                    if (b.dataset.correct === 'true') b.classList.add('correct');
                });

                const result = document.getElementById('result');
                if (isCorrect) {
                    result.textContent = '✅ Верно!';
                    result.className = 'result success';
                    progress[`${sub.id}-${task.id}`] = true;
                    localStorage.setItem('ruchoba-progress', JSON.stringify(progress));
                } else {
                    btn.classList.add('wrong');
                    result.textContent = '❌ Неверно. Правильный ответ выделен зелёным.';
                    result.className = 'result error';
                }
            });
            answersDiv.appendChild(btn);
        });

        tasksScreen.style.display = 'none';
        taskScreen.style.display = 'block';
    }

    // === Кнопки «Назад» ===
    document.getElementById('backToSubjects').addEventListener('click', () => {
        showSubjects();
    });

    document.getElementById('backToTasks').addEventListener('click', () => {
        if (currentSubject) openSubject(currentSubject);
    });

    // === Старт ===
    if (user) {
        showSubjects();
    } else {
        showWelcome();
    }
});
