var mony = 0,
    monyPerClick = 1,
    reberth = 1,
    monyText = document.getElementById("monyText"),
    monyOnClickText = document.getElementById("monyOnClickText"),
    reberthText = document.getElementById("reberthText"),
    printerText = document.getElementById("printerText"),
    //this is the sotend term for getMoreMonyOnClickUpgrade.
    gMMOCU = 50,
    reberthUpgradeCost = 100000,
    monyPerSec = 0,
    printerInterval = 60,
    gameTik = 0,
    amountOfPrinters = [],
    printerCost = 500,
    printerIntervalUpgradePrise = 1000,
    monyPerClickPower = 0.5;
var monyNeededToUpgradePrinterPower = calculatePrintierLevels() * 100;
const button1 = document.getElementById("B1"),
    button2 = document.getElementById("B2"),
    button3 = document.getElementById("B3"),
    button4 = document.getElementById("B4"),
    button5 = document.getElementById("B5");
function gameUpdate() {
    monyText.innerHTML = `<p>Mony:<strong> ${mony}$</strong></p>`;
    monyOnClickText.innerHTML = `<p>Mony Per Click: <strong>${monyPerClick}$</strong>, Mony Per Click uppgrade cost: ${gMMOCU}$</p>`;
    reberthText.innerHTML = `<p>Reberths: <strong>${reberth}</strong>, Reberth cost: <strong>${reberthUpgradeCost}$</strong></p>`;
    printerText.innerHTML = `<p>Printers: <strong>${
        amountOfPrinters.length
    }</strong>, Printer cost: <strong>${printerCost}</strong>, Printer interval: <strong>${gameTik}/${printerInterval}</strong>, Printer interval prise:<strong> ${printerIntervalUpgradePrise}</strong>, Printing amount: <strong>${calculatePrintingAmount()}</strong>, next Printer upgrade cost: <strong>${
        calculatePrintierLevels() * 100
    }</strong></p>`;
    updatedButtonState();
}
function updatedButtonState() {
    if (mony >= gMMOCU) {
        button1.className = "button-activety-can-buy-upgrade";
    } else {
        button1.className = "button-activety-can-not-buy-upgrade";
    }
    if (mony >= printerCost) {
        button2.className = "button-activety-can-buy-upgrade";
    } else {
        button2.className = "button-activety-can-not-buy-upgrade";
    }
    if (mony >= printerIntervalUpgradePrise) {
        button3.className = "button-activety-can-buy-upgrade";
    } else {
        button3.className = "button-activety-can-not-buy-upgrade";
    }
    if (mony >= monyNeededToUpgradePrinterPower && amountOfPrinters.length != 0) {
        button4.className = "button-activety-can-buy-upgrade";
    } else {
        button4.className = "button-activety-can-not-buy-upgrade";
    }
    if (mony >= reberthUpgradeCost) {
        button5.className = "button-activety-can-buy-upgrade";
    } else {
        button5.className = "button-activety-can-not-buy-upgrade";
    }
}
function timeItems() {
    gameTik++;
    if (gameTik >= printerInterval) {
        monyPrinter(3);
        console.log("time items working!!");
        gameTik = 0;
    }
}
function gameStart() {
    gameUpdate();
    let interval = 1000;
    setInterval(() => {
        timeItems();
        gameUpdate();
        console.log("game has been updated");
    }, interval);
}
function getMony() {
    mony += monyPerClick;
    gameUpdate();
}
function getMoreMonyOnClick() {
    if (mony >= gMMOCU) {
        mony -= gMMOCU;
        monyPerClick += monyPerClickPower;
        gMMOCU += 50;
    } else {
        alert(`not enough mony, you need ${gMMOCU}`);
    }
    gameUpdate();
}
function reborn() {
    if (mony >= reberthUpgradeCost) {
        mony = 0;
        monyPerClick = 1;
        monyPerClick += reberth;
        monyPerClickPower += 0.5;
        reberth += 1;
        gMMOCU = 50;
        reberthUpgradeCost += reberthUpgradeCost;
        printerInterval = 60;
        amountOfPrinters = [];
        printerCost = 500;
    } else {
        alert(`not enough mony, you need ${reberthUpgradeCost}`);
    }
    gameUpdate();
}
function monyPrinter(option) {
    switch (option) {
        case 1:
            // thes is for buying more printers.
            if (mony >= printerCost) {
                let newPrinter = new printer();
                amountOfPrinters.push(newPrinter);
                console.log(amountOfPrinters);
                mony -= printerCost;
            }
            break;
        case 2:
            // theis is for decrising the print time to a minimum of 1 second.
            if (mony >= printerIntervalUpgradePrise) {
                printerInterval--;
                mony -= printerIntervalUpgradePrise;
                printerIntervalUpgradePrise += printerIntervalUpgradePrise * 5;
            } else {
                alert(`not enough mony you need ${printerIntervalUpgradePrise}`);
            }

            break;
        case 3:
            // this is for all the printers to print.
            for (let i = 0; i < amountOfPrinters.length; i++) {
                amountOfPrinters[i].printMony();
            }
            break;
        case 4:
            // this is for the amount they print.
            monyNeededToUpgradePrinterPower = calculatePrintierLevels() * 100;
            if (mony >= monyNeededToUpgradePrinterPower) {
                for (let i = 0; i < amountOfPrinters.length; i++) {
                    if (amountOfPrinters[i].level != 100) {
                        amountOfPrinters[i].upgradePrinter();
                    }
                }
                mony -= monyNeededToUpgradePrinterPower;
            } else {
                alert(`not enough mony you need ${monyNeededToUpgradePrinterPower}`);
            }
            monyNeededToUpgradePrinterPower = calculatePrintierLevels() * 100;
            break;
        default:
            console.error(`no valid option chosen ${option} is not valid`);
    }
    gameUpdate();
}
function calculatePrintingAmount() {
    let totalPrintAmount = 0;
    for (let i = 0; i < amountOfPrinters.length; i++) {
        totalPrintAmount += amountOfPrinters[i].level;
    }
    return totalPrintAmount;
}
function calculatePrintierLevels() {
    let totalPrinterLevels = 0;
    for (let i = 0; i < amountOfPrinters.length; i++) {
        if (amountOfPrinters[i].level < 100) {
            totalPrinterLevels += amountOfPrinters[i].level;
        }
    }
    return totalPrinterLevels;
}
class printer {
    totalMonyGenarated = 0;
    printAmount = 1;
    level = 1;
    printMony() {
        mony += this.printAmount;
        this.totalMonyGenarated += this.printAmount;
    }
    upgradePrinter() {
        this.level++;
        this.printAmount++;
    }
}

window.onload = gameStart();
