const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const btn3 = document.getElementById("btn3");
const btn4 = document.getElementById("btn4");
const btn5 = document.getElementById("btn5");
const resultField = document.getElementById("result_ren");
const penaltyField = document.getElementById("result_pen");
const examField = document.getElementById("result_exam");
const sentenceField = document.getElementById("result_sentence");
const passwordField = document.getElementById("result_pass");
let checkboxesInputs = document.querySelectorAll(".calc-checkboxes-inputs");
let checkboxes = document.querySelectorAll(".checkbox-box");

checkboxes.forEach(checkboxes => checkboxes.addEventListener('click', () => {
    if(checkboxes.checked && checkboxes.id === "wallpaper"){
        checkboxesInputs[0].classList.add("calc-checkboxes-inputs");
        checkboxesInputs[0].classList.remove("calc-checkboxes-inputs-hidden");
        checkboxesInputs[1].classList.remove("calc-checkboxes-inputs");
        checkboxesInputs[1].classList.add("calc-checkboxes-inputs-hidden");
        document.getElementById("in_wallCost").value = '';
        document.getElementById("in_wallWidth").value = '';
        document.querySelector("#paint").checked = false;
    }
    else if(!checkboxes.checked && checkboxes.id === "wallpaper"){
        checkboxesInputs[0].classList.remove("calc-checkboxes-inputs");
        checkboxesInputs[0].classList.add("calc-checkboxes-inputs-hidden");
    }
    else if(checkboxes.checked && checkboxes.id === "paint"){
        checkboxesInputs[0].classList.remove("calc-checkboxes-inputs");
        checkboxesInputs[0].classList.add("calc-checkboxes-inputs-hidden");
        checkboxesInputs[1].classList.add("calc-checkboxes-inputs");
        checkboxesInputs[1].classList.remove("calc-checkboxes-inputs-hidden");
        document.getElementById("in_paintCost").value = '';
        document.getElementById("in_paintWidth").value = '';
        document.querySelector("#wallpaper").checked = false;
    }
    else if(!checkboxes.checked && checkboxes.id === "paint"){
        checkboxesInputs[1].classList.remove("calc-checkboxes-inputs");
        checkboxesInputs[1].classList.add("calc-checkboxes-inputs-hidden");
    }
}));

const calcRenov = function(){
    let inputLen = parseInt(document.getElementById("in_length").value);
    let inputWid = parseInt(document.getElementById("in_width").value);
    let inputHei = parseInt(document.getElementById("in_height").value);
    let checkWall = document.getElementById("wallpaper");
    let checkPaint = document.getElementById("paint");
    if (Number.isInteger(inputLen) && Number.isInteger(inputWid) 
    && Number.isInteger(inputHei) && (checkWall.checked || checkPaint.checked)){
        if(checkboxes[0].checked){
            let wallCost = parseInt(document.getElementById("in_wallCost").value);
            let wallWidth = parseInt(document.getElementById("in_wallWidth").value);
            if (Number.isInteger(wallCost) && Number.isInteger(wallWidth)){
                let squareRoom = (2*inputLen + 2*inputWid) * inputHei;
                let squareWallpaper = (wallWidth * inputHei);
                let resultWall = squareRoom / squareWallpaper;
                let cost = Math.ceil(resultWall) * wallCost;
                resultField.classList.remove("calc-result-hidden");
                resultField.innerHTML = 'На ремонт придётся потратить: ' + cost + ' рублей' + ' (' + Math.ceil(resultWall) + ' рулон(ов))';
            }
        }
        else if(checkboxes[1].checked){
            let paintCost = parseInt(document.getElementById("in_paintCost").value);
            let paintWidth = parseInt(document.getElementById("in_paintWidth").value);
            if (Number.isInteger(paintCost) && Number.isInteger(paintWidth)){
                let squareRoom = (2*inputLen + 2*inputWid) * inputHei;
                let squareWallpaper = (paintWidth * inputHei);
                let resultWall = squareRoom / squareWallpaper;
                let cost = Math.ceil(resultWall) * paintCost;
                resultField.classList.remove("calc-result-hidden");
                resultField.innerHTML = 'На ремонт придётся потратить: ' + cost + ' рублей' + ' (' + Math.ceil(resultWall) + ' л. краски)';
            }
        }
        else {
            resultField.classList.remove("calc-result-hidden");
            resultField.innerHTML = 'Введены некорректные данные!';
        }
    }
    else{
        resultField.classList.remove("calc-result-hidden");
        resultField.innerHTML = 'Введены некорректные данные!';
    }
}

