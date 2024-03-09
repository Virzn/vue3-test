// 长度最小的子数组
function minSubArray(target, nums){
  let start = 0, end = 0, sum = 0, min = Infinity, len = nums.length;
  while(end < len){
    sum += nums[end];
    while(sum >= target){
      min = Math.min(min, end - start + 1);
      sum -= nums[start];
      start++
    }
    end++
  }
  return min === Infinity ? 0 : min
}

// 单链表初始化
function ListNode(val, next){
  this.val = (val === undefined ? 0 : val);
  this.next = (next === undefined ? 0 : next)
}

// 删除链表的倒数第n个节点
function removenNumNode(head, n){
  let ret = new ListNode(0, head);
  let num = 0
  let temp = ret
  while(temp){
    num ++ 
    temp = temp.next;
  }

  let target = num - n + 1
  temp = ret
  while(target > 0){
    if(target ==1){
      temp.next = temp.next.next
    }else{
      temp = temp.next
    }
    target--
  }
  return ret.next
}

//   let res = new Array(n).fill(0).map(() => new Array(n).fill(0))
// 环形链表
function detectCycle(head){
  let slow = head, fast= head
  while(fast && fast.next){
    fast = fast.next
    slow = slow.next
    if(fast == slow){
      slow = head
      while(slow !== fast){
        slow = slow.next
        fast = fast.next
        return slow
      }
    }
  }
  return null
}

// 有效的字母异位词
function isAnagram(s, t){
  if(s.length !== t.length){
    return false
  }
  let resSet = new Array(26).fill(0)
  let base = "a".charCodeAt();
  for(let i of s){
    resSet[i.charCodeAt() - base]++
  }
  for(let j of t){
    if(!resSet[j.charCodeAt() -base]) return false
    resSet[j.charCodeAt() - base]--
  }
  return true
}


// 两个数组的交集
function intersection(nums1, nums2){
  if(nums1.length < nums2.length){
    let temp = nums1
    nums1 = nums2
    nums2 = temp
  }
  let res = []
  for(let i = 0 ; i< nums2.length ; i++){
    if(nums1.includes(nums2[i]) && !res.includes(nums2[i])){
      res.push(nums2[i])
    }
  }
  return res
}

// 两数之和
function twoSum(nums, target){
  let m = new Map()
  for(let i = 0; i < nums.length; i++){
    if(m.has(target - nums[i])){
      return [m.get(target - nums[i]), i]
    }else{
      m.set(nums[i], i)
    }
  }
}

// 三树之和



