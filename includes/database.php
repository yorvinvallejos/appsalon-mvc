<?php

$host = $_ENV['DB_HOST'];
$user = $_ENV['DB_USER'];
$password = $_ENV['DB_PASS']; 
$database = $_ENV['DB_NAME']; 


// Conexión a la base de datos
$db = mysqli_connect($host, $user, $password, $database);
$db->set_charset('utf8');

// Verificación de la conexión
if (!$db) {
    echo "Error: No se pudo conectar a MySQL. ";
    echo "Errno de depuración: " . mysqli_connect_errno() . "\n";
    echo "Error de depuración: " . mysqli_connect_error() . "\n";
    exit;
}

// Resto de tu lógica de aplicación aquí...

// Cierre de la conexión al finalizar
//mysqli_close($db);
?>
