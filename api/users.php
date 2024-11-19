<?php
require_once 'db.php'; // Assure-toi que ce chemin est correct pour inclure le fichier de connexion à la base de données

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$method = $_SERVER['REQUEST_METHOD'];

// Gérer les requêtes OPTIONS préalables
//Lorsque le serveur reçoit une requête OPTIONS, il doit répondre avec un statut HTTP 200 (OK) et les en-têtes CORS appropriés pour indiquer au navigateur que la requête réelle peut être envoyée. Sans cette requete la method post ne fonctionnait pas
if ($method == 'OPTIONS') {
    http_response_code(200);
    exit;
}

switch ($method) {
    case 'GET':
        handleGet();
        break;
    case 'POST':
        handlePost();
        break;
    default:
        http_response_code(405); // Méthode non autorisée
        echo json_encode(['message' => 'Méthode non autorisée']);
        break;
}
function handleGet()
{
    global $pdo;
    $id = isset($_GET['id']) ? intval($_GET['id']) : null;

    if ($id) {
        $stmt = $pdo->prepare('SELECT * FROM users WHERE id = :id');
        $stmt->execute(['id' => $id]);
        $user = $stmt->fetch();
        if ($user) {
            echo json_encode($user);
        } else {
            http_response_code(404);
            echo json_encode(['message' => 'Utilisateur non trouvé']);
        }
    } else {
        $stmt = $pdo->query('SELECT * FROM users');
        $users = $stmt->fetchAll();
        echo json_encode($users);
    }
}

function handlePost()
{
    global $pdo;
    $data = json_decode(file_get_contents('php://input'), true);

    // Vérification des champs obligatoires
    if (!isset($data['firstname'], $data['name'], $data['username'], $data['email'], $data['password'])) {
        http_response_code(400);
        echo json_encode(['message' => 'Missing datas']);
        return;
    }

    // Validation de l'email
    if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['message' => 'Invalid email address']);
        return;
    }

    try {

        $stmt = $pdo->prepare('INSERT INTO users (firstname, name, username, email, password) VALUES (:firstname, :name, :username, :email, :password)');

        // Exécution de la requête avec les données fournies
        $result = $stmt->execute([
            strip_tags($data['firstname']),
            strip_tags($data['name']),
            strip_tags($data['username']),
            strip_tags($data['email']),
            password_hash($data['password'], PASSWORD_DEFAULT),
        ]);

        // Vérification du résultat
        if ($result) {
            http_response_code(201);
            echo json_encode(['message' => 'User created']);
        } else {
            http_response_code(500);
            $error = $stmt->errorInfo();
            echo json_encode(['message' => 'Erreur de création', 'error' => $error]);
        }
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['message' => 'Servor error', 'error' => $e->getMessage()]);
    }
}
