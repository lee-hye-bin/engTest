/*********** include Header 헤더를 로드하는 함수 ***********/
function loadHeader() {
  fetch('/subPage/test/html/subpage_test_header.html')
    .then(response => response.text())
    .then(data => {
      document.querySelector('.header_include').innerHTML = data;
      initializeHeaderEvents(); // 헤더 로드 후 이벤트 초기화
      searchHeader();
      responsiveclickSearchBtn();
      clickHamburger();
      responsiveNavigation();
    })
    .catch(error => console.error('Error loading header:', error));
}

/*********** 헤더 Search 함수 ***********/
function searchHeader(){
  //변수설정
  let searchBtn = document.getElementById('search_btn');
  let searchCloseBtn = document.getElementById('search_close_btn');
  let headerNav = document.getElementById('header_nav');
  let headerSearch = document.getElementById('header_search');

  let Header = document.getElementById('header');
  //돋보기(.header_icon의 #search_btn) 클릭시
  /* 
  .header_icon의 #search_btn이 display: none;
  .header_icon의 #search_close_btn이 display: block;
  */
  /* 
  #header_nav display: none;
  #header_search display: block;
  */
  searchBtn.addEventListener('click',()=>{
    searchBtn.style.display = 'none';
    searchCloseBtn.style.display = 'block';
    headerNav.style.display = 'none';
    headerSearch.style.display = 'block';
  })
  
  //X창(.header_icon의 #search_close_btn) 클릭시
  /* 
  .header_icon의 #search_btn이 display: block;
  .header_icon의 #search_close_btn이 display: none;
  */
  /* 
  #header_nav display: block;
  #header_search display: none;
  */
  searchCloseBtn.addEventListener('click',()=>{
    searchCloseBtn.style.display = 'none';
    searchBtn.style.display = 'block';
    headerNav.style.display = 'block';
    headerSearch.style.display = 'none';
  })
  headerOut();
}
/*********** 헤더에서 마우스 leave시 적용되는 함수 ***********/
function headerOut(){
  let searchBtn = document.getElementById('search_btn');
  let searchCloseBtn = document.getElementById('search_close_btn');
  let headerNav = document.getElementById('header_nav');
  let headerSearch = document.getElementById('header_search');

  let Header = document.getElementById('header');

  Header.addEventListener('mouseleave', ()=>{
    searchCloseBtn.style.display = 'none';
    searchBtn.style.display = 'block';
    headerNav.style.display = 'block';
    headerSearch.style.display = 'none';
  })
}

/*********** 헤더 서브메뉴 함수 ***********/
// 서브메뉴 열림/닫힘 이벤트를 초기화
function initializeHeaderEvents() {
  document.querySelectorAll('.nav_list').forEach(navItem => {
    const dropdown = navItem.querySelector('.dropdown');

    if (dropdown) {
      // 마우스 오버 시 서브메뉴 열기
      navItem.addEventListener('mouseenter', () => {
        dropdown.classList.add('active');
        dropdown.style.maxHeight = dropdown.scrollHeight + 'px'; // 높이를 내부 콘텐츠에 맞춤
      });

      // 마우스 아웃 시 서브메뉴 닫기
      navItem.addEventListener('mouseleave', () => {
        dropdown.classList.remove('active');
        dropdown.style.maxHeight = null; // 높이 초기화
      });
    }
  });
}

/*********** 반응형 헤더 search 버튼 함수  ***********/
function responsiveclickSearchBtn(){
  let responsiveSearchBtn = document.getElementById('responsive_search_btn');
  let responsiveCloseBtn = document.getElementById('responsive_close_btn');
  let responsiveSearch = document.getElementById('responsive_search');

  responsiveSearchBtn.addEventListener('click',()=>{
    responsiveCloseBtn.style.display = 'block';
    responsiveSearchBtn.style.display = 'none'
    responsiveSearch.style.display = 'block'
  })

  responsiveCloseBtn.addEventListener('click',()=>{
    responsiveCloseBtn.style.display = 'none';
    responsiveSearchBtn.style.display = 'block';
    responsiveSearch.style.display = 'none'
  })
}

