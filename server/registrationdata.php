<?php
    //echo "PHP ACTIVE";
    //Store registration data
    $fname = htmlspecialchars($_POST['firstname']);
    $lname  = htmlspecialchars($_POST['lastname']);
    $gender = htmlspecialchars($_POST['gender']);
    $snum = htmlspecialchars($_POST['streetnum']);
    $sname = htmlspecialchars($_POST['streetname']);
    $city = htmlspecialchars($_POST['city']);
    $state = htmlspecialchars($_POST['state']);
    $zip = htmlspecialchars($_POST['zip']);
    $phone = htmlspecialchars($_POST['phone1']) . htmlspecialchars($_POST['phone2']) . htmlspecialchars($_POST['phone3']);
    
    $filename = "registerdata.txt";
    // Check the existence of file
    if(file_exists($filename)){
    // Attempt to open the file
        $fileopen = fopen($filename, "a") or die("ERROR: Cannot open the file.");
    } else{
        echo "ERROR: File does not exist.";
    }
    $header = "\nRegistration data:%";
    
    //Write data on file to be sent to mySQL database
    //Data sent as continous string with % dividers to be seperated into an array
    fwrite($fileopen, $header);
    fwrite($fileopen, "fname:" . $fname . "%");
    fwrite($fileopen, "lname:" . $lname . "%");
    fwrite($fileopen, "gender:" . $gender . "%");
    fwrite($fileopen, "snum:" . $snum . "%");
    fwrite($fileopen, "sname:" . $sname . "%");
    fwrite($fileopen, "city:" . $city . "%");
    fwrite($fileopen, "state:" . $state . "%");
    fwrite($fileopen, "zip:" . $zip . "%");
    fwrite($fileopen, "phone:" . $phone . "%");
    
    $fclose = fclose($fileopen);
    
    echo "Registration complete";