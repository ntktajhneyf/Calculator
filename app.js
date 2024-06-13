const resultElement = document.getElementById('result')
const input1 = document.getElementById('input1')
const input2 = document.getElementById('input2')
const submitBtn = document.getElementById('submit')
const plusBtn = document.getElementById('plus')
const minusBtn = document.getElementById('minus')
const multiplyBtn = document.getElementById('multiply')
const divideBtn = document.getElementById('divide')

let action = '+'

plusBtn.onclick = function(){
    action = '+'
}
minusBtn.onclick = function(){
    action = '-'
}
multiplyBtn.onclick = function(){
    action = '*'
}
divideBtn.onclick = function(){
    action = '/'
}


function colorResult (result){
    if(result < 0){
        resultElement.style.color = 'red'
    } else {
        resultElement.style.color = 'green'
    }
    resultElement.textContent = result
}

submitBtn.onclick = function(){
    if (action == '-'){
        const sum = Number(input1.value) - Number(input2.value)
        colorResult(sum)
    }

    if (action == '+'){
        const sum = Number(input1.value) + Number(input2.value)
        colorResult(sum)

    }

    if (action == '*'){
        const sum = Number(input1.value) * Number(input2.value)
        colorResult(sum)

    }
    if (action == '/'){
        const sum = Number(input1.value) / Number(input2.value)
        colorResult(sum)

    }
     
}