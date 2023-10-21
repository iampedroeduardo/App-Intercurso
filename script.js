class Time {
  nome;
  curso;
  pontos; //esse atributo funciona para pontuação geral quando time está dentro do esporte e pontuação de jogo no jogo
  avatar;
  esporte;
  constructor(nome, curso, esporte, avatar) {
    this.nome = nome;
    this.curso = curso;
    this.pontos = 0;
    this.esporte = esporte;
    this.avatar = avatar;
  }
}

class Esporte {
  nome;
  times;
  jogos;
  constructor(nome) {
    this.nome = nome;
    this.times = [];
    this.jogos = [];
  }
  adicionaTime(time) {
    this.times.push(time);
  }
  geraJogos(esporte) {
    for (let i = 0; i < this.times.length - 1; i++) {
      for (let j = i + 1; j < this.times.length; j++) {
        console.log(this.times[i], this.times[j]);
        let jogo = new Jogo(this.times[i], this.times[j], esporte);
        console.log(jogo);
        this.jogos.push(jogo);
      }
    }
  }
}

class Jogo {
  times;
  vencedor;
  esporte;
  constructor(time1, time2, esporte) {
    this.times = [];
    this.times.push(time1);
    this.times.push(time2);
    this.vencedor = '';
    this.esporte = esporte;
  }
}

class Curso {
  nome;
  pontos;
  constructor(nome) {
    this.nome = nome;
    this.pontos = 0;
  }
}

