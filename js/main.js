let text = document.querySelector("#editor .input");
let compiled = document.querySelector("#editor .output");
let preview = document.querySelector("#preview")
let overlay = document.querySelector("#overlay")
let dropdown = document.getElementById("dropdown");
let note_list = document.getElementById("list")
let editor = document.getElementById("editor")

let toolbar = document.querySelector("#toolbar")
let plain_toolbar = document.querySelector("#plain-toolbar") 
let plain_editor = document.querySelector("#plain")

let NOTES 
let INDEX

showdown.setOption('tasklists', 'true');
showdown.setOption('strikethrough', 'true');
showdown.setOption('tables', 'true');
showdown.setOption('smoothLivePreview', 'true');
showdown.setOption('simpleLineBreaks', 'true');
showdown.setOption('omitExtraWLInCodeBlocks', 'true');


//--------------------------LOCAL STORAGE---------------------------
function save_local(){
    localStorage.setItem("notes", JSON.stringify(NOTES))
    localStorage.setItem("index", INDEX)
}

function load_local(){
    return JSON.parse(localStorage.getItem("notes"))
}


//--------------------------MENUS---------------------------
function open_nav() {
  document.getElementById("sidenav").style.width = "45vh";
  update_list()
}

function close_nav() {
  document.getElementById("sidenav").style.width = "0";
}

function toggle_class(element, remove, add){
    element.classList.remove(remove)
    element.classList.add(add)
}

function open_dropdown_menu(){
    if (dropdown.classList.contains("show")){
        toggle_class(dropdown, "show", "hide")
    }else{
        toggle_class(dropdown, "hide", "show")
    }
}

function open_postits(){
    console.log("POS")
    window.location = "postits.html"
}

function toggle_dark(){
    open_dropdown_menu()
    let theme = document.documentElement.getAttribute("data-theme");
    if (theme != "dark"){
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("dark-mode", false)
        return;
    }
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("dark-mode", true)
}

function handle_click(){
    $(window).click(function() {
        console.log("cloc")
        toggle_class(dropdown, "show", "hide")
        toggle_class(preview, "show", "hide");
        toggle_class(overlay, "show", "hide");
    });

    $('#preview').click(function(event){
    event.stopPropagation();
    });
    $('#dropdown').click(function(event){
    event.stopPropagation();
    });
    $('#profile').click(function(event){
    event.stopPropagation();
    });
    $('#open_preview').click(function(event){
    event.stopPropagation();
    });
}

//--------------------------NOTES---------------------------

function find_title(){
    let nodes 
    let MARKDOWN = toolbar.classList.contains("show-flex")
    if (MARKDOWN == true){
        nodes = compiled.childNodes;
    }else{
        nodes = plain_editor.childNodes;
    } 
    
    header = nodes[0].innerHTML;
    return header;
}

function add_note(){
    NOTES.push({"title":"Untitled", "content":"# Untitled", "markdown":true})
    get_note(NOTES.length - 1)
}

function save_note(i){
    let title
    let note = {}
    let content
    let MARKDOWN = toolbar.classList.contains("show-flex")

    try{ title = find_title(); }
    catch{ return }

    if (MARKDOWN == true){ content = text.value }
    else{ content = plain_editor.innerHTML }
    
    note["title"] = title
    note["content"] = content
    note["markdown"] = MARKDOWN

    NOTES[i] = note 
    
    save_local()
}

function update_notes(){
    note_list.innerHTML = ""
    for (let i = 0; i < NOTES.length; i++){
        note_list.innerHTML += `<span onclick="get_note(${i})" class='note'>${NOTES[i]['title']}</span>`
    }
}

function delete_note(){
    NOTES.splice(INDEX,1)
    try { get_note(NOTES.length-1) }

    catch {
       add_note()
       get_note(0) 
    }
}

function get_note(i){
    MARKDOWN = NOTES[i]["markdown"]

    if (MARKDOWN == true) { 
        load_markdown() 
        text.value = NOTES[i]["content"]
    }
    if (MARKDOWN == false) { 
        load_plain() 
        plain_editor.innerHTML = NOTES[i]["content"]
    }

    INDEX = i
    save_local()
    set_markdown()
    close_nav()
}

function load_preview(){
    set_markdown()
    if (preview.classList.contains("hide")){
        toggle_class(preview, "hide", "show");
        toggle_class(overlay, "hide", "show")
        toggle_class(dropdown, "show", "hide")
        preview.innerHTML = compiled.innerHTML;
        return
    }
    toggle_class(preview, "show", "hide");
    toggle_class(overlay, "show", "hide");
}

//---------------------------MARKDOWN-------------------------------
function load_markdown(){
    let markdown_elements = document.getElementsByClassName("markdown")
    toggle_class(toolbar, "hide", "show-flex")
    toggle_class(plain_toolbar, "show-flex", "hide")
    toggle_class(plain_editor, "show", "hide")

    for (let i = 0; i < markdown_elements.length; i++){
        toggle_class(markdown_elements[i], "hide", "show")
    }

    let input_text = plain_editor.innerHTML
    var converter = new showdown.Converter()
    input_text = converter.makeMarkdown(input_text)
    text.value = input_text
    set_markdown()
    return
}

function load_plain(){
    let markdown_elements = document.getElementsByClassName("markdown")
    let input_text = compiled.innerHTML
    
    toggle_class(plain_toolbar, "hide", "show-flex")
    toggle_class(toolbar, "show-flex", "hide")
    toggle_class(plain_editor, "hide", "show")

    for (let i = 0; i < markdown_elements.length; i++){
            toggle_class(markdown_elements[i], "show", "hide")
    }
    plain_editor.innerHTML = input_text
}

function toggle_markdown(){
    open_dropdown_menu()
    if (toolbar.classList.contains("hide")){
        console.log("BECOME")
        load_markdown()
        return
    }
    console.log("REMOVE")
    load_plain()
}

function set_markdown(){
    let converter = new showdown.Converter()
    compiled.innerHTML = converter.makeHtml(text.value) 
}


//-------------------------LOGIC------------------------

if (load_local() == null){ NOTES = [] }
else{ NOTES = load_local() }

if (localStorage.getItem("index") == null){ INDEX = 0 }
else{ INDEX = localStorage.getItem("index") }

if (NOTES.length <= 0){
    add_note()
    console.log("ADD")
    INDEX = 0
}

update_notes()
get_note(INDEX)


DARK_MODE = localStorage.getItem("dark-mode")
if (DARK_MODE != "true"){
    toggle_dark()
}

toggle_class(dropdown, "show", "hide")
set_markdown()

text.addEventListener("input", function () { set_markdown() })
setInterval(function () { save_note(INDEX) }, 100)
handle_click()

