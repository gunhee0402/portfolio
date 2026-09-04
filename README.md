# Portfolio Website

HTML, CSS, JavaScript를 사용하여 제작한 개인 포트폴리오 웹사이트입니다.

프로필, 기술 스택, GitHub 프로젝트, 연락처 등의 내용을 구성하고, JavaScript를 활용하여 사용자와 상호작용할 수 있는 기능을 구현했습니다.

---

## 1. 프로젝트 소개

### 프로젝트 목적

HTML, CSS, JavaScript의 기본 개념을 활용하여 웹페이지의 구조와 디자인을 직접 설계하고, JavaScript를 이용한 DOM 제어와 이벤트 처리를 경험하는 것을 목적으로 제작했습니다.

단순한 정적 페이지가 아닌 사용자와 상호작용할 수 있도록 다양한 기능을 추가했습니다.

### 주요 기능

- 반응형 웹 디자인
- 다크모드
- 모바일 햄버거 메뉴
- 스크롤에 따른 헤더 스타일 변경
- 맨 위로 이동 버튼
- 스크롤 애니메이션
- GitHub API를 이용한 프로젝트 자동 불러오기
- GitHub 프로젝트 언어별 필터링
- 연락처 폼 유효성 검사
- 타이핑 효과
- `localStorage`를 이용한 다크모드 설정 유지

### 사용 기술

- HTML5
- CSS3
- JavaScript
- GitHub REST API
- GitHub Pages

---

## 2. 배포

GitHub Pages를 이용하여 웹사이트를 배포했습니다.

**배포 주소:**  
[배포된 포트폴리오 주소 입력]

GitHub 저장소에 변경사항을 `commit`하고 `push`하면 GitHub Pages를 통해 변경된 내용이 배포됩니다.

---

## 3. 프로젝트 구조

~~~text
portfolio/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── images/
└── README.md
~~~

### 파일별 역할

- `index.html` : 웹페이지의 전체 구조와 콘텐츠
- `css/style.css` : 페이지의 디자인, 레이아웃, 반응형 스타일
- `js/script.js` : 이벤트 처리, DOM 조작, API 요청 등의 동작
- `images/` : 포트폴리오에 사용되는 이미지
- `README.md` : 프로젝트 설명 및 구현 내용

HTML, CSS, JavaScript를 각각 파일로 분리하여 구조와 디자인, 동작을 독립적으로 관리할 수 있도록 구성했습니다.

---

## 4. 주요 기능

### 4.1 반응형 웹

화면 크기에 따라 레이아웃이 변경되도록 구현했습니다.

CSS의 미디어 쿼리를 이용하여 모바일, 태블릿, 데스크톱 환경을 구분했습니다.

- 모바일: `max-width: 767px`
- 태블릿: `min-width: 768px`
- 데스크톱: `min-width: 1024px`

모바일에서는 네비게이션 메뉴를 햄버거 메뉴로 변경하고, 화면 크기에 따라 글자 크기와 여백 등을 조절했습니다.

---

### 4.2 다크모드

사용자가 버튼을 클릭하면 라이트모드와 다크모드를 전환할 수 있도록 구현했습니다.

JavaScript에서 HTML 요소의 `data-theme` 속성을 변경하고, CSS에서는 해당 속성을 기준으로 CSS 변수를 변경합니다.

~~~css
:root {
    --bg-color: #ffffff;
    --text-color: #222222;
    --main-color: #2563eb;
}

[data-theme="dark"] {
    --bg-color: #111111;
    --text-color: #eeeeee;
    --main-color: #60a5fa;
}
~~~

CSS 변수를 사용하면 여러 요소의 색상을 각각 수정하지 않고, 테마에 따라 공통으로 사용하는 값을 변경할 수 있습니다.

또한 `localStorage`에 현재 테마를 저장하여 페이지를 새로고침해도 사용자가 선택한 테마가 유지되도록 구현했습니다.

