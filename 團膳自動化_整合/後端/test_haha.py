
# 盡然要放在後端資料夾外面!?
    # from openpyxl import Workbook, load_workbook 

    # wb = load_workbook('haha.xlsx')     
    # ws = wb["乳品"]
    # print(ws) 

# 看檔案所在資料夾有什麼
    # import os

    # # 获取目前檔案所在資料夾的路径
    # current_directory = os.path.dirname(os.path.abspath(__file__))

    # # 获取目前檔案所在資料夾中的所有内容
    # contents = os.listdir(current_directory)

    # # 输出所有内容
    # print(contents)

# promise 讓地一個函式跑完才進下一個函是
    # new Promise((resolve, reject) => { ... ... ... resolve()() ...     })


    # function fetchData() {
    ### return new Promise((resolve, reject) => {
    #     // ... 省略部分程式碼 ...

    #     // 使用 Ajax 請求從後端獲取資料
    #     fetch('http://127.0.0.1:5000/return_excel_data', requestOptions)                                   
    #       .then(response => response.json())                     
    #       .then(res_json => {   
    #         // 更新頁面上的資料內容
    #         excel_col_data = res_json;
    ####      resolve(); // 在資料更新後 resolve()，不需要傳入參數
    #       })
    #       .catch(error => {
    #         // 錯誤處理
    #         reject(error);
    #       });
    #   });
    # } 

    #然後可以用 fetchData().then(  ()=>{function2}  ) 讓function2 等fetchData()跑完
        # function fetch_and_show(){
        #     //fetchData()現在是promise了等它跑完在執行下一步
        #     fetchData().then(() => {
        #         ReShow_database();
        #         console.log(excel_col_data) 
        #       });
        # }


# 如果後端不需要回傳任何資料，你可以將第二個.then()移除，只保留第一個.then()處理成功的情況，以及使用.catch()處理錯誤的情況，例如：

    # fetch('http://127.0.0.1:5000/add_to_excel', {
    #     method: 'POST',
    #     headers: {
    #         'Content-Type': 'application/json'
    #     },
    #     body: JSON.stringify({
    #         name: name,
    #         price: price,
    #         unit: unit,
    #         food_class: food_class
    #     })
    # })
    # .then(response => {
    #     if (response.ok) {
    #         console.log('Data added successfully!');
    #     } else {
    #         console.log('Something went wrong:', response.status);
    #     }
    # })
    # .catch(error => {
    #     console.error('Error:', error);
    # });



## 讓server不用一直重開
    # if __name__ == '__main__':
    #     app.run(debug=True)


## 作假回應
    # from flask import Flask, make_response

    # app = Flask(__name__)

    # @app.route('/example')
    # def example():
    #     # 建立一個空的回應物件
    #     response = make_response('')
        
    #     # 設定回應的狀態碼為 200 (OK)
    #     response.status_code = 200
        
    #     # 回傳回應物件
    #     return response

    # if __name__ == '__main__':
    #     app.run(debug=True)


## 在jquery中使用this
    # // 監聽 span 元素的點擊事件
    # $("#mySpan").on("click", function() {
    # // 取得 span 元素的值並印出
    # var spanValue = $(this).text();
    # console.log(spanValue);
    # });

## 發現動態生成的<span>沒辦法被監聽到
    #不成功的 
        # $('ul span').on('click', function() {
        #     name_got_clicked = $(this).text();
        #     // 改輸入明子
        #     $("#name").val(name_got_clicked);
        #     console.log("jsjsjsj")
        # });
    #把監聽事件綁到父元素上 就可以了
        # $('#show_database').on('click',"span", function() {
        #     .
        #     .
        #     .
        #     . 
        # });

## jquery 取得子元素 父元素 兄弟元素 $(.class) $(#id) $(tag #id .class) 跟css的選擇器一樣
    ## $(this) 直接選~
    ## $(this).parent().siblings().children() 可以選對位置 !!! 超好用

        # $('.name_db').on('click', function() { 

        #     //取得所點的內容
        #     name_got_clicked = $(this).text();    $()

        #     //取得父父父父~~元素
        #     li = $(this).parent();
        #     ul = li.parent();
        #     database_price_container = ul.parent().parent();
        #     name_group = database_price_container.parent();
        #     needness_group = name_group.siblings(".group");
        #     needness_input = needness_group.children("input")

        #     //取得被點擊的database_price_container的兄弟元素
        #     input_name = database_price_container.siblings("input");

        #     // 把所點放到輸入框上
        #     input_name.val(name_got_clicked);

        #     //讓需求量輸入框 focus
        #     needness_input.focus()
        # });

    # $(this).parent()有多個 可以用 $(this).parent(".p1") 或 $(this).parent(".p2")
    # 像是 以下 $(.child) 就有兩個parent~~ 同理$(this).children(".c1") $(this).sibilings(".s4")
        #     <div class="container1">
        #   <div class="child">
        #     <!-- Your content here -->
        #   </div>
        # </div>

        # <div class="container2">
        #   <div class="child">
        #     <!-- Your content here -->
        #   </div>
        # </div>


