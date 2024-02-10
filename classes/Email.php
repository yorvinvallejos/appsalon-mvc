<?php

namespace Classes;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

class Email{

    public $email;
    public $nombre;
    public $token;

    public function __construct($email, $nombre, $token)
    {
        $this->email = $email;
        $this->nombre = $nombre;
        $this->token = $token;
    }

    public function enviarConfirmacion()
    {
        // Crear el objeto de Email
        $mail = new PHPMailer();

        // Configuración SMTP
        $mail->isSMTP();
        $mail->Host = $_ENV['EMAIL_HOST'];
        $mail->SMTPAuth = true;
        $mail->Port = $_ENV['EMAIL_PORT']; // Usar el puerto correcto para Mailtrap
        $mail->Username = $_ENV['EMAIL_USER'];
        $mail->Password = $_ENV['EMAIL_PASS'];

        // Configuración del remitente y destinatario
        $mail->setFrom('cuentas@appsalon.com', 'Remitente AppSalon');
        $mail->addAddress('cuentas@appsalon.com', 'AppSalon.com');
        $mail->Subject = 'Confirma tu cuenta';

        // Configuración del contenido HTML
        $mail->isHTML(true);
        $mail->CharSet = 'UTF-8';

        $contenido = "<html>";
        $contenido .= "<p><strong> Hola " . $this->nombre . " </strong> Has creado tu cuenta en AppSalon, solo debes confirmarla presionando el siguiente enlace</p>";
        $contenido .= "<p> Presiona aquí: <a href='". $_ENV['APP_URL'] ."/confirmar-cuenta?token=" . $this->token . "'>Confirmar Cuenta</a></p>";
        $contenido .= "<p>Si tú no solicitaste esta cuenta, puedes ignorar el mensaje</p>";
        $contenido .= "</html>";

        $mail->Body = $contenido;

        try {
            // Enviar el correo
            $mail->send();
            //echo 'Correo enviado exitosamente';
        } catch (Exception $e) {
            echo 'Error al enviar el correo: ', $mail->ErrorInfo;
        }
    }

    public function enviarInstrucciones(){
                // Crear el objeto de Email
                $mail = new PHPMailer();

                // Configuración SMTP
                $mail->isSMTP();
                $mail->Host = $_ENV['EMAIL_HOST'];
                $mail->SMTPAuth = true;
                $mail->Port = $_ENV['EMAIL_PORT']; // Usar el puerto correcto para Mailtrap
                $mail->Username = $_ENV['EMAIL_USER'];
                $mail->Password = $_ENV['EMAIL_PASS'];
        
                // Configuración del remitente y destinatario
                $mail->setFrom('cuentas@appsalon.com', 'Remitente AppSalon');
                $mail->addAddress('cuentas@appsalon.com', 'AppSalon.com');
                $mail->Subject = 'Restablece tu password';
        
                // Configuración del contenido HTML
                $mail->isHTML(true);
                $mail->CharSet = 'UTF-8';
        
                $contenido = "<html>";
                $contenido .= "<p><strong> Hola " . $this->nombre . " </strong> Has solicitado reestablecer tu password sigue el siguiente enlace </p>";
                $contenido .= "<p> Presiona aquí: <a href='". $_ENV['APP_URL'] ."/recuperar?token=" . $this->token . "'>Reestablecer Password</a></p>";
                $contenido .= "<p>Si tú no solicitaste esta cuenta, puedes ignorar el mensaje</p>";
                $contenido .= "</html>";
        
                $mail->Body = $contenido;
        
                try {
                    // Enviar el correo
                    $mail->send();
                    //echo 'Correo enviado exitosamente';
                } catch (Exception $e) {
                    echo 'Error al enviar el correo: ', $mail->ErrorInfo;
                }

    }
}