---

### 4.3 모바일 햄버거 메뉴

화면 너비가 작아지면 기존 네비게이션 메뉴를 숨기고 햄버거 버튼을 표시하도록 구현했습니다.

버튼 클릭 시 `addEventListener()`를 사용하여 클릭 이벤트를 감지하고, `classList.toggle()`을 이용하여 메뉴의 `active` 클래스를 추가하거나 제거합니다.

~~~javascript
menuButton.addEventListener("click", function () {
    navMenu.classList.toggle("active");
});
~~~

이를 통해 하나의 버튼으로 메뉴의 표시 상태를 전환할 수 있습니다.

---

### 4.4 스크롤에 따른 헤더 스타일 변경

사용자가 일정 위치 이상 스크롤하면 헤더에 `scrolled` 클래스를 추가하도록 구현했습니다.

~~~javascript
window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});
~~~

CSS에서는 `scrolled` 클래스가 추가되었을 때 헤더에 그림자를 적용하여 스크롤 위치를 시각적으로 구분했습니다.

---

### 4.5 맨 위로 이동 버튼

페이지를 일정 거리 이상 스크롤하면 맨 위로 이동하는 버튼이 나타나도록 구현했습니다.

버튼을 클릭하면 `window.scrollTo()`를 사용하여 페이지의 최상단으로 부드럽게 이동합니다.

~~~javascript
topButton.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
~~~

---

### 4.6 스크롤 애니메이션

각 `section`의 위치를 확인하여 화면에 들어온 영역에 `show` 클래스를 추가했습니다.

CSS에서는 `opacity`와 `transform`, `transition`을 이용하여 콘텐츠가 아래에서 위로 나타나는 효과를 구현했습니다.

~~~javascript
const sections = document.querySelectorAll("section");

window.addEventListener("scroll", function () {
    sections.forEach(function (section) {
        const sectionTop = section.getBoundingClientRect().top;

        if (sectionTop < window.innerHeight - 100) {
            section.classList.add("show");
        } else {
            section.classList.remove("show");
        }
    });
});
~~~

---

## 5. HTML 구조 및 시맨틱 태그

### 5.1 시맨틱 태그란?

시맨틱 태그는 HTML 요소의 의미와 역할을 명확하게 나타내는 태그입니다.

대표적으로 다음과 같은 태그가 있습니다.

- `<header>` : 페이지 또는 특정 영역의 상단 부분
- `<nav>` : 주요 네비게이션 영역
- `<main>` : 페이지의 핵심 콘텐츠
- `<section>` : 콘텐츠를 주제별로 구분
- `<article>` : 독립적으로 구분할 수 있는 콘텐츠
- `<footer>` : 페이지 하단 정보

### 5.2 시맨틱 태그를 사용한 이유

페이지의 모든 영역을 `<div>`로 구성하는 대신 각 콘텐츠의 역할에 맞는 시맨틱 태그를 사용했습니다.

시맨틱 태그를 사용하면 HTML 구조만 보더라도 각 영역의 역할을 쉽게 파악할 수 있습니다.

또한 콘텐츠의 의미를 명확하게 표현할 수 있어 코드의 가독성과 유지보수에 도움이 되며, 웹 접근성 측면에서도 의미 있는 구조를 만들 수 있습니다.

### 5.3 페이지 구조 설계

페이지의 전체적인 구조를 다음과 같이 구성했습니다.

~~~text
<header>
    <nav>
        네비게이션
    </nav>
</header>

<main>
    <section id="home">
        Hero
    </section>

    <section id="about">
        About Me
    </section>

    <section id="skills">
        Skills
    </section>

    <section id="projects">
        Projects
    </section>

    <section id="contact">
        Contact
    </section>
</main>

<footer>
    Footer
</footer>
~~~

상단 메뉴는 `<header>`와 `<nav>`로 구분하고, 페이지의 핵심 콘텐츠는 `<main>` 안에 배치했습니다.

