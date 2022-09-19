class CalcController{

    constructor(){
        this._operation = [];
        this._locale = 'pt-BR';
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this._currentDate;
        this.initialize();
        this.initButtonsEvent();

    }

    initialize(){

        this.setdisplayDateTime();
        //interval é a variavel para salvar o intervalo
        setInterval(()=>{
            this.setdisplayDateTime();
        }, 1000);

       /* //parar o intervalo
        setTimeout(()=>{
            clearInterval(interval);

        },10000)*/

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
    }
    //metodo para apagar só a ultima coisa escrita
    clearEntry(){
        this._operation.pop();
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

     //metodo para calcular
     calc(){
        let last = this._operation.pop();

        let result = eval(this._operation.join(""));

        this._operation = [result, last];
        this.setLastNumberToDisplay();
    }

    //metodo  para adicionar o ultimo numero no display
    setLastNumberToDisplay(){

        let lastNumber;
        for(let i = this._operation.length - 1; i >=0; i--){
            if(!this.isOperator(this._operation[i])){
                lastNumber = this._operation[i];
                break;
            }
        }

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
                this.setLastOperation(parseInt(newValue));
                
                //atualizar display
                this.setLastNumberToDisplay();

            }

           
        }

        
        
    }

    setError(){
        this.displayCalc = "Error";
    }

    //switch
    execBtn(value){

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
                
            break;  
            
            case 'ponto':
                this.addOperation('.'); 
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