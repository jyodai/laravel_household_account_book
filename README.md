# laravel_household_account_book

## アセットビルドとサーバ起動

Docker環境内でアセットのビルドを実行します。

```bash
docker compose exec app npm run dev
```

別ターミナルでLaravelサーバーを起動します。

```bash
docker compose exec app php artisan serve --host=0.0.0.0
```

## 動作確認

http://localhost:8000
