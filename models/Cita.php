<?php

namespace Model;

class Cita extends ActiveRecord{
    // Base de datos
    protected static $tabla = 'citas';
    protected static $columnasDB = ['id', 'fecha', 'hora', 'Usuarios_id'];

    public $id; 
    public $fecha; 
    public $hora; 
    public $Usuarios_id; 

    public function __construct($args=[])
    {
        $this-> id = $args['id'] ?? null;
        $this-> fecha = $args['fecha'] ?? '';
        $this-> hora = $args['hora'] ?? '';
        $this-> Usuarios_id = $args['Usuarios_id'] ?? '';
        
    }
}

?>