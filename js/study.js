// 각종 예제 파일 경로 및 이름들
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
      "07_hyperlink.html",
    ],
  },
  {
    folderName: "20260123_yeodohyun",
    date: "20260123",
    files: ["1.html", "2.html"],
  },
  {
    folderName: "20260126_yeodohyun",
    date: "20260126",
    files: [
      "01_form_css/01_naver_form.html",
      "01_form_css/02_readonly.html",
      "02_block_inline/01_change_to_block_inline.html",
      "02_block_inline/02_shadow.html",
    ],
  },
  {
    folderName: "20260127_yeodohyun",
    date: "20260127",
    files: [
      "01_position/01_position_absolute.html",
      "01_position/02_position_relative.html",
      "01_position/03_position_advanced.html",
      "02_flex/01_flex_box.html",
      "02_flex/02_flex_box2.html",
      "02_flex/03_flex_advanced.html",
      "03_copy_site/01_copy_site.html",
      "03_copy_site/02_copy_site2.html",
      "03_copy_site/style.css",
      "03_copy_site/style2.css",
      "04_drop_down/01_drop_down.html",
      "04_drop_down/02_drop_down_advanced.html",
    ],
  },
  {
    folderName: "20260128_yeodohyun",
    date: "20260128",
    files: [],
  },
  {
    folderName: "20260129_yeodohyun",
    date: "20260129",
    files: [
      "00_work/starbucks.html",
      "00_work/test.html",
      "01_animation/01_animation01.html",
      "01_animation/02_animation02.html",
      "01_animation/03_animation03.html",
      "02_nth/01_nth_of_type01.html",
      "02_nth/02_nth_of_type02.html",
      "03_opacity_hover/01_opacity_hover.html",
      "04_list/01_list_style.html",
      "05_media_query/01_media_query01.html",
      "05_media_query/02_media_query02.html",
      "05_media_query/03_media_query03.html",
      "05_media_query/04_media_query_menubar.html",
      "05_media_query/05_media_query_menubar02.html",
    ],
  },
  {
    folderName: "20260130_yeodohyun",
    date: "20260130",
    files: [],
  },
  {
    folderName: "20260202_yeodohyun",
    date: "20260202",
    files: [
      "01_toggle/01_toggle.html",
      "02_tab/01_tab_css.html",
      "02_tab/02_tab_js.html",
      "02_tab/03_tab_css_advanced.html",
      "03_virtual/01_virtual.html",
      "03_virtual/02_virtual_practice.html",
      "04_variable/01_variable_video.html",
    ],
  },
  {
    folderName: "20260203_yeodohyun",
    date: "20260203",
    files: ["01_flex/01_flex.html", "02_calc/01_calc.html", "01_faq.html"],
  },
];

/* ==================================================================== */
const studyContainer = document.getElementById("study_list_container");
const sidebarHeader = document.getElementById("sidebar_header_toggle");
const sidebar = document.querySelector(".sidebar");
const pathDisplay = document.getElementById("current_path_display");

