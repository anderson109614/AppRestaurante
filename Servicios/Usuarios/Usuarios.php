<?php
ob_start();
include("../coneccion.php");
$dbConn =  connect($db);
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    /*
    try {
        if (isset($_GET['id'])) {
            $sql = $dbConn->prepare(" SELECT
            *
        FROM
            `clientes`
        WHERE
            Id = :id");
            $sql->bindValue(':id', $_GET['id']);
            
            $sql->execute();
            $sql->setFetchMode(PDO::FETCH_ASSOC);
            header("HTTP/1.1 200 OK");
            echo json_encode($sql->fetchAll());
        }else{
            $sql = $dbConn->prepare(" SELECT
            *
        FROM
            `clientes`");
                       
            $sql->execute();
            $sql->setFetchMode(PDO::FETCH_ASSOC);
            header("HTTP/1.1 200 OK");
            echo json_encode($sql->fetchAll());
        }  
    } catch (Exception $e) {
        echo 'Excepción capturada: ',  $e->getMessage(), "\n";
    }
    */
}


if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    try{
        $input = (array) json_decode(file_get_contents('php://input'), TRUE);
       
        $sql = $dbConn->prepare("SELECT
        Id,
        Cedula,
        Nombre,
        Apellido,
        Telefono,
        Direccion,
        Contraseña
        
    FROM
        usuarios
    WHERE
          Cedula=:usuario
     AND   Contraseña=:contrasena;");
        $sql->bindValue(':usuario', $input['Cedula'] );
        $sql->bindValue(':contrasena', $input['Contraseña'] );
        $sql->execute();
          $sql->setFetchMode(PDO::FETCH_ASSOC);
          header("HTTP/1.1 200 OK");
          echo json_encode( $sql->fetchAll()  );
       // echo json_encode(  $sql->fetch(PDO::FETCH_ASSOC)  );
      
   
    } catch (Exception $e) {
        //echo 'Excepción capturada: ',  $e->getMessage(), "\n";
        $input['error'] =$e->getMessage() ;
        echo json_encode($input);
    }
   

}


header('Content-type: application/json');
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: *');
ob_end_flush();
?>