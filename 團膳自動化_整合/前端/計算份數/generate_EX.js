// ############################## 點擊開頭圖片 就會跑上去並顯示表格 #####################################
/* #region   */
$('#main_icon , #big_bite').on('click', function () {

  $('#main_icon ').css({
    transform: 'scale(.3) translateX(-230vh) translateY(-90vh)'
  });

  $('#big_bite').css({
    transform: 'scale(.3) translateX(-175vh) translateY(-150vh)'
  })

  $('#food_drink').css({
    display: 'none'
  })

  //畫面可以向右延伸
  $('#top_container').css({
    width: '330vh',
    gridTemplateColumns: 'repeat(40, 1fr)'
  })

  // 表格顯現
  $('#slp_ratio_table').css({
    display: 'grid'
  })

  //滑桿桿顯現
  $('.slider-container').css({
    display: 'block'
  })

  //按鈕顯現
  $('.ai_run_contaniner').css({
    display: 'block'
  })

  //份數表格顯現
  $('#EX_table').css({
    display: 'grid'
  })

  //分配餐次表格出現
  $('#Allocate_EX_to_meals_table').css({
    display: 'grid'
  })

  //下面向右延伸
  $('#botton_container').css({
    width: '1000vh'
  })

  //下面菜單出現
  $('#botton_container').show()

  //把option放入 下面菜單中的select中
  set_option()

})
/* #endregion */
// ############################## 點擊開頭圖片 就會跑上去並顯示表格 #####################################



//###################按下大卡enter 跳到誤差##################
$('#total_kcal').on('keydown', function (event) {

  if (event.keyCode === 13) {
    $('#error').focus()
  }

});
//###################按下大卡enter 跳到誤差##################



//########################################### 滑桿桿動起來########################################################
/* #region   */

var isDragging1 = false;
var isDragging2 = false;
// 點1 按下的時候
$(".node1").on('mousedown', function (event) {
  isDragging1 = true;
  console.log("mousedown1")
}
)
// 點2 按下的時候
$(".node2").on('mousedown', function (event) {
  isDragging2 = true;
  console.log("mousedown2")
}
)
// 當放開滑鼠的時候
$(document).on('mouseup', function (event) {
  isDragging1 = false;
  console.log("mouseup1")
  isDragging2 = false;
  console.log("mouseup2")
}
)
// 移動滑鼠的時候
$(document).mousemove(function (event) {
  //滑條長度 (不知為何多100)
  var containerWidth = $(".slider-container").width() - 100;
  //開頭相對位置
  var node_ref_head_pos = $('.node_ref_head').offset().left
  //尾巴相對位置
  var node_ref_end = $('.node_ref_end').offset().left
  // 1相對開頭的位置      
  var node1_pos = $('.node1').offset().left - node_ref_head_pos
  // 2相對開頭的位置  
  var node2_pos = $('.node2').offset().left - node_ref_head_pos
  // 總熱量
  var total_k = parseFloat($('#total_kcal').val())

  if (isDragging1) {
    //  原來的位置 = 點擊的位置 - 線開頭的位置 + 球球寬度的一半 單位是px~ 
    var new_pos = event.pageX - node_ref_head_pos - 15;
    // 確保節點1在容器內和節點二中移動
    new_pos = Math.min(Math.max(new_pos, 0), node2_pos);
    // 移動 .node1 元素
    $(".node1").css("left", new_pos);
  }
  if (isDragging2) {
    //  原來的位置 = 點擊的位置 - 線開頭的位置 + 球球寬度的一半 單位是px~ 
    var new_pos = event.pageX - node_ref_head_pos - 15;
    // 確保節點2在容器內和節點一移動
    new_pos = Math.max(node1_pos, Math.min(new_pos, containerWidth));
    // 移動 .node2 元素
    $(".node2").css("left", new_pos);
  }
  //其一被拖移
  if (isDragging1 + isDragging2) {
    //間距
    gap1 = node1_pos - 0
    gap2 = node2_pos - node1_pos
    gap3 = containerWidth - node2_pos
    //比例(*100為了變%)
    sugar_ratio = (gap1 * 100 / containerWidth).toFixed(0)
    lipid_ratio = (gap2 * 100 / containerWidth).toFixed(0)
    protain_ratio = (gap3 * 100 / containerWidth).toFixed(0)
    //計算數值變化
    //熱量(kcal)
    sugar_k = total_k * sugar_ratio / 100
    lipid_k = total_k * lipid_ratio / 100
    protain_k = total_k * protain_ratio / 100
    //重量(g)
    sugar_g = sugar_k / 4
    lipid_g = (lipid_k / 9).toFixed(2)
    protain_g = protain_k / 4
    //改變數值
    $('#sugal_ratio').html(sugar_ratio + '%')
    $('#lipid_ratio').html(lipid_ratio + '%')
    $('#protain_ratio').html(protain_ratio + '%')
    $('#sugal_kcal').html(sugar_k)
    $('#lipid_kcal').html(lipid_k)
    $('#protain_kcal').html(protain_k)
    $('#sugal_g').html(sugar_g)
    $('#lipid_g').html(lipid_g)
    $('#protain_g').html(protain_g)
  }
  //其一被拖移

})
/* #endregion */
//########################################### 滑桿桿動起來########################################################



