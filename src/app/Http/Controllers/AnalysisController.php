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
        $startDate = $request->query('startDate')
            ? Carbon::parse($request->query('startDate'))->startOfDay()
            : Carbon::now()->startOfMonth();

        $endDate = $request->query('endDate')
            ? Carbon::parse($request->query('endDate'))->endOfDay()
            : Carbon::now()->endOfMonth();

        $entries = Entry::with('category')
            ->whereBetween('date', [$startDate, $endDate])
            ->orderBy('date', 'asc')
            ->get();

        $expenseEntries = $entries->filter(fn($e) => $e->category && $e->category->type === 0)->values();
        $incomeEntries = $entries->filter(fn($e) => $e->category && $e->category->type === 1)->values();

        return Inertia::render('MonthAnalysis', [
            'startDate' => $startDate->toDateString(),
            'endDate' => $endDate->toDateString(),
            'expenseEntries' => $expenseEntries,
            'incomeEntries' => $incomeEntries,
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

        $expenseEntries = $entries->filter(fn($e) => $e->category && $e->category->type === 0)->values();
        $incomeEntries = $entries->filter(fn($e) => $e->category && $e->category->type === 1)->values();

        return Inertia::render('WeekAnalysis', [
            'startDate' => $startDate->toDateString(),
            'endDate' => $endDate->toDateString(),
            'expenseEntries' => $expenseEntries,
            'incomeEntries' => $incomeEntries,
        ]);
    }
}

