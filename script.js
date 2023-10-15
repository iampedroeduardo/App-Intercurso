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
    vencedor;
    constructor(time1,time2){
        this.times = [];
        this.times.push(time1);
        this.times.push(time2);
    }
    aumentaPontos(time){//time é um número 0 ou 1 informado no onclick do aumento de pontuação
        this.times[time].pontos++;
    }
}

function pontos(nome, esporte) {
    if (esporte == "volei") {
        for (let i = 0; i < volei.times.length; i++) {
            if (volei.times[i].nome == nome){
                volei.times[i].pontos += 1;
            }
        }
    }

    if (esporte == "futsal") {
        for(let i=0;i<futsal.times.length;i++){
            if(futsal.times[i].nome == nome){
                futsal.times[i].pontos++;
            }
        }
    }

    if (esporte == "basquete") {
        let time;
        for(let i=0;i<basquete.times.length;i++){
            if(basquete.times[i].nome == nome){
                basquete.times[i].pontos++;
                time = basquete.times[i];
                basquete.times.splice(i,1);
            }
        }
        basquete.times = ordenaTimes(basquete,time);
    }
}

function vencer(esporte,jogo,resultado){
    if(esporte=="volei"){
        volei.jogos[jogo].vencedor = resultado;
        let botao1 = document.querySelector("#btn-volei-"+jogo+"-0");
        botao1.remove();
        let botao2 = document.querySelector("#btn-volei-"+jogo+"-1");
        botao2.remove();
        let div = document.querySelector("#jogo-volei-" + (jogo+1));
        if(resultado == volei.jogos[jogo].times[0].nome){
            div.firstChild.firstChild.setAttribute("class","vencedor");
            div.lastChild.firstChild.setAttribute("class","perdedor");
        }
        else{
            div.lastChild.firstChild.setAttribute("class","vencedor");
            div.firstChild.firstChild.setAttribute("class","perdedor");
        }
        pontos(resultado,esporte);
    }
    else if(esporte=="basquete"){
        basquete.jogos[jogo].vencedor = resultado;
        let botao1 = document.querySelector("#btn-basquete-"+jogo+"-0");
        botao1.remove();
        let botao2 = document.querySelector("#btn-basquete-"+jogo+"-1");
        botao2.remove();
        let div = document.querySelector("#jogo-basquete-" + (jogo+1));
        if(resultado == basquete.jogos[jogo].times[0].nome){
            div.firstChild.firstChild.setAttribute("class","vencedor");
            div.lastChild.firstChild.setAttribute("class","perdedor");
        }
        else{
            div.lastChild.firstChild.setAttribute("class","vencedor");
            div.firstChild.firstChild.setAttribute("class","perdedor");
        }
        pontos(resultado,esporte);
    }
    else if(esporte=="futsal"){
        futsal.jogos[jogo].vencedor = resultado;
        let botao1 = document.querySelector("#btn-futsal-"+jogo+"-0");
        botao1.remove();
        let botao2 = document.querySelector("#btn-futsal-"+jogo+"-1");
        botao2.remove();
        let div = document.querySelector("#jogo-futsal-" + (jogo+1));
        if(resultado == futsal.jogos[jogo].times[0].nome){
            div.firstChild.firstChild.setAttribute("class","vencedor");
            div.lastChild.firstChild.setAttribute("class","perdedor");
        }
        else{
            div.lastChild.firstChild.setAttribute("class","vencedor");
            div.firstChild.firstChild.setAttribute("class","perdedor");
        }
        pontos(resultado,esporte);
    }
}

function ordenaTimes(esporte){
    let copia = esporte.times;
    let times_class = [];
    let posicao = 0;
    console.log(esporte.times.length);
    console.log(copia);
    for(let i=0; i<esporte.times.length; i++){
        let time = copia[0];
        let posicao = 0;
        for(let c=0; c<copia.length; c++){
            if (copia[c].pontos > time.pontos){
                time = copia[c];
                posicao = c;
            }
        }
        times_class.push(time);
        copia.splice(posicao,1);
        console.log(i);
    }
    return times_class;
}

