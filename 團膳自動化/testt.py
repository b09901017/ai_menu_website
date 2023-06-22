from sympy import *

# 定义变量
a, b, c, d, e, f, g, h, i, j = symbols('a b c d e f g h i j',integer=True)

# 定义方程组
eq1 = Eq(8*a + 8*b + 8*c + d + 2*f + 7*g + 7*h + 7*i, 142)
eq2 = Eq(8*a + 4*b + 10*g + 5*h + 3*i + 5*j, 53)
eq3 = Eq(12*a + 12*b + 5*d + 15*f + 15*e, 214)
eq4 = Eq(c, 0)
eq5 = Eq(e, 0)


# 解方程组
result = solve((eq1, eq2, eq3, eq4, eq5), (a, b, c, d, e, f, g, h, i, j))

# 输出结果
print(result)


##{a: -5*f/28 - 5*g/4 + i/2 - 5*j/4 - 125/28, b: 5*f/14 - 5*h/4 - 7*i/4 + 5*j/4 + 621/28, c: 0, d: -24*f/7 + 3*g + 3*h + 3*i + 2/7, e: 0}