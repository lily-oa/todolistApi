//signup---------------------------------------
const signUpInput = document.querySelectorAll('.signUpInput')
const signUpBtn = document.querySelector('.signup_btn');
const signUpEmail = document.querySelector('#signUpEmail');
const signUpNickname = document.querySelector('#signUpNickname');
const signUpPassword = document.querySelector('#signUpPassword');
const signUpPassword2 = document.querySelector('#signUpPassword2');
const signup_alert_txt = document.querySelector('.signup_alert_txt');
const signup_status_txt = document.querySelector('.signup_status_txt');
const signupModal = new bootstrap.Modal('.js-signup-modal');
//-----------------------------------

if (signUpBtn) {
  signUpBtn.addEventListener('click', function (e) {
    if (
      signUpEmail.value.trim() == '' ||
      signUpPassword.value.trim() == '' ||
      signUpPassword2.value.trim() == '' ||
      signUpNickname.value.trim() == ''
    ) {
      return;
    }
  })
  signUpBtn.addEventListener('click', () => {
    const format_isOk = signupCheck();
    if (format_isOk === true) {
      signup(signUpEmail, signUpNickname, signUpPassword)
    } else {
      return;
    }
  })
}

function signup(signUpEmail, signUpNickname, signUpPassword) {
  signup_status_txt.textContent = `註冊中請稍後 ... `;
  return axios.post(`${apiUrl}/users`, 
  {
    "user": {
      "email": signUpEmail.value,
      "nickname": signUpNickname.value,
      "password": signUpPassword.value
    }
  })
    .then(res => {
      setTimeout(() => {
        signup_alert_txt.innerHTML = `註冊成功 ! 歡迎${res.data.nickname}光臨本網站 <br><br> 頁面即將在3秒後跳轉至登入畫面 ...`;
        signupModal.show();
        signupReset();
        setTimeout(() => {
          document.location.href = './index.html'
        }, 2000)
      }, 1000)
    })
    .catch(error => {
      console.log(error.response);
      setTimeout(() => {
        signup_alert_txt.innerHTML = `很抱歉 ! 您的${error.response.data.error[0]} 請重新註冊`;
        signupModal.show();
        signup_status_txt.textContent = '';
        signupReset();
      }, 1000);
    })
}

function signupCheck() {
  let isnull = false;

  for (const item of signUpInput) {
    if (item.value == '') {
      isnull = true;
      break;
    }
  }
  if (isnull === true) {
    signup_alert_txt.textContent = '您還有欄位尚未填寫';
    signupModal.show();
    return;
  }
  if (signUpEmail.value.match('@') === null) {
    signup_alert_txt.textContent = 'Email 格式不正確';
    signupModal.show();
    signupReset();
    return;
  }
  if (signUpPassword.value.trim().length < 6) {
    signup_alert_txt.textContent = '密碼必須6個字以上喔 ! ';
    signupModal.show();
    signUpPassword.value = '';
    signUpPassword2.value = '';
    return;
  }
  if (signUpPassword.value !== signUpPassword2.value) {
    signup_alert_txt.textContent = '兩次的密碼輸入不一致喔 ! ';
    signupModal.show();
    signUpPassword.value = '';
    signUpPassword2.value = '';
    return;
  }
  return true;
}

function signupReset() {
  signUpEmail.value = '';
  signUpNickname.value = '';
  signUpPassword.value = '';
  signUpPassword2.value = '';
}