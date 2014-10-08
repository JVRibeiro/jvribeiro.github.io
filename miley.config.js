var d = document;
var w = window;
nome = d.getElementById('userName'); 
genero = d.getElementById('gen'); 

function salvarDados() {
	d.localStorage.setItem('nome',nome.value); 
	d.localStorage.setItem('genero',genero.value); 
	setTimeout(d.location.href = "", 2000);
} 

function apagarDados() {
	confirmar = confirm("Use esse botão com cuidado!\n\n Seus dados não poderão ser recuperados.\n\n Você tem certeza que deseja apagar seus dados?"); 
	if (confirmar == true) {
		d.localStorage.clear(); 
		alert("Seus dados foram apagados. Aperte Ok para atualizar."); 
		setTimeout(d.location.href = "", 2000);
	} 
	else {
	return false;
	}
}; 

var nomeAtual = d.localStorage.getItem('nome'); 
d.getElementById('nomeAtual').innerHTML == nomeAtual; 
dialog = d.getElementById('dialogo'); 

function getHist() {
	d.localStorage.getItem('dialog');
} 

function saveHist() {
	d.localStorage.setItem('histórico',dialog.value);
} 

function clearHist() {
	d.localStorage.removeItem('histórico'); 
	setTimeout(d.location.href = "", 2000);
} 

function clearNome() {
	d.localStorage.removeItem('nome'); 
	setTimeout(d.location.href = "", 2000);
};
