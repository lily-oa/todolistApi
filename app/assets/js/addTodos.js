const user = document.querySelector('.username');
const header_logout = document.querySelector('.header_logout');





// init start

// 檢查有無token，若無token 不顯示登入後畫面
init_token_render();

function init_token_render(){
  if(sessionStorage.getItem('token')){
    let user_name = sessionStorage.getItem('name')
    header_logout.innerHTML = `
    <span class="d-none d-lg-block me-7 username">${user}的代辦事項</span>
    <a href="" class="text-dark fs-7 fs-lg-6 logoutBtn">登出</a>
    `
  }
}