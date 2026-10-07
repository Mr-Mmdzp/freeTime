const langMenu = document.getElementById("langMenu");
const langToggle = document.getElementById("langToggle");
const currentLang = document.getElementById("currentLang");
const dynamicT = document.querySelectorAll(".dynamic");
const langDrop = document.querySelector(".lang-dropdown");

const groupBtns = document.querySelectorAll(".groupBtn");

const randomBtn = document.getElementById("randomBtn");

const elementNumber = document.getElementById("elementNumber");
const elementSymbol = document.getElementById("elementSymbol");
const elementName = document.getElementById("elementName");

const nameInput = document.getElementById("nameInput");
const atomicInput = document.getElementById("atomicInput");

const checkBtn = document.getElementById("checkBtn");
const result = document.getElementById("result");


let group = "G1";
let currentElement = null;


const elements = {

    G1: [
        { symbol: "H", name: "هیدروژن", atomicNumber: 1 },
        { symbol: "Li", name: "لیتیوم", atomicNumber: 3 },
        { symbol: "Na", name: "سدیم", atomicNumber: 11 },
        { symbol: "K", name: "پتاسیم", atomicNumber: 19 },
        { symbol: "Rb", name: "روبیدیم", atomicNumber: 37 },
        { symbol: "Cs", name: "سزیم", atomicNumber: 55 },
        { symbol: "Fr", name: "فرانسیوم", atomicNumber: 87 }
    ],

    G2: [
        { symbol: "Be", name: "بریلیم", atomicNumber: 4 },
        { symbol: "Mg", name: "منیزیم", atomicNumber: 12 },
        { symbol: "Ca", name: "کلسیم", atomicNumber: 20 },
        { symbol: "Sr", name: "استرانسیم", atomicNumber: 38 },
        { symbol: "Ba", name: "باریم", atomicNumber: 56 },
        { symbol: "Ra", name: "رادیم", atomicNumber: 88 }
    ],

    G18: [
        { symbol: "He", name: "هلیوم", atomicNumber: 2 },
        { symbol: "Ne", name: "نئون", atomicNumber: 10 },
        { symbol: "Ar", name: "آرگون", atomicNumber: 18 },
        { symbol: "Kr", name: "کریپتون", atomicNumber: 36 },
        { symbol: "Xe", name: "زنون", atomicNumber: 54 },
        { symbol: "Rn", name: "رادون", atomicNumber: 86 },
        { symbol: "Og", name: "اوگانسون", atomicNumber: 118 }
    ]

};


// =========================
// LANGUAGE
// =========================

langToggle.addEventListener("click", () => {

    langMenu.classList.toggle("open");

});


document.addEventListener("click", (e) => {

    if (!langMenu.contains(e.target)) {
        langMenu.classList.remove("open");
    }

});


langDrop.addEventListener("click", (e) => {

    const option = e.target.closest(".lang-option");

    if (!option) return;


    if (option.classList.contains("fa")) {

        dynamicT.forEach(element => {

            if (element.tagName === "INPUT") {
                element.placeholder = element.dataset.persian;
            } else {
                element.textContent = element.dataset.persian;
            }

        });

        document.documentElement.lang = "fa";
        document.documentElement.dir = "rtl";

        currentLang.textContent = "فارسی";

    }


    if (option.classList.contains("en")) {

        dynamicT.forEach(element => {

            if (element.tagName === "INPUT") {
                element.placeholder = element.dataset.english;
            } else {
                element.textContent = element.dataset.english;
            }

        });

        document.documentElement.lang = "en";
        document.documentElement.dir = "ltr";

        currentLang.textContent = "English";

    }

    langMenu.classList.remove("open");

});


// =========================
// GROUP SELECTION
// =========================

groupBtns.forEach(button => {

    button.addEventListener("click", () => {

        groupBtns.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");


        if (button.classList.contains("group1")) {
            group = "G1";
        }

        else if (button.classList.contains("group2")) {
            group = "G2";
        }

        else if (button.classList.contains("group18")) {
            group = "G18";
        }


        // Reset current quiz

        currentElement = null;

        elementNumber.textContent = "??";
        elementSymbol.textContent = "?";
        elementName.textContent = "???";

        nameInput.value = "";
        atomicInput.value = "";

        result.textContent = "";

    });

});


// =========================
// RANDOM ELEMENT
// =========================

randomBtn.addEventListener("click", () => {

    const groupElements = elements[group];

    const randomIndex =
        Math.floor(Math.random() * groupElements.length);

    currentElement = groupElements[randomIndex];


    elementNumber.textContent = "??";

    elementSymbol.textContent = currentElement.symbol;

    elementName.textContent = "???";


    nameInput.value = "";
    atomicInput.value = "";

    result.textContent = "";

});


// =========================
// CHECK ANSWER
// =========================

checkBtn.addEventListener("click", () => {

    if (!currentElement) {

        result.textContent = "اول یک عنصر تصادفی انتخاب کن.";

        return;
    }


    const userName =
        nameInput.value.trim();

    const userAtomicNumber =
        atomicInput.value.trim();


    const correctName =
        userName === currentElement.name;

    const correctAtomicNumber =
        userAtomicNumber === String(currentElement.atomicNumber);


    if (correctName && correctAtomicNumber) {

        result.textContent =
            "🎉 آفرین! هر دو جواب درست هستند.";

        result.className = "success";

    }

    else if (correctName || correctAtomicNumber) {

        result.textContent =
            "🟡 نصفش درست بود! دوباره تمرین کن.";

        result.className = "partial";

    }

    else {

        result.textContent =
            "❌ هر دو جواب اشتباه هستند.";

        result.className = "wrong";

    }

});