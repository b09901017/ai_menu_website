

//當類別的下拉選單 onchange時 把資料傳到後端 並且 拿這個類別的所有資料 所需的fetch函式
        
    //  ***** 製作fetchData() => 填充excel_col_data {colA:[] , colB:[] , colC:[] } *****

        ///卡了好久 原來可以設全域變數 這邊假設 到fetch函數放入data 到下一個<script>標籤 也還在!!
        var excel_col_data=[];     
        //函式定義
        function fetchData(this_select) {
            // 建立promise 讓他跑完後才會執行下一步 30~56
            return new Promise((resolve, reject) => {

                //取得所選的類別
                const input_class =this_select.val();
                    
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

//當類別的下拉選單 onchange時 把資料傳到後端 並且 拿這個類別的所有資料 所需的fetch函式 end







//製作把database放到menu上的函式
    function show_database(this_select){

        //取得父兄子元素
        const class_container = this_select.parent();
        const name_group = class_container.siblings(".name_group");
        const database_price_container = name_group.children(".database_price_container");
        const database_price = database_price_container.children(".database_price");
        const ulElement = database_price.children("ul");
        
        // 獲取要插入的 ul 元素且先清空
        ulElement.html("");


        //遍歷excel_col_data {colA:[] , colB:[] , colC:[] } 中的colA:[] ，用"in" 可以遍歷index就好(0~n-1)
        //for (const item of data) 則是遍歷"值"
        for (const index in excel_col_data.colA){

            //取出database的值 
            const db_name= excel_col_data.colA[index];
            const db_price= excel_col_data.colB[index];
            const db_unit= excel_col_data.colC[index];

            //CREAT 新的元素 並定義元素內容
            const liElement = document.createElement("li");
            liElement.innerHTML = `<span class="name_db">${db_name}</span><span class="unit_db">每${db_unit}</span><span class="price_db">$${db_price}元</span>`;
        
            //插回去(在for迴圈裡面一個一個插)
            ulElement.append(liElement);
        }//for迴圈
        console.log(class_container)
    }

//製作把database放到menu上的函式end







//當類別的下拉選單 onchange時 1 一勞永逸的使用fetch函式() 填充excel_col_data {colA:[] , colB:[] , colC:[] }等等會一直用
//               onchange時  2 把database的資料放到menu上

    //要在父元素上放監聽 當底下的".class_container select" 改變時觸發
    $("#inputs_container").on("change",".class_container select",function(){

        //fetchData()現在是promise了等它跑完在執行下一步
        fetchData($(this)).then(() => {

            show_database($(this));
            
        });
    })


//當類別的下拉選單 onchange時 1 填充excel_col_data 2 展示資料庫 







//菜單出現
    //只取所點input下面的menu
    function call_menu(input){
        menu = input.parentNode.querySelector('div')
        // menu.style.display = "grid";
        menu.style.setProperty('--ani_name', `show_menu`);
        // menu.style.setProperty('--duration', `.2s`); 後來寫了 envent.preventDefult~就不怕了
        }
        //使用 this.parentNode 屬性來獲取當前元素的父元素。
        function retreat_menu(input){
        menu = input.parentNode.querySelector('div')
        // menu.style.display = "none";
        menu.style.setProperty('--ani_name', `close_menu`);
        // menu.style.setProperty('--duration', `.1s`); //怕感應不到點了span
        }







// // 在輸入框左右跳
//     var inputFields = document.getElementsByTagName("input");

//         for (var i = 0; i < inputFields.length; i++) {
//         inputFields[i].addEventListener("keydown", function(event) {
//             if (event.keyCode === 39) { // 右鍵
//             var currentIndex = Array.from(inputFields).indexOf(this);
//             var nextIndex = (currentIndex + 1) % inputFields.length;
//             inputFields[nextIndex].focus();
//             event.preventDefault();
//             } else if (event.keyCode === 37) { // 左鍵
//             var currentIndex = Array.from(inputFields).indexOf(this);
//             var prevIndex = (currentIndex - 1 + inputFields.length) % inputFields.length;
//             inputFields[prevIndex].focus();
//             event.preventDefault();
//             }
//         });
//         }







//改變class 顯示答案的按鈕的class在 writting 和 erasing 中切換 並呼叫一一分割(span)一一delay 函式
    function CahngeClass_SpanSlice_DelayOneByOne(clicked_caculate_btn){
        if(clicked_caculate_btn.hasClass('writing')){

            //移除writing 改成erasing
            clicked_caculate_btn.removeClass('writing').addClass('erasing');

            //呼叫erasing 函式 把357元 一個字一個字用span包起來 一個一個都設置delay
            erasing(clicked_caculate_btn)
            console.log("writing")
        }
        else if(clicked_caculate_btn.hasClass('erasing')){
            
            //移除erasing 改成writing
            clicked_caculate_btn.removeClass('erasing').addClass('writing');

            ////呼叫wrutting 函式 把357元 一個字一個字用span包起來 一個一個都設置delay
            writing(clicked_caculate_btn)
            console.log("erasing")
        }
        else{
            //移除caculate_btn 改成writing
            clicked_caculate_btn.removeClass('caculate_btn').addClass('writing');

            ////呼叫wrutting 函式 把357元 一個字一個字用span包起來 一個一個都設置delay
            writing(clicked_caculate_btn)
            console.log("caculate_btn")
        }
    }
//改變class 顯示答案的按鈕的class在 writting 和 erasing 中切換 並呼叫一一分割(span)一一delay 函式 end





// writting erasing 函式 把357元 一個字一個字用span包起來 一個一個都設置delay

    function writing(clicked_caculate_btn){
        
        //clicked_caculate_btn 傳入 $(this) 是被點擊的btn
        const show_result = clicked_caculate_btn.parent().siblings(".show_result")

        // 将文本内容"文字"拆分为每个字(用""隔開)
        const letters = show_result.text().split('');

        // 用<span>包裹每个字，并重新设置HTML内容 //字串把每個字元都包上<span> 放到新的newHtml中
        let newHtml = '';
        letters.forEach(character => {
          newHtml += `<span>${character}</span>`;
        });
          
        //把包好的放入原本的裡面
        show_result.html(newHtml);

        //對於<div class="show_result"> 底下的所有span 都給予編號 並依據編號設置delay 和其他的東西~
        show_result.children("span").each(function(index) {
            // 設定delay = n*0.3 s // 改使用的動畫 //透明度改從0開始~1
            $(this).css(
                {
                    'animationDelay': `${index * .1}s`,
                    'animationName' : 'show_onebyone',
                    'opacity' : '0'
                }
            );//css的
        });//span.each的

    }//writing function的
    
    function erasing(clicked_caculate_btn){

        //clicked_caculate_btn 傳入 $(this) 是被點擊的btn
        const show_result = clicked_caculate_btn.parent().siblings(".show_result")

        //在witting()時 就已經一個一個字分開用span包起來了 

        //對於<div class="show_result"> 底下的所有span 都給予編號 並依據編號設置delay 和其他的東西~
        show_result.children("span").each(function(index) {
            // 設定delay = 1-n*0.35 s // 改使用的動畫 //透明度改從1開始~0
            $(this).css(
                {
                    'animationDelay': `${1-index * .35}s`,
                    'animationName' : 'disappear_onebyone',
                    'opacity' : '1'
                }
            );//css的
        });//span.each的

    }//erasing function的

// writting erasing 函式 把357元 一個字一個字用span包起來 一個一個都設置delay end






//新增一條計算框 內容有 1類別 (2名稱 3需求量) 4單位 5計算按鈕 6顯示答案的位置 
    //要增加的內容
    new_food_input = 
        `
        <!-- A-2-a 其中一條的計算框 用flex 讓 1類別 2名稱 3需求量 4單位 5答案  水平排列  -->
        <div class="input_container">

            <!-- A-2-a1 類別 -->
            <div class="class_container">
                <select>                
                    <option>它是哪一類呢~</option>
                    <option>乳品</option>
                    <option>豆、魚、蛋、肉類</option>
                    <option>全榖雜糧類</option>
                    <option>蔬菜類</option>
                    <option>水果類</option>
                    <option>油脂與堅果種子類</option>
                    <option>其他辛香料</option>  
                </select>
            </div>

            <!-- A-2-a2 名稱輸入(名稱選擇menu) -->
            <div  class="group name_group"> 
                <!-- 名稱輸入 -->
                <input type="text" required onfocus="call_menu(this)" onblur="retreat_menu(this)">
                <span class="highlight"></span>
                <span class="bar"></span>
                <label>Name</label>
                <!-- 名稱選擇menu -->
                <div class="database_price_container" >
                    <!-- 放價錢的地方 -->
                    <div class="database_price">
                        <ul>
                        
                        </ul>
                    </div>

                </div>
            </div>

            <!-- A-2-a3 需求量 -->
            <div class="group needness_group"> 
                <input type="text" required>
                <span class="highlight"></span>
                <span class="bar"></span>
                <label>需求量</label>
            </div>

            <!-- A-2-a4 單位 -->
            <div class="unit_container" >
                <select>
                    <optgroup label="質量">
                        <option>公克</option>
                        <option>公斤</option>
                        <option>台斤</option>
                    </optgroup>
                    <optgroup label="體積">
                        <option>毫升</option>
                        <option>公升</option>
                    </optgroup>
                </select>
            </div>

            <!-- A-2-a5 答案顯示 (按鈕gif + 所得價錢) -->
            <!-- 按鈕gif  -->
            <div class="caculate_button_container">
                <button  class="caculate_btn" ></button>
            </div>
            <!-- 所得價錢 -->
            <div class="show_result" ></div>

        </div>
        <!-- A-2-a 其中一條的計算框 用flex 讓 1類別 2名稱 3需求量 4單位 5答案  水平排列  -->
        `
    //當按下新增按鈕就appendChild
        function creat_new_input(){
            $("#creat_new_input_button_container").before(new_food_input)
        }







//選好類別後 讓menu有東西(show database) copy剛剛在新增頁面做的
//當類別的下拉選單 onchange時 把資料傳到後端 並且 拿這個類別的所有資料 並且改變展示出來的database
 
    // //製作fetchData() => 填充excel_col_data {colA:[] , colB:[] , colC:[] }

    //     ///卡了好久 原來可以設全域變數 這邊假設 到fetch函數放入data 到下一個<script>標籤 也還在!!
    //     var excel_col_data=[];     
    //     //函式定義
    //     function fetchData() {
    //         // 建立promise 讓他跑完後才會執行下一步 30~56
    //         return new Promise((resolve, reject) => {


    //             //取得所選的類別
    //             const input_class = document.getElementById('class_for_fetch').value;
                    
                
    //             //fetch("後端網址",{}) 把{的內容}變成一個變數////////
    //             var requestOptions = {                                  
    //             method: 'POST',
    //             headers: {
    //                             'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({ data: input_class })         
    //             };
    //             //fetch("後端網址",{}) 把{的內容}變成一個變數////////
                    
                        
    //             // 使用 Ajax 請求從後端獲取資料 fetch("網址",...).then().then()
    //             fetch('http://127.0.0.1:5000/return_excel_data',requestOptions)                                   
    //             .then(response => response.json())                     
    //             .then(res_json => {   

    //             // 更新頁面上的資料內容
    //             excel_col_data = res_json

    //         // 表示 fetchData() 把值甜到excel_col_data裡面了   resolve要放在fetch裡面 剛剛放外面一直失敗
    //         resolve(); 

    //             });//then(res_json => {        的 "})"

                
    //         });//Promise((resolve, reject) => {       的")}"

    //     }  // fetchData(){      的 "}"

    // //製作fetchData()韓式end


    // //製作改變"展示database"區域的函式
    //     function ReShow_database(){

    //         // 獲取要插入的 ul 元素且先清空
    //         const ulElement = document.querySelector("#show_database ul");
    //         ulElement.innerHTML=``;

    //         //遍歷excel_col_data {colA:[] , colB:[] , colC:[] } 中的colA:[] ，用"in" 可以遍歷index就好(0~n-1)
    //         //for (const item of data) 則是遍歷"值"
    //         for (const index in excel_col_data.colA){

    //             //取出database的值 
    //             const name= excel_col_data.colA[index];
    //             const price= excel_col_data.colB[index];
    //             const unit= excel_col_data.colC[index];

    //             //CREAT 新的元素 並定義元素內容
    //             const liElement = document.createElement("li");
    //             liElement.innerHTML = `<span>${name}</span> 每${unit}${price}元`;

    //             //插回去(在for迴圈裡面一個一個插)
    //             ulElement.appendChild(liElement);
 
    //         }
    //     }
    // //製作改變"展示database"區域的函式 end

    // //把兩個函式合而為一 onchange時呼叫這函式
    //     function fetch_and_show(){
    //         //fetchData()現在是promise了等它跑完在執行下一步
    //         fetchData().then(() => {

    //             ReShow_database();

    //           });
    //     }


//當類別的下拉選單 onchange時 把資料傳到後端 並且 拿這個類別的所有資料 並且改變展示出來的database end






// 點擊menu中的食材 食材放到name上 並且 focus 到 需求量 // 一樣要先鎖定在父元素監聽
    $('#inputs_container').on('click','.name_db', function() {

        //取得所點的內容
        name_got_clicked = $(this).text();

        //取得父父父父~~元素
        li = $(this).parent();
        ul = li.parent();
        database_price_container = ul.parent().parent();
        name_group = database_price_container.parent();
        needness_group = name_group.siblings(".group");
        needness_input = needness_group.children("input")

        //取得被點擊的database_price_container的兄弟元素
        input_name = database_price_container.siblings("input");

        // 把所點放到輸入框上
        input_name.val(name_got_clicked);

        //讓需求量輸入框 focus
        needness_input.focus()
    });
// 點擊menu中的食材 食材放到name上 並且 focus 到 需求量






// 名稱選擇menu被點擊時不會close (停留在focus 但是停留一下 又被我放到needness去focus了)~ 

    // 點擊 <div> 區域時阻止 blur 事件 // 一樣要先鎖定在父元素監聽
    $('#inputs_container').on("mousedown", ".database_price_container",function(event) {
        // 阻止 blur 事件的觸發 原本mousedown的Default 就是觸發blur~
        event.preventDefault();
        // 在這裡可以執行點擊 <div> 區域後的其他操作
    });







// //當focus到需求量輸入匡時，可以focus道單位 接著按enter就可以 用上下調控單位 // 一樣要先鎖定在父元素監聽
//     $('#inputs_container').on("keydown",".needness_group input",function(event){
//         //按上或下
//         if (event.keyCode === 38 || event.keyCode === 40) {
//             //找到附近的單位選單
//             near_unit = $(this).parent().siblings(".unit_container").children("select");
//             near_unit.focus()
//         }    
//     })








//換算需求量和價錢----------------------------------------------------------

       //單位換算 (5種單位 x 5種單位 25種搭配) 先用if 再用 switch case 

            //換算的函式
            function convert_needness_to_price(input_needness,input_unit,db_unit,db_price){

                //最後換算後 計算出來的價錢 等等return這個~
                var price_result=0.0 

                if(input_unit=="公克"){
                    switch(db_unit){
                        case "公克":
                        price_result = input_needness*db_price;    // 需求公克數 * 每公克多少錢
                        break;
        
                        case "公斤":
                        price_result = input_needness/1000*db_price;    // 需求公克數 /1000 * 每公斤多少錢
                        break;
        
                        case "台斤":
                        price_result = input_needness/600*db_price;    // 需求公克數 /600  * 每台斤多少錢
                        break;
        
                        case "毫升":
                        price_result = input_needness*db_price;    // 需求公克數  * 每毫升多少錢 (假設密度1)
                        break;
        
                        case"公升":
                        price_result = input_needness/1000*db_price;    // 需求公克數 /1000 * 每公升多少錢 (假設密度1)
                        break;
        
                        // default:
                        //   console.log(`Sorry, you wrong.`);
                    }
                }
                else if(input_unit=="公斤"){
                    switch(db_unit){
                        case "公克":
                        price_result = input_needness*1000*db_price;    // 需求公斤數 * 1000 * 每公克多少錢
                        break;
        
                        case "公斤":
                        price_result = input_needness*db_price;    // 需求公斤數 * 每公斤多少錢
                        break;
        
                        case "台斤":
                        price_result = input_needness*1000/600*db_price;    // 需求公斤數 * 1000  /600 * 每台斤多少錢
                        break;
        
                        case "毫升":
                        price_result = input_needness*1000*db_price;    // 需求公斤數 * 1000 * 每毫升多少錢 (假設密度1)
                        break;
        
                        case"公升":
                        price_result = input_needness*db_price;    // 需求公斤數 * 每公升多少錢 (假設密度1)
                        break;
        
                        // default:
                        //   console.log(`Sorry, you wrong.`);
                    }
                }
                else if(input_unit=="台斤"){
                    switch(db_unit){
                        case "公克":
                        price_result = input_needness*600*db_price;    // 需求台斤數 * 600 * 每公克多少錢
                        break;
        
                        case "公斤":
                        price_result = input_needness*600/1000*db_price;    // 需求台斤數 * 600 / 1000 * 每公斤多少錢
                        break;
        
                        case "台斤":
                        price_result = input_needness*db_price;    // 需求台斤數 * 每台斤多少錢
                        break;
        
                        case "毫升":
                        price_result = input_needness*600*db_price;    // 需求台斤數 * 600 * 每毫升(公克)多少錢 (假設密度1)
                        break;
        
                        case"公升":
                        price_result = input_needness*600/1000*db_price;    // 需求公克數 * 600 / 1000 * 每公升(公斤)多少錢 (假設密度1)
                        break;
        
                        // default:
                        //   console.log(`Sorry, you wrong.`);
                    }
                }
                else if(input_unit=="毫升"){
                    switch(db_unit){
                        case "公克":
                        price_result = input_needness*db_price;    // 需求毫升(公克)數 * 每公克多少錢
                        break;
        
                        case "公斤":
                        price_result = input_needness/1000*db_price;    // 需求毫升(公克)數 /1000 * 每公斤多少錢
                        break;
        
                        case "台斤":
                        price_result = input_needness/600*db_price;    // 需求毫升(公克)數 /600  * 每台斤多少錢
                        break;
        
                        case "毫升":
                        price_result = input_needness*db_price;    // 需求毫升數  * 每毫升多少錢 (假設密度1)
                        break;
        
                        case"公升":
                        price_result = input_needness/1000*db_price;    // 需求毫升數 /1000 * 每公升多少錢 (假設密度1)
                        break;
        
                        // default:
                        //   console.log(`Sorry, you wrong.`);
                    }          
                }
                else if(input_unit=="公升"){
                    switch(db_unit){
                        case "公克":
                        price_result = input_needness*1000*db_price;    // 需求公升(公斤)數 * 1000 * 每公克多少錢
                        break;
        
                        case "公斤":
                        price_result = input_needness*db_price;    // 需求公升(公斤)數 * 每公斤多少錢
                        break;
        
                        case "台斤":
                        price_result = input_needness*1000/600*db_price;    // 需求公升(公斤)數 * 1000  /600 * 每台斤多少錢
                        break;
        
                        case "毫升":
                        price_result = input_needness*1000*db_price;    // 需求公升數 * 1000 * 每毫升多少錢 
                        break;
        
                        case"公升":
                        price_result = input_needness*db_price;    // 需求公升數 * 每公升多少錢 
                        break;
        
                        // default:
                        //   console.log(`Sorry, you wrong.`);
                    }
                }

                //return
                return price_result

            }//換算的函式 end

       //單位換算 (5種單位 x 5種單位 25種搭配) 先用if 再用 switch case end

//換算需求量和價錢end--------------------------------------------------------








// caculate_and_show()

//把計算好的結果放的show_result中 // 吃$(this) = clicked_caculate_btn
    function caculate_and_show(clicked_caculate_btn){
    
        // 提出input值 //放裡面是為了用到$(this)
        const input_name=clicked_caculate_btn.parent().siblings(".name_group").children("input").val();
        const input_unit=clicked_caculate_btn.parent().siblings(".unit_container").children("select").val();
        const input_needness=clicked_caculate_btn.parent().siblings(".needness_group").children("input").val();
        // 提出input值

        //提出db的值
        let colA_length = excel_col_data["colA"].length;  //A列長度
        let colA = excel_col_data["colA"] ;                 //A列的值["","",""...]
        let col_index = 0 ;                                 //所求名字所在的index   
        for(i=0;i<=colA_length;i++){                       //翻找和input_name相同名稱的index
            if(colA[i]==input_name){
            col_index = i;
            break
            }
        }
        const db_price=excel_col_data["colB"][col_index];  //excel_col_data = {"colA":[],"colB":[],"colC":[]}
        const db_unit=excel_col_data["colC"][col_index];   //excel_col_data[colC] = ["","",""...]
        //提出db的值

        //呼叫換算函式 // 把換算出來的值存起來 //取到小數點第三位
        result_price = convert_needness_to_price(input_needness,input_unit,db_unit,db_price). toFixed(3); 

        //放到show_result中
        const show_result = clicked_caculate_btn.parent().siblings(".show_result")
        show_result.html("$"+result_price+"元")
        console.log(show_result.html())
    }
//把計算好的結果放的show_result中 // 吃$(this) = clicked_caculate_btn











//當計算紐按下的時候，我要先計算好結果 再放到show_result中 在改變class //在父層監聽
    $('#inputs_container').on('click',".caculate_btn",function(){
        
        //讓class = writting (就是準備回來的橡皮擦 ) 的時候 不用在執行一次計算
        if($(this).hasClass("caculate_btn") || $(this).hasClass("erasing")){
            //先計算好結果 再放到show_result中
            caculate_and_show($(this));
        }
        
        //等1s後再改變class //避免還沒算完(因為要去後端拿資料)就動
        setTimeout(CahngeClass_SpanSlice_DelayOneByOne($(this)),1000)

    })

//當計算紐按下的時候，我要先計算好結果 再放到show_result中 在改變class






//當在需求量輸入框被focus時 按下enter 可以直接啟動動畫 展示答案

    $('#inputs_container').on("keydown",".needness_group input",function(event){
        //按enter
        if (event.keyCode === 13 ) {

            //找到附近的單位選單
            near_btn = $(this).parent().siblings(".caculate_button_container").children("button");

            //讓class = writting (就是準備回來的橡皮擦 ) 的時候 不用在執行一次計算
            if(near_btn.hasClass("caculate_btn") || near_btn.hasClass("erasing")){
                //先計算好結果 再放到show_result中
                caculate_and_show(near_btn);
            }
                    
            //等1s後再改變class //避免還沒算完(因為要去後端拿資料)就動
            setTimeout(CahngeClass_SpanSlice_DelayOneByOne(near_btn),1000)
                
        }    
    })


//當單位的選單改變時(代表使用者選好了單位) 這時候吧focus回到 需求量的輸入框 這樣根據上面一個的功能 按enter就可以顯示答案

    $('#inputs_container').on("change",".unit_container select",function(){

        //找到附近的需求輸入框
        near_needness_input = $(this).parent().siblings(".needness_group").children("input")
        //focus它
        near_needness_input.focus()
    })












// ----------  上下左右在輸入框之間跳  --------------------------------------------------------------------------------------------------------------------------

//按上下可以讓使用者在不同的名稱輸入框來回跳(使用者可能想一列一列的 一次先填)
//按左可以跳到類別選單  按右可以跳到需求選單
    $('#inputs_container').on("keydown",".name_group input",function(event){
        
        //取得所有名稱輸入框
            const inputBoxes = $(".name_group input")
        //現在所在的輸入框index
            const currentIndex = inputBoxes.index(this);

        // 按下上箭头，焦点跳到上一个名稱输入框
            if (event.keyCode === 38) {
            // 阻止默认行为（避免滚动）
                event.preventDefault(); // 阻止默认行为（避免滚动）
            //進行循環切換，即在最後一個輸入框按下下鍵時，切換到第一個輸入框，
                const prevIndex = (currentIndex - 1 + inputBoxes.length) % inputBoxes.length;
            //eq() 是 jQuery 中用于获取匹配元素集合中特定索引位置的元素的方法
                inputBoxes.eq(prevIndex).focus();
                console.log(inputBoxes)
            }
        
        // 按下下箭头，焦点跳到下一个输入框
            if (event.keyCode === 40) {
            // 阻止默认行为（避免滚动）
                event.preventDefault(); // 阻止默认行为（避免滚动）
            //同理，在第一個輸入框按下上鍵時，切換到最後一個輸入框。
                const nextIndex = (currentIndex + 1) % inputBoxes.length;
            //inputBoxes.eq(prevIndex) 来获取在 prevIndex 索引位置的输入框元素。
                inputBoxes.eq(nextIndex).focus();
                }

        // 按下左箭头，焦点跳到上一个類別選單
            if (event.keyCode === 37) {
            // 阻止默认行为（避免滚动）
                event.preventDefault(); 
            //找到附近的類別選單
                near_class = $(this).parent().siblings(".class_container").children("select");
            //跳到類別選單上
                near_class.focus()
            }

        // 按下右箭头，焦点跳到下一個需求輸入框
            if (event.keyCode === 39) {
            // 阻止默认行为（避免滚动）
                event.preventDefault(); 
            //找到附近的類別選單
                near_needness_input = $(this).parent().siblings(".needness_group").children("input");
            //跳到類別選單上
                near_needness_input.focus()
            }
    }); 
//按上下可以讓使用者在不同的名稱輸入框來回跳(使用者可能想一列一列的 一次先填)
//按左可以跳到類別選單  按右可以跳到需求選單 end

//按上下可以讓使用者在不同的需求輸入框來回跳(使用者可能想一列一列的 一次先填)
//按左回到名稱輸入框 按右跳到單位選單
    $('#inputs_container').on("keydown",".needness_group input",function(event){
        
        //取得所有名稱輸入框
            const inputBoxes = $(".needness_group input")
        //現在所在的輸入框index
            const currentIndex = inputBoxes.index(this);

        // 按下上箭头，焦点跳到上一个需求输入框
            if (event.keyCode === 38) {
             // 阻止默认行为（避免滚动）
                event.preventDefault();
            //進行循環切換，即在最後一個輸入框按下下鍵時，切換到第一個輸入框，
                const prevIndex = (currentIndex - 1 + inputBoxes.length) % inputBoxes.length;
            //eq() 是 jQuery 中用于获取匹配元素集合中特定索引位置的元素的方法
                inputBoxes.eq(prevIndex).focus();
            }
        
        // 按下下箭头，焦点跳到下一个需求输入框
            if (event.keyCode === 40) {
            // 阻止默认行为（避免滚动）
                event.preventDefault(); 
            //同理，在第一個輸入框按下上鍵時，切換到最後一個輸入框。
                const nextIndex = (currentIndex + 1) % inputBoxes.length;
            //inputBoxes.eq(prevIndex) 来获取在 prevIndex 索引位置的输入框元素。
                inputBoxes.eq(nextIndex).focus();
            }
        
        // 按下左箭头，焦点跳到上一个名稱輸入框
            if (event.keyCode === 37) {
                // 阻止默认行为（避免滚动）
                    event.preventDefault(); 
                //找到附近的類別選單
                    near_name_input = $(this).parent().siblings(".name_group").children("input");
                //跳到類別選單上
                    near_name_input.focus()
                }
        
        // 按下右箭头，焦点跳到下一個單位選單
            if (event.keyCode === 39) {
                // 阻止默认行为（避免滚动）
                    event.preventDefault(); 
                //找到附近的類別選單
                    near_unit = $(this).parent().siblings(".unit_container").children("select");
                //跳到類別選單上
                    near_unit.focus()
                }
    }); 
//按上下可以讓使用者在不同的需求輸入框來回跳(使用者可能想一列一列的 一次先填)
//按左回到名稱輸入框 按右跳到單位選單

//按上下可以讓使用者在不同的類別選單來回跳 ( 要記得preventDefult 就是選單按上下會自動改變選擇 ) (使用者可能想一列一列的 一次先填)
//按左回到單位選單 按右跳到名稱輸入框
    $('#inputs_container').on("keydown",".class_container select",function(event){
            
        //取得所有類別選單
            const inputBoxes = $(".class_container select")
        //現在所在的輸入框index
            const currentIndex = inputBoxes.index(this);

        // 按下上箭头，焦点跳到上一个類別選單
            if (event.keyCode === 38) {
            // 阻止默认行为（避免滚动）
                event.preventDefault();
            //進行循環切換，即在最後一個輸入框按下下鍵時，切換到第一個輸入框，
                const prevIndex = (currentIndex - 1 + inputBoxes.length) % inputBoxes.length;
            //eq() 是 jQuery 中用于获取匹配元素集合中特定索引位置的元素的方法
                inputBoxes.eq(prevIndex).focus();
            }
        
        // 按下下箭头，焦点跳到下一个類別選單
            if (event.keyCode === 40) {
            // 阻止默认行为（避免滚动）
                event.preventDefault(); 
            //同理，在第一個輸入框按下上鍵時，切換到最後一個輸入框。
                const nextIndex = (currentIndex + 1) % inputBoxes.length;
            //inputBoxes.eq(prevIndex) 来获取在 prevIndex 索引位置的输入框元素。
                inputBoxes.eq(nextIndex).focus();
            }
        
        // 按下左箭头，焦点跳到回到單位選單
            if (event.keyCode === 37) {
                // 阻止默认行为（避免滚动）
                    event.preventDefault(); 
                //找到附近的類別選單
                    near_unit = $(this).parent().siblings(".unit_container").children("select");
                //跳到類別選單上
                    near_unit.focus()
                }
        
        // 按下右箭头，焦点跳到下一個單位選單
            if (event.keyCode === 39) {
                // 阻止默认行为（避免滚动）
                    event.preventDefault(); 
                //找到附近的類別選單
                    near_name_input = $(this).parent().siblings(".name_group").children("input");
                //跳到類別選單上
                    near_name_input.focus()
                }
    }); 
//按上下可以讓使用者在不同的類別輸入框來回跳(使用者可能想一列一列的 一次先填)
//按右回到名稱輸入框 按左跳到單位選單

//按上下可以讓使用者在不同的單位選單來回跳 ( 要記得preventDefult 就是選單按上下會自動改變選向 ) (使用者可能想一列一列的 一次先填)
//按左回到需求輸入框 按右跳回類別選單
$('#inputs_container').on("keydown",".unit_container select",function(event){
            
    //取得所有類別選單
        const inputBoxes = $(".unit_container select")
    //現在所在的輸入框index
        const currentIndex = inputBoxes.index(this);

    // 按下上箭头，焦点跳到上一个單位選單
        if (event.keyCode === 38) {
        // 阻止默认行为（避免滚动）
            event.preventDefault();
        //進行循環切換，即在最後一個輸入框按下下鍵時，切換到第一個輸入框，
            const prevIndex = (currentIndex - 1 + inputBoxes.length) % inputBoxes.length;
        //eq() 是 jQuery 中用于获取匹配元素集合中特定索引位置的元素的方法
            inputBoxes.eq(prevIndex).focus();
        }
    
    // 按下下箭头，焦点跳到下一个單位選單
        if (event.keyCode === 40) {
        // 阻止默认行为（避免滚动）
            event.preventDefault(); 
        //同理，在第一個輸入框按下上鍵時，切換到最後一個輸入框。
            const nextIndex = (currentIndex + 1) % inputBoxes.length;
        //inputBoxes.eq(prevIndex) 来获取在 prevIndex 索引位置的输入框元素。
            inputBoxes.eq(nextIndex).focus();
        }
    
    // 按下左箭头，焦点跳到回到需求輸入框
        if (event.keyCode === 37) {
            // 阻止默认行为（避免滚动）
                event.preventDefault(); 
            //找到附近的需求輸入框
                near_unit = $(this).parent().siblings(".needness_group").children("input");
            //跳到需求輸入框
                near_unit.focus()
            }
    
    // 按下右箭头，焦点跳到下一個類別選單
        if (event.keyCode === 39) {
            // 阻止默认行为（避免滚动）
                event.preventDefault(); 
            //找到附近的類別選單
                near_name_input = $(this).parent().siblings(".class_container").children("select");
            //跳到類別選單上
                near_name_input.focus()
            }
}); 
//按上下可以讓使用者在不同的需求輸入框來回跳(使用者可能想一列一列的 一次先填)
//按左回到名稱輸入框 按右跳到單位選單

// ----------  上下左右在輸入框之間跳  --------------------------------------------------------------------------------------------------------------------------






