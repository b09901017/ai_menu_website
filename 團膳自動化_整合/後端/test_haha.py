note_1 ="  盡然要放在後端資料夾外面!?   hahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahaha"

# 盡然要放在後端資料夾外面!?
    # from openpyxl import Workbook, load_workbook 

    # wb = load_workbook('haha.xlsx')     
    # ws = wb["乳品"]
    # print(ws) 





note_2 ="      看檔案所在資料夾有什麼     hahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahaha"

# 看檔案所在資料夾有什麼
    # import os

    # # 获取目前檔案所在資料夾的路径
    # current_directory = os.path.dirname(os.path.abspath(__file__))

    # # 获取目前檔案所在資料夾中的所有内容
    # contents = os.listdir(current_directory)

    # # 输出所有内容
    # print(contents)





note_3 ="         promise 讓地一個函式跑完才進下一個函是          hahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahaha"

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




note_4 ="            如果後端不需要回傳任何資料，你可以將第二個.then()移除             hahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahaha"

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





note_5 ="               讓server不用一直重開                hahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahaha"

## 讓server不用一直重開
    # if __name__ == '__main__':
    #     app.run(debug=True)




note_6 ="                          作假回應                      hahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahaha"

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





note_7 ="                                  在jquery中使用this                         hahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahaha"

## 在jquery中使用this
    # // 監聽 span 元素的點擊事件
    # $("#mySpan").on("click", function() {
    # // 取得 span 元素的值並印出
    # var spanValue = $(this).text();
    # console.log(spanValue);
    # });





note_8 ="                              發現動態生成的<span>沒辦法被監聽到                             hahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahaha"

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





note_9 ="                       jquery 取得子元素 父元素 兄弟元素 $(.class) $(#id) $(tag #id .class) 跟css的選擇器一樣                        hahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahaha"

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





note_10 ="                        preventDefault !! 點擊某些區域 不會觸發blur~                           hahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahaha"

#  preventDefault !! 點擊某些區域 不會觸發blur~

    # // 名稱選擇menu被點擊時不會close (停留在focus 但是停留一下 又被我放到needness去focus了)~ 
    #     // 點擊 <div> 區域時阻止 blur 事件
    #     $(".database_price_container").on("mousedown", function(event) {
    #         // 阻止 blur 事件的觸發 原本mousedown的Default 就是觸發blur~
    #         event.preventDefault();
    #         // 在這裡可以執行點擊 <div> 區域後的其他操作
    #     });





note_11 ="                   js 控制css                                 hahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahaha"

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





note_13 ="                                    #jquery 動態插入的方法                           hahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahaha"

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

    # 藥用反引號``才能插入變數 
        # $('#total_price').append(`總共是<p>${total_price}元</p>`)





note_14 ="                            點擊menu中的食材 食材放到name上 並且 focus 到 需求量 // 一樣要先鎖定在父元素監聽                      hahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahaha"

# 點擊menu中的食材 食材放到name上 並且 focus 到 需求量 // 一樣要先鎖定在父元素監聽
#     $('.database_price').on('click','.name_db', function() {}






note_15 ="                              jquery 改寫                            hahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahaha"

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





note_16 ="             如果是動態生成的  要放在父元素監聽 (因為監聽是一開始就放上去的 )                          hahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahaha"