#  preventDefault !! 點擊某些區域 不會觸發blur~

    # // 名稱選擇menu被點擊時不會close (停留在focus 但是停留一下 又被我放到needness去focus了)~ 
    #     // 點擊 <div> 區域時阻止 blur 事件
    #     $(".database_price_container").on("mousedown", function(event) {
    #         // 阻止 blur 事件的觸發 原本mousedown的Default 就是觸發blur~
    #         event.preventDefault();
    #         // 在這裡可以執行點擊 <div> 區域後的其他操作
    #     });

#js 控制css 
    #css
        # .show_result span {
        #     opacity: var(--opacity) ;
        #     display: inline-block;
        #     animation-name: var(--ani_name);
        #     animation-duration: .9s;
        #     animation-timing-function: ease-in-out;
        #     animation-delay: var(--delay);
        #     animation-fill-mode: forwards;
        # }
    #js
        # document.querySelectorAll('#show_result'+clicked_btn_id +" span").forEach((span, index) => {
        # //設定delay = n*0.3 s
        # span.style.setProperty('--delay', `${index * .1}s`);
        # //改使用的動畫  
        # span.style.setProperty('--ani_name', `show_onebyone`);
        # //改從0開始~1
        # span.style.setProperty('--opacity', `0`);
        # })


#jquery 動態插入的方法
    # // append：在指定元素內部最後面插入新的內容
    #     $("#container").append('<p>新的段落 (append)</p>');

    #     // prepend：在指定元素內部最前面插入新的內容
    #     $("#container").prepend('<p>新的段落 (prepend)</p>');

    #     // after：在指定元素的後面插入新的內容（作為同一層級的兄弟元素）
    #     $("#container p:last").after('<p>新的段落 (after)</p>');

    #     // before：在指定元素的前面插入新的內容（作為同一層級的兄弟元素）
    #     $("#container p:first").before('<p>新的段落 (before)</p>');

    #     // appendTo：將新的段落插入到指定元素內部的最後面
    #     $('<p>新的段落 (appendTo)</p>').appendTo("#container");

    #     // prependTo：將新的段落插入到指定元素內部的最前面
    #     $('<p>新的段落 (prependTo)</p>').prependTo("#container");

    #     // 獲取要插入的 ul 元素且先清空
    #     $(ul).html(""); 取代  liElement.innerHTML = ``



# 點擊menu中的食材 食材放到name上 並且 focus 到 需求量 // 一樣要先鎖定在父元素監聽
#     $('.database_price').on('click','.name_db', function() {}


#jquery 改寫

    #一個一個用span分開
        # js : result.innerHTML = result.textContent.replace(/\S/g, "<span>$&</span>")
        # jquery  :  result.html(function(i, text) {
        #            return text.replace(/\S/g, "<span>$&</span>");
        #             });

    #把每個span編號 並一序設置delay
        # js  :  document.querySelectorAll('#show_result'+clicked_btn_id +" span").forEach((span, index) => {
        #         //設定delay = n*0.3 s
        #         span.style.setProperty('--delay', `${index * .1}s`);
        #         //改使用的動畫  
        #         span.style.setProperty('--ani_name', `show_onebyone`);
        #         //改從0開始~1
        #         span.style.setProperty('--opacity', `0`);
        #         }) 

        # jquery  :       function writing(clicked_caculate_btn){
        
                    #     //clicked_caculate_btn 傳入 $(this) 是被點擊的btn
                    #     const show_result = clicked_caculate_btn.parent().siblings(".show_result")

                    #     // 将文本内容"文字"拆分为每个字(用""隔開)
                    #     const letters = show_result.text().split('');

                    #     // 用<span>包裹每个字，并重新设置HTML内容 //字串把每個字元都包上<span> 放到新的newHtml中
                    #     let newHtml = '';
                    #     letters.forEach(character => {
                    #     newHtml += `<span>${character}</span>`;
                    #     });
                        
                    #     //把包好的放入原本的裡面
                    #     show_result.html(newHtml);

                    #     //對於<div class="show_result"> 底下的所有span 都給予編號 並依據編號設置delay 和其他的東西~
                    #     show_result.children("span").each(function(index) {
                    #         // 設定delay = n*0.3 s // 改使用的動畫 //透明度改從0開始~1
                    #         $(this).css(
                    #             {
                    #                 'animationDelay': `${index * .1}s`,
                    #                 'animationName' : 'show_onebyone',
                    #                 'opacity' : '0'
                    #             }
                    #         );//css的
                    #     });//span.each的

                    # }//writing function的

    # 檢查有沒有這個class
        # js  :  if(this.classList=='writing' )

        # jquery  :   if ($(this).hasClass('writing'))