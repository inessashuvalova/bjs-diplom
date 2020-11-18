'use strict';
const user = new UserForm();
user.loginFormCallback = data => ApiConnector.login(data, (response) => {
    if (response.success) {
    location.reload();
} else {
    user.setLoginErrorMessage(`Пользователь c логином ${data.login} и указанным паролем не найден`);
}
    });

user.registerFormCallback = data => ApiConnector.register(data, (response) => {
    if (response.success) {
    location.reload();
} else if (response.error) {
    user.setRegisterErrorMessage(`${response.error}`);
} else {
    user.setRegisterErrorMessage("Некорректный логин или пароль");
    }
        });