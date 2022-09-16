class CalcController{

    constructor(){
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this._displayCalc = 0;
        this._currentDate;
        this.initialize();

    }

    initialize(){

       

        displayCalcEl.innerHTML="4567";
        dateEl.innerHTML = "18/02/2001";
        timeEl.innerHTML = "11:00";


    }

    get displayCalc(){
        return this._displayCalc;
    }

    set displayCalc(valor){
        this._displayCalc = valor;
    }
    

    get currentDate(){
        return this._currentDate;
    }

    set currentDate(valor){
        this._currentDate = valor;
    }
}