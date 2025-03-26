<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('entries', function (Blueprint $table) {
            $table->id();
            $table->datetime('date');
            $table->foreignId('category_id')->constrained()->onDelete('cascade');
            $table->integer('amount');
            $table->string('store')->nullable();
            $table->string('memo')->nullable();
            $table->boolean('claim_flag')->default(false);
            $table->integer('claim_amount')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('entries');
    }
};

