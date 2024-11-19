<?php
require_once 'db.php'; // connexion à la bdd

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");
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
    default:
        http_response_code(405); //métyode non autorisée
        echo json_encode(['message' => 'Method not allowed']);
        break;
}

function handleGet()
{
    global $pdo;

    $tagArticle = isset($_GET['tag']) ? ($_GET['tag']) : null;
    $id = isset($_GET['id']) ? $_GET['id'] : null;

    if ($id) {
        $stmt = $pdo->prepare("SELECT * FROM articles WHERE id = :id");
        $stmt->execute(['id' => $id]);
    } else if ($tagArticle) {
        $stmt = $pdo->prepare("SELECT * FROM articles WHERE tags LIKE ?");
        $stmt->execute(['%' . $tagArticle . '%']);
    } else if (isset($_GET['indexLimit']) && is_numeric($_GET['indexLimit'])) {
        $limit = intval($_GET['indexLimit']);
        $stmt = $pdo->prepare("SELECT id, title, picture FROM articles ORDER BY RAND() LIMIT :limit");
        $stmt->bindParam(':limit', $limit, PDO::PARAM_INT);
        $stmt->execute();
    } else {
        $stmt = $pdo->query("SELECT * FROM articles");
    }
    $articles = $stmt->fetchAll();
    echo json_encode($articles, JSON_PRETTY_PRINT); //mettre à l'extérieur d'un if/ else/ pour que ça encode n'importe quel condition
}


function handlePost()
{
    global $pdo;

    // S'assurer que les inputs sont envoyés
    $requiredFields = ['title', 'description', 'tags', 'top', 'user_name', 'date'];
    foreach ($requiredFields as $field) {
        if (empty($_POST[$field])) {
            http_response_code(400);
            echo json_encode(['message' => "Missing field: $field"]);
            return;
        }
    }

    // S'assurer que le fichier picture a été envoyé
    if (empty($_FILES['picture'])) {
        http_response_code(400);
        echo json_encode(['message' => 'Missing file']);
        return;
    }

    $fileNames = [];
    $fileKeys = ['picture'];
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

        $stmt = $pdo->prepare('INSERT INTO articles (user_name, description, title, picture, tags, top, date) VALUES (:user_name, :description, :title, :picture, :tags, :top, :date)');

        // Exécution de la requête avec les données fournies
        //htmlspecialchars pour les injonctions sql
        $result = $stmt->execute([
            ':user_name' => ($_POST['user_name']),
            ':title' => htmlspecialchars($_POST['title']),
            ':tags' => htmlspecialchars($_POST['tags']),
            ':description' => htmlspecialchars($_POST['description']),
            ':picture' => $fileNames['picture'],
            ':date' => ($_POST['date']),
            ':top' => htmlspecialchars($_POST['top']),
        ]);


        // Vérification du résultat
        if ($result) {
            http_response_code(201);
            echo json_encode(['message' => 'Article created']);
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
