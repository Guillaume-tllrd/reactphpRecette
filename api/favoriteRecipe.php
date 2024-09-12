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

        // on doit d'abord vérifier l'idendité de user_id via une requête $_GET
    $user_id = isset($_GET['user_id']) ? intval($_GET['user_id']) : null;
    if ($user_id){
     //on spécifie exactement les colonnes qu'on récupère
        $stmt = $pdo->prepare('SELECT 
                               r.picture_1 AS recipe_picture, 
                               r.name AS recipe_name, 
                               r.categories AS recipe_categorie,
                               u.name AS user_name,
                               u.id AS user_id
                           FROM favoris f
                           JOIN recipes r ON f.recipe_id = r.id
                           JOIN users u ON f.user_id = u.id
                           WHERE f.user_id = :user_id');
                           //comme on a une colonne user_name dans la table favoris, et que je veuw que ces données soient toujours à jour et synchronisées avec la table users je dois églmt JOIN avec users sinon pas besoin
                       //Le WHERE f.user_id = :user_id est là pour filtrer les résultats de la table favoris en fonction de l'utilisateur connecté
        $stmt->execute(['user_id' => $user_id]);
        $favoritesRecipesByUser = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Vérifier si des favoris sont trouvés
        if ($favoritesRecipesByUser) {
            echo json_encode($favoritesRecipesByUser, JSON_PRETTY_PRINT);
        } else {
            // Si aucun favori n'est trouvé pour cet utilisateur
            echo json_encode(['message' => 'No favorite recipes found for this user']);
        }
    
    }else {
        $stmt = $pdo->query('SELECT * FROM favoris');
        $favoritesRecipes = $stmt->fetchAll();
        echo json_encode($favoritesRecipes, JSON_PRETTY_PRINT);
    }
}

function handlePost(){
    global $pdo;
    $data = json_decode(file_get_contents('php://input'), true);

    if (!isset($data['user_id'], $data['user_name'], $data['recipe_id'], $data['recipe_name'], $data['recipe_picture'], $data['recipe_categorie'])) {
        http_response_code(400);
        echo json_encode(['message' => 'Missing data']);
        return;
    }
    try {
        
        $stmt = $pdo->prepare('INSERT INTO favoris (user_id, user_name, recipe_id, recipe_name, recipe_picture, recipe_categorie) VALUES (:user_id, :user_name, :recipe_name, :recipe_id, :recipe_picture, :recipe_categorie)');

        // Exécution de la requête avec les données fournies
        $result = $stmt->execute([
            $data['user_id'],
            $data['user_name'],
            $data['recipe_id'],
            $data['recipe_name'],
            $data['recipe_picture'],
            $data['recipe_categorie']
        ]);

        // Vérification du résultat
        if ($result) {
            http_response_code(201);
            echo json_encode(['message' => 'Now, this recipes is one of your favorite']);
        } else {
            http_response_code(500);
            $error = $stmt->errorInfo();
            echo json_encode(['message' => 'Creating error', 'error' => $error]);
        }
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['message' => 'Erreur serveur', 'error' => $e->getMessage()]);
    }
}

function handleDelete() {
    global $pdo;

    // On utilise file_get_contents('php://input') pour récupérer les données envoyées par le client dans la requête DELETE
    $data = json_decode(file_get_contents('php://input'), true);


    // Vérifier que les données nécessaires sont présentes
    if (!isset($data['id'], $data['user_id'])) {
        http_response_code(400);
        echo json_encode(['message' => 'Missing data']);
        return;
    }

    try {
        // Préparer la requête SQL pour supprimer la recette favorite de l'utilisateur
        $stmt = $pdo->prepare("DELETE FROM favoris WHERE recipe_id = :recipe_id AND user_id = :user_id");

        // Exécuter la requête avec les données fournies
        $result = $stmt->execute([
            'recipe_id' => $data['id'],
            'user_id' => $data['user_id'],
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
