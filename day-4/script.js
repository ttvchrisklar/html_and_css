var mony = 0,
    monyPerClick = 1,
    reberth = 1,
    monyText = document.getElementById("monyText"),
    reberthText = document.getElementById("reberthText"),
    //this is the sotend term for getMoreMonyOnClickUpgrade.
    gMMOCU = 50,
    reberthUpgradeCost = 100000,
    monyPerSec = 0,
    printerInterval = 60,
    gameTik = 0,
    amountOfPrinters = [],
    printerCost = 500,
    printerIntervalUpgradePrise = 1000,
    monyPerClickPower = 0.5,
    monyNeededToUpgradePrinterPower = calculatePrintierLevels() * 100,
    printerTik = 0,
    playtiem = { sec: 0, muinet: 0, houer: 0, day: 0 };
const button1 = document.getElementById("B1"),
    button2 = document.getElementById("B2"),
    button3 = document.getElementById("B3"),
    button4 = document.getElementById("B4"),
    button5 = document.getElementById("B5"),
    gMMOCUText = document.getElementById("gMMOCUText"),
    BuyAPrinter = document.getElementById("BuyAPrinter"),
    Fasterprinting = document.getElementById("Fasterprinting"),
    MorePrintingPower = document.getElementById("MorePrintingPower"),
    mainButton = document.getElementById("mainButton"),
    playTiemText = document.getElementById("playTiemText");
function gameUpdate() {
    monyText.innerHTML = `Mony:<strong> ${mony}$</strong>`;
    gMMOCUText.innerHTML = `Mony Per Click: <strong>${monyPerClick}$</strong>, Mony Per Click uppgrade cost: ${gMMOCU}$`;
    reberthText.innerHTML = `Reberths: <strong>${reberth}</strong>, Reberth cost: <strong>${reberthUpgradeCost}$</strong>`;
    updatedButtonState();
    BuyAPrinter.innerHTML = `Printers: <strong>${amountOfPrinters.length}</strong>, Printer cost: <strong>${printerCost}</strong>`;
    Fasterprinting.innerHTML = `Printer interval: <strong>${printerTik}/${printerInterval}</strong>, Printer interval prise:<strong> ${printerIntervalUpgradePrise}</strong>`;
    MorePrintingPower.innerHTML = `Printing amount: <strong>${calculatePrintingAmount()}</strong>, next Printer upgrade cost: <strong>${calculatePrintierLevels() * 100}</strong>`;
    if (amountOfPrinters.length != 0) {
        revileButtonsOrHideThem(1);
    } else {
        revileButtonsOrHideThem(2);
    }
    playTiemText.innerHTML = `play Time: ${playtiem.sec}, ${playtiem.muinet}, ${playtiem.houer}, ${playtiem.day}`;
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
    printerTik++;
    playtiem.sec++;
    if (printerTik >= printerInterval) {
        monyPrinter(3);
        printerTik = 0;
        if (amountOfPrinters.length >= 1) {
            mainButton.style = "background-color: red; box-shadow: 0 5px black; transform: translateY(4px);";
            setTimeout(() => {
                mainButton.style = "";
            }, 10);
        }
    }
    if (gameTik >= 60) {
        gameTimekeeper();
        gameTik = 0;
    }
}
function gameTimekeeper() {
    if (playtiem.sec >= 60) {
        playtiem.sec = 0;
        playtiem.muinet++;
        console.log(playtiem);
        if (playtiem.muinet >= 60) {
            playtiem.muinet = 0;
            playtiem.houer++;
            if (playtiem.houer >= 24) {
                playtiem.houer = 0;
                playtiem.day++;
            }
        }
    }
}
function gameTimer() {
    gameUpdate();
    let interval = 1000;
    setInterval(() => {
        gameUpdate();
        timeItems();
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
class bank {
    totalAmountofMonyInBankAcount = 0;
    rentOnTheAcount = 1.01;
    intrestOnSavings = 1.3;
    maxAcountCap = 1000000;

    insertMony() {}
    extacktMony() {}
    intrestcalculater() {
        this.totalAmountofMonyInBankAcount += this.totalAmountofMonyInBankAcount * this.intrestOnSavings;
    }
    rentcalculater() {
        this.totalAmountofMonyInBankAcount -= this.totalAmountofMonyInBankAcount * this.rentOnTheAcount;
    }
    incresMaxStoreAmount() {}
}
function revileButtonsOrHideThem(buttonToRevileOrHide) {
    switch (buttonToRevileOrHide) {
        case 1:
            //this is the printer upgrade buttons
            button3.style = "";
            button4.style = "";
            Fasterprinting.style = "";
            MorePrintingPower.style = "";
            break;
        case 2:
            //this is the printer upgrade buttons
            button3.style = "visibility: hidden;";
            button4.style = "visibility: hidden;";
            Fasterprinting.style = "visibility: hidden;";
            MorePrintingPower.style = "visibility: hidden;";
            break;
        case 3:
            break;
        case 4:
            break;

        default:
            break;
    }
}
window.onload = gameTimer();
