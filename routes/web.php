<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\OrdersController;
use App\Http\Controllers\FilesController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
})->name('home');

Route::get('/dashboard', function(){
    $user = Auth::user();

    if ($user->type === 'superadmin'|| $user->type === 'admin') {
        return redirect()->route('orders');
    } else{
        return app(DashboardController::class)->indexNormalUser();
    }
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/users', [UsersController::class, 'index'])->name('users');
    Route::put('/edituser', [UsersController::class, 'editUser'])->name('editUser');
    Route::get('/orders', [OrdersController::class, 'index'])->name('orders');
    Route::get('/ordersbyUser', [OrdersController::class, 'indexByUser'])->name('ordersByUser');
    Route::get('/orders/details/{id}', [OrdersController::class, 'details'])->name('orders.details');
    Route::put('/editOrder', [OrdersController::class, 'updateOrder_isLinked'])->name('editOrder');
    Route::get('/files', [FilesController::class, 'index'])->name('files');
    Route::put('/editFile', [FilesController::class, 'updateFile_isLinked'])->name('editFile');

});

require __DIR__ . '/auth.php';
require __DIR__ . '/api.php';