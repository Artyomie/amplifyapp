<?php
    echo "PHP ACTIVE";
    $fname = htmlspecialchars($_POST['firstname']);
    $lname  = htmlspecialchars($_POST['lastname']);
    $filename = "registerdata.txt";
    // Check the existence of file
    if(file_exists($filename)){
    // Attempt to open the file
        $fileopen = fopen($filename, "wb") or die("ERROR: Cannot open the file.");
    } else{
        echo "ERROR: File does not exist.";
    }
    $header = "\nRegistration data: ";
    fwrite($fileopen, $header);
    fwrite($fileopen, "fname: " . $fname . "%");
    fwrite($fileopen, "lname: " . $lname . "%");
    $fclose = fclose($fileopen);