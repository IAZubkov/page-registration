document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.form-section');
    const fullNameInput = document.querySelector('.form-input');
    const usernameInput = document.querySelectorAll('.form-input')[1];
    const emailInput = document.querySelectorAll('.form-input')[2];
    const passwordInput = document.querySelectorAll('.form-input')[3];
    const repeatPasswordInput = document.querySelectorAll('.form-input')[4];
    const checkbox = document.getElementById('agree');
    const signUpButton = document.querySelector('.button');
    const loginLink = document.querySelector('.question');

    const title = document.querySelector('h1');
    const subtitle = document.querySelector('.form-section p');
    const fullNameGroup = fullNameInput.closest('.form-input')?.parentElement;
    const emailGroup = emailInput.closest('.form-input')?.parentElement;
    const repeatPasswordGroup = repeatPasswordInput.closest('.form-input')?.parentElement;
    const checkboxGroup = checkbox.closest('.check-box');

    fullNameInput.addEventListener('input', function () {
        this.value = this.value.replace(/\d/g, '');
        if (this.value.trim().length < 2) {
            this.style.borderBottom = '2px solid #DD3142';
            this.style.color = '#DD3142';
        } else {
            this.style.borderBottom = '2px solid #22c55e';
            this.style.color = '#000000';
        }
    });

    usernameInput.addEventListener('input', function () {
        this.value = this.value.replace(/[.,]/g, '');
        if (this.value.trim().length < 3) {
            this.style.borderBottom = '2px solid #DD3142';
        } else {
            this.style.borderBottom = '2px solid #22c55e';
        }
    });

    emailInput.addEventListener('input', function () {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(this.value.trim())) {
            this.style.borderBottom = '2px solid #DD3142';
        } else {
            this.style.borderBottom = '2px solid #22c55e';
        }
    });

    passwordInput.addEventListener('input', function () {
        if (this.value.trim().length < 8) {
            this.style.borderBottom = '2px solid #DD3142';
        } else {
            this.style.borderBottom = '2px solid #22c55e';
        }
    });

    repeatPasswordInput.addEventListener('input', function () {
        if (this.value !== passwordInput.value) {
            this.style.borderBottom = '2px solid #DD3142';
        } else {
            this.style.borderBottom = '2px solid #22c55e';
        }
    });

    checkbox.addEventListener('change', function () {
        console.log(this.checked ? 'Согласен' : 'Не согласен');
    });

    function showSuccessModal() {
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            animation: fadeIn 0.3s ease;
        `;

        const modal = document.createElement('div');
        modal.style.cssText = `
            background: #FFFFFF;
            border-radius: 24px;
            padding: 48px 40px 32px 40px;
            max-width: 440px;
            width: 90%;
            text-align: center;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            animation: slideUp 0.3s ease;
        `;

        modal.innerHTML = `
            <div style="margin-bottom: 16px; font-size: 48px;">📧</div>
            <h2 style="font-family: 'Nunito', sans-serif; font-size: 24px; font-weight: 700; color: #1A1A2E; margin-bottom: 12px;">
                Подтверждение регистрации
            </h2>
            <p style="font-family: 'Nunito', sans-serif; font-size: 16px; font-weight: 400; color: #636363; line-height: 1.6; margin-bottom: 24px;">
                На вашу почту выслана ссылка, перейдите по ней, чтобы завершить регистрацию
            </p>
            <button id="modalOkBtn" style="
                font-family: 'Nunito', sans-serif;
                font-size: 18px;
                font-weight: 700;
                color: #FFFFFF;
                background: #DD3142;
                border: none;
                border-radius: 40px;
                padding: 14px 48px;
                cursor: pointer;
                transition: all 0.25s ease;
            ">ОК</button>
        `;

        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes slideUp {
                from { transform: translateY(30px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
        `;

        document.head.appendChild(style);

        document.getElementById('modalOkBtn').addEventListener('click', function () {
            overlay.remove();
            clearForm();
            goToLoginPage();
        });
    }

    function clearForm() {
        document.querySelectorAll('.form-input').forEach(input => {
            input.value = '';
            input.style.borderBottom = '1px solid #E5E7EB';
            input.style.color = '#000000';
        });
        checkbox.checked = false;
        checkbox.style.outline = 'none';
        signUpButton.textContent = 'Sign Up';
        signUpButton.style.backgroundColor = '#DD3142';
        signUpButton.disabled = false;
    }

    function goToLoginPage() {
        title.textContent = 'Log in to the system';

        if (fullNameGroup) fullNameGroup.remove();
        if (emailGroup) emailGroup.remove();
        if (repeatPasswordGroup) repeatPasswordGroup.remove();
        if (checkboxGroup) checkboxGroup.remove();
        if (subtitle) subtitle.remove();

        signUpButton.textContent = 'Sign In';
        signUpButton.style.backgroundColor = '#DD3142';

        if (loginLink) loginLink.remove();

        signUpButton.replaceWith(signUpButton.cloneNode(true));
        const newSignInButton = document.querySelector('.button');

        newSignInButton.addEventListener('click', function (event) {
            event.preventDefault();

            const username = usernameInput.value.trim();
            const password = passwordInput.value.trim();

            if (!username) {
                alert('Заполните поле Username');
                usernameInput.style.borderBottom = '2px solid #DD3142';
                usernameInput.focus();
                return;
            }

            if (!password) {
                alert('Заполните поле Password');
                passwordInput.style.borderBottom = '2px solid #DD3142';
                passwordInput.focus();
                return;
            }

            alert(`Добро пожаловать, ${username}!`);
        });
    }

    signUpButton.addEventListener('click', function (event) {
        event.preventDefault();

        const fullName = fullNameInput.value.trim();
        const username = usernameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const repeatPassword = repeatPasswordInput.value;
        const agreeTerms = checkbox.checked;

        if (!fullName) {
            alert('Заполните поле Full Name');
            fullNameInput.style.borderBottom = '2px solid #DD3142';
            fullNameInput.focus();
            return;
        }

        if (!username) {
            alert('Заполните поле Your username');
            usernameInput.style.borderBottom = '2px solid #DD3142';
            usernameInput.focus();
            return;
        }

        if (!email) {
            alert('Заполните поле E-mail');
            emailInput.style.borderBottom = '2px solid #DD3142';
            emailInput.focus();
            return;
        }

        if (!password) {
            alert('Заполните поле Password');
            passwordInput.style.borderBottom = '2px solid #DD3142';
            passwordInput.focus();
            return;
        }

        if (!repeatPassword) {
            alert('Заполните поле Repeat Password');
            repeatPasswordInput.style.borderBottom = '2px solid #DD3142';
            repeatPasswordInput.focus();
            return;
        }

        if (password.length < 8) {
            alert('Пароль должен содержать не менее 8 символов');
            passwordInput.style.borderBottom = '2px solid #DD3142';
            passwordInput.focus();
            return;
        }

        if (password !== repeatPassword) {
            alert('Пароли не совпадают');
            repeatPasswordInput.style.borderBottom = '2px solid #DD3142';
            repeatPasswordInput.focus();
            return;
        }

        if (!agreeTerms) {
            alert('Примите условия использования');
            checkbox.style.outline = '2px solid #DD3142';
            checkbox.focus();
            return;
        }

        showSuccessModal();
    });

    loginLink.addEventListener('click', function (event) {
        event.preventDefault();
        goToLoginPage();
    });

    console.log('✅ Все обработчики событий загружены!');
});