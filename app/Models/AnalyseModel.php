<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AnalyseModel extends Model
{
    use HasFactory;
    protected $table = 'phishing_analysis';
    protected $fillable = [
        'url',
        'status',
        'malicious_count',
        'suspicious_count'
    ];
}
