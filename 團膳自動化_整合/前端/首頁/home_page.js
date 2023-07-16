

//按下左上圖片跳轉到 add_new_page 新增資料庫的頁面
document.getElementById('creat_new_food_button').addEventListener('click', function() {
    // 在按鈕點擊後，使用 JavaScript 跳轉到另一個頁面
    window.location.href = '../新增食材資料庫/creat_new_food.html'; // 將網址設為你想要跳轉的頁面路由
});


//按下右上圖片跳轉到 caculate_page 計算的頁面
document.getElementById('caculate_food_price_button').addEventListener('click', function() {
    // 在按鈕點擊後，使用 JavaScript 跳轉到另一個頁面
    window.location.href = '../計算總價/caculate_page.html'; // 將網址設為你想要跳轉的頁面路由
});


//讓圖片搖完不會消失(opacity 變0) 
const img_1 = document.querySelector('#creat_new_food_button')
img_1.addEventListener('mouseover', () => {
    img_1.classList.add('visible');
});
const img_2 = document.querySelector('#button_3')
img_2.addEventListener('mouseover', () => {
    img_2.classList.add('visible');
});