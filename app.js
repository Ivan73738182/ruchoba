document.addEventListener('DOMContentLoaded', () => {
    const answers = document.querySelectorAll('.answer');
    const result = document.getElementById('result');

    answers.forEach(button => {
        button.addEventListener('click', () => {
            const isCorrect = button.dataset.correct === 'true';

            answers.forEach(btn => {
                btn.classList.add('disabled');
                if (btn.dataset.correct === 'true') {
                    btn.classList.add('correct');
                }
            });

            if (isCorrect) {
                result.textContent = '✅ Верно!';
                result.className = 'result success';
            } else {
                button.classList.add('wrong');
                result.textContent = '❌ Неверно. Правильный ответ выделен зелёным.';
                result.className = 'result error';
            }
        });
    });
});
