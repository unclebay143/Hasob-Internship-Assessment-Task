const questionContainer = document.getElementById('question-container');
const pageCounter = document.getElementById('page-counter')
let numberOfQuestions = document.getElementById('question-size')

questions.length <= 1 ? (numberOfQuestions.innerHTML = `${questions.length} Question`) : numberOfQuestions.innerHTML = `${questions.length} Questions`
const getPageSize = Math.round  (questions.length / 5);
getPageSize == 1 ? (pageCounter.innerHTML = `${getPageSize} of ${getPageSize} Page`) : (pageCounter.innerHTML = `${getPageSize} of ${getPageSize} Pages`)

const renderQuestions = () => {
    function question1(){
        const question1 = questions[0];
        const {id, question, options} = question1;
        const question1Section = document.createElement('section');
        question1Section.classList.add('question-with-radio')
        questionBody = `
            <div>
                <span class='question-lead'>${id}.</span>
                <label class='question-lead'>${question}</label>
            </div>
            <div>
                <div class='radio-container'>${options.map((option)=>{
                    return( `
                        <div class='radio-wrapper'>
                            <input type="radio" name=${question} value=${question}> 
                            <label for=${option}>${option}</label> 
                        <div>
                    `)
                    }
                    ).join('')
                    }
                </div>
            </div>
        `
        question1Section.insertAdjacentHTML('beforeend', questionBody)
        questionContainer.appendChild(question1Section)
    }
    
    function question2(){
        const question2 = questions[1];
        const {id, question, options} = question2;
        const question2Section = document.createElement('section');
        question2Section.classList.add('question-with-dropdown')
        questionBody = `
            <div>
                <span class='question-lead'>${id}.</span>
                <label class='question-lead'>${question}</label>
            </div>
            <div>
                <select>${[options.map((option)=>{
                        return( `<option value=${option}>${option}</option> `)
                    }
                    )
                    ]}
                </select>
            </div>
        `
        question2Section.insertAdjacentHTML('beforeend', questionBody)
        questionContainer.appendChild(question2Section)

        
    }
    function question3(){
        const question3 = questions[2];
        const {id, question, options} = question3;
        const question3Section = document.createElement('section');
        question3Section.classList.add('question-with-checkbox')
        questionBody = `
            <div>
                <span class='question-lead'>${id}.</span>
                <label class='question-lead'>${question}</label>
            </div>
            <div>
                <div class="checkbox-container">${options.map((option, index)=>{
                    return( `
                        <div class='checkbox-wrapper'>
                            <input type="checkbox" name=${option}${index} value=${option}> 
                            <label for=${option}>${option}</label> 
                        </div>
                    `)
                    }
                    ).join('')
                    }
                </div >
            </div>
        `
        question3Section.insertAdjacentHTML('beforeend', questionBody)
        questionContainer.appendChild(question3Section)

        
    }
    function getUserEmail(){
        emailContainer = `<label for='email'>4. Provide your valid email address</label> <input type='email' name='email' id='userEmail' placeholder='Enter your email address'/>`
        const question4Section = document.createElement('section');
        question4Section.insertAdjacentHTML('beforeend', emailContainer)
        questionContainer.appendChild(question4Section)

        
    }

    question1()
    question2()
    question3()
    getUserEmail()
}


renderQuestions()