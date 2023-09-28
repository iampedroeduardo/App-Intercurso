class Time{
    nome;
    curso;
    pontos;//esse atributo funciona para pontuação geral quando time está dentro do esporte e pontuação de jogo no jogo
    constructor(nome,curso){
        this.nome=nome;
        this.curso=curso;
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
        this.times[0].pontos=0;
        this.times[1].pontos=0;
    }
    aumentaPontos(time){//time é um número 0 ou 1 informado no onclick do aumento de pontuação
        this.times[time].pontos++;
    }
}
let volei= new Esporte("Volei");
let futsal= new Esporte("Futsal");
let basquete= new Esporte("Basquete");