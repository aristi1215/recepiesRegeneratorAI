<?php
session_start();
session_unset();
session_destroy();
header("Location: lecture8bDemo.php");
exit();
