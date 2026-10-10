// Список всех заданий
const tasks = [
    {
        id: 1,
        subject: 'Математика',
        question: 'Найдите значение выражения: 2 + 2 × 2',
        answers: [
            { text: '4', correct: false },
            { text: '6', correct: true },
            { text: '8', correct: false },
            { text: '2', correct: false }
        ]
    },
    {
        id: 2,
        subject: 'Русский язык',
        question: 'Сколько букв в слове «РУчеба»?',
        answers: [
            { text: '5', correct: false },
            { text: '6', correct: true },
            { text: '7', correct: false },
            { text: '4', correct: false }
        ]
    },
    {
        id: 3,
        subject: 'Математика',
        question: 'Сколько будет 7 × 8?',
        answers: [
            { text: '48', correct: false },
            { text: '54', correct: false },
            { text: '56', correct: true },
            { text: '64', correct: false }
        ]
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const listScreen = document.getElementById('list-screen');
    const taskScreen = document.getElementById('task-screen');
    const taskList = document.getElementById('taskList');
    const backBtn = document.getElementById('backBtn');

    // Рисуем список заданий
    tasks.forEach(task => {
        const item = document.createElement('div');
        item.className = 'task-list-item';
        item.innerHTML = `
            <div class="info">
                <span class="title">Задание ${task.id}</span>
                <span class="subject">${task.subject}</span>
            </div>
            <span class="arrow">→</span>
        `;
        item.addEventListener('click', () => openTask(task));
        taskList.appendChild(item);
    });

    // Открыть задание
    function openTask(task) {
        document.getElementById('taskNumber').textContent = `Задание ${task.id}`;
        document.getElementById('taskSubject').textContent = task.subject;
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
                    if (b.dataset.correct === 'true') {
                        b.classList.add('correct');
                    }
                });

                const result = document.getElementById('result');
                if (isCorrect) {
                    result.textContent = '✅ Верно!';
                    result.className = 'result success';
                } else {
                    btn.classList.add('wrong');
                    result.textContent = '❌ Неверно. Правильный ответ выделен зелёным.';
                    result.className = 'result error';
                }
            });

            answersDiv.appendChild(btn);
        });

        listScreen.style.display = 'none';
        taskScreen.style.display = 'block';
    }

    // Назад к списку
    backBtn.addEventListener('click', () => {
        listScreen.style.display = 'block';
        taskScreen.style.display = 'none';
    });
});
