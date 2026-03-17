<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PhishingController;

Route::get('/', [PhishingController::class, 'index']);
Route::get('/history', [PhishingController::class, 'history']);
Route::post('/analyze', [PhishingController::class, 'sendToPython']);