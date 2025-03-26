FROM php:8.2-fpm

# 必要な依存関係のインストール
RUN apt-get update && apt-get install -y \
    git \
    zip \
    unzip \
    curl \
    libzip-dev \
    libonig-dev \
    libxml2-dev \
    && docker-php-ext-install pdo_mysql mbstring zip exif pcntl bcmath opcache

# Composerインストール
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Node.js & npmのインストール（20系）
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs

# 作業ディレクトリの設定
WORKDIR /var/www

# ユーザーと権限の設定
RUN groupadd -g 1000 laravel \
    && useradd -u 1000 -ms /bin/bash -g laravel laravel

USER laravel

