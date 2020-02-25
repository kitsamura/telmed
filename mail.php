<?php 

require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';
/*
$name = $_POST['user_name'];
$phone = $_POST['user_phone'];
$filename = basename($_FILES['upload']['name']);
$ext = substr($filename, strrpos($filename, '.') + 1);*/

//$mail->SMTPDebug = 3;                               // Enable verbose debug output


  
$today = date("d.m.y");


$name=$_POST['name'];
$lastname=$_POST['lastname'];
$phone=$_POST['phone'];
$email=$_POST['mail'];
$message=$_POST['message'];
$options=$_POST['options'];
$company_name=$_POST['company_name'];
$company_size=$_POST['company_size'];
$titlename=$_POST['titlename'];
$titlelastname=$_POST['titlelastname'];

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.yandex.ru';  																							// Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'test.ru'; // Ваш логин от почты с которой будут отправляться письма
$mail->Password = 'testtest'; // Ваш пароль от почты с которой будут отправляться письма
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465; // TCP port to connect to / этот порт может отличаться у других провайдеров
$mail->setFrom('test@telmed24.ru'); // от кого будет уходить письмо?
$mail->addAddress('info@telmed24.ru');     // Кому будет уходить письмо 
//$mail->addAddress('ellen@example.com');               // Name is optional
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
// $mail->addAttachment($_FILES['uploaded_file']['tmp_name'], /*"$name.$ext"*/ $filename);    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Запрос через форму обратной связи на сайте telmed24.ru'.$titlename.' '.$titlelastname.' '.$today;
$mail->Body    = ''.$name.' '.$lastname.''.$phone.' '.$email.''.$message.' '.$company_name.''.$company_size.' '.$options.'' ;
$mail->AltBody = '';

if(!$mail->send()) {
    echo "Thanks you!";
} else {
	echo 'Hello!';
    // echo "<script>parent.fileUploaded();</script>";

}
?>




