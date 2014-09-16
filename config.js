var nome = document.getElementById('userName').value;
  var genero = document.getElementById('userGender').value;
  var aniversario = document.getElementById('userBirth').value;
  
    function salvarDados() {
      window.localStorage.setItem('nome', nome);
      window.localStorage.setItem('genero', genero);
      window.localStorage.setItem('aniversario', aniversario);
      document.location.href = "index.html";
    };
    
    function apagarDados() {
      window.localStorage.clear();
      document.location.href = "index.html";
    };
    
function config() {
  d.getElementById('config').style.display = 'block';
};
function closeConfig() {
  d.getElementById('config').style.display = 'none';
};
