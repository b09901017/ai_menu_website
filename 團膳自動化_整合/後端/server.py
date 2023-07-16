from flask import Flask, request, render_template ## 建立後端伺服器所需要的模組
from flask import jsonify ##回傳json格式用的
from flask import redirect, url_for
from flask import make_response ##作假回應用的
from flask_cors import CORS ##甚麼神魔協定的

from add_to_excel import add_to_excel ##新增到資料庫的函示
from get_excel_data import get_excel_data ##從資料庫拿資料的函式

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

if __name__ == '__main__':
    app.run(debug=True)
    