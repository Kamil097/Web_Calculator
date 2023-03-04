let display = document.getElementsByClassName('display')
let display1 = document.getElementById('first');
let display2 = document.getElementById('second');
let display3 = document.getElementById('third');
let buttons = Array.from(document.getElementsByClassName('button'));
let x = true; //nadpisywanie
let z = true; //przerzucanie

function convertToMathJax(array,output)
{
    const counts = {};
    const Array = array
    Array.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });

    let y = 0; //ile jest mnożników
    for(x in counts){y++;}
    let text = "\\[ "+output+" =";//text do doklejania


    for(x in counts)
    {
        if(counts[x]>1)
        {text+=(" "+x+"^"+counts[x]+" \\cdot");}
        else
        {text+=(" "+x+" \\cdot");}      
    }
    text=text.slice(0,-6); //usuwam \cdot
    text+="\\]"

    return text;
}
function isNumeric(n){
    return !isNaN(parseFloat(n))&&isFinite(n);
}
function gcd_fun(x, y) {
    if ((typeof x !== 'number') || (typeof y !== 'number')) 
      return false;
    x = Math.abs(x);
    y = Math.abs(y);
    while(y) {
      var t = y;
      y = x % y;
      x = t;
    }
    return x;
  }

  function primeFactors(n) {
    const factors = [];
    let divisor = 2;
  
    while (n >= 2) {
      if (n % divisor == 0) {
        factors.push(divisor);
        n = n / divisor;
      } else {
        divisor++;
      }
    }
    return factors;
  }

 
function findPrimes(n)
{
    let MAX = 10000;
    let primes = new Array();

    let marked = new Array(parseInt(MAX / 2) + 100).fill(false);
    for (let i = 1; i <= (Math.sqrt(MAX) - 1) / 2; i++)
          for (let j = (i * (i + 1)) << 1;
            j <= MAX / 2; j = j + 2 * i + 1)
            marked[j] = true;
    primes.push(2);
    for (let i = 1; i <= MAX / 2; i++)
        if (marked[i] == false)
            primes.push(2 * i + 1);


    if (n <= 2 || n % 2 != 0)
    {
        return("Invalid Input");
    }

    for (let i = 0; primes[i] <= n / 2; i++)
    {
        let diff = n - primes[i];
        if (primes.includes(diff))
        {

            return(primes[i] + " + " + diff + " = " + n);
        }
    }
}

buttons.map(button=>{
    button.addEventListener('click',(e)=>{
        switch(e.target.innerText){
            
            case 'C':
                for (var i = display.length-1; i >=0; i--) {
                    if(display[i].innerText){
                        display[i].innerText='';
                        break;}
                }
                break;
            case 'CC':
                for (var i = 0; i < display.length; i++) {
                    display[i].innerText='';
                 }
                break;
            case '←':
                if(display1.innerText && isNumeric(display1.innerText))
                {
                    display1.innerText = display1.innerText.slice(0,-1);
                }
                break;
            case 'x↔y':
                if(isNumeric(display1.innerText))
                {
                    let y = display1.innerText;
                    display1.innerText=display2.innerText;
                    display2.innerText=y;
                }
                break;
            case '/':
                if(display2.innerText&&isNumeric(display1.innerText))
                {
                    try
                    {
                        if(display1.innerText=='0')
                        {display1.innerText="Nie dziel przez 0!";x=false;display2.innerText='';display3.innerText='';break;}

                        display1.innerText = eval(display2.innerText+'/'+display1.innerText);
                        z = false;x = true;
                        display2.innerText=display3.innerText;
                        display3.innerText='';       
                    }catch
                    {
                    break;
                    }
                }
                break;
            case '*':
                if(isNumeric(display1.innerText))
                {
                try
                    {
                        display1.innerText = eval(display2.innerText+'*'+display1.innerText);
                        z = false;x = true;
                        display2.innerText=display3.innerText;
                        display3.innerText='';       
                    }catch{break;}
                }
                break;  
            case '+':
                if(isNumeric(display1.innerText))
                {
                try
                    {
                        display1.innerText = eval(display2.innerText+'+'+display1.innerText);
                        z = false;x = true;
                        display2.innerText=display3.innerText;
                        display3.innerText='';       
                    }catch{break;}
                }
                break;
            case '-':
                if(isNumeric(display1.innerText)&&display2.innerText)
                {
                try
                    {
                        display1.innerText = eval(display2.innerText+'-'+display1.innerText);
                        z = false;x = true;
                        if(display1.innerText<0){display1.innerText="Liczba ujemna.";display2.innerText='';display3.innerText='';x=false;break;}
                        display2.innerText=display3.innerText;
                        display3.innerText='';       
                    }catch{break;}
                }
                break;
            case 'x^y':
                if(isNumeric(display1.innerText))
                {
                try
                    {
                        display1.innerText = eval(display2.innerText+'**'+display1.innerText);
                        z = false;x = true;
                        display2.innerText=display3.innerText;
                        display3.innerText='';       
                    }catch{break;}
                }
                break;

            case 'mod':
                if(display2.innerText&&isNumeric(display1.innerText))
                {
                try
                    {
                        if(display1.innerText=='0')
                        {display1.innerText="Nie dziel przez 0!";x=false;display2.innerText='';display3.innerText='';break;}   
                        display1.innerText = eval(display2.innerText+'%'+display1.innerText);
                        z = false;x = true;
                        display2.innerText=display3.innerText;
                        display3.innerText='';     
                    }catch{break;}
                }
                break;

            case 'gcd':
                if(display2.innerText&&isNumeric(display1.innerText))
                {
                try
                    {
                        let r = parseFloat(display1.innerText,10);
                        let q = parseFloat(display2.innerText,10);
                        display1.innerText=(gcd_fun(r,q));
                        z = false;x = true;
                        display2.innerText=display3.innerText;
                        display3.innerText='';     
                    }catch{break;}
                }
                //gcd_fun(display1.innerText.parseDouble(),display2.innerText.parseDouble())
                break;
            case 'frac':
                if(isNumeric(display1.innerText))
                {
                    try 
                    {
                        let r = parseInt(display1.innerText,10);
                        let array = primeFactors(r);
                        let converted = convertToMathJax(array,r)
                        display1.innerHTML=converted
                        MathJax.typesetPromise();
                        z = true;x = false;
                    }
                    catch{break;}
                break;            
                }
            case 'p+q':
                if(isNumeric(display1.innerText))
                {
                    try {
                        
                        let text=findPrimes(parseFloat(display1.innerText,10));
                        text = ("\\["+text+"\\]");
                        display1.innerHTML=text
                        MathJax.typesetPromise();
                        z = true;x = false;
                    } catch {
                        break;
                    }
                }
                break;          

            case 'Enter':
                if(isNumeric(display1.innerText))
                {
                    display3.innerText=display2.innerText;
                    display2.innerText=display1.innerText;
                    x=false;
                }
                break;
            default:
                {
                    if(x==false||display1.innerText=='0'){
                        //display2.innerText=display1.innerText;
                        display1.innerText='';
                    }
                    if(z==false)
                    {
                        display3.innerText=display2.innerText;
                        display2.innerText=display1.innerText;
                        display1.innerText='';
                    }
                    display1.innerText += e.target.innerText;
                    x=true;
                    z=true;
                    
                }
        }
    });
})
