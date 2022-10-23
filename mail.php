<?php


require '../vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$mail = new PHPMailer(true);
$res = [
    "success"=> false
];
try {

    $name = trim($_POST["name"]);
    $email = trim($_POST["email"]);
    $text = trim($_POST["message"]);
    $mail->isSMTP();                  
    $mail->CharSet = "utf-8";                    
    $mail->Host       = 'smtp.yandex.ru';                     
    $mail->SMTPAuth   = true;                                 
    $mail->Username   = 'EllerGroupNFT@yandex.ru';                    
    $mail->Password   = 'jiymvrotacgxmpex';                              
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;          
    $mail->Port       = 465;   

    $mail->setFrom("EllerGroupNFT@yandex.ru", 'Eller GROUP NFT');
    $mail->addAddress("EllerGroupNFT@yandex.ru", $name);
    $mail->isHTML(true);  
    $mail->Subject = 'ЗАЯВКА С САЙТА! ';
    $mail->Body = "
        <p>Отправленное сообщение:</p>
        <p>Имя: {$name}</p>
        <p>Email: {$email}</p>
        <p>Сообщение: {$text}</p>
    ";
    
    $mail->send();
    $res["success"] = true;
    echo json_encode($res);
    exit;
}catch(Exception $e) {
    $res["error"] = "{$mail->ErrorInfo}";
}

echo json_encode($res);