<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Models\AnalyseModel;
use Inertia\Inertia;

class PhishingController extends Controller
{
    public function index()
    {
        return inertia::render('analyze');
    }

    public function sendToPython(Request $request)
    {
        $request->validate([
            'url' => 'required|url',
        ]);

        $response = Http::post('http://localhost:8001/analyze-url', [
            'url' => $request->url
        ]);

        if ($response->successful()) {
            $data = $response->json();

            $analysis = AnalyseModel::create([
                'url' => $data['url'],
                'status' => $data['status'],
                'malicious_count' => $data['malicious_count'],
                'suspicious_count' => $data['suspicious_count'],
            ]);

            return response()->json($analysis);
        }

        return response()->json(['error' => 'Failed to analyze URL'], 500);
    }

    public function history()
    {
        $history = AnalyseModel::latest()->get();
        return inertia::render('history', ['history' => $history]);
    }
}