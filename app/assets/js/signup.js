const apiUrl = 'https://todoo.5xcamp.us';
const mail = document.querySelector('#Email1');
const nickname = document.querySelector('#nickname');
const password = document.querySelector('#Password1');
const confirm_pwd = document.querySelector('#Password2');
const sign_btn = document.querySelector('.signup_btn');
const allinput = document.querySelectorAll('input');
const signup_alert_txt = document.querySelector('.signup_alert_txt');
const signup_modal = document.querySelector('.signup_modal');
const signup_status_txt = document.querySelector('.signup_status_txt');
const signup_myModal = new bootstrap.Modal(modal, {})

reset();

sign_btn.addEventListener('click', () => {
  const format_isok = check();
  if (format_isok === true) {
    signup(mail, nickname, password)
  } else {
    return;
  }
  console.log(132);
})

function signup(email, nickname, password) {
  signup_status_txt.textContent = '註冊中請稍後 ... ';
  axios.post(`${apiUrl}/users`, 
  {
    "user": {
      "email": email.value,
      "nickname": nickname.value,
      "password": password.value
    }
  }
  )
    .then(res => {
      setTimeout(() => {
        signup_alert_txt.innerHTML = `註冊成功 ! 歡迎${res.data.nickname}光臨本網站 <br><br> 頁面即將在3秒後跳轉至登入畫面 ...`;
        signup_myModal.show();
        reset();
        setTimeout(() => {
          document.location.href = './index.html'
        }, 2000)
      }, 1000)
    })
    .catch(error => {
      console.log(error.response);
      setTimeout(() => {
        signup_alert_txt.innerHTML = `很抱歉 ! 您的${error.response.data.error[0]} 請重新註冊`;
        signup_myModal.show();
        signup_status_txt.textContent = '';
        reset();
      }, 1000);
    })
}

function check() {
  let isnull = false;

  for (const item of allinput) {
    if (item.value == '') {
      isnull = true;
      break;
    }
  }
  if (isnull === true) {
    signup_alert_txt.textContent = '您還有欄位尚未填寫';
    signup_myModal.show();
    return;
  }
  if (mail.value.match('@') === null) {
    signup_alert_txt.textContent = 'Email 格式不正確';
    signup_myModal.show();
    reset();
    return;
  }
  if (password.value.trim().length < 6) {
    signup_alert_txt.textContent = '密碼必須6個字以上喔 ! ';
    signup_myModal.show();
    password.value = '';
    confirm_pwd.value = '';
    return;
  }
  if (password.value !== confirm_pwd.value) {
    signup_alert_txt.textContent = '兩次的密碼輸入不一致喔 ! ';
    signup_myModal.show();
    password.value = '';
    confirm_pwd.value = '';
    return;
  }
  return true;
}

function reset() {
  mail.value = '';
  nickname.value = '';
  password.value = '';
  confirm_pwd.value = '';
}