
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