var EXs = [];
var EXs_filter = [];
//########################################計算份數的function#####################################################
/* #region   */
function backend_help_caculate_ex() {
  //建立promise
  return new Promise((resolve, reject) => {

    //取得分別的克數 和 誤差
    const protain_g = parseFloat($('#protain_g').html()) //它會解析字符串中的數字，並返回浮點數。這個函數會忽略數字之外的所有字符
    const lipid_g = parseFloat($('#lipid_g').html()) //parseFloat 轉成浮點數
    const sugar_g = parseFloat($('#sugal_g').html()) //parseFloat 轉成浮點數
    const error = parseFloat($('#error').val()) //parseFloat 取出input value

    //fetch("後端網址",{}) 把{的內容}變成一個變數
    var requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({

        protain_g: protain_g,
        lipid_g: lipid_g,
        sugar_g: sugar_g,
        error: error

      })
    };

    // 使用 Ajax 請求從後端獲取資料 fetch("網址",...).then().then()
    fetch('http://127.0.0.1:5000/generate_EXs', requestOptions)
      .then(response => response.json())
      .then(res_json => {
        EXs = res_json['EXs']
        //promise的resolve~讓他這步以上都執行完後進行下一步
        resolve();

      });//then(res_json => {        的 "})"

  });//Promise((resolve, reject) => {       的")}"

}
/* #endregion */
//########################################計算份數的function#####################################################



//#######################################把後端算好的份數放到表格裡面###############################################
/* #region   */
function put_to_EXs_table(data) {
  //取得放份數的容器 contain1~10
  const c1 = $('#full_milk_exs_container')
  const c2 = $('#low_milk_exs_container ')
  const c3 = $('#feg_exs_container      ')
  const c4 = $('#fruit_exs_container    ')
  const c5 = $('#grains_exs_container   ')
  const c6 = $('#egg_h_exs_container    ')
  const c7 = $('#egg_m_exs_container    ')
  const c8 = $('#egg_l_exs_container    ')
  const c9 = $('#nuts_exs_container     ')
  // const c10 = $('#susugar_exs_container  ') 暫時先不考慮 金製糖

  //清空
  c1.html(""); c2.html(""); c3.html(""); c4.html(""); c5.html(""); c6.html(""); c7.html(""); c8.html(""); c9.html("");
  // c10.html("");暫時先不考慮 金製糖

  // 用jquery中的each函數 $.each ($ 是jquery的縮寫)
  $.each(data, function (index, value) {
    // 將每個值添加到個別的份數容器中 都有獨自的class~~~~   插入<span class="many_ex_1">2</span>
    c1.append('<span class="many_ex_' + index + '">' + value['full_milk'] + '</span>')
    c2.append('<span class="many_ex_' + index + '">' + value['low_milk'] + '</span>')
    c3.append('<span class="many_ex_' + index + '">' + value['feg'] + '</span>')
    c4.append('<span class="many_ex_' + index + '">' + value['fruit'] + '</span>')
    c5.append('<span class="many_ex_' + index + '">' + value['grains'] + '</span>')
    c6.append('<span class="many_ex_' + index + '">' + value['egg_h'] + '</span>')
    c7.append('<span class="many_ex_' + index + '">' + value['egg_m'] + '</span>')
    c8.append('<span class="many_ex_' + index + '">' + value['egg_l'] + '</span>')
    c9.append('<span class="many_ex_' + index + '">' + value['nuts'] + '</span>')
    // c10.append('<span class="many_ex_'+index+'">' +  value['susugar']    + '</span>' ) 暫時先不考慮 金製糖
  });
}
/* #endregion */
//#######################################把後端算好的份數放到表格裡面###############################################



//按下~AI RUN
$('.btn-5').on('click', function () {
  //先把背景弄暗~~
  $('body').css('opacity', 0.3)

  //先計算完份數們~ 得到 EXs = [{'full_milk': 1, 'low_milk': 2, ... 'sugar_error': 1 ...} , {} , {}]
  backend_help_caculate_ex().then(() => {

    // //讓filter 一開始和EXs一樣 寫出其它的篩選函示了!!
    // EXs_filter = EXs

    //再放入
    put_to_EXs_table(EXs);
    //最後恢復背景亮度
    $('body').css("opacity", 1)
  })

})



