<?php
ob_start();
include("../coneccion.php");
$dbConn =  connect($db);
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    try {
        if (isset($_GET['nom'])) {
            $sql = $dbConn->prepare("SELECT
            du.usuario_id,
            du.usuario_nombre,
            du.usuario_password,
            du.usuario_nc,
            du.usuario_identificacion,
            du.usuario_intentos,
            map.idZona,
            map.secciones
        FROM
            data_usuarios du,
            maeporteador map
        WHERE
            du.usuario_bloqueado = 1 
            AND du.usuario_estado = 'activo' 
            AND du.usuario_nombre = :nombre 
            and du.usuario_identificacion=map.idPorteador
            ");
            $sql->bindValue(':nombre', $_GET['nom']);
            
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
        $sql = "UPDATE
        data_usuarios
    SET
        usuario_ultimoingreso=now(),
        usuario_intentos=:intentos
    WHERE
        usuario_id=:usrId";
        $statement = $dbConn->prepare($sql);
        $statement->bindValue(':intentos', $input['usuario_intentos']);
        $statement->bindValue(':usrId', $input['usuario_id']);
              
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