<?php
$rates = [
    176 => '1ZivGwTqQQeNIPEzFZn1mQQvbpMtIwE2',
        177 => 'kBdVV956TF8AXm_37RgsQBWTYELATkWo',
            178 => 'A--WRiWLggaZjzxpn_AnrfudB6PSJBrK',
     

];

$c = new SaleApi('https://sale.telmed24.ru', $_REQUEST['rate_id'], $rates[$_REQUEST['rate_id']]);
 echo $c->init($_REQUEST);
//echo $c->$_REQUEST['a']($_REQUEST);

class SaleApi
{
    private $baseUrl;
    private $rateId;
    private $rateSecret = 'secret';

    private $initRoute = 'sales/external-sale/init';
    private $checkRoute = 'sales/external-sale/check-promocode';

    public function __construct($baseUrl, $rateId, $rateSecret)
    {
        if (!function_exists('curl_init')) {
            throw new \Exception('Не установлено расширение php-curl');
        }

        $this->baseUrl    = $baseUrl;
        $this->rateId     = $rateId;
        $this->rateSecret = $rateSecret;
    }

    public function check($post)
    {
        return $this->send($this->checkRoute, ['promocode' => $post['promocode']]);
    }

    public function init($post)
    {
        return $this->send($this->initRoute);
    }

    private function send($route, $postFields = [])
    {
        $postFields = array_merge([
            'rate_id' => $this->rateId,
            'secret'  => $this->rateSecret
        ], $postFields);
      

        $url = $this->baseUrl . '/' . $route;
        $ch  = curl_init($url);

        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $postFields);

        $result = curl_exec($ch);
        $error  = curl_error($ch);
        curl_close($ch);

        return empty($error) ? $result : $result . ' ' . $error;
    }
}
