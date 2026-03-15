<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class PhishingController extends Controller
{
    public function sendToPython(Request $request)
    {
        $urlToCheck = $request->input('url');
        $response = Http::post('http://127.0.0.1:8000/analyze-url', [
            'url' => $urlToCheck,
        ]);

        return response()->json($response->json());
    }
}