# 如果是動態生成的  要放在父元素監聽 (因為監聽是一開始就放上去的 )

    # 原理

        #         <div id="container">
        # 原本是      <div class="divs"> 
        #         </div>

        #         <button> 按了在container內生成<div class="divs">

        #         js寫  $('.divs').on('click',function(){... 只會在第一個上面放監聽})

        #         按了按鈕後 新增的.divs 部會被監聽到

        # 所以要放在父元素監聽 這樣寫

        #         $('#container').on('click','.divs',function(){...})這樣就是監聽整個container
        #         所以按了按鈕後(container 中的div增加了) 雖然不會新監聽甚麼
                
        #         但是監聽到的container 被點擊後會去找#container 底下的class = divs的東西 

        #         而這時候的$(this) 就是底下的class = divs的東西 

    #快速更正的方法 ( 觀念就是   $(1)on('2','3',func(){...} )     ) 

        # 1放父層不會動的 2放事件 3 放你原本要監聽的東東

        #  例如
            #  $(".caculate_btn").on('click',function(){}) =>               $('#inputs_container').on('click',".caculate_btn",function(){
            #  $(".needness_group input").on('click',function(){}) =>       $('#inputs_container').on('click',".needness_group input",function(){
            #  $(".database_price_container").on('click',function(){}) =>   $('#inputs_container').on('click',".database_price_container",function(){
            #  $("haha").on('click',function(){}) =>                        $('#inputs_container').on('click',"haha",function(){
            #  $("原本要監聽的").on('click',function(){}) =>                 $('反正不用思考 直接放最上層的東東').on('click',"原本要監聽的",function(){





note_17 ="                        有辦法用jquery 取得頁面上所有input 然後依序編後嗎?                                hahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahaha"

#有辦法用jquery 取得頁面上所有input 然後依序編後嗎?
    # $(document).ready(function() {
    #   // 获取页面上所有的 input 元素
    #   const inputElements = $("input[type='text']");
    
    #   // 为每个 input 元素设置编号
    #   inputElements.each(function(index) {
    #     $(this).attr("id", "input" + (index + 1));
    #   });
    # });





note_18 ="                     实现按上下键在多个输入框之间跳动：                           hahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahaha"

# 实现按上下键在多个输入框之间跳动：
        # <!-- HTML -->
        # <input class="input-box" type="text" />
        # <input class="input-box" type="text" />
        # <input class="input-box" type="text" />
        # <input class="input-box" type="text" />

        # <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
        # <script>
        #   $(document).ready(function() {
        #     const inputBoxes = $('.input-box');
            
        #     // 给所有输入框添加事件监听
        #     inputBoxes.on('keydown', function(event) {
        #       const currentIndex = inputBoxes.index(this);
            
        #       // 按下上箭头，焦点跳到上一个输入框
        #       if (event.keyCode === 38) {
        #         event.preventDefault(); // 阻止默认行为（避免滚动）
        #         const prevIndex = (currentIndex - 1 + inputBoxes.length) % inputBoxes.length;
        #         inputBoxes.eq(prevIndex).focus();
        #       }
            
        #       // 按下下箭头，焦点跳到下一个输入框
        #       if (event.keyCode === 40) {
        #         event.preventDefault(); // 阻止默认行为（避免滚动）
        #         const nextIndex = (currentIndex + 1) % inputBoxes.length;
        #         inputBoxes.eq(nextIndex).focus();
        #       }
        #     });
        #   });
        # </script>

        #  eq() 是 jQuery 中用于获取匹配元素集合中特定索引位置的元素的方法。在上面的示例中，我们使用 inputBoxes.eq(prevIndex) 来获取在 prevIndex 索引位置的输入框元素。

        # 具体来说，inputBoxes 是一个包含所有输入框的 jQuery 对象，它是一个类似数组的集合，其中每个元素都是一个输入框元素。eq() 方法用于从这个集合中选择特定索引位置的元素，并将其作为一个新的 jQuery 对象返回。在这里，我们使用 prevIndex 变量作为参数传递给 eq() 方法，从而获取前一个输入框的 jQuery 对象。

        # 通过使用 eq() 方法，我们可以很方便地在多个输入框中进行索引的切换，并且对焦点的切换非常方便。
    





note_18 ="                       (currentIndex - 1 + inputBoxes.length) % inputBoxes.length                      hahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahaha"