//####################當璇停在EX眾多選項中的其中一個 那一整列都會放大 且顯示誤差 和把其他的變暗 #################################
/* #region   */
// 使用事件委派監聽動態生成的子元素的 鼠標進入
$('.many_ex').on('mouseenter', 'span', function () {
  //取得所hover的class 和 class 的index
  var class_name = $(this).attr('class');

  // 使用正則表達式來取出字串中的數字部分 "Hello123World456" => ["123", "456"]
  var numbers = class_name.match(/\d+/g);
  var class_index = parseInt(numbers[0])

  //取出EXs 裡的誤差
  var s_error = EXs[class_index]['sugar_error'];
  var l_error = EXs[class_index]['lipid_error'];
  var p_error = EXs[class_index]['protain_error'];

  //得到附近6個的class~
  var near_class = '.many_ex_0' // 為了讓第一個沒有 ","
  for (var i = class_index - 6; i <= class_index + 6; i++) {
    near_class += ', .many_ex_' + i
  }

  //取得所hover的數字 距離父層多少px
  const leftOffset = $(this).offset().left - $('#EX_table').offset().left;



  // //其他變暗 太多span 會lag 只取附近6個~~
  //   $(near_class).css({
  //     opacity : '0.5'
  //   })

  //讓屬於這類class的都放大+不變暗
  $("." + class_name).css({
    transform: 'scale(2.5)',
    opacity: '1'

  })

  //顯示 誤差
  error_div = "<div>     <p>醣類誤差 : " + s_error + "g</p>     <p>脂質誤差 : " + l_error + "g</p>     <p>蛋白質誤差 : " + p_error + "g</p>     </div>"

  $(this).after(error_div);

  //顯示誤差在所hover數字的左邊
  $(this).siblings('div').css('left', leftOffset - 230 + 'px')




});
$('.many_ex').on('mouseleave', 'span', function () {
  //取得所hover的class
  var class_name = $(this).attr('class');

  // 使用正則表達式來取出字串中的數字部分 "Hello123World456" => ["123", "456"]
  var numbers = class_name.match(/\d+/g);
  var class_index = parseInt(numbers[0])

  //得到附近6個的class~
  var near_class = '.many_ex_0' // 為了讓第一個沒有 ","
  for (var i = class_index - 6; i <= class_index + 6; i++) {
    near_class += ', .many_ex_' + i
  }

  // //其他變暗
  //   $(near_class).css({
  //     opacity : '1'
  //   })

  //讓屬於這類class的都放大
  $("." + class_name).css({
    transform: 'scale(1)'

  })

  //顯示 誤差 
  $(this).siblings('div').remove()
});
/* #endregion */
//####################當璇停在EX眾多選項中的其中一個 那一整列都會放大 且顯示誤差 和把其他的變暗 #################################



// // var EXs_filter = EXs 一開始的EX 是空的阿~~~ 要在EX被放入職時 順便放入filter 246行
// var EXs_filter_temp = []
// //#################### 篩選份數 按下enter ###########################################################################################
/* #region   */

//       $('#EX_table input').on('keydown', function(event) {
//         //學上面的放法 (201 把後端算好的份數放到表格裡面)
//         const c1 = $('#full_milk_exs_container')              ############  不用在const c1 c2 ... 直接調用函式  ############       
//         const c2 = $('#low_milk_exs_container ')            
//         const c3 = $('#feg_exs_container      ')       
//         const c4 = $('#fruit_exs_container    ')         
//         const c5 = $('#grains_exs_container   ')          
//         const c6 = $('#egg_h_exs_container    ')         
//         const c7 = $('#egg_m_exs_container    ')         
//         const c8 = $('#egg_l_exs_container    ')         
//         const c9 = $('#nuts_exs_container     ')  

//         if (event.keyCode === 13) {
//           var EX_class = $(this).attr('id')
//           var EX_num =parseInt($(this).val())

//           //清空
//           c1.html("");c2.html("");c3.html("");c4.html("");c5.html("");c6.html("");c7.html("");c8.html("");c9.html("");// c10.html("");暫時先不考慮 金製糖
//           EXs_filter_temp=[]

//           //在篩選過的裡面再篩選一次                                     #######  這樣沒辦法 同一個類別 像是grains 先篩5看看 在篩6 會變成在所有grains=5的裡面 找grains=6的  ########
//           $.each(EXs_filter, function(index, value) {

//             //EXs_filter =[{}, {}, {}]  value={} value["grains"] ={'grains' : 所對到的key} 
//             //但有些是空的{} 就沒辦法value["grains"] 會報錯
//             if(index in EXs_filter)
//               {    if (value[EX_class] === EX_num ){
//                     // 將每個值添加到個別的份數容器中 都有獨自的class~~~~   插入<span class="many_ex_1">2</span>
//                     c1.append('<span class="many_ex_'+index+'">'  +  value['full_milk']  + '</span>' ) 
//                     c2.append('<span class="many_ex_'+index+'">'  +  value['low_milk']   + '</span>' ) 
//                     c3.append('<span class="many_ex_'+index+'">'  +  value['feg']        + '</span>' ) 
//                     c4.append('<span class="many_ex_'+index+'">'  +  value['fruit']      + '</span>' ) 
//                     c5.append('<span class="many_ex_'+index+'">'  +  value['grains']     + '</span>' ) 
//                     c6.append('<span class="many_ex_'+index+'">'  +  value['egg_h']      + '</span>' ) 
//                     c7.append('<span class="many_ex_'+index+'">'  +  value['egg_m']      + '</span>' ) 
//                     c8.append('<span class="many_ex_'+index+'">'  +  value['egg_l']      + '</span>' ) 
//                     c9.append('<span class="many_ex_'+index+'">'  +  value['nuts']       + '</span>' ) 
//                     // c10.append('<span class="many_ex_'+index+'">' +  value['susugar']    + '</span>' ) 暫時先不考慮 金製糖

