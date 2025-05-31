"use strict";

const formData = {
    email: "",
    message: ""
};

const form = document.querySelector(".feedback-form");

// #region Проверка, есть ли данные формы на локальном хранилище.
/* Сделал try...catch, чтобы пропустить незначительную ошибку, где у нас при определённых
   обстоятельствах нет ключа feedback-form-state на локальном хранилище. Не вижу смысла
   писать тернальный оператор, if и подобное, чтобы этого избежать. Просто сделает код более мусорным. */
try {
    // #region Переменные полей с локального хранилища.
    const emailLocalStorage = JSON.parse(localStorage.getItem("feedback-form-state")).email;
    const messageLocalStorage = JSON.parse(localStorage.getItem("feedback-form-state")).message;
    // #endregion
    // Подметил оператор нулевого слияния на примере кода в конце второго блока 9-го модуля.
    form.elements.email.value = emailLocalStorage ?? "";
    form.elements.message.value = messageLocalStorage ?? "";
    /* Добавил это, ибо заметил баг, где после перезагрузки страницы и писания текста
       в одно из полей пропадает инфа с другого поля, потому что объект в начале
       пустой, и заполняется только один ключ объекта. Это и создаёт прикол, когда
       мы перезагружаем страничку, у нам появляется текста на всех полях, пишем в
       одно поле текст, перезагружаем страничку — и у нас одно поле пустое, а
       другое — нет, ибо на локальное хранилище у нас сохраняется пустой ключ объекта. */
    formData.email = emailLocalStorage ?? "";
    formData.message = messageLocalStorage ?? "";
} catch (error) {
    console.log("This error isn't critical.");
    console.error(error);
}
// #endregion

form.addEventListener("input", event => {
    const targetValueTrim = event.target.value.trim();
 /* Если текущая цель есть поле email,
    то присвоить ключу email объекта formData значение текущей цели,
    иначе присвоить ключу message объекта formData значение текущей цели. */
    event.target === form.elements.email ? formData.email = targetValueTrim : formData.message = targetValueTrim;
 // Присвоить ключу feedback-form-state локального хранилища значение объекта formData, который переделан под стандарт JSON.
    localStorage.setItem("feedback-form-state", JSON.stringify(formData));
});

form.addEventListener("submit", event => {
    event.preventDefault();

    if (form.elements.email.value && form.elements.message.value) {
        console.log(formData);

        localStorage.removeItem("feedback-form-state");
        formData.email = "";
        formData.message = "";
        form.elements.email.value = "";
        form.elements.message.value = "";
    } else {
        alert("Fill please all fields");
    }
});