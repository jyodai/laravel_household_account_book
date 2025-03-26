<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Entry;
use App\Models\Category;
use Carbon\Carbon;

class AnalysisController extends Controller
{
    public function month(Request $request)
    {
        // パラメータ受け取り or デフォルト今月
        $startDate = $request->query('startDate')
            ? Carbon::parse($request->query('startDate'))->startOfDay()
            : Carbon::now()->startOfMonth();

        $endDate = $request->query('endDate')
            ? Carbon::parse($request->query('endDate'))->endOfDay()
            : Carbon::now()->endOfMonth();

        // エントリ取得（カテゴリJOIN含む）
        $entries = Entry::with('category')
            ->whereBetween('date', [$startDate, $endDate])
            ->orderBy('date', 'asc')
            ->get();

        // カテゴリ別に金額合計
        $summary = $entries->groupBy('category_id')->map(function ($items, $key) {
            return [
                'category_name' => $items->first()->category->name ?? '不明',
                'total' => $items->sum('amount'),
            ];
        })->values();

        return Inertia::render('MonthAnalysis', [
            'startDate' => $startDate->toDateString(),
            'endDate' => $endDate->toDateString(),
            'summary' => $summary,
            'entries' => $entries,
        ]);
    }

    public function week(Request $request)
    {
        $startDate = $request->query('startDate')
            ? Carbon::parse($request->query('startDate'))->startOfDay()
            : Carbon::now()->startOfWeek();

        $endDate = $request->query('endDate')
            ? Carbon::parse($request->query('endDate'))->endOfDay()
            : Carbon::now()->endOfWeek();

        $entries = Entry::with('category')
            ->whereBetween('date', [$startDate, $endDate])
            ->orderBy('date', 'asc')
            ->get();

        $summary = $entries->groupBy('category_id')->map(function ($items) {
            return [
                'category_name' => $items->first()->category->name ?? '不明',
                'total' => $items->sum('amount'),
            ];
        })->values();

        return Inertia::render('WeekAnalysis', [
            'startDate' => $startDate->toDateString(),
            'endDate' => $endDate->toDateString(),
            'summary' => $summary,
            'entries' => $entries,
        ]);
    }

}

