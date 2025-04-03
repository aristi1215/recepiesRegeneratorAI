<?php

$servername = "localhost";
$username = "test";
$password = "12345";
$dbname = "test";

$dbConn = mysqli_connect($servername, $username, $password, $dbname);

if(!$dbConn){
    die("Connection Failed: ".mysqli_connect_error());
}else{
    echo "connection successful";
}