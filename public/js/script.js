const toggleButton = document.querySelector('.dark-light');
const colors = document.querySelectorAll('.color');
const recentConvos = document.querySelectorAll('.msg');
const chatAreaTitle = document.querySelector('.chat-area-title');
const chatAreaProfile = document.querySelector('.chat-area-profile');
const detailsModalSearchList = document.querySelector('.details-modal-content-list');

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


// MODAL 

const openModal = () => {
  document.querySelector('.details-modal').classList.remove('details-modal-closed');
  document.querySelector('.app').classList.add('app-details-modal-open');
  document.querySelector('.app').classList.remove('app-details-modal-close');
  document.querySelector('.conversation-area').style.overflowY = 'hidden'
  document.querySelector('.chat-area').style.overflowY = 'hidden'
  document.querySelector('.detail-area').style.overflowY = 'hidden'
}

const closeModal = () => {
  document.querySelector('.details-modal').classList.add('details-modal-closed');
  document.querySelector('.app').classList.remove('app-details-modal-open');
  document.querySelector('.app').classList.add('app-details-modal-close');
  document.querySelector('.conversation-area').style.overflowY = 'auto'
  document.querySelector('.chat-area').style.overflowY = 'auto'
  document.querySelector('.detail-area').style.overflowY = 'auto'
}

document.getElementById('chat-add-btn').addEventListener('click', e => {
  openModal();
});

document.querySelector('.details-modal-close').addEventListener('click', e => {
  closeModal();
});


$(function () {
  $('#user-search-bar-input').autocomplete({
    source: function (req, res) {
      $.ajax({
        url: 'searchuser/',
        dataType: 'jsonp',
        type: 'GET',
        data: req,
        success: function (data) {
          console.log(data);
          loadData(data);
        },
        error: function (err) {
          console.log(err.status);
        }
      })
    },
    minLength: 1
  })
});

function loadData(data) {
  detailsModalSearchList.innerHTML = "";
  let newInnerHTML = ""

  if (data) {
    data.forEach((item) => {
      newInnerHTML +=
        `<li>
          <div class="search-user">
            <img class="search-user-profile" src="images/${item.profilePic}" alt="" />
            <div class="search-user-detail">
              <div class="search-user-username">${item.username}</div>
              <div class="search-user-content">
                  <span class="search-user-email">${item.email}</span>
              </div>
          </div>
      </div>
    </li>`
    });
  }

  detailsModalSearchList.innerHTML=newInnerHTML;
}

