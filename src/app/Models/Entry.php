<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Entry extends Model
{
    use HasFactory;

    protected $fillable = [
        'date',
        'category_id',
        'amount',
        'store',
        'memo',
        'claim_flag',
        'claim_amount',
    ];

    protected $casts = [
        'date' => 'datetime',
        'claim_flag' => 'boolean',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}

