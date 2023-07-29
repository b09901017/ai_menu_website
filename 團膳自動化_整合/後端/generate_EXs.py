from flask import  request
from flask import jsonify ##回傳json格式用的

def generate_EXs():

    ##-----------把前端傳的東東存在變數裡--------------
    data_JSON = request.get_json()  ##得到{protain_g:蛋白質克數,  lipid_g:脂質克數, sugar_g:醣類克數, error:每類個別誤差 }
    protain_g = data_JSON['protain_g']    
    lipid_g = data_JSON['lipid_g']   
    sugar_g = data_JSON['sugar_g']   
    error = data_JSON['error']
    ##-----------把前端傳的東東存在變數裡--------------


    ##-----------要儲存回傳的空陣列--------------
    EXs = []
    ##-----------要儲存回傳的空陣列--------------


    ##-----------計算開始~~--------------
    for a in range(0,2) : #奶類單項不超過2 (全脂)
        print("start",protain_g,lipid_g,sugar_g)
        for b in range(0,3) :#奶類單項不超過2 (中脂)
            for c in range(0,1) :#脫脂奶不要
                for d in range(0,6) :#蔬菜<5
                    for e in range(0,3) :#水果<2
                        for f in range(0,10) :#全榖雜糧可以到10
                            for g in range(0,6) :#豆蛋<5 (高脂)
                                for h in range(0,6) :#豆蛋<5 (中脂)
                                    for i in range(0,9) :#豆蛋<5 (低脂)
                                        for j in range(0,6) :#油脂堅果<5
                                            protain_error = 8*a + 8*b + 8*c + d + 2*f + 7*g + 7*h + 7*i-protain_g
                                            lipid_error = 8*a + 4*b + 10*g + 5*h + 3*i + 5*j-lipid_g
                                            sugar_error = 12*a + 12*b + 5*d + 15*f + 15*e-sugar_g
                                            condition1 = abs(protain_error) <=error #蛋白質克數誤差小於4克
                                            condition2 = abs(lipid_error)<=error #脂類克數誤差小於4克
                                            condition3 = abs(sugar_error)<=error #醣類克數誤差小於4克
                                            condition4 = c==0  #脫脂奶不要
                                            condition5 = (g+h+i)<=10 ##  總豆蛋<10
                                            fit = condition1 and condition2 and condition3 and condition4 and condition5
                                            if fit :
                                                # print("全脂奶 =",a,"低脂奶=",b,"脫脂奶=",c,"蔬菜類=",d,"水果類=",e,"全榖雜糧=",f,"高脂豆蛋=",g,"中脂豆蛋=",h,"低脂豆蛋=",i,"油脂堅果=",j,"醣類誤差=",round(sugar_error,2),"脂類誤差=",round(lipid_error,2),"蛋白質誤差=",round(protain_error,2))
                                                EX = {'full_milk':a, 'low_milk':b, 'feg':d, 'fruit':e, 'grains':f, 'egg_h':g, 'egg_m':h, 'egg_l':i, 'nuts':j, 'sugar_error':round(sugar_error,2), 'lipid_error':round(lipid_error,2), 'protain_error':round(protain_error,2)}
                                                EXs.append(EX) #放入容器~ 一起傳
    ##-----------計算開始~~--------------

    print('end')
    ##------------回傳資料------------- #[{'full_milk': 1, 'low_milk': 2, 'sugar_error': 1},{},{}]
    response_data = {
        'result': 'success',
        'EXs': EXs
    }
    ##------------回傳資料-------------


    return jsonify(response_data) ##回傳json格式