//                     //將篩選過的結果保留下來
//                     EXs_filter_temp[index] = value

//                   }
//                 }
//           })//each的

//           // 不能放在迴圈裡 先放到暫放區(一開始是空的) 再放回filter裡 要等一夏 等上面算完 
//           setTimeout(function(){
//             EXs_filter = EXs_filter_temp
//           },
//           1500
//           )

//         }//enter的

//       });//keydown的
/* #endregion */
// //#################### 篩選份數###########################################################################################



//######################################################篩選and顯示的函式 7/29成功!! ######################################################
/* #region   */
function filter_and_display() {
  //取得所有input值
  var full_milk_input = parseInt($('#full_milk').val());
  var low_milk_input = parseInt($('#low_milk').val());
  var feg_input = parseInt($('#feg').val());
  var fruit_input = parseInt($('#fruit').val());
  var grains_input = parseInt($('#grains').val());
  var egg_h_input = parseInt($('#egg_h').val());
  var egg_m_input = parseInt($('#egg_m').val());
  var egg_l_input = parseInt($('#egg_l').val());
  var nuts_input = parseInt($('#nuts').val());
  var susugar_input = parseInt($('#susugar').val());

  //#################################################好屌的篩選方法#####################################################################################################################################
  // (a) ? (b) : (c)     (a)true則(c) (a)false則(b)  (b)也可以放判斷式  => 如果a是數字(false) 就在看是否b值等於輸入值可能 true or false 如果a是 NAN = not a number 則返回 (c)。 
  var filteredData = EXs.filter(function (obj) {
    return (!isNaN(full_milk_input) ? obj['full_milk'] === full_milk_input : true) &&
      (!isNaN(low_milk_input) ? obj['low_milk'] === low_milk_input : true) &&
      (!isNaN(feg_input) ? obj['feg'] === feg_input : true) &&
      (!isNaN(fruit_input) ? obj['fruit'] === fruit_input : true) &&
      (!isNaN(grains_input) ? obj['grains'] === grains_input : true) &&
      (!isNaN(egg_h_input) ? obj['egg_h'] === egg_h_input : true) &&
      (!isNaN(egg_m_input) ? obj['egg_m'] === egg_m_input : true) &&
      (!isNaN(egg_l_input) ? obj['egg_l'] === egg_l_input : true) &&
      (!isNaN(nuts_input) ? obj['nuts'] === nuts_input : true) &&
      (!isNaN(susugar_input) ? obj['susugar'] === susugar_input : true);
  });
  //EXs.filter(放條件  true可能是 NAN 或 是數字且符合(b))
  //#################################################好屌的篩選方法#####################################################################################################################################

  setTimeout(put_to_EXs_table(filteredData), 1500)
}
/* #endregion */
//######################################################篩選and顯示的函式######################################################



// #####################################################篩選的input 按下enter 7/30###################################################
$('#EX_table input').on('keydown', function (event) {

  if (event.keyCode === 13) {
    filter_and_display()
  }

})
// #####################################################篩選的input 按下enter###################################################

//一次把所有的AETMT 的input都加上placehoder
$('#Allocate_EX_to_meals_table input').attr('placeholder', "     ---")

// #####################################當按下好多份數的其中一個 要把份數放到input中 並且展開餐次分配表格 7/30####################################
/* #region   */
$('.many_ex').on('click', 'span', function () {

  var class_name = $(this).attr('class');

  //$('.text1') 選擇器來選取所有擁有 text1 類別的 <span> 元素。然後使用 .map() 方法來進行迭代處理，並將文字數字轉換成整數並返回。
  var this_EXs_Array = $("." + class_name).map(function () {
    return parseInt($(this).text());
  }).get();
  //最後使用 .get() 方法來取得由 .map() 回傳的值組成的陣列                    AETMT input 編號

  //把陣列的數字依序放入EX_table                              // 奶全 奶低 蔬 水 全 豆高 豆中 豆低  油 糖 
  $("#EX_table input").map(function (index) {                 //  0    1   2  3  4   5   6    7   8  9
    $(this).val(this_EXs_Array[index])                      //  10   11  12  ......
  })                                                        //  20
  //  30 
  //把陣列的數字依序放入AETMT                                 //  40
  $(".AETMT_EX").map(function (index) {                       //  50
    $(this).html(this_EXs_Array[index])                     //  60 ...............
  })

  // //把把陣列的數字依序放入AETMT的剩餘 (input 60~69) 用slice!!!!
  // $("#Allocate_EX_to_meals_table input").slice(60,70).map(function(index){                       
  //   $(this).html(this_EXs_Array[index-60])
  //   console.log(index)                     
  // })
  //把把陣列的數字依序放入AETMT的剩餘 已經有全部加上一個 class AETMT_remain
  $(".AETMT_remains").map(function (index) {
    $(this).html(this_EXs_Array[index])
  })


  //讓畫面移到右上
  $("#Allocate_EX_to_meals_table input")[9].focus()

  console.log(this_EXs_Array)

})
/* #endregion */
// #####################################當按下好多份數的其中一個 要把份數放到input中 並且展開餐次分配表格####################################



