const toggleBtn = document.querySelector('.menu_toggle_btn');
const menu = document.querySelector('nav');

// 버튼 클릭 이벤트 리스너
toggleBtn.addEventListener('click', () => {
  menu.classList.toggle('active');
});