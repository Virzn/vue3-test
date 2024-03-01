/**
 * 画布中绘制矩形
 * 参数: cav-画布对象  list-矩形数组 i-选中矩形下标
 **/

/* 操作执行方法分发 */
export function draw(cav, list, i) {
  // 画布初始化
  let ctx = cav.getContext('2d');
  // 设置矩形边框颜色和线宽
  ctx.strokeStyle = 'blue';
  ctx.lineWidth = 2;
  console.log('画布初始化', cav, list, i);
  // 初始化鼠标坐标
  let sX = 0; // 鼠标X坐标
  let sY = 0; // 鼠标Y坐标

  /*
   *鼠标移动进行第一层判断, 区分情况: 无矩形, 已有矩形无选中, 已有选中矩形
   */
  cav.onmousemove = function (em) {
    sX = em.offsetX;
    sY = em.offsetY;
    let iem = undefined; // 鼠标移动时临时存储当前鼠标所在矩形的下标

    if (list.length === 0) { // **** 无矩形 ****
      // 绘制新矩形
      console.log('无矩形,触发newDraw,绘制新矩形');
      newDraw(cav, ctx, list);
    } else if (i === undefined) { // **** 已有矩形无选中 ****
      // 判断鼠标位置

      console.log('已有矩形无选中');
      // 判断鼠标位置并绘制
      list.forEach(function (value, index, array) {
        // 这个条件判断鼠标是否位于一个宽高均为正的矩形框的右下方。如果是，则设置 iem 为当前矩形框的索引，并调用 judgeDraw() 方法进行后续操作。
        if (value.w > 0 && value.h > 0 && sX > value.x && sX < value.x + value.w && sY > value.y && sY < value.y + value.h) {
          // 鼠标在右下方向生成的矩形中
          iem = index;
          judgeDraw(cav, ctx, list, iem);
        }
        if (value.w < 0 && value.h > 0 && sX < value.x && sX > value.x + value.w && sY > value.y && sY < value.y + value.h) {
          // 鼠标在左下方向生成的矩形中
          iem = index;
          judgeDraw(cav, ctx, list, iem);
        }
        if (value.w > 0 && value.h < 0 && sX > value.x && sX < value.x + value.w && sY < value.y && sY > value.y + value.h) {
          // 鼠标在右上方向生成的矩形中
          iem = index;
          judgeDraw(cav, ctx, list, iem);
        }
        if (value.w < 0 && value.h < 0 && sX < value.x && sX > value.x + value.w && sY < value.y && sY > value.y + value.h) {
          // 鼠标在左上方向生成的矩形中
          iem = index;
          judgeDraw(cav, ctx, list, iem);
        }
        // 如果以上所有条件都不满足，则意味着鼠标不在任何一个矩形框内，此时调用 newDraw() 方法。
        if (iem === undefined) {
          // 鼠标不在矩形中
          newDraw(cav, ctx, list);
        }
      })
    } else { // **** 已有选中矩形 ****
      console.log('已有选中矩形');
      // 判断鼠标位置
      for (let index = 0; index < list.length; index++) {
        let value = list[index];
        // 判断鼠标位置并绘制
        // 如果鼠标在矩形的四个角上，表示可能需要改变矩形的大小或位置。因此，通过判断鼠标位置，确定鼠标所在的角，并根据角的位置信息调整矩形。
        // 如果鼠标在矩形的边上，表示可能需要调整矩形的大小或者移动整个矩形。根据鼠标位置判断是水平边还是垂直边，并确定是左上、右上、左下还是右下角，以便进行相应的操作。
        // 如果鼠标在矩形的内部，表示可能需要移动整个矩形。这时，根据鼠标位置确定是哪个矩形，以便移动对应的矩形。
        // 如果以上所有条件都不满足，则表示鼠标不在任何矩形中，可能需要绘制新的矩形或者执行其他操作。
        if (sX < value.x + 5 && sX > value.x - 5 && sY < value.y + 5 && sY > value.y - 5) {
          // ***  鼠标在起点角  ***
          if (index === i) {
            changeDraw(cav, ctx, list, i, 1);
            break;
          }
        } else if (sX < value.x + value.w + 5 && sX > value.x + value.w - 5 && sY < value.y + 5 && sY > value.y - 5) {
          // ***  鼠标在起点横向角  ***
          if (index === i) {
            changeDraw(cav, ctx, list, i, 2);
            break;
          }

        } else if (sX < value.x + 5 && sX > value.x - 5 && sY < value.y + value.h + 5 && sY > value.y + value.h - 5) {
          // ***  鼠标在起点纵向角  ***
          if (index === i) {
            changeDraw(cav, ctx, list, i, 3);
            break;
          }

        } else if (sX < value.x + value.w + 5 && sX > value.x + value.w - 5 && sY < value.y + value.h + 5 && sY > value.y + value.h - 5) {
          // ***  鼠标在终点角  ***
          if (index === i) {
            changeDraw(cav, ctx, list, i, 4);
            break;
          }

        } else if (value.w > 0 && value.h > 0 && sX > value.x && sX < value.x + value.w && sY > value.y && sY < value.y + value.h) {
          // ***  鼠标在右下方向生成的矩形中  ***
          iem = index
          judgeDraw(cav, ctx, list, index);
          break;

        } else if (value.w < 0 && value.h > 0 && sX < value.x && sX > value.x + value.w && sY > value.y && sY < value.y + value.h) {
          // ***  鼠标在左下方向生成的矩形中  ***
          iem = index
          judgeDraw(cav, ctx, list, index);
          break;

        } else if (value.w > 0 && value.h < 0 && sX > value.x && sX < value.x + value.w && sY < value.y && sY > value.y + value.h) {
          // ***  鼠标在右上方向生成的矩形中  ***
          iem = index
          judgeDraw(cav, ctx, list, index);
          break;

        } else if (value.w < 0 && value.h < 0 && sX < value.x && sX > value.x + value.w && sY < value.y && sY > value.y + value.h) {
          // ***  鼠标在左上方向生成的矩形中  ***
          iem = index
          judgeDraw(cav, ctx, list, index);
          break;

        } else {
          if (iem === undefined) {
            // *** 鼠标不在矩形中 ***
            newDraw(cav, ctx, list);
          }
        }
      }
    }

    /* 鼠标移出画布区域时保存选中矩形下标(如有) */
    cav.onmouseout = function (eo) {
      if (i !== undefined) {
        // 初始化
        draw(cav, list, i);
      }
    };
  }

  // console.log(cav, list, i);

  return list;
}