// ( 把每個都寫出來了!! 用迴圈想好像有點難 )#################################### 剩餘份數隨著分配而顯示現在剩多少可以分配 7/30####################################
//#region 
var full_milk_input_value = [];
$('.meal_full_milk_ex input').on('input', function () {

  //可以得到  [1, 4, NaN, 7, NaN, NaN]
  full_milk_input_value = $('.meal_full_milk_ex input').map(function () {
    return parseFloat($(this).val());
  }).get();

  //使用Array.reduce()方法來將數組中的數字相加，並忽略NaN值。 初始值是0
  const sum = full_milk_input_value.reduce((total, num) => {
    if (!isNaN(num)) {
      return total + num;
    } else {
      return total;
    }
  }, 0);

  //計算剩餘多少 full_milk 是 [0]
  const ex = parseInt($(".AETMT_full_milk_ex").text())
  const result = parseFloat((ex - sum).toFixed(2))

  //顯示在剩餘的位置
  $('.remain_full_milk_ex').html(result)
})
var low_milk_input_value = [];
$('.meal_low_milk_ex input').on('input', function () {

  //可以得到  [1, 4, NaN, 7, NaN, NaN]
  low_milk_input_value = $('.meal_low_milk_ex input').map(function () {
    return parseFloat($(this).val());
  }).get();

  //使用Array.reduce()方法來將數組中的數字相加，並忽略NaN值。 初始值是0
  const sum = low_milk_input_value.reduce((total, num) => {
    if (!isNaN(num)) {
      return total + num;
    } else {
      return total;
    }
  }, 0);

  //計算剩餘多少 full_milk 是 [0]
  const ex = parseInt($(".AETMT_low_milk_ex").text())
  const result = parseFloat((ex - sum).toFixed(2))

  //顯示在剩餘的位置
  $('.remain_low_milk_ex').html(result)
})
var feg_input_value = [];
$('.meal_feg_ex input').on('input', function () {

  //可以得到  [1, 4, NaN, 7, NaN, NaN]
  feg_input_value = $('.meal_feg_ex input').map(function () {
    return parseFloat($(this).val());
  }).get();

  //使用Array.reduce()方法來將數組中的數字相加，並忽略NaN值。 初始值是0
  const sum = feg_input_value.reduce((total, num) => {
    if (!isNaN(num)) {
      return total + num;
    } else {
      return total;
    }
  }, 0);

  //計算剩餘多少 full_milk 是 [0]
  const ex = parseInt($(".AETMT_feg_ex").text())
  const result = parseFloat((ex - sum).toFixed(2))

  //顯示在剩餘的位置
  $('.remain_feg_ex').html(result)
})
var fruit_input_value = [];
$('.meal_fruit_ex input').on('input', function () {

  //可以得到  [1, 4, NaN, 7, NaN, NaN]
  fruit_input_value = $('.meal_fruit_ex input').map(function () {
    return parseFloat($(this).val());
  }).get();

  //使用Array.reduce()方法來將數組中的數字相加，並忽略NaN值。 初始值是0
  const sum = fruit_input_value.reduce((total, num) => {
    if (!isNaN(num)) {
      return total + num;
    } else {
      return total;
    }
  }, 0);

  //計算剩餘多少 full_milk 是 [0]
  const ex = parseInt($(".AETMT_fruit_ex").text())
  const result = parseFloat((ex - sum).toFixed(2))

  //顯示在剩餘的位置
  $('.remain_fruit_ex').html(result)
})
var grains_input_value = [];
$('.meal_grains_ex input').on('input', function () {

  //可以得到  [1, 4, NaN, 7, NaN, NaN]
  grains_input_value = $('.meal_grains_ex input').map(function () {
    return parseFloat($(this).val());
  }).get();

  //使用Array.reduce()方法來將數組中的數字相加，並忽略NaN值。 初始值是0
  const sum = grains_input_value.reduce((total, num) => {
    if (!isNaN(num)) {
      return total + num;
    } else {
      return total;
    }
  }, 0);

  //計算剩餘多少 full_milk 是 [0]
  const ex = parseInt($(".AETMT_grains_ex").text())
  const result = parseFloat((ex - sum).toFixed(2))

  //顯示在剩餘的位置
  $('.remain_grains_ex').html(result)
})
var egg_h_input_value = [];
$('.meal_egg_h_ex input').on('input', function () {

  //可以得到  [1, 4, NaN, 7, NaN, NaN]
  egg_h_input_value = $('.meal_egg_h_ex input').map(function () {
    return parseFloat($(this).val());
  }).get();

  //使用Array.reduce()方法來將數組中的數字相加，並忽略NaN值。 初始值是0
  const sum = egg_h_input_value.reduce((total, num) => {
    if (!isNaN(num)) {
      return total + num;
    } else {
      return total;
    }
  }, 0);

  //計算剩餘多少 full_milk 是 [0]
  const ex = parseInt($(".AETMT_egg_h_ex").text())
  const result = parseFloat((ex - sum).toFixed(2))

  //顯示在剩餘的位置
  $('.remain_egg_h_ex').html(result)
})
var egg_m_input_value = [];
$('.meal_egg_m_ex input').on('input', function () {

  //可以得到  [1, 4, NaN, 7, NaN, NaN]
  egg_m_input_value = $('.meal_egg_m_ex input').map(function () {
    return parseFloat($(this).val());
  }).get();

  //使用Array.reduce()方法來將數組中的數字相加，並忽略NaN值。 初始值是0
  const sum = egg_m_input_value.reduce((total, num) => {
    if (!isNaN(num)) {
      return total + num;
    } else {
      return total;
    }
  }, 0);

  //計算剩餘多少 full_milk 是 [0]
  const ex = parseInt($(".AETMT_egg_m_ex").text())
  const result = parseFloat((ex - sum).toFixed(2))

  //顯示在剩餘的位置
  $('.remain_egg_m_ex').html(result)
})
var egg_l_input_value = [];
$('.meal_egg_l_ex input').on('input', function () {

  //可以得到  [1, 4, NaN, 7, NaN, NaN]
  egg_l_input_value = $('.meal_egg_l_ex input').map(function () {
    return parseFloat($(this).val());
  }).get();

  //使用Array.reduce()方法來將數組中的數字相加，並忽略NaN值。 初始值是0
  const sum = egg_l_input_value.reduce((total, num) => {
    if (!isNaN(num)) {
      return total + num;
    } else {
      return total;
    }
  }, 0);

  //計算剩餘多少 full_milk 是 [0]
  const ex = parseInt($(".AETMT_egg_l_ex").text())
  const result = parseFloat((ex - sum).toFixed(2))

  //顯示在剩餘的位置
  $('.remain_egg_l_ex').html(result)
})
var nuts_input_value = [];
$('.meal_nuts_ex input').on('input', function () {

  //可以得到  [1, 4, NaN, 7, NaN, NaN]
  nuts_input_value = $('.meal_nuts_ex input').map(function () {
    return parseFloat($(this).val());
  }).get();

  //使用Array.reduce()方法來將數組中的數字相加，並忽略NaN值。 初始值是0
  const sum = nuts_input_value.reduce((total, num) => {
    if (!isNaN(num)) {
      return total + num;
    } else {
      return total;
    }
  }, 0);

  //計算剩餘多少 full_milk 是 [0]
  const ex = parseInt($(".AETMT_nuts_ex").text())
  const result = parseFloat((ex - sum).toFixed(2))

  //顯示在剩餘的位置
  $('.remain_nuts_ex').html(result)
})
var susugar_input_value = [];
$('.meal_susugar_ex input').on('input', function () {

  //可以得到  [1, 4, NaN, 7, NaN, NaN]
  susugar_input_value = $('.meal_susugar_ex input').map(function () {
    return parseFloat($(this).val());
  }).get();

  //使用Array.reduce()方法來將數組中的數字相加，並忽略NaN值。 初始值是0
  const sum = susugar_input_value.reduce((total, num) => {
    if (!isNaN(num)) {
      return total + num;
    } else {
      return total;
    }
  }, 0);

  //計算剩餘多少 full_milk 是 [0]
  const ex = parseInt($(".AETMT_susugar_ex").text())
  const result = parseFloat((ex - sum).toFixed(2))

  //顯示在剩餘的位置
  $('.remain_susugar_ex').html(result)
})
//#endregion
//( 把每個都寫出來了!! 用迴圈想好像有點難 )#################################### 剩餘份數隨著分配而顯示現在剩多少可以分配 ####################################



