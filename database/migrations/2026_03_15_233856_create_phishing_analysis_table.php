<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('phishing_analysis', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('url');
            $table->string('status');
            $table->integer('malicious_count');
            $table->integer('suspicious_count');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('phishing_analysis');
    }
};
