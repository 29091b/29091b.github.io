const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");

const systemPrefersDark = () => darkModeQuery.matches;

function getCurrentTheme() {
  const manualTheme = document.documentElement.dataset.theme;
  if (manualTheme === "light" || manualTheme === "dark") {
    return manualTheme;
  }
  return systemPrefersDark() ? "dark" : "light";
}

function updateThemeButton() {
  const theme = getCurrentTheme();
  if (theme === "dark") {
    themeIcon.textContent = "☀";
    themeToggle.setAttribute("aria-label", "Mudar para modo claro");
    themeToggle.setAttribute("title", "Mudar para modo claro");
  } else {
    themeIcon.textContent = "☾";
    themeToggle.setAttribute("aria-label", "Mudar para modo escuro");
    themeToggle.setAttribute("title", "Mudar para modo escuro");
  }
}

function toggleTheme() {
  const newTheme = getCurrentTheme() === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = newTheme;
  localStorage.setItem("theme", newTheme);
  updateThemeButton();
}

themeToggle.addEventListener("click", toggleTheme);

darkModeQuery.addEventListener("change", () => {
  if (!localStorage.getItem("theme")) {
    updateThemeButton();
  }
});

updateThemeButton();