/* ================================== 렌더링 함수 ================================== */
function renderStudyList() {
  if (!studyContainer) return;

  studyContainer.innerHTML = "";

  studyData.forEach((data, index) => {
    // 1. 큰 날짜 폴더 생성
    const details = document.createElement("details");

    // 첫 번째 폴더이면서 + PC 화면(768px 초과)일 때만 열어두기
    if (index === 0 && window.innerWidth > 768) {
      details.open = true;
    }

    const summary = document.createElement("summary");
    summary.className = "date";
    summary.textContent = data.date;

    const ol = document.createElement("ol");

    // 파일들을 폴더별로 그룹화
    const groups = {};

    data.files.forEach((filePath) => {
      const parts = filePath.split("/");

      if (parts.length > 1) {
        // 하위 폴더가 있는 경우
        const folderName = parts[0];
        const fileName = parts[1];
        if (!groups[folderName]) groups[folderName] = [];
        groups[folderName].push({ path: filePath, name: fileName });
      } else {
        // 최상위 파일인 경우
        if (!groups["root"]) groups["root"] = [];
        groups["root"].push({ path: filePath, name: filePath });
      }
    });

    // 2-1. 루트 파일들 출력
    if (groups["root"]) {
      groups["root"].forEach((file) => {
        const li = createListItem(data.folderName, file.path, file.name);
        ol.appendChild(li);
      });
    }

    // 2-2. 내부 폴더들 출력
    Object.keys(groups).forEach((key) => {
      if (key === "root") return;

      const subLi = document.createElement("li");
      const subDetails = document.createElement("details");
      subDetails.open = true;

      const subSummary = document.createElement("summary");
      subSummary.className = "sub-folder";
      subSummary.textContent = ` ${key}`;

      const subOl = document.createElement("ol");
      subOl.className = "sub-list";

      groups[key].forEach((file) => {
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

// 리스트 아이템(li > a) 생성 함수
function createListItem(rootFolder, fullPath, displayName) {
  const li = document.createElement("li");
  const a = document.createElement("a");

  a.href = `./${rootFolder}/${fullPath}`;
  a.target = "study_frame";
  a.textContent = displayName;

  li.appendChild(a);
  return li;
}

// 초기 렌더링 실행
renderStudyList();

/* ================================== 통합 이벤트 핸들러 ================================== */

// 4-1. 파일 리스트 클릭 이벤트
if (studyContainer) {
  studyContainer.addEventListener("click", function (e) {
    // A 태그(파일)를 클릭했을 때만 동작
    if (e.target.tagName === "A") {
      const clickedFile = e.target;

      // Active 클래스 토글 (현재 선택 강조)
      const allLinks = studyContainer.querySelectorAll("a");
      allLinks.forEach((link) => link.classList.remove("active"));
      clickedFile.classList.add("active");

      // Placeholder(안내 문구) 숨기기
      const placeholders = document.querySelectorAll(".placeholder_text");
      placeholders.forEach((ph) => (ph.style.display = "none"));

      // 다중 폴더 경로 추적 및 표시
      let pathParts = [];
      let currentElement = clickedFile.parentElement; // li부터 시작

      // 상위 요소들을 타고 올라가며 details(폴더명) 찾기
      while (currentElement) {
        if (currentElement.id === "study_list_container") break;

        if (currentElement.tagName === "DETAILS") {
          const summary = currentElement.querySelector("summary");
          if (summary) {
            pathParts.unshift(summary.innerText.trim());
          }
        }
        currentElement = currentElement.parentElement;
      }

      // 최종 경로 조합 (폴더1 / 폴더2 / 파일명)
      const fileName = clickedFile.innerText.trim();
      const fullPath = pathParts.join(" / ") + " / " + fileName;

      if (pathDisplay) {
        pathDisplay.innerText = fullPath;
        pathDisplay.classList.add("active"); // CSS에서 보이게 처리
      }

      // 모바일 환경: 선택 후 리스트 접기
      if (window.innerWidth <= 768) {
        if (sidebar) sidebar.classList.remove("open");
      }
    }
  });
}

// 4-2. 사이드바 토글
if (sidebarHeader) {
  sidebarHeader.addEventListener("click", () => {
    // 화면 너비 체크
    if (window.innerWidth <= 768) {
      // [모바일 동작] 위아래로 접기/펼치기 (기존 로직)
      if (sidebar) sidebar.classList.toggle("open");
    } else {
      // [PC 동작] 왼쪽으로 접기/펼치기 (신규 로직)
      if (sidebar) sidebar.classList.toggle("closed");
    }
  });
}

/* ================================== 창 크기 변경 ================================== */
window.addEventListener("resize", () => {
  // 모바일 화면으로 진입 시 (768px 이하)
  if (window.innerWidth <= 768) {
    // PC에서 쓰던 'closed' 클래스가 있다면 제거 (모바일 레이아웃 깨짐 방지)
    if (sidebar.classList.contains("closed")) {
      sidebar.classList.remove("closed");
    }
  }
  // PC 화면으로 진입 시 (769px 이상)
  else {
    // 모바일에서 쓰던 'open' 클래스가 있다면 제거
    if (sidebar.classList.contains("open")) {
      sidebar.classList.remove("open");
    }
  }
});
