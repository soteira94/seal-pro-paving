<?php
/* ============================================================
   Seal Pro Paving — Procesador del formulario de contacto
   Compatible con ColombiaHosting (cPanel + PHP mail()).
   ------------------------------------------------------------
   >>> CONFIGURA AQUÍ el correo donde quieres recibir las
       solicitudes. (Confirmado por el cliente: info@sealpaving.com)
   ============================================================ */

$DESTINO   = 'info@sealpaving.com';                    // <-- correo destino (confirmado)
$ASUNTO    = 'Nueva cotización desde el sitio web';    // asunto del correo
$REDIRECT  = '../gracias.html';                        // página de éxito
$REDIR_ERR = '../contacto.html?error=1';               // página de error

/* -------- Solo aceptar POST -------- */
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: ' . $REDIR_ERR);
    exit;
}

/* -------- Anti-spam: honeypot -------- */
if (!empty($_POST['website'])) {
    // Un bot llenó el campo trampa: fingimos éxito y salimos.
    header('Location: ' . $REDIRECT);
    exit;
}

/* -------- Recoger y limpiar datos -------- */
function limpiar($v) {
    return trim(str_replace(array("\r", "\n", "%0a", "%0d"), ' ', (string) $v));
}

$nombre    = limpiar($_POST['nombre']    ?? '');
$telefono  = limpiar($_POST['telefono']  ?? '');
$email     = limpiar($_POST['email']     ?? '');
$servicio  = limpiar($_POST['servicio']  ?? '');
$direccion = limpiar($_POST['direccion'] ?? '');
$mensaje   = trim($_POST['mensaje'] ?? '');

/* -------- Validación mínima -------- */
$errores = array();
if ($nombre === '')                                   $errores[] = 'nombre';
if ($telefono === '')                                 $errores[] = 'telefono';
if (!filter_var($email, FILTER_VALIDATE_EMAIL))       $errores[] = 'email';
if ($servicio === '')                                 $errores[] = 'servicio';

if (!empty($errores)) {
    header('Location: ' . $REDIR_ERR);
    exit;
}

/* -------- Construir el correo -------- */
$cuerpo  = "Nueva solicitud de cotización — Seal Pro Paving\n";
$cuerpo .= "-------------------------------------------\n";
$cuerpo .= "Nombre:    $nombre\n";
$cuerpo .= "Teléfono:  $telefono\n";
$cuerpo .= "Email:     $email\n";
$cuerpo .= "Servicio:  $servicio\n";
$cuerpo .= "Dirección: $direccion\n";
$cuerpo .= "-------------------------------------------\n";
$cuerpo .= "Mensaje:\n$mensaje\n";
$cuerpo .= "-------------------------------------------\n";
$cuerpo .= "Enviado el " . date('Y-m-d H:i:s') . "\n";

$headers  = "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "From: Seal Pro Web <no-reply@sealpropaving.com>\r\n";
$headers .= "Reply-To: $nombre <$email>\r\n";

$asunto_utf8 = '=?UTF-8?B?' . base64_encode($ASUNTO) . '?=';

/* -------- Enviar -------- */
$ok = @mail($DESTINO, $asunto_utf8, $cuerpo, $headers);

if ($ok) {
    header('Location: ' . $REDIRECT);
} else {
    header('Location: ' . $REDIR_ERR);
}
exit;
