const toggleBtn = document.querySelector('.menu_toggle_btn');
const menu = document.querySelector('nav');

// 버튼 클릭 이벤트 리스너
toggleBtn.addEventListener('click', () => {
  menu.classList.toggle('active');
});

// 1. .group_card 안에 있는 모든 a 태그를 선택
const links = document.querySelectorAll('.group_card a');

links.forEach(link => {
  // 2. 각 링크의 href 속성 값을 가져옴 (예: "../20260122_yeodohyun/02_index.html")
  const href = link.getAttribute('href');
  
  // 3. href가 있고, "#"이 아닐 경우에만 실행
  if (href && href !== '#') {
    // 4. 주소를 '/' 기준으로 자르고, 배열의 맨 마지막 요소(파일명)를 가져옴
    const fileName = href.split('/').pop(); 
    
    // 5. a 태그의 글자(text)를 파일명으로 변경
    link.textContent = fileName;
  }
});