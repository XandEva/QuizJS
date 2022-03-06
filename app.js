let currentQuestion = 0;  //pega a questão atual
let correctAnswers = 0; //perguntas corretas

showQuestion();

document.querySelector('.scoreArea button').addEventListener('click', resetEvent)

function showQuestion(){
    if(questions[currentQuestion]){
        let q = questions[currentQuestion]

        let pct = Math.floor((currentQuestion / questions.length) *100); //porcentagem da barrinha

        document.querySelector('.progress--bar').style.width = `${pct}%`

        document.querySelector('.scoreArea').style.display='none' //vai esconder o scoreArea
        document.querySelector('.questionArea').style.display='block'//vai mostrar a questão


        document.querySelector('.question').innerHTML = q.question; //vai preencher a question com a pergunta
        


        let optionsHtml = '';
        for(let i in q.options){
            optionsHtml += `<div data-op="${i}" class="option"><span>${parseInt(i)+1}</span>${q.options[i]}</div>`; //vai mostrar as opções
        }
        document.querySelector('.options').innerHTML = optionsHtml;

        document.querySelectorAll('.options .option').forEach(item =>{
            item.addEventListener('click', optionClickEvent)
        });
    }else{
        //acabaram as questões
        finishQuiz();
    }
}

function optionClickEvent(e){
    let clickedOption = parseInt(e.target.getAttribute('data-op'));

    if(questions[currentQuestion].answer === clickedOption){ //se a questão atual for igual ao que o usuario clicar ent..
        correctAnswers++; //se a resposta for correta incrementa mais 1
    }else{
        
    }

    currentQuestion++;
    showQuestion();//muda de pergunta
}

function finishQuiz(){
    let points = Math.floor((correctAnswers / questions.length) * 100);


    if(points < 30){
        document.querySelector('.scoreText1').innerHTML = 'Foi péssimo, Precisa melhorar!'
        document.querySelector('.scorePct').style.color = '#ff0000'
    }else if(points >= 30 && points<70){
        document.querySelector('.scoreText1').innerHTML = 'Foi Bom'
        document.querySelector('.scorePct').style.color = '#ffff00'
    }

    document.querySelector('.scorePct').innerHTML = `Acertou ${points}%` //vai pegar o score do html e modificar dependendo da porcentagem de acerto 
    document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} questões e acertou ${correctAnswers}`



    document.querySelector('.scoreArea').style.display='block' //vai mostrar o scoreArea
    document.querySelector('.questionArea').style.display='none'//vai esconder a questão
    document.querySelector('.progress--bar').style.width = '100%'; //acabou as questões vai completar 100% a barrinha

}

function resetEvent(){
    //pode ser feito de outra forma, mas preferi fazer assim para economizar linhas de código
    //poderia ser feito resetando tudo
    // currentQuestion = 0;
    // correctAnswers = 0;
    // showQuestion();

    //ou pode ser feito assim, usando a própria api do js
    document.location.reload(true); //O método Location.reload() recarrega a URL atual

}