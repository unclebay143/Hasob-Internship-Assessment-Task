
let answerTracker = JSON.parse(localStorage.getItem('currentAnswer')) || [];
const handleSubmit = () =>{
    getEmail()
    handleQuestion3()
    handleQuestion2()
    handleQuestion1()
}

 function handleQuestion1(){
    const getQuestion1Answer = document.querySelector(`input[name='question1']:checked`);
    let { correct_answer, question, id, remark } = questions[0]
    if(getQuestion1Answer === null){
        swal({
            text: 'Please provide an correct_answer to question 1!',
            icon: 'warning',
        })
            clearTimeout(handleQuestion3)
            console.log('cancel')
    }else{
        const your_answer = getQuestion1Answer.value
        if(correct_answer !== your_answer){
            remark = 'failed'
        }else{
            remark = 'passed'
        }
        const x1 = {correct_answer, question, id, your_answer, remark}
        answerTracker.push(x1)
        localStorage.setItem('currentAnswer', JSON.stringify(answerTracker))
    }
}
function handleQuestion2(){
    let { correct_answer, question, id, remark } = questions[1]
    const getQuestion2Answer = document.getElementById('question2');
    const your_answer = getQuestion2Answer.options[getQuestion2Answer.selectedIndex].text;
    if(correct_answer !== your_answer){
        remark = 'failed'
    }else{
        remark = 'passed'
    }
    const x2 = {correct_answer, question, id, your_answer, remark}
    if(your_answer === 'Choose...' || your_answer === null){
        swal({
            text: 'Please provide an correct_answer to question 2!',
            icon: 'warning',
        })
    }else{
        answerTracker.push(x2)
        localStorage.setItem('currentAnswer', JSON.stringify(answerTracker))
    }

}

function handleQuestion3(){
    let { correct_answer, question, id, remark } = questions[2];
    const getQuestion3Answer = document.getElementsByName('question3');
    var your_answer = []
    for (let index = 0; index < getQuestion3Answer.length; index++) {
        if(getQuestion3Answer[index].checked){
            your_answer.push(getQuestion3Answer[index].value)
        }
    }
    if(JSON.stringify(correct_answer) !== JSON.stringify(your_answer)){
        remark = 'failed'
    }else{
        remark = 'passed'
    }
    const x3 = { correct_answer, question, id, your_answer, remark}
    answerTracker.push(x3)
    // localStorage.setItem('currentAnswer', JSON.stringify(answerTracker))
        if(your_answer.length == 0){
            swal({
                text: 'Please provide an correct_answer to question 3!',
                icon: 'warning',
                })
        }
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
        answerTracker.push(email.value)
        localStorage.setItem('currentAnswer', JSON.stringify(answerTracker))
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
            document.getElementById('form').style.display = 'none';
            swal({
                text: 'Generating JSON',
                timer: 2000,
                button: false
            })
            .then(()=>{swal({
                text: 'Form submitted successfully',
                icon: 'success',
                buttons: 'Show Json',
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
            })
        }, 2000);
    }

}

