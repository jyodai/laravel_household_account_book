<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'type',
        'color',
        'memo',
        'sort',
    ];

    public function entries()
    {
        return $this->hasMany(Entry::class);
    }
}

