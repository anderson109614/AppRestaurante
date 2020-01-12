<?php
ob_start();
include("../coneccion.php");
$dbConn =  connect($db);
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
   /* try {
        if (isset($_GET['cod'])) {
            $sql = $dbConn->prepare("SELECT
            mv.codigo,
            mae.nomcte01,
            mv.codpaquete,
            mv.nopedido10,
            mv.tipodoc10,
            mv.status10,
            mv.factura,
            mv.cajas,
            mv.zona,
            mv.seccion,
            mv.campania,
            mv.codproducto10,
            mv.observ1,
            mv.direccion,
            mv.telefono21,
            mv.telefono22,
            mv.telefono23
        FROM
            movpaquetes10 mv,
            maecte mae
        WHERE 
        mv.codigo= mae.codcte01
        and mv.codigo=:cod
        and NOT  mv.status10 IN('04', '09')
            ");

            $sql->bindValue(':cod', $_GET['cod']);
            
            $sql->execute();
            $sql->setFetchMode(PDO::FETCH_ASSOC);
            header("HTTP/1.1 200 OK");
            echo json_encode($sql->fetchAll());
        }else{
            $sql = $dbConn->prepare("SELECT
            mv.codigo,
            mae.nomcte01,
            mv.codpaquete,
            mv.nopedido10,
            mv.tipodoc10,
            mv.status10,
            mv.factura,
            mv.cajas,
            mv.zona,
            mv.seccion,
            mv.campania,
            mv.codproducto10,
            mv.observ1,
            mv.direccion,
            mv.telefono21,
            mv.telefono22,
            mv.telefono23
        FROM
            movpaquetes10 mv,
            maecte mae
        WHERE 
        mv.codigo= mae.codcte01
        and mv.zona=:zona
        and mv.seccion in (".$_GET['secciones'].")
        and NOT  mv.status10 IN('04', '09')
            ");

            $sql->bindValue(':zona', $_GET['zona']);
           // $sql->bindValue(':secciones', );
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
        guardarMovPaquetes($input['codigo'],$input['status10'],$dbConn);
        header("HTTP/1.1 200 OK");
        echo json_encode($input);
        
    } catch (Exception $e) {
        echo 'Excepción capturada: ',  $e->getMessage(), "\n";
    }
    
}

function guardarMovPaquetes($cod,$status,$dbConn){
   // desactivarEncargadosAnteriores($idBien,$dbConn);
    $sql = $dbConn->prepare("UPDATE
    movpaquetes10
SET
   status10=:sts
WHERE
	codigo=:cod");
    $sql->bindValue(':sts',  $status);
    $sql->bindValue(':cod', $cod);
    $sql->execute();
}


header('Content-type: application/json');
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: *');
ob_end_flush(); 
?>