//login-------------------------------------
const loginInput = document.querySelectorAll('.login-input');
const login_btn = document.querySelector('#login_btn');
const loginEmail = document.querySelector('#login-email');

const loginPassword = document.querySelector('#login-password');
const login_alert_txt = document.querySelector('.login_alert_txt');  //在 loginModal 上
const login_status_txt = document.querySelector('.login_status_txt');

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
//-------------------------以上為之前發出錯誤時少寫的程式碼

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
  const loginModal = new bootstrap.Modal('.js-login-modal');
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
  const loginModal = new bootstrap.Modal('.js-login-modal');
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
  if(loginPassword.value.length < 6){
    checkPWD();
  }
  return true;
}

function loginReset(){
  loginEmail.value = '';
  loginPassword.value = '';
}

PWD.addEventListener('keyup', checkPWD);

//密碼輸入確認
function checkPWD(){
  // 正規式 至少六個字符，含數字或字母(大小寫)之字串。
  let PWD = /[0-9A-Za-z]{6,}/;
  const notice = document.querySelector("form p.PWD");
  // this(指的是密碼<input>欄位)
  if(this.value === ''){
    notice.textContent = '此欄位必填'
  }
  //欄位已填入資料，且將"match符合時會印出的結果"，使用!將結果反向(即match為null。無符合匹配)。
  //(*將密碼input裡面的value透過match方法查詢，沒有找到匹配返回 null。反之會印出匹配結果。)
  else if(!this.value.match(PWD)){
    notice.textContent = `格式不符，至少需再填入${6 - this.value.length}字元`;
  }
  // 如密碼欄位內有值且格式正確，將提示文字 "通過 "
  else{
    notice.textContent = '密碼通過';
  }
}