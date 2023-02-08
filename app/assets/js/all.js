
const apiUrl = 'https://todoo.5xcamp.us';
//login-------------------------------------
const loginInput = document.querySelectorAll('.login-input');
const loginEmail = document.querySelector('#login-email');
const loginPassword = document.querySelector('#login-password');
const login_btn = document.querySelector('.login_btn');
const login_alert_txt = document.querySelector('.login_alert_txt');
const login_status_txt = document.querySelector('.login_status_txt');
const callModal = document.querySelector('#login_modal');
const loginModal = new bootstrap.Modal(callModal, {})
//signup---------------------------------------
const signUpEmail = document.querySelector('#signUpEmail');
const signUpNickname = document.querySelector('#signUpNickname');
const signUpPassword = document.querySelector('#signUpPassword');
const signUpPassword2 = document.querySelector('#signUpPassword2');
const signUpBtn = document.querySelector('.signup_btn');
const signup_alert_txt = document.querySelector('.signup_alert_txt');
const signup_status_txt = document.querySelector('.signup_status_txt');
const signup_modal = document.querySelector('.signup_modal');
const signup_myModal = new bootstrap.Modal(signup_modal, {})

//login 設定------------------------------
login_btn.addEventListener('click', () => {
  const login_check_ok = loginCheck();
  if(login_check_ok === true) {
    input(loginEmail.value, loginPassword.value)
  }else{
    return;
  }
})

function login(loginEmail, loginPassword) {
  login_status_txt.textContent = '登入中請稍後 ...';
  return axios.post(`${apiUrl}/users/sign_in`,
    {
      "user":{
        "email": loginEmail,
        "password": loginPassword
      }
    }
  )
}

const input = async(mail, pwd) => {
  try{
    const res = await login(mail, pwd);
    //設置默認標頭的機制語法，該標頭將隨您發出的每個請求一起發送
    axios.defaults.headers.common['Authorization'] = res.headers.authorization
    sessionStorage.setItem('token', res.headers.authorization)
    sessionStorage.setItem('name', res.data.nickname)
    setTimeout(() =>{
      login_status_txt.textContent = '';
      login_alert_txt.innerHTML = `登入成功 ! 歡迎${res.data.nickname} 回來 <br><br> 即將跳轉待辦清單...`;
      loginModal.show();
      loginReset();
      setTimeout(() =>{
        document.location.href='./addTodos.html';
      }, 2000);
    }, 1000);

  }catch(error){
    setTimeout(() =>{
      login_status_txt.textContent = '';
      login_alert_txt.textContent = '登入失敗，您的Email或密碼有誤!'
      loginModal.show()
      loginReset();
    }, 1000);
  }
}

function loginCheck(){
  let isnull = false;
  for(const item of loginInput){
    if(item.value === ''){
      isnull = true;
      break;
    }
  }
  if (isnull === true){
    login_alert_txt.textContent = '您還有欄位尚未填寫喔!!';
    loginModal.show();
    loginReset();
    return;
  }
  //email的輸入值字串必須有 @
  if(loginEmail.value.match('@') === null){
    login_alert_txt.textContent = '您的Email格式不正確!!!';
    loginModal.show();
    loginReset();
    return;
  }
  return true;
}

function loginReset(){
  loginEmail.value = '';
  loginPassword.value = '';
}


//signup 設定------------------------------

signupReset();

signUpBtn.addEventListener('click', () => {
  const format_isok = signupCheck();
  if (format_isok === true) {
    signup(mail, nickname, password)
  } else {
    return;
  }
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
        signup_myModal.show();
        signup_status_txt.textContent = '';
        signupReset();
      }, 1000);
    })
}

function signupCheck() {
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
    signupReset();
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

function signupReset() {
  signUpEmail.vlaue = '';
  signUpNickname.value = '';
  signUpPassword.value = '';
  signUpPassword2.value = '';
}