각 콘텐츠 영역은 목적에 따라 `<section>`으로 나누었으며, GitHub 프로젝트와 같이 독립적인 콘텐츠는 `<article>`을 사용하여 구성했습니다.

이와 같이 콘텐츠의 역할을 기준으로 HTML 구조를 설계했습니다.

---

## 6. CSS 설계 및 반응형 구현

### 6.1 CSS 변수

페이지에서 반복적으로 사용하는 색상을 CSS 변수로 정의했습니다.

~~~css
:root {
    --bg-color: #ffffff;
    --text-color: #222222;
    --main-color: #2563eb;
}
~~~

이렇게 공통 값을 변수로 관리하면 동일한 색상을 사용하는 여러 요소를 한 번에 관리할 수 있습니다.

다크모드에서는 `[data-theme="dark"]` 선택자를 사용하여 변수의 값을 변경했습니다.

---

### 6.2 Flexbox와 Grid

CSS 레이아웃을 구성할 때 콘텐츠의 형태에 따라 Flexbox와 Grid를 구분하여 사용했습니다.

**Flexbox**는 주로 한 방향으로 요소를 배치할 때 적합합니다.

예를 들어 네비게이션에서는 메뉴 요소를 가로 방향으로 정렬해야 하므로 Flexbox를 사용했습니다.

~~~css
nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
~~~

반면 **CSS Grid**는 행과 열을 함께 사용하는 2차원 레이아웃을 구성할 때 적합합니다.

프로젝트 카드는 여러 개의 카드가 화면 크기에 따라 여러 열로 배치되어야 하므로 Grid를 사용했습니다.

~~~css
#project-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 25px;
}
~~~

따라서 요소를 한 방향으로 정렬할 필요가 있을 때는 Flexbox를, 행과 열을 기준으로 여러 콘텐츠를 배치할 때는 Grid를 선택했습니다.

---

### 6.3 반응형 웹 구현

모바일 환경을 기준으로 기본 스타일을 작성한 후 화면 크기가 커질수록 필요한 스타일을 추가하는 방식으로 반응형 디자인을 구현했습니다.

미디어 쿼리를 사용하여 화면 크기에 따라 글자 크기, 여백, 네비게이션 등의 스타일을 변경했습니다.

~~~css
@media (max-width: 767px) {
    #home h1 {
        font-size: 2rem;
    }

    section {
        padding: 60px 15px;
    }
}

@media (min-width: 768px) {
    #home h1 {
        font-size: 3rem;
    }
}

@media (min-width: 1024px) {
    #home h1 {
        font-size: 3.5rem;
    }
}
~~~

이를 통해 하나의 웹페이지가 모바일, 태블릿, 데스크톱 환경에서 각각 적절하게 표시되도록 구성했습니다.

---

### 6.4 Grid의 `auto-fit`과 `minmax()`

프로젝트 카드에는 다음과 같은 Grid 설정을 사용했습니다.

~~~css
grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
~~~

`minmax()`는 각 카드가 가질 수 있는 최소 크기와 최대 크기를 지정합니다.

`auto-fit`은 화면에 들어갈 수 있는 만큼 열을 자동으로 배치하기 때문에 화면 크기가 변경되어도 카드의 개수가 자연스럽게 조정됩니다.

이를 이용하여 별도의 화면 크기별 카드 개수를 직접 지정하지 않고도 반응형 프로젝트 목록을 만들었습니다.

---

### 6.5 Hover와 Transition

버튼과 프로젝트 카드 등에 `transition`과 `transform`을 사용하여 마우스를 올렸을 때 자연스럽게 움직이는 효과를 추가했습니다.

~~~css
#project-list article {
    transition: 0.3s;
}

#project-list article:hover {
    transform: translateY(-5px);
}
~~~

이를 통해 사용자에게 현재 마우스가 위치한 요소를 시각적으로 알려주도록 했습니다.

