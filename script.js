const projects = [
  {
    id: "gold-fish",
    category: "branding",
    country: "Korea",
    image: "images/goldfish.jpg",
    number: "No.1",
    date: "2025/10/12",
    title: "Gold Fish",
    description:
      "Gold Fish는 빛이 물결 위를 스치는 장면에서 시작한 프로젝트입니다. 차분한 흐름과 붉은 대비를 통해 기억에 남는 정서적 이미지를 브랜딩 언어로 정리했습니다.",
  },
  {
    id: "ofus-artfair",
    category: "branding",
    country: "Korea",
    image: "images/ofus.png",
    number: "No.2",
    date: "2025/08/06",
    title: "OFUS ARTFAIR",
    description:
      "OFUS ARTFAIR는 학생이 주체가 되는 아트페어를 위한 아이덴티티입니다. 구조적인 타이포 그래피와 강한 대비를 통해 행사 메시지를 빠르게 전달하도록 설계했습니다.",
  },
  {
    id: "appocalipse",
    category: "graphic",
    country: "Japan",
    image: "images/appocalipse.jpg",
    number: "No.3",
    date: "2026/01/03",
    title: "Appocalipse",
    description:
      "Appocalipse는 도시의 야간 풍경과 디지털 화면 감각을 결합한 그래픽 프로젝트입니다. 레이어 텍스처와 푸른 톤을 중심으로 차갑고 긴장감 있는 무드를 만들었습니다.",
  },
  {
    id: "sirat",
    category: "branding",
    country: "Korea",
    image: "images/sirat.jpg",
    number: "No.4",
    date: "2026/03/05",
    title: "SIRAT",
    description:
      "SIRAT는 텍스트와 이미지의 호흡을 맞춰 메시지를 단계적으로 읽히게 만든 편집 기반 프로젝트입니다. 여백과 대비를 이용해 정보의 흐름을 명확하게 구성했습니다.",
  },
  {
    id: "her",
    category: "graphic",
    country: "France",
    image: "images/her.jpg",
    number: "No.5",
    date: "2026/03/09",
    title: "HER",
    description:
      "HER는 감정의 떨림을 강한 붓 질감과 사진의 충돌로 시각화한 작업입니다. 붉은 타이포를 중심축으로 두어 시선이 자연스럽게 스토리를 따라가도록 구성했습니다.",
  },
  {
    id: "meaning-beings",
    category: "branding",
    country: "Korea",
    image: "images/의미를 찾는 존재들.png",
    number: "No.6",
    date: "2025/11/01",
    title: "의미를 찾는 존재들",
    description:
      "의미를 찾는 존재들은 텍스트 중심의 서사와 이미지의 결을 함께 구성한 포스터 프로젝트입니다. 흐르는 선형 그래픽을 통해 감정의 궤적을 시각적으로 이어지게 만들었습니다.",
  },
  {
    id: "design-gu",
    category: "graphic",
    country: "Korea",
    image: "images/디자인구.png",
    number: "No.7",
    date: "2026/03/28",
    title: "디자인구",
    description:
      "디자인구는 모듈형 패턴과 제한된 색상 체계를 바탕으로 확장 가능한 그래픽 시스템을 제안한 작업입니다. 단순한 도형 반복으로 리듬감과 정체성을 동시에 확보했습니다.",
  },
  {
    id: "catalyst",
    category: "graphic",
    country: "Korea",
    image: "images/catalyst.png",
    number: "No.8",
    date: "2024/11/01",
    title: "Catalyst",
    description:
      "Catalyst는 타이포 중심의 편집 실험으로, 정보의 계층을 명확히 분리하면서도 리듬감 있는 읽기 흐름을 만드는 데 집중한 그래픽 프로젝트입니다.",
  },
];

const app = document.getElementById("app");

const routes = {
  "/": renderIntro,
  "/branding": () => renderCategory("branding"),
  "/graphic": () => renderCategory("graphic"),
  "/contact": renderContact,
};

