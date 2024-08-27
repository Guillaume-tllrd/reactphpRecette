# Utiliser l'image PHP officielle avec Apache
FROM php:8.3-apache

# Installer les extensions nécessaires pour la connexion à MySQL
RUN docker-php-ext-install pdo pdo_mysql

# Copier le contenu du dossier 'api' dans le répertoire web d'Apache
COPY ./api /var/www/html/

# Configurer les droits sur les fichiers pour Apache
RUN chown -R www-data:www-data /var/www/html
