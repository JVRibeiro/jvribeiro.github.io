var nome = document.getElementById('userName').value;
var genero = document.getElementById('userGender').value;
var aniversario = document.getElementById('userBirth').value;
  
    function salvarDados() {
      window.localStorage.setItem('nome', nome);
      window.localStorage.setItem('genero', genero);
      window.localStorage.setItem('aniversario', aniversario);
      window.location.href = "index.html";
    };
    
    function apagarDados() {
      window.localStorage.clear();
      window.location.href = "index.html";
    };
    
function config() {
  document.getElementById('config').style.display = 'block';
};
function closeConfig() {
  document.getElementById('config').style.display = 'none';
};
