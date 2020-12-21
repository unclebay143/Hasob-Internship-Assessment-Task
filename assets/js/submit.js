


const handleSubmit = () =>{
    const getQuestion1Answer = document.querySelector(`input[name='question1']:checked`);
    if(getQuestion1Answer == null){
        swal({
            text: "Please provide an answer to question 1!",
            icon: "warning",
            buttons: true,
          })
    }else{
        console.log(getQuestion1Answer.value)
        const getQuestion2Answer = document.getElementById("question2");
        const getTextAnswer = getQuestion2Answer.options[getQuestion2Answer.selectedIndex].text;
        if(getTextAnswer == 'Choose...' ){
            swal({
                text: "Please provide an answer to question 2!",
                icon: "warning",
                buttons: true,
              })
        }else{
            console.log(getTextAnswer)
            const getQuestion3Answer = document.getElementsByName('question3');
            var numberOfAnswer = []
            for (let index = 0; index < getQuestion3Answer.length; index++) {
                if(getQuestion3Answer[index].checked){
                    numberOfAnswer.push(getQuestion3Answer[index].value)
                }
            }
            setTimeout(() => {
                if(numberOfAnswer.length == 0){
                    swal({
                        text: "Please provide an answer to question 3!",
                        icon: "warning",
                        buttons: true,
                      })
                }
            }, 1000);
            console.log(numberOfAnswer)
        }
        email = document.getElementById('userEmail').value
        console.log(email)
        let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!email.match(regexEmail)) {
            swal({
                text: "Invalid email address",
                icon: "warning",
                buttons: true,
              })
          } else {
            console.log("hey"); 
          }
        
    }



}