<?php
ob_start();
include("../coneccion.php");
$dbConn =  connect($db);
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
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
}


if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    try {
         if (isset($_GET['Cedula'])) {

///
$sql = "INSERT INTO clientes(
            
    Cedula,
    Nombre,
    Apellido,
    Telefono,
    Direccion,
    Estado
)
VALUES(
    
    :Cedula,
    :Nombre,
    :Apellido,
    :Telefono,
    :Direccion,
    1
)";
$statement = $dbConn->prepare($sql);
$statement->bindValue(':Cedula', $_GET['Cedula']);
$statement->bindValue(':Nombre', $_GET['Nombre']);
$statement->bindValue(':Apellido', $_GET['Apellido']);
$statement->bindValue(':Telefono', $_GET['Telefono']);
$statement->bindValue(':Direccion', $_GET['Direccion']);

// bindAllValues($statement, $input,-1);
$statement->execute();
$postId = $dbConn->lastInsertId();
if ($postId) {
    $input['msj'] = 'OK';
    header("HTTP/1.1 200 OK");
    echo json_encode($input);
}


///
         }
       
    } catch (Exception $e) {
        echo 'Excepción capturada: ',  $e->getMessage(), "\n";
    }
   

}

if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    try {
         if (isset($_GET['Id'])) {

        ///
        $sql = "UPDATE clientes SET Estado=0 WHERE Id=:Id";
        $statement = $dbConn->prepare($sql);
        $statement->bindValue(':Id', $_GET['Id']);


        // bindAllValues($statement, $input,-1);
        $statement->execute();


        $input['msj'] = 'OK';
        header("HTTP/1.1 200 OK");
        echo json_encode($input);



///
         }
       
    } catch (Exception $e) {
        echo 'Excepción capturada: ',  $e->getMessage(), "\n";
    }
   

}
if ($_SERVER['REQUEST_METHOD'] == 'UPDATE') {
    try {
         if (isset($_GET['Id'])) {

        ///
        $sql = "UPDATE
        clientes
    SET        
        Cedula =:Cedula,
        Nombre = :Nombre,
        Apellido =:Apellido ,
        Telefono =:Telefono ,
        Direccion = :Direccion
    WHERE
        Id=:Id";
        $statement = $dbConn->prepare($sql);
        $statement->bindValue(':Cedula', $_GET['Cedula']);
        $statement->bindValue(':Nombre', $_GET['Nombre']);
        $statement->bindValue(':Apellido', $_GET['Apellido']);
        $statement->bindValue(':Telefono', $_GET['Telefono']);
        $statement->bindValue(':Direccion', $_GET['Direccion']);    
        $statement->bindValue(':Id', $_GET['Id']); 
        // bindAllValues($statement, $input,-1);
        $statement->execute();


        $input['msj'] = 'OK';
        header("HTTP/1.1 200 OK");
        echo json_encode($input);



///
         }
       
    } catch (Exception $e) {
        echo 'Excepción capturada: ',  $e->getMessage(), "\n";
    }
   

}

header('Content-type: application/json');
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: *');
ob_end_flush();
?>