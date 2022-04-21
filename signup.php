<?php
if($_SERVER['REQUEST_METHOD'] == "POST"){
    include "DBConnect.php";
    $username=$_POST['Username'];
    $email=$_POST['Email'];
    $password=$_POST['Password'];
    $cpassword=$_POST['CPassword'];

    //Check whether username already exists or not
    $existid="SELECT * FROM `users` WHERE `user_email`='$email'";
    $result=mysqli_query($conn,$existid);
    $usernames=mysqli_num_rows($result);
    if($usernames>0){
        echo "<script type='text/javascript'>
            alert('Oops! Email already exists.\\nPlease Signup with different id:)');
            window.location.href='index.php';
            </script>";
    }
    else{
        if($password == $cpassword){
            $sql = "SET @autoid:= 0;";
            $sql .= "UPDATE users set Sr_no=@autoid:=(@autoid+1);";
            $sql .= "ALTER TABLE users AUTO_INCREMENT=1;";
            $sql .= "INSERT INTO users (`user_name`,`user_email`,`password`,`timestamp`) VALUES ('$username','$email','$password',current_timestamp())";
            $result=mysqli_query($conn,$sql);
            if($result){
                echo "<script type='text/javascript'>window.location.href='index.php';alert('Successfull Signup!\\nNow you can login.');</script>";
            }
        }
        else{
            echo "<script type='text/javascript'>alert('Please enter same password.');window.location.href='index.php';</script>";
        }
    }

}
?>