function ordenaTimes(esporte, time){
    let posicao = -1;
    for(let i=0;i<esporte.times.length;i++){
        if(esporte.times[i].pontos>time.pontos){
            posicao = i;
        }
    }
    esporte.times.splice(posicao+1,0,time);
    return esporte.times; 
}

function criaTabelas() {

    if (basquete.times.length != 0) {
        let div = document.querySelector("#basquete-div-tab");
        div.innerHTML = `<table class = "tabela" id = "tab-basquete">
            <tr>
                <th colspan = 3>Basquete</th>
            </tr>
            <tr>
                <th>Classificação</th>
                <th>Times</th>
                <th>Pontos</th>
            </tr>
        </table>`
        let posicao;
        for(let i = 0; i<basquete.times.length; i++){
            let tabela = document.querySelector("#tab-basquete");
            let tr = document.createElement("tr");
            let td_class = document.createElement("td");
            let td_times = document.createElement("td");
            let td_pontos = document.createElement("td");
            if(i>0){
                if(basquete.times[i].pontos == basquete.times[i-1].pontos){
                    td_class.innerHTML = posicao;
                } 
                else{
                    posicao = i+1;
                    td_class.innerHTML = posicao;
                }
            }
            else{
                posicao = i+1;
                td_class.innerHTML = posicao;
            }
            
            td_times.innerHTML = basquete.times[i].nome;
            td_pontos.innerHTML = basquete.times[i].pontos;

            tr.appendChild(td_class);
            tr.appendChild(td_times);
            tr.appendChild(td_pontos);
            tabela.appendChild(tr);
        }
    }
    else{
        let div = document.querySelector("#basquete-div-tab");
        div.innerHTML = "<h2> Não houve jogos desta modalidade </h2>"
    }

    if (futsal.times.length != 0) {
        let div = document.querySelector("#futsal-div-tab");


    }
    else{
        let div = document.querySelector("#futsal-div-tab");
        div.innerHTML = "<h2> Não houve jogos desta modalidade </h2>"
    }

    if (volei.times.length != 0) {
        let div = document.querySelector("#volei-div-tab");

    }
    else {
        let div = document.querySelector("#volei-div-tab");
        div.innerHTML = "<h2> Não houve jogos desta modalidade </h2>"
    }
}

function checaNome(nome){
    tof = true;
    for(let i=0;i<basquete.times.length;i++){
        if(basquete.times[i].nome == nome){
            tof = false;
        }
    }
    for(let i=0;i<volei.times.length;i++){
        if(volei.times[i].nome == nome){
            tof = false;
        }
    }
    for(let i=0;i<futsal.times.length;i++){
        if(futsal.times[i].nome == nome){
            tof = false;
        }
    }
    return tof;
}

