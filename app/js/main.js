"use strict";

// анимация для меню-бургера
const burger = document.querySelector('.sidebar__button');
const burgerLine = document.querySelector('.sidebar__button-line');
const sidebarTouch = document.querySelector('.sidebar__touch');

burger.addEventListener('click', function(){
  burgerLine.classList.toggle('sidebar__button-line--active');
  sidebarTouch.classList.toggle('sidebar__touch--active');
});


// маски для поля с телефоном и датой
let phoneMask = IMask(
  document.getElementById('tel'), {
    mask: '+{7} (000) 000-00-00',
    lazy: false
  });

let dateMask = IMask(
  document.getElementById('date'),
  {
    mask: Date,
    min: new Date(1990, 0, 1),
    max: new Date(),
    lazy: false
  });
  

const form = document.getElementById('form');

function formInputAndFocusInEvent () {

  const formItem = event.target.closest('.form__item');

  if (formItem == null) return; // фокус не на инпуте

  if (formItem.querySelector('.form__item-placeholder--active') !== null) return; // фокус уже есть

  formItem.querySelector('.form__item-placeholder').classList.add('form__item-placeholder--active');
  formItem.querySelector('.form__item-input').classList.add('form__item-input--active');

}

form.addEventListener('input', formInputAndFocusInEvent); // при автозаполнении полей
form.addEventListener('focusin', formInputAndFocusInEvent);
form.addEventListener('focusout', () => {

  const formItem = event.target.closest('.form__item'); 

  if (formItem == null) return; // фокус не на инпуте

  if (formItem.querySelector('.form__item-input').value != '') return; // если поле не является пустым
  
  formItem.querySelector('.form__item-placeholder').classList.remove('form__item-placeholder--active');
  formItem.querySelector('.form__item-input').classList.remove('form__item-input--active');

});


const name = document.getElementById('name');
const tel = document.getElementById('tel');
const email = document.getElementById('email');
const date = document.getElementById('date');
let flag;

form.addEventListener('submit', () => {	
  checkInputs();
  if (flag) { // ошибка есть
    event.preventDefault();
  }
});

function checkInputs() {

  flag = false; // ошибки нет

	const nameValue = name.value.trim();
	const telValue = tel.value.trim();
	const emailValue = email.value.trim();
	const dateValue = date.value.trim();
	
	if (nameValue === '') {
		setErrorFor(name, 'Ошибка. Пустое поле');
	} else setSuccessFor(name);

  
  if (telValue === '+7 (___) ___-__-__') {
		setErrorFor(tel, 'Ошибка. Пустое поле');
	} else if (telValue.includes('_')) {
    setErrorFor(tel, 'Ошибка. Номер введен не полностью');
    
  } else setSuccessFor(tel);
	
	if (emailValue === '') {
		setErrorFor(email, 'Ошибка. Пустое поле');
	} else if (!isEmail(emailValue)) {
    setErrorFor(email, 'Ошибка. Такого почтового ящика не существует');
    flag = true;
  } else setSuccessFor(email);
	
	if (dateValue === '__.__.____') {
		setErrorFor(date, 'Ошибка. Пустое поле');
	} else if (dateValue.includes('_')) {
		setErrorFor(date, 'Ошибка. Дата введена не полностью');
  } else setSuccessFor(date);

  function setErrorFor(input, message) { // если ошибка есть

    flag = true;
    const formItemWrap = input.closest('.form__item-wrap');
    const error = formItemWrap.querySelector('.form__item-message');
    error.innerText = message; 

    // Написал проверку, если ошибка допускается подряд в одном поле, то не добавлять уже добавленные классы
    // Возможно не стоит гнаться за такой оптимизацией. Надеюсь, что расскажете)
    if (formItemWrap.querySelector('.form__item-message.form__item-message--visible') != null) return;

    input.classList.add('form__item-input--active-error'); // обводим инпут красной рамкой
    error.classList.add('form__item-message--visible');    // показываем текст ошибки

    // вставка пустого блока для выравнивания
    if (input.getAttribute('name') != 'date' && input.getAttribute('name') != 'tel') return;

    // можно было раскомментировать пустой блок с классом form__item-message и добавлять
    // ему класс для изменения высоты, но по логике класс form__item-message нужен для ошибки
    // и я решил добавлять новый блок. Хоть этот способ длиннее, но по логике вернее. Ну и чуть сложнее остальных)
    // Или можно было создать другой пустой блок и туда добавлять данные)
    // На обсуждении тестового задании скажете, какой способ наилучший)

    const formItems = input.closest('.form__items');

    // если еще не существует пустого блока
    if (formItems.querySelector('.form__item-empty') != null) return;

    let errorHeight = document.createElement('div');
    errorHeight.innerText = '';
    errorHeight.className = "form__item-empty";
    formItems.lastElementChild.append(errorHeight);
  
    // этой строкой можно было тоже получить нужный результат
    // formItems.lastElementChild.lastElementChild.classList.add('form__item-message--height');
  
  }

  function setSuccessFor(input) { // если ошибки нет

    const formItemWrap = input.closest('.form__item-wrap');

    // если ошибки до этого не было, то выходим
    if (formItemWrap.querySelector('.form__item-message.form__item-message--visible') == null) return;

    const error = formItemWrap.querySelector('.form__item-message');
    input.classList.remove('form__item-input--active-error'); // убирам рамку 
    error.classList.remove('form__item-message--visible'); // прячем текст ошибки
    const formItems = input.closest('.form__items');

    // проверка на существование пустого блока
    if (formItems == null) return;

    // убираем пустой блок
    formItems.querySelector('.form__item-empty').remove();
  }
  
  //регулярное выражение для проверки почты
  function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
  }
}



