export function getTheme(): string {
  const theme = localStorage.getItem("theme");
  if (theme !== null && theme !== undefined) {
    return theme;
  } else {
    return "light";
  }
}

export function setTheme(theme: string) {
  localStorage.setItem("theme", theme);
}