---

## 7. JavaScript 및 DOM 제어

### 7.1 DOM이란?

DOM(Document Object Model)은 HTML 문서를 JavaScript에서 객체 형태로 다룰 수 있도록 표현한 구조입니다.

JavaScript에서는 DOM을 선택하고 수정하여 웹페이지의 내용을 동적으로 변경할 수 있습니다.

이 프로젝트에서는 사용자 행동에 따라 화면을 변경하기 위해 DOM을 활용했습니다.

---

### 7.2 `querySelector()`를 이용한 DOM 선택

JavaScript에서 HTML 요소를 사용하기 위해 `querySelector()`를 사용했습니다.

~~~javascript
const menuButton = document.querySelector("#menu-button");
const navMenu = document.querySelector("nav ul");
~~~

`querySelector()`는 CSS 선택자와 같은 방식으로 요소를 선택합니다.

여러 요소를 선택해야 하는 경우에는 `querySelectorAll()`을 사용했습니다.

~~~javascript
const sections = document.querySelectorAll("section");
~~~

선택한 DOM 요소를 변수에 저장해두면 이후 이벤트를 연결하거나 내용을 변경할 때 해당 변수를 사용할 수 있습니다.

---

### 7.3 `addEventListener()`를 이용한 이벤트 연결

사용자의 행동을 감지하기 위해 `addEventListener()`를 사용했습니다.

~~~javascript
menuButton.addEventListener("click", function () {
    navMenu.classList.toggle("active");
});
~~~

위 코드는 다음과 같은 흐름으로 동작합니다.

1. `menuButton`이라는 DOM 요소를 선택합니다.
2. `click` 이벤트를 연결합니다.
3. 사용자가 버튼을 클릭하면 함수가 실행됩니다.
4. `navMenu`의 클래스를 변경합니다.
5. CSS에 의해 메뉴의 표시 상태가 변경됩니다.

즉, **DOM 선택 → 이벤트 연결 → 이벤트 발생 → 화면 변경**의 흐름으로 동작합니다.

---

### 7.4 `classList`를 이용한 상태 변경

HTML 요소의 클래스를 JavaScript에서 변경하기 위해 `classList`를 사용했습니다.

~~~javascript
navMenu.classList.toggle("active");
~~~

`toggle()`은 해당 클래스가 있으면 제거하고, 없으면 추가합니다.

이를 활용하여 메뉴의 열림/닫힘 상태를 간단하게 변경할 수 있습니다.

---

### 7.5 `textContent`와 `innerHTML`

화면에 텍스트를 표시하거나 HTML을 동적으로 생성하기 위해 `textContent`와 `innerHTML`을 사용했습니다.

예를 들어 폼의 오류 메시지는 `textContent`를 이용하여 변경했습니다.

~~~javascript
nameError.textContent = "이름을 입력해주세요.";
~~~

GitHub 프로젝트 카드는 여러 HTML 요소를 한 번에 생성해야 하므로 `innerHTML`을 이용했습니다.

~~~javascript
article.innerHTML = `
    <h3>${repo.name}</h3>
    <p>${repo.description || "설명이 없습니다."}</p>
    <p>언어: ${repo.language || "알 수 없음"}</p>
`;
~~~

단순한 텍스트를 변경할 때는 `textContent`를 사용하고, 여러 HTML 요소를 구성해야 하는 경우에는 `innerHTML`을 사용했습니다.

---

### 7.6 함수

반복해서 사용하거나 하나의 역할을 담당하는 동작을 함수로 분리했습니다.

예를 들어 GitHub 프로젝트를 화면에 표시하는 기능은 `renderProjects()` 함수로 분리했습니다.

