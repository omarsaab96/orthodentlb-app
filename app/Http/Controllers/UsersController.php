<?php

namespace App\Http\Controllers;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;

class UsersController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        if ($user->type !== 'superadmin') {
            return redirect()->route('dashboard')->with('error', 'Unauthorized access to /users.');
        }

        $users = User::all();

        return Inertia::render('Users', [
            'users' => $users
        ]);
    }
}