/*********** 반응형 헤더 hamburger 버튼 함수  ***********/
function clickHamburger(){
  let responsiveHamburgerBtn = document.getElementById('responsive_hamburger_btn');

  let responsiveInnerBottom = document.getElementById('responsive_inner_bottom');

  responsiveHamburgerBtn.addEventListener('click',()=>{
    responsiveHamburgerBtn.classList.toggle('active');

    if(responsiveInnerBottom.style.display === 'block'){
      responsiveInnerBottom.style.display = 'none';
    }else{
      responsiveInnerBottom.style.display = 'block';
    }
    //responsiveHeaderInnerBottom.style.display = 'block' ? 'none' : 'block';
  })
}

/*********** 반응형 헤더 navigation accordion 함수  ***********/
function responsiveNavigation() {
  let responsiveNav = document.querySelectorAll('.responsive_nav_wrap');
  console.log('전체 메뉴 수:', responsiveNav.length); // 메뉴 개수 확인

  responsiveNav.forEach((navi, index) => {
    let title = navi.querySelector('.responsive_title');
    let submenu = navi.querySelector('.responsive_submenu');

    // 각 메뉴에 대해 로그 추가
    console.log(`메뉴 ${index + 1}:`, { title, submenu });

    if (title && submenu) {
      title.addEventListener('click', function () {
        console.log(`"${title.textContent.trim()}" 클릭됨`); // 클릭된 제목 로그

        let currentMaxHeight = getComputedStyle(submenu).maxHeight;
        console.log('현재 maxHeight:', currentMaxHeight); // 현재 maxHeight 확인

        // 모든 메뉴 접기
        responsiveNav.forEach((e, subIndex) => {
          let otherSubmenu = e.querySelector('.responsive_submenu');
          if (otherSubmenu) {
            console.log(`메뉴 ${subIndex + 1} 접힘`); // 접힌 메뉴 로그
            otherSubmenu.style.maxHeight = '0';
          }
        });

        // 현재 클릭한 메뉴 펼치기 / 접기
        if (currentMaxHeight === '0px') {
          submenu.style.maxHeight = submenu.scrollHeight + 'px';
          console.log('펼치기:', submenu.scrollHeight + 'px'); // 펼쳐지는 높이 로그
        } else {
          submenu.style.maxHeight = '0';
          console.log('접힘'); // 접힘 로그
        }
      });
    } else {
      console.warn(`메뉴 ${index + 1}에 title 또는 submenu가 없음`); // 누락된 요소 경고
    }
  });
}
loadHeader();

/*********** Side_Menu 함수 ***********/
let sideMenuCharacter = document.getElementById('sideMenuCharacter');
let sideMenu = document.getElementById('sideMenu');

function sideMenuClick(){
  sideMenuCharacter.addEventListener('click', ()=>{
    sideMenu.classList.toggle('active');
  })
}
sideMenuClick()

