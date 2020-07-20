let currentTheme = localStorage.getItem('theme');
const toggleSwitch = document.querySelector('#theme-btn');

if (currentTheme) {
	document.documentElement.setAttribute('data-theme', currentTheme);

	if (currentTheme === 'dark') {
		toggleSwitch.checked = true;
	}
} else {
	localStorage.setItem('theme', 'light');
	currentTheme = localStorage.getItem('theme');
	document.documentElement.setAttribute('data-theme', currentTheme);
}
function switchTheme(e) {
	if (e.target.checked) {
		document.documentElement.setAttribute('data-theme', 'dark');
		localStorage.setItem('theme', 'dark');
	} else {
		document.documentElement.setAttribute('data-theme', 'light');
		localStorage.setItem('theme', 'light');
	}
}
if (toggleSwitch) {
	toggleSwitch.addEventListener('change', switchTheme, false);
}
