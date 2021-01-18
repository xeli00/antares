import './scss/main.scss';

document.addEventListener('DOMContentLoaded', () => {
   const navbars = document.querySelectorAll('.navbar-menu');
   const burger = document.querySelector('.navbar-burger');

   burger.addEventListener('click', () => {
      burger.classList.toggle('is-active');
      navbars.forEach(navbar => {
         navbar.classList.toggle('is-active');
      });
   });
});
