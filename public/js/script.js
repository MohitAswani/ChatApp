const toggleButton = document.querySelector('.dark-light');
const colors = document.querySelectorAll('.color');
const recentConvos = document.querySelectorAll('.msg');
const chatAreaTitle = document.querySelector('.chat-area-title');
const chatAreaProfile = document.querySelector('.chat-area-profile');

colors.forEach(color => {
  color.addEventListener('click', e => {
    colors.forEach(c => c.classList.remove('selected'));
    const theme = color.getAttribute('data-color');
    document.body.setAttribute('data-theme', theme);
    color.classList.add('selected');
  });
});

recentConvos.forEach(convo => {
  convo.addEventListener('click', e => {
    recentConvos.forEach(c => c.classList.remove('active'));
    convo.classList.add('active');
    chatAreaTitle.innerHTML = convo.querySelector('.msg-username').innerHTML;
    chatAreaProfile.setAttribute('src', convo.querySelector('.msg-profile').getAttribute('src'));
  });
});

toggleButton.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

