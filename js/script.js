// 상태 관리 (STATE 객체)
const state = {
    theme: localStorage.getItem("theme") || "light",
    menuOpen: false,
    allRepos: [],
    selectedLanguage: "all"
};

// 요소 참조
const menuButton = document.querySelector("#menu-button");
const navMenu = document.querySelector("nav ul");
const navLinks = document.querySelectorAll("nav ul a");
const themeButton = document.querySelector("#theme-button");
const header = document.querySelector("header");
const topButton = document.querySelector("#top-button");
const sections = document.querySelectorAll("section");

// 햄버거 메뉴 토글
menuButton.addEventListener("click", function () {
    state.menuOpen = !state.menuOpen;
    navMenu.classList.toggle("active", state.menuOpen);
    menuButton.setAttribute("aria-expanded", state.menuOpen);
});

// 모바일 메뉴 링크 클릭 시 자동 닫힘
navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
        if (state.menuOpen) {
            state.menuOpen = false;
            navMenu.classList.remove("active");
            menuButton.setAttribute("aria-expanded", "false");
        }
    });
});

// 다크모드 렌더링
function renderTheme() {
    if (state.theme === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
        themeButton.textContent = "☀️";
        themeButton.setAttribute("aria-label", "라이트 모드로 전환");
    } else {
        document.documentElement.removeAttribute("data-theme");
        themeButton.textContent = "🌙";
        themeButton.setAttribute("aria-label", "다크 모드로 전환");
    }
    localStorage.setItem("theme", state.theme);
}

themeButton.addEventListener("click", function () {
    state.theme = state.theme === "dark" ? "light" : "dark";
    renderTheme();
});

// 초기 테마 적용
renderTheme();

// 스크롤 이벤트 (헤더 그림자 & 탑 버튼 & 섹션 등장)
function handleScroll() {
    const scrollY = window.scrollY;

    // 헤더 그림자
    if (scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

    // 탑 버튼 노출
    if (scrollY > 300) {
        topButton.style.display = "block";
    } else {
        topButton.style.display = "none";
    }

    // 섹션 스크롤 애니메이션
    sections.forEach(function (section) {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < window.innerHeight - 80) {
            section.classList.add("show");
        }
    });
}

window.addEventListener("scroll", handleScroll);
// 초기 화면 로드 시에도 보이는 섹션 체크
handleScroll();

// 맨 위로 이동
topButton.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// 연락처 폼 유효성 검사 (즉각적인 피드백)
const contactForm = document.querySelector("#contact-form");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const messageInput = document.querySelector("#message");

const nameError = document.querySelector("#name-error");
const emailError = document.querySelector("#email-error");
const messageError = document.querySelector("#message-error");
const formMessage = document.querySelector("#form-message");

nameInput.addEventListener("input", function () {
    nameError.textContent = "";
    nameInput.classList.remove("invalid");
});

emailInput.addEventListener("input", function () {
    emailError.textContent = "";
    emailInput.classList.remove("invalid");
});

messageInput.addEventListener("input", function () {
    messageError.textContent = "";
    messageInput.classList.remove("invalid");
});

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    nameError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";
    formMessage.textContent = "";

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    let isValid = true;

    if (name === "") {
        nameError.textContent = "이름을 입력해주세요.";
        nameInput.classList.add("invalid");
        isValid = false;
    }

    if (email === "") {
        emailError.textContent = "이메일을 입력해주세요.";
        emailInput.classList.add("invalid");
        isValid = false;
    } else if (!email.includes("@")) {
        emailError.textContent = "올바른 이메일 형식을 입력해주세요.";
        emailInput.classList.add("invalid");
        isValid = false;
    }

    if (message === "") {
        messageError.textContent = "메시지를 입력해주세요.";
        messageInput.classList.add("invalid");
        isValid = false;
    }

    if (!isValid) return;

    formMessage.style.color = "green";
    formMessage.textContent = "메시지가 성공적으로 전송되었습니다.";
    contactForm.reset();
});

// GitHub 프로젝트 (map, filter 배열 메서드 적용)
const projectList = document.querySelector("#project-list");
const projectMessage = document.querySelector("#project-message");
const retryButton = document.querySelector("#retry-button");
const projectFilter = document.querySelector("#project-filter");

const githubUsername = "gunhee0402";

// map 메서드를 활용하여 데이터 배열을 카드 UI HTML로 변환
function renderProjects(repos) {
    projectList.innerHTML = repos.map(function (repo) {
        return `
            <article>
                <h3>${repo.name}</h3>
                <p>${repo.description || "설명이 없습니다."}</p>
                <p><strong>언어:</strong> ${repo.language || "알 수 없음"}</p>
                <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">
                    GitHub에서 보기
                </a>
            </article>
        `;
    }).join("");
}

// 필터 버튼 생성
function createFilterButtons(repos) {
    projectFilter.innerHTML = "";

    const languages = [];
    repos.forEach(function (repo) {
        if (repo.language && !languages.includes(repo.language)) {
            languages.push(repo.language);
        }
    });

    const allButton = document.createElement("button");
    allButton.textContent = "전체";
    allButton.dataset.language = "all";
    allButton.classList.add("active");
    projectFilter.appendChild(allButton);

    languages.forEach(function (language) {
        const button = document.createElement("button");
        button.textContent = language;
        button.dataset.language = language;
        projectFilter.appendChild(button);
    });

    const filterButtons = projectFilter.querySelectorAll("button");
    filterButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            state.selectedLanguage = button.dataset.language;

            filterButtons.forEach(function (btn) {
                btn.classList.remove("active");
            });
            button.classList.add("active");

            // filter 메서드를 활용하여 상태에 따른 필터링 분기
            if (state.selectedLanguage === "all") {
                renderProjects(state.allRepos);
            } else {
                const filteredRepos = state.allRepos.filter(function (repo) {
                    return repo.language === state.selectedLanguage;
                });
                renderProjects(filteredRepos);
            }
        });
    });
}

// GitHub API 비동기 호출 (async/await & try/catch 분기)
async function loadProjects() {
    projectMessage.textContent = "프로젝트를 불러오는 중...";
    projectList.innerHTML = "";
    retryButton.style.display = "none";

    try {
        const response = await fetch(
            `https://api.github.com/users/${githubUsername}/repos`
        );

        if (response.status === 403) {
            throw new Error("GitHub API 요청 한도를 초과했습니다.");
        }

        if (!response.ok) {
            throw new Error("GitHub API 호출 오류 (" + response.status + ")");
        }

        const repos = await response.json();

        if (repos.length === 0) {
            projectMessage.textContent = "등록된 프로젝트가 없습니다.";
            return;
        }

        state.allRepos = repos;
        state.selectedLanguage = "all";

        createFilterButtons(state.allRepos);
        renderProjects(state.allRepos);
        projectMessage.textContent = "";
    } catch (error) {
        projectMessage.textContent = error.message || "프로젝트를 불러오지 못했습니다.";
        retryButton.style.display = "block";
    }
}

loadProjects();

retryButton.addEventListener("click", function () {
    loadProjects();
});

// 타이핑 애니메이션
const typingText = document.querySelector("#typing-text");
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
