<?php

use App\Http\Controllers\FileUploadController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\OrdersController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

Route::post('/api/upload', [FileUploadController::class, 'uploadFiles']);
Route::post('/api/create-order', [DashboardController::class, 'createNewOrder']);
Route::post('/api/updateOrderStatus', [OrdersController::class, 'updateOrderStatus']);
