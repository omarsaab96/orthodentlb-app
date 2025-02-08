<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\File;
use App\Models\User;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Support\Facades\Session;
use Illuminate\Http\Request;


class DashboardController extends Controller
{
    public function indexNormalUser()
    {
        $userId = auth()->id();
        $orders = Order::where('created_by', $userId)->where('linked','1')->orderBy('created_at', 'desc')->get();
        $fileIds = [];

        // Extract file IDs from orders' attachments
        foreach ($orders as $order) {
            $attachments = json_decode($order->attachments, true);
            if (is_array($attachments)) {
                $fileIds = array_merge($fileIds, $attachments);
            } elseif (is_object($attachments)) {
                $fileIds = array_merge($fileIds, array_keys((array) $attachments));
            }
        }

        // Get files that have an ID like the IDs in the orders' attachments fields
        $files = File::whereIn('id', $fileIds)->where('linked','1')->get();

        // Attach files to their respective orders
        foreach ($orders as $order) {
            $attachments = json_decode($order->attachments, true);
            if (is_array($attachments)) {
                $order->attachments = $files->whereIn('id', $attachments)->values();
            } elseif (is_object($attachments)) {
                $order->attachments = $files->whereIn('id', array_keys((array) $attachments))->values();
            }
        }

        return Inertia::render('Dashboard', [
            'orders' => $orders,
            'files' => $files,
        ]);
    }

    public function createNewOrder(Request $request)
    {
        $orders = Order::where('linked','1')->orderBy('created_at', 'desc')->get();

        $createdOrder = Order::create([
            'name' => $request['orderName'],
            'description' => $request['orderDescription'],
            'status' => 'new',
            'created_by' => auth()->id()
        ]);

        return response()->json([
            'createdOrder' => $createdOrder,
        ], 201);
    }
}