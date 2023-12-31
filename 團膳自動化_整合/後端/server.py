from flask import Flask, request, render_template ## 建立後端伺服器所需要的模組
from flask import jsonify ##回傳json格式用的
from flask import redirect, url_for
from flask import make_response ##作假回應用的
from flask_cors import CORS ##甚麼神魔協定的

from add_to_excel import add_to_excel ##新增到資料庫的函示
from get_excel_data import get_excel_data ##從資料庫拿資料的函式
from export_excel import export_excel ##匯出excel的函式
from generate_EXs import generate_EXs ##生產好多好多份數選擇 2023/7/27
from get_ingrident_name_data import get_ingrident_name_data ##回傳老師的食材庫的所有材料名稱(幾千筆) 2023/8/4
from caculate_all_nutrition import caculate_all_nutrition ##把前端的資料傳到後端然後放入老師的excel去做計算 2023/8/17
from export_all_data_excel import export_all_data_excel ##把前端的資料傳到後端然後放入老師的excel去做計算 2023/8/17


app = Flask(__name__)
CORS(app) ## 就是差這個 bug很久

##--------回傳主頁~~-------------
@app.route('/')
def homepage():
    return render_template("home_page.html")
##--------回傳主頁~~-------------

##--------回傳新增食材到資料庫的頁面-------------
@app.route('/return_add_new_page')
def add_new_page():
    # return render_template('creat_new_food.html')## 用render_template !! 一定要 !! 把xxx.html 放在templates的資料夾中 !!!! debug超久!!!!!
    return redirect(url_for('../../前端/新增食材資料庫/creat_new_food.html'))
##--------回傳新增食材到資料庫的頁面-------------

##--------回傳計算總價的頁面-------------
@app.route('/return_caculate_page')
def caculate_total_page():
    return render_template("caculate_page.html")##render_template 可以執行html (裡面放"檔案路徑 在同一個資料夾就打名稱就好") 不釋放同一個資料夾辣!!! 
##--------回傳計算總價的頁面-------------

##---------(add new 的表單)按下送出後會來到這裡-----------------
@app.route('/add_to_excel',methods=['POST'])
def submit():

    add_to_excel() ##函式

    # 建立一個空的回應物件
    response = make_response('')
    
    # 設定回應的狀態碼為 200 (OK)
    response.status_code = 200

    return response
##---------(add new 的表單)按下送出後會來到這裡-----------------

##---------接收前端傳來的類別，回傳此類別的所有名稱------------------------------------------
@app.route('/return_excel_data', methods=['POST'])
def return_excel_data():
    data_json = get_excel_data()
    return data_json ##回傳json格式
##---------接收前端傳來的類別，回傳此類別的所有名稱------------------------------------------

##---------當前端按下 輸出excel 不用回傳 ( 用假回應 )------------------------------------------
@app.route('/export_excel', methods=['POST'])
def export_excel_db():

    export_excel() ##函式 !!!!!!!!!!!幹!!! 不能和def export_excel_db(): 取一樣的鳴子啦!!!!! 卡爆久 2023 / 7 / 20 等等要去泛科學拿免費的書

    # 建立一個空的回應物件
    response = make_response('')
    
    # 設定回應的狀態碼為 200 (OK)
    response.status_code = 200

    return response
##---------當前端按下 輸出excel 不用回傳 ( 用假回應 )------------------------------------------

##---------幫前端計算份數 (js真的跑太慢了) 讓py幫你吧~ 2023/7/27------------------------------------------
@app.route('/generate_EXs', methods=['POST'])
def help_you_up_EXs():
    data_json = generate_EXs()
    return data_json ##回傳json格式
##---------幫前端計算份數 (js真的跑太慢了) 讓py幫你吧~------------------------------------------

##---------接收前端傳來的食材成分表類別，回傳此類別的所有名稱------------------------------------------
@app.route('/return_ingrident_name_data', methods=['POST'])
def return_ingrident_name_data():
    data_json = get_ingrident_name_data()
    return data_json ##回傳json格式
##---------接收前端傳來的食材成分表類別，回傳此類別的所有名稱------------------------------------------

# 為了處理 NameError: name 'all_nutrition_datas' is not defined (還沒按下計算營養紐)
all_nutrition_datas = None

##---------當前端按下 計算營養成分紐 不用回傳 ( 用假回應 )------------------------------------------
@app.route('/caculate_nutrition', methods=['POST'])
def caculate_nutrition_db():


    # -------- 儲存營養成分的名稱和值 --------------------------------------------------------------
    global all_nutrition_datas  # 使用此行來聲明你要修改的是全局變數
    all_nutrition_datas = caculate_all_nutrition() 
    # -------- {早餐 : [all_nutrition_names , all_nutrition_datas], 午餐 : [ [] , [] ]} ----------
    

    # 建立一個空的回應物件
    response = make_response('')
    
    # 設定回應的狀態碼為 200 (OK)
    response.status_code = 200

    return response
##---------當前端按下 計算營養成分紐 不用回傳 ( 用假回應 )------------------------------------------


##---------當前端按下 輸出excel 不用回傳 ( 用假回應 )------------------------------------------
@app.route('/export_all_data_excel', methods=['POST'])
def export_all_data_excel_db():

    global all_nutrition_datas
    export_all_data_excel(all_nutrition_datas) ##函式 !!!!!!!!!!!幹!!! 不能和def export_excel_db(): 取一樣的鳴子啦!!!!! 卡爆久 2023 / 7 / 20 等等要去泛科學拿免費的書

    # 建立一個空的回應物件
    response = make_response('')
    
    # 設定回應的狀態碼為 200 (OK)
    response.status_code = 200

    return response
##---------當前端按下 輸出excel 不用回傳 ( 用假回應 )------------------------------------------


if __name__ == '__main__':
    app.run(debug=True)
    