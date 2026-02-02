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

//최상위 날짜 폴더 이름 자동화 (YYYYMMDD_yeodohyun 감지)
const dateFolders = document.querySelectorAll('.group_card > details');

dateFolders.forEach(details => {
  const firstLink = details.querySelector('a'); // 폴더 안의 첫 번째 링크 찾기
  const summary = details.querySelector('summary'); // 제목 태그 찾기

  if (firstLink && summary) {
    const href = firstLink.getAttribute('href');
    
    // 정규식: 숫자8개(_yeodohyun) 패턴을 찾음
    // 예: "./20260123_yeodohyun/file.html" 에서 "20260123"만 추출
    const match = href.match(/(\d{8})_yeodohyun/);
    
    if (match) {
      // match[1]은 정규식의 첫번째 괄호 부분(숫자8자리)입니다.
      summary.textContent = match[1]; 
    }
  }
});

//내부(중첩) 폴더 이름 자동화 (상위 폴더명 감지)
// details 안에 있는 details만 선택
const innerFolders = document.querySelectorAll('.group_card details details');

innerFolders.forEach(details => {
  const firstLink = details.querySelector('a');
  const summary = details.querySelector('summary');

  if (firstLink && summary) {
    const href = firstLink.getAttribute('href');
    if (href && href !== '#') {
      const parts = href.split('/');
      
      // 주소를 '/'로 쪼갰을 때:
      // [.. , "20260123_yeodohyun", "inner_folder", "file.html"]
      // 맨 뒤(pop)는 파일명, 그 앞의 것이 폴더명입니다.
      
      if (parts.length >= 2) {
        // 뒤에서 두 번째 요소를 가져옵니다.
        const folderName = parts[parts.length - 2];
        summary.textContent = `${folderName}`; // 아이콘은 선택사항
      }
    }
  }
});

// 프로젝트 슬라이더 기능
const cards = document.querySelectorAll('.project_card');
const results = document.querySelectorAll('.result_group');
const prevBtn = document.querySelector('.prev_btn');
const nextBtn = document.querySelector('.next_btn');

let currentIndex = 0; // 현재 보고 있는 프로젝트 번호 (0부터 시작)

// 화면 업데이트 함수 (카드와 결과물 교체)
function updateSlider(index) {
  // 모든 카드와 결과물 비활성화
  cards.forEach(card => card.classList.remove('active'));
  results.forEach(result => result.classList.remove('active'));

  // 현재 인덱스에 해당하는 것만 활성화
  cards[index].classList.add('active');
  results[index].classList.add('active');
}

// 이전 버튼 클릭
prevBtn.addEventListener('click', () => {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = cards.length - 1; // 맨 처음이면 맨 뒤로
  }
  updateSlider(currentIndex);
});

// 다음 버튼 클릭
nextBtn.addEventListener('click', () => {
  currentIndex++;
  if (currentIndex >= cards.length) {
    currentIndex = 0; // 맨 끝이면 맨 처음으로
  }
  updateSlider(currentIndex);
});