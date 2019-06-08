<?php
//php -S id:port
header("Access-Control-Allow-Origin: *");
//header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: Content-Type, X-Requested-With, Access-Control-Allow-Headers");
//var_dump($_POST);
header('Content-Type: application/json; charset=utf-8', true);

$data = json_decode(file_get_contents("php://input"), true);
$url = $data['url'];

//$_POST['url'] = 'https://kudago.com/public-api/v1.4/places/';
//var_dump($_POST);
//if(isset($_POST['url']) && $_POST['url'] != "") {

    //return "123123";

    //$url = $_POST['url'];
    //var_dump($url);
//    $url = 'https://kudago.com/public-api/v1.4/locations/';
    $json_content = file_get_contents($url);

    //var_dump(json_decode($json_content, true));

    if (false === ($data = json_encode($json_content, true))) {
        throw new Exception("Не удалось распарсить данные");
    }
    //print_r($data);
//    if (!empty($data['error'])) {
//        throw new Exception($data['error_description']);
//    }
    echo json_decode($data);
//} else {
//
//    return [];
//}




//    $url = 'https://kudago.com/public-api/v1.4/locations/';
//    $json_content = file_get_contents($url);
//
//    var_dump($json_content);
//
//    if (false === ($data = json_decode($json_content, true))) {
//        throw new Exception("Не удалось распарсить данные");
//    }
//    print_r($data);
//    if (!empty($data['error'])) {
//        throw new Exception($data['error_description']);
//    }
//    return $data['response'];



