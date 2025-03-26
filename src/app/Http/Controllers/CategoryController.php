<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Category;
use Illuminate\Support\Facades\Redirect;

class CategoryController extends Controller
{
    public function create()
    {
        return Inertia::render('AddCategory');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string'],
            'type' => ['required', 'integer'], // 0 or 1
            'color' => ['nullable', 'string'],
            'memo' => ['nullable', 'string'],
            'sort' => ['nullable', 'integer'],
        ]);

        Category::create($validated);

        return Redirect::route('home')->with('success', 'カテゴリを登録しました！');
    }

    public function index()
    {
        $categories = Category::orderBy('sort')->get();
        return Inertia::render('CategoryList', [
            'categories' => $categories,
        ]);
    }

    public function update(Request $request, Category $category)
    {
        $validated = $request->validate([
            'name' => ['required', 'string'],
            'type' => ['required', 'integer'],
            'color' => ['nullable', 'string'],
            'memo' => ['nullable', 'string'],
            'sort' => ['nullable', 'integer'],
        ]);

        $category->update($validated);
        return Redirect::route('categories.index')->with('success', 'カテゴリを更新しました！');
    }

    public function destroy(Category $category)
    {
        $category->delete();
        return Redirect::route('categories.index')->with('success', 'カテゴリを削除しました！');
    }

}

