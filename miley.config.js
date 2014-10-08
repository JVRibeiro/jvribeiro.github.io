var d = document;
nome = d.getElementById('userName'); 
genero = d.getElementById('gen'); 

function salvarDados() {
	window.localStorage.setItem('nome',nome.value); 
	window.localStorage.setItem('genero',genero.value); 
	setTimeout(d.location.href = "", 2000);
} 

function apagarDados() {
	confirmar = confirm("Use esse botão com cuidado!\n\n Seus dados não poderão ser recuperados.\n\n Você tem certeza que deseja apagar seus dados?"); 
	if (confirmar == true) {
		window.localStorage.clear(); 
		alert("Seus dados foram apagados. Aperte Ok para atualizar."); 
		setTimeout(d.location.href = "", 2000);
	} 
	else {
	return false;
	}
}; 


dialog = d.getElementById('dialogo'); 

function getHist() {
	window.localStorage.getItem('dialog');
} 

function saveHist() {
	window.localStorage.setItem('histórico',dialog.value);
} 

function clearHist() {
	window.localStorage.removeItem('histórico'); 
	setTimeout(d.location.href = "", 2000);
} 

function clearNome() {
	window.localStorage.removeItem('nome'); 
	setTimeout(d.location.href = "", 2000);
};
