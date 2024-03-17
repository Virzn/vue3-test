class Event{
  constructor(){
    // 使用一个对象保存事件名和对应回调函数列表
    this.events = {};
  }
  // 订阅事件，将事件名和对应的回调函数添加到事件列表中
  on(eventName, callBack){
    if(!this.events[eventName]){
      // 事件名不存在就创建一个空表
      this.events[eventName] = [];
    }
    // 将回调函数添加到事件列表中
    this.events[eventName].push(callBack);
    // 返回回调函数本身，用于取消订阅
    return callBack;
  }

  // 取消订阅事件，将事件名和回调函数从时间列表中移除
  off(eventName, callBackRemove){
    if(!this.events[eventName]){
      // 事件名不存在就直接返回
      return;
    }
    // 用filter过滤到对应的回调事件，保留 callBack != callBackRemove
    this.events[eventName] = this.events[eventName].filter(callBack => callBack != callBackRemove)
  }

  // 触发事件，执行对应的事件名下的所有回调函数
  emit(eventName, ...args){
    // 检查事件名对应的回调函数列表是否存在
    if (!this.events[eventName]) {
        // 如果事件名对应的回调函数列表不存在，则直接返回
        return;
    }
    // 遍历事件列表中的每个回调函数，并执行它们，传入参数 args
    for (const callback of this.events[eventName]) {
        callback(...args);
    }
}
}
const e = new Event();

function addCallback(a, b){
  console.log(`${a} + ${b} = ${a + b}`)
}

e.emit('add', 1, 2)
e.off('add', addCallback)
e.emit('add', 1, 2)