~~~javascript
function renderProjects(repos) {
    projectList.innerHTML = "";

    repos.forEach(function (repo) {
        const article = document.createElement("article");

        article.innerHTML = `
            <h3>${repo.name}</h3>
            <p>${repo.description || "설명이 없습니다."}</p>
            <p>언어: ${repo.language || "알 수 없음"}</p>
        `;

        projectList.appendChild(article);
    });
}
~~~

기능을 함수로 분리하면 코드의 역할을 명확하게 구분할 수 있고, 동일한 기능을 여러 상황에서 재사용할 수 있습니다.

---

### 7.7 화살표 함수

JavaScript에서는 일반 함수 표현식 외에도 화살표 함수라는 문법을 사용할 수 있습니다.

~~~javascript
const add = (a, b) => {
    return a + b;
};
~~~

화살표 함수는 함수를 간결하게 작성할 수 있다는 장점이 있습니다.

이번 프로젝트에서는 `function` 문법을 주로 사용했지만, JavaScript에서는 배열 메서드의 콜백 함수 등에서 화살표 함수를 자주 사용할 수 있습니다.

예를 들어 다음과 같이 작성할 수 있습니다.

~~~javascript
const filteredRepos = allRepos.filter(repo => {
    return repo.language === selectedLanguage;
});
~~~

화살표 함수는 특히 짧은 콜백 함수를 작성할 때 코드의 길이를 줄이고 표현을 간결하게 만들 수 있습니다.

---

### 7.8 구조분해 할당

구조분해 할당은 객체나 배열의 값을 개별 변수로 쉽게 꺼낼 수 있는 JavaScript 문법입니다.

예를 들어 GitHub API에서 받아온 객체에서 필요한 값을 다음과 같이 꺼낼 수 있습니다.

~~~javascript
const { name, description, language, html_url } = repo;
~~~

이후 다음과 같이 사용할 수 있습니다.

~~~javascript
console.log(name);
console.log(description);
console.log(language);
console.log(html_url);
~~~

이번 프로젝트에서는 API 응답 객체 자체를 직접 사용하는 방식으로 구현했지만, 객체에서 필요한 데이터가 많아질 경우 구조분해 할당을 사용하면 코드를 더 간결하게 작성할 수 있습니다.

---

### 7.9 배열 메서드

GitHub API에서 여러 개의 저장소 데이터를 배열로 받아오기 때문에 배열 메서드를 활용할 수 있습니다.

대표적으로 `map()`과 `filter()`가 있습니다.

`map()`은 배열의 각 요소를 변환하여 새로운 배열을 만들 때 사용합니다.

~~~javascript
const names = repos.map(repo => repo.name);
~~~

`filter()`는 특정 조건에 맞는 요소만 골라 새로운 배열을 만들 때 사용합니다.

이번 프로젝트에서는 GitHub 프로젝트의 언어별 필터링을 구현하기 위해 `filter()`를 사용했습니다.

~~~javascript
const filteredRepos = allRepos.filter(function (repo) {
    return repo.language === selectedLanguage;
});
~~~

즉, `map()`은 데이터를 다른 형태로 변환할 때, `filter()`는 조건에 맞는 데이터만 선택할 때 사용하는 것이 적합합니다.

---

## 8. 이벤트 → 상태 변경 → UI 업데이트

이번 프로젝트에서는 사용자의 행동이나 데이터의 변화가 실제 화면의 변화로 이어지는 과정을 중요하게 생각했습니다.

기본적인 흐름은 다음과 같습니다.

~~~text
이벤트 발생
    ↓
현재 상태 확인 또는 상태 변경
    ↓
DOM 업데이트
    ↓
화면에 변경된 결과 표시
~~~

### 8.1 다크모드 예시

다크모드는 사용자의 클릭 이벤트를 시작으로 화면이 변경됩니다.

~~~text
다크모드 버튼 클릭
        ↓
click 이벤트 발생
        ↓
현재 테마 확인
        ↓
data-theme 속성 변경
        ↓
localStorage에 테마 저장
        ↓
CSS 변수 변경
        ↓
