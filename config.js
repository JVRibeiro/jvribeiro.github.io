var nome = document.getElementById('userName');
  var genero = document.getElementById('userGender');
  var aniversario = document.getElementById('userBirth');
  
    function salvarDados() {
      window.localStorage.setItem('nome',nome.value);
      window.localStorage.setItem('genero',genero.value);
      window.localStorage.setItem('aniversario',aniversario.value);
      document.location.href = "index.html";
    }
    
    function apagarDados() {
      window.localStorage.clear();
      document.location.href = "index.html";
    }