function adiciona(){
    if (
        (document.querySelector("#nome").value != "") && 
        (document.querySelector("#curso").value != "escolha") && (
            (document.querySelector("#basquete").checked) || 
            (document.querySelector("#volei").checked) ||
            (document.querySelector("#futsal").checked)
        ) && checaNome(document.querySelector("#nome").value)
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

    else if(
        (document.querySelector("#nome").value == "") || 
        (document.querySelector("#curso").value == "escolha") || 
        (
            (!document.querySelector("#basquete").checked) && 
            (!document.querySelector("#volei").checked) &&
            (!document.querySelector("#futsal").checked)
        )
    ){
        alert("Preencha todos os dados")
    }

    else if(!checaNome(document.querySelector("#nome").value)){
        alert("Você já cadastrou um time com esse nome!");
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
                if(vencedor == undefined){
                    let div = document.createElement("div");
                    let div_time_1 = document.createElement("div");
                    let div_time_2 = document.createElement("div");
                    let time_nome_1 = basquete.jogos[i].times[0].nome;
                    let time_nome_2 = basquete.jogos[i].times[1].nome;

                    let button1 = document.createElement("input");
                    let button2 = document.createElement("input");
                    button1.type = "button";
                    button2.type = "button";
                    button1.value = "Vencer";
                    button2.value = "Vencer";
                    button1.id = "btn-basquete-"+i+"-0";
                    button2.id = "btn-basquete-"+i+"-1";
                    button1.setAttribute("class","vencer");
                    button2.setAttribute("class","vencer");
                    button1.setAttribute("onclick","vencer('basquete',"+i+",basquete.jogos["+i+"].times[0].nome)");
                    button2.setAttribute("onclick","vencer('basquete',"+i+",basquete.jogos["+i+"].times[1].nome)");

                    let n1 = document.createElement("h3");
                    let n2 = document.createElement("h3");
                    let x = document.createElement("h2");

                    div_time_1.setAttribute("class","time");
                    div_time_2.setAttribute("class","time");
                    div.setAttribute("id", "jogo-basquete-" + (i+1));
                    div.setAttribute("class","jogo");

                    n1.innerHTML = time_nome_1;
                    n2.innerHTML = time_nome_2;
                    x.innerHTML = "VS";
                    div_time_1.appendChild(n1);
                    div_time_1.appendChild(button1);
                    div_time_2.appendChild(n2);
                    div_time_2.appendChild(button2);
                    div.appendChild(div_time_1);
                    div.appendChild(x);
                    div.appendChild(div_time_2);
                    conteudo.appendChild(div);
                }

                else {
                    let div = document.createElement("div");
                    let div_time_1 = document.createElement("div");
                    let div_time_2 = document.createElement("div");
                    let time_nome_1 = basquete.jogos[i].times[0].nome;
                    let time_nome_2 = basquete.jogos[i].times[1].nome;

                    let n1 = document.createElement("h3");
                    let n2 = document.createElement("h3");
                    let x = document.createElement("h2");

                    div_time_1.setAttribute("class","time");
                    div_time_2.setAttribute("class","time");
                    div.setAttribute("id", "jogo-basquete-" + (i+1));
                    div.setAttribute("class","jogo");

                    if(vencedor == basquete.jogos[i].times[0].nome) {
                        n1.setAttribute("class", "vencedor");
                        n2.setAttribute("class", "perdedor");
                    }

                    else {
                        n1.setAttribute("class", "vencedor");
                        n2.setAttribute("class", "perdedor");
                    }

                    n1.innerHTML = time_nome_1;
                    n2.innerHTML = time_nome_2;
                    x.innerHTML = "VS";
                    div_time_1.appendChild(n1);
                    div_time_1.appendChild(button1);
                    div_time_2.appendChild(n2);
                    div_time_2.appendChild(button2);
                    div.appendChild(div_time_1);
                    div.appendChild(x);
                    div.appendChild(div_time_2);
                    conteudo.appendChild(div);
                }
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
                let div_time_1 = document.createElement("div");
                let div_time_2 = document.createElement("div");
                let time_nome_1 = futsal.jogos[i].times[0].nome;
                let time_nome_2 = futsal.jogos[i].times[1].nome;

                let button1 = document.createElement("input");
                let button2 = document.createElement("input");
                button1.type = "button";
                button2.type = "button";
                button1.value = "Vencer";
                button2.value = "Vencer";
                button1.id = "btn-futsal-"+i+"-0";
                button2.id = "btn-futsal-"+i+"-1";
                button1.setAttribute("class","vencer");
                button2.setAttribute("class","vencer");
                button1.setAttribute("onclick","vencer('futsal',"+i+",futsal.jogos["+i+"].times[0].nome)");
                button2.setAttribute("onclick","vencer('futsal',"+i+",futsal.jogos["+i+"].times[1].nome)");

                let n1 = document.createElement("h3");
                let n2 = document.createElement("h3");
                let x = document.createElement("h2");

                div_time_1.setAttribute("class","time");
                div_time_2.setAttribute("class","time");
                div.setAttribute("id", "jogo-futsal-" + (i+1));
                div.setAttribute("class","jogo");

                n1.innerHTML = time_nome_1;
                n2.innerHTML = time_nome_2;
                x.innerHTML = "VS";
                div_time_1.appendChild(n1);
                div_time_1.appendChild(button1);
                div_time_2.appendChild(n2);
                div_time_2.appendChild(button2);
                div.appendChild(div_time_1);
                div.appendChild(x);
                div.appendChild(div_time_2);
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
                let div_time_1 = document.createElement("div");
                let div_time_2 = document.createElement("div");
                let time_nome_1 = volei.jogos[i].times[0].nome;
                let time_nome_2 = volei.jogos[i].times[1].nome;

                let button1 = document.createElement("input");
                let button2 = document.createElement("input");
                button1.type = "button";
                button2.type = "button";
                button1.value = "Vencer";
                button2.value = "Vencer";
                button1.id = "btn-volei-"+i+"-0";
                button2.id = "btn-volei-"+i+"-1";
                button1.setAttribute("class","vencer");
                button2.setAttribute("class","vencer");
                button1.setAttribute("onclick","vencer('volei',"+i+",volei.jogos["+i+"].times[0].nome)");
                button2.setAttribute("onclick","vencer('volei',"+i+",volei.jogos["+i+"].times[1].nome)");

                let n1 = document.createElement("h3");
                let n2 = document.createElement("h3");
                let x = document.createElement("h2");

                div_time_1.setAttribute("class","time");
                div_time_2.setAttribute("class","time");
                div.setAttribute("id", "jogo-volei-" + (i+1));
                div.setAttribute("class","jogo");

                n1.innerHTML = time_nome_1;
                n2.innerHTML = time_nome_2;
                x.innerHTML = "VS";
                div_time_1.appendChild(n1);
                div_time_1.appendChild(button1);
                div_time_2.appendChild(n2);
                div_time_2.appendChild(button2);
                div.appendChild(div_time_1);
                div.appendChild(x);
                div.appendChild(div_time_2);
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

// Funções das Modalidades Jogos

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

// Funções das Modalidades Tabelas

function BasqueteTab() {
    document.getElementById("basquete-div-tab").style = "";
    document.getElementById("futsal-div-tab").style = "display: none;";
    document.getElementById("volei-div-tab").style = "display: none;";
}

function FutsalTab() {
    document.getElementById("futsal-div-tab").style = "";
    document.getElementById("basquete-div-tab").style = "display: none;";
    document.getElementById("volei-div-tab").style = "display: none;";
}

function VoleiTab() {
    document.getElementById("volei-div-tab").style = "";
    document.getElementById("basquete-div-tab").style = "display: none;";
    document.getElementById("futsal-div-tab").style = "display: none;";
}

// Troca de Página

function ranking(){
    document.querySelector("#jogos").style.display = "none";
    document.querySelector("#tabelas").style.display = "";    
    criaTabelas();
}

function jogos(){
    document.querySelector("#jogos").style.display = "";
    document.querySelector("#tabelas").style.display = "none";    
}

let volei= new Esporte("Volei");
let futsal= new Esporte("Futsal");
let basquete= new Esporte("Basquete");

//Teste
let team1 = new Time("time 1", "Fabricação Mecânica");
let team2 = new Time("time 2", "Informática para a Internet");
let team3 = new Time("time 3", "Fabricação Mecânica");
let team4 = new Time("time 4", "Informática para a Internet");

basquete.adicionaTime(team1);
basquete.adicionaTime(team2);
basquete.adicionaTime(team3);
basquete.adicionaTime(team4);
// Fim Teste

// LOCAL STORAGE
