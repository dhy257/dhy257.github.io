document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();     // 1. 모바일 메뉴 토글
  initProjectSlider();  // 2. 프로젝트 슬라이더
  initClipboardCopy();  // 3. 텍스트 복사
});

/* ================================== 모바일 메뉴 토글 기능 ================================== */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.menu_toggle_btn');
  const menu = document.querySelector('nav');

  if (toggleBtn && menu) {
    // 1.토글 버튼 클릭
    toggleBtn.addEventListener('click', () => {
      // 작동
      menu.classList.toggle('active');
    });

    // 2.메뉴 내의 링크를 클릭하면 메뉴 닫기
    const menuLinks = menu.querySelectorAll('a');
    menuLinks.forEach(link => {
      link.addEventListener('click', () => {
        // 닫기
        menu.classList.remove('active');
      });
    });
  }
}

/* ================================== 프로젝트 슬라이더 기능 ================================== */
function initProjectSlider() {
  const projectContainer = document.querySelector('.project_container');

  // 컨테이너가 없으면 실행하지 않음 (오류 방지)
  if (!projectContainer) return;

  const cards = document.querySelectorAll('.project_card');
  const results = document.querySelectorAll('.result_group');
  const prevBtn = document.querySelector('.prev_btn');
  const nextBtn = document.querySelector('.next_btn');

  let currentIndex = 0;

  // 슬라이더 업데이트
  function updateSlider(index) {
    // 기존 active 제거
    cards.forEach(card => card.classList.remove('active'));
    results.forEach(result => result.classList.remove('active'));

    // 새 active 추가
    if (cards[index]) cards[index].classList.add('active');
    if (results[index]) results[index].classList.add('active');
  }

  // 이전 버튼 클릭
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentIndex--;
      if (currentIndex < 0) currentIndex = cards.length - 1;
      updateSlider(currentIndex);
    });
  }

  // 다음 버튼 클릭
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentIndex++;
      if (currentIndex >= cards.length) currentIndex = 0;
      updateSlider(currentIndex);
    });
  }
}

/* ================================== 클릭 시 텍스트 복사 기능 ================================== */
function initClipboardCopy() {
  const copyBtns = document.querySelectorAll('.copy_btn');

  if (copyBtns.length === 0) return;

  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-text');

      if (!textToCopy) return; // 복사할 텍스트가 없으면 중단

      // 클립보드 API 사용
      navigator.clipboard.writeText(textToCopy)
        .then(() => {
          // 성공 시 알림
          alert(`복사되었습니다: ${textToCopy}`);
        })
        .catch(err => {
          // 실패 시 로그
          console.error('복사 실패:', err);
          alert('복사에 실패했습니다. 직접 복사해주세요.');
        });
    });
  });
}