/* 编辑矩形四个角 */
function changeDraw(cav, ctx, list, i, site) {
  // 将鼠标样式改变为指针形状
  cav.style.cursor = 'pointer'
  console.log('编辑矩形四个角');

  // site: 操作矩形角的位置, 1-起点 2-起点横向 3-起点纵向 4-终点
  let mark = list[i];

  /* 按下鼠标左键 */
  cav.onmousedown = function (ed) {
    console.log('按下鼠标左键');
    // 保存鼠标落下位置的X, Y坐标, firefox中鼠标移动后ed.offsetX ed.offsetY会变成 0, 需要使用临时参数存储起来
    let sX = ed.offsetX; // 起点X坐标
    let sY = ed.offsetY; // 起点Y坐标

    /* 移动鼠标 */
    cav.onmousemove = function (em) {
      // 计算绘制数据
      let iframe = {}
      // 判断矩形变化的类型，site 可能的取值是 1、2、3、4，分别对应矩形的不同位置和方向。根据 site 的取值，计算矩形的新位置和大小，并将其保存在名为 iframe 的对象中。
      //  1 左上角;2 右上角;3 左下角;4 右下角。
      switch (site) {
        case 1:
          iframe = {
            x: em.offsetX,
            y: em.offsetY,
            w: mark.w - (em.offsetX - sX),
            h: mark.h - (em.offsetY - sY)
          }
          break;
        case 2:
          iframe = {
            x: mark.x,
            y: mark.y + (em.offsetY - sY),
            w: mark.w + (em.offsetX - sX),
            h: mark.h - (em.offsetY - sY)
          }
          break;
        case 3:
          iframe = {
            x: mark.x + (em.offsetX - sX),
            y: mark.y,
            w: mark.w - (em.offsetX - sX),
            h: mark.h + (em.offsetY - sY)
          }
          break;
        case 4:
          iframe = {
            x: mark.x,
            y: mark.y,
            w: mark.w + (em.offsetX - sX),
            h: mark.h + (em.offsetY - sY)
          }
          break;
      }
      list.splice(i, 1, iframe);// 替换列表中的选定矩形数据

      // 重新绘制
      reDraw(cav, ctx, list, i);
    }

    /* 鼠标离开矩形区 */
    cav.onmouseout = function (eo) {
      console.log('鼠标离开矩形区');
      // 重新绘制
      reDraw(cav, ctx, list);
      // 初始化
      draw(cav, list)
    };

    /* 监听键盘, 点击后可以控制删除, 由于移动矩形事件已经监听了onmousemove, 所以在移动矩形方法中仍有一次调用 */
    delDraw(cav, ctx, list, i);
  }

}

