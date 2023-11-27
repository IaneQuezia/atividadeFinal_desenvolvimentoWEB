
function resultado(){
    const {imc, classificacao, risco} = verificarclassOMS();
    document.getElementById('imc').innerHTML = imc;
    document.getElementById('classificacao').innerHTML = classificacao;
    document.getElementById('risco').innerHTML = risco;
    document.getElementById('resultado').innerHTML = imc,classificacao,risco;
}

function recuperarPesoEAltura() {
    const peso = document.getElementById('peso').value;
    const altura = document.getElementById('altura').value;
    return { peso, altura };
}

function calcularIMC() {
    const { peso, altura } = recuperarPesoEAltura();
    const imc = peso/(altura * altura);
    return imc;
}

function verificarclassOMS() {
    const imc =  calcularIMC();
    const classificacao = '';
    const risco = '';

    if (imc < 18.5) {
        classificacao = 'Baixo Peso';
        risco = 'Baixo';

    } else if (imc >= 18.5 && imc <= 24.9) {
        classificacao = 'Normal';
        risco = 'Normal';   
        
    } else if (imc >= 25 && imc <= 29.9) {
        classificacao = 'Sobrepeso';
        risco = 'Aumentado';    
        
    } else if (imc >= 30 && imc <= 34.9) {
        classificacao = 'Obesidade';
        risco = 'Moderado';   
        
    } else if (imc >= 35 && imc <= 39.9) {
        classificacao = 'Obesidade Mórbida';
        risco = 'Grave';

    } else {
        classificacao = 'Obesidade Mórbida';
        risco = 'Muito Grave';     
    }
    
    document.getElementById('resultado').innerHTML = imc,classificacao,risco;
    return {imc, classificacao, risco};

}