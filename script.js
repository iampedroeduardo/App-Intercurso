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
    this.vencedor = ' ';
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
  if (esporte == 'volei') {
    let time;
    let curso;
    for (let i = 0; i < volei.times.length; i++) {
      if (volei.times[i].nome == nome) {
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
    volei.times = ordenaTimes(volei, time);
  }

  if (esporte == 'futsal') {
    let time;
    let curso;
    for (let i = 0; i < futsal.times.length; i++) {
      if (futsal.times[i].nome == nome) {
        futsal.times[i].pontos++;
        time = futsal.times[i];
        futsal.times.splice(i, 1);
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
    futsal.times = ordenaTimes(futsal, time);
  }

  if (esporte == 'basquete') {
    let time;
    let curso;
    for (let i = 0; i < basquete.times.length; i++) {
      if (basquete.times[i].nome == nome) {
        basquete.times[i].pontos++;
        time = basquete.times[i];
        basquete.times.splice(i, 1);
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
    basquete.times = ordenaTimes(basquete, time);
  }
}

function vencer(esporte, jogo, resultado) {
  if (esporte == 'volei') {
    volei.jogos[jogo].vencedor = resultado;
    let botao1 = document.querySelector('#btn-volei-' + jogo + '-0');
    botao1.remove();
    let botao2 = document.querySelector('#btn-volei-' + jogo + '-1');
    botao2.remove();
    let div = document.querySelector('#jogo-volei-' + (jogo + 1));
    if (resultado == volei.jogos[jogo].times[0].nome) {
      div.firstChild.firstChild.setAttribute('class', 'vencedor');
      div.lastChild.firstChild.setAttribute('class', 'perdedor');
    } else if (resultado == volei.jogos[jogo].times[1].nome){
      div.lastChild.firstChild.setAttribute('class', 'vencedor');
      div.firstChild.firstChild.setAttribute('class', 'perdedor');
    }
    pontos(resultado, esporte);
  } else if (esporte == 'basquete') {
    basquete.jogos[jogo].vencedor = resultado;
    let botao1 = document.querySelector('#btn-basquete-' + jogo + '-0');
    botao1.remove();
    let botao2 = document.querySelector('#btn-basquete-' + jogo + '-1');
    botao2.remove();
    let div = document.querySelector('#jogo-basquete-' + (jogo + 1));
    if (resultado == basquete.jogos[jogo].times[0].nome) {
      div.firstChild.firstChild.setAttribute('class', 'vencedor');
      div.lastChild.firstChild.setAttribute('class', 'perdedor');
    } else {
      div.lastChild.firstChild.setAttribute('class', 'vencedor');
      div.firstChild.firstChild.setAttribute('class', 'perdedor');
    }
    pontos(resultado, esporte);
  } else if (esporte == 'futsal') {
    futsal.jogos[jogo].vencedor = resultado;
    let botao1 = document.querySelector('#btn-futsal-' + jogo + '-0');
    botao1.remove();
    let botao2 = document.querySelector('#btn-futsal-' + jogo + '-1');
    botao2.remove();
    let botao3 = document.querySelector('#btn-futsal-' + jogo + '-empate');
    botao3.remove();
    let div = document.querySelector('#jogo-futsal-' + (jogo + 1));
    if (resultado == futsal.jogos[jogo].times[0].nome) {
      div.firstChild.firstChild.setAttribute('class', 'vencedor');
      div.lastChild.firstChild.setAttribute('class', 'perdedor');
      pontos(resultado, esporte);
    } else if (resultado == futsal.jogos[jogo].times[1].nome){
      div.lastChild.firstChild.setAttribute('class', 'vencedor');
      div.firstChild.firstChild.setAttribute('class', 'perdedor');
      pontos(resultado, esporte);
    } else {
      div.lastChild.firstChild.setAttribute('class', 'empatou');
      div.firstChild.firstChild.setAttribute('class', 'empatou');
    }
  }
  localStorage.setItem('volei', JSON.stringify(volei));
  localStorage.setItem('futsal', JSON.stringify(futsal));
  localStorage.setItem('basquete', JSON.stringify(basquete));
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
  if (basquete.times.length != 0) {
    let div = document.querySelector('#basquete-div-tab');
    div.innerHTML = `<table class = "table table-striped" id = "tab-basquete">
    <tbody id="tbody-basquete">
            <tr>
                <th colspan = 3>Basquete</th>
            </tr>
            <tr>
                <th>Lugar</th>
                <th>Times</th>
                <th>Pontos</th>
            </tr>
            </tbody>
        </table>`;
    let posicao;
    for (let i = 0; i < basquete.times.length; i++) {
      let tabela = document.querySelector('#tbody-basquete');
      let tr = document.createElement('tr');
      let td_class = document.createElement('td');
      let td_times = document.createElement('td');
      let td_pontos = document.createElement('td');
      if (i > 0) {
        if (basquete.times[i].pontos == basquete.times[i - 1].pontos) {
          td_class.innerHTML = posicao;
        } else {
          posicao = i + 1;
          td_class.innerHTML = posicao;
        }
      } else {
        posicao = i + 1;
        td_class.innerHTML = posicao;
      }

      td_times.innerHTML = basquete.times[i].nome;
      td_pontos.innerHTML = basquete.times[i].pontos;

      tr.appendChild(td_class);
      tr.appendChild(td_times);
      tr.appendChild(td_pontos);
      tabela.appendChild(tr);
    }
  } else {
    let div = document.querySelector('#basquete-div-tab');
    div.innerHTML = '<h2> Não houve jogos desta modalidade </h2>';
  }

  if (futsal.times.length != 0) {
    let div = document.querySelector('#futsal-div-tab');
    div.innerHTML = `<table class = "table table-striped" id = "tab-futsal">
    <tbody id="tbody-futsal">
            <tr>
                <th colspan = 3>Futsal</th>
            </tr>
            <tr>
                <th>Lugar</th>
                <th>Times</th>
                <th>Pontos</th>
            </tr>
            </tbody>
        </table>`;
    let posicao;
    for (let i = 0; i < futsal.times.length; i++) {
      let tabela = document.querySelector('#tbody-futsal');
      let tr = document.createElement('tr');
      let td_class = document.createElement('td');
      let td_times = document.createElement('td');
      let td_pontos = document.createElement('td');
      if (i > 0) {
        if (futsal.times[i].pontos == futsal.times[i - 1].pontos) {
          td_class.innerHTML = posicao;
        } else {
          posicao = i + 1;
          td_class.innerHTML = posicao;
        }
      } else {
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
  } else {
    let div = document.querySelector('#futsal-div-tab');
    div.innerHTML = '<h2> Não houve jogos desta modalidade </h2>';
  }

  if (volei.times.length != 0) {
    let div = document.querySelector('#volei-div-tab');
    div.innerHTML = `<table class = "table table-striped" id = "tab-volei">
    <tbody id="tbody-volei">
            <tr>
                <th colspan = 3>Volei</th>
            </tr>
            <tr>
                <th>Lugar</th>
                <th>Times</th>
                <th>Pontos</th>
            </tr>
            </tbody>
        </table>`;
    let posicao;
    for (let i = 0; i < volei.times.length; i++) {
      let tabela = document.querySelector('#tbody-volei');
      let tr = document.createElement('tr');
      let td_class = document.createElement('td');
      let td_times = document.createElement('td');
      let td_pontos = document.createElement('td');
      if (i > 0) {
        if (volei.times[i].pontos == volei.times[i - 1].pontos) {
          td_class.innerHTML = posicao;
        } else {
          posicao = i + 1;
          td_class.innerHTML = posicao;
        }
      } else {
        posicao = i + 1;
        td_class.innerHTML = posicao;
      }

      td_times.innerHTML = volei.times[i].nome;
      td_pontos.innerHTML = volei.times[i].pontos;

      tr.appendChild(td_class);
      tr.appendChild(td_times);
      tr.appendChild(td_pontos);
      tabela.appendChild(tr);
    }
  } else {
    let div = document.querySelector('#volei-div-tab');
    div.innerHTML = '<h2> Não houve jogos desta modalidade </h2>';
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
    let tr = document.createElement('tr');
    let td_class = document.createElement('td');
    let td_times = document.createElement('td');
    let td_pontos = document.createElement('td');
    if (i > 0) {
      if (cursos[i].pontos == cursos[i - 1].pontos) {
        td_class.innerHTML = posicao;
      } else {
        posicao = i + 1;
        td_class.innerHTML = posicao;
      }
    } else {
      posicao = i + 1;
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

function checaNome(nome) {
  tof = true;
  for (let i = 0; i < basquete.times.length; i++) {
    if (basquete.times[i].nome == nome) {
      tof = false;
    }
  }
  for (let i = 0; i < volei.times.length; i++) {
    if (volei.times[i].nome == nome) {
      tof = false;
    }
  }
  for (let i = 0; i < futsal.times.length; i++) {
    if (futsal.times[i].nome == nome) {
      tof = false;
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
      document.querySelector('#futsal').checked) &&
    checaNome(document.querySelector('#nome').value)
  ) {
    let nome = document.querySelector('#nome').value;
    let curso = document.querySelector('#curso').value;
    if (document.querySelector('#basquete').checked) {
      let time = new Time(nome, curso, 'basquete',avatar);
      basquete.adicionaTime(time);
    }
    if (document.querySelector('#volei').checked) {
      let time = new Time(nome, curso, 'volei', avatar);
      volei.adicionaTime(time);
    }
    if (document.querySelector('#futsal').checked) {
      let time = new Time(nome, curso, 'futsal', avatar);
      futsal.adicionaTime(time);
    }
    document.querySelector('#nome').value = '';
    document.querySelector('#curso').value = 'escolha';
    document.querySelector('#futsal').checked = false;
    document.querySelector('#volei').checked = false;
    document.querySelector('#basquete').checked = false;
    let div = document.querySelector(".foto-card");
    let img = document.createElement("img");
    img.setAttribute("src","img/add-foto.png");
    div.style = "";
    div.appendChild(img);

  } else if (
    document.querySelector('#nome').value == '' ||
    document.querySelector('#curso').value == 'escolha' ||
    (!document.querySelector('#basquete').checked &&
      !document.querySelector('#volei').checked &&
      !document.querySelector('#futsal').checked)
  ) {
    alert('Preencha todos os dados');
  } else if (!checaNome(document.querySelector('#nome').value)) {
    alert('Você já cadastrou um time com esse nome!');
  }
}

function comeca(funcao) {
  if (volei.times.length == 1) {
    alert('No mínimo dois times');
  }

  if (futsal.times.length == 1) {
    alert('No mínimo dois times');
  }

  if (basquete.times.length == 1) {
    alert('No mínimo dois times');
  }

  if (
    volei.times.length != 1 &&
    futsal.times.length != 1 &&
    basquete.times.length != 1
  ) {
    if (funcao == 0) {
      volei.geraJogos('volei');
      futsal.geraJogos('futsal');
      basquete.geraJogos('basquete');
      localStorage.setItem('volei', JSON.stringify(volei));
      localStorage.setItem('futsal', JSON.stringify(futsal));
      localStorage.setItem('basquete', JSON.stringify(basquete));
      localStorage.setItem('cursos', JSON.stringify(cursos));
    } else {
      volei = JSON.parse(localStorage.getItem('volei'));
      futsal = JSON.parse(localStorage.getItem('futsal'));
      basquete = JSON.parse(localStorage.getItem('basquete'));
      cursos = JSON.parse(localStorage.getItem('cursos'));
    }
    document.getElementById('inicio').style = 'display: none;';
    document.getElementById('jogos').style = '';

    // Cria Jogos

    if (basquete.times.length != 0) {
      let conteudo = document.getElementById('basquete-div');

      for (let i = 0; i < basquete.jogos.length; i++) {
        if (basquete.jogos[i].vencedor == ' ') {
          let div = document.createElement('div');
          let div_time_1 = document.createElement('div');
          let div_time_2 = document.createElement('div');
          let div_foto_1 = document.createElement('div');
          let div_foto_2 = document.createElement('div');
          let time_nome_1 = basquete.jogos[i].times[0].nome;
          let time_nome_2 = basquete.jogos[i].times[1].nome;

          let button1 = document.createElement('input');
          let button2 = document.createElement('input');
          button1.type = 'button';
          button2.type = 'button';
          button1.value = 'Vencer';
          button2.value = 'Vencer';
          button1.id = 'btn-basquete-' + i + '-0';
          button2.id = 'btn-basquete-' + i + '-1';
          button1.setAttribute('class', 'vencer');
          button2.setAttribute('class', 'vencer');
          button1.setAttribute(
            'onclick',
            "vencer('basquete'," +
              i +
              ',basquete.jogos[' +
              i +
              '].times[0].nome)'
          );
          button2.setAttribute(
            'onclick',
            "vencer('basquete'," +
              i +
              ',basquete.jogos[' +
              i +
              '].times[1].nome)'
          );

          let n1 = document.createElement('h3');
          let n2 = document.createElement('h3');
          let x = document.createElement('h2');

          div_time_1.setAttribute('class', 'time');
          div_time_2.setAttribute('class', 'time');
          div_foto_1.setAttribute('class', 'foto');
          div_foto_2.setAttribute('class', 'foto');
          div_foto_1.style = "background-image: url(" + basquete.jogos[i].times[0].avatar + ");";
          div_foto_2.style = "background-image: url(" + basquete.jogos[i].times[1].avatar + ");";
          div.setAttribute('id', 'jogo-basquete-' + (i + 1));
          div.setAttribute('class', 'jogo');

          n1.innerHTML = time_nome_1;
          n2.innerHTML = time_nome_2;
          x.innerHTML = 'VS';
          div_time_1.appendChild(n1);
          div_time_1.appendChild(div_foto_1);
          div_time_1.appendChild(button1);
          div_time_2.appendChild(n2);
          div_time_2.appendChild(div_foto_2);
          div_time_2.appendChild(button2);
          div.appendChild(div_time_1);
          div.appendChild(x);
          div.appendChild(div_time_2);
          conteudo.appendChild(div);
        } else {
          let div = document.createElement('div');
          let div_time_1 = document.createElement('div');
          let div_foto_1 = document.createElement('div');
          let div_foto_2 = document.createElement('div');
          let div_time_2 = document.createElement('div');
          let time_nome_1 = basquete.jogos[i].times[0].nome;
          let time_nome_2 = basquete.jogos[i].times[1].nome;

          let n1 = document.createElement('h3');
          let n2 = document.createElement('h3');
          let x = document.createElement('h2');

          div_time_1.setAttribute('class', 'time');
          div_time_2.setAttribute('class', 'time');
          div_foto_1.setAttribute('class', 'foto');
          div_foto_2.setAttribute('class', 'foto');
          div_foto_1.style = "background-image: url(" + basquete.jogos[i].times[0].avatar + ");";
          div_foto_2.style = "background-image: url(" + basquete.jogos[i].times[1].avatar + ");";

          div.setAttribute('id', 'jogo-basquete-' + (i + 1));
          div.setAttribute('class', 'jogo');

          if (basquete.jogos[i].vencedor == basquete.jogos[i].times[0].nome) {
            n1.setAttribute('class', 'vencedor');
            n2.setAttribute('class', 'perdedor');
          } else {
            n2.setAttribute('class', 'vencedor');
            n1.setAttribute('class', 'perdedor');
          }

          n1.innerHTML = time_nome_1;
          n2.innerHTML = time_nome_2;
          x.innerHTML = 'VS';
          div_time_1.appendChild(n1);
          div_time_1.appendChild(div_foto_1);
          div_time_2.appendChild(n2);
          div_time_2.appendChild(div_foto_2);

          div.appendChild(div_time_1);
          div.appendChild(x);
          div.appendChild(div_time_2);
          conteudo.appendChild(div);
        }
      }
    } else {
      let conteudo = document.getElementById('basquete-div');

      // Aqui dentro colocar "Não houve jogos desta modalidade"
      conteudo.innerHTML = '<h2> Não houve jogos desta modalidade </h2>';
    }

    if (futsal.times.length != 0) {
      let conteudo = document.getElementById('futsal-div');

      for (let i = 0; i < futsal.jogos.length; i++) {
        if (futsal.jogos[i].vencedor == ' ') {
          let div = document.createElement('div');
          let div_time_1 = document.createElement('div');
          let div_foto_1 = document.createElement('div');
          let div_time_2 = document.createElement('div');
          let div_foto_2 = document.createElement('div');
          let div_vs = document.createElement('div');
          let time_nome_1 = futsal.jogos[i].times[0].nome;
          let time_nome_2 = futsal.jogos[i].times[1].nome;

          let button1 = document.createElement('input');
          let button2 = document.createElement('input');
          let button3 = document.createElement('button');
          let img = document.createElement('img');
          img.setAttribute("src","img/equal.png");
          button1.type = 'button';
          button2.type = 'button';
          button1.value = 'Vencer';
          button2.value = 'Vencer';
          button3.appendChild(img);
          button1.id = 'btn-futsal-' + i + '-0';
          button2.id = 'btn-futsal-' + i + '-1';
          button3.id = 'btn-futsal-' + i + '-empate';
          button1.setAttribute('class', 'vencer');
          button2.setAttribute('class', 'vencer');
          button3.setAttribute('class', 'empate');
          button1.setAttribute(
            'onclick',
            "vencer('futsal'," + i + ',futsal.jogos[' + i + '].times[0].nome)'
          );
          button2.setAttribute(
            'onclick',
            "vencer('futsal'," + i + ',futsal.jogos[' + i + '].times[1].nome)'
          );
          button3.setAttribute(
            'onclick',
            "vencer('futsal'," + i + ',"empate")'
          );

          let n1 = document.createElement('h3');
          let n2 = document.createElement('h3');
          let x = document.createElement('h2');

          div_time_1.setAttribute('class', 'time');
          div_time_2.setAttribute('class', 'time');
          div_foto_1.setAttribute('class', 'foto');
          div_foto_2.setAttribute('class', 'foto');
          div_vs.setAttribute('class','vs')
          div_foto_1.style = "background-image: url(" + futsal.jogos[i].times[0].avatar + ");";
          div_foto_2.style = "background-image: url(" + futsal.jogos[i].times[1].avatar + ");";
          div.setAttribute('id', 'jogo-futsal-' + (i + 1));
          div.setAttribute('class', 'jogo');

          n1.innerHTML = time_nome_1;
          n2.innerHTML = time_nome_2;
          x.innerHTML = 'VS';
          div_time_1.appendChild(n1);
          div_time_1.appendChild(div_foto_1);
          div_time_1.appendChild(button1);
          div_time_2.appendChild(n2);
          div_time_2.appendChild(div_foto_2);
          div_time_2.appendChild(button2);
          div_vs.appendChild(x);
          div_vs.appendChild(button3);
          div.appendChild(div_time_1);
          div.appendChild(div_vs);
          div.appendChild(div_time_2);
          conteudo.appendChild(div);
        } else {
          let div = document.createElement('div');
          let div_time_1 = document.createElement('div');
          let div_time_2 = document.createElement('div');
          let div_foto_1 = document.createElement('div');
          let div_foto_2 = document.createElement('div');
          let time_nome_1 = futsal.jogos[i].times[0].nome;
          let time_nome_2 = futsal.jogos[i].times[1].nome;

          let n1 = document.createElement('h3');
          let n2 = document.createElement('h3');
          let x = document.createElement('h2');

          div_time_1.setAttribute('class', 'time');
          div_time_2.setAttribute('class', 'time');
          div_foto_1.setAttribute('class', 'foto');
          div_foto_2.setAttribute('class', 'foto');
          div_foto_1.style = "background-image: url(" + futsal.jogos[i].times[0].avatar + ");";
          div_foto_2.style = "background-image: url(" + futsal.jogos[i].times[1].avatar + ");";
          div.setAttribute('id', 'jogo-futsal-' + (i + 1));
          div.setAttribute('class', 'jogo');

          if (futsal.jogos[i].vencedor == futsal.jogos[i].times[0].nome) {
            n1.setAttribute('class', 'vencedor');
            n2.setAttribute('class', 'perdedor');
          } else if (futsal.jogos[i].vencedor == futsal.jogos[i].times[1].nome){
            n2.setAttribute('class', 'vencedor');
            n1.setAttribute('class', 'perdedor');
          } else {
            n1.setAttribute('class', 'empatou');
            n2.setAttribute('class', 'empatou');
          }

          n1.innerHTML = time_nome_1;
          n2.innerHTML = time_nome_2;
          x.innerHTML = 'VS';
          div_time_1.appendChild(n1);
          div_time_1.appendChild(div_foto_1);
          div_time_2.appendChild(n2);
          div_time_2.appendChild(div_foto_2);
          div.appendChild(div_time_1);
          div.appendChild(x);
          div.appendChild(div_time_2);
          conteudo.appendChild(div);
        }
      }
    } else {
      let conteudo = document.getElementById('futsal-div');

      // Aqui dentro colocar "Não houve jogos desta modalidade"
      conteudo.innerHTML = '<h2> Não houve jogos desta modalidade </h2>';
    }

    if (volei.times.length != 0) {
      let conteudo = document.getElementById('volei-div');

      for (let i = 0; i < volei.jogos.length; i++) {
        if (volei.jogos[i].vencedor == ' ') {
          let div = document.createElement('div');
          let div_time_1 = document.createElement('div');
…          button1.value = 'Vencer';
          button2.value = 'Vencer';
          button1.id = 'btn-volei-' + i + '-0';
          button2.id = 'btn-volei-' + i + '-1';
          button1.setAttribute('class', 'vencer');
          button2.setAttribute('class', 'vencer');
          button1.setAttribute(
            'onclick',
            "vencer('volei'," + i + ',volei.jogos[' + i + '].times[0].nome)'
          );
          button2.setAttribute(
            'onclick',
            "vencer('volei'," + i + ',volei.jogos[' + i + '].times[1].nome)'
          );

          let n1 = document.createElement('h3');
          let n2 = document.createElement('h3');
          let x = document.createElement('h2');

          div_time_1.setAttribute('class', 'time');
          div_foto_1.setAttribute('class', 'foto');
          div_foto_2.setAttribute('class', 'foto');
          div_time_2.setAttribute('class', 'time');
          div_foto_1.style = "background-image: url(" + volei.jogos[i].times[0].avatar + ");";
          div_foto_2.style = "background-image: url(" + volei.jogos[i].times[1].avatar + ");";
          div.setAttribute('id', 'jogo-volei-' + (i + 1));
          div.setAttribute('class', 'jogo');

          n1.innerHTML = time_nome_1;
          n2.innerHTML = time_nome_2;
          x.innerHTML = 'VS';
          div_time_1.appendChild(n1);
          div_time_1.appendChild(div_foto_1);
          div_time_1.appendChild(button1);
          div_time_2.appendChild(n2);
          div_time_2.appendChild(div_foto_2);
          div_time_2.appendChild(button2);
          div.appendChild(div_time_1);
          div.appendChild(x);
          div.appendChild(div_time_2);
          conteudo.appendChild(div);
        } else {
          let div = document.createElement('div');
          let div_time_1 = document.createElement('div');
          let div_time_2 = document.createElement('div');
          let div_foto_1 = document.createElement('div');
          let div_foto_2 = document.createElement('div');
          let time_nome_1 = volei.jogos[i].times[0].nome;
          let time_nome_2 = volei.jogos[i].times[1].nome;

          let n1 = document.createElement('h3');
          let n2 = document.createElement('h3');
          let x = document.createElement('h2');

          div_time_1.setAttribute('class', 'time');
          div_time_2.setAttribute('class', 'time');
          div_foto_1.setAttribute('class', 'foto');
          div_foto_2.setAttribute('class', 'foto');
          div_foto_1.style = "background-image: url(" + volei.jogos[i].times[0].avatar + ");";
          div_foto_2.style = "background-image: url(" + volei.jogos[i].times[1].avatar + ");";
          div.setAttribute('id', 'jogo-volei-' + (i + 1));
          div.setAttribute('class', 'jogo');

          if (volei.jogos[i].vencedor == volei.jogos[i].times[0].nome) {
            n1.setAttribute('class', 'vencedor');
            n2.setAttribute('class', 'perdedor');
          } else {
            n2.setAttribute('class', 'vencedor');
            n1.setAttribute('class', 'perdedor');
          }

          n1.innerHTML = time_nome_1;
          n2.innerHTML = time_nome_2;
          x.innerHTML = 'VS';
          div_time_1.appendChild(n1);
          div_time_1.appendChild(div_foto_1);
          div_time_2.appendChild(n2);
          div_time_2.appendChild(div_foto_2);
          div.appendChild(div_time_1);
          div.appendChild(x);
          div.appendChild(div_time_2);
          conteudo.appendChild(div);
        }
      }
    } else {
      let conteudo = document.getElementById('volei-div');

      // Aqui dentro colocar "Não houve jogos desta modalidade"
      conteudo.innerHTML = '<h2> Não houve jogos desta modalidade </h2>';
    }
  }
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

let volei = new Esporte('Volei');
let futsal = new Esporte('Futsal');
let basquete = new Esporte('Basquete');

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