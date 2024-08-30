<?php
// Création d'un "point de fin" pour récupérer les informations de l'utilisateur
require 'db.php';  
require_once 'lib/php-jwt/src/JWTExceptionWithPayloadInterface.php';
require_once 'lib/php-jwt/src/BeforeValidException.php';
require_once 'lib/php-jwt/src/ExpiredException.php';
require_once 'lib/php-jwt/src/SignatureInvalidException.php';
require_once 'lib/php-jwt/src/JWT.php';
require_once 'lib/php-jwt/src/JWK.php';
require_once 'lib/php-jwt/src/Key.php';
require_once 'lib/php-jwt/src/CachedKeySet.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Authorization");
header("Content-Type: application/json");

// Gérer les requêtes OPTIONS préalables
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$key = "votre_cle_secrete";  // Clé secrète pour signer le JWT, elle doit être la même que le login

// Initialisation du token
$authHeader = '';

// Vérifier la présence du header Authorization via différentes méthodes
//Au départ on vérifiait avec if(!isset($_SERVER['HTTP_AUTHORIZATION'])
if (function_exists('apache_request_headers')) {
    $headers = apache_request_headers();
    if (isset($headers['Authorization'])) {
        $authHeader = $headers['Authorization'];
    } elseif (isset($headers['X-Authorization'])) {
        $authHeader = $headers['X-Authorization'];
    }
} else {
    // Pour les environnements où apache_request_headers n'est pas disponible
    $authHeader = $_SERVER['HTTP_AUTHORIZATION'] ?? $_SERVER['REDIRECT_HTTP_AUTHORIZATION'] ?? '';
}

// Vérifier si le token est bien présent dans les en-têtes
if (!$authHeader) {
    http_response_code(401);
    echo json_encode(['message' => 'Token manquant']);
    exit;
}

// Extraire le token Bearer
if (preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
    $token = $matches[1];
} else {
    http_response_code(401);
    echo json_encode(['message' => 'Token invalide ou manquant']);
    exit;
}

try {
    // Décoder le JWT
    $decoded = JWT::decode($token, new Key($key, 'HS256'));
    // Récupérer les informations de l'utilisateur à partir de la base de données
    // pour vérifier son token aller sur https://jwt.io/, pendant un moment j'avais mis manuellement un token dans une var $jwt pour remplacer $token 
    $userId = $decoded->user_id;
    $query = $pdo->prepare("SELECT * FROM users WHERE id = :id");
    $query->bindParam(':id', $userId);
    $query->execute();
    $user = $query->fetch(PDO::FETCH_ASSOC);

    if ($user) {
        echo json_encode($user);
    } else {
        http_response_code(404);
        echo json_encode(['message' => 'Utilisateur non trouvé']);
    }
} catch (\Firebase\JWT\ExpiredException $e) {
    http_response_code(401);
    echo json_encode([
        'message' => 'Token expiré', 
        'exp' => isset($decoded->exp) ? $decoded->exp : null, 
        'current_time' => time()
    ]);
}
 catch (\Firebase\JWT\SignatureInvalidException $e) {
    http_response_code(401);
    echo json_encode(['message' => 'Signature du token invalide']);
} catch (Exception $e) {
    http_response_code(401);
    echo json_encode(['message' => 'Token invalide']);
}
