// Структура предметов и заданий для 1 класса
const subjects = [
    {
        id: 'math',
        name: 'Математика',
        icon: '📐',
        tasks: [
            { id: 1, question: 'Сколько будет 2 + 3?', answers: [
                { text: '4', correct: false }, { text: '5', correct: true },
                { text: '6', correct: false }, { text: '3', correct: false } ] },
            { id: 2, question: 'Сколько будет 5 − 2?', answers: [
                { text: '2', correct: false }, { text: '3', correct: true },
                { text: '4', correct: false }, { text: '5', correct: false } ] },
            { id: 3, question: 'Сколько будет 2 × 2?', answers: [
                { text: '2', correct: false }, { text: '3', correct: false },
                { text: '4', correct: true }, { text: '5', correct: false } ] },
            { id: 4, question: 'Сколько будет 10 ÷ 2?', answers: [
                { text: '4', correct: false }, { text: '5', correct: true },
                { text: '6', correct: false }, { text: '3', correct: false } ] },
            { id: 5, question: 'У Пети 3 яблока, мама дала ещё 2. Сколько стало?', answers: [
                { text: '4', correct: false }, { text: '5', correct: true },
                { text: '6', correct: false }, { text: '3', correct: false } ] }
        ]
    },
    {
        id: 'rus',
        name: 'Русский язык',
        icon: '📖',
        tasks: [
            { id: 1, question: 'Сколько букв в слове «мама»?', answers: [
                { text: '3', correct: false }, { text: '4', correct: true },
                { text: '5', correct: false }, { text: '2', correct: false } ] },
            { id: 2, question: 'Какая буква первая в слове «кот»?', answers: [
                { text: 'т', correct: false }, { text: 'о', correct: false },
                { text: 'к', correct: true }, { text: 'м', correct: false } ] },
            { id: 3, question: 'Как правильно пишется: «ж_раф»?', answers: [
                { text: 'жыраф', correct: false }, { text: 'жираф', correct: true },
                { text: 'жораф', correct: false }, { text: 'жураф', correct: false } ] },
            { id: 4, question: 'Сколько слогов в слове «мама»?', answers: [
                { text: '1', correct: false }, { text: '2', correct: true },
                { text: '3', correct: false }, { text: '4', correct: false } ] },
            { id: 5, question: 'Как правильно пишется: «ш_шка»?', answers: [
                { text: 'шашка', correct: false }, { text: 'шишка', correct: true },
                { text: 'шышка', correct: false }, { text: 'шошка', correct: false } ] }
        ]
    },
    {
        id: 'world',
        name: 'Окружающий мир',
        icon: '🌍',
        tasks: [
            { id: 1, question: 'Сколько ног у кошки?', answers: [
                { text: '2', correct: false }, { text: '3', correct: false },
                { text: '4', correct: true }, { text: '5', correct: false } ] },
            { id: 2, question: 'Какого цвета трава?', answers: [
                { text: 'Синяя', correct: false }, { text: 'Красная', correct: false },
                { text: 'Зелёная', correct: true }, { text: 'Жёлтая', correct: false } ] },
            { id: 3, question: 'Кто говорит «мяу»?', answers: [
                { text: 'Собака', correct: false }, { text: 'Кошка', correct: true },
                { text: 'Корова', correct: false }, { text: 'Петух', correct: false } ] },
            { id: 4, question: 'Когда светит солнце?', answers: [
                { text: 'Ночью', correct: false }, { text: 'Днём', correct: true },
                { text: 'Вечером', correct: false }, { text: 'Никогда', correct: false } ] },
            { id: 5, question: 'Сколько дней в неделе?', answers: [
                { text: '5', correct: false }, { text: '6', correct: false },
                { text: '7', correct: true }, { text: '8', correct: false } ] }
        ]
    }
];

let user = JSON.parse(localStorage.getItem('ruchoba-user') || 'null');
let progress = JSON.parse(localStorage.getItem('ruchoba-progress') || '{}');

window.addEventListener('load', () => {
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

    // Обработчики кнопок пола
    const genderBtns = document.querySelectorAll('.gender-btn');
    genderBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            genderBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedGender = btn.dataset.gender;
        });
    });

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
        document.getElementById('greeting').textContent =
            `Привет, ${user.firstName}! Ты в ${user.grade} классе.`;
        renderSubjects();
    }

    startBtn.addEventListener('click', () => {
        const grade = classSelect.value;
        const fName = firstName.value.trim();
        const lName = lastName.value.trim();

        if (!grade) { formError.textContent = '❌ Выбери класс!'; return; }
        if (!fName) { formError.textContent = '❌ Впиши имя!'; return; }
        if (!lName) { formError.textContent = '❌ Впиши фамилию!'; return; }
        if (!selectedGender) { formError.textContent = '❌ Выбери пол!'; return; }

        user = { grade, firstName: fName, lastName: lName, gender: selectedGender };
        localStorage.setItem('ruchoba-user', JSON.stringify(user));
        showSubjects();
    });

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

    document.getElementById('backToSubjects').addEventListener('click', () => {
        showSubjects();
    });

    document.getElementById('backToTasks').addEventListener('click', () => {
        if (currentSubject) openSubject(currentSubject);
    });

    if (user) {
        showSubjects();
    } else {
        showWelcome();
    }
});
