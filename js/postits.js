let dropdown = document.getElementById("dropdown");
let postits = document.getElementById("notes")

let z_index = 101 
let NOTES 
let INDEX

//--------------------------LOCAL STORAGE---------------------------
function save_local(){
    localStorage.setItem("notes", JSON.stringify(NOTES))
    localStorage.setItem("index", INDEX)
}

function load_local(){
    return JSON.parse(localStorage.getItem("notes"))
}

function save_postits(){
    localStorage.setItem("postits", postits.innerHTML)
		console.log("SAE")
}

function load_postits(){
    return localStorage.getItem("postits")
}

//--------------------------TOGGLES-------------------------------

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

function update_postits(){
    $(".postit").each(function() {
        $(this).draggable()
    });
    notes = postits.childNodes
    for (let i = 0; i < notes.length; i++){
        notes[i].addEventListener("click", function(e) {
            e.target.style.zIndex = z_index
            z_index += 1;
            console.log(z_index)
        })
        notes[i].addEventListener("dblclick", function(e) {
            e.target.remove()
        })
    }
}

function add_postit(){
    let colors = ["pink", "blue", "cream", "yellow"]
    let color = colors[Math.floor(Math.random() * 4)]; 
    let x = Math.floor(Math.random() * 150)+10
    let y = Math.floor(Math.random() * 50)+5
    postits.innerHTML += `<div contenteditable='true' class='postit ${color}' style="left: ${x}vh; top:${y}vh;" id='notes' cols='30' rows='10'></div>`
		
		update_postits()
}

function handle_click(){
    $(window).click(function() {
        toggle_class(dropdown, "show", "hide")
    });
    $('#dropdown').click(function(event){
			event.stopPropagation();
    });
    $('#profile').click(function(event){
			event.stopPropagation();
    });
}


//-------------------------LOGIC---------------------------

DARK_MODE = localStorage.getItem("dark-mode")
if (DARK_MODE != "true"){
    toggle_dark()
}

if (load_postits() == null){
    add_postit()
}else{
    postits.innerHTML = load_postits()
}

toggle_class(dropdown, "show", "hide")
handle_click()
update_postits()
setInterval(save_postits, 100)

