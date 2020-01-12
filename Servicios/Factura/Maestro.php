<?php
ob_start();
include("../coneccion.php");
$dbConn =  connect($db);
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    /*
    try {
        if (isset($_GET['est'])) {
            $sql = $dbConn->prepare("SELECT
           ANY_VALUE(mv.codigo) as codigo,
            mae.nomcte01,
            mae.dircte01,
           ANY_VALUE(mv.status10) as status10,
            mv.zona,
           ANY_VALUE(mv.seccion) as seccion,
            COUNT(mv.tipodoc10) as Paquetes,
            COUNT(mv.tipodoc10) as FueraCaja
        FROM
            movpaquetes10 mv,
            maecte mae
        WHERE 
        mv.codigo= mae.codcte01
        and mv.tipodoc10=:est
        and mv.zona=:zona
        and mv.seccion in (".$_GET['secciones'].")
        and NOT  mv.status10 IN('04', '09')
        GROUP by mv.codigo
            ");

            $sql->bindValue(':est', $_GET['est']);
            $sql->bindValue(':zona', $_GET['zona']);
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
        $sql = "INSERT INTO `factura_maestro`(`Fecha`, `Id_cliente`, `Total`)
        VALUES(now(),:IdCliente,:total )";
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
    /*
    try {
        $idpre = $_GET['idPrestamo'];
        $idhor = $_GET['idHorarios'];
        $statement = $dbConn->prepare("DELETE FROM prestamos_laboratorios_horarios WHERE id_prestamo=:idPrestamo AND id_horario=:idHorario");
        $statement->bindValue(':idPrestamo', $idpre);
        $statement->bindValue(':idHorario', $idhor);
        $statement->execute();
        $object3 = (object) [
            'id' => $idpre,
            'msj' => 'OK'
                        
          ];
        header("HTTP/1.1 200 OK");
        echo json_encode($object3);
    } catch (Exception $e) {
        echo 'Excepción capturada: ',  $e->getMessage(), "\n";
    }
    */
}
header('Content-type: application/json');
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: *');
ob_end_flush();
?>