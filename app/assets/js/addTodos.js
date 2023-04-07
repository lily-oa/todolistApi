const user = document.querySelector('.username');
const header_logout = document.querySelector('.header_logout');
let logout_btn;




// init start

// 檢查有無token，若無token 不顯示登入後畫面
init_token_render();

function init_token_render() {
  if (sessionStorage.getItem('token')) {
    const user_name = sessionStorage.getItem('name')
    header_logout.innerHTML=`
    <span class="d-none d-lg-block me-7 username">${user_name}的代辦事項</span>
    <a href="#" class="text-dark fs-7 fs-lg-6 logout">登出</a>
    `
    logout_btn = document.querySelector('.logout');
  } else {
    header_logout.innerHTML=`
      <a href="./index.html">登入</a>
      <a href="./signUp.html" class="signup_btn btn btn-dark py-14 mx-auto px-12 mb-7 mt-7">註冊帳號</a>
  `
  }
}

