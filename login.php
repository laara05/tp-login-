<?php
// conexión a la base de datos
$host = "localhost";
$user = "root"; 
$password = ""; 
$bddlogin = "test"; 

// crear la conexión
$conn = new mysqli($host, $user, $password, $bddlogin);

// verificar conexión
if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Conexión fallida a la base de datos"]));
}

// Obtener datos enviados desde Axios
$data = json_decode(file_get_contents("php://input"));


$username = $conn->real_escape_string($data->username);
$email = $conn->real_escape_string($data->email);
$password = $conn->real_escape_string($data->password);

// consulta para validar los datos
$sql = "SELECT * FROM users WHERE username='$username' AND email='$email' AND password='$password'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    echo json_encode([
        "success" => true,
        "username" => $row['username']
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Usuario o contraseña incorrectos"
    ]);
}

$conn->close();
?>