// Скрипт для смены изображений в header
// в итоге выбрал через медиа запросы


// let activeFull = false,
//     active1024 = false;

// function headerChange () {

//     if (window.innerWidth<=1024 && !active1024){
//       let logo__title = document.createElement('img');
//       logo__title.className = "logo__title";
//       logo__title.src = "img/logo__title1024.png";
      
//       document.querySelector(".logo__title").remove();
//       document.querySelector(".logo").prepend(logo__title);
  
  
//       let logo__img = document.createElement('img');
//       logo__img.className = "logo__img";
//       logo__img.src = "img/logo__img1024.png";
      
//       document.querySelector(".logo__img").remove();
//       document.querySelector(".logo").append(logo__img);
  
  
//       let header__descr = document.createElement('img');
//       header__descr.className = "header__descr-img";
//       header__descr.classList.add("header__descr--active");
//       header__descr.src = "img/header__descr.png";
  
//       document.querySelector(".header__descr--active").remove();
//       document.querySelector(".header-top").after(header__descr);
  
//       activeFull = false;
//       active1024 = true;
//     }
  
//     else if (window.innerWidth>1024 && !activeFull){
//       let logo__title = document.createElement('img');
//       logo__title.className = "logo__title";
//       logo__title.src = "img/logo__title1600.png";
      
//       document.querySelector(".logo__title").remove();
//       document.querySelector(".logo").prepend(logo__title);
  
  
//       let logo__img = document.createElement('img');
//       logo__img.className = "logo__img";
//       logo__img.src = "img/logo__img1600.png";
      
//       document.querySelector(".logo__img").remove();
//       document.querySelector(".logo").append(logo__img);
  
  
//       let header__descr = document.createElement('div');
//       header__descr.className = "header__descr";
//       header__descr.classList.add("header__descr--active");
//       header__descr.textContent = `Глобальная платформа ЕЖФ была создана при поддержке Совета Федерации Федерального 
//       собрания РФ и Фонда Инносоциум – социальной платформы Фонда Росконгресс`;
  
//       document.querySelector(".header__descr--active").remove();
//       document.querySelector(".header-top").after(header__descr);
  
//       activeFull = true;
//       active1024 = false;
//     }
  
// } 


// window.addEventListener("DOMContentLoaded", headerChange);
// window.addEventListener("resize", headerChange);
// window.addEventListener("orientationchange", headerChange);






