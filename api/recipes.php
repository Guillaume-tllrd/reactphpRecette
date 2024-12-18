<?php
require_once 'db.php'; // Assure-toi que ce chemin est correct pour inclure le fichier de connexion à la base de données

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET, PUT, OPTIONS,  DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$method = $_SERVER['REQUEST_METHOD'];

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
    case 'PUT':
        handlePut();
        break;
    case 'DELETE':
        handleDelete();
        break;
    default:
        http_response_code(405); //métyode non autorisée
        echo json_encode(['message' => 'Method not allowed']);
        break;
}

function handleGet()
{
    global $pdo;

    // pour  trier les recettes en fonction de leur catégorie. il faudra utiliser useParams pour faire passer la catégorie dans l'url requete axios: axios.get(`http://localhost:8005/recipes.php?categories=${category}) with const param = useParams();
    // const category = param.category ne pas oublier le route
    $category = isset($_GET['categories']) ? $_GET['categories'] : null;
    $id = isset($_GET['id']) ? $_GET['id'] : null;
    $searchRecipe = isset($_GET['search']) ? ($_GET['search']) : null;
    $countryRecipe = isset($_GET['country']) ? ($_GET['country']) : null;
    $tagRecipe = isset($_GET['tag']) ? ($_GET['tag']) : null;

    if ($searchRecipe) {
        $stmt = $pdo->prepare("SELECT * FROM recipes WHERE name LIKE ?");
        $stmt->execute(['%' . $searchRecipe . '%']);
    } else if ($tagRecipe) {
        $stmt = $pdo->prepare("SELECT * FROM recipes WHERE tags LIKE ?");
        $stmt->execute(['%' . $tagRecipe . '%']);
    } else if ($countryRecipe) {
        $stmt = $pdo->prepare("SELECT * FROM recipes WHERE country LIKE ?");
        $stmt->execute(['%' . $countryRecipe . '%']);
    } else if (isset($_GET['background']) && $_GET['background'] == 'true') {
        $stmt = $pdo->prepare("SELECT id, name, summary, categories, picture_2 FROM recipes WHERE background = :yes ORDER BY RAND() LIMIT 1");
        $stmt->execute([':yes' => 'yes']);
    } else if (isset($_GET['top']) && $_GET["top"] == 'true') {
        $stmt = $pdo->prepare('SELECT id, name, picture_1, categories FROM recipes WHERE top = :yes ORDER BY RAND() LIMIT 3');
        $stmt->execute([':yes' => 'yes']);
    } else if (isset($_GET['indexLimit']) && is_numeric($_GET['indexLimit'])) {
        //vérifie que le paramètre indexLimit est bien défini et qu'il s'agit d'un nombre.
        $limit = intval($_GET['indexLimit']); //ermet de convertir la valeur de indexLimit en entier
        $stmt = $pdo->prepare("SELECT picture_1, name, id, categories FROM recipes ORDER BY RAND() LIMIT :limit");
        $stmt->bindParam(':limit', $limit, PDO::PARAM_INT);
        $stmt->execute();
        //il faudra par contre ne pas oublier de mettre le nbre limit dans le axios. ex: axios.get('http://localhost:8005/recipes.php?indexLimit=4')

    } else if (isset($_GET['categoryLimit']) && $_GET['categoryLimit'] == 'true') {
        $stmt = $pdo->query("
            SELECT * FROM (
                SELECT * FROM recipes WHERE categories = 'breakfast' LIMIT 3
            ) AS breakfast
            UNION ALL
            SELECT * FROM (
                SELECT * FROM recipes WHERE categories = 'main'  LIMIT 3
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
        $stmt = $pdo->prepare("SELECT id, name, picture_1, categories, difficulty FROM recipes WHERE categories = :categories");
        $stmt->execute([':categories' => htmlspecialchars($category)]);
    } else if ($id) {
        $stmt = $pdo->prepare("SELECT * FROM recipes WHERE id = :id");
        $stmt->execute(['id' => htmlspecialchars($id)]);
    } else {
        $stmt = $pdo->query("SELECT * FROM recipes");
    }
    $recipes = $stmt->fetchAll();
    echo json_encode($recipes, JSON_PRETTY_PRINT);
}

function handlePut()
{
    global $pdo;

    $data = json_decode(file_get_contents('php://input'), true);

    if (!isset($data['id'], $data['name'], $data['ingredients'], $data['summary'], $data['description'], $data['tags'], $data['country'], $data['categories'], $data['difficulty'], $data['number_of_servings'], $data['prep_time'], $data['cooking_time'], $data['top'], $data['background'])) {
        http_response_code(400);
        echo json_encode(['message' => 'Missing data']);
        return;
    }

    try {
        // Prepare the query to update the recipe
        $stmt = $pdo->prepare('UPDATE recipes SET name = :name, ingredients = :ingredients, summary = :summary, description = :description, tags = :tags, country = :country, categories = :categories, difficulty = :difficulty, number_of_servings = :number_of_servings, prep_time = :prep_time, cooking_time = :cooking_time, top = :top, background = :background WHERE id = :id');

        // Execute the query with the provided data
        $result = $stmt->execute([
            'id' => htmlspecialchars($data['id']),
            ':name' => htmlspecialchars($data['name']),
            ':ingredients' => htmlspecialchars($data['ingredients']),
            ':summary' => htmlspecialchars($data['summary']),
            ':description' => htmlspecialchars($data['description']),
            ':tags' => htmlspecialchars($data['tags']),
            ':country' => htmlspecialchars($data['country']),
            ':categories' => htmlspecialchars($data['categories']),
            ':difficulty' => htmlspecialchars($data['difficulty']),
            ':number_of_servings' => htmlspecialchars($data['number_of_servings']),
            ':prep_time' => htmlspecialchars($data['prep_time']),
            ':cooking_time' => htmlspecialchars($data['cooking_time']),
            ':top' => htmlspecialchars($data['top']),
            ':background' => htmlspecialchars($data['background']),
        ]);

        // Check the result
        if ($result) {
            http_response_code(201);
            echo json_encode(['message' => 'Recipe updated']);
        } else {
            http_response_code(500);
            $error = $stmt->errorInfo();
            echo json_encode(['message' => 'Updating error', 'error' => $error]);
        }
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['message' => 'Server error', 'error' => $e->getMessage()]);
    }
}


function handlePost()
{
    global $pdo;

    // S'assurer que les inputs sont envoyés
    $requiredFields = ['name', 'ingredients', 'summary', 'description', 'tags', 'country', 'categories', 'difficulty', 'number_of_servings', 'prep_time', 'cooking_time', 'top', 'background'];
    foreach ($requiredFields as $field) {
        if (empty($_POST[$field])) {
            http_response_code(400);
            echo json_encode(['message' => "Missing field: $field"]);
            return;
        }
    }

    // S'assurer que les fichiers ont été envoyés
    if (empty($_FILES['picture1']) || empty($_FILES['picture2'])) {
        http_response_code(400);
        echo json_encode(['message' => 'Missing file']);
        return;
    }
    $fileNames = [];
    $fileKeys = ['picture1', 'picture2'];
    $allowed = ["jpg", "jpeg", "png", "svg"];

    foreach ($fileKeys as $key) {
        $file = $_FILES[$key];
        $imageExtension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));

        if (!in_array($imageExtension, $allowed)) {
            http_response_code(400);
            echo json_encode(['message' => "Unauthorized file type. Only JPG, JPEG, PNG, and SVG files are allowed"]);
            return;
        }


        $newname = md5(uniqid());
        $newfilename = "uploads/$newname.$imageExtension";

        if (!move_uploaded_file($file["tmp_name"], $newfilename)) {
            http_response_code(500);
            echo json_encode(['message' => "Error saving file: $key"]);
            return;
        }
        $fileNames[$key] = $newfilename;
    }
    try {

        $stmt = $pdo->prepare('INSERT INTO recipes (name, ingredients, summary, description, tags, country, picture_1, picture_2, categories, difficulty, number_of_servings, prep_time, cooking_time, top, background) VALUES (:name, :ingredients, :summary, :description, :tags, :country, :picture_1, :picture_2, :categories, :difficulty, :number_of_servings, :prep_time, :cooking_time, :top, :background)');


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
            ':categories' => htmlspecialchars($_POST['categories']),
            ':difficulty' => htmlspecialchars($_POST['difficulty']),
            ':number_of_servings' => htmlspecialchars($_POST['number_of_servings']),
            ':prep_time' => htmlspecialchars($_POST['prep_time']),
            ':cooking_time' => htmlspecialchars($_POST['cooking_time']),
            ':top' => htmlspecialchars($_POST['top']),
            ':background' => htmlspecialchars($_POST['background']),
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


function handleDelete()
{
    global $pdo;

    $data = json_decode(file_get_contents('php://input'), true);

    // Vérifier que les données nécessaires sont présentes
    if (empty($data['id'])) {
        http_response_code(400);
        echo json_encode(['message' => 'Missing data']);
        return;
    }

    try {
        // Préparer la requête SQL pour supprimer la recette favorite de l'utilisateur
        $stmt = $pdo->prepare("DELETE FROM recipes WHERE id = :id ");

        // Exécuter la requête avec les données fournies
        $result = $stmt->execute([
            'id' => $data['id'],
        ]);

        if ($result) {
            http_response_code(200);
            echo json_encode(['message' => 'Recipe successfully removed']);
        } else {
            http_response_code(500);
            echo json_encode(['message' => 'Error removing recipe']);
        }
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['message' => 'Server error', 'error' => $e->getMessage()]);
    }
}