function pontos(nome, esporte) {
  let time;
  let curso;
  for (let i = 0; i < esportes[esporte].times.length; i++) {
  if (esportes[esporte].times[i].nome == nome) {
      esportes[esporte].times[i].pontos++;
      time = esportes[esporte].times[i];
      esportes[esporte].times.splice(i, 1);
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
  esportes[esporte].times = ordenaTimes(esportes[esporte], time);
}

function vencer(esporte, jogo, resultado) {
  esportes[esporte].jogos[jogo].vencedor = resultado;
  let botao1 = document.querySelector(`#btn-${esporte}-${jogo}-0`);
  botao1.remove();
  let botao2 = document.querySelector(`#btn-${esporte}-${jogo}-1`);
  botao2.remove();
  if(esporte == 1){
    let botao3 = document.querySelector(`#btn-${esporte}-${jogo}-empate`);
    botao3.remove();
  }
  let div = document.querySelector(`#jogo-${esporte}-${jogo+1}`);
  if (resultado == esportes[esporte].jogos[jogo].times[0].nome) {
    div.firstElementChild.firstElementChild.setAttribute('class', 'vencedor');
    div.lastElementChild.firstElementChild.setAttribute('class', 'perdedor');
  } else if (resultado == esportes[esporte].jogos[jogo].times[1].nome){
    div.lastElementChild.firstElementChild.setAttribute('class', 'vencedor');
    div.firstElementChild.firstElementChild.setAttribute('class', 'perdedor');
  } else {
    div.lastElementChild.firstElementChild.setAttribute('class', 'empatou');
    div.firstElementChild.firstElementChild.setAttribute('class', 'empatou');
  }

  pontos(resultado, esporte);
  localStorage.setItem('esportes', JSON.stringify(esportes));
  localStorage.setItem('cursos', JSON.stringify(cursos));
}

function ordenaCursos(curso) {
  let posicao = -1;
  for (let i = 0; i < cursos.length; i++) {
    if (cursos[i].pontos > curso.pontos) {
      posicao = i;
    }
  }
  cursos.splice(posicao + 1, 0, curso);
}

function ordenaTimes(esporte, time) {
  let posicao = -1;
  for (let i = 0; i < esporte.times.length; i++) {
    if (esporte.times[i].pontos > time.pontos) {
      posicao = i;
    }
  }
  esporte.times.splice(posicao + 1, 0, time);
  return esporte.times;
}

function criaTabelas() {
  for(let l=0;l<3;l++){
    let div = document.querySelector(`#${esportes[l].nome}-div-tab`);
    if (esportes[l].times.length != 0) {
      div.innerHTML = `<table class = "table table-striped" id = "tab-${esportes[l].nome}">
      <tbody id="tbody-${esportes[l].nome}">
              <tr>
                  <th colspan = 3>${esportes[l].nome[0].toUpperCase()}${esportes[l].nome.substring(1)}</th>
              </tr>
              <tr>
                  <th>Lugar</th>
                  <th>Times</th>
                  <th>Pontos</th>
              </tr>
              </tbody>
      </table>`;
      let posicao;
      for (let i = 0; i < esportes[l].times.length; i++) {
        let tabela = document.querySelector(`#tbody-${esportes[l].nome}`);
        if (i > 0) {
          if (!(esportes[l].times[i].pontos == esportes[l].times[i - 1].pontos)) {
            posicao = i + 1;
          }
        } else {
          posicao = i + 1;
        }
        tabela.innerHTML +=`
        <tr>
          <td>${posicao}</td>
          <td>${esportes[l].times[i].nome}</td>
          <td>${esportes[l].times[i].pontos}</td>
        </tr>
        `;
      }
    } else {
      div.innerHTML = '<h2> Não houve jogos desta modalidade </h2>';
    }
  }
  let div = document.querySelector('#cursos-div-tab');
  div.innerHTML = `<table class = "table table-striped" id = "tab-cursos">
  <tbody id="tbody-cursos">
        <tr>
            <th colspan = 3>Top Cursos</th>
        </tr>
        <tr>
            <th>Lugar</th>
            <th>Cursos</th>
            <th>Pontos</th>
        </tr>
        </tbody>
    </table>`;
  let posicao;
  for (let i = 0; i < cursos.length; i++) {
    let tabela = document.querySelector('#tbody-cursos');
    if (i > 0) {
      if (!(cursos[i].pontos == cursos[i - 1].pontos)) {
          posicao = i + 1;
      }
    } else {
      posicao = i + 1;
    }
    tabela.innerHTML += `
      <tr>
          <td>${posicao}</td>
          <td>${cursos[i].nome}</td>
          <td>${cursos[i].pontos}</td>
      </tr>
    `; 
  }
}
function checaNome(nome) {
  tof = true;
  for(let l=0;l<3;l++){
    for (let i = 0; i < esportes[l].times.length; i++) {
      if (esportes[l].times[i].nome == nome) {
        tof = false;
      }
    }
  }
  return tof;
}

function adiciona() {
  if (
    document.querySelector('#nome').value != '' &&
    document.querySelector('#curso').value != 'escolha' &&
    (document.querySelector('#basquete').checked ||
      document.querySelector('#volei').checked ||
      document.querySelector('#futsal').checked) && avatar!="" &&
    checaNome(document.querySelector('#nome').value)
  ) {
    let nome = document.querySelector('#nome').value;
    let curso = document.querySelector('#curso').value;
    if (document.querySelector('#basquete').checked) {
      let time = new Time(nome, curso, 'basquete',avatar);
      esportes[0].adicionaTime(time);
    }
    if (document.querySelector('#futsal').checked) {
      let time = new Time(nome, curso, 'futsal', avatar);
      esportes[1].adicionaTime(time);
    }
    if (document.querySelector('#volei').checked) {
      let time = new Time(nome, curso, 'volei', avatar);
      esportes[2].adicionaTime(time);
    }
    document.querySelector('#nome').value = '';
    document.querySelector('#curso').value = 'escolha';
    document.querySelector('#futsal').checked = false;
    document.querySelector('#volei').checked = false;
    document.querySelector('#basquete').checked = false;
    let div = document.querySelector(".foto-card");
    if(document.querySelector("#foto-card")==null){
      let img = document.createElement("img");
      img.setAttribute("src","img/add-foto.png");
      img.setAttribute("id","foto-card");
      div.style = "";
      div.appendChild(img);
    }
    avatar = "";

  } else if (
    document.querySelector('#nome').value == '' ||
    document.querySelector('#curso').value == 'escolha' ||
    (!document.querySelector('#basquete').checked &&
      !document.querySelector('#volei').checked &&
      !document.querySelector('#futsal').checked) || avatar == ""
  ) {
    abreAlert('Preencha todos os dados');
  } else if (!checaNome(document.querySelector('#nome').value)) {
    abreAlert('Você já cadastrou um time com esse nome!');
  }
}

function comeca(funcao) {
  if(funcao == 1){
    esportes = JSON.parse(localStorage.getItem('esportes'));
    cursos = JSON.parse(localStorage.getItem('cursos'));
  }
  if (
    esportes[0].times.length != 1 &&
    esportes[1].times.length != 1 &&
    esportes[2].times.length != 1 && 
    esportes[0].times.length <= 20 &&
    esportes[1].times.length <= 20 &&
    esportes[2].times.length <= 20 && 
    (esportes[0].times.length > 0 ||
      esportes[1].times.length > 0 ||
      esportes[2].times.length > 0) 
  ) {
    if (funcao == 0) {
      esportes[0].geraJogos('basquete');
      esportes[1].geraJogos('futsal');
      esportes[2].geraJogos('volei');
      localStorage.setItem('esportes', JSON.stringify(esportes));
      localStorage.setItem('cursos', JSON.stringify(cursos));
    }
    document.getElementById('inicio').style = 'display: none;';
    document.getElementById('jogos').style = '';

    // Cria Jogos
    for(let l=0;l<3;l++){
      let conteudo = document.getElementById(`${esportes[l].nome}-div`);
      if (esportes[l].times.length != 0) {
        for (let i = 0; i < esportes[l].jogos.length; i++) {
          conteudo.innerHTML += `
          <div class="jogo" id="jogo-${l}-${i+1}">
            <div class="time">
              <h3>${esportes[l].jogos[i].times[0].nome}</h3>
              <div class="foto" style="background-image:url('${esportes[l].jogos[i].times[0].avatar}');"></div>
              <input type="button" value="Vencer" id="btn-${l}-${i}-0" class="vencer" onclick="vencer(${l},${i},'${esportes[l].jogos[i].times[0].nome}')">
            </div>
            <div class="vs">
              <h2>VS</h2>
            </div>
            <div class="time">
              <h3>${esportes[l].jogos[i].times[1].nome}</h3>
              <div class="foto" style="background-image:url('${esportes[l].jogos[i].times[1].avatar}');"></div>
              <input type="button" value="Vencer" id="btn-${l}-${i}-1" class="vencer" onclick="vencer(${l},${i},'${esportes[l].jogos[i].times[1].nome}')">
            </div>
          </div>`
          if(l == 1){
            vs = document.querySelector(`#jogo-${l}-${i+1} .vs`);
            vs.innerHTML += `<button id="btn-${l}-${i}-empate" class="empate" onclick="vencer(${l},${i},'empate')"><img src="img/equal.png" alt="engual"></button>`
          }
          if(esportes[l].jogos[i].vencedor == esportes[l].jogos[i].times[0].nome){
            botao1 = document.querySelector(`#btn-${l}-${i}-0`);
            botao1.remove();
            botao2 = document.querySelector(`#btn-${l}-${i}-1`);
            botao2.remove();
            if(l == 1){
              botao3 = document.querySelector(`#btn-${l}-${i}-empate`);
              botao3.remove();
            }
            div = document.querySelector(`#jogo-${l}-${i+1}`);
            div.firstElementChild.firstElementChild.setAttribute('class', 'vencedor');
            div.lastElementChild.firstElementChild.setAttribute('class', 'perdedor');
          } else if(esportes[l].jogos[i].vencedor == esportes[l].jogos[i].times[1].nome){
            botao1 = document.querySelector(`#btn-${l}-${i}-0`);
            botao1.remove();
            botao2 = document.querySelector(`#btn-${l}-${i}-1`);
            botao2.remove();
            if(l == 1){
              botao3 = document.querySelector(`#btn-${l}-${i}-empate`);
              botao3.remove();
            }
            div = document.querySelector(`#jogo-${l}-${i+1}`);
            div.lastElementChild.firstElementChild.setAttribute('class', 'vencedor');
            div.firstElementChild.firstElementChild.setAttribute('class', 'perdedor');
          } else if(esportes[l].jogos[i].vencedor == "empate"){
            botao1 = document.querySelector(`#btn-${l}-${i}-0`);
            botao1.remove();
            botao2 = document.querySelector(`#btn-${l}-${i}-1`);
            botao2.remove();
            botao3 = document.querySelector(`#btn-${l}-${i}-empate`);
            botao3.remove();
            div = document.querySelector(`#jogo-${l}-${i+1}`);
            div.lastElementChild.firstElementChild.setAttribute('class', 'empatou');
            div.firstElementChild.firstElementChild.setAttribute('class', 'empatou');
          }
        }
      } else {
        conteudo.innerHTML = '<h2> Não houve jogos desta modalidade </h2>';
      }
    }
  }
  else{
    abreAlert('Você não tem times suficientes para começar!');
  }
}

function abreAlert(string){
  let div = document.querySelector(".alert");
  div.firstElementChild.innerHTML = string;
  div.style.display = "";
}
function fechaAlert(){
  let div = document.querySelector(".alert");
  div.style.display = "none";
}
// Funções das Modalidades Jogos

function Basquete() {
  document.getElementById('basquete-div').style = '';
  document.getElementById('futsal-div').style = 'display: none;';
  document.getElementById('volei-div').style = 'display: none;';
  document.getElementById('basquete-jogos').style =
    'background-color: var(--laranja)';
  document.getElementById('futsal-jogos').style =
    'background-color: var(--azul-claro-shade-escuro)';
  document.getElementById('volei-jogos').style =
    'background-color: var(--amarelo-shade-escuro)';
}

function Futsal() {
  document.getElementById('futsal-div').style = '';
  document.getElementById('basquete-div').style = 'display: none;';
  document.getElementById('volei-div').style = 'display: none;';
  document.getElementById('basquete-jogos').style =
    'background-color: var(--laranja-shade-escuro)';
  document.getElementById('futsal-jogos').style =
    'background-color: var(--azul-claro)';
  document.getElementById('volei-jogos').style =
    'background-color: var(--amarelo-shade-escuro)';
}

function Volei() {
  document.getElementById('volei-div').style = '';
  document.getElementById('basquete-div').style = 'display: none;';
  document.getElementById('futsal-div').style = 'display: none;';
  document.getElementById('basquete-jogos').style =
    'background-color: var(--laranja-shade-escuro)';
  document.getElementById('futsal-jogos').style =
    'background-color: var(--azul-claro-shade-escuro)';
  document.getElementById('volei-jogos').style =
    'background-color: var(--amarelo)';
}

// Funções das Modalidades Tabelas

function BasqueteTab() {
  document.getElementById('basquete-div-tab').style = '';
  document.getElementById('futsal-div-tab').style = 'display: none;';
  document.getElementById('volei-div-tab').style = 'display: none;';
  document.getElementById('cursos-div-tab').style = 'display: none;';
  document.getElementById('basquete-tabelas').style =
    'background-color: var(--laranja)';
  document.getElementById('futsal-tabelas').style =
    'background-color: var(--azul-claro-shade-escuro)';
  document.getElementById('volei-tabelas').style =
    'background-color: var(--amarelo-shade-escuro)';
}

function FutsalTab() {
  document.getElementById('futsal-div-tab').style = '';
  document.getElementById('basquete-div-tab').style = 'display: none;';
  document.getElementById('volei-div-tab').style = 'display: none;';
  document.getElementById('cursos-div-tab').style = 'display: none;';
  document.getElementById('basquete-tabelas').style =
    'background-color: var(--laranja-shade-escuro)';
  document.getElementById('futsal-tabelas').style =
    'background-color: var(--azul-claro)';
  document.getElementById('volei-tabelas').style =
    'background-color: var(--amarelo-shade-escuro)';
  document.getElementById('top-cursos').style =
    'background-color: var(--amarelo-shade-escuro)';
}

function VoleiTab() {
  document.getElementById('volei-div-tab').style = '';
  document.getElementById('basquete-div-tab').style = 'display: none;';
  document.getElementById('futsal-div-tab').style = 'display: none;';
  document.getElementById('cursos-div-tab').style = 'display: none;';
  document.getElementById('basquete-tabelas').style =
    'background-color: var(--laranja-shade-escuro)';
  document.getElementById('futsal-tabelas').style =
    'background-color: var(--azul-claro-shade-escuro)';
  document.getElementById('volei-tabelas').style =
    'background-color: var(--amarelo)';
  document.getElementById('top-cursos').style =
    'background-color: var(--amarelo-shade-escuro)';
}

function CursosTab() {
  document.querySelector('#cursos-div-tab').style = '';
  document.getElementById('basquete-div-tab').style = 'display: none';
  document.getElementById('futsal-div-tab').style = 'display: none;';
  document.getElementById('volei-div-tab').style = 'display: none;';
  document.getElementById('basquete-tabelas').style =
    'background-color: var(--laranja-shade-escuro)';
  document.getElementById('futsal-tabelas').style =
    'background-color: var(--azul-claro-shade-escuro)';
  document.getElementById('volei-tabelas').style =
    'background-color: var(--amarelo-shade-escuro)';
  document.getElementById('top-cursos').style =
    'background-color: var(--amarelo)';
}
// Avatar

let avatar = "";
function abreAvatares(){
  let div = document.querySelector("#avatares");
  div.style.display = "";
}

function fechaAvatares(){
  let div = document.querySelector("#avatares");
  div.style.display = "none";
}

function Avatar(foto){
  if(document.querySelector("#foto-card")!=null){
    let img = document.querySelector("#foto-card");
    img.remove();
  }
  let div = document.querySelector(".foto-card");
  div.style = "background-image: url(" + foto + ");";
  avatar = foto;
  fechaAvatares();
}

// Troca de Página

function ranking() {
  document.querySelector('#jogos').style.display = 'none';
  document.querySelector('#tabelas').style.display = '';
  criaTabelas();
}

function jogos() {
  document.querySelector('#jogos').style.display = '';
  document.querySelector('#tabelas').style.display = 'none';
}

//Modalidades

let volei = new Esporte('volei');
let futsal = new Esporte('futsal');
let basquete = new Esporte('basquete');
let esportes = [basquete,futsal,volei];
//Cursos

let info = new Curso('Informática para Internet');
let auto = new Curso('Automação Industrial');
let refri = new Curso('Refrigeração e Climatização');
let geo = new Curso('Geoprocessamento');
let fabri = new Curso('Fabricação Mecânica');
let eletro = new Curso('Eletrotécnica');
let engenharia = new Curso('Engenharia Mecânica');
let tads = new Curso('Análise e Desenvolvimento de Sistemas');
let enfermagem = new Curso('Enfermagem');

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
