<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Category;
use App\Models\Entry;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Redirect;

class EntryController extends Controller
{
    public function index()
    {
        $categories = Category::all();
        $entries = Entry::with('category')->orderBy('date', 'desc')->limit(150)->get();

        return Inertia::render('Home', [
            'categories' => $categories,
            'entries' => $entries,
        ]);
    }

    public function create()
    {
        $categories = Category::all();
        return Inertia::render('AddEntry', [
            'categories' => $categories,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'date' => ['required', 'date'],
            'category_id' => ['required', 'exists:categories,id'],
            'amount' => ['required', 'integer'],
            'store' => ['nullable', 'string'],
            'memo' => ['nullable', 'string'],
            'claim_flag' => ['boolean'],
            'claim_amount' => ['nullable', 'integer'],
        ]);

        Entry::create($validated);

        return Redirect::route('home')->with('success', '登録しました！');
    }

    public function edit(Entry $entry)
    {
        $entry->load('category'); // category.name など使えるように
        $categories = Category::all();

        return Inertia::render('AddEntry', [
            'entry' => $entry,
            'categories' => $categories,
        ]);
    }

    public function update(Request $request, Entry $entry)
    {
        $validated = $request->validate([
            'date' => ['required', 'date'],
            'category_id' => ['required', 'exists:categories,id'],
            'amount' => ['required', 'integer'],
            'store' => ['nullable', 'string'],
            'memo' => ['nullable', 'string'],
            'claim_flag' => ['boolean'],
            'claim_amount' => ['nullable', 'integer'],
        ]);

        $entry->update($validated);

        return Redirect::route('home')->with('success', 'エントリを更新しました！');
    }
}

