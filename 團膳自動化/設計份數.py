total_hot = 1950
protein_ratio =0.25
lipid_ratio = 0.3
sugar_ratio =  0.45
error = 4

###################################---input----##################################
protein_hot =total_hot*protein_ratio
lipid_hot = total_hot*lipid_ratio
sugar_hot =  total_hot*sugar_ratio
protein_g = protein_hot/4
lipid_g = lipid_hot/9
sugar_g = sugar_hot/4

for a in range(0,2) : #奶類單項不超過2
    print("start",protein_g,lipid_g,sugar_g)
    for b in range(0,3) :#奶類單項不超過2
        for c in range(0,1) :#脫脂奶不要
            for d in range(0,6) :#蔬菜<5
                for e in range(0,3) :#水果<2
                    for f in range(0,10) :#全榖雜糧可以到10
                        for g in range(0,6) :#豆蛋<5
                            for h in range(0,6) :#豆蛋<5
                                for i in range(0,9) :#豆蛋<5
                                    for j in range(0,6) :#油脂堅果<5
                                        condition1 = abs(8*a + 8*b + 8*c + d + 2*f + 7*g + 7*h + 7*i-protein_g) <=error
                                        condition2 = abs(8*a + 4*b + 10*g + 5*h + 3*i + 5*j-lipid_g)<=error
                                        condition3 = abs(12*a + 12*b + 5*d + 15*f + 15*e-sugar_g)<=error
                                        condition4 = c==0  #脫脂奶不要
                                        condition5 = (g+h+i)<=10 ##  總豆蛋<10
                                        fit = condition1 and condition2 and condition3 and condition4 and condition5
                                        if fit :
                                            print("全脂奶 =",a,"低脂奶=",b,"脫脂奶=",c,"蔬菜類=",d,"水果類=",e,"全榖雜糧=",f,"高脂豆蛋=",g,"中脂豆蛋=",h,"低脂豆蛋=",i,"油脂堅果=",j)
