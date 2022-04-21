<?php
session_start();
if(!isset($_SESSION['loggedin']) || $_SESSION['loggedin']!=true){
    header("location: user.php");
    exit;
} 
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>PathFinding Visualizer</title>
    <link rel="stylesheet" href="styles.css" />
    
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
      integrity="sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    />
  </head>
  <body>
    <nav class="navbar">
      <div class="navbar-header">
        <a href="#" class="navbar-logo">PathFinding Visualizer</a>
      </div>
      <ul class="nav-list">
        <li class="dropdown nav-item" id="selectAlgo">
          <a href="#" class="dropdown-toggle" data-dropdown-button>
            Algorithms<span class="caret"
              ><i class="fas fa-caret-down"></i
            ></span>
          </a>
          <ul class="dropdown-menu" id="algoMenu" data-dropdown>
            <li id="startButtonDijktra" value="1">
              <a href="#">Dijkstra's Algorithm</a>
            </li>
            <li id="startButtonAStar" value="2"><a href="#">A* Search</a></li>
            <li id="startButtonBFS" value="3">
              <a href="#">Breadth-first Search</a>
            </li>
            <li id="startButtonDFS" value="4">
              <a href="#">Depth-first Search</a>
            </li>
          </ul>
        </li>
        <li class="dropdown nav-item" id="selectMaze">
          <a href="#" class="dropdown-toggle" data-dropdown-button>
            Mazes & Patterns<span class="caret"
              ><i class="fas fa-caret-down"></i
            ></span>
          </a>
          <ul class="dropdown-menu" id="mazeMenu" data-dropdown>
            <li id="startButtonCreateMazeOne" value="1">
              <a href="#">Basic Random Maze</a>
            </li>
            <!-- <li id="startButtonCreateMazeTwo" value="2">
              <a href="#">Recursive Division</a>
            </li>
            <li id="startButtonCreateMazeThree">
              <a href="#">Recursive Division (Vertical Skew)</a>
            </li>
            <li id="startButtonCreateMazefour">
              <a href="#">Recursive Division (Horizontal Skew)</a>
            </li> -->
            <li id="startStairMaze" value="2">
              <a href="#">Simple Stair Pattern</a>
            </li>
          </ul>
        </li>
        <!-- <li id="startButtonAddBomb" class="nav-item">
          <a href="#">Add Bomb</a>
        </li> -->
        <li id="startButtonVisualize" class="nav-item">
          <button id="visualizeButton" class="navbar-btn">Visualize!</button>
        </li>
        <li id="startButtonClearBoard" class="nav-item">
          <a href="#">Clear Board</a>
        </li>
        <li id="logoutBtn" class="nav-item">
          <i class="fas fa-user"></i>
          <div class="logged_user" style="margin-right: 40px;">
            <?php
              echo $_SESSION['Username'];
            ?>
          </div>
          <button id="logOut" onclick="logOut()" class="navbar-btn">Log Out</button>
        </li>
        <!-- <li id="startButtonClearWalls" class="nav-item">
          <a href="#">Clear Walls &amp; Weights</a>
        </li> -->
      </ul>
    </nav>
    <div class="mainGrid">
      <div class="mainText">
        <ul>
          <li>
            <!-- <i class="fas fa-chevron-right"></i> -->
            <div class="start"></div>
            <span>Start Node</span>
          </li>
          <li>
            <!-- <i class="fas fa-bullseye"></i> -->
            <div class="finish"></div>
            <span>Target Node</span>
          </li>
          <li>
            <!-- <i class="fas fa-bomb"></i> -->
            <div class="bomb"></div>
            <span>Bomb Node</span>
          </li>
          <li>
            <!-- <i class="fas fa-weight-hanging"></i> -->
            <div class="weight"></div>
            <span>Weight Node</span>
          </li>
          <li>
            <div class="node unvisited"></div>
            Unvisited Node
          </li>
          <li>
            <div class="display-Nodes">
              <div class="node visitedOne"></div>
              <div class="node visitedTwo"></div>
            </div>
            Visited Nodes
          </li>
          <li>
            <div class="node shortest-path-node"></div>
            Shortest-Path Node
          </li>
          <li>
            <div class="node wall-node"></div>
            Wall Node
          </li>
        </ul>
      </div>
      <div class="algorithmDescriptor">Pick an Algorithm and Visualize it!</div>
      <table id="board" />
    </div>
    <script>
      function logOut() {
        window.location.href = 'logOut.php';
       }
    </script>
    <script src="./app.js"></script>
    <script src="./board.js"></script>
    <script src="./maze.js"></script>
  </body>
</html>
