const THEME_KEY = "theme";

export const getInitialTheme = () => {
    try {
        const saved = localStorage.getItem(THEME_KEY);

        if (saved === "dark" || saved === "light") {
            return saved;
        }
    } catch {
        // ignore storage errors
    }

    if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
        return "dark";
    }

    return "light";
};

export const applyTheme = (theme) => {
    const isDark = theme === "dark";

    const root = document.documentElement;

    root.classList.toggle("dark", isDark);
    root.style.colorScheme = isDark ? "dark" : "light";
};

export const persistTheme = (theme) => {
    try {
        localStorage.setItem("theme", theme);
    } catch {
        // ignore storage errors
    }
};