const calcPenalty = function(){
    let inputSpeed = parseInt(document.getElementById("in_speed").value);
    let pen1 = 500;
    let pen2 = 1500;
    let pen3 = 2500;
    let pen4 = 5000;
    if(inputSpeed - 90 >= 20 && inputSpeed - 90 <= 40){
        penaltyField.classList.remove("calc-result-hidden");
        penaltyField.innerHTML = 'Ваше наказание: ' + pen1 + ' рублей!';
    }
    else if (inputSpeed - 90 >= 40 && inputSpeed - 90 <= 60){
        penaltyField.classList.remove("calc-result-hidden");
        penaltyField.innerHTML = 'Ваше наказание: ' + pen2 + ' рублей!';
    }
    else if(inputSpeed - 90 >= 60 && inputSpeed - 90 <= 80){
        penaltyField.classList.remove("calc-result-hidden");
        penaltyField.innerHTML = 'Ваше наказание: ' + pen3 + ' рублей. Или лишение прав на 4 месяца!';
    }
    else if(inputSpeed - 90 >= 80){
        penaltyField.classList.remove("calc-result-hidden");
        penaltyField.innerHTML = 'Ваше наказание: ' + pen4 + ' рублей. Или лишение прав на полгода!';
    }
    else if(inputSpeed - 90 < 20){
        penaltyField.classList.remove("calc-result-hidden");
        penaltyField.innerHTML = 'Всё нормально. Можете продолжать движение!';
    }
    else{
        penaltyField.classList.remove("calc-result-hidden");
        penaltyField.innerHTML = 'Данные неверны!';
    }
}

const calcExam = function(){
    let inputStud = parseInt(document.getElementById("in_students").value);
    let arrStud = new Map;
    let fine = [];
    let good = [];
    let great = [];
    let max = 12;
    let min = 12;
    if(inputStud > 0){
        for (let i = 0; i < inputStud; i++){
        arrStud.set(i, Math.ceil(Math.random()*30));
        };
        for (const [key, value] of arrStud) {
            if(value >= 12 && value <= 13){
             fine.push(value);
            }
            else if (value >= 14 && value <= 15){
                good.push(value);
            }
            else if (value >= 16){
                great.push(value);
            }
            if(value >= max){
                max = value;
            }
            else if(value <= min){
                 min = value;
            }
            
        }
        examField.classList.remove("calc-result-hidden");
        examField.innerHTML = 'Студенты сдавшие на 3: ' + fine.length + '<br>'
        + 'Студенты сдавшие на 4: ' + good.length + '<br>' + 'Студенты сдавшие на 5: ' + great.length + 
        '<br>' + 'Минимальное количество подтягиваний: ' + min + '<br>' + 'Максимальное количество: ' + max;
    }
    else{
        penaltyField.classList.remove("calc-result-hidden");
        penaltyField.innerHTML = 'Данные неверны!';
    }
    
}

const calcWord = function(){
    let inputSentence = document.getElementById("in_sentence").value;
    let min = 0;
    let longest = '';
    if (inputSentence.replace(/\s+/g, '') !== ' ' && inputSentence.replace(/\s+/g, '').length > 0){
        let words = inputSentence.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").split(' ');
        words.forEach(word => {
            if (word.length > min){
                min = word.length;
                longest = word;
            }
        });
        sentenceField.classList.remove("calc-result-hidden");
        sentenceField.innerHTML = 'Самое длинное слово в предложении - ' + longest;
    }
    else {
        sentenceField.classList.remove("calc-result-hidden");
        sentenceField.innerHTML = 'Данные неверны!';
    }
}

const validatePass = function(){
    let inputPass = document.getElementById("in_pass").value;
    let specialSymbols = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,12}$/;
    console.log(inputPass);
    if (inputPass.match(specialSymbols)){
        passwordField.classList.remove("calc-result-hidden");
        console.log(1);
        passwordField.innerHTML = 'True';
    }
    else{
        passwordField.classList.remove("calc-result-hidden");
        console.log(0);
        passwordField.innerHTML = 'False';
    }
}

btn1.addEventListener('click', calcRenov);
btn2.addEventListener('click', calcPenalty);
btn3.addEventListener('click', calcExam);
btn4.addEventListener('click', calcWord);
btn5.addEventListener('click', validatePass);