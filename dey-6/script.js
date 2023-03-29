var div1 = document.getElementById("1"),
    div2 = document.getElementById("2"),
    div3 = document.getElementById("3"),
    div4 = document.getElementById("4");

div1.innerHTML = `<p id="text1" class="div-text"></p>`;
var textEntry = document.getElementById("text1");
function divclickd(presdDiv) {
    switch (presdDiv.id) {
        case "1":
            console.log("sucses");

            break;
        case "2":
            console.log("sucses");
            break;
        case "3":
            console.log("sucses");
            break;
        case "4":
            console.log("sucses");
            textEntry.innerHTML = `hello so is this working?<br>`;
            break;
        default:
            console.error(`${presdDiv.id} is not a div`);
    }
}
