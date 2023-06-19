//在此宣告的原因
//因為 apiUrl 宣告的位置是在 all.js ，所以編譯後 apiUrl 變數位置會在 addTodos.js 的後面
const apiUrl = 'https://todoo.5xcamp.us';

const list = document.querySelector('.list');
const inputBlock = document.querySelector('.input-block')
const user = document.querySelector('.username');
const header_logout = document.querySelector('.header_logout');
const inputText = document.querySelector('.input-text');
const enterBtn = document.querySelector('.enter-btn');
const nonList = document.querySelector('.none-list');
const listBlock = document.querySelector('.list-block');

let APIData = {};
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
    <div class="d-none d-lg-block me-7 username">${user_name}的代辦事項</div>
    <a href="#" class="text-dark fs-7 fs-lg-6 logoutBtn">登出</a>
    `
    //初始畫面
    getTodo();
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
    str += `<li data-id="${item.id}" class="tick">
              <input type="checkbox" class="form-check-input" id="${item.id}"
              ${
                item.completed_at === null ? "" : "checked"
                }
            >
              <label for="${item.id}" class="checkbox">
                  <span class="ps-9" id="${item.id}">${item.content}</span>
              </label>
              
              <button href="#" class ="update me-2">編輯</button>
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

//----------------------------------------------------取得 
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
//滑鼠事件檢查重複
if(enterBtn) {
  enterBtn.addEventListener('click', () => {
    before_addTods_checkSame();
  });
}

//鍵盤事件檢查重複
if(inputBlock){
  inputBlock.addEventListener("keypress", (event) =>{
    if(event.which == 13){
      before_addTods_checkSame();
    }
  });
}

//函式-新增代碼之前檢查重複
function before_addTods_checkSame(){
  if(inputText.value !== ''){
    const add_item = inputText.value;
//檢查有無重複
    check_same(add_item);
  }else{
    Swal.fire(
      `請輸入代辨事項`,
      "你忘記輸入事項了喔!!",
      "warning"
    )
    return;
  }
}

// 檢查重複
function check_same(add_item) {
  axios.get(`${apiUrl}/todos`,{
    headers: {
      Authorization: sessionStorage.getItem('token')
    }
  })
    .then((res) => {
      const check = res.data.todos.some((item) => {
        return item.content == add_item.trim();
      })
      if(check){
        inputText.value = '';
        Swal.fire(
          `重複了喔!!`,
          "這個事項你已輸入過了!",
          "warning"
        )
        return;
      }else{
        addTodo(add_item);
      }
    })
}


// 新增
function addTodo(item) {
    axios.post(`${apiUrl}/todos`, {
      todo: {
        content: item
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
      inputText.value = '';
      updateList();
    })
    .catch((err) => console.log(err.response));
}

//--------------------------------------------------------更新
//切換畫面
const tab = document.querySelector('.tab');
let tabStatus = 'all';

if(tab){
  tab.addEventListener('click', function(e){
    tabStatus = e.target.dataset.status;
    let tabs = document.querySelectorAll(".tab li");
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


//----------------------------------------刪除 & 完成代辦 & 單筆更新
if (list) {
  list.addEventListener('click', function (e) {
    let index = '';

    console.log(e.target.nodeName);

    let listId = e.target.closest("li").dataset.id;


    if (e.target.nodeName === "A") {
      e.preventDefault();

      axios.delete(`${apiUrl}/todos/${listId}`, {
          headers: {
            Authorization: sessionStorage.token,
          },
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err.response));

      let index = data.findIndex((item) => item.id === listId);
      data.splice(index, 1);
      updateList();

    } else if (e.target.nodeName === "BUTTON") {
      e.preventDefault();

      // 單筆資料更新_編輯(修改)todo
      if (e.target.classList.contains('update')) {
        index = data.findIndex((item) => item.id === e.target.previousElementSibling.htmlFor);
        //console.log(index);
        let updateText = `<input name="updateTextOk" class="input_ok border border-danger" type="text" value="${data[index].content}"><button type="button" class="update_ok">送出</button>`;
        const updateData = document.querySelectorAll('span')[index];

        updateData.innerHTML = updateText;
        //todo編輯鈕(因有多個，需使用索引值來對應) 切換成"隱藏"(進而顯示送出button)
        document.querySelectorAll('.list .update')[index].classList.toggle('button_none');
      }

      //單筆資料更新_編輯(修改)todo > 編輯送出
      if (e.target.classList.contains('update_ok')) {
        index = data.findIndex((item) => item.id === e.target.parentNode.parentNode.htmlFor)
        const todo = document.querySelector(".listContent input[name='updateTextOk']").value.trim();
        
        axios.put(`${apiUrl}/todos/${listId}`, {
            "todo": {
              "content": todo
            },
          }, {
            headers: {
              Authorization: sessionStorage.token,
            },
          })
          .then((res) => {
            // 將新增後的todo，把值更新給data[index].content(對應todo內容)。
            data[index].content = todo;
            renderData(data);
          })
          .catch((error) => {
            let reason = error.response.data.error ? error.response.data.error : "";
            alert(error.response.data.message + "" + reason)
          });
      }
    } else if (e.target.getAttribute('type') === "checkbox" && e.target.nodeName === "INPUT"){
      data.forEach((i) => {
        if (i.id === listId) {
          axios.patch(`${apiUrl}/todos/${listId}/toggle`, {}, {
              headers: {
                Authorization: sessionStorage.token,
              },
            })
            .then((res) => {
              data.forEach((item, index) => {
                if (item.id === res.data.id) {
                  data[index].completed_at = res.data.completed_at;
                }
              });
              updateList();
            })
            .catch((err) => console.log(err));
        }
      });
    }
  });
}





// 清除完成項目
const clearAll = document.querySelector('.clear-all');
const addTodos_alert_txt = document.querySelector('.addTodos_alert_txt');


if(clearAll){
  const addTodosModal = new bootstrap.Modal('.js-addTodos-modal');
  clearAll.addEventListener('click', function(e) {
    e.preventDefault();
    let deleteData = data.filter((i) => i.completed_at !== null);
    deleteData.forEach((i) => {
      axios.delete(`${apiUrl}/todos/${i.id}`, {
        headers:{
          Authorization: sessionStorage.token,
        },
      })
      .then((res) => {
        //-------------------燈箱效果
        addTodosModal.show();
        setTimeout(() => {
          addTodos_alert_txt.innerHTML = `全部刪除成功!`;
        })
        //--------------------
      })
      .catch((err) => console.log(err));
    })

    data = data.filter((i) => i.completed_at === null);
    tabStatus = 'all';
  //判斷tab並篩選要渲染的內容(含tab樣式)，宣告const tabArea = document.querySelector(".card_content .tab");
  //待辦清單狀態 tabArea.childNodes[0]為全部(<li class="tabs-active">全部</li>)、tabArea.childNodes[1]為待完成、tabArea.childNodes[2]為已完成。
    const tabArea = document.querySelector('.card_content .tab');  
    tabArea.childNodes.forEach((i) => {
        if(i.nodeName === "LI"){
          i.classList.remove('tabs-active');
          tabArea.children[0].classList.add('tabs-active');
        }
      })
      updateList(data);
    });
}