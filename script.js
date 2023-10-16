class Time{
    nome;
    curso;
    pontos;//esse atributo funciona para pontuação geral quando time está dentro do esporte e pontuação de jogo no jogo
    avatar;
    esporte;
    constructor(nome,curso,esporte) {
        this.nome=nome;
        this.curso=curso;
        this.pontos=0;
        this.esporte=esporte;
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
    geraJogos(esporte) {
        for(let i=0; i<this.times.length-1; i++) {
            for(let j=i+1; j<this.times.length; j++) {
                console.log(this.times[i],this.times[j]);
                let jogo= new Jogo(this.times[i],this.times[j],esporte);
                console.log(jogo);
                this.jogos.push(jogo);
            }
        }
    }
}

class Jogo{
    times;
    vencedor;
    esporte;
    constructor(time1,time2,esporte){
        this.times = [];
        this.times.push(time1);
        this.times.push(time2);
        this.vencedor = " ";
        this.esporte = esporte;
    }
}

class Curso{
    nome;
    pontos;
    constructor(nome){
        this.nome = nome;
        this.pontos = 0;
    }
}

function pontos(nome, esporte) {
    if (esporte == "volei") {
        let time;
        let curso;
        for (let i = 0; i < volei.times.length; i++) {
            if (volei.times[i].nome == nome){
                volei.times[i].pontos++;
                time = volei.times[i];
                volei.times.splice(i, 1);
                for (let i = 0; i < cursos.length; i++) {
                    if (time.curso == cursos[i].nome) {
                        cursos[i].pontos++;
                        curso = cursos[i];
                        cursos.splice(i, 1);
                        ordenaCursos(curso);
                    }
                }
            }
        }
        volei.times = ordenaTimes(volei,time);
    }

    if (esporte == "futsal") {
        let time;
        let curso;
        for(let i=0;i<futsal.times.length;i++){
            if(futsal.times[i].nome == nome){
                futsal.times[i].pontos++;
                time = futsal.times[i];
                futsal.times.splice(i,1);
                for(let i=0;i<cursos.length;i++){
                    if(time.curso == cursos[i].nome){
                        cursos[i].pontos++;
                        curso = cursos[i];
                        cursos.splice(i,1);
                        ordenaCursos(curso);
                    }
                }
            }
        }
        futsal.times = ordenaTimes(futsal, time);
    }

    if (esporte == "basquete") {
        let time;
        let curso;
        for(let i=0;i<basquete.times.length;i++){
            if(basquete.times[i].nome == nome){
                basquete.times[i].pontos++;
                time = basquete.times[i];
                basquete.times.splice(i,1);
                for(let i=0;i<cursos.length;i++){
                    if(time.curso == cursos[i].nome){
                        cursos[i].pontos++;
                        curso = cursos[i];
                        cursos.splice(i,1);
                        ordenaCursos(curso);
                    }
                }
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
    localStorage.setItem("volei", JSON.stringify(volei));
    localStorage.setItem("futsal", JSON.stringify(futsal));
    localStorage.setItem("basquete", JSON.stringify(basquete));
    localStorage.setItem("cursos", JSON.stringify(cursos));
}

function ordenaCursos(curso){
    let posicao = -1;
    for (let i = 0; i < cursos.length; i++) {
        if (cursos[i].pontos > curso.pontos) {
            posicao = i;
        }
    }
    cursos.splice(posicao + 1, 0, curso);
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
        div.innerHTML = `<table class = "tabela" id = "tab-futsal">
            <tr>
                <th colspan = 3>Futsal</th>
            </tr>
            <tr>
                <th>Classificação</th>
                <th>Times</th>
                <th>Pontos</th>
            </tr>
        </table>`
        let posicao;
        for (let i = 0; i < futsal.times.length; i++) {
            let tabela = document.querySelector("#tab-futsal");
            let tr = document.createElement("tr");
            let td_class = document.createElement("td");
            let td_times = document.createElement("td");
            let td_pontos = document.createElement("td");
            if (i > 0) {
                if (futsal.times[i].pontos == futsal.times[i - 1].pontos) {
                    td_class.innerHTML = posicao;
                }
                else {
                    posicao = i + 1;
                    td_class.innerHTML = posicao;
                }
            }
            else {
                posicao = i + 1;
                td_class.innerHTML = posicao;
            }
            
            td_times.innerHTML = futsal.times[i].nome;
            td_pontos.innerHTML = futsal.times[i].pontos;
            
            tr.appendChild(td_class);
            tr.appendChild(td_times);
            tr.appendChild(td_pontos);
            tabela.appendChild(tr);
        }
    }
    
    else{
        let div = document.querySelector("#futsal-div-tab");
        div.innerHTML = "<h2> Não houve jogos desta modalidade </h2>"
    }

    if (volei.times.length != 0) {
        let div = document.querySelector("#volei-div-tab");
        div.innerHTML = `<table class = "tabela" id = "tab-volei">
            <tr>
                <th colspan = 3>Volei</th>
            </tr>
            <tr>
                <th>Classificação</th>
                <th>Times</th>
                <th>Pontos</th>
            </tr>
        </table>`
        let posicao;
        for(let i = 0; i<volei.times.length; i++){
            let tabela = document.querySelector("#tab-volei");
            let tr = document.createElement("tr");
            let td_class = document.createElement("td");
            let td_times = document.createElement("td");
            let td_pontos = document.createElement("td");
            if(i>0){
                if(volei.times[i].pontos == volei.times[i-1].pontos){
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
            
            td_times.innerHTML = volei.times[i].nome;
            td_pontos.innerHTML = volei.times[i].pontos;

            tr.appendChild(td_class);
            tr.appendChild(td_times);
            tr.appendChild(td_pontos);
            tabela.appendChild(tr);
        }

    }
    else {
        let div = document.querySelector("#volei-div-tab");
        div.innerHTML = "<h2> Não houve jogos desta modalidade </h2>"
    }
    let div = document.querySelector("#cursos-div-tab");
    div.innerHTML = `<table class = "tabela" id = "tab-cursos">
        <tr>
            <th colspan = 3>Cursos</th>
        </tr>
        <tr>
            <th>Classificação</th>
            <th>Cursos</th>
            <th>Pontos</th>
        </tr>
    </table>`
    let posicao;
    for(let i = 0; i<cursos.length; i++){
        let tabela = document.querySelector("#tab-cursos");
        let tr = document.createElement("tr");
        let td_class = document.createElement("td");
        let td_times = document.createElement("td");
        let td_pontos = document.createElement("td");
        if(i>0){
            if(cursos[i].pontos == cursos[i-1].pontos){
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
        
        td_times.innerHTML = cursos[i].nome;
        td_pontos.innerHTML = cursos[i].pontos;

        tr.appendChild(td_class);
        tr.appendChild(td_times);
        tr.appendChild(td_pontos);
        tabela.appendChild(tr);
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
    ) {
        let nome=document.querySelector("#nome").value;
        let curso=document.querySelector("#curso").value;
        if(document.querySelector("#basquete").checked){
            let time= new Time(nome,curso,"basquete");
            basquete.adicionaTime(time);
        }
        if(document.querySelector("#volei").checked){
            let time= new Time(nome,curso,"volei");
            volei.adicionaTime(time);
        }
        if(document.querySelector("#futsal").checked){
            let time= new Time(nome,curso,"futsal");
            futsal.adicionaTime(time);
        }
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
    ) {
        alert("Preencha todos os dados")
    }

    else if(!checaNome(document.querySelector("#nome").value)){
        alert("Você já cadastrou um time com esse nome!");
    }
}

function comeca(funcao){
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
        if(funcao == 0){
            volei.geraJogos("volei");
            futsal.geraJogos("futsal");
            basquete.geraJogos("basquete");
            localStorage.setItem("volei", JSON.stringify(volei));
            localStorage.setItem("futsal", JSON.stringify(futsal));
            localStorage.setItem("basquete", JSON.stringify(basquete));
            localStorage.setItem("cursos", JSON.stringify(cursos));
        }
        else{
            volei = JSON.parse(localStorage.getItem("volei"));
            futsal = JSON.parse(localStorage.getItem("futsal"));
            basquete = JSON.parse(localStorage.getItem("basquete"));
            cursos = JSON.parse(localStorage.getItem("cursos"));
        }
        document.getElementById("inicio").style = "display: none;";
        document.getElementById("jogos").style = "";

        // Cria Jogos

        if (basquete.times.length != 0) {
            let conteudo = document.getElementById("basquete-div");

            for (let i=0; i < basquete.jogos.length; i++) {
                if(basquete.jogos[i].vencedor == " "){
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

                    if (basquete.jogos[i].vencedor == basquete.jogos[i].times[0].nome) {
                        n1.setAttribute("class", "vencedor");
                        n2.setAttribute("class", "perdedor");
                    }

                    else {;
                        n2.setAttribute("class", "vencedor");
                        n1.setAttribute("class", "perdedor");
                    }

                    n1.innerHTML = time_nome_1;
                    n2.innerHTML = time_nome_2;
                    x.innerHTML = "VS";
                    div_time_1.appendChild(n1);
                    div_time_2.appendChild(n2);
                    div.appendChild(div_time_1);
                    div.appendChild(x);
                    div.appendChild(div_time_2);
                    conteudo.appendChild(div);
                }
            }
        }

        else {
            let conteudo = document.getElementById("basquete-div");

            // Aqui dentro colocar "Não houve jogos desta modalidade"
            conteudo.innerHTML = "<h2> Não houve jogos desta modalidade </h2>"
        }

        if (futsal.times.length != 0) {
            let conteudo = document.getElementById("futsal-div");

            for (let i=0; i < futsal.jogos.length; i++) {
                if(futsal.jogos[i].vencedor == " "){
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

                else {
                    let div = document.createElement("div");
                    let div_time_1 = document.createElement("div");
                    let div_time_2 = document.createElement("div");
                    let time_nome_1 = futsal.jogos[i].times[0].nome;
                    let time_nome_2 = futsal.jogos[i].times[1].nome;

                    let n1 = document.createElement("h3");
                    let n2 = document.createElement("h3");
                    let x = document.createElement("h2");

                    div_time_1.setAttribute("class","time");
                    div_time_2.setAttribute("class","time");
                    div.setAttribute("id", "jogo-futsal-" + (i+1));
                    div.setAttribute("class","jogo");

                    if (futsal.jogos[i].vencedor == futsal.jogos[i].times[0].nome) {
                        n1.setAttribute("class", "vencedor");
                        n2.setAttribute("class", "perdedor");
                    }

                    else {;
                        n2.setAttribute("class", "vencedor");
                        n1.setAttribute("class", "perdedor");
                    }

                    n1.innerHTML = time_nome_1;
                    n2.innerHTML = time_nome_2;
                    x.innerHTML = "VS";
                    div_time_1.appendChild(n1);
                    div_time_2.appendChild(n2);
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

        if (volei.times.length != 0) {
            let conteudo = document.getElementById("volei-div");

            for (let i=0; i < volei.jogos.length; i++) {
                if(volei.jogos[i].vencedor == " "){
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

                else {
                    let div = document.createElement("div");
                    let div_time_1 = document.createElement("div");
                    let div_time_2 = document.createElement("div");
                    let time_nome_1 = volei.jogos[i].times[0].nome;
                    let time_nome_2 = volei.jogos[i].times[1].nome;

                    let n1 = document.createElement("h3");
                    let n2 = document.createElement("h3");
                    let x = document.createElement("h2");

                    div_time_1.setAttribute("class","time");
                    div_time_2.setAttribute("class","time");
                    div.setAttribute("id", "jogo-volei-" + (i+1));
                    div.setAttribute("class","jogo");

                    if (volei.jogos[i].vencedor == volei.jogos[i].times[0].nome) {
                        n1.setAttribute("class", "vencedor");
                        n2.setAttribute("class", "perdedor");
                    }

                    else {;
                        n2.setAttribute("class", "vencedor");
                        n1.setAttribute("class", "perdedor");
                    }

                    n1.innerHTML = time_nome_1;
                    n2.innerHTML = time_nome_2;
                    x.innerHTML = "VS";
                    div_time_1.appendChild(n1);
                    div_time_2.appendChild(n2);
                    div.appendChild(div_time_1);
                    div.appendChild(x);
                    div.appendChild(div_time_2);
                    conteudo.appendChild(div);
                }
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
    document.getElementById("cursos-div-tab").style = "display: none;";
}

function FutsalTab() {
    document.getElementById("futsal-div-tab").style = "";
    document.getElementById("basquete-div-tab").style = "display: none;";
    document.getElementById("volei-div-tab").style = "display: none;";
    document.getElementById("cursos-div-tab").style = "display: none;";
}

function VoleiTab() {
    document.getElementById("volei-div-tab").style = "";
    document.getElementById("basquete-div-tab").style = "display: none;";
    document.getElementById("futsal-div-tab").style = "display: none;";
    document.getElementById("cursos-div-tab").style = "display: none;";
}

function CursosTab() {
    document.querySelector("#cursos-div-tab").style = "";
    document.getElementById("basquete-div-tab").style = "display: none";
    document.getElementById("futsal-div-tab").style = "display: none;";
    document.getElementById("volei-div-tab").style = "display: none;";
}

// Troca de Página

function ranking() {
    document.querySelector("#jogos").style.display = "none";
    document.querySelector("#tabelas").style.display = "";    
    criaTabelas();
}

function jogos() {
    document.querySelector("#jogos").style.display = "";
    document.querySelector("#tabelas").style.display = "none";    
}

//Modalidades

let volei = new Esporte("Volei");
let futsal = new Esporte("Futsal");
let basquete = new Esporte("Basquete");

//Cursos

let info = new Curso("Informática para Internet");
let auto = new Curso("Automação Industrial");
let refri = new Curso("Refrigeração e Climatização");
let geo = new Curso("Geoprocessamento");
let fabri = new Curso("Fabricação Mecânica");
let eletro = new Curso("Eletrotécnica");
let engenharia = new Curso("Engenharia Mecânica");
let tads = new Curso("Análise e Desenvolvimento de Sistemas");
let enfermagem = new Curso("Enfermagem");

let cursos = [];
cursos.push(info);
cursos.push(auto);
cursos.push(refri);
cursos.push(geo);
cursos.push(fabri);
cursos.push(eletro);
cursos.push(engenharia);
cursos.push(tads);
cursos.push(enfermagem);

//Teste
let team1b = new Time("time 1", "Fabricação Mecânica", "basquete");
let team1v = new Time("time 1", "Fabricação Mecânica", "volei");
let team1f = new Time("time 1", "Fabricação Mecânica", "futsal");

let team2b = new Time("time 2", "Informática para Internet", "basquete");
let team2v = new Time("time 2", "Informática para Internet", "volei");
let team2f = new Time("time 2", "Informática para Internet", "futsal");

let team3b = new Time("time 3", "Fabricação Mecânica", "basquete");
let team3v = new Time("time 3", "Fabricação Mecânica", "volei");
let team3f = new Time("time 3", "Fabricação Mecânica", "futsal");

let team4b = new Time("time 4", "Informática para Internet", "basquete");
let team4v = new Time("time 4", "Informática para Internet", "volei");
let team4f = new Time("time 4", "Informática para Internet", "futsal");

basquete.adicionaTime(team1b);
basquete.adicionaTime(team2b);
basquete.adicionaTime(team3b);
basquete.adicionaTime(team4b);

volei.adicionaTime(team1v);
volei.adicionaTime(team2v);
volei.adicionaTime(team3v);
volei.adicionaTime(team4v);

futsal.adicionaTime(team1f);
futsal.adicionaTime(team2f);
futsal.adicionaTime(team3f);
futsal.adicionaTime(team4f);
// Fim Teste

// LOCAL STORAGE
