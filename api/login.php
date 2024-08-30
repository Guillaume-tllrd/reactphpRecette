<?php
ob_start(); // Démarre la capture de la sortie

require 'db.php';  // Inclure la connexion à la base de données
require_once 'lib/php-jwt/src/JWTExceptionWithPayloadInterface.php';
require_once 'lib/php-jwt/src/BeforeValidException.php';
require_once 'lib/php-jwt/src/ExpiredException.php';
require_once 'lib/php-jwt/src/SignatureInvalidException.php';
require_once 'lib/php-jwt/src/JWT.php';
require_once 'lib/php-jwt/src/JWK.php';
require_once 'lib/php-jwt/src/Key.php';
require_once 'lib/php-jwt/src/CachedKeySet.php';


use Firebase\JWT\JWT;

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json');

// Gérer les requêtes OPTIONS préalables
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$key = "votre_cle_secrete";  // Clé secrète pour signer le JWT

// Récupérer les données JSON envoyées par le frontend
$data = json_decode(file_get_contents("php://input"));

if (empty($data->email) || empty($data->password)) {
    http_response_code(400);
    echo json_encode(['message' => 'Email ou mot de passe manquant']);
    exit;
}

$email = $data->email;
$password = $data->password;

// Vérifier les informations d'identification de l'utilisateur
$query = $pdo->prepare("SELECT * FROM users WHERE email = :email");
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
        'username' => $user['username'],
        'email' => $user['email'],
        'role' => $user['role'] 
    ];

    $jwt = JWT::encode($payload, $key, 'HS256');
    
    // Retourner le JWT au frontend
    echo json_encode(['token' => $jwt]);
} else {
    // Identifiants incorrects
    http_response_code(401);
    echo json_encode(['message' => 'Identifiants incorrects']);
}
ob_end_flush(); // Envoyer le buffer de sortie

// 
// Pour gérer la déconnexion dans le contexte des JSON Web Tokens (JWT), il est important de comprendre que les JWT sont stateless. Cela signifie qu'ils ne sont pas stockés côté serveur et que leur invalidation ne se fait pas de manière traditionnelle (comme la destruction d'une session côté serveur). Au lieu de cela, la déconnexion avec JWT se fait généralement de la manière suivante :

//     Expiration du JWT : Le JWT a une date d'expiration définie dans le payload (dans ton cas, 1 heure après la création). Après cette période, le token devient invalide.
    
//     Gestion du stockage côté client : Le token est stocké côté client (souvent dans le stockage local du navigateur ou dans les cookies). Pour se déconnecter, il faut supprimer ce token du stockage côté client.