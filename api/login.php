<?php
// login.php
require 'db.php';  // Inclure la connexion à la base de données
require 'lib/php-jwt/src/JWT.php';  // Inclure la bibliothèque JWT manuellement

use Firebase\JWT\JWT;

$key = "votre_cle_secrete";  // Clé secrète pour signer le JWT

// Récupérer les données JSON envoyées par le frontend
$data = json_decode(file_get_contents("php://input"));

$email = $data->email;
$username = $data->username;
$password = $data->password;

// Vérifier les informations d'identification de l'utilisateur
$query = $db->prepare("SELECT * FROM users WHERE email = :email");
$query->bindParam(':email', $email);
$query->execute();
$user = $query->fetch(PDO::FETCH_ASSOC);

if ($user && password_verify($password, $user['password'])) {
    // Si les identifiants sont corrects, générer un JWT
    $issuedAt = time();
    $expirationTime = $issuedAt + 3600;  // 1 heure de validité
    $payload = [
        'iat' => $issuedAt,
        'exp' => $expirationTime,
        'user_id' => $user['id'],
        'username' => $user['username']
        'email' => $user['email']
    ];

    $jwt = JWT::encode($payload, $key, 'HS256');

    // Retourner le JWT au frontend
    echo json_encode(['token' => $jwt]);
} else {
    // Identifiants incorrects
    http_response_code(401);
    echo json_encode(['message' => 'Identifiants incorrects']);
}
?>