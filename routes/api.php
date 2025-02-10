<?php

use App\Http\Controllers\FileUploadController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\OrdersController;
use App\Http\Controllers\FilesController;
use App\Http\Controllers\UsersController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

Route::post('/api/upload', [FileUploadController::class, 'uploadFiles']);
Route::post('/api/create-order', [DashboardController::class, 'createNewOrder']);
Route::post('/api/updateOrderStatus', [OrdersController::class, 'updateOrderStatus']);
Route::delete('/api/deleteUser/{id}', [UsersController::class, 'deleteUser']);
Route::delete('/api/deleteOrder/{id}', [OrdersController::class, 'deleteOrder']);
Route::delete('/api/deletefile', [FilesController::class, 'deletefile'])->name('deletefile');