# 為什麼要這樣 (currentIndex - 1 + inputBoxes.length) % inputBoxes.length

        #     這樣的寫法是為了實現在輸入框之間循環切換的效果。讓我解釋一下：

        # 在按下上下鍵切換輸入框時，我們希望能夠在所有輸入框之間進行循環切換，即在最後一個輸入框按下下鍵時，切換到第一個輸入框，同理，在第一個輸入框按下上鍵時，切換到最後一個輸入框。

        # currentIndex 是當前輸入框的索引，inputBoxes.length 是輸入框的總數量。 (currentIndex - 1 + inputBoxes.length) % inputBoxes.length 的計算可以保證在索引計算中，即使索引為負數或超出範圍，也能保持在輸入框數量的範圍內，以實現循環切換的效果。

        # 舉例來說：

        # 假設現在有5個輸入框，索引從0到4，當前的 currentIndex 是3，代表目前在第4個輸入框上。如果按下下鍵，我們希望切換到下一個輸入框，也就是第5個輸入框，但實際上索引會是4。此時 (currentIndex - 1 + inputBoxes.length) % inputBoxes.length 的計算是 (3 - 1 + 5) % 5，結果是4，所以切換到了第5個輸入框。

        # 如果此時在第一個輸入框按下上鍵，我們希望切換到前一個輸入框，也就是第5個輸入框，但實際上索引會是-1。此時 (currentIndex - 1 + inputBoxes.length) % inputBoxes.length 的計算是 (0 - 1 + 5) % 5，結果是4，所以同樣切換到了第5個輸入框。

        # 這樣，不管當前在第幾個輸入框上，按下上下鍵都能實現在所有輸入框之間循環切換的效果。





note_19 ="                    後端 post 的簡單模板                                                   hahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahaha"

# 後端 post 的簡單模板    ####################################   post   ##################################################

        # server 主程式 引入
                # @app.route('/generate_EXs', methods=['POST'])
                # def help_you_up_EXs():
                #     data_json = generate_EXs()
                #     return data_json ##回傳json格式

        # # 打包函式
                # from flask import  request
                # from flask import jsonify ##回傳json格式用的

                # def generate_EXs():

                    # ##-----------把前端傳的東東存在變數裡--------------
                    # food_class_JSON = request.get_json()  ##得到{"data" : "類別"}
                    # food_class = food_class_JSON['data']  ##取出"data"的值 {key : value}
                    # ##-----------把前端傳的東東存在變數裡--------------

                    # ##------------回傳資料-------------
                    # response_data = {
                    #     'result': 'success',
                    #     'colA': "...",
                    #     'colB': "...",
                    #     'colC': "..."
                    # }
                    # ##------------回傳資料-------------

                    # return jsonify(response_data) ##回傳json格式

        # 前端js 模板
                    #  //  ***** 製作fetchData() => 填充excel_col_data {colA:[] , colB:[] , colC:[] } *****

                    #  //卡了好久 原來可以設全域變數 這邊假設 到fetch函數放入data 到下一個<script>標籤 也還在!!
                    #   var excel_col_data=[];     
                    #     //函式定義
                    #     function fetchData(this_select) {
                    #         // 建立promise 讓他跑完後才會執行下一步 30~56
                    #         return new Promise((resolve, reject) => {

                            #     //取得所選的類別
                            #     const input_class =this_select.val();
                                    
                            #     //fetch("後端網址",{}) 把{的內容}變成一個變數////////
                            #     var requestOptions = {                                  
                            #     method: 'POST',
                            #     headers: {
                            #         'Content-Type': 'application/json'
                            #     },
                            #     body: JSON.stringify({ data: input_class })         
                            #     };
                            #     //fetch("後端網址",{}) 把{的內容}變成一個變數////////
                                        
                            #     // 使用 Ajax 請求從後端獲取資料 fetch("網址",...).then().then()
                            #     fetch('http://127.0.0.1:5000/return_excel_data',requestOptions)                                   
                            #     .then(response => response.json())                     
                            #     .then(res_json => {   

                            #     // 更新頁面上的資料內容
                            #     excel_col_data = res_json
                                
                            # // 表示 fetchData() 把值甜到excel_col_data裡面了   resolve要放在fetch裡面 剛剛放外面一直失敗
                            # resolve(); 

                            #     });//then(res_json => {        的 "})"

                                
                            # });//Promise((resolve, reject) => {       的")}"

                    #     }  // fetchData(){      的 "}"

                    # //製作fetchData()韓式end

