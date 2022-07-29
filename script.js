const resultEl = document.querySelector('.result');
const clipboardBtn = document.getElementById('clipboard');
const settingsEl = document.querySelector('.settings');
const generateBtn = document.getElementById('generate');
const messageEl = document.getElementById('message');
const errorEl = document.getElementById('error');
const lengthEl = document.getElementById('lengthMsg');

// settings checkboxes
const pwLength = document.getElementById('length');
const pwUppercase = document.getElementById('uppercase');
const pwLowercase = document.getElementById('lowercase');
const pwNumber = document.getElementById('numbers');
const pwSymbols = document.getElementById('symbols');
let isDirty = false;


function init() {
    clipboardBtn.addEventListener('click', copyToClipboard);
    generateBtn.addEventListener('click', generatePassword);

    pwLength.addEventListener('change', function() {
        if (pwLength.value > 20) {
            hideMessage('length')
            pwLength.value = 8;
        }
    })
    
    function copyToClipboard() {
        const password = resultEl.innerHTML;
        if (isDirty) {
           navigator.clipboard.writeText(password);
           shakeResult()
           hideMessage('msg')
        } else {
            hideMessage('err')
        }
    }
    
    function generatePassword() {
    
        const charLower = "abcdefghijklmnopqrstuvwxyz";
        const charUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        const charNum = "1234567890";
        const charSym = "~!@#$%^&*()_+";
        let charSet = "";
        let password = "";
    
        pwUppercase.checked ? charSet += charUpper : null;
        pwLowercase.checked ? charSet += charLower : null;
        pwNumber.checked ? charSet += charNum : null;
        pwSymbols.checked ? charSet += charSym : null; 
    
        for (let i = 0, n = charSet.length; i < pwLength.value; i++) {
            password += charSet.charAt(Math.floor(Math.random() * n));
        }
        isDirty = true;
        resultEl.innerHTML = password;
        console.log(password)
    };
    
    function shakeResult(){
        clipboardBtn.style.color = 'var(--accent)'
        clipboardBtn.style.background = 'var(--secondary)'
        resultEl.style.color = 'var(--accent)'
        resultEl.style.animation = 'shake 0.82s cubic-bezier(.36,.07,.19,.97) both'
    
        setTimeout(function() {
            clipboardBtn.style.color = 'var(--secondary)'
            clipboardBtn.style.background = 'var(--accent)'
            resultEl.style.color = 'black'
    
        }, 1500)
      };
    
      function hideMessage(el) {
        if(el === 'msg') {
            messageEl.style.display = 'block';
            clipboardBtn.disabled = true;
          
            setTimeout(function() { 
            messageEl.style.display = 'none';
            resultEl.style.animation= 'none'
            clipboardBtn.disabled = false;
            }, 1000);
        } else if (el === 'err') {
            errorEl.style.display = 'block';
            clipboardBtn.disabled = true;
          
            setTimeout(function() { 
            errorEl.style.display = 'none';
            resultEl.style.animation= 'none'
            clipboardBtn.disabled = false;
            }, 1000);
        } else if (el === 'length') {
            lengthEl.style.display = 'block';
            clipboardBtn.disabled = true;
          
            setTimeout(function() { 
            lengthEl.style.display = 'none';
            resultEl.style.animation= 'none'
            clipboardBtn.disabled = false;
            }, 1000);
        } 
        
      };

};

init();

