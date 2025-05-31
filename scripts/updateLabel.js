export function updateLabel(professorName) {
  const label = document.querySelector('label[for="ratingSelect"]');
  if (label) {
    label.textContent = professorName
      ? `انتخاب نمره برای استاد ${professorName}:`
      : "انتخاب نمره:";
  }
}
