// Inserts HTML Text at Cursor position, used by markdown toolbar
function insert(myValue) {
    if (document.selection) {
        text.focus();
        sel = document.selection.createRange();
        sel.text = myValue;
    }
    else if (text.selectionStart || text.selectionStart == '0') {
        var startPos = text.selectionStart;
        var endPos = text.selectionEnd;
        text.value = text.value.substring(0, startPos)
            + myValue
            + text.value.substring(endPos, text.value.length);
    } else {
        text.value += myValue;
    }
}

function format(command, value){
    document.execCommand(command, false, value)
}

const insert_tag_with_class = function(tag){
    document.designMode = "on"
    document.execCommand("insertHTML", false,`<${tag}>` + window.getSelection().toString() + `</${tag}>`)
    document.designMode = "off"
}