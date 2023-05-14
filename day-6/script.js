var div1 = document.getElementById("1"),
    div2 = document.getElementById("2"),
    div3 = document.getElementById("3"),
    div4 = document.getElementById("4"),
    curentStorypart = 0;
const story = {
    0: ``,
    1: `wellcome to the danger sone`,
    2: `"you are curently the only one seeing this" the comander told you, as you wer looking at some clasefide documents.`,
    3: `'why am I looking at theas documents comander, my rank is way to low to be alowd to read this?' you ask the comander.`,
    4: `"the reason you are looking at theas documents is becuse you are the mote cualifide at the moment" he tels you`,
};

div1.innerHTML = `<p id="text1" class="div-text"></p>`;
var textEntry = document.getElementById("text1");
function divclickd(presdDiv) {
    switch (presdDiv.id) {
        case "1":
            break;
        case "2":
            curentStorypart--;
            textEntry.innerHTML = story[curentStorypart];
            break;
        case "3":
            break;
        case "4":
            curentStorypart++;
            textEntry.innerHTML = story[curentStorypart];
            break;
        default:
            console.error(`${presdDiv.id} is not a div`);
    }
}
