<?php
ob_start();
include("../coneccion.php");
$dbConn =  connect($db);
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    try {
      
            $sql = $dbConn->prepare("SELECT * FROM `platos`");

           
            
            $sql->execute();
            $sql->setFetchMode(PDO::FETCH_ASSOC);
            header("HTTP/1.1 200 OK");
            echo json_encode($sql->fetchAll());
        
    } catch (Exception $e) {
        echo 'Excepción capturada: ',  $e->getMessage(), "\n";
    }
}


if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    /*
    try {
        //$input = $_POST;
        $input = (array) json_decode(file_get_contents('php://input'), TRUE);
        $sql = "INSERT INTO prestamos_laboratorios(
            id_laboratorio,
            Fecha,
            Descripcion
        )
        VALUES(
            :id_laboratorio,
            NOW(),
            :Descripcion
        )";
        $statement = $dbConn->prepare($sql);
        $statement->bindValue(':id_laboratorio', $input['idLab']);
        $statement->bindValue(':Descripcion', $input['des']);
              
        // bindAllValues($statement, $input,-1);
        $statement->execute();
        $postId = $dbConn->lastInsertId();
        if ($postId) {
            $input['id'] = $postId;
            header("HTTP/1.1 200 OK");
            echo json_encode($input);
        }
    } catch (Exception $e) {
        echo 'Excepción capturada: ',  $e->getMessage(), "\n";
    }
    */
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