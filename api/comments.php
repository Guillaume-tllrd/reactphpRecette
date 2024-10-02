<?php
require_once 'db.php'; // Assure-toi que ce chemin est correct pour inclure le fichier de connexion à la base de données

header("Access-Control-Allow-Origin: *"); 
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$method = $_SERVER['REQUEST_METHOD'];

if ($method == 'OPTIONS'){
    http_response_code(200);
    exit;
}

switch ($method){
    case 'GET':
        handleGet();
    break;
    case 'POST':
        handlePost();
    break;
    // case 'PUT':
    //     handlePut();
    // break;
    case 'DELETE':
        handleDelete();
    break;
    default :
        http_response_code(405); //métyode non autorisée
        echo json_encode(['message' => 'Method not allowed']);
        break;
}

function handleGet() {
    global $pdo;

    // Vérifie si 'recipe_id' est présent dans les paramètres GET
    $recipe_id = isset($_GET['recipe_id']) ? intval($_GET['recipe_id']) : null;

    if ($recipe_id) {
        // Prépare la requête pour récupérer les commentaires pour une recette spécifique
        $stmt = $pdo->prepare('SELECT * FROM comments WHERE recipe_id = :recipe_id');
        $stmt->execute(['recipe_id' => $recipe_id]);
        $comments = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Vérifie si des commentaires ont été trouvés
        if ($comments) {
            echo json_encode($comments, JSON_PRETTY_PRINT);
        } else {
            echo json_encode(['message' => 'No comments found for this recipe'], JSON_PRETTY_PRINT);
        }
    } else {
        // Prépare la requête pour récupérer tous les commentaires si 'recipe_id' n'est pas fourni
        $stmt = $pdo->query('SELECT * FROM comments');
        $comments = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($comments, JSON_PRETTY_PRINT);
    }
}


function handlePost(){
    global $pdo;
    $data = json_decode(file_get_contents('php://input'), true);
    

    if (!isset($data['user_id'], $data['username'], $data['recipe_id'], $data['comment'], $data['date'])) {
        http_response_code(400);
        echo json_encode(['message' => 'Missing data']);
        return;
    }

    try{
        $stmt = $pdo->prepare('INSERT INTO comments (user_id, username, recipe_id, comment, date) VALUES (:user_id, :username, :recipe_id, :comment, :date)');

        // Exécution de la requête avec les données fournies
        $result = $stmt->execute([
            ':user_id'   => $data['user_id'],     // user_id doit être un entier
            ':username'  => $data['username'],    // username est une chaîne
            ':recipe_id' => $data['recipe_id'],   // recipe_id doit être un entier
            ':comment'   => $data['comment'],     // comment est une chaîne
            ':date'      => $data['date'],        // date est une chaîne formatée en datetime
        ]);
        

        // Vérification du résultat
        if ($result) {
            http_response_code(201);
            echo json_encode(['message' => 'New comments']);
        } else {
            http_response_code(500);
            $error = $stmt->errorInfo();
            echo json_encode(['message' => 'Creating error', 'error' => $error]);
        }
    } catch(Exception $e) {
        http_response_code(500);
        echo json_encode(['message' => 'Erreur serveur', 'error' => $e->getMessage()]);
    }
}

function handleDelete() {
    global $pdo;

    // On utilise file_get_contents('php://input') pour récupérer les données envoyées par le client dans la requête DELETE
    $data = json_decode(file_get_contents('php://input'), true);

    if (!isset($data['id'])) {
        http_response_code(400);
        echo json_encode(['message' => 'Missing data']);
        return;
    }

    try {
        // Préparer la requête SQL pour supprimer la recette favorite de l'utilisateur
        $stmt = $pdo->prepare("DELETE FROM comments WHERE id = :id");

        // Exécuter la requête avec les données fournies
        $result = $stmt->execute([
            'id' => $data['id'],
        ]);

  
        if ($result) {
            http_response_code(200);
            echo json_encode(['message' => 'Favorite recipe successfully removed']);
        } else {
            http_response_code(500);
            echo json_encode(['message' => 'Error removing favorite recipe']);
        }
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['message' => 'Server error', 'error' => $e->getMessage()]);
    }
}