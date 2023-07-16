
//在輸入框間左右跳
var inputFields = document.getElementsByTagName("input");

for (var i = 0; i < inputFields.length; i++) {
inputFields[i].addEventListener("keydown", function(event) {
    if (event.keyCode === 39) { // 右鍵
    var currentIndex = Array.from(inputFields).indexOf(this);
    var nextIndex = (currentIndex + 1) % inputFields.length;
    inputFields[nextIndex].focus();
    event.preventDefault();
    } else if (event.keyCode === 37) { // 左鍵
    var currentIndex = Array.from(inputFields).indexOf(this);
    var prevIndex = (currentIndex - 1 + inputFields.length) % inputFields.length;
    inputFields[prevIndex].focus();
    event.preventDefault();
    }
});
}

//當類別的下拉選單 onchange時 把資料傳到後端 並且 拿這個類別的所有資料 並且改變展示出來的database
 
    //製作fetchData() => 填充excel_col_data {colA:[] , colB:[] , colC:[] }

        ///卡了好久 原來可以設全域變數 這邊假設 到fetch函數放入data 到下一個<script>標籤 也還在!!
        var excel_col_data=[];     
        //函式定義
        function fetchData() {
            // 建立promise 讓他跑完後才會執行下一步 30~56
            return new Promise((resolve, reject) => {


                //取得所選的類別
                const input_class = document.getElementById('class_for_fetch').value;
                    
                
                //fetch("後端網址",{}) 把{的內容}變成一個變數////////
                var requestOptions = {                                  
                method: 'POST',
                headers: {
                                'Content-Type': 'application/json'
                },
                body: JSON.stringify({ data: input_class })         
                };
                //fetch("後端網址",{}) 把{的內容}變成一個變數////////
                    
                        
                // 使用 Ajax 請求從後端獲取資料 fetch("網址",...).then().then()
                fetch('http://127.0.0.1:5000/return_excel_data',requestOptions)                                   
                .then(response => response.json())                     
                .then(res_json => {   

                // 更新頁面上的資料內容
                excel_col_data = res_json

            // 表示 fetchData() 把值甜到excel_col_data裡面了   resolve要放在fetch裡面 剛剛放外面一直失敗
            resolve(); 

                });//then(res_json => {        的 "})"

                
            });//Promise((resolve, reject) => {       的")}"

        }  // fetchData(){      的 "}"

    //製作fetchData()韓式end


    //製作改變"展示database"區域的函式
        function ReShow_database(){

            // 獲取要插入的 ul 元素且先清空
            const ulElement = document.querySelector("#show_database ul");
            ulElement.innerHTML=``;

            //遍歷excel_col_data {colA:[] , colB:[] , colC:[] } 中的colA:[] ，用"in" 可以遍歷index就好(0~n-1)
            //for (const item of data) 則是遍歷"值"
            for (const index in excel_col_data.colA){

                //取出database的值 
                const name= excel_col_data.colA[index];
                const price= excel_col_data.colB[index];
                const unit= excel_col_data.colC[index];

                //CREAT 新的元素 並定義元素內容
                const liElement = document.createElement("li");
                liElement.innerHTML = `<span>${name}</span> 每${unit}${price}元`;

                //插回去(在for迴圈裡面一個一個插)
                ulElement.appendChild(liElement);
 
            }
        }
    //製作改變"展示database"區域的函式 end

    //把兩個函式合而為一 onchange時呼叫這函式
        function fetch_and_show(){
            //fetchData()現在是promise了等它跑完在執行下一步
            fetchData().then(() => {

                ReShow_database();

              });
        }


//當類別的下拉選單 onchange時 把資料傳到後端 並且 拿這個類別的所有資料 並且改變展示出來的database end



// 按下enter傳資料到後端 並 更新所展示的database 使用JQUERY語法

    // 監聽價錢輸入框的 keydown 事件
    $('#price_input, #name_input').on('keydown', function(event) {
        if (event.key === 'Enter') {
        sendDataToBackend().then(()=>{
            fetch_and_show()
        })
        }
    });

    //製作送資料給後端的函式
    function sendDataToBackend() {
        // 建立promise 讓他跑完後才會執行下一步 124~158~164
        return new Promise((resolve, reject) => {

            // 取得輸入框的值
            var name = $('#name').val();
            var unit =  $('#unit').val();
            var food_class = $('#class_for_fetch').val();
            var price = $('#price').val();

            // 檢查是否為空
            if (!name.trim() && !price.trim()) {
                alert('你是霍金阿 手抖按到enter 什麼都沒填');
                return;
            }
            else if (!name.trim()) {
            alert('話說~你的名稱被你吃掉了嗎');
            return;
            }
            else if (!price.trim()) {
            alert(name+'是不用錢是不是阿');
            return;
            }
            else if (isNaN(price)){
            alert(price+'可以當錢花嗎 給我重打!');
            return;
            }
            
            // 傳送資料到後端（使用 fetch 或其他方法）
            fetch('http://127.0.0.1:5000/add_to_excel', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                price: price,
                unit: unit,
                food_class: food_class

            })
            })
            .then(response => {
                    if (response.ok) {
                        console.log('Data added successfully!');
                    } else {
                        console.log('Something went wrong:', response.status);
                    }
        resolve();
                })
            //不用第二個then 因為後端沒傳資料回來
            .catch(error => {
            console.error('Error:', error);
            });
        })
    }
    //製作送資料給後端的函式


// 按下enter傳資料到後端 並 更新所展示的database end



//點擊所展示的database 可以直接在名稱那裏顯現
// 要把監聽事件綁到父元素身上 然後監聽這個父元素底下的 span
$('#show_database').on('click',"span", function() {

    //取得所點的內容
    name_got_clicked = $(this).text();

    // 把所點放到輸入框上
    $("#name").val(name_got_clicked);

});
//點擊所展示的database 可以直接在名稱那裏顯現 end



//下拉選單選完後 直接focus 輸入框

//選完類別自動跳到名稱
$("#class_for_fetch").on('change',()=>{
    $("#name").focus()
})

//選完單位自動跳到價錢
$("#unit").on('change',()=>{
    $("#price").focus()
})


//下拉選單選完後 直接focus 輸入框 end



//輸入框只能打中文 或英文

//輸入框只能打中文 或英文 end
