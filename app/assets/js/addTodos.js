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

    //---------------------------------------------------- 登出
    const logoutBtn = document.querySelector('.logoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', function (e) {
        e.preventDefault();
        return axios.delete(`${apiUrl}/users/sign_out`, {
            headers: {
              Authorization: sessionStorage.getItem('token')
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

//------------------------------------------------------------渲染
//渲染畫面
function renderData(arr) {
  let str = '';
  arr.forEach((item) => {
    str += `<li data-id="${item.id}">
    <label for="" class="checkbox">
      <input type="checkbox" class="form-check-input"
      ${
        item.completed_at === null ? "" : "checked"
      }
    >
      <span class="ps-4">${item.content}</span>
    </label>
    <a href="#" class="delete"></a>
  </li>`;
  });
  nonList.setAttribute("class", "d-none");
  listBlock.setAttribute('class', 'd-block');
  list.innerHTML = str;

  removeAll();
}

// clear All
function removeAll() {
  if (data.length === 0) {
    listBlock.setAttribute('class', 'd-none');
    nonList.removeAttribute('class', 'd-none');
  }
}

function getTodo() {
  return axios.get(`${apiUrl}/todos`, {
      headers: {
        Authorization: sessionStorage.getItem('token')
      },
    })
    .then((res) => {
      // 推入陣列前做清空，避免重複寫入出現渲柒問題
      //data.splice(0, data.length);
      data = res.data.todos;
      console.log(data);
      updateList();
    })
    .catch((err) =>
      Swal.fire(
        `${err.response}`,
        '出現了一些錯誤',
        'warning'
      )
    );
}

//----------------------------------------------------新增
//新增代碼
if(enterBtn) {
  enterBtn.addEventListener('click', addTodo);
}
function addTodo() {
  if (inputText.value === '') {
    Swal.fire(
      `請輸入代辨事項`,
      "你忘記輸入事項了喔!!",
      "warning"
    )
    return;
  }
  return axios.post(`${apiUrl}/todos`, {
      todo: {
        content: inputText.value,
      },
    }, {
      headers: {
        Authorization: sessionStorage.getItem('token')
      }
    })
    .then((res) => {
      getTodo();
      let obj = {};
      obj.content = inputText.value;
      obj.check = '';
      data.unshift(obj);
      //console.log(inputText.value);
      inputText.value = '';
      updateList();
    })
    .catch((err) => console.log(err.response));
}

// 按鈕輸入
if(inputBlock){
  inputBlock.addEventListener('keyup', function(e){
    if(e.key === "Enter"){
      addTodo();
    }
  })
}

//--------------------------------------------------------更新
//切換畫面
const tab = document.querySelector('.tab');
let tabStatus = 'all';
if(tab){
  tab.addEventListener('click', function(e){
    tabStatus = e.target.dataset.status;
    let tabs = document.querySelectorAll('.tab li');
    tabs.forEach((i) => {
      i.classList.remove('tabs-active');
    });
    e.target.classList.add('tabs-active');
    updateList();
  });
}

let undoNum = document.querySelector('.undo-num');

function updateList(){
  
  let showData = [];

  if(tabStatus === 'all'){
    showData = data;
  }else if(tabStatus === 'undo'){
    showData = data.filter((i) => i.completed_at === null);
  }else if(tabStatus === 'done'){
    showData = data.filter((i) => i.completed_at !== null);
  }

  let todoLength = data.filter((i) => i.completed_at === null);
  let str = `${todoLength.length} 個待完成項目`;
  undoNum.innerHTML = str;
  renderData(showData);
}

