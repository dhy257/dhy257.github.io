const toggleBtn = document.querySelector('.menu_toggle_btn');
const menu = document.querySelector('nav');

if (toggleBtn && menu) {
  toggleBtn.addEventListener('click', () => {
    menu.classList.toggle('active');
  });
}

//프로젝트 슬라이더 기능
const projectContainer = document.querySelector('.project_container');

if (projectContainer) {
  const cards = document.querySelectorAll('.project_card');
  const results = document.querySelectorAll('.result_group');
  const prevBtn = document.querySelector('.prev_btn');
  const nextBtn = document.querySelector('.next_btn');

  let currentIndex = 0;

  function updateSlider(index) {
    cards.forEach(card => card.classList.remove('active'));
    results.forEach(result => result.classList.remove('active'));

    if(cards[index]) cards[index].classList.add('active');
    if(results[index]) results[index].classList.add('active');
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentIndex--;
      if (currentIndex < 0) currentIndex = cards.length - 1;
      updateSlider(currentIndex);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentIndex++;
      if (currentIndex >= cards.length) currentIndex = 0;
      updateSlider(currentIndex);
    });
  }
}

//클릭 시 텍스트 복사 기능
const copyBtns = document.querySelectorAll('.copy_btn');

copyBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const textToCopy = btn.getAttribute('data-text');
    
    // 클립보드에 복사
    navigator.clipboard.writeText(textToCopy).then(() => {
      alert(`복사되었습니다: ${textToCopy}`);
    }).catch(err => {
      console.error('복사 실패:', err);
    });
  });
});