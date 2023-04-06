        var newMoney = 0;
        var newMoneyValue = 1;
        var MoneyElement = document.getElementById("moneyValue");
        var Money = parseInt(MoneyElement.innerHTML);

        var autoInterval = null;
        var newAuto = 0;
        var tempAuto = 0;
        var autoElement = document.getElementById("autoValue");
        var autoCost = 10;
        var autoCostElement = document.getElementById("autoCost");

        var newCabang = 0;
        var cabangElement = document.getElementById("cabangValue");
        var cabangCost = 50;
        var cabangCostElement = document.getElementById("cabangCost");

        var levelHealing = 0;
        var healingElement = document.getElementById("healingValue");
        var hargaHealing = 500;
        var upgradeHealingCost = 1000;
        var upgradeHealingCostElement = document.getElementById("upgradeHealingCost");
        var requestHealing = 0;
        var pembeliHealingElement = document.getElementById("pembeliHealing");
        var hargaHealingElement = document.getElementById("sellHealing");

        var levelInvisibility = 0;
        var invisibilityElement = document.getElementById("invisibilityValue");
        var hargaInvisibility = 1000;
        var upgradeInvisibilityCost = 2000;
        var upgradeInvisibilityCostElement = document.getElementById("upgradeInvisibilityCost");
        var requestInvisibility = 0;
        var pembeliInvisibilityElement = document.getElementById("pembeliInvisibility");
        var hargaInvisibilityElement = document.getElementById("sellInvisibility");

        var levelLove = 0;
        var loveElement = document.getElementById("loveValue");
        var hargaLove = 1500;
        var upgradeLoveCost = 3000;
        var upgradeLoveCostElement = document.getElementById("upgradeLoveCost");
        var requestLove = 0;
        var pembeliLoveElement = document.getElementById("pembeliLove");
        var hargaLoveElement = document.getElementById("sellLove");

        const myButton = document.getElementById("spriteClick");

        var backgroundMusic = document.getElementById("background-music");
        var playButton = document.getElementById("play-button");
        var playIcon = document.getElementById("play-icon");

        function spriteClick() {
            Money += newMoneyValue;
            const audio = document.getElementById("money-sound");
            audio.volume = 0.4;
            audio.currentTime = 0;
            audio.play();
            updateMoney();

            var coin = document.createElement("div");
            coin.className = "coin";
            document.body.appendChild(coin);
            setTimeout(function() {
                coin.style.left = moneyJar.offsetLeft + moneyJar.offsetWidth / 2 - coin.offsetWidth / 2 + "px";
                coin.style.top = moneyJar.offsetTop + moneyJar.offsetHeight / 2 - coin.offsetHeight / 2 + "px";
            }, 100);
            setTimeout(function() {
                coin.parentNode.removeChild(coin);
            }, 1100);
        }

        function updateMoney() {
            MoneyElement.innerHTML = Money.toString();
        }

        jamIstirahat.onclick = function() {
            if (newAuto > 0) {
                if (autoInterval) {
                    clearInterval(autoInterval);
                    autoInterval = null;
                }
                tempAuto = newAuto;
                newAuto = 0;
                document.getElementById("jamIstirahat").innerHTML = "Mulai Kerja";
                title = document.getElementById("jamIstirahat");
                title.setAttribute("title", "Budak akan mulai bekerja lagi");
            } else {
                newAuto = tempAuto;
                tempAuto = 0;
                document.getElementById("jamIstirahat").innerHTML = "Jam Istirahat";
                if (newAuto > 0 && !autoInterval) {
                    autoInterval = setInterval(autoMoney, 5000 / newAuto);
                }
            }
        };

        function autoMoney() {
            Money += newMoneyValue;
            const audio = document.getElementById("money-sound");
            audio.volume = 0.3;
            audio.currentTime = 0;
            audio.play();
            updateMoney();
        }

        function buyAuto() {
            if (Money < autoCost) {
                alert("Uang tidak cukup untuk membeli Budak");
            } else {
                Money -= autoCost;
                const audio = document.getElementById("buying-sound");
                audio.volume = 0.4;
                audio.currentTime = 0;
                audio.play();
                autoCost = autoCost * 2;
                autoCostElement.innerHTML = "Cost: " + autoCost.toString();
                updateMoney();
                newAuto++;
                autoElement.innerHTML = "Budak: " + newAuto.toString();
                clearInterval(autoInterval); // clear previous interval
                if (newAuto > 0) {
                    autoInterval = setInterval(autoMoney, 5000 / newAuto);
                }
            }
        }

        function buyCabang() {
            if (Money < cabangCost) {
                alert("Uang tidak cukup untuk menyewa Penglaris");
            } else {
                Money -= cabangCost;
                const audio = document.getElementById("buying-sound");
                audio.volume = 0.4;
                audio.currentTime = 0;
                audio.play();
                cabangCost = cabangCost * 2;
                cabangCostElement.innerHTML = "Cost: " + cabangCost.toString();
                updateMoney();
                newMoneyValue = newMoneyValue * 2;
                newCabang++;
                cabangElement.innerHTML = "Sewa Penglaris: " + newCabang.toString();
            }
        }

        //healing
        function levelUpHealing() {
            if (Money < upgradeHealingCost) {
                alert("Uang tidak cukup untuk mengupgrade jualan Healing");
            } else {
                Money -= upgradeHealingCost;
                const audio = document.getElementById("buying-sound");
                audio.volume = 0.4;
                audio.currentTime = 0;
                audio.play();
                updateMoney();
                upgradeHealingCost = upgradeHealingCost * 2;
                upgradeHealingCostElement.innerHTML = "Upgrade Cost: " + upgradeHealingCost.toString();
                levelHealing++;
                healingElement.innerHTML = levelHealing.toString();
                hargaHealing = hargaHealing * levelHealing;
                hargaHealingElement.innerHTML = "Selling Price: " + hargaHealing.toString();
                if (levelHealing > 0) {
                    const randomIntervalHealing = Math.floor(Math.random() * 4000) + 1000;
                    setTimeout(addRequestHealing, randomIntervalHealing);
                }
            }
        }

        function addRequestHealing() {
            const randomIntervalHealing = Math.floor(Math.random() * 4000) + 1000;
            requestHealing++;
            pembeliHealingElement.innerHTML = requestHealing.toString();

            const audio = document.getElementById("healing-request-sound");
            audio.volume = 0.5;
            audio.currentTime = 0;
            audio.play();
            setTimeout(addRequestHealing, randomIntervalHealing);
        }

        function jualHealing() {
            if (requestHealing > 0) {
                requestHealing--;
                pembeliHealingElement.innerHTML = requestHealing.toString();
                Money += hargaHealing;
                const audio = document.getElementById("selling-sound");
                audio.volume = 1;
                audio.currentTime = 0;
                audio.play();
                updateMoney();
            }
        }

        //invisibility
        function levelUpInvisibility() {
            if (Money < upgradeInvisibilityCost) {
                alert("Uang tidak cukup untuk mengupgrade jualan Invisibility");
            } else {
                Money -= upgradeInvisibilityCost;
                const audio = document.getElementById("buying-sound");
                audio.volume = 0.4;
                audio.currentTime = 0;
                audio.play();
                updateMoney();
                upgradeInvisibilityCost = upgradeInvisibilityCost * 2;
                upgradeInvisibilityCostElement.innerHTML = "Upgrade Cost: " + upgradeInvisibilityCost.toString();
                levelInvisibility++;
                invisibilityElement.innerHTML = levelInvisibility.toString();
                hargaInvisibility = hargaInvisibility * levelInvisibility;
                hargaInvisibilityElement.innerHTML = "Selling Price: " + hargaInvisibility.toString();
                if (levelInvisibility > 0) {
                    const randomIntervalInvisibility = Math.floor(Math.random() * 4000) + 2000;
                    setTimeout(addRequestInvisibility, randomIntervalInvisibility);
                }
            }
        }

        function addRequestInvisibility() {
            const randomIntervalInvisibility = Math.floor(Math.random() * 4000) + 2000;
            requestInvisibility++;
            pembeliInvisibilityElement.innerHTML = requestInvisibility.toString();
            const audio = document.getElementById("invisibility-request-sound");
            audio.volume = 0.5;
            audio.currentTime = 0;
            audio.play();
            setTimeout(addRequestInvisibility, randomIntervalInvisibility);
        }

        function jualInvisibility() {
            if (requestInvisibility > 0) {
                requestInvisibility--;
                pembeliInvisibilityElement.innerHTML = requestInvisibility.toString();
                Money += hargaInvisibility;
                const audio = document.getElementById("selling-sound");
                audio.volume = 1;
                audio.currentTime = 0;
                audio.play();
                updateMoney();
            }
        }

        //love
        function levelUpLove() {
            if (Money < upgradeLoveCost) {
                alert("Uang tidak cukup untuk mengupgrade jualan Love");
            } else {
                Money -= upgradeLoveCost;
                const audio = document.getElementById("buying-sound");
                audio.volume = 0.5;
                audio.currentTime = 0;
                audio.play();
                updateMoney();
                upgradeLoveCost = upgradeLoveCost * 2;
                upgradeLoveCostElement.innerHTML = "Upgrade Cost: " + upgradeLoveCost.toString();
                levelLove++;
                loveElement.innerHTML = levelLove.toString();
                hargaLove = hargaLove * levelLove;
                hargaLoveElement.innerHTML = "Selling Price: " + hargaLove.toString();
                if (levelLove > 0) {
                    const randomIntervalLove = Math.floor(Math.random() * 4000) + 3000;
                    setTimeout(addRequestLove, randomIntervalLove);
                }
            }
        }

        function addRequestLove() {
            const randomIntervalLove = Math.floor(Math.random() * 4000) + 3000;
            requestLove++;
            pembeliLoveElement.innerHTML = requestLove.toString();
            const audio = document.getElementById("love-request-sound");
            audio.volume = 0.5;
            audio.currentTime = 0;
            audio.play();
            setTimeout(addRequestLove, randomIntervalLove);
        }

        function jualLove() {
            if (requestLove > 0) {
                requestLove--;
                pembeliLoveElement.innerHTML = requestLove.toString();
                Money += hargaLove;
                const audio = document.getElementById("selling-sound");
                audio.volume = 1;
                audio.currentTime = 0;
                audio.play();
                updateMoney();
            }
        }

        myButton.addEventListener("click", () => {
            myButton.classList.add("play-animation");
            setTimeout(() => {
                myButton.classList.remove("play-animation");
            }, 600);
        });

        playButton.onclick = function() {
            if (backgroundMusic.paused) {
                backgroundMusic.play();
                playIcon.src = "Asset/Icon/Icon_MusicOn.png";
            } else {
                backgroundMusic.pause();
                playIcon.src = "Asset/Icon/Icon_MusicOff.png";
            }
        };