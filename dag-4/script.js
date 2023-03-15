var mony = 0,
    monyPerClick = 1,
    reberth = 0,
    monyText = document.getElementById("monyText"),
    monyOnClickText = document.getElementById("monyOnClickText"),
    reberthText = document.getElementById("reberthText");
function gameUpdate() {
    monyText.innerHTML = `<p>you have ${mony}$</p>`;
    monyOnClickText.innerHTML = `<p>you get ${monyPerClick}$ per click, next mony Per Click upgrade costs ${monyPerClick * 100}</p>`;
    reberthText.innerHTML = `<p>you have reberthd ${reberth} times, and need ${reberth * 1000} for next reberth</p>`;
}
function getMony() {
    mony += monyPerClick;
    gameUpdate();
}
function getMoreMonyOnClick() {
    if (mony >= monyPerClick * 100) {
        mony -= monyPerClick * 100;
        monyPerClick++;
    } else {
        alert(`not enough mony, you need ${monyPerClick * 100}`);
    }
    gameUpdate();
}
function roborn() {
    if (mony >= 1000 * reberth) {
        mony = 0;
        monyPerClick = 1;
        reberth += 1;
    } else {
        alert(`not enough mony, you need ${1000 * reberth}`);
    }
    gameUpdate();
}