// ############### 在AETMT 輸入框間跳來跳去 我好強~~~~~~~ 直接學會之前的循環切換 7/30 ################################################################
/* #region   */
$('#Allocate_EX_to_meals_table input').on('keydown', function (event) {
  //取得當下的index
  const currentIndex = $('#Allocate_EX_to_meals_table input').index(this);

  // 按上
  if (event.keyCode === 38) {
    var next_index = currentIndex - 10
    $('#Allocate_EX_to_meals_table input').eq(next_index).focus()
  }
  // 按下
  if (event.keyCode === 40) {
    var next_index = (currentIndex + 10 + 60) % 60
    $('#Allocate_EX_to_meals_table input').eq(next_index).focus()
  }
  // 按左
  if (event.keyCode === 37) {
    var next_index = currentIndex - 1
    $('#Allocate_EX_to_meals_table input').eq(next_index).focus()
  }
  // 按右
  if (event.keyCode === 39) {
    var next_index = (currentIndex + 1 + 60) % 60
    $('#Allocate_EX_to_meals_table input').eq(next_index).focus()
  }

})
/* #endregion */
// ############### 輸入框間跳來跳去  ################################################################



//#################下面的 菜單表格 新增功能終於成功了 8/3 ###################################################################################################

// ################ 新增新的菜名######################
/* #region   */
var dish_count = 3;
//浮到菜名 出現新增按鈕
$("table").on('mouseenter', '.dish_name', function () {
  //出現加號按鈕
  $(this).append('<button class="expand-button"><i class="fa-solid fa-circle-plus fa-beat fa-lg" style="color: #41955f;"></i></button>');

  //按下按鈕 ( 放在裡面 因為這樣才能取得 this!! )
  $(this).children('.expand-button').on('click', function () {

    //取得現在是dish_多少
    var this_dish_name = $(this).parent()
    var dish_n = this_dish_name.attr('id')
    var new_dish_class = 'dish_' + dish_count
    dish_count++

    //菜名 + 1 +在旁邊  小心 它的id 要和下面一欄的class都一樣
    this_dish_name.after("<th colspan='1' class='dish_name' id='" + new_dish_class + "'> 蒸蛋 </th>");

    // dish_n 旁加一
    // $('tr:contains("材料名稱") td.' + dish_n + ':last, tr:contains("食物成分表類別") td.' + dish_n + ':last, tr:contains("食物代換表類別") td.' + dish_n + ':last, tr:contains("EX") td.' + dish_n + ':last, tr:contains("可食重量(g)") td.' + dish_n + ':last').after('<td class="' + new_dish_class + '"> ' + new_dish_class + ' </td>');
    $('tr:contains("材料名稱") td.' + dish_n + ':last').after('<td class="' + new_dish_class + '"> <input class="ingredient_input"> </td>');
    $('tr:contains("食物成分表類別") td.' + dish_n + ':last').after('<td class="' + new_dish_class + '"> <select class="ingredient_class_select"> </td>');
    $('tr:contains("食物代換表類別") td.' + dish_n + ':last').after('<td class="' + new_dish_class + '"> <select class="food_class_select"> </td>');
    $('tr:contains("EX") td.' + dish_n + ':last').after('<td class="' + new_dish_class + '"> <input> </td>');
    $('tr:contains("可食重量(g)") td.' + dish_n + ':last').after('<td class="' + new_dish_class + '"> <input> </td>');

    //剩餘份數 行+1
    var remain_col = $(".remain").attr("colspan")
    remain_col++
    $(".remain").attr("colspan", remain_col)

    //放入option
    set_option();
  })

})

