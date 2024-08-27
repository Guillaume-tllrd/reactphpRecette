<?php
// protected.php
require 'lib/php-jwt/src/JWT.php';  // Inclure la bibliothèque JWT manuellement
require 'db.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$key = "votre_cle_secrete";

$headers = getallheaders();
$authHeader = isset($headers['Authorization']) ? $headers['Authorization'] : '';

if (preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
    $jwt = $matches[1];
    try {
        $decoded = JWT::decode($jwt, new Key($key, 'HS256'));

        // Si le JWT est valide, accéder aux données protégées
        echo json_encode(['message' => 'Accès autorisé', 'user_id' => $decoded->user_id]);
    } catch (Exception $e) {
        // JWT invalide ou expiré
        http_response_code(401);
        echo json_encode(['message' => 'Token invalide ou expiré']);
    }
} else {
    http_response_code(401);
    echo json_encode(['message' => 'Token manquant']);
}
?>