/********* Subpage_Test_Container 시험문제 함수  *********/
const test = [
  { 
    type: "image",
    question: "다음 영단어에 알맞은 그림을 고르세요.",
    text: "sour",
    answers: ["images/Q1_1.png", "images/Q1_2.png", "images/Q1_3.png"], 
    correct: 1 
  }, //1번
  { 
    type: "image",
    question: "다음 영어 단어에 알맞은 그림을 고르세요.",
    text: "satellite",
    answers: ["images/Q2_1.png", "images/Q2_2.png", "images/Q2_3.png"], 
    correct: 3
  }, //2번
  { 
    type: "image", 
    question: "다음 영어 단어에 알맞은 그림을 고르세요.", 
    text: "violin",
    answers: ["images/Q3_1.png", "images/Q3_2.png", "images/Q3_3.png"], 
    correct: 3
  }, //3번
  { 
    type: "image", 
    question: "다음 영단어에 알맞은 그림 또는 사진을 고르세요.", 
    text: "instrument",
    answers: ["images/Q4_1.png", "images/Q4_2.png", "images/Q4_3.png"], 
    correct: 3
  }, //4번
  { 
    type: "text", 
    question: "다음 그림을 보고, 알맞은 영단어를 고르세요.", 
    image: "images/Q5.png", 
    answers: ["sell", "precious", "scientist"], 
    correct: 3 
  }, //5번
  { 
    type: "text", 
    question: "다음 중 우리말 뜻에 알맞은 영단어를, 영단어에는 알맞은 우리말 뜻을 고르세요.", 
    text: "머리카락",
    answers: ["finger", "brain", "hair"], 
    correct: 3
  }, //6번
  { 
    type: "text", 
    question: "다음 중 우리말 뜻에 알맞은 영단어를, 영단어에는 알맞은 우리말 뜻을 고르세요.",
    text: "곡선",
    answers: ["line", "curve", "wavy"], 
    correct: 2
  }, //7번
  { 
    type: "text", 
    question: "다음 중 우리말 뜻에 알맞은 영단어를, 영단어에는 알맞은 우리말 뜻을 고르세요.",
    text: "architect",
    answers: ["건축가", "건물", "설계"], 
    correct: 1
  }, //8번
  { 
    type: "text", 
    question: "다음 문장에 알맞은 우리말 뜻을 고르세요.",
    text: "Come to class on time.",
    answers: ["수업에 제시간에 맞추어서 왔어요.", "수업에 제시간에 맞추어서 올 거예요.", "수업에 제시간에 맞추어서 오세요."], 
    correct: 3
  }, //9번
  { 
    type: "text", 
    question: "다음 문장에 알맞은 우리말 뜻을 고르세요.", 
    text: "It took two hours.",
    answers: ["그것은 2시간입니다.", "2시간이 걸렸습니다.", "그것은 2개입니다."], 
    correct: 2
  }, //10번
  { 
    type: "text", 
    question: "우리말 뜻에 맞게 빈칸에 들어갈 표현을 고르세요.",
    text: `잭슨은 책을 팔아요.</br> <i class="bi bi-arrow-right"></i> Jackson ____ a book.`,
    answers: ["sell", "sells", "selling"], 
    correct: 2
  }, //11번
  { 
    type: "text", 
    question: "우리말 뜻에 맞게 빈칸에 들어갈 표현을 고르세요.", 
    text: `그는 음악가였습니다.</br> <i class="bi bi-arrow-right"></i> ____ ____ a musician.`,
    answers: ["He is", "He was", "He were"], 
    correct: 2 
  }, //12번
  { 
    type: "text", 
    question: "우리말 뜻에 맞게 빈칸에 들어갈 표현을 고르세요.",
    text: `우리는 물로 얼음을 만들 수 있습니다.</br> <i class="bi bi-arrow-right"></i> We can make ice ____ ____.`,
    answers: ["in water", "to water", "from water"], 
    correct: 3 
  }, //13번
  { 
    type: "text", 
    question: "우리말 뜻에 맞게 빈칸에 들어갈 표현을 고르세요.",
    text: `여러분은 수영모를 써야 해요.</br> <i class="bi bi-arrow-right"></i> You ______ wear a swimming cap.`,
    answers: ["are", "can’t", "should"],
    correct: 3 
  }, //14번
  { 
    type: "text", 
    question: "다음 글을 읽고 질문에 답하세요.",
    text: `My family goes to the playground.</br>I get on the _____. I go down.</br> Dad gets on. I go up!</br>Dad is heavy.`,
    question_text: " 다음 빈칸에 알맞은 놀이기구는 무엇일까요? ",
    answers: ["시소", "미끄럼틀", "그네"], 
    correct: 1
  }, //15번
  { 
    type: "text", 
    question: "다음 글을 읽고 질문에 답하세요.",
    text: `I see the flower.</br>I see the butterfly.</br>I see the frog.</br>Spring is beatiful!`,
    question_text: " 지금 계절에서 내가 보는 것이 아닌 것은 무엇인가요? ", 
    answers: ["꽃", "나비", "눈"], 
    correct: 3 
  }, //16번
  { 
    type: "text", 
    question: "다음 글을 읽고 질문에 답하세요.",
    text: `I am buying five carrots.</br>It is 600 won for each carrot.</br>Five carrots are 3,000 won.`,
    question_text: " 현재 나는 어디에 있을까요? ", 
    answers: ["at school", "at a beach", "at a market"], 
    correct: 3 
  }, //17번
  { 
    type: "text", 
    question: "다음 글을 읽고 질문에 답하세요.",
    text: `We have many ____ today.</br>We travel by car, subway, train, or airplane.</br>We can go to many places very quickly.`,
    question_text: " 무엇에 관한 이야기인가요? ", 
    answers: ["why we travel", "how we travel today", "how we make trains"], 
    correct: 2 
  }, //18번
  { 
    type: "text", 
    question: "다음 글을 읽고 질문에 답하세요.",
    text: `Doughnuts are fried bread from the Netherlands.</br>They have a hole, so they look like a ring.</br>They taste sweet.</br></br>Croissants are pastry form Austria.</br>They look like a crecent moon.</br>They are crispy on the outside, nut soft on the inside.`,
    question_text: " 무엇에 관한 이야기인가요? ",
    answers: ["two types of bread", "sweet doughnuts", "Austrian bread"], 
    correct: 1 
  }, //19번
  { 
    type: "text", 
    question: " 19번의 본문을 읽고 질문에 답하세요. ", 
    text: `
        <table>
          <thead>
            <tr>
              <th>Doughnuts</th>
              <th>Croissant</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>from Netherlands</br>look like a ⓐ______</td>
              <td>from Austria</br>look like a ⓑ______</td>
            </tr>
          </tbody>
        </table>`,
    question_text: " 다음 본문에 맞춰 들어갈 말로 짝지어진 것을 고르세요. ",
    answers: ["ⓐ moon - ⓑ ring", "ⓐ ring - ⓑ crecent moon", "ⓐ sweet - ⓑ crispy"], 
    correct: 2 
  }, //20번
];
let answeredQuestions = Array(test.length).fill(false); // 모든 문제 초기 상태는 false
let score = 0; //시작 점수 0점

