<?php
$login=false;
if($_SERVER['REQUEST_METHOD'] == "POST"){
    include "DBConnect.php";
    $email=$_POST['login_Email'];
    $password=$_POST['login_Password'];
    // $username=$_POST['login_Password'];
    $sql="SELECT * FROM `users` WHERE `user_email`='$email'";
    $result=mysqli_query($conn,$sql);
    $user=mysqli_num_rows($result);
    if($user==1){
        $row=mysqli_fetch_assoc($result);
        if($password == $row['password']){
            $username = $row['user_name'];
            session_start();
            $login=true;
            $_SESSION['loggedin']=true;
            $_SESSION['Username']=$username;
            $_SESSION['login_time_stamp'] = time(); 
            echo "<script>
            window.location.href='index.php';
            </script>";
        }
        else{
            echo "<script>
            alert('Opps! unable to Login');
            window.location.href='user.php';
            </script>";
        }
    }
    else{
        echo "<script>
        alert('Opps! unable to Login');
        window.location.href='user.php';
        </script>";
    }
}
?>