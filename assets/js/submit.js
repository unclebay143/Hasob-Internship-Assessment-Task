
let finalAnswer = JSON.parse(localStorage.getItem('currentAnswer')) || [];
const handleSubmit = () =>{
    getEmail()
    handleQuestion3()
    handleQuestion2()
    handleQuestion1()
}

const check = (answer, yourAnswer, remark) => {
    if(answer !== yourAnswer){
        return remark = 'Failed'
    }else{
        return remark = 'passed'
    }
}

 function handleQuestion1(){
    const getQuestion1Answer = document.querySelector(`input[name='question1']:checked`);
    let { answer, question, id, remark } = questions[0]
    if(getQuestion1Answer === null){
        swal({
            text: 'Please provide an answer to question 1!',
            icon: 'warning',
        });
    }else{
        const yourAnswer = getQuestion1Answer.value
        if(answer !== yourAnswer){
            remark = 'Failed'
        }else{
            remark = 'passed'
        }
        const x1 = {answer, question, id, yourAnswer, remark}
        finalAnswer.push(x1)
        localStorage.setItem('currentAnswer', JSON.stringify(finalAnswer))
    }
}
function handleQuestion2(){
    let { answer, question, id, remark } = questions[1]
    const getQuestion2Answer = document.getElementById('question2');
    const yourAnswer = getQuestion2Answer.options[getQuestion2Answer.selectedIndex].text;
    if(answer !== yourAnswer){
        remark = 'Failed'
    }else{
        remark = 'passed'
    }
    const x2 = {answer, question, id, yourAnswer, remark}
    if(yourAnswer === 'Choose...' || yourAnswer === null){
        swal({
            text: 'Please provide an answer to question 2!',
            icon: 'warning',
        })
    }else{
        finalAnswer.push(x2)
        localStorage.setItem('currentAnswer', JSON.stringify(finalAnswer))
    }

}

function handleQuestion3(){
    let { answer, question, id, remark } = questions[2];
    const getQuestion3Answer = document.getElementsByName('question3');
    var yourAnswer = []
    for (let index = 0; index < getQuestion3Answer.length; index++) {
        if(getQuestion3Answer[index].checked){
            yourAnswer.push(getQuestion3Answer[index].value)
        }
    }
    if(JSON.stringify(answer) !== JSON.stringify(yourAnswer)){
        remark = 'Failed'
    }else{
        remark = 'passed'
    }
    const x3 = { answer, question, id, yourAnswer, remark}
    finalAnswer.push(x3)
    localStorage.setItem('currentAnswer', JSON.stringify(finalAnswer))
    setTimeout(() => {
        if(yourAnswer.length == 0){
            swal({
                text: 'Please provide an answer to question 3!',
                icon: 'warning',
                })
        }
    }, 1000);
}


function getEmail() {
    const email = document.getElementById('userEmail');
    const emailFormat = /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const validateEmail = emailFormat.test(email.value);
    if(email.value.length === 0){
        swal({
            text: 'Email Address cannot be blank!',
            icon: 'warning',
          })
    }else if(!validateEmail){
        swal({
            text: 'Invalid email address!',
            icon: 'warning',
          })
    }else{
        function sett(){
            let isSubmitting = {set: true};
        }
        sett()
        finalAnswer.push(email.value)
        localStorage.setItem('currentAnswer', JSON.stringify(finalAnswer))
        swal({
            title: "Are you sure?",
            text: "Record Cannot be edit after submission",
            icon: "warning",
            buttons: ['Review','Submit'],
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              showAttempt()
            } else {
              return null;
            }
          });
    }
}


function showAttempt(){
    const get = JSON.parse(localStorage.getItem('currentAnswer'));
    if(get.length < 4){
        swal({
            text: 'Please complete the form'
        }).then(()=>{
            localStorage.removeItem('currentAnswer')
            window.location.reload()
        }
        )
    }else{
        //  submitform btn
        isSubmitting =  true;
        submitBtn = document.getElementById('submitForm-btn');
        submitBtn.innerHTML = isSubmitting ? '<i class="fas fa-spinner fa-spin"></i> Loading' : null;
        isSubmitting ? submitBtn.setAttribute('disabled', 'true') : null;

        setTimeout(() => {
            swal({
                text: 'Form submitted successfully',
                icon: 'success',
                buttons: 'Show Json'
            
             })
            .then(() => {
                swal({
                    text: JSON.stringify(get, null, 8),
                    buttons: 'Close'
                }).then(()=>{
                    localStorage.removeItem('currentAnswer')
                    window.location.reload()
                }
                )
            })
        }, 2000);
    }

}

