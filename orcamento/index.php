<!doctype html>
<html lang="pt-BR" dir="ltr">
  <head>
    <meta charset="utf-8">
    <meta name='application-name' content='Orca'>
    <meta charset='utf-8'>
    <meta content='chrome=1' http-equiv='X-UA-Compatible'>
    <meta http-equiv='Content-Language' content='pt-br'>
    <meta name='author' content='Victor Ribeiro'>
    <meta name='email' content='devjvribeiro@gmail.com'>
    <meta name='description' content='Aplicativo web de orçamentos'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'>

    <title>Orca</title>

   <link rel="stylesheet" href="assets/libs/materialize/css/materialize.min.css">
   <link rel="stylesheet" href="assets/libs/materialize/css/material-icons.css">
   <link rel="stylesheet" href="assets/libs/materialize/css/materialize.custom.css">

   <link rel="stylesheet" href="assets/css/main.css">

   <script src="assets/libs/jquery/jquery.min.js"></script>
   <script src="assets/libs/materialize/js/materialize.min.js"></script>
  </head>

  <body>
    <header>
      <nav class="nav-extended green darken-4">
        <div class="nav-wrapper">
          <a href="#!" class="brand-logo"><i class="material-icons">cloud</i></a>
          <ul class="right hide-on-med-and-down">
            <li><a href="./#!" class="waves-effect waves-light"><i class="material-icons">search</i></a></li>
            <li><a href="./#!" class="waves-effect waves-light"><i class="material-icons">view_module</i></a></li>
            <li><a href="./#!" class="waves-effect waves-light"><i class="material-icons">refresh</i></a></li>
            <li><a href="./#!" class="waves-effect waves-light"><i class="material-icons">more_vert</i></a></li>
          </ul>
        </div>

        <div class="nav-content">
          <span class="nav-title"></span>

          <a class="btn-floating btn-large halfway-fab waves-effect waves-light teal">
            <i class="material-icons">add</i>
          </a>
        </div>


        <ul id="slide-out" class="sidenav sidenav-fixed green darken-4">
          <li>
            <a href="#!" class="waves-effect waves-light">First Sidebar Link</a>
          </li>

          <li>
            <a href="#!" class="waves-effect waves-light">Second Sidebar Link</a>
          </li>
        </ul>
        <a href="#" data-target="slide-out" class="sidenav-trigger"><i class="material-icons">menu</i></a>
      </nav>
    </header>

    <main>
      <div class="container">
        <div class="row">
          <div class="col s12">
            <div class="card">
              <div class="card-content">
                <span class="card-title">Orçamento sem título</span>
                <p>Aqui se encontra a descrição do orçamento.</p>
              </div>
              <div class="card-action">
                <a href="#" class="btn">Ação</a>
                <a href="#" class="btn-flat">Ação</a>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col s12">
            <div class="card">
              <div class="card-content">
                <span class="card-title">Orçamento sem título</span>
                <p>Aqui se encontra a descrição do orçamento.</p>
              </div>
              <div class="card-action">
                <a href="#" class="btn">Ação</a>
                <a href="#" class="btn-flat">Ação</a>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col s12">
            <div class="card">
              <div class="card-content">
                <span class="card-title">Orçamento sem título</span>
                <p>Aqui se encontra a descrição do orçamento.</p>
              </div>
              <div class="card-action">
                <a href="#" class="btn">Ação</a>
                <a href="#" class="btn-flat">Ação</a>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col s12">
            <div class="card">
              <div class="card-content">
                <span class="card-title">Orçamento sem título</span>
                <p>Aqui se encontra a descrição do orçamento.</p>
              </div>
              <div class="card-action">
                <a href="#" class="btn">Ação</a>
                <a href="#" class="btn-flat">Ação</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <footer>
      <div class="row">
        <div class="col s6">
          <ul class="tabs">
            <li class="tab col"><a href="#test1">Página 1</a></li>
            <li class="tab col"><a class="active" href="#test2">Página 2</a></li>
            <li class="tab col"><a href="#test4">Página 3</a></li>
          </ul>
        </div>
      </div>
    </footer>

    <script defer src="./assets/js/main.js"></script>
  </body>
</html>
