class Time{
    nome;
    curso;
    pontos;//esse atributo funciona para pontuação geral quando time está dentro do esporte e pontuação de jogo no jogo
    avatar;
    constructor(nome,curso) {
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
    geraJogos() {
        for(let i=0; i<this.times.length-1; i++) {
            for(let j=i+1; j<this.times.length; j++) {
                console.log(this.times[i],this.times[j]);
                let jogo= new Jogo(this.times[i],this.times[j]);
                console.log(jogo);
                this.jogos.push(jogo);
            }
        }
    };
}

class Jogo{
    times;
    constructor(time1,time2){
        this.times = [];
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

    else {
        alert("Preencha todos os dados")
    }
}

function comeca(){
    if (volei.times.length == 1 ) {
        alert("No mínimo dois times");
    }

    if (futsal.times.length == 1 ) {
        alert("No mínimo dois times");
    }

    if (basquete.times.length == 1 ) {
        alert("No mínimo dois times");
    }

    if (volei.times.length != 1 && futsal.times.length != 1 && basquete.times.length != 1 ) {
        volei.geraJogos();
        futsal.geraJogos();
        basquete.geraJogos();
        document.getElementById("inicio").style = "display: none;";
        document.getElementById("jogos").style = "";

        // Cria Jogos

        if (basquete.times.length != 0) {
            let conteudo = document.getElementById("basquete-div");

            for (let i=0; i < basquete.jogos.length; i++) {
                let div = document.createElement("div");
                let time_nome_1 = basquete.jogos[i].times[0].nome;
                let time_nome_2 = basquete.jogos[i].times[1].nome;

                let n1 = document.createElement("h3");
                let n2 = document.createElement("h3");

                div.setAttribute("id", "jogo-basquete-" + (i+1))

                n1.innerHTML = time_nome_1;
                n2.innerHTML = time_nome_2;
                div.appendChild(n1);
                div.appendChild(n2);
                conteudo.appendChild(div);
            }
        }

        else {
            let conteudo = document.getElementById("futsal-div");

            // Aqui dentro colocar "Não houve jogos desta modalidade"
            conteudo.innerHTML = "<h2> Não houve jogos desta modalidade </h2>"
        }

        if (futsal.times.length != 0) {
            let conteudo = document.getElementById("futsal-div");

            for (let i=0; i < futsal.jogos.length; i++) {
                let div = document.createElement("div");
                let time_nome_1 = futsal.jogos[i].times[0].nome;
                let time_nome_2 = futsal.jogos[i].times[1].nome;

                let n1 = document.createElement("h3");
                let n2 = document.createElement("h3");

                div.setAttribute("id", "jogo-futsal-" + (i+1))

                n1.innerHTML = time_nome_1;
                n2.innerHTML = time_nome_2;
                div.appendChild(n1);
                div.appendChild(n2);
                conteudo.appendChild(div);
            }
        }

        else {
            let conteudo = document.getElementById("futsal-div");

            // Aqui dentro colocar "Não houve jogos desta modalidade"
            conteudo.innerHTML = "<h2> Não houve jogos desta modalidade </h2>"
        }

        if (volei.times.length != 0) {
            let conteudo = document.getElementById("volei-div");

            for (let i=0; i < volei.jogos.length; i++) {
                let div = document.createElement("div");
                let time_nome_1 = volei.jogos[i].times[0].nome;
                let time_nome_2 = volei.jogos[i].times[1].nome;

                let n1 = document.createElement("h3");
                let n2 = document.createElement("h3");

                div.setAttribute("id", "jogo-volei-" + (i+1))

                n1.innerHTML = time_nome_1;
                n2.innerHTML = time_nome_2;
                div.appendChild(n1);
                div.appendChild(n2);
                conteudo.appendChild(div);
            }
        }

        else {
            let conteudo = document.getElementById("volei-div");

            // Aqui dentro colocar "Não houve jogos desta modalidade"
            conteudo.innerHTML = "<h2> Não houve jogos desta modalidade </h2>"
        }
    }
}

// Funções das Modalidades

function Basquete() {
    document.getElementById("basquete-div").style = "";
    document.getElementById("futsal-div").style = "display: none;";
    document.getElementById("volei-div").style = "display: none;";
}

function Futsal() {
    document.getElementById("futsal-div").style = "";
    document.getElementById("basquete-div").style = "display: none;";
    document.getElementById("volei-div").style = "display: none;";
}

function Volei() {
    document.getElementById("volei-div").style = "";
    document.getElementById("basquete-div").style = "display: none;";
    document.getElementById("futsal-div").style = "display: none;";
}

let volei= new Esporte("Volei");
let futsal= new Esporte("Futsal");
let basquete= new Esporte("Basquete");

//Teste
let team1 = new Time("time 1", "Fabricação Mecânica");
let team2 = new Time("time 2", "Informática para a Internet");

basquete.adicionaTime(team1);
basquete.adicionaTime(team2);
// Fim Teste

// LOCAL STORAGE
