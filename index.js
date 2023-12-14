const inputSlider =document.querySelector("[data-lengthSlider]");
const lengthDisplay=document.querySelector("[data-lengthNumber]");
const passwordDisplay=document.querySelector("[data-passwordDisplay]");
const copyButton=document.querySelector("[data-copy]");
const copyMessage=document.querySelector("[data-copyMessage]");
const uppercaseCheck=document.querySelector("#uppercase");
const lowercaseCheck=document.querySelector("#lowercase");
const numbersCheck=document.querySelector("#numbers");
const symbolsCheck=document.querySelector("#symbols");
const indicator=document.querySelector("[data-indicator]");
const generatoorButton=document.querySelector(".generatorButton");
const allcheckBox=document.querySelectorAll("input[type=checkbox]");
const symbols="!@#$%^&*()_/*-+{}:<>?/.,;[]="; 

let password="";
let passwordLength=10;
let checkCount=0;
handleSlider();
//set circle into grey color
setIndicator("#778899");

//function for slider(this function main work is prassword length into ui) 
function handleSlider(){
    passwordLength = inputSlider.value; // Update passwordLength
    lengthDisplay.innerText = passwordLength; 
    //or kuch b ana chiya
    const min =inputSlider.min;
    const max =inputSlider.max;
    inputSlider.style.backgroundcolor = ((passwordLength - min) * 100 / (max - min)) + "% 100%" 
}

//function set color(this function main work is represent color of slider)
function setIndicator(color){
    indicator.style.backgroundcolor = color;
    //shadow(apply shadow on cirle )
    indicator.style.boxShadow = `0px 0px 12px 1px $(color)`;
}

//function random integer
function randomInterger(min, max){
    return Math.floor(Math.random()*(max - min)) + min;
}

//function generate random number
function generaterandomnumber(){
    return randomInterger(0,9);
}

//function generate lowercase
function generatelowercase(){
    return String.fromCharCode(randomInterger(97,123));

}

//function generate uppercase
function generateuppercase(){
    return String.fromCharCode(randomInterger(65,91));

}

//function generate symbol
function generatesymbols(){
    const randNum = randomInterger(0,symbols.length);
    return symbols.charAt(newnum);
}

//function calculate strength
function calculatestrength(){
    let hasUpper =false;
    let hasLower=false;
    let hasNum=false;
    let hasSys=false;
    if(uppercaseCheck.checked)hasUpper=true;
    if(lowercaseCheck.checked)hasLower=true;
    if(numbersCheck.checked)hasNum=true;
    if(symbolsCheck.checked)hasSys=true;

    if(hasUpper && hasSys && (hasNum||hasLower) && passwordLength>=8){
        setIndicator("#0f0");
    }
    else if((hasLower||hasUpper)&&(hasNum||hasSys)&& passwordLength>=6){
        setIndicator("#0f0");
    }
    else {
        setIndicator("0f0");
    }
}

async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMessage.innerText="copied";
    }
    catch{
        copyMessage.innerText="failed";
    }
    //to make copied text visible
    copyMessage.classList.add("active");

    setTimeout( () => {
        copyMessage.classList.remove("active");
    }, 3000);
}

//shuffle the password
function shufflePassword(Array){
    //Fisher yates Methord
    for (let i=Array.length-1; i>0; i--) {
        //random j , findout using random no. 
        const j= Math.floor(Math.random()*(i+1));
        //swaping of number using i and j
        const temp = Array[i];
        Array[i]=Array[j];
        Array[j]=temp;
    }
    let str = "";
    Array.forEach((el) => (str += el));
    return str;
}

function handleCheckBoxChange(){
    checkCount=0;
    allcheckBox.forEach((checkbox)=>{
        if (checkbox.checked)
        checkCount++;
    });

    //special condition
    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();
    }
}

allcheckBox.forEach((checkbox)=>{
    checkbox.addEventListener('click',handleCheckBoxChange);
})

inputSlider.addEventListener('input',(e)=>{
    passwordLength = e.target.value;
    handleSlider();
});

copyButton.addEventListener('click',() => {
    if(passwordDisplay.value)
        copyContent();
});
console.log("all well");

generatoorButton.addEventListener('click', () => {
    if(checkCount==0) return;

    if(passwordLength < checkCount){
        passwordLength = checkCount ;
        handleSlider();
    }
    //new   password journey
    password="";

    //let put the stuff according to checkboxes

    // if(uppercaseCheck.checked){
    //     password +=generateuppercase();
    // }
    // if(lowercaseCheck.checked){
    //     password +=generatelowercase();
    // }
    // if(symbolsCheck.checked){
    //     password +=generatesymbols();
    // }
    // if(numbersCheck.checked){
    //     password +=generaterandomnumber();
    // }
    let funArr =[];

    if(uppercaseCheck.checked)
        funArr.push(generateuppercase);

    if(lowercaseCheck.checked)
        funArr.push(generatelowercase);

    if(numbersCheck.checked)
        funArr.push(generaterandomnumber);

    if(symbolsCheck.checked)
        funArr.push(generatesymbols);
    
    //compulsory addition
    for(let i=0; i<funArr.length; i++){
        password +=funArr[i]();
    }
    console.log("COmpulsory adddition done");

    //remaining addition
    for(let i=0; i<passwordLength - funArr.length; i++) {
        let newnum = randomInterger(0 , funArr.length);
        console.log("newnum" + newnum);
        password += funArr[newnum]();
    }
    console.log("Remaining adddition done");

    //shuffle the password
    password=shufflePassword(Array.from(password));
    console.log("Shuffling done");

    //show in UI
    passwordDisplay.value =password;
    console.log("UI adddition done");

    //calculate strength
    calculatestrength();
    
});