# 後端 post 的簡單模板    ####################################   post   ##################################################






note_20 ="                            監聽hover 的方法                               hahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahaha"

############ 監聽hover 的方法##################


        # //當璇停在EX眾多選項中的其中一個 那一整列都會放大
        #       // 下面這樣不能監聽到 動態生成的
        #       // $('.many_ex span').hover(
        #       //   //移入
        #       //       function(){
        #       //       //取得所hover的class
        #       //         var class_name = $(this).attr('class');
        #       //       //讓屬於這類class的都放大
        #       //         $("."+class_name).css({
        #       //           transform : 'scale(2.5)'
        #       //         })
        #       //         console.log(class_name)
        #       //       },
        #       //   //移出
        #       //       function(){
        #       //         //取得所hover的class
        #       //           var class_name = $(this).attr('class');
        #       //         //復原
        #       //           $('.'+class_name).css({
        #       //             transform : 'scale(1)'
        #       //           })
        #       //       }
        #       // )
        #       // 使用事件委派監聽動態生成的子元素的 鼠標進入
        #       $('.many_ex').on('mouseenter', 'span', function() {
        #           //取得所hover的class
        #                 var class_name = $(this).attr('class');
        #               //讓屬於這類class的都放大
        #                 $("."+class_name).css({
        #                   transform : 'scale(2.5)'
        #                 })
        #                 console.log(class_name)
        #       });
        #       $('.many_ex').on('mouseleave', 'span', function() {
        #           //取得所hover的class
        #                 var class_name = $(this).attr('class');
        #               //讓屬於這類class的都放大
        #                 $("."+class_name).css({
        #                   transform : 'scale(1)'
        #                 })
        #       });
############ 監聽hover 的方法##################







note_21 ="                                  jquery 遍歷的方法                               hahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahaha"

############# jquery 遍歷的方法#################
        # 您可以使用jQuery的.each()方法來依序遍歷數組中的元素。這樣您就可以逐一取出1~7。以下是示例代碼：

        # html
        # Copy code
        # <!DOCTYPE html>
        # <html>
        # <head>
        #   <title>依序取出數組元素</title>
        #   <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
        # </head>
        # <body>

        # <ul id="result"></ul>

        # <script>
        #   $(document).ready(function() {
        #     const arr = [1, 2, 3, 4, 5, 6, 7];

        #     $.each(arr, function(index, value) {
        #       // 將每個元素添加到<ul>中
        #       $('#result').append('<li>' + value + '</li>');
        #     });
        #   });
        # </script>

        # </body>
        # </html>
        # 這段代碼會在網頁上顯示1~7的數字。您可以在arr中放入任何數組，然後使用.each()方法遍歷並將元素顯示在頁面上。
############# jquery 遍歷的方法#################







note_22 ="                         篩選and顯示的函式                          hahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahaha"

# //######################################################篩選and顯示的函式 7/29成功!! ######################################################
#   function filter_and_display() {
#     //取得所有input值
#     var full_milk_input = parseInt($('#full_milk').val());
#     var low_milk_input = parseInt($('#low_milk').val());
#     var feg_input = parseInt($('#feg').val());
#     var fruit_input = parseInt($('#fruit').val());
#     var grains_input = parseInt($('#grains').val());
#     var egg_h_input = parseInt($('#egg_h').val());
#     var egg_m_input = parseInt($('#egg_m').val());
#     var egg_l_input = parseInt($('#egg_l').val());
#     var nuts_input = parseInt($('#nuts').val());
#     var susugar_input = parseInt($('#susugar').val());

