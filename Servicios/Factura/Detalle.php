<?php
ob_start();
include("../coneccion.php");
$dbConn =  connect($db);
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
   try {
        if (isset($_GET['Id'])) {
            $sql = $dbConn->prepare("SELECT
            fd.Id,
            pl.Nombre,
            pl.Precio,
            fd.Cantidad,
            pl.Precio*fd.Cantidad as SubTotal
        FROM
            factura_detalle fd,
            platos pl
        WHERE
            fd.Id_Plato=pl.Id
            AND Id_Maestro=:Id
            ");

            $sql->bindValue(':Id', $_GET['Id']);
            
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
        //$input = $_POST;
        $input = (array) json_decode(file_get_contents('php://input'), TRUE);
        $sql = "INSERT INTO `factura_detalle`(
            `Id_Maestro`,
            `Id_Plato`,
            `Cantidad`
        )
        VALUES(:maestro,:plato,:cantidad )";
        $statement = $dbConn->prepare($sql);
        $statement->bindValue(':maestro', $input['Id_Maestro']);
        $statement->bindValue(':plato', $input['Id']);
        $statement->bindValue(':cantidad', $input['Cantidad']);
        
        
        // bindAllValues($statement, $input,-1);

        $statement->execute();
        
        header("HTTP/1.1 200 OK");
        echo json_encode($input);
        
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