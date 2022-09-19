class CalcController{

    constructor(){
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

    //definindo buttons
    initButtonsEvent(){

        let buttons = document.querySelectorAll("#buttons > g, #parts > g");
        
        buttons.forEach((btn, index) =>{
            btn.addEventListener('click',e =>{
                console.log(btn.className.baseVal.replace("btn-","")); 
            });
        })    
        
        
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