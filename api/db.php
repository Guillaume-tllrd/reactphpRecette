<?php
// Configuration de la base de données
$host = 'db';  // Nom du service dans docker-compose.yml, qui sert d'hôte pour MySQL
$dbname = 'projet_api_react';  // Nom de la base de données
$user = 'test';  // Nom d'utilisateur MySQL
$pass = 'test';  // Mot de passe MySQL

// DSN (Data Source Name) pour PDO
$dsn = "mysql:host=$host;dbname=$dbname;charset=utf8mb4";

// Options de PDO pour gérer les erreurs et les exceptions
$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, // Configure PDO pour lancer des exceptions en cas d'erreurs.
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC, // Définit le mode de récupération par défaut à PDO::FETCH_ASSOC.
    PDO::ATTR_EMULATE_PREPARES   => false, // Utilise les vraies requêtes préparées pour améliorer la sécurité et la performance.
];

try {
    // Création de la connexion PDO
    $pdo = new PDO($dsn, $user, $pass, $options);
    // Pas de message "Connexion réussie" sinon il y aura un bug
} catch (\PDOException $e) {
    // Gestion des erreurs de connexion
    die("Échec de la connexion : " . $e->getMessage());
}