;(async () => {
  // wait for ajax to return, 30s timeout , 2s to query once
  let getListContent = () => {
    return new Promise((resolve, reject) => {
      let timeId = undefined
      let timeOutCount = 0
      let _getListContent = () => {
        let listContent = document.querySelectorAll(".list-contents ul li")
        if (listContent.length === 0) {
          if (timeOutCount > 15) {
            // console.log("time_out")
            resolve("time_out")
            return
          }
          timeId = setTimeout(_getListContent, 2000)
          console.log("once ", timeOutCount)
          timeOutCount++
        } else {
          //   console.log("resolve")
          resolve(listContent)
          return
        }
      }
      _getListContent()
    })
  }
  let listContent = await getListContent()
  if (listContent === "time_out") {
    console.log("time_out or no item")
  } else {
    let buildNewSha1Node = (sha1) => {
      // <a href="javascript:;" menu="sha1">
      //    <input type="text" value="sha1" style="display:none"/>
      //     <i class="icon-operate ifo-tag" menu="sha1"></i>
      //     <span menu="sha1">复制SHA1</span>
      // </a>
      let a = document.createElement("a")
      a.setAttribute("href", "javascript:;")
      a.setAttribute("menu", "sha1")
      let input = document.createElement("input")
      input.setAttribute("type", "text")
      input.setAttribute("value", sha1)
      input.setAttribute("style", "position:absolute;opacity:0;display:inline-block !important;cursor:pointer;")
      a.addEventListener('click',(e) => {
        e.stopPropagation()
        input.select()
        try {
          if (document.execCommand("Copy", "false", null)) {
            alert(`复制成功！${sha1}`)
          } else {
            alert("复制失败！")
          }
        } catch (err) {
          alert("复制错误！")
        }
      })
      let i = document.createElement("i")
      i.setAttribute("class", "icon-operate ifo-tag")
      i.setAttribute("menu", "sha1")
      let span = document.createElement("span")
      span.innerText = "复制SHA1"
      span.setAttribute("menu", "sha1")
      a.appendChild(i)
      a.appendChild(input)
      a.appendChild(span)
      return a
    }
    Array.prototype.map.call(listContent, (item) => {
      let sha1 = item.getAttribute("sha1") // null | string
      if (sha1) {
        let menuArr = item.querySelectorAll(".file-opr")
        let menu = undefined
        if (menuArr.length !== 0) {
          menu = menuArr[0]
          // sha1能接入快传
          menu.insertBefore(buildNewSha1Node(sha1), menu.childNodes[4])
        }
        // console.log(menu)
        // to do
        // 1. css style easy to add
        // 2. produce 一个能直接接入的好用的 message 全局组件，类似antd
      }
    })
    console.log("listContent: ", listContent)
  }
})()

