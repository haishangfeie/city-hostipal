$(function(){
  $('.ui-search').uiSearch();
  $('.ui-go-up').uiGoUp();

  // 生成存有排班表数据的对象
  var tabArr =createTableObj();
  // 对表格对象进行处理，以得到需要的对象
  for(var i=0;i<tabArr.length;i++){
    var obj = tabArr[i];
    obj.week = getWeek(obj.date);
  }
  var obj = {tabArr:tabArr};
  var html =template('tableTemplate',obj);
  $('.department-plan .form-container .table-plan').html(html);
  // 排班表滑动
  // 这个必须在插入表格之后才能执行
  $('.ui-department-plan').uiDepartmentPlan();
  function createTableObj(){
    var plan = [];
    var today = new Date();
    // 排班表的数据
    for(var i=0;i<49;i++){
      var year = today.getFullYear();
      var month = today.getMonth()+1;
      var day = today.getDate();
      var dateStr = year + '-' + month + '-' + day;
      var obj = {};
      obj.date = dateStr;
      obj.arrange = ['',"约满",""];
      plan.push(obj);
      today.setDate((today.getDate())+1);
    }
    return plan;
  }
  function getWeek(str){
    var argus = str.split('-');
    var date = new Date(argus[0],(argus[1]-1),argus[2]);
    var weekArr = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六',]
    var weekIndex =date.getDay();
    return weekArr[weekIndex];
  }
});