화면이 다크모드로 변경
~~~

JavaScript가 직접 모든 요소의 색상을 변경하는 것이 아니라 `data-theme`이라는 상태를 변경하고, CSS가 해당 상태에 따라 화면을 표시하도록 구성했습니다.

---

### 8.2 햄버거 메뉴 예시

~~~text
햄버거 버튼 클릭
        ↓
click 이벤트 발생
        ↓
active 클래스 상태 변경
        ↓
CSS가 active 클래스 확인
        ↓
메뉴 표시 또는 숨김
~~~

JavaScript에서는 메뉴의 `active` 클래스만 변경하고, 실제 메뉴의 표시 방식은 CSS에서 담당하도록 역할을 분리했습니다.

---

### 8.3 폼 유효성 검사 예시

~~~text
사용자가 폼 작성
        ↓
submit 이벤트 발생
        ↓
preventDefault()
        ↓
입력값 확인
        ↓
유효성 검사
   ↙           ↘
오류 있음      정상
   ↓             ↓
오류 메시지     성공 메시지
표시            표시
~~~

이처럼 이벤트가 발생한 후 조건에 따라 상태가 달라지고, 그 결과를 DOM에 반영하는 방식으로 기능을 구현했습니다.

---

### 8.4 GitHub API 예시

~~~text
페이지 로드
    ↓
GitHub API 요청
    ↓
데이터 응답 확인
    ↓
로딩 / 성공 / 실패 / 빈 상태 판단
    ↓
상태에 맞는 메시지 표시
    ↓
성공 시 프로젝트 카드 렌더링
~~~

각 기능을 단순히 개별 코드로 구현하는 것이 아니라 **이벤트 → 상태 변경 → DOM 업데이트**라는 흐름으로 생각하면서 구현했습니다.

---

## 9. GitHub API 및 비동기 처리

### 9.1 GitHub API

GitHub에 저장된 프로젝트 정보를 직접 HTML에 작성하지 않고 GitHub REST API를 이용하여 동적으로 불러오도록 구현했습니다.

사용한 API 형식은 다음과 같습니다.

~~~text
https://api.github.com/users/{username}/repos
~~~

프로젝트에서는 GitHub 사용자 이름을 이용하여 해당 계정의 저장소 목록을 가져옵니다.

---

### 9.2 `fetch()`

`fetch()`는 JavaScript에서 서버에 HTTP 요청을 보내고 데이터를 받아올 때 사용하는 기능입니다.

이번 프로젝트에서는 GitHub API에 요청을 보내기 위해 사용했습니다.

~~~javascript
const response = await fetch(
    `https://api.github.com/users/${githubUsername}/repos`
);
~~~

API 요청은 즉시 결과가 반환되는 것이 아니라 네트워크를 통해 데이터를 받아오는 시간이 필요하기 때문에 비동기적으로 처리해야 합니다.

---

### 9.3 `async / await`

비동기 작업을 보다 읽기 쉬운 형태로 작성하기 위해 `async / await`를 사용했습니다.

~~~javascript
async function loadProjects() {
    const response = await fetch(
        `https://api.github.com/users/${githubUsername}/repos`
    );

    const repos = await response.json();
}
~~~

`async`는 해당 함수가 비동기 함수임을 나타내고, `await`는 Promise의 결과를 기다린 후 다음 코드를 실행하도록 합니다.

이를 통해 API 요청과 응답 처리를 순서대로 읽을 수 있도록 작성했습니다.

---

### 9.4 JSON 데이터 처리

GitHub API의 응답은 JSON 형태로 전달됩니다.

~~~javascript
const repos = await response.json();
~~~

`response.json()`을 이용하여 응답 데이터를 JavaScript에서 사용할 수 있는 객체와 배열 형태로 변환했습니다.

이후 각 저장소의 이름, 설명, 사용 언어, GitHub 주소 등을 이용하여 프로젝트 카드를 생성했습니다.

