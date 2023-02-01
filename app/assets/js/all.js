const apiUrl = 'https://todoo.5xcamp.us';
const allinput = document.querySelectorAll('input');
const email = document.querySelector('#Email1');
const password = document.querySelector('#Password1');
const login_btn = document.querySelector('.login_btn');
const alert_txt = document.querySelector('.alert_txt');
const status_txt = document.querySelector('.status_txt');
const modal = document.querySelector('#login_modal');
const loginModal = new bootstrap.Modal(modal, {})


const input = async(mail, pwd) => {
  try{
    const res = await login(mail, pwd);
    //設置默認標頭的機制語法，該標頭將隨您發出的每個請求一起發送
    axios.defaults.headers.common['Authorization'] = res.headers.Authorization
    sessionStorage.setItem('token', res.headers.Authorization)
    sessionStorage.setItem('name', res.data.nickname)
    

  }catch{

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
    alert.text.textContent = '您的Email格式不正確!!!';
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