//滑鼠離開菜名
$("table").on('mouseleave', '.dish_name', function () {
  //加號按鈕消失
  $(this).find(".expand-button").remove();
})
/* #endregion */
// ################ 新增新的菜名######################

// ################ 新增新的食材######################
/* #region   */
//滑鼠進入材料名稱  tr:contains("材料名稱") td神奇用法
$("table").on('mouseenter', 'tr:contains("材料名稱") td', function () {
  //出現加號按鈕
  $(this).append('<button class="expand-button"><i class="fa-solid fa-circle-plus fa-beat fa-lg" style="color: #41955f;"></i></button>');

  //按下按鈕 ( 放在裡面 因為這樣才能取得 this!! )
  $(this).children('.expand-button').on('click', function () {

    //取得現在是dish_多少
    var this_dish_td = $(this).parent()
    var dish_n = this_dish_td.attr('class')

    //取得現在的button的 td 是父tr的第幾個td -1因為  <th>材料名稱</th>不算
    var index = this_dish_td.parent().children().index(this_dish_td) - 1;
    console.log(index)
    //菜名 + 1 +在旁邊  小心 它的id 要和下面一欄的class都一樣
    var dish_n_col = $("#" + dish_n).attr("colspan")
    dish_n_col++
    $("#" + dish_n).attr("colspan", dish_n_col)

    // dish_n 旁加一
    // $('tr:contains("材料名稱") td.' + dish_n + ':last, tr:contains("食物成分表類別") td.' + dish_n + ':last, tr:contains("食物代換表類別") td.' + dish_n + ':last, tr:contains("EX") td.' + dish_n + ':last, tr:contains("可食重量(g)") td.' + dish_n + ':last').after('<td class="' + dish_n + '"> ' + dish_n + ' </td>');


    // 在材料名稱下新增一個空白欄位
    $("tr:nth-child(2)").find("td").eq(index).after("<td class='" + dish_n + "'> <input class='ingredient_input'> </td>");

    // 在食物成分表類別、食物代換表類別、EX、可食重量(g) 下新增空白欄位
    $("tr:nth-child(3)").find("td").eq(index).after("<td class='" + dish_n + "'> <select class='ingredient_class_select'> </td>");
    $("tr:nth-child(4)").find("td").eq(index).after("<td class='" + dish_n + "'> <select class='food_class_select'> </td>");
    $("tr:nth-child(5)").find("td").eq(index).after("<td class='" + dish_n + "'> <input> </td>");
    $("tr:nth-child(6)").find("td").eq(index).after("<td class='" + dish_n + "'> <input> </td>");

    //剩餘份數 行+1
    var remain_col = $(".remain").attr("colspan")
    remain_col++
    $(".remain").attr("colspan", remain_col)

    //放入option
    set_option();
  })

})

