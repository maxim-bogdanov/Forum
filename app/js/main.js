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
  const formItemPlaceholder = formItem.querySelector('.form__item-placeholder');

  if (formItem == null) return; // фокус не на инпуте

  if (formItemPlaceholder.classList.contains('form__item-placeholder--active')) return; // фокус уже есть

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

    if (error.classList.contains('form__item-message--visible')) return;

    input.classList.add('form__item-input--active-error'); // обводим инпут красной рамкой
    error.classList.add('form__item-message--visible');    // показываем текст ошибки
  }

  function setSuccessFor(input) { // если ошибки нет

    const formItemWrap = input.closest('.form__item-wrap');
    const error = formItemWrap.querySelector('.form__item-message');

    // если ошибки до этого не было, то выходим
    if (!error.classList.contains('form__item-message--visible')) return;

    input.classList.remove('form__item-input--active-error'); // убирам рамку 
    error.classList.remove('form__item-message--visible'); // прячем текст ошибки
  }
  
  //регулярное выражение для проверки почты
  function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
  }
}

