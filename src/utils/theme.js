const THEME_KEY = "theme";

export const getInitialTheme = () => {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === "dark" || saved === "light") {
      return saved;
    }
  } catch {
    // Ignore storage access errors and fall back to system preference.
  }

  if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }

  return "light";
};

export const applyTheme = (theme) => {
  const isDark = theme === "dark";
  document.documentElement.classList.toggle("dark", isDark);
  document.documentElement.style.colorScheme = isDark ? "dark" : "light";
};

export const persistTheme = (theme) => {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    // Ignore storage access errors.
  }
};
