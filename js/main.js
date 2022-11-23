let cardNumber, cardholderName, expDateMonth, expDateYear, cardCvc;
let name, number, month, year, cvc;
let nameValid, numberValid, monthValid, yearValid, cvcValid;
let textOnly, tooShort, numbersOnly, blankDate, blankCvc;
let thanks, form;
let confirmBtn, continueBtn;


const main = () => {
	prepareDOMElements();
	prepareDOMEvents();
};

const prepareDOMElements = () => {
	//pobieram elementy i wywołuję funkcje
	cardNumber = document.querySelector(".card__front-cardNumber");
	cardholderName = document.querySelector(".card__front-details-cardholderName");
	expDateMonth = document.querySelector(".card__front-details-expDateMonth");
	expDateYear = document.querySelector(".card__front-details-expDateYear");
	cardCvc = document.querySelector(".card__back-cvc");

	name = document.querySelector("#cardholderName");
	number = document.querySelector("#cardNumber");
	month = document.querySelector("#expDateMonth");
	year = document.querySelector("#expDateYear");
	cvc = document.querySelector("#cvc");

	textOnly = document.querySelector("#errorTextOnly");
	tooShort = document.querySelector("#errorTooShort");
	numbersOnly = document.querySelector("#errorNumbersOnly");
	blankDate = document.querySelector("#errorBlankDate");
	blankCvc = document.querySelector("#errorBlankCvc");

	confirmBtn = document.querySelector(".confirm-btn");
	continueBtn = document.querySelector(".continue-btn");

	thanks = document.querySelector(".completed");
	form = document.querySelector(".main__article-box");
};

const prepareDOMEvents = () => {
	//nadaje nasłuchiwanie
	confirmBtn.addEventListener("click", changeAll);
	continueBtn.addEventListener("click", refresh);
};

const changeAll = () => {
	changeName();
	changeNumber();
	changeCvc();
    changeExpData();
	showThanks();
};

const changeName = () => {
	const reg = /^[a-zA-ZąęćżźńłóśĄĆĘŁŃÓŚŹŻ\s]{2,}$/;
	if (name.value !== "" && reg.exec(name.value)) {
		cardholderName.textContent = name.value;
		textOnly.classList.add("unactive");
        nameValid = true;
	} else if (name.value == "") {
		textOnly.classList.remove("unactive");
		textOnly.textContent = "Can't be blank";
		name.classList.add("error");
	} else {
		textOnly.classList.remove("unactive");
		name.classList.add("error");
	}
};

const changeNumber = () => {
	const reg = /^[0-9]+$/;
	
	if (
		number.value !== "" &&
		reg.exec(number.value) &&
		number.value.length == 16
	) {
        let numberInput = number.value;
		let dividedNumberInput = numberInput.substring(0,16);
        let cardNumberSections = dividedNumberInput.match(/\d{1,4}/g);
        dividedNumberInput = cardNumberSections.join(" ")

		cardNumber.textContent = dividedNumberInput;
		tooShort.classList.add("unactive");
		numbersOnly.classList.add("unactive");
		number.classList.remove("error");
        numberValid = true
	} else if (number.value == "") {
		tooShort.classList.remove("unactive");
		tooShort.textContent = "Can't be blank";
		numbersOnly.classList.add("unactive");
		number.classList.add("error");
        numberValid = false
	} else if (
		number.value !== "" &&
		number.value.length < 16 &&
		reg.exec(number.value)
	) {
		tooShort.classList.remove("unactive");
		numbersOnly.classList.add("unactive");
		number.classList.add("error");
        numberValid = false
	} else {
		numbersOnly.classList.remove("unactive");
		number.classList.add("error");
		tooShort.classList.add("unactive");
        numberValid = false
	}
}

const changeCvc = () => {
	const reg = /^[0-9]+$/;
	if (cvc.value !== "" && reg.exec(cvc.value) && cvc.value.length == 3) {
		cardCvc.textContent = cvc.value;
		blankCvc.classList.add("unactive");
        cvc.classList.remove('error')
        cvcValid = true;
	} else if (cvc.value == "") {
		blankCvc.classList.remove("unactive");
        cvc.classList.add('error')
        cvcValid = false;
	} else if (cvc.value !== "" && reg.exec(cvc.value) && cvc.value.length <3 ) {
        blankCvc.classList.remove("unactive");
		blankCvc.textContent = "Too short";
        cvc.classList.add('error')
        cvcValid = false;
    } else {
		blankCvc.classList.remove("unactive");
		blankCvc.textContent = "Wrong format";
        cvc.classList.add('error')
        cvcValid = false;
	}
};

const changeExpData = () => {
    let months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]

	if (month.value !== "" && months.includes(month.value) && month.value.length == 2) {
		expDateMonth.textContent = month.value
        monthValid = true
		month.classList.remove('error')
	} else if (month.value !== "" && !months.includes((month.value))) {
		blankDate.classList.remove('unactive')
        blankDate.textContent = 'Wrong format'
        monthValid = false
		month.classList.add('error')
	} else {
		blankDate.classList.remove('unactive')
        monthValid = false
		month.classList.add('error')
	}


    if (year.value !=="" && year.value.length == 2) {
        expDateYear.textContent = year.value
        yearValid = true
		year.classList.remove('error')
    } else {
        blankDate.classList.remove('unactive')
        yearValid = false
		year.classList.add('error')
    }
}

const showThanks = () => {
    if (nameValid == true && numberValid == true && cvcValid == true && monthValid == true && yearValid == true) {
    setTimeout(showThanks, 1000)
	thanks.classList.remove("unactive");
	form.classList.add("unactive")
}
}

const refresh = () => {
    window.location.reload()
}

document.addEventListener("DOMContentLoaded", main);
