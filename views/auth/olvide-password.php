<h1 class="nombre-pagina">Olvide Password</h1>
<p class="descripcion-pagina">Restablece tu password ingresando tú Email</p>

<?php 
    include_once __DIR__ .'/../templates/alertas.php';
 ?>

<form action="/olvide" method="POST" class="formulario">
    <div class="campo">
        <label for="email">Email</label>
        <input 
        type="email"
        id="email"
        name="email"
        placeholder="Ingresa tú Email"
        />
    </div>


    <input type="submit" class="boton" value="Enviar Instrucciones">


</form>

<div class="acciones">
    <a href="/"> ¿Ya tienes una cuenta? Inicia Sesión</a>
    <a href="/crear-cuenta"> ¿Aún no tienes una cuenta? Crea Una</a>
</div>