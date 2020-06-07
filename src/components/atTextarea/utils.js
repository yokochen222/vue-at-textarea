/**
 * 获取光标位置
 * setCursorPosition
 * @param textarea 文本框
 * */ 
export function getCursorPosition(textarea) {
  var rangeData = {text: "", start: 0, end: 0 }
  textarea.focus()
  if (textarea.setSelectionRange) { // W3C
      rangeData.start= textarea.selectionStart
      rangeData.end = textarea.selectionEnd
      rangeData.text = (rangeData.start != rangeData.end) ? textarea.value.substring(rangeData.start, rangeData.end): ""
  } else if (document.selection) { // IE
      var i,
          oS = document.selection.createRange(),
          // Don't: oR = textarea.createTextRange()
          oR = document.body.createTextRange()
      oR.moveToElementText(textarea)

      rangeData.text = oS.text
      rangeData.bookmark = oS.getBookmark()
      // Return Value: Integer that returns the number of units moved.
      for (i = 0; oR.compareEndPoints('StartToStart', oS) < 0 && oS.moveStart("character", -1) !== 0; i ++) {
          // Why? You can alert(textarea.value.length)
          if (textarea.value.charAt(i) == '\n') {
              i ++
          }
      }
      rangeData.start = i
      rangeData.end = rangeData.text.length + rangeData.start
  }
  return rangeData
}

/**
 * 设置光标位置
 * setCursorPosition
 * @param textarea 文本框
 * @param rangeData 光标位置
 * */ 
export function setCursorPosition(textarea, rangeData) {
  if(!rangeData) {
    console.error("You must get cursor position first.")
  }
  if (textarea.setSelectionRange) { // W3C
      textarea.focus()
      textarea.setSelectionRange(rangeData.start, rangeData.end)
  } else if (textarea.createTextRange) { // IE
      var oR = textarea.createTextRange()
      // Fixbug :
      // In IE, if cursor position at the end of textarea, the setCursorPosition function don't work
      if(textarea.value.length === rangeData.start) {
          oR.collapse(false)
          oR.select()
      } else {
          oR.moveToBookmark(rangeData.bookmark)
          oR.select()
      }
  }
}


export function getRange() {
  const selection = window.getSelection()
  if (selection && selection.rangeCount > 0) {
    return selection.getRangeAt(0)
  }
}

export function getPrecedingRange() {
  const r = getRange()
  if (r) {
    const range = r.cloneRange()
    range.collapse(true)
    range.setStart(range.endContainer, 0)
    return range
  }
}

export function getAtAndIndex(text, at) {
  return { at, index: text.lastIndexOf(at) }
}


export function insertText(textarea, str) {
  if (document.selection) {
      var sel = document.selection.createRange()
      sel.text = str
  } else if (typeof textarea.selectionStart === 'number' && typeof textarea.selectionEnd === 'number') {
      var startPos = textarea.selectionStart,
          endPos = textarea.selectionEnd,
          cursorPos = startPos,
          tmpStr = textarea.value
      textarea.value = tmpStr.substring(0, startPos) + str + tmpStr.substring(endPos, tmpStr.length);
      cursorPos += str.length
      textarea.selectionStart = textarea.selectionEnd = cursorPos
  } else {
      textarea.value += str
  }
}


export function getOffset(element, target) {
  target = target || window
  var offset = {top: element.offsetTop, left: element.offsetLeft},
      parent = element.offsetParent;
  while (parent != null && parent != target) {
     offset.left += parent.offsetLeft;
     offset.top  += parent.offsetTop;
     parent = parent.offsetParent;
  }
  return offset;
}

export function scrollIntoView(el, scrollParent) {
  if (el.scrollIntoViewIfNeeded) {
    el.scrollIntoViewIfNeeded(false) // alignToCenter=false
  } else {
    // should not use `el.scrollIntoView(false)` // alignToTop=false
    // bug report: https://stackoverflow.com/questions/11039885/scrollintoview-causing-the-whole-page-to-move
    const diff = el.offsetTop - scrollParent.scrollTop
    if (diff < 0 || diff > scrollParent.offsetHeight - el.offsetHeight) {
      scrollParent = scrollParent || el.parentElement
      scrollParent.scrollTop = el.offsetTop
    }
  }
}