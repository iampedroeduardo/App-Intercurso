class Time{
    nome;
    curso;
    pontos;//esse atributo funciona para pontuação geral quando time está dentro do esporte e pontuação de jogo no jogo
    avatar;
    constructor(nome,curso){
        this.nome=nome;
        this.curso=curso;
        this.pontos=0;
    }
}

class Esporte{
    nome;
    times;
    jogos;
    constructor(nome){
        this.nome=nome;
        this.times=[];
        this.jogos=[];
    }
    adicionaTime(time){
        this.times.push(time);
    }
    geraJogos(){
        for(let i=0;i<this.times.length-2;i++){
            for(let j=0;j<this.times.length-1;j++){
                let jogo= new Jogo(this.times[i],this.times[j]);
                this.jogos.push(jogo);
            }
        }
    };
}

class Jogo{
    times;
    constructor(time1,time2){
        this.times.push(time1);
        this.times.push(time2);
    }
    aumentaPontos(time){//time é um número 0 ou 1 informado no onclick do aumento de pontuação
        this.times[time].pontos++;
    }
}

function adiciona(){
    if (
        (document.querySelector("#nome").value != "") && 
        (document.querySelector("#curso").value != "escolha") && (
            (document.querySelector("#basquete").checked) || 
            (document.querySelector("#volei").checked) ||
            (document.querySelector("#futsal").checked)
        )
    )
    {
        let nome=document.querySelector("#nome").value;
        let curso=document.querySelector("#curso").value;
        let time= new Time(nome,curso);
        if(document.querySelector("#basquete").checked){
            basquete.adicionaTime(time);
        }
        if(document.querySelector("#volei").checked){
            volei.adicionaTime(time);
        }
        if(document.querySelector("#futsal").checked){
            futsal.adicionaTime(time);
        }
        console.log(time);
        document.querySelector("#nome").value="";
        document.querySelector("#curso").value="escolha";
        document.querySelector("#futsal").checked=false;
        document.querySelector("#volei").checked=false;
        document.querySelector("#basquete").checked=false;
    }
}

let volei= new Esporte("Volei");
let futsal= new Esporte("Futsal");
let basquete= new Esporte("Basquete");