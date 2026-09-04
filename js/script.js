// 햄버거 메뉴
const menuButton = document.querySelector("#menu-button");
const navMenu = document.querySelector("nav ul");

menuButton.addEventListener("click", function () {
    navMenu.classList.toggle("active");
});

// 다크모드
const themeButton = document.querySelector("#theme-button");

themeButton.addEventListener("click", function () {
    const currentTheme = document.documentElement.getAttribute("data-theme");

    if (currentTheme === "dark") {
        document.documentElement.removeAttribute("data-theme");
        localStorage.setItem("theme", "light");
    } else {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
    }
});

// 저장된 테마 불러오기
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
}

// 스크롤 시 메뉴 스타일 변경
const header = document.querySelector("header");

window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

// 맨 위로 가기 버튼
const topButton = document.querySelector("#top-button");

window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
        topButton.style.display = "block";
    } else {
        topButton.style.display = "none";
    }
});

topButton.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// 스크롤 애니메이션
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

// 연락처 폼
const contactForm = document.querySelector("#contact-form");

const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const messageInput = document.querySelector("#message");

const nameError = document.querySelector("#name-error");
const emailError = document.querySelector("#email-error");
const messageError = document.querySelector("#message-error");

const formMessage = document.querySelector("#form-message");

// 입력할 때 오류 메시지 지우기
nameInput.addEventListener("input", function () {
    nameError.textContent = "";
});

emailInput.addEventListener("input", function () {
    emailError.textContent = "";
});

messageInput.addEventListener("input", function () {
    messageError.textContent = "";
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
        isValid = false;
    }

    if (email === "") {
        emailError.textContent = "이메일을 입력해주세요.";
        isValid = false;
    } else if (!email.includes("@")) {
        emailError.textContent = "올바른 이메일을 입력해주세요.";
        isValid = false;
    }

    if (message === "") {
        messageError.textContent = "메시지를 입력해주세요.";
        isValid = false;
    }

    if (!isValid) {
        return;
    }

    formMessage.textContent = "메시지가 성공적으로 전송되었습니다.";
    contactForm.reset();
});

// GitHub 프로젝트
const projectList = document.querySelector("#project-list");
const projectMessage = document.querySelector("#project-message");
const retryButton = document.querySelector("#retry-button");
const projectFilter = document.querySelector("#project-filter");

const githubUsername = "gunhee0402";

let allRepos = [];

// 프로젝트 보여주기
function renderProjects(repos) {
    projectList.innerHTML = "";

    repos.forEach(function (repo) {
        const article = document.createElement("article");

        article.innerHTML = `
            <h3>${repo.name}</h3>
            <p>${repo.description || "설명이 없습니다."}</p>
            <p>언어: ${repo.language || "알 수 없음"}</p>
            <a href="${repo.html_url}" target="_blank">
                GitHub에서 보기
            </a>
        `;

        projectList.appendChild(article);
    });
}

// 필터 버튼 만들기
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
            const selectedLanguage = button.dataset.language;

            filterButtons.forEach(function (button) {
                button.classList.remove("active");
            });

            button.classList.add("active");

            if (selectedLanguage === "all") {
                renderProjects(allRepos);
            } else {
                const filteredRepos = allRepos.filter(function (repo) {
                    return repo.language === selectedLanguage;
                });

                renderProjects(filteredRepos);
            }
        });
    });
}

// GitHub 프로젝트 불러오기
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
            throw new Error("GitHub API 오류");
        }

        const repos = await response.json();

        if (repos.length === 0) {
            projectMessage.textContent = "등록된 프로젝트가 없습니다.";
            return;
        }

        allRepos = repos;

        createFilterButtons(allRepos);
        renderProjects(allRepos);

        projectMessage.textContent = "";
    } catch (error) {
        projectMessage.textContent =
            error.message || "프로젝트를 불러오지 못했습니다.";
        retryButton.style.display = "block";
    }
}

loadProjects();

retryButton.addEventListener("click", function () {
    loadProjects();
});

// 타이핑 효과
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