/* 绘制新矩形 */
function newDraw(cav, ctx, list) {
  // 设置鼠标样式为十字架
  cav.style.cursor = 'crosshair'
  // 初始化变量
  let start = false; // 画框状态, false时不执行画框操作
  let sX = 0; // 起点X坐标
  let sY = 0; // 起点Y坐标

  /* 按下鼠标左键 */
  cav.onmousedown = function (ed) {
    /* 使用变量 */
    start = true;
    sX = ed.offsetX;
    sY = ed.offsetY;

    /* 重置按键监听, 防止选中取消后仍可删除 */
    delDraw(cav, ctx, list, null)

    /* 鼠标移动 */
    cav.onmousemove = function (em) {
      if (start) {
        // 重新绘制
        reDraw(cav, ctx, list);
        // 设置边框为虚线
        // 这个方法开始一条路径，或者重置当前的路径。在绘制新形状之前，你通常会调用这个方法来确保当前路径是新的，而不是继续绘制之前的路径。
        ctx.beginPath();
        //  这个方法设置当前线条样式为虚线。在这里，它将线条设置为了一种样式，这个样式是一个数组，数组中的第一个数字表示实线的长度，
        //  第二个数字表示空白的长度。所以 [8, 4] 表示每隔 8 个像素绘制一段实线，然后跳过 4 个像素绘制下一段实线，以此类推。
        ctx.setLineDash([8, 4]);
        // 这个方法用于创建一个新的矩形路径。它接受四个参数：起始点的 x 坐标和 y 坐标，以及矩形的宽度和高度。
        ctx.rect(sX, sY, em.offsetX - sX, em.offsetY - sY);
        // 这个方法绘制当前路径。在这里，它会按照之前设置的线条样式绘制矩形的轮廓。
        ctx.stroke();
      }
    }

    /* 鼠标抬起 */
    cav.onmouseup = function (eu) {
      // 如果绘制状态为 true，并且鼠标水平或垂直方向上移动的距离都大于 10 像素，那么才执行绘制矩形的操作。这样做是为了避免用户误操作导致绘制过小的矩形。
      if (start && Math.abs(eu.offsetX - sX) > 10 && Math.abs(eu.offsetY - sY) > 10) {
        // 改变矩形数组
        let frame = {
          x: sX, y: sY, w: eu.offsetX - sX, h: eu.offsetY - sY
        };
        list.push(frame);
        // 重新绘制
        reDraw(cav, ctx, list);
        // 改变画框状态
        start = false
        // 初始化
        draw(cav, list)
      } else {
        // 重新绘制
        reDraw(cav, ctx, list);
        // 改变画框状态
        start = false
        // 初始化
        draw(cav, list)
      }
    };

    /* 鼠标离开矩形区 */
    cav.onmouseout = function (eo) {
      if (start && Math.abs(eo.offsetX - sX) > 10 && Math.abs(eo.offsetY - sY) > 10) {
        // 改变矩形数组
        let frame = {
          x: sX, y: sY, w: eo.offsetX - sX, h: eo.offsetY - sY
        };
        list.push(frame);
        // 重新绘制
        reDraw(cav, ctx, list);
        // 改变画框状态
        start = false;
        // 初始化
        draw(cav, list)
      } else {
        // 重新绘制
        reDraw(cav, ctx, list);
        // 改变画框状态
        start = false
        // 初始化
        draw(cav, list)
      }
    };
  }
}

/* 选中矩形, 重绘矩形, 并分发后续事件 */
function judgeDraw(cav, ctx, list, iem) {
  console.log('选中矩形, 重绘矩形, 并分发后续事件');
  cav.style.cursor = 'default';
  // 初始化变量
  let sX = 0; // 起点X坐标
  let sY = 0; // 起点Y坐标

  /* 按下鼠标左键 */
  cav.onmousedown = function (ed) {
    sX = ed.offsetX;
    sY = ed.offsetY;

    // 更改选中状态, 重绘矩形
    reDraw(cav, ctx, list, iem);

    /* 当仅点击选中矩形便抬起鼠标后, 重新初始化画布 */
    cav.onmouseup = function () {
      // 重绘矩形
      reDraw(cav, ctx, list, iem);

      // 初始化
      draw(cav, list, iem);
    };

    /* 按住拖动鼠标, 移动选中矩形*/
    moveDraw(cav, ctx, list, iem, sX, sY);

    /* 监听键盘, 点击后可以控制删除, 由于移动矩形事件已经监听了onmousemove, 所以在移动矩形方法中仍有一次调用 */
    delDraw(cav, ctx, list, iem);
  }
}

