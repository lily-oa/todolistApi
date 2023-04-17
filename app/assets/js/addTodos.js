const list = document.querySelector('.list');
const inputBlock = document.querySelector('.input-block')
const user = document.querySelector('.username');
const header_logout = document.querySelector('.header_logout');
const inputText = document.querySelector('.input-text');
const enterBtn = document.querySelector('.enter-btn');
const nonList = document.querySelector('.none-list');
const listBlock = document.querySelector('.list-block');

let data = [];



// 登入成功後顯示使用者名稱
// 檢查.header_logout 是否有值，若有才執行init_token_render
// (因為init_token_render只在addtoTods.html頁面才有，避免在別的頁面產生錯誤)
    if (header_logout) {
      init_token_render();
    }

// 檢查有無token，若無token 不顯示登入後畫面
    function init_token_render() {
      if (sessionStorage.getItem('token')) {
        const user_name = sessionStorage.getItem('name')
        header_logout.innerHTML = `
    <span class="d-none d-lg-block me-7 username">${user_name}的代辦事項</span>
    <a href="#" class="text-dark fs-7 fs-lg-6 logoutBtn">登出</a>
    `
      } else {
        return;
      }
    }

    // 登出
    const logoutBtn = document.querySelector('.logoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', function (e) {
        e.preventDefault();
        axios.delete(`${apiUrl}/users/sign_out`, {
            headers: {
              Authorization: sessionStorage.token,
            },
          })
          .then((res) => {
            Swal.fire(
                `${res.data.message}`,
                "已登出，下次見!!!",
                "success"
              ).then((result) => {
                if (result.isConfirmed) {
                  window.location.assign("index.html");
                }
              })
              .catch((err) => console.log(err.response));
          })
      })
    }


//渲染畫面
function renderData(arr) {
  let str = '';
  arr.forEach((item) => {
    str += `<li data-id="${item.id}">
    <label for="" class="checkbox">
      <input type="checkbox" class="form-check-input">
      <span class="ps-4">${item.content}</span>
    </label>
    <a href="#" class="delete"></a>
  </li>`;
  });
  nonList.setAttribute("class", "d-none");
  listBlock.setAttribute('class', 'd-block');
  list.innerHtml = str;
  removeAll();
}

// clear All
function removeAll() {
  if (data.length === 0) {
    listBlock.setAttribute('class', 'd-none');
    nonList.removeAttribute('class', 'd-none');
  }
}

//新增代碼

