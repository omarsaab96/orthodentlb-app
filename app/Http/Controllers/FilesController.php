<?php

namespace App\Http\Controllers;

use App\Models\File;
use Inertia\Inertia;
use Illuminate\Http\Request;

class FilesController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        if ($user->type !== 'superadmin') {
            return redirect()->route('dashboard')->with('error', 'Unauthorized access to /files.');
        }

        $files = File::all();

        return Inertia::render('Files', [
            'files' => $files,
        ]);
    }
}
