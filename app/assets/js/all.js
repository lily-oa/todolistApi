
const apiUrl = 'https://todoo.5xcamp.us';
//login-------------------------------------
const loginInput = document.querySelectorAll('.login-input');
const login_btn = document.querySelector('#login_btn');
const loginEmail = document.querySelector('#login-email');
const loginPassword = document.querySelector('#login-password');
const login_alert_txt = document.querySelector('.login_alert_txt');
const login_status_txt = document.querySelector('.login_status_txt');
const loginModal = new bootstrap.Modal('.js-login-modal');


//login 設定------------------------------
if (login_btn) {
  login_btn.addEventListener('click', function (e) {
    if (loginEmail.value.trim() == '' || loginPassword.value.trim() == '') {
      return;
    }
  })
  login_btn.addEventListener('click', () => {
    const login_check_ok = loginCheck();
    if (login_check_ok === true) {
      input(loginEmail.value, loginPassword.value)
    } else {
      return;
    }
  })
}


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
  }
  catch(error){
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
