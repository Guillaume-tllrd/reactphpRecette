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
    case 'PUT':
        handlePut();
    break;
    case 'DELETE':
        handleDelete();
    break;
    default :
        http_response_code(405); //métyode non autorisée
        echo json_encode(['message' => 'Méthode non autorisée']);
        break;
}

function handlePost() {
    global $pdo;
    $data = json_decode(file_get_contents('php://input'), true);

    // Vérification des champs obligatoires
    if (!isset(
        $data['name'],
        $data['ingredients'],
        $data['summary'],
        $data['description'],
        $data['tags'],
        $data['country'],
        $data['picture1'],
        $data['picture2'],
        $data['picture3'],
        $data['categories'],
        $data['difficulty'],
        $data['number_of_servings'],
        $data['prep_time'],
        $data['cooking_time'],
        $data['top']
    )) {
        http_response_code(400);
        echo json_encode(['message' => 'Missing data']);
        return;
    }

    try {
        
        $stmt = $pdo->prepare('INSERT INTO recipes (name, ingredients, summary, description, tags, country, picture1, picture2, picture3, categories, difficulty, number_of_servings, prep_time, cooking_time, top) VALUES (:name, :ingredients, :summary, :description, :tags, :country, :picture_1, :picture_2, :picture_3, :categories, :difficulty, :number_of_servings, :prep_time, :cooking_time, :top)');
        ;

        // Exécution de la requête avec les données fournies
        $result = $stmt->execute([
            $data['name'],
            $data['ingredients'],
            $data['summary'],
            $data['description'],
            $data['tags'],
            $data['country'],
            $data['picture1'],
            $data['picture2'],
            $data['picture3'],
            $data['categories'],
            $data['difficulty'],
            $data['number_of_servings'],
            $data['prep_time'],
            $data['cooking_time'],
            $data['top'],
        ]);
        

        // Vérification du résultat
        if ($result) {
            http_response_code(201);
            echo json_encode(['message' => 'Recipe created']);
        } else {
            http_response_code(500);
            $error = $stmt->errorInfo();
            echo json_encode(['message' => 'Error to create', 'error' => $error]);
        }
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['message' => 'Erreur serveur', 'error' => $e->getMessage()]);
    }
}