/* 移动矩形 */
function moveDraw(cav, ctx, list, i, sX, sY) {
  console.log('移动矩形');
  // 获取选中的矩形
  let mark = list[i]
  // 监听鼠标移动事件
  cav.onmousemove = function (em) {
    // 计算移动后矩形的新位置和大小
    let iframe = {
      x: mark.x + (em.offsetX - sX),
      y: mark.y + (em.offsetY - sY),
      w: mark.w,
      h: mark.h
    }
    // 更新矩形数组中选中矩形的数据
    list.splice(i, 1, iframe);
    /* 监听键盘, 使矩形在移动后仍可删除, 在点击未移动过的矩形时仍有一次监听 */
    delDraw(cav, ctx, list, i);
    // 重新绘制
    reDraw(cav, ctx, list, i);
  }
  // 监听鼠标抬起事件
  cav.onmouseup = function () {
    // 重绘矩形
    reDraw(cav, ctx, list, i);

    // 初始化画布，使画布可以继续接收其他事件
    draw(cav, list, i);
  };
}

/* 删除矩形 */
function delDraw(cav, ctx, list, i) {
  /* 按键事件 */
  console.log('删除矩形');
  if (i === null) {
    // i为null时阻止按键监听事件冒泡
    document.onkeydown = function (k) {
      return false;
    }
  } else {
    // 监听按键事件
    document.onkeydown = function (k) {
      let key = k.keyCode || k.which;
      if ((key == 46 || key == 8) && i !== null) {
        if (list.length >= 1) {
          // 删除数组元素
          list.splice(i, 1);
          // 重绘矩形
          reDraw(cav, ctx, list);
        } else {
          /* 矩形数组长度为0, 已将矩形框全部删除 */
          ctx.clearRect(0, 0, cav.width, cav.height);
        }
        // 重置监听状态, 防止删除完毕后, 按键监听不消失
        delDraw(cav, ctx, list, null)
        // 重绘矩形
        reDraw(cav, ctx, list);
        // 初始化
        draw(cav, list);
      }
    }
  }
}


/* 重绘所有矩形 */
function reDraw(cav, ctx, list, i) {
  console.log('重绘所有矩形');
  ctx.setLineDash([8, 0]); // 设置边框为实线
  ctx.clearRect(0, 0, cav.width, cav.height);
  // 绘制未选中部分
  list.forEach(function (value, index, array) {
    if (i === undefined || index != i) {
      ctx.beginPath();
      ctx.strokeStyle = 'blue';
      ctx.rect(value.x, value.y, value.w, value.h);
      ctx.stroke();
    }
  });
  // 绘制已选中部分
  list.forEach(function (value, index, array) {
    if (index === i) {
      /* 绘制方框 */
      //  开始一个新的绘图路径。
      ctx.beginPath();
      // 设置绘制路径的边框颜色为红色。
      ctx.strokeStyle = 'red';
      // 绘制一个矩形路径，起始点为 (value.x, value.y)，宽度为 value.w，高度为 value.h。
      ctx.rect(value.x, value.y, value.w, value.h);
      // 设置矩形的填充色为带有透明度的灰色。
      ctx.fillStyle = 'RGBA(102,102,102,0.2)'
      // 填充矩形的内部区域，以实现选中效果。
      ctx.fillRect(value.x, value.y, value.w, value.h);
      // 绘制矩形路径的边框。
      ctx.stroke();
      // 绘制四个角的圆圈
      ctx.beginPath();
      ctx.strokeStyle = 'red';
      // 绘制一个圆弧路径，圆心为 (value.x, value.y)，半径为 4，起始角度为 0，终止角度为 2π（360度），即绘制一个完整的圆。
      ctx.arc(value.x, value.y, 4, 0, Math.PI * 2)
      ctx.fillStyle = "red";
      ctx.fill();// 画起点实心圆
      ctx.stroke();
      ctx.beginPath();
      // 绘制另一个圆弧路径，圆心为 (value.x, value.y + value.h)，参数同上。
      ctx.arc(value.x, value.y + value.h, 4, 0, Math.PI * 2);
      ctx.fillStyle = "red";
      ctx.fill();// 画起点纵向实心圆
      ctx.stroke();
      ctx.beginPath();
      // 绘制另一个圆弧路径，圆心为 (value.x + value.w, value.y + value.h)，参数同上。
      ctx.arc(value.x + value.w, value.y + value.h, 4, 0, Math.PI * 2);
      ctx.fillStyle = "red";
      ctx.fill();// 画起点横向实心圆
      ctx.stroke();
      ctx.beginPath();
      // 绘制另一个圆弧路径，圆心为 (value.x + value.w, value.y)，参数同上。
      ctx.arc(value.x + value.w, value.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = "red";
      ctx.fill();// 画终点实心圆
      ctx.stroke();
    }
  })
}
