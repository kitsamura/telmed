<?php
// Файлы phpmailer
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';
// Переменные, которые отправляет пользователь
$message = $_POST['msg'];
$name = $_POST['name'];
$lastname = $_POST['lastname'];
$email = $_POST['email'];
$tel = $_POST['tel'];

$mail = new PHPMailer\PHPMailer\PHPMailer();
try {
    $msg = "ok";
    $mail->isSMTP();   
    $mail->CharSet = "UTF-8";                                          
    $mail->SMTPAuth   = true;
    // Настройки вашей почты
    $mail->Host       = 'smtp.yandex.ru'; // SMTP сервера GMAIL
    $mail->Username   = 'test@telmed24.ru'; // Логин на почте
    $mail->Password   = 'testtest'; // Пароль на почте
    $mail->SMTPSecure = 'ssl';
    $mail->Port       = 465;
    $mail->setFrom('no-reply@telmed24.ru'); // Адрес самой почты и имя отправителя
    // Получатель письма
    $to = $_POST['to'];
    // $mail->addAddress($to); 
    $mail->addAddress('i.petrov@devlegal.ru'); 
    // Прикрипление файлов к письму
if (!empty($_FILES['myfile']['name'][0])) {
    for ($ct = 0; $ct < count($_FILES['myfile']['tmp_name']); $ct++) {
        $uploadfile = tempnam(sys_get_temp_dir(), sha1($_FILES['myfile']['name'][$ct]));
        $filename = $_FILES['myfile']['name'][$ct];
        if (move_uploaded_file($_FILES['myfile']['tmp_name'][$ct], $uploadfile)) {
            $mail->addAttachment($uploadfile, $filename);
        } else {
            $msg .= 'Неудалось прикрепить файл ' . $uploadfile;
        }
    }   
}
        // -----------------------
        // Само письмо
        // -----------------------
        $mail->isHTML(true);
    
        $mail->Subject = 'Запрос из формы обратной связи на telmed24.ru';
        $mail->Body    = "<b>Имя пользователя:</b>$name<br>
        <b>Фамилия пользователя:</b>$lastname<br>
        <b>Почта пользователя</b>$email<br>
        <b>Телефон пользователя</b>$tel<br>
        <b>Сообщение пользователя:</b>$message<br>
        
        ";
// Проверяем отравленность сообщения
$mail->send();
    echo "$msg";
//}
// echo "Сообщение не было отправлено. Неверно указаны настройки вашей почты";

} 
catch (Exception $e) {
    echo "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
} catch (\Exception $e) { //The leading slash means the Global PHP Exception class will be caught
    echo $e->getMessage(); //Boring error messages from anything else!
}