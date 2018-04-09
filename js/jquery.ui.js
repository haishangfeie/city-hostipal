(function($) {
  // ui-search定义
  $.fn.uiSearch = function() {
    $(this).each(function() {
      var ui = $(this);
      var selectBox = $('.ui-search-select-box', ui),
        optionBox = $('.ui-search-option-box', selectBox);
      selectBox.click(function(event) {
        optionBox.toggle();
        return false;
      })
      $('.ui-search-option', optionBox).click(function(event) {
        var text = $(this).html();
        $('.ui-search-select', selectBox).html(text);
        optionBox.hide();
        return false;
      })
      $('body').click(function(event) {
        optionBox.hide();
      });
    })
    return $(this);
  };
  // ui-carousel定义
  $.fn.uiCarousel = function() {
    // 需求：
    // 1、 自动轮播：每隔2秒滑向下一张
    // 2、 无缝轮播
    // 3、 点击圆点可以滑动到响应图片，且圆点样式同步更新
    // 4、 点击箭头可以上下滑动切换图片，且圆点样式同步更新
    // 5、 鼠标进入轮播区域内，停止轮播
    // 6、 鼠标离开轮播区域重新开始轮播
    $(this).each(function() {
      var ui = $(this),
        list = $('.ui-carousel-pic', ui),
        itemArr = $('a', list),
        dotArr = $('.dots span', ui),
        timer = null,
        isStop = false, //用于保证滑动时不触发点击箭头的滑动，以避免listIndex随鼠标点击变化导致导航圆点失去同步的问题
        dotIndex = 0,
        listIndex = 0,
        posMask = []; //记录所有图片的偏移距离;
      // 复制第一张图片并插入最后一张之后，
      // 复制最后一张图片并插入第一张之前，
      var cloneFirstPic = itemArr.eq(0).clone(),
        clonelastPic = itemArr.last().clone();
      $('a', list).first().before(clonelastPic).end().last().after(cloneFirstPic);
      // 更新itemArr
      itemArr = $('a', list);
      // 获取每张图片的宽度
      var itemWidth = itemArr.eq(0).width();
      // 录入每张图片的偏移
      itemArr.each(function(i) {
        posMask.push(-1 * i * itemWidth);
      })
      // 调整图片位置，以显示原来第一张的图片（现在索引为1），更新索引
      list.css('left', posMask[1]);
      listIndex = 1;
      var arrowArr = $('.arrow', ui);
      // 获取圆点与图片的数量
      var itemsLen = itemArr.length,
        dotLen = dotArr.length;
      list.on('move', function(event) { // 滑到图片事件
        // 触发动画时，点击箭头不再滑动
        isStop = true;
        $(this).animate({
          left: posMask[listIndex]
        }, 300, function() {
          // 动画完成后，可以点击箭头移动图片
          isStop = false;
          // 当图片滑动到边界时，立即调整图片位置,更新listIndex
          if (Math.abs($(this).position().left) < 1) {
            $(this).css('left', posMask[itemsLen - 2]);
            listIndex = itemsLen - 2;
          }
          if (Math.abs(posMask[itemsLen - 1] - $(this).position().left) < 1) {
            $(this).css('left', posMask[1]);
            listIndex = 1;
          }
          // 更新圆点导航样式
          dotArr.removeClass('active').eq(dotIndex).addClass('active');
        });
        dotArr.removeClass('active').eq(dotIndex).addClass('active');
      }).on('toNext', function() { // 滑到下一张图片事件
        updateIndex();
        list.triggerHandler('move');
      }).on('toPrev', function() { // 滑到上一张图片事件
        updateIndex(false);
        list.triggerHandler('move');
      }).on('autoPlay', function() {
        if (timer) {
          clearInterval(timer);
        }
        timer = setInterval(function() {
          list.triggerHandler('toNext');
        }, 2000)
      });
      // 点击箭头滑动图片
      arrowArr.eq(0).click(function(event) {
        if (!isStop) {
          list.triggerHandler('toPrev');
        }
        return false;
      })
      arrowArr.eq(1).click(function(event) {
        if (!isStop) {
          list.triggerHandler('toNext');
        }
        return false;
      })
      // 点击圆点滑动图片
      dotArr.click(function(event) {
        dotIndex = $(this).index();
        listIndex = dotIndex + 1;
        list.triggerHandler('move')
      })
      // 自动轮播
      list.triggerHandler('autoPlay');
      // 移入鼠标停止轮播
      ui.mouseenter(function(event) {
        if (timer) {
          clearInterval(timer);
        }
      })
      // 移出鼠标恢复自动轮播
      ui.mouseleave(function(event) {
        list.triggerHandler('autoPlay');
      });
      // 索引更新函数
      function updateIndex(flag) {
        if (flag == null || flag === true) {
          listIndex++;
          dotIndex++;
          if (dotIndex >= dotLen) {
            dotIndex = 0;
          }
        } else if (flag === false) {
          listIndex--;
          dotIndex--;
          if (dotIndex < 0) {
            dotIndex = dotLen - 1;
          }
        }
      }
    });
    return $(this);
  };
  // ui-menu名义
  $.fn.uiMenu = function() {
    $(this).each(function() {
      var ui = $(this);
      var list = $('.ui-menu-list', ui);
      var itemArr = list.children();
      var subMenu = $('.ui-menu-sub', ui);
      var subArr = subMenu.children();
      var index = null;
      // 移入itemArr修改样式，并显示二级菜单
      itemArr.mouseenter(function(event) {
        index = $(this).index();
        itemArr.removeClass('active').eq(index).addClass('active');
        subMenu.show();
        subArr.hide().eq(index).show();
      });
      // 移出itemArr修改样式，并隐藏二级菜单
      itemArr.mouseleave(function(event) {
        itemArr.removeClass('active');
        subMenu.hide();
      });
      // 移入subMenu不隐藏菜单
      subMenu.mouseenter(function(event) {
        subMenu.show();
        itemArr.eq(index).addClass('active')
      });
      subMenu.mouseleave(function(event) {
        itemArr.removeClass('active');
        subMenu.hide();
      });
    });
    return $(this);
  };
  // ui-cascading定义
  // 需求：（这里是为了练习级联的需求，感觉与实际需求可能不太一致）
  //  1/ 初始时除了第一个级联，其余不获取数据
  //  2/ 点击级联，下级级联立即更新，下级之后的级联都恢复为初始状态
  $.fn.uiCascading = function() {
    $(this).each(function() {
      var ui = $(this);
      var selectArr = $('select', ui);
      var getDataApi = ['getArea', 'getLevel', 'getHospitalName', 'getDepartment'];
      selectArr.data('val', '');
      // 给选项绑定相应事件
      selectArr.on('update', function(event) { //更新数据的事件
          var $this = $(this);
          var index = $this.index();
          var argus = undefined;
          if ($this.data('val') !== '') {
            argus = $this.data('val').split(',');
          }
          var selData = AjaxRemoteGetData[getDataApi[index]].apply(null, argus);
          // 先清空原来的数据
          $this.html('');
          $.each(selData, function(i, value) {
            var optionEle = $('<option></option>').html(value).val(value);
            $this.append(optionEle);
          })
        })
        // 当选项发生改变时触发reLoad事件
        .on('change', function() {
          var $this = $(this);
          var selVal = $(this).val();
          // 将后面选项的data-val清空，数据也清空
          $this.nextAll('select').data('val', '').each(function(i, ele) {
            $(this).triggerHandler('update')
          });
          // 更新下一项的data-val
          $this.next('select').data('val', ($this.data('val') !== '' ? $this.data('val') + ',' : '') + selVal).triggerHandler('update');
        })
      // 让第一个选项先获取到数据
      selectArr.first().triggerHandler('update');
    });
    return $(this);
  }
  // ui-tabs tab栏切换
  $.fn.uiTabs = function(headerSel,contentSle) {
    $(this).each(function() {
      var ui = $(this);
      var header = $(headerSel,ui);
      var content = $(contentSle,ui);
      header.children().click(function(evnet){
        var $this = $(this);
        var index =$this.index();
        // 切换头部标签
        $this.addClass('active').siblings().removeClass('active');
        // 切换内容
        content
        .children().hide()
        .eq(index).show();
        return false;
      })
    });
    return $(this);
  }
  // ui-go-up 返回顶部
  $.fn.uiGoUp = function(){
    $(this).each(function(){
      var ui = $(this);
      ui
      .click(function(event){
        $('body').animate({
          scrollTop: 0
        },
        500);
        $('html').animate({
          scrollTop: 0
        },
        500);
      })
      .mouseenter(function(event){
        ui.html('回到顶部');
      })
      .mouseleave(function(event) {
        ui.html('');
      });
    })
    return $(this);
  }
})(jQuery);