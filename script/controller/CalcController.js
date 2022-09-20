class CalcController{

    constructor(){
        this._lastNumber = '';
        this._lastOperator = '';
        this._audioOnOff = false;
        this._audio = new Audio('click.mp3');

        this._operation = [];
        this._locale = 'pt-BR';
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this._currentDate;
        this.initialize();
        this.initButtonsEvent();
        this.initKeyboard();

    }

    pasteFromClipboard(){

        document.addEventListener('paste',e=>{

           let text = e.clipboardData.getData('Text');

           this.displayCalc = parseFloat(text);

        });

    }


    copyToClipboard(){

        let input = document.createElement('input');
        input.value = this.displayCalc;
        
        document.body.appendChild(input);
        input.select();

        document.execCommand("Copy");

        input.remove();

    }


    initialize(){

        this.setdisplayDateTime();
        //interval é a variavel para salvar o intervalo
        setInterval(()=>{
            this.setdisplayDateTime();
        }, 1000);

        this.setLastNumberToDisplay();
        this.pasteFromClipboard();

       document.querySelectorAll('.btn-ac').forEach(btn=>{

        btn.addEventListener('dblclick', e=>{

            this.toggleAudio();


        });

       });

    }

    //metodo para ligar e desligar o audio
    toggleAudio(){

        this._audioOnOff  = !this._audioOnOff;

        
    }

    playAudio(){

        if(this._audioOnOff){

            this._audio.currentTime = 0;
            this._audio.play();
        

        }

    }

    //metodo para identificar ações do teclado
    initKeyboard(){
        document.addEventListener('keyup', e=>{

            this.playAudio();
            switch(e.key){

                case 'Escape':
                    this.clearAll();    
                break;  
    
                case 'Backspace':
                    this.clearEntry();    
                break;  
    
                case '+':
                case '-':
                case '*':
                case '/':
                case '%':

                    this.addOperation(e.key);
                break;  
                
                case 'Enter':
                    this.calc();
                break;  
                
                case '.':
                case ',':
                        this.addDot(); 
                break;  
    
                case '0':
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9':  
                
                    this.addOperation(parseInt(e.key));
    
                break;

                case 'c':
                    if( e.ctrlKey) this.copyToClipboard();
                break;
    
    
               
    
            }
        })
    }

    //metodo para eventos click e drag (tbm pode ser para masi eventos)
    addEventListenerAll(element, events, fn){

        events.split(' ').forEach(event=>{
            element.addEventListener(event, fn, false);
        });

    }
    //metodo para apagar tudo
    clearAll(){
        this._operation = [];
        this._lastNumber = '';
        this._lastOperator = '';
        this.setLastNumberToDisplay();
    }
    //metodo para apagar só a ultima coisa escrita
    clearEntry(){
        this._operation.pop();
        

        this.setLastNumberToDisplay();
    }

    //metodo do arry
    getLastOperation(){

        return this._operation[this._operation.length -1];

    }

    setLastOperation(value){

        this._operation[this._operation.length -1] =value;

    }

    //retornar o operador
    isOperator(value){
     
        return ['+','-','*','%','/'].indexOf(value) > -1;
     
        /*  if(['+','-','*','%','/'].indexOf(value) > -1){
            return true;

        } else{
            return false;
        }*/
    }

   
    //metodo para juntar os tres primeiros digitos e calcular
    pushOperation(value){

        this._operation.push(value);

        if(this._operation.length > 3){

            

            this.calc();


        }

    }

    //Metodo para o resultado
    getResult(){

       // console.log("getResult", this._operation)

        return eval(this._operation.join(""));
    }

     //metodo para calcular
    calc(){

        let  last = '';

        this._lastOperator = this.getLastItem();

       if(this._operation.length < 3){

            let firstItem = this._operation[0];
           this._operation = [firstItem, this._lastOperator, this._lastNumber];

       }

        // tratando o botão igual
        if(this._operation.length >3){

            last = this._operation.pop();
            this._lastNumber= this.getResult();

        }else if(this._operation.length == 3){
            
            this._lastNumber= this.getLastItem(false);

        }

        

        let result = this.getResult();

        //caso seja porcentagem 
        if(last == '%'){

            result /=  100;
            this._operation = [result];

        }else{

            this._operation = [result];
            if(last) this._operation.push(last);
        }

        this.setLastNumberToDisplay();
    }

    //metodo para clicar mais de uma vez no botao igual
    getLastItem(isOperator = true){

        let lastItem;
        
       for(let i  = this._operation.length - 1; i >=0; i--){
        if(this.isOperator(this._operation[i]) == isOperator){
            lastItem = this._operation[i];
            break;
        } 
        
       }

       if(!lastItem){

        lastItem = (isOperator) ? this._lastOperator :  this._lastNumber;


       }


       return lastItem;

    }

    //metodo  para adicionar o ultimo numero no display
    setLastNumberToDisplay(){

        let lastNumber = this.getLastItem(false);
       

        if(!lastNumber) lastNumber = 0;

        this.displayCalc = lastNumber;
        

    }


    //metodo para mostrar todos os resultados e adicionar as operaçoes na calculadora
    addOperation(value){

        if(isNaN(this.getLastOperation())){
            //string
            if(this.isOperator(value)){
                //trocar o operador
                this.setLastOperation(value);

            }else if(isNaN(value)){
                //outra coisa
            }
            else{

                this.pushOperation(value);

                this.setLastNumberToDisplay();

            }

        }else {
            
            if(this,this.isOperator(value)){

                this.pushOperation(value);

            }else{

                let newValue = this.getLastOperation().toString() + value.toString();
                this.setLastOperation(newValue);
                
                //atualizar display
                this.setLastNumberToDisplay();

            }

           
        }

        
        
    }

    setError(){
        this.displayCalc = "Error";
    }

    //programação do ponto
    addDot(){

       let lastOperation = this.getLastOperation();

       if(typeof lastOperation === 'string' && lastOperation.split('').indexOf('.') > -1) return;

       if(this.isOperator(lastOperation) || !lastOperation){
        this.pushOperation('0.');
       }else{
            this.setLastOperation(lastOperation.toString() + '.');
       }

       this.setLastNumberToDisplay();
    }



    //switch
    execBtn(value){


        this.playAudio();

        switch(value){


            case 'ac':
                this.clearAll();    
            break;  

            case 'ce':
                this.clearEntry();    
            break;  

            case 'soma':
                this.addOperation('+');
            break;  
            
            case 'subtracao':
                this.addOperation('-');
            break;  
            
            case 'divisao':
                this.addOperation('/');
            break;  
            
            case 'multiplicacao':
                this.addOperation('*');
            break;  
            
            case 'porcento':
                this.addOperation('%');
            break;  
            
            case 'igual':
                this.calc();
            break;  
            
            case 'ponto':
                    this.addDot(); 
            break;  

            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':  
            
                this.addOperation(parseInt(value));

            break;


            default:
                this.setError();
            break;


        }




    }

    //definindo buttons
    initButtonsEvent(){

        let buttons = document.querySelectorAll("#buttons > g, #parts > g");
        
        buttons.forEach((btn, index) =>{
            this.addEventListenerAll(btn, "click drag",e =>{
                let textbtn = btn.className.baseVal.replace("btn-",""); 

                this.execBtn(textbtn);


            });

            //mudando o cursor do mouse qunado passa pelo botão
            this.addEventListenerAll(btn, "mouseover mouseup mousedown", e=>{

                btn.style.cursor = "pointer";

            });
        });    
        
        
        //buttons.addEventListener('click',e =>{
//
  //      });
    }


    //Metodos

    //metodo para a data e a hora serem exibidas
    setdisplayDateTime(){
            this.displayDate = this.currentDate.toLocaleDateString(this._locale);
            this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
    }
    //get e set da data e da hora
    get displayTime(){
        this._timeEl.innerHTML;
    }
    set displayTime(value){
        this._timeEl.innerHTML = value;
    }

    get displayDate(){
        this._dateEl.innerHTML;
    }
    set displayDate(value){
        this._dateEl.innerHTML = value;
    }

    //get e set do display da calculadora
    get displayCalc(){
        return this._displayCalcEl.innerHTML;
    }

    set displayCalc(value){
        this._displayCalcEl.innerHTML = value;
    }
    
    //retornando a data atual
    get currentDate(){
        return new Date();
    }

    set currentDate(value){
        this._currentDate = value;
    }
}