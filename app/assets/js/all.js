const apiUrl = 'https://todoo.5xcamp.us';
const allinput = document.querySelectorAll('input');
const email = document.querySelector('#Email1');
const password = document.querySelector('#Password1');
const login_btn = document.querySelector('.login_btn');
const alert_txt = document.querySelector('.alert_txt');
const status_txt = document.querySelector('.status_txt');
const modal = document.querySelector('#login_modal');
const loginModal = new bootstrap.Modal(modal, {})

login_btn.addEventListener('click', () => {
  const check_ok = check();
  if(check_ok === true) {
    input(email.value, password.value)
  }else{
    return;
  }
})

function login(email, password) {
  status_txt.textContent = '登入中請稍後 ...';
  return axios.post(`${apiUrl}/users/sign_in`,
    {
      "user":{
        "email": email,
        "password": password
      }
    }
  )
}

const input = async(mail, pwd) => {
  try{
    const res = await login(mail, pwd);
    //設置默認標頭的機制語法，該標頭將隨您發出的每個請求一起發送
    axios.defaults.headers.common['Authorization'] = res.headers.Authorization
    sessionStorage.setItem('token', res.headers.Authorization)
    sessionStorage.setItem('name', res.data.nickname)
    setTimeout(() =>{
      status_txt.textContent = '';
      alert_txt.innerHTML = `登入成功 ! 歡迎${res.data.nickname} 回來 <br><br> 即將跳轉待辦清單...`;
      loginModal.show();
      reset();
      setTimeout(() =>{
        document.location.href='./addTodos.html';
      }, 2000);
    }, 1000);

  }catch(error){
    setTimeout(() =>{
      status_txt.textContent = '';
      alert_txt.textContent = '登入失敗，您的Email或密碼有誤!'
      loginModal.show()
      reset();
    }, 1000);
  }
}

function check(){
  let isnull = false;
  for(const item of allinput){
    if(item.value === ''){
      isnull = true;
      break;
    }
  }
  if (isnull === true){
    alert_txt.textContent = '您還有欄位尚未填寫喔!!';
    loginModal.show();
    reset();
    return;
  }
  //email的輸入值字串必須有 @
  if(email.value.match('@') === null){
    alert_txt.textContent = '您的Email格式不正確!!!';
    loginModal.show();
    reset();
    return;
  }
  return true;
}

function reset(){
  email.value = '';
  password.value = '';
}

//---------------------------------------------------------------signUp JS

//共用 apiUrl、 allinput

// const mail = document.querySelector('#signUpEmail');
// const nickname = document.querySelector('#signUpNickName');
// const first_pwd = document.querySelector('#signUpPassword');
// const confirm_pwd = document.querySelector('#signUpPassword2');
// const sign_btn = document.querySelector('.signup_btn');
// const signup_alert_txt = document.querySelector('.signup_alert_txt');
// const signup_modal = document.querySelector('.signup_modal');
// const signup_status_txt = document.querySelector('.signup_status_txt');
// const myModal = new bootstrap.Modal(modal, {})

// signup_reset();

// sign_btn.addEventListener('click', () =>{
//   const format_isok = signup_check();
//   if(format_isok === true){
//     signup(mail, nickname, password)
//   }else{
//     return
//   }
//   console.log(132);
// })

// function signup_check(){
//   let isnull = false;

//   for(const item of allinput){
//     if(item.value === ''){
//       isnull = true;
//       break;
//     }
//   }
//   if(isnull === true){
//     signup_alert_txt.textContent = '您還有欄位尚未填寫';
//     myModal.show();
//   }
//   if(signUpEmail.value.match('@') === null){
//     signup_alert_txt.textContent = 'Email 格式不正確';
//     myModal.show();
//     signup_reset();
//     return;
//   }
//   if(first_pwd.value.trim().length < 6){
//     signup_alert_txt.textContent = '密碼必須6個字以上喔 ! ';
//     myModal.show();
//     first_pwd.value = '';
//     confirm_pwd.value = '';
//     return;
//   }
//   if(first_pwd.value !== confirm_pwd.value){
//     signup_alert_txt.textContent = '兩次的密碼輸入不一致喔 ! ';
//     myModal.show();
//     first_pwd.value = '';
//     confirm_pwd.value = '';
//     return;
//   }
//   return true;
// }

// function signup_reset(){
//   mail.value = '';
//   nickname.value = '';
//   first_pwd.value = '';
//   confirm_pwd.value = '';
// }