---

### 9.5 로딩 / 성공 / 실패 / 빈 상태

API 요청이 진행되는 동안 사용자에게 현재 상태를 알려주도록 구현했습니다.

#### 로딩 상태

~~~javascript
projectMessage.textContent = "프로젝트를 불러오는 중...";
~~~

#### 성공 상태

API 요청이 정상적으로 완료되면 프로젝트 목록을 화면에 표시하고 상태 메시지를 제거합니다.

~~~javascript
createFilterButtons(allRepos);
renderProjects(allRepos);

projectMessage.textContent = "";
~~~

#### 빈 상태

GitHub 저장소가 하나도 없는 경우 별도의 메시지를 표시합니다.

~~~javascript
if (repos.length === 0) {
    projectMessage.textContent = "등록된 프로젝트가 없습니다.";
    return;
}
~~~

#### 실패 상태

API 요청에 문제가 발생하면 오류 메시지를 표시하고 다시 시도할 수 있는 버튼을 표시합니다.

~~~javascript
catch (error) {
    projectMessage.textContent =
        error.message || "프로젝트를 불러오지 못했습니다.";

    retryButton.style.display = "block";
}
~~~

이처럼 단순히 데이터를 가져오는 것에서 끝내지 않고 **로딩 → 성공 / 실패 / 빈 상태**를 UI에 표시하여 사용자가 현재 상황을 알 수 있도록 했습니다.

---

### 9.6 GitHub API 요청 제한 처리

GitHub API의 HTTP 상태 코드가 `403`인 경우 요청 제한에 도달했을 가능성을 고려하여 별도의 오류 메시지를 표시하도록 구현했습니다.

~~~javascript
if (response.status === 403) {
    throw new Error("GitHub API 요청 한도를 초과했습니다.");
}
~~~

그 외의 정상적이지 않은 응답도 `response.ok`를 확인하여 오류로 처리했습니다.

~~~javascript
if (!response.ok) {
    throw new Error("GitHub API 오류");
}
~~~

---

### 9.7 프로젝트 언어 필터링

GitHub에서 가져온 프로젝트를 사용 언어별로 필터링할 수 있도록 추가 기능을 구현했습니다.

먼저 API에서 가져온 전체 저장소를 `allRepos`에 저장합니다.

~~~javascript
let allRepos = [];
~~~

사용자가 특정 언어를 선택하면 `filter()`를 이용하여 해당 언어를 사용하는 저장소만 선택합니다.

~~~javascript
const filteredRepos = allRepos.filter(function (repo) {
    return repo.language === selectedLanguage;
});
~~~

이후 필터링된 배열을 다시 `renderProjects()`에 전달하여 화면을 업데이트합니다.

---

## 10. 폼 유효성 검사

연락처 폼에서는 사용자가 입력한 데이터를 제출하기 전에 기본적인 유효성 검사를 수행하도록 구현했습니다.

### 10.1 `submit` 이벤트

폼 제출 이벤트를 감지하기 위해 `addEventListener()`를 사용했습니다.

~~~javascript
contactForm.addEventListener("submit", function (event) {
    event.preventDefault();
});
~~~

### 10.2 `preventDefault()`

기본적으로 HTML 폼이 제출되면 브라우저가 페이지를 새로고침하거나 다른 동작을 수행할 수 있습니다.

`preventDefault()`를 사용하여 기본 제출 동작을 막고 JavaScript에서 직접 유효성 검사를 수행하도록 했습니다.

---

### 10.3 입력값 확인

입력값의 앞뒤 공백을 제거하기 위해 `trim()`을 사용했습니다.

~~~javascript
const name = nameInput.value.trim();
const email = emailInput.value.trim();
const message = messageInput.value.trim();
~~~

이후 각각의 필수 입력값이 비어 있는지 확인했습니다.

---

### 10.4 이메일 형식 검사

