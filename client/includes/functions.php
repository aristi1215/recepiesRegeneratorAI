<?php

function getRequestMethod(){
    return $_SERVER["REQUEST_METHOD"];
}

function getPostData($key){
    return isset($_POST[$key]) ? $_POST[$key] : null;
}
