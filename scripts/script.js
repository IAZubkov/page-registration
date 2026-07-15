document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('#form');
    const signUpButton = document.querySelector('#btn');
    const textFields = document.querySelectorAll('.form-input.check');
    const fullNameInput = textFields[0];
    const usernameInput = textFields[1];
    const emailInput = textFields[2];
    const passwordInput = textFields[3];
    const repeatPasswordInput = textFields[4];
    const agreeCheckbox = document.querySelector('#agree');
    const loginLink = document.querySelector('.question');
    const pageTitle = document.querySelector('.form-section h1');
    const pageSubtitle = document.querySelector('.form-section p');
    const fullNameGroup = fullNameInput.closest('label');
    const emailGroup = emailInput.closest('label');
    const repeatPasswordGroup = repeatPasswordInput.closest('label');
    const checkboxGroup = agreeCheckbox.closest('.check-box');

    let isLoginPage = false;

    fullNameInput.addEventListener('keydown', function (event) {
        if (event.key >= '0' && event.key <= '9') {
            event.preventDefault();
        }
    });

    usernameInput.addEventListener('keydown', function (event) {
        if (event.key === '.' || event.key === ',') {
            event.preventDefault();
        }
    });

    agreeCheckbox.addEventListener('change', function () {
        if (agreeCheckbox.checked) {
            console.log('Согласен');
        } else {
            console.log('Не согласен');
        }
    });

    function signUp() {
        for (const field of textFields) {
            if (field.value.trim() === '') {
                alert(`Заполните поле ${field.placeholder}`);
                return;
            }
        }

        if (passwordInput.value.length < 8) {
            alert('Пароль должен содержать не менее 8 символов');
            return;
        }

        if (passwordInput.value !== repeatPasswordInput.value) {
            alert('Пароли не совпадают');
            return;
        }

        if (!agreeCheckbox.checked) {
            alert('Необходимо согласиться с условиями');
            return;
        }

        showSuccessModal();
    }

    function showSuccessModal() {
        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay';

        const modal = document.createElement('div');
        modal.className = 'modal';

        const text = document.createElement('p');
        text.className = 'modal-text';
        text.textContent = 'На вашу почту выслана ссылка, перейдите по ней, чтобы завершить регистрацию';

        const okButton = document.createElement('button');
        okButton.className = 'button modal-button';
        okButton.type = 'button';
        okButton.textContent = 'ОК';

        okButton.addEventListener('click', function () {
            overlay.remove();
            form.reset();
            switchToLoginPage();
        });

        modal.appendChild(text);
        modal.appendChild(okButton);
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
    }

    function switchToLoginPage() {
        if (isLoginPage) {
            return;
        }

        isLoginPage = true;

        pageTitle.textContent = 'Log in to the system';
        fullNameGroup.remove();
        emailGroup.remove();
        repeatPasswordGroup.remove();
        checkboxGroup.remove();
        loginLink.remove();

        signUpButton.textContent = 'Sign In';
        signUpButton.removeEventListener('click', signUp);
        signUpButton.addEventListener('click', signIn);
    }

    function signIn() {
        if (usernameInput.value.trim() === '') {
            alert('Заполните поле Your username');
            return;
        }

        if (passwordInput.value.trim() === '') {
            alert('Заполните поле Password');
            return;
        }

        alert(`Добро пожаловать, ${usernameInput.value}!`);
    }

    signUpButton.addEventListener('click', signUp);

    loginLink.addEventListener('click', function (event) {
        event.preventDefault();
        switchToLoginPage();
    });
});
