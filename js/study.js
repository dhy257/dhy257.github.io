// js/study.js

const studyContainer = document.getElementById("study_list_container");

// 1. 데이터 정의 (경로를 포함해서 적어주면 됩니다)
const studyData = [
  {
    folderName: "20260122_yeodohyun",
    date: "20260122",
    files: [
      "01_index.txt",
      "02_index.html",
      "03_tag_practice.html",
      "04_semantic_tag.html",
      "05_table.html",
      "06_browser.html",
      "07_hyperlink.html"
    ]
  },
  {
    folderName: "20260123_yeodohyun",
    date: "20260123",
    files: [
      "1.html",
      "2.html"
    ]
  },
  {
    folderName: "20260126_yeodohyun",
    date: "20260126",
    files: [
      // 슬래시(/)가 있으면 자동으로 내부 폴더로 인식합니다.
      "01_form_css/01_naver_form.html",
      "01_form_css/02_readonly.html",
      "02_block_inline/01_change_to_block_inline.html",
      "02_block_inline/02_shadow.html"
    ]
  }
];

// 2. 렌더링 함수
function renderStudyList() {
  if (!studyContainer) return;

  studyContainer.innerHTML = ""; 

  studyData.forEach((data, index) => {
    // 1. 큰 날짜 폴더 생성
    const details = document.createElement("details");
    if (index === 0) details.open = true;

    const summary = document.createElement("summary");
    summary.className = "date";
    summary.textContent = data.date;

    const ol = document.createElement("ol");

    // ★ 핵심: 파일들을 폴더별로 그룹화하기
    const groups = {}; 

    data.files.forEach(filePath => {
      const parts = filePath.split('/'); // 슬래시로 쪼개기
      
      if (parts.length > 1) {
        // [경로가 있는 경우] 예: "folder/file.html"
        const folderName = parts[0]; // "folder"
        const fileName = parts[1];   // "file.html"
        
        // 그룹이 없으면 배열 생성
        if (!groups[folderName]) groups[folderName] = [];
        
        // 해당 그룹에 파일 추가
        groups[folderName].push({ path: filePath, name: fileName });
      } else {
        // [그냥 파일인 경우]
        if (!groups['root']) groups['root'] = [];
        groups['root'].push({ path: filePath, name: filePath });
      }
    });

    // ★ 렌더링 1: 루트 파일들 (폴더 없는 애들) 먼저 출력
    if (groups['root']) {
      groups['root'].forEach(file => {
        const li = createListItem(data.folderName, file.path, file.name);
        ol.appendChild(li);
      });
    }

    // ★ 렌더링 2: 내부 폴더들 출력
    Object.keys(groups).forEach(key => {
      if (key === 'root') return; // 루트는 이미 했으니 패스

      // 서브 폴더 구조 생성 (li > details > summary + ol)
      const subLi = document.createElement("li");
      const subDetails = document.createElement("details");
      subDetails.open = true; // 내부 폴더 기본 열림
      
      const subSummary = document.createElement("summary");
      subSummary.className = "sub-folder"; // CSS 스타일링용 클래스
      subSummary.textContent = ` ${key}`; // 폴더 아이콘 + 이름

      const subOl = document.createElement("ol");
      subOl.className = "sub-list"; // 들여쓰기용 클래스

      // 해당 폴더의 파일들 생성
      groups[key].forEach(file => {
        const li = createListItem(data.folderName, file.path, file.name);
        subOl.appendChild(li);
      });

      subDetails.appendChild(subSummary);
      subDetails.appendChild(subOl);
      subLi.appendChild(subDetails);
      ol.appendChild(subLi);
    });

    details.appendChild(summary);
    details.appendChild(ol);
    studyContainer.appendChild(details);
  });
}

// [헬퍼 함수] 리스트 아이템(li > a) 만드는 코드 분리
function createListItem(rootFolder, fullPath, displayName) {
  const li = document.createElement("li");
  const a = document.createElement("a");

  a.href = `./${rootFolder}/${fullPath}`;
  a.target = "study_frame";
  a.textContent = displayName;

  a.addEventListener("click", () => {
    const placeholder = document.querySelector('.placeholder_text');
    if (placeholder) placeholder.style.display = 'none';
  });

  li.appendChild(a);
  return li;
}

// 3. 실행
renderStudyList();