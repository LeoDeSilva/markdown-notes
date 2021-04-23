let dropdown = document.getElementById("dropdown");
let postits = document.getElementById("notes")

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

function open_notes(){
    window.location = "index.html"
}

function handle_click(){
    $(window).click(function() {
        toggle_class(dropdown, "show", "hide")

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

function add_postit(){
    let colors = ["pink", "blue", "cream", "yellow"]
    let color = colors[Math.floor(Math.random() * 4)]; 
    let x = Math.floor(Math.random() * 150)+10
    let y = Math.floor(Math.random() * 50)+5
    postits.innerHTML += `<div contenteditable='true' class='postit ${color}' style="left: ${x}vh; top:${y}vh;" id='notes' cols='30' rows='10'></div>`

    $(".postit").each(function() {
        $(this).draggable()
    });
    notes = postits.childNodes
    for (let i = 0; i < notes.length; i++){
        notes[i].addEventListener("dblclick", function(e) {
            e.target.remove()
        })
    }

}

function save_postits(){
    localStorage.setItem("postits", postits.innerHTML)
}

DARK_MODE = localStorage.getItem("dark-mode")
if (DARK_MODE != "true"){
    toggle_dark()
}

dropdown.classList.remove("show");
dropdown.classList.add("hide")


handle_click()

let DRAGS = ""
add_postit()

notes = postits.childNodes
for (let i = 0; i < notes.length; i++){
    notes[i].addEventListener("dblclick", function(e) {
        e.target.remove()
        console.log("REMO")
    })
}