//滑鼠離開材料名稱
$("table").on('mouseleave', 'tr:contains("材料名稱") td', function () {
  //加號按鈕消失
  $(this).find(".expand-button").remove();
})
/* #endregion */
// ################ 新增新的食材######################

//#################下面的 菜單表格 新增功能終於成功了 8/3 ###################################################################################################



//################################ 食物成分表類別 下拉選單的選項 8/3  做成函式 這樣當按下新增紐時 就可以一起調用 8/4################################
/* #region   */
function set_option() {
  var ingredient_options = [
    { text: '穀物類' },
    { text: '澱粉類' },
    { text: '肉類' },
    { text: '魚貝類' },
    { text: '豆類' },
    { text: '蛋類' },
    { text: '乳品類' },
    { text: '蔬菜類' },
    { text: '水果類' },
    { text: '油脂類' },
    { text: '堅果及種子類' },
    { text: '菇類' },
    { text: '藻類' },
    { text: '糖類' },
    { text: '飲料類' },
    { text: '糕餅點心類' },
    { text: '加工調理食品及其他類' },
    { text: '調味料及香辛料類' }
  ];

  $.each(ingredient_options, function (index, optionData) {
    $('.ingredient_class_select').append($('<option>', {
      text: optionData.text
    }));
  });

  var food_class_options = [
    { text: '奶 全脂' },
    { text: '奶 低脂' },
    { text: '蔬菜類' },
    { text: '水果類' },
    { text: '全榖雜糧類' },
    { text: '豆蛋魚肉 高' },
    { text: '豆蛋魚肉 中' },
    { text: '豆蛋魚肉 低' },
    { text: '油脂與種子堅果類' },
    { text: '精緻糖' }
  ];

  $.each(food_class_options, function (index, optionData) {
    $('.food_class_select').append($('<option>', {
      text: optionData.text
    }));
  });
}
/* #endregion */
//################################ 食物成分表類別 下拉選單的選項 8/3################################



// ############################### 當focus 在材料的時候 跳出menu 反之收回menu 當點材料名稱 就放到材料名稱輸入哪裡 8/4##################################
/* #region   */
var ingredient_input // 為了防止冒泡 把click事件移出去  冒泡事件第一次遇到 ~~~8/4
// 顯現+放入
$('table').on('focus', '.ingredient_input', function () {
  //背景變暗
  $('#botton_container,#top_container').css("opacity", .2)
  //顯現
  $('#ingredients_container').css('display', 'grid');
  //放入輸入框 (把所focus在的輸入框存下來)
  ingredient_input = $(this)
})
//放入輸入框
$('#ingredients_container').on('click', 'span', function () {
  var ingredient = $(this).text();
  ingredient_input.val(ingredient);
})
// 收回 (延遲.5s 避免還沒按到就消失)
$('table').on('blur', '.ingredient_input', function () {
  setTimeout(function () {
    $('#ingredients_container').hide()
    $('#botton_container,#top_container').css("opacity", 1)
  }, 300);
})
/* #endregion */
// ############################### 當focus 在材料的時候 跳出menu ##################################



//############################### 當材料名稱輸入框被focus 把類別的所有食材放入 menu中 8/4 ##################################

//###########先取得Database的食材名稱#############
var ingrident_name_data = [];
/* #region   */
//函式定義
function fetchData(this_select) {
  // 建立promise 讓他跑完後才會執行下一步 30~56
  return new Promise((resolve, reject) => {

    //取得所選的類別
    const input_class = this_select.val();

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
    fetch('http://127.0.0.1:5000/return_ingrident_name_data', requestOptions)
      .then(response => response.json())
      .then(res_json => {

        // 更新頁面上的資料內容
        ingrident_name_data = res_json

        // 表示 fetchData() 把值甜到excel_col_data裡面了   resolve要放在fetch裡面 剛剛放外面一直失敗
        resolve();

      });//then(res_json => {        的 "})"


  });//Promise((resolve, reject) => {       的")}"

}  // fetchData(){      的 "}"
/* #endregion */
//###########先取得Database的食材名稱#############

//###########把取得Database的食材名稱 放入menu中#############
/* #region   */
function show_ingrident_database() {
  //清空
  $('#ingredients_container').html('')
  //放入
  $.each(ingrident_name_data.colA, function (index, ingrident_name) {
    $('#ingredients_container').append($('<span>', {
      text: ingrident_name
    }));
  });
}
/* #endregion */
//###########把取得Database的食材名稱 放入menu中#############

//########### 當材料名稱輸入框被focus ######################
/* #region   */
$("table").on("focus", ".ingredient_input", function () {

  //取得這輸入框下面的 select 
  // this(input) . parent = td .index 是指 這個td是第幾個
  var this_index = $(this).parent().index()
  var this_select = $(this).parent().parent().siblings('.ingredient_select_tr').children().eq(this_index).children('select')

  //fetchData()現在是promise了等它跑完在執行下一步
  fetchData(this_select).then(() => {

    show_ingrident_database();

  });
})
/* #endregion */
  //########### 當材料名稱輸入框被focus ######################

//############################### 當材料名稱輸入框被focus 把類別的所有食材放入 menu中 ##################################


