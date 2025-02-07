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

    public function editUser(Request $request)
    {
        $user = auth()->user();

        if ($user->type !== 'superadmin') {
            if ($user->type == 'admin') {
                return redirect()->route('orders')->with('error', 'Unauthorized access to /editUser.');
            }
            if ($user->type == 'normal') {
                return redirect()->route('dashboard')->with('error', 'Unauthorized access to /editUser.');
            }
        }

        // Validate Request Data
        $validated = $request->validate([
            'id' => 'required|exists:users,id',
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:users,email,' . $request->id,
            'type' => 'sometimes|in:superadmin,admin,normal',
            'phone' => 'sometimes|nullable|string|unique:users,phone,' . $request->id,
            'linked' => 'sometimes|boolean',
        ]);

        $user = User::find($request->id);

        if (!$user) {
            return redirect()->route('users')->with('error', 'User not found.');
        }

        $user->update($validated);

        return redirect()->route('users')->with('success', 'User updated successfully.');
    }

    public function deleteUser($id)
    {
        $user = auth()->user();

        if ($user->type !== 'superadmin') {
            if ($user->type !== 'admin') {
                return redirect()->route('orders')->with('error', 'Unauthorized access to /deleteUser.');
            }
            if ($user->type !== 'normal') {
                return redirect()->route('dashboard')->with('error', 'Unauthorized access to /deleteUser.');
            }
        }

        $user = User::where('id', $id)->first();

        if ($user) {
            $user->delete();
            return response()->json(['message' => 'User deleted successfully']);
        }

        return response()->json(['error' => 'User not found'], 404);
    }
}
