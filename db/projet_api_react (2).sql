-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : db
-- Généré le : lun. 02 sep. 2024 à 14:58
-- Version du serveur : 8.0.37
-- Version de PHP : 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `projet_api_react`
--

-- --------------------------------------------------------

--
-- Structure de la table `recipes`
--

CREATE TABLE `recipes` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `ingredients` text NOT NULL,
  `summary` text NOT NULL,
  `description` text NOT NULL,
  `tags` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `picture 1` varchar(255) NOT NULL,
  `picture 2` varchar(255) NOT NULL,
  `picture 3` varchar(255) NOT NULL,
  `categories` varchar(255) NOT NULL,
  `difficulty` varchar(255) NOT NULL,
  `number_of_servings` int NOT NULL,
  `prep_time` int NOT NULL,
  `cooking-time` int NOT NULL,
  `top` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `role` varchar(255) DEFAULT 'user',
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `firstname`, `name`, `username`, `email`, `role`, `password`) VALUES
(5, 'John', 'Doe', 'johndoe', 'john@example.com', 'user', '$2y$10$sgK2qM0ARweFnQ8YuaSMxuotcnxVjXv2V9yM1lAg3JVQRpNnVdRES'),
(6, 'guiti', 'guiti', 'guiti', 'guiti@gmail.com', 'user', '$2y$10$AyO/KdzF6hyLSCbX8m9QiO21PIP0/ERewL8JhW3fvkFL6HOiBXUUG'),
(7, 'abeille', 'abeille', 'abeille', 'abeille@gmail.com', 'user', '$2y$10$mfRTPm53vzbr/Z0tAkhR.OXpSh6bVZA7hQcmzujDtAhaA1pn/9Fbu'),
(8, 'Cyril', 'Lignac', 'Lignac58', 'cyril.licnac@gmail.com', 'admin', '$2y$10$B1M3q2w5qBBzkQYQqGVa9evh638Z9z.pzdUJmyrh.sT0F.15aEdQ6');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