//테스트 시작
function startTest(){
  const contentsTest = document.getElementById('contents_test')
  const testWrap = document.getElementById('test_wrap')
  const fileInage = document.getElementById('test_file')
  const pencilInage = document.getElementById('test_pencil')



  //user_info에 입력된 값 가져오기
  const name = document.getElementById('child-name').value;
  const gender = document.getElementById('child-gender').value;
  const birthday = document.getElementById('child-birthday').value;

  //누락된 항목 메시지 배열
  let missingInfo = [];

  //누락된 항목이 있는지 체크
  if(!name) missingInfo.push('이름');
  if(!gender) missingInfo.push('성별');
  if(!birthday) missingInfo.push('생일');

  //누락된 항목이 있다면 메시지 표시
  if(missingInfo.length > 0){
    alert(`${missingInfo.join(", ")}을(를) 다시 입력해주세요.`);
    return;
  }

  contentsTest.style.display = 'none';
  fileInage.style.display = 'none';
  pencilInage.style.display = 'none';
  testWrap.style.display = 'block';
}

/* Test_Container 문제 출력함수 */
function createTest(){
  const testContainer = document.getElementById('test_container')
  //testContainer.innerHTML = ''; //기존 내용 제거

  test.forEach((q, index)=> {
    //문제를 담을 div 생성
    const questionDiv = document.createElement('div');
    questionDiv.className = 'question';
    testContainer.appendChild(questionDiv)
    //질문 덱스트 추가
    const questionText = document.createElement('p')
    questionText.innerHTML = `${index + 1}. ${q.question}`;
    questionDiv.appendChild(questionText);

    //text가 포함이 되어 있는 경우
    if(q.text){
      // 문제Text를 담을 div 생성
      const textDiv = document.createElement("div");
      textDiv.className = "text";
      questionDiv.appendChild(textDiv);
      // 문제Text 텍스트 추가
      const textText = document.createElement("p");
      textText.innerHTML = `${q.text}`;
      textDiv.appendChild(textText);
    }

    //question_text가 포함이 되어 있는 경우
    if(q.question_text){
      // question_text를 담을 div 생성
      const questionInnerDiv = document.createElement("div");
      questionInnerDiv.className = "question_text";
      questionDiv.appendChild(questionInnerDiv);
      // question_text 텍스트 추가
      const questionInnerText = document.createElement("p");
      questionInnerText.innerHTML = `${q.question_text}`;
      questionInnerDiv.appendChild(questionInnerText);
    }
    // 이미지 출력 처리 (type: "text"에도 image가 포함된 경우)
    if (q.type === "text" && q.image) {
      const imageElement = document.createElement("img");
      imageElement.src = q.image;
      imageElement.alt = `Question Image ${index + 1}`;
      imageElement.className = "question_image";
      questionDiv.appendChild(imageElement);
    }
    
    // 이미지 문제 처리 (type: "image")
    if (q.type === "image") {
      const answersDiv = document.createElement("div");
      answersDiv.className = "answers";
      q.answers.forEach((answer, i) => {
        const imageWrap = document.createElement("div");
        imageWrap.classList.add("image_wrapper");
        const img = document.createElement("img");
        img.src = answer;
        img.classList.add("answer_img");
        img.onclick = () => {

          const allImageWrap = answersDiv.querySelectorAll(".image_wrapper");
          allImageWrap.forEach(wrapper => wrapper.classList.remove("active"));
          imageWrap.classList.add("active");

          //정답 선택했으면 점수 +1
	        //정답 선택했다가 오답으로 답 바꾸면 -1
          //처음부터 정답 선택한거 아니라면 그대로
          if (i === q.correct - 1) {
            // 정답을 선택한 경우
            if (!answeredQuestions[index]) {
              // 이전에 정답을 선택한 적이 없다면 점수 증가
              score++;
              answeredQuestions[index] = true;
            }
          } else {
            // 정답이 아닌 답을 선택한 경우
            if (answeredQuestions[index]) {
              // 이전에 정답을 선택했다면 점수 감소
              score--;
              answeredQuestions[index] = false;
            }
          }
          console.log(`현재 점수: ${score}`);
        };
        imageWrap.appendChild(img);
        answersDiv.appendChild(imageWrap);
      });
      questionDiv.appendChild(answersDiv);
    }
    // 텍스트 문제 처리 (type: "text")
    if (q.type === "text") {
      const answersDiv = document.createElement("div");
      answersDiv.className = "answers";
      q.answers.forEach((answer, i) => {
        const textWrap = document.createElement("div");
        textWrap.innerText = answer;
        textWrap.className = "answer_text";
        textWrap.onclick = () => {

          const allTextWrap = answersDiv.querySelectorAll(".answer_text");
          allTextWrap.forEach(div => div.classList.remove("active"));
          textWrap.classList.add("active");

          if (i === q.correct - 1) {
            // 정답을 선택한 경우
            if (!answeredQuestions[index]) {
              // 이전에 정답을 선택한 적이 없다면 점수 증가
              score++;
              answeredQuestions[index] = true;
            }
          } else {
            // 정답이 아닌 답을 선택한 경우
            if (answeredQuestions[index]) {
              // 이전에 정답을 선택했다면 점수 감소
              score--;
              answeredQuestions[index] = false;
            }
          }
          console.log(`현재 점수: ${score}`);
        };
        answersDiv.appendChild(textWrap);
      });
      questionDiv.appendChild(answersDiv);
    }
    // questionDiv를 컨테이너에 추가
    testContainer.appendChild(questionDiv);    
  }) 
}

document.addEventListener('DOMContentLoaded', ()=>{
  createTest();
  //createPagination();
  //displayRow(0); //초기 페이지 먼저 보이게
})

/*********** include Footer 푸터를 로드하는 함수 ***********/
fetch('/subPage/test/html/subpage_test_footer.html')
.then(response => response.text())
.then(data =>{
  document.querySelector('.footer_include').innerHTML = data;
})