"use strict";

/*zakladni cena*/
function getCar() {
  let car = document.querySelector("#car").value;
  return car;
}

/*priplatek za barvu*/
function getColor(zakladniCena) {
  let color = document.getElementsByName("color");
  let colorPrice = 0;
  for (let i = 0; i < color.length; i++) {
    if (color[i].checked) {
      let chColor = color[i].value;
      switch (chColor) {
        case "lak":
          colorPrice = zakladniCena * 0.05;
          break;
        case "metal":
          colorPrice = zakladniCena * 0.07;
          break;
        default:
          colorPrice = Number(0);
      }
    }
  }
  return colorPrice;
}

/*priplatek za vybaveni*/
function getAddons(zakladniCena) {
  let addon = document.getElementsByName("vybava");
  let addonPrice = 0;
  for (let i = 0; i < addon.length; i++) {
    if (addon[i].checked) {
      let chAddon = addon[i].value;
      switch (chAddon) {
        case "parcCam":
          addonPrice += 10000;
          break;
        case "wheels":
          addonPrice += 20000;
          break;
        case "leather":
          addonPrice += 50000;
          break;
        case "tuning":
          addonPrice += (zakladniCena / 100) * 20;
          break;
        default:
          addonPrice = Number(0);
      }
    }
  }
  return addonPrice;
}
/*kontrola cen*/
function checkPrices(limitCena, celkovaCena) {
  let msg = "";
  if (limitCena < celkovaCena) {
    msg = ` Vami zadana cena je o ${
      celkovaCena - limitCena
    } nizsi nez cena automobilu.`;
  } else if (limitCena > celkovaCena) {
    msg = `Vami zadana cena je o ${
      limitCena - celkovaCena
    } vyssi nez cena automobilu.`;
  } else {
    msg = `Vami zadana cena je stejna jako cena automobilu`;
  }
  return msg;
}

let vstupy = document.querySelectorAll(".input");
vstupy.forEach((vstup) => {
  vstup.addEventListener("input", () => {
    let zakladniCena = getCar();
    let limitCena = Number(document.querySelector("#expected").value);
    let celkovaCena = 0;
    let priceInfo = document.querySelector("#priceInfo");
    let priceInfo2 = document.querySelector("#outputVyslCena");
    priceInfo.innerHTML = ``;

    celkovaCena +=
      Number(zakladniCena) +
      Number(getColor(zakladniCena)) +
      Number(getAddons(zakladniCena));
    priceInfo.innerHTML = checkPrices(limitCena, celkovaCena);
    priceInfo2.innerHTML = `Vysledna cena automobilu je ${celkovaCena}`;
  });
});

let odeslat = document.querySelector("#submit");
odeslat.addEventListener("click", (e) => {
  e.preventDefault();
  let email = document.querySelector("#email").value;
  let form = document.querySelector("#order");
  if (email.includes("@")) {
    form.submit();
  }
  document.querySelector(
    "#error"
  ).innerText = `Zadejte platnou emailovou adresu!`;
});
