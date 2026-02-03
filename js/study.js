const studyContainer = document.getElementById("study_list_container");

//데이터 정의
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
      // 슬래시(/)가 있으면 자동으로 내부 폴더로 인식합니다.
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
      // 01_position
      "01_position/01_position_absolute.html",
      "01_position/02_position_relative.html",
      "01_position/03_position_advanced.html",
      // 02_flex (01_test 폴더는 비어있는 것으로 보여 제외했습니다)
      "02_flex/01_flex_box.html",
      "02_flex/02_flex_box2.html",
      "02_flex/03_flex_advanced.html",
      // 03_copy_site
      "03_copy_site/01_copy_site.html",
      "03_copy_site/02_copy_site2.html",
      "03_copy_site/style.css",
      "03_copy_site/style2.css",
      // 04_drop_down
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
    files: [
      "01_flex/01_flex.html",
      "02_calc/01_calc.html",
      "01_faq.html", // 폴더 없이 최상위에 있는 파일
    ],
  }
];

// 렌더링 함수
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

    //파일들을 폴더별로 그룹화하기
    const groups = {};

    data.files.forEach((filePath) => {
      const parts = filePath.split("/"); // 슬래시로 쪼개기

      if (parts.length > 1) {
        // 경로가 있는 경우
        // 예: "folder/file.html"
        const folderName = parts[0]; // "folder"
        const fileName = parts[1]; // "file.html"

        // 그룹이 없으면 배열 생성
        if (!groups[folderName]) groups[folderName] = [];

        // 해당 그룹에 파일 추가
        groups[folderName].push({ path: filePath, name: fileName });
      } else {
        // 그냥 파일인 경우
        if (!groups["root"]) groups["root"] = [];
        groups["root"].push({ path: filePath, name: filePath });
      }
    });

    // 루트 파일들 (폴더 없는 애들) 먼저 출력
    if (groups["root"]) {
      groups["root"].forEach((file) => {
        const li = createListItem(data.folderName, file.path, file.name);
        ol.appendChild(li);
      });
    }

    // 내부 폴더들 출력
    Object.keys(groups).forEach((key) => {
      if (key === "root") return; // 루트는 이미 했으니 패스

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

// 리스트 아이템(li > a) 만드는 코드
function createListItem(rootFolder, fullPath, displayName) {
  const li = document.createElement("li");
  const a = document.createElement("a");

  a.href = `./${rootFolder}/${fullPath}`;
  a.target = "study_frame";
  a.textContent = displayName;

  a.addEventListener("click", () => {
    const placeholder = document.querySelector(".placeholder_text");
    if (placeholder) placeholder.style.display = "none";
  });

  li.appendChild(a);
  return li;
}

//실행
renderStudyList();
