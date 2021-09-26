const Theme = {
  LIGHT: 'lightly',
  DARK: 'deep-dark',
};

const THEME = 'theme';

const refs = {
  switchButton: document.querySelector('.theme-switch__toggle'),
  body: document.querySelector('body'),
};

refs.body.classList.add(Theme.LIGHT);
refs.switchButton.addEventListener('change', makeAction);

// добавление темы по условию
function makeAction(evt) {
  if (!refs.body.classList.contains(Theme.DARK)) {
    localStorage.setItem(THEME, Theme.DARK);
    refs.body.classList.add(Theme.DARK);
    // refs.switchButton.checked  = true;
  } else if (refs.body.classList.contains(Theme.DARK)) {
    localStorage.setItem(THEME, Theme.LIGHT);
    refs.body.classList.remove(Theme.DARK);
    refs.body.classList.add(Theme.LIGHT);
  }
}

// если в локалСторидж есть тема - примени
function populateSwitch() {
  const savedTheme = localStorage.getItem(THEME);
  if (savedTheme === Theme.DARK) {
    refs.switchButton.checked = true;
    refs.body.classList.add(Theme.DARK);
    // console.log(savedTheme)
  } else if (savedTheme !== Theme.DARK) {
    refs.body.classList.add(Theme.LIGHT);
    refs.switchButton.checked = false;
    // console.log(savedTheme)
  }
}
// populateSwitch();
export default { populateSwitch, makeAction };
