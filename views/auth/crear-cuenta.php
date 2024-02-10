<h1 class="nombre-pagina">Crear cuenta</h1>
<p class="descripcion-pagina">Llena el siguiente formulario para crear una cuenta</p>

<?php 
    include_once __DIR__ .'/../templates/alertas.php';
 ?>

<form action="/crear-cuenta" class="formulario" method="POST">

    <div class="campo">
        <label for="nombre">Nombre</label>
        <input 
            type="text"
            id="nombre"
            name="nombre"
            placeholder="Ingresa tú nombre"
            value="<?php echo s($usuario->nombre);  ?>"
        />
    </div>

    <div class="campo">
        <label for="apellido">Apellidos</label>
        <input 
            type="text"
            id="apellido"
            name="apellido"
            placeholder="Ingresa tus apellidos"
            value="<?php echo s($usuario->apellido);  ?>"
        />
    </div>

    <div class="campo">
        <label for="telefono">Telefono</label>
        <input 
            type="number"
            id="telefono"
            name="telefono"
            placeholder="Ingresa tú telefono"
            value="<?php echo s($usuario->telefono);  ?>"
        />
    </div>

    <div class="campo">
        <label for="email">Email</label>
        <input 
            type="email"
            id="email"
            name="email"
            placeholder="Ingresa tú Email"
            value="<?php echo s($usuario->email);  ?>"
        />
    </div>

    <div class="campo">
        <label for="password">Password</label>
        <input 
            type="password"
            id="password"
            name="password"
            placeholder="Ingresa tú Password"
        />
    </div>

    <input type="submit" class="boton" value="Crear cuenta">
</form> 

<div class="acciones">
    <a href="/"> ¿Ya tienes una cuenta Inicia Sesión?</a>
    <a href="/olvide"> ¿Olvidaste tu Password?</a>
</div>