이메일 입력값이 비어 있지 않은 경우 `@`가 포함되어 있는지 확인하여 기본적인 이메일 형식을 검사했습니다.

~~~javascript
if (email === "") {
    emailError.textContent = "이메일을 입력해주세요.";
} else if (!email.includes("@")) {
    emailError.textContent = "올바른 이메일을 입력해주세요.";
}
~~~

---

### 10.5 오류 메시지와 성공 메시지

유효성 검사에서 문제가 발생하면 각 입력 항목 아래에 오류 메시지를 표시합니다.

모든 입력값이 정상이라면 성공 메시지를 표시하고 폼을 초기화합니다.

~~~javascript
if (!isValid) {
    return;
}

formMessage.textContent = "메시지가 성공적으로 전송되었습니다.";
contactForm.reset();
~~~

또한 사용자가 잘못된 값을 수정하기 시작하면 `input` 이벤트를 이용하여 기존 오류 메시지를 제거하도록 구현했습니다.

~~~javascript
nameInput.addEventListener("input", function () {
    nameError.textContent = "";
});
~~~

---

## 11. 보너스 기능

기본 요구사항 외에도 웹페이지의 사용성과 완성도를 높이기 위해 추가 기능을 구현했습니다.

### 11.1 GitHub 프로젝트 언어 필터

GitHub API로 가져온 프로젝트의 `language` 데이터를 이용하여 프로젝트를 언어별로 필터링할 수 있도록 구현했습니다.

전체 프로젝트를 볼 수 있는 `전체` 버튼과 각 언어별 버튼을 동적으로 생성했습니다.

---

### 11.2 타이핑 효과

Hero 영역의 텍스트에 JavaScript를 이용한 간단한 타이핑 효과를 추가했습니다.

문자열을 한 글자씩 화면에 추가하여 텍스트가 순차적으로 나타나도록 구현했습니다.

~~~javascript
const text = typingText.textContent;
let index = 0;

typingText.textContent = "";

function typing() {
    if (index < text.length) {
        typingText.textContent += text[index];
        index++;

        setTimeout(typing, 100);
    }
}

typing();
~~~

---

### 11.3 `localStorage`를 이용한 테마 저장

다크모드 설정이 페이지를 새로고침한 후에도 유지되도록 `localStorage`를 사용했습니다.

~~~javascript
localStorage.setItem("theme", "dark");
~~~

페이지가 로드될 때 저장된 테마를 확인하여 다크모드를 다시 적용합니다.

~~~javascript
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
}
~~~

이를 통해 사용자의 설정을 브라우저에 저장하고 다시 사용할 수 있도록 했습니다.

---

## 12. 실행 방법

### 12.1 저장소 Clone

GitHub 저장소를 로컬 환경으로 Clone합니다.

~~~bash
git clone [GitHub 저장소 주소]
~~~

### 12.2 프로젝트 실행

프로젝트를 VS Code로 열고 `index.html` 파일을 Live Server를 이용하여 실행합니다.

~~~text
VS Code
  ↓
프로젝트 폴더 열기
  ↓
index.html 선택
  ↓
Live Server로 실행
~~~

GitHub API를 사용하는 프로젝트이므로 인터넷 연결이 필요합니다.

---

## 13. 화면 구성

### 13.1 Desktop

![Desktop](images/desktop.png)

데스크톱 화면에서는 전체 네비게이션 메뉴와 프로젝트 카드가 넓은 화면에 맞게 배치됩니다.

---

### 13.2 Mobile

![Mobile](images/mobile.png)

모바일 화면에서는 햄버거 메뉴를 사용하고 콘텐츠의 크기와 간격을 조정하여 작은 화면에서도 사용할 수 있도록 구성했습니다.

---

### 13.3 Dark Mode

![Dark Mode](images/dark-mode.png)

다크모드에서는 CSS 변수를 변경하여 배경색과 글자색 등의 전체적인 색상 테마가 변경됩니다.