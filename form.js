const buttons = document.getElementsByClassName("cp-form__money-button");
const moneyInput = document.getElementById("cp-money");
const form = document.getElementById("cp-form");
const cpEmail = document.getElementById("cp-email");


/* Виджет cloudpayments начало */
const pay = function (money, email) {
    console.log("email: " + email)
    console.log("сумма: " + money)
    var widget = new cp.CloudPayments();
       widget.pay('auth', // или 'charge'
           { //options
               publicId: 'test_api_00000000000000000000001', // pk_fca1f629b4ea2ced66acd5fce65ad
               description: 'Пожертвование тетру-студии Круг II', //назначение
               amount: money, //сумма
               currency: 'RUB', //валюта
               accountId: email, //идентификатор плательщика (в нашем случае почта)
               skin: "modern", //дизайн виджета (необязательно CLASSIC MODERN MINIMAL)
               data: {
                myProp: 'myProp value'
            }
           },
           {
               onSuccess: function (options) { // success
                   //действие при успешной оплате
               },
               onFail: function (reason, options) { // fail
                   //действие при неуспешной оплате
               },
               onComplete: function (paymentResult, options) { //Вызывается как только виджет получает от api.cloudpayments ответ с результатом транзакции.
                   //например вызов вашей аналитики Facebook Pixel
               }
           }
       )
   };

let moneyChange = (summ) => { // This function will be called when the browser
    moneyInput.value = summ;
}
/* Виджет cloudpayments конец */


Array.from(buttons).forEach(element => {
    /* Смена значения поля с суммой, при нажатии кнопок с деньгами */
    element.addEventListener("click", function(event){ 
        event.preventDefault();
        moneyChange(element.value); 
    });
});


form.addEventListener("submit", function(event){ 
    event.preventDefault();
    /* Проверка полей через HTML */
    pay(Number(moneyInput.value), cpEmail.value);
});
