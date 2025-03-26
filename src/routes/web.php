<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\EntryController;

Route::get('/', [EntryController::class, 'index'])->name('home');


Route::get('/add-entry', [EntryController::class, 'create'])->name('entries.create');
Route::post('/entries', [EntryController::class, 'store'])->name('entries.store');

Route::get('/entries/{entry}/edit', [EntryController::class, 'edit'])->name('entries.edit');
Route::put('/entries/{entry}', [EntryController::class, 'update'])->name('entries.update');

use App\Http\Controllers\CategoryController;

Route::get('/add-category', [CategoryController::class, 'create'])->name('categories.create');
Route::post('/categories', [CategoryController::class, 'store'])->name('categories.store');

// カテゴリ一覧
Route::get('/categories', [CategoryController::class, 'index'])->name('categories.index');

// 編集画面（今回は同じ画面内で行うので個別ルートは不要）

// 更新・削除
Route::put('/categories/{category}', [CategoryController::class, 'update'])->name('categories.update');
Route::delete('/categories/{category}', [CategoryController::class, 'destroy'])->name('categories.destroy');


use App\Http\Controllers\AnalysisController;

Route::get('/analysis/month', [AnalysisController::class, 'month'])->name('analysis.month');

Route::get('/analysis/week', [AnalysisController::class, 'week'])->name('analysis.week');


// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