function currentPath() {
  const hash = window.location.hash || "#/";
  return hash.replace(/^#/, "") || "/";
}

function toProjectCard(project) {
  return `
    <a href="#/project/${project.id}" class="poster-card" aria-label="${project.title} 상세로 이동">
      <img class="poster-image" src="${project.image}" alt="${project.title} 대표 이미지" loading="lazy" />
    </a>
  `;
}

function renderIntro() {
  app.innerHTML = `
    <section class="intro-rail" aria-label="프로젝트 대표 이미지 목록">
      ${projects.map(toProjectCard).join("")}
    </section>
  `;
}

function renderCategory(category) {
  const title = category === "branding" ? "Branding Projects" : "Graphic Projects";
  const filtered = projects.filter((project) => project.category === category);

  app.innerHTML = `
    <section class="catalog-section">
      <h1 class="section-title">${title}</h1>
      <div class="catalog-layout catalog-layout--single">
        <div class="catalog-list catalog-list--inline" role="list" aria-label="${title} 목록">
          ${filtered
            .map(
              (project) => `
                <div class="catalog-item" data-project-id="${project.id}">
                  <a
                    href="#/project/${project.id}"
                    class="catalog-row"
                    role="listitem"
                  >
                    <span>${project.title}</span>
                    <span>${project.date.slice(0, 4)}</span>
                    <span>${project.country}</span>
                  </a>
                  <div class="catalog-inline-detail">
                    <img class="catalog-inline-thumb" src="${project.image}" alt="${project.title} 미리보기" loading="lazy" />
                    <div class="catalog-inline-desc">
                      ${formatDescriptionLines(project.description)}
                    </div>
                  </div>
                </div>
              `,
            )
            .join("")}
        </div>
      </div>
    </section>
  `;

  bindInlinePreview();
}

function renderContact() {
  app.innerHTML = `
    <section class="contact-section">
      <div class="contact-simple">
        <p>yoonsohyun32@gmail.com</p>
        <p>+82 10 2420 3164</p>
        <p>
          <a href="https://www.instagram.com/thgusswrkspace/" target="_blank" rel="noopener noreferrer">
            @thgusswrkspace
          </a>
        </p>
      </div>
    </section>
  `;
}

function renderProject(projectId) {
  const project = projects.find((item) => item.id === projectId);

  if (!project) {
    app.innerHTML = `
      <section>
        <h1 class="section-title">프로젝트를 찾을 수 없습니다.</h1>
      </section>
    `;
    return;
  }

  app.innerHTML = `
    <section class="detail-layout">
      <div class="detail-visual">
        <img class="detail-image" src="${project.image}" alt="${project.title} 대표 이미지" />
      </div>

      <aside class="detail-side">
        <div class="meta-head">
          <span>${project.number}</span>
          <span>${project.date}</span>
          <span class="meta-title">[ ${project.title} ]</span>
        </div>

        <div class="meta-desc">
          ${project.description}
        </div>
      </aside>
    </section>
  `;
}

function route() {
  const path = currentPath();
  const isProjectView = path.startsWith("/project/");
  const isHomeView = path === "/";
  document.body.classList.toggle("project-view", isProjectView);
  document.body.classList.toggle("home-view", isHomeView);
  setActiveNav(path);

  if (isProjectView) {
    const projectId = path.split("/project/")[1];
    renderProject(projectId);
    return;
  }

  const render = routes[path] || renderIntro;
  render();
}

window.addEventListener("hashchange", route);
window.addEventListener("DOMContentLoaded", route);
window.addEventListener("DOMContentLoaded", initCustomCursor);

function setActiveNav(path) {
  const navItems = Array.from(document.querySelectorAll(".top-nav [data-nav]"));
  navItems.forEach((item) => item.classList.remove("is-current"));

  let key = "home";
  if (path === "/branding") key = "branding";
  if (path === "/graphic") key = "graphic";
  if (path === "/contact") key = "contact";

  if (path.startsWith("/project/")) {
    const projectId = path.split("/project/")[1];
    const project = projects.find((item) => item.id === projectId);
    if (project?.category === "branding") key = "branding";
    if (project?.category === "graphic") key = "graphic";
  }

  const active = document.querySelector(`.top-nav [data-nav="${key}"]`);
  if (active) active.classList.add("is-current");
}

function bindInlinePreview() {
  const items = Array.from(document.querySelectorAll(".catalog-item"));

  if (items.length === 0) return;

  const activate = (item) => {
    items.forEach((target) => target.classList.remove("is-active"));
    item.classList.add("is-active");
  };

  items.forEach((item) => {
    item.addEventListener("mouseenter", () => activate(item));
    item.addEventListener("focusin", () => activate(item));
    item.addEventListener("mouseleave", () => item.classList.remove("is-active"));
    item.addEventListener("focusout", (event) => {
      if (!item.contains(event.relatedTarget)) {
        item.classList.remove("is-active");
      }
    });
  });
}

function formatDescriptionLines(text) {
  const lines = text
    .split(". ")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => (line.endsWith(".") ? line : `${line}.`));

  return lines.map((line) => `<span class="desc-line">${line}</span>`).join("");
}

function initCustomCursor() {
  const cursor = document.getElementById("custom-cursor");
  if (!cursor) return;

  document.body.classList.add("cursor-ready");

  const moveCursor = (event) => {
    cursor.style.left = `${event.clientX}px`;
    cursor.style.top = `${event.clientY}px`;
  };

  window.addEventListener("mousemove", moveCursor);
  window.addEventListener("mouseleave", () => {
    cursor.style.opacity = "0";
  });
  window.addEventListener("mouseenter", () => {
    cursor.style.opacity = "1";
  });
}
