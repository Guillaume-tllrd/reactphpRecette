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
    // case 'DELETE':
    //     handleDelete();
    // break;
    default :
        http_response_code(405); //métyode non autorisée
        echo json_encode(['message' => 'Method not allowed']);
        break;
}

function handleGet() {
    global $pdo;

    // pour  trier les recettes en fonction de leur catégorie. il faudra utiliser useParams pour faire passer la catégorie dans l'url requete axios: axios.get(`http://localhost:8005/recipes.php?categories=${category}) with const param = useParams();
    // const category = param.category ne pas oublier le route
    $category = isset($_GET['categories']) ? $_GET['categories'] : null;

    if (isset($_GET['categoryLimit']) && $_GET['categoryLimit'] == 'true') {
        $stmt = $pdo->query("
            SELECT * FROM (
                SELECT * FROM recipes WHERE categories = 'breakfast' LIMIT 3
            ) AS breakfast
            UNION ALL
            SELECT * FROM (
                SELECT * FROM recipes WHERE categories = 'main' LIMIT 3
            ) AS main
            UNION ALL
            SELECT * FROM (
                SELECT * FROM recipes WHERE categories = 'dessert' LIMIT 3
            ) AS dessert
            UNION ALL
            SELECT * FROM (
                SELECT * FROM recipes WHERE categories = 'appetizer' LIMIT 3
            ) AS appetizer
        ");

    } else if ($category) {
   
        $stmt = $pdo->prepare("SELECT * FROM recipes WHERE categories = :categories");
        $stmt->execute([':categories' => htmlspecialchars($category)]);
    } else {
        $stmt = $pdo->query("SELECT * FROM recipes");
    }

    $recipes = $stmt->fetchAll();
    echo json_encode($recipes, JSON_PRETTY_PRINT);
}


function handlePost() {
    global $pdo;

    // S'assurer que les inputs sont envoyés
    $requiredFields = ['name', 'ingredients', 'summary', 'description', 'tags', 'country', 'categories', 'difficulty', 'number_of_servings', 'prep_time', 'cooking_time', 'top'];
    foreach ($requiredFields as $field) {
        if (empty($_POST[$field])) {
            http_response_code(400);
            echo json_encode(['message' => "Missing field: $field"]);
            return;
        }
    }

    // S'assurer que les fichiers ont été envoyés
    if (empty($_FILES['picture1']) || empty($_FILES['picture2']) || empty($_FILES['picture3'])) {
        http_response_code(400);
        echo json_encode(['message' => 'Missing file']);
        return;
    }
        $fileNames = [];
        $fileKeys = ['picture1', 'picture2', 'picture3'];
        $allowed = ["jpg", "jpeg", "png", "svg"];

        foreach ($fileKeys as $key) {
        $file = $_FILES[$key];
        $imageExtension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));

        if (!in_array($imageExtension, $allowed)) {
            http_response_code(400);
            echo json_encode(['message' => "Unauthorized file type. Only JPG, JPEG, PNG, and SVG files are allowed"]);
            return;
        }
        
       
        $newname=md5(uniqid());
        $newfilename = "uploads/$newname.$imageExtension";
            
        if(!move_uploaded_file($file["tmp_name"], $newfilename)){
            http_response_code(500);
            echo json_encode(['message' => "Error saving file: $key"]);
            return;
            }
        $fileNames[$key] = $newfilename;
    }
    try {
        
        $stmt = $pdo->prepare('INSERT INTO recipes (name, ingredients, summary, description, tags, country, picture_1, picture_2, picture_3, categories, difficulty, number_of_servings, prep_time, cooking_time, top) VALUES (:name, :ingredients, :summary, :description, :tags, :country, :picture_1, :picture_2, :picture_3, :categories, :difficulty, :number_of_servings, :prep_time, :cooking_time, :top)');
        

        // Exécution de la requête avec les données fournies
        //htmlspecialchars pour les injonctions sql
        $result = $stmt->execute([
           ':name' => htmlspecialchars($_POST['name']),
            ':ingredients' => htmlspecialchars($_POST['ingredients']),
            ':summary' => htmlspecialchars($_POST['summary']),
            ':description' => htmlspecialchars($_POST['description']),
            ':tags' => htmlspecialchars($_POST['tags']),
            ':country' => htmlspecialchars($_POST['country']),
            ':picture_1' => $fileNames['picture1'],
            ':picture_2' => $fileNames['picture2'],
            ':picture_3' => $fileNames['picture3'],
            ':categories' => htmlspecialchars($_POST['categories']),
            ':difficulty' => htmlspecialchars($_POST['difficulty']),
            ':number_of_servings' => htmlspecialchars($_POST['number_of_servings']),
            ':prep_time' => htmlspecialchars($_POST['prep_time']),
            ':cooking_time' => htmlspecialchars($_POST['cooking_time']),
            ':top' => htmlspecialchars($_POST['top']),
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
        echo json_encode(['message' => 'Server error', 'error' => $e->getMessage()]);
    }
}
