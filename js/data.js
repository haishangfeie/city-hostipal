var storage = {};

storage.hospital = [

  ['area','level','type','name','address','phone','imgUrl','time'],

  ['朝阳区','三级甲等','卫生部直属医院','首都儿科研究所附属儿童医院','北京市朝阳区雅宝路2号','010-85695756','img/hospital-1.jpg','14:30'],

  ['朝阳区','三级甲等','卫生部直属医院','中日友好医院','北京市朝阳区樱花东路2号','84205288','img/hospital-2.jpg','8:30'],
  ['西城区','三级甲等','卫生部直属医院','首都医科大学附属北京友谊医院','北京市西城区永安路95号','63016616','img/hospital-3.jpg','9:30'],
  ['朝阳区','三级甲等','卫生部直属医院','首都医科大学附属北京地坛医院B附属','北京市朝阳区樱花东路2号','84205288','img/hospital-4.jpg','8:30'],
  ['朝阳区','三级合格','北京区县属医院','空军总医院','北京市朝阳区樱花东路2号','84205288','img/hospital-5.jpg','8:30'],
  ['海淀区','三级合格','北京区县属医院','航天中心医院(原721医院)','北京市海淀区玉泉路15号','59971160','img/hospital-6.jpg','8:30'],
  ['丰台区','三级甲等','北京区县属医院','北京中医药大学东方医院','北京丰台区方庄芳星园一区6号','67689655','img/hospital-1.jpg','8:30'],

  ['丰台区','三级合格','北京区县属医院','北京电力医院','北京市丰台区太平桥西里甲1号','84205288','img/hospital-2.jpg','8:30'],
  ['顺义区','三级甲等','北京区县属医院','北京中医医院顺义医院','北京市顺义区站前东街5号','84205288','img/hospital-3.jpg','8:30'],
  ['通州区','三级甲等','其他','首都医科大学附属北京潞河医院三级综合医院','北京市通州区新华南路82号','69543901','img/hospital-4.jpg','8:30'],
  
];

storage.department = [
  ['hospitalName', ['departmentName'] ],

  ['首都儿科研究所附属儿童医院',['儿科a','儿科b','儿科d'] ],
  ['中日友好医院',['科室a','科室b','科室c','科室d'] ],

  ['首都医科大学附属北京友谊医院', ['departmentName-1'] ],
  ['首都医科大学附属北京地坛医院B附属', ['departmentName-2'] ],
  ['空军总医院',['departmentName-3'] ],
  ['航天中心医院(原721医院)', ['departmentName-4'] ],
  ['北京中医药大学东方医院', ['departmentName-5'] ],
  ['北京电力医院', ['departmentName-6'] ],
  ['北京中医医院顺义医院', ['departmentName-7'] ] ,
  ['首都医科大学附属北京潞河医院三级综合医院', ['departmentName-8'] ] 

]

var AjaxRemoteGetData = {};
AjaxRemoteGetData.getArea = function(){
  var map ={},
  areaArr=['医院地区'];
  for(var i=1,len=storage.hospital.length;i<len;i++){
    map[storage.hospital[i][0]]=1;
  }
  for(var key in map){
    areaArr.push(key);
  }
  return areaArr;
};

AjaxRemoteGetData.getLevel = function(area){
  if(!area){
    return ['医院等级'];
  }
  var map = {},
      levelArr =['医院等级'];
  for(var i=1,len=storage.hospital.length;i<len;i++){
    var _a = storage.hospital[i][0];
    if(_a === area){
      var _l = storage.hospital[i][1];
      map[_l]=1;
    }
  }
  for(var key in map){
    levelArr.push(key);
  }
  return levelArr;
};

AjaxRemoteGetData.getHospitalName = function(area,level){
  if(!area || !level){
    return ['医院名称'];
  }
  var map = {},
  hospitalNameArr =['医院名称'];
  for(var i=1,len=storage.hospital.length;i<len;i++){
    var _a = storage.hospital[i][0];
    var _l = storage.hospital[i][1];
    if(_a === area && _l ===level){
      var _h = storage.hospital[i][3];
      map[_h]=1;
    }
  }
  for(var key in map){
    hospitalNameArr.push(key);
  }
  return hospitalNameArr;
};
AjaxRemoteGetData.getDepartment = function(area,level,department){
  if(!area || !level || !department){
    return ['科室名称'];
  }
  var map = {},
  departmentArr =['科室名称'];
  for(var i=1,len=storage.department.length;i<len;i++){
    var _h = storage.department[i][0];
    if(_h === department ){
      var _d = storage.department[i][1];
      for(k in _d){
        departmentArr.push(_d[k]);
      }
      break;
    }
  }
  return departmentArr;
};

