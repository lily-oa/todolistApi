
const apiUrl = 'https://todoo.5xcamp.us';
const allinput = document.querySelectorAll('input');
const mail = document.querySelector('#signUpEmail');
const nickname = document.querySelector('#signUpNickName');
const first_pwd = document.querySelector('#signUpPassword');
const confirm_pwd = document.querySelector('#signUpPassword2');
const sign_btn = document.querySelector('.signup_btn');
const signup_alert_txt = document.querySelector('.signup_alert_txt');
const signup_modal = document.querySelector('.signup_modal');
const signup_status_txt = document.querySelector('.signup_status_txt');
const myModal = new bootstrap.Modal(modal, {})

signup_reset();

sign_btn.addEventListener('click', () =>{
  const format_isok = signup_check();
  if(format_isok === true){
    signup(mail, nickname, password)
  }else{
    return
  }
  console.log(132);
})

function signup_check(){
  let isnull = false;

  for(const item of allinput){
    if(item.value === ''){
      isnull = true;
      break;
    }
  }
  if(isnull === true){
    signup_alert_txt.textContent = '您還有欄位尚未填寫';
    myModal.show();
  }
  if(signUpEmail.value.match('@') === null){
    signup_alert_txt.textContent = 'Email 格式不正確';
    myModal.show();
    signup_reset();
    return;
  }
  if(first_pwd.value.trim().length < 6){
    signup_alert_txt.textContent = '密碼必須6個字以上喔 ! ';
    myModal.show();
    first_pwd.value = '';
    confirm_pwd.value = '';
    return;
  }
  if(first_pwd.value !== confirm_pwd.value){
    signup_alert_txt.textContent = '兩次的密碼輸入不一致喔 ! ';
    myModal.show();
    first_pwd.value = '';
    confirm_pwd.value = '';
    return;
  }
  return true;
}

function signup_reset(){
  mail.value = '';
  nickname.value = '';
  first_pwd.value = '';
  confirm_pwd.value = '';
}