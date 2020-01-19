<?php
ob_start();
include("../coneccion.php");
$dbConn =  connect($db);
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    
    try {
        
            $sql = $dbConn->prepare("
            SELECT
    fm.Id,
    fm.Fecha,
    fm.Id_cliente,
    cli.Cedula,
    concat(cli.Nombre,' ',cli.Apellido) as Nombre,
    fm.Total
FROM
    factura_maestro fm,
    clientes cli
WHERE
    fm.Id=cli.Id
    AND fm.Estado=1;
            ");

          //  $sql->bindValue(':est', $_GET['est']);
           // $sql->bindValue(':zona', $_GET['zona']);
            $sql->execute();
            $sql->setFetchMode(PDO::FETCH_ASSOC);
            header("HTTP/1.1 200 OK");
            echo json_encode($sql->fetchAll());
        
    } catch (Exception $e) {
        echo 'Excepción capturada: ',  $e->getMessage(), "\n";
    }
    
}


if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    
    try {
        //$input = $_POST;
        $input = (array) json_decode(file_get_contents('php://input'), TRUE);
        $sql = "INSERT INTO `factura_maestro`(`Fecha`, `Id_cliente`, `Total`,`Estado`)
        VALUES(now(),:IdCliente,:total,1 )";
        $statement = $dbConn->prepare($sql);
        $statement->bindValue(':IdCliente', $input['IdCliente']);
        $statement->bindValue(':total', $input['Total']);
              
        // bindAllValues($statement, $input,-1);
        $statement->execute();
        $postId = $dbConn->lastInsertId();
        if ($postId) {
            $input['Id'] = $postId;
            header("HTTP/1.1 200 OK");
            echo json_encode($input);
        }
    } catch (Exception $e) {
        echo 'Excepción capturada: ',  $e->getMessage(), "\n";
    }
    
}
if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    
    try {
        $idpre = $_GET['IdMae'];
       
        $statement = $dbConn->prepare("UPDATE factura_maestro SET Estado=0 WHERE Id=:IdMae");
        $statement->bindValue(':IdMae', $idpre);
        
        $statement->execute();
        $object3 = (object) [
            'msj' => 'OK'
                        
          ];
        header("HTTP/1.1 200 OK");
        echo json_encode($object3);
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