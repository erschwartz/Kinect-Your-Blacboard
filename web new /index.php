<?php
?>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="KinectHacks" content="">
    <link rel="icon" href="favicon.png">

    <title>Kinect Your Blackboard</title>

    <link rel="stylesheet" type="text/css" href="style.css">
    <script type="text/javascript" src="animate.js"></script>

    <!-- Bootstrap core CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">

    <!-- Custom styles for this template -->
    <link href="http://getbootstrap.com/examples/starter-template/starter-template.css" rel="stylesheet">

    <!-- Just for debugging purposes. Don't actually copy these 2 lines! -->
    <!--[if lt IE 9]><script src="../../assets/js/ie8-responsive-file-warning.js"></script><![endif]-->
    <script src="http://getbootstrap.com/assets/js/ie-emulation-modes-warning.js"></script>

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>
   
      <div id="container" >
  <!-- hidden anchor to stop jump http://www.css3create.com/Astuce-Empecher-le-scroll-avec-l-utilisation-de-target#wrap4  -->
  <a class="hiddenanchor" id="toregister"></a>
  <a class="hiddenanchor" id="tologin"></a>
  <div id="wrapper">
    <div id="login" class="center">
      <form  action="account.php" autocomplete="on"> 
        <h1>Log in</h1> 
        <p> 
          <label for="username" class="uname" data-icon="u" > Your email or username </label>
          <input id="username" name="username" required="required" type="text" placeholder="Username/user@gmail.com"/>
        </p>
        <p> 
          <label for="password" class="youpasswd" data-icon="p"> Your password </label>
          <input id="password" name="password" required="required" type="password" placeholder="password" /> 
        </p>
        
        <p class="login button"> 
          <input type="submit" value="Login" /> 
        </p>
        <?php
        name = mysql_query("SELECT * FROM 'user' WHERE 'name' = '$name'");

        ?>
        <p class="change_link">
          Not a member to Kinect my Blackboard?
          <a href="registerpage.html" title =" Join" target="_self">Join</a>
        </p>
      </form>
    </div>


    



    
  
</div> <!-- Div containeer --> 

























  


    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>
    <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
    <script src="http://getbootstrap.com/assets/js/ie10-viewport-bug-workaround.js"></script>
  </body>
</html>