#     //#################################################好屌的篩選方法#####################################################################################################################################
#           // (a) ? (b) : (c)     (a)true則(c) (a)false則(b)  (b)也可以放判斷式  => 如果a是數字(false) 就在看是否b值等於輸入值可能 true or false 如果a是 NAN = not a number 則返回 (c)。 
#           var filteredData = EXs.filter(function(obj) {
#             return (!isNaN(full_milk_input)   ? obj['full_milk']   === full_milk_input : true) &&
#                   (!isNaN(low_milk_input)     ? obj['low_milk']    === low_milk_input : true)&&
#                   (!isNaN(feg_input)          ? obj['feg']         === feg_input : true)&&
#                   (!isNaN(fruit_input)        ? obj['fruit']       === fruit_input : true)&&
#                   (!isNaN(grains_input)       ? obj['grains']      === grains_input : true)&&
#                   (!isNaN(egg_h_input)        ? obj['egg_h']       === egg_h_input : true)&&
#                   (!isNaN(egg_m_input)        ? obj['egg_m']       === egg_m_input : true)&&
#                   (!isNaN(egg_l_input)        ? obj['egg_l']       === egg_l_input : true)&&
#                   (!isNaN(nuts_input)         ? obj['nuts']        === nuts_input : true)&&
#                   (!isNaN(susugar_input)      ? obj['susugar']     === susugar_input : true);
#           });
#           //EXs.filter(放條件  true可能是 NAN 或 是數字且符合(b))
#   //#################################################好屌的篩選方法#####################################################################################################################################
          
#           setTimeout( put_to_EXs_table(filteredData) , 1500)
#   }
# //######################################################篩選and顯示的函式######################################################


note_23 ="                        地一次遇到冒泡事件 8/4 (監聽裡面放監聽)                          hahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahahaha"

# //######################################################每focus一次 就會幫span多加一個監聽器######################################################
            # $('table').on('focus', '.ingredient_input', function () {
            #   //背景變暗
            #   $('#botton_container,#top_container').css("opacity", .2)
            #   //顯現
            #   $('#ingredients_container').css('display', 'grid');
            #   //放入輸入框
            #   var ingredient_input = $(this)
            
            #   $('#ingredients_container').on('click', 'span', function () {
            #     var ingredient = $(this).text();
            #     ingredient_input.val(ingredient);
            #   })
            # })
            # 哪裡可能有錯 
            # ChatGPT
            # 您的代碼裡有一個可能的邏輯錯誤，每次觸發focus事件時都會給#ingredients_container元素添加一個新的點擊事件處理器。如果用戶多次觸發focus事件，就會添加多個點擊事件處理器，這可能會導致不期望的行為。
            # 當然，讓我為您詳細解釋一下。

            # 首先，我們來看一下原始的代碼：

            # 每次聚焦到 .ingredient_input 元素時，都會觸發 focus 事件處理器。
            # 在 focus 事件處理器中，您向 #ingredients_container 元素添加了一個 click 事件處理器。
            # 現在，假設用戶聚焦到一個 .ingredient_input 元素，然後失焦，再聚焦到另一個 .ingredient_input 元素。在這個過程中，focus 事件處理器將被觸發兩次，因此 #ingredients_container 元素將具有兩個相同的 click 事件處理器。

            # 現在，如果用戶點擊一個 span 元素，兩個 click 事件處理器都會被觸發，所以相同的值將被插入到輸入框兩次。

            # 我所提出的解決方案是在 focus 事件處理器外部添加 click 事件處理器，並使用一個變數（ingredient_input）來跟踪當前的 .ingredient_input 元素。這樣，不管 focus 事件處理器被觸發多少次，都只有一個 click 事件處理器。

            # 具體步驟如下：

            # 定義一個變數 ingredient_input 來保存當前聚焦的 .ingredient_input 元素的引用。
            # 在 .ingredient_input 元素上的 focus 事件處理器中，更新 ingredient_input 變數的值。
            # 在 #ingredients_container 元素上的 click 事件處理器中，使用 ingredient_input 變數的值將文本插入到正確的輸入框中。
            # 這樣，不論用戶聚焦到多少個不同的 .ingredient_input 元素，#ingredients_container 元素都只有一個 click 事件處理器，而且這個處理器知道應該向哪個輸入框插入文本。

            # 這個解決方案能夠避免多個 click 事件處理器的問題，並確保代碼的行為符合您的預期。希望這個解釋有助於您理解這個問題和解決方案！如果您還有任何疑問，請隨時提問。

            # //######################################################每focus一次 就會幫span多加一個監聽器######################################################