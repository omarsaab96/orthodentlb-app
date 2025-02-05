<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\User;
use App\Models\File;
use Inertia\Inertia;

class OrdersController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        if ($user->type !== 'superadmin' && $user->type !== 'admin') {
            return redirect()->route('dashboard')->with('error', 'Unauthorized access to /orders.');
        }


        $orders = Order::where('linked','1')->orderBy('created_at', 'desc')->get();
        if ($user->type === 'superadmin') {
            $orders = Order::orderBy('created_at', 'desc')->get();
        }
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
        if ($user->type === 'superadmin') {
            $files = File::whereIn('id', $fileIds)->get();
        }
        // Attach files to their respective orders
        foreach ($orders as $order) {
            $attachments = json_decode($order->attachments, true);
            $findUserWithId = $order->created_by;

            if (is_array($attachments)) {
                $order->attachments = $files->whereIn('id', $attachments)->values();
            } elseif (is_object($attachments)) {
                $order->attachments = $files->whereIn('id', array_keys((array) $attachments))->values();
            }

            if ($findUserWithId) {
                $foundUser = User::where('id', $findUserWithId)->where('linked','1')->first();

                if ($foundUser) {
                    $order->created_by = $foundUser['name'];
                } else {
                    $order->created_by = null;
                }
            } else {
                $order->created_by = null;
            }
        }


        return Inertia::render('Orders', [
            'orders' => $orders,
        ]);
    }

    public function details($id)
    {

        $user = auth()->user();

        if ($user->type !== 'admin') {
            return redirect()->route('orders')->with('error', 'Unauthorized access to /orders/details.');
        }


        $order = Order::where('id', $id)->where('linked','1')->first();
        if (!$order) {
            return redirect()->route('orders')->with('error', 'Order not found.');
        }

        $fileIds = [];

        // Extract file IDs from orders' attachments
        $attachments = json_decode($order->attachments, true);
        if (is_array($attachments)) {
            $fileIds = array_merge($fileIds, $attachments);
        } elseif (is_object($attachments)) {
            $fileIds = array_merge($fileIds, array_keys((array) $attachments));
        }

        // Get files that have an ID like the IDs in the orders' attachments fields
        $files = File::whereIn('id', $fileIds)->where('linked','1')->get();

        // Attach files to their respective orders

        $attachments = json_decode($order->attachments, true);
        $findUserWithId = $order->created_by;

        if (is_array($attachments)) {
            $order->attachments = $files->whereIn('id', $attachments)->values();
        } elseif (is_object($attachments)) {
            $order->attachments = $files->whereIn('id', array_keys((array) $attachments))->values();
        }

        if ($findUserWithId) {
            $foundUser = User::where('id', $findUserWithId)->where('linked','1')->first();

            if ($foundUser) {
                $order->created_by = $foundUser['name'];
            } else {
                $order->created_by = null;
            }
        } else {
            $order->created_by = null;
        }

        $relatedOrders = Order::where('created_by', $findUserWithId)->where('id', '!=', $id)->where('linked','1')->orderBy('created_at', 'desc')->get();

        // logger($relatedOrders);

        return Inertia::render('Orders/details', [
            'order' => $order,
            'relatedOrders' => $relatedOrders,
        ]);
    }

    public function updateOrderStatus(Request $request)
    {
        logger($request);

        $user = auth()->user();

        if ($user->type !== 'admin') {
            return redirect()->route('orders')->with('error', 'Unauthorized access to /orders/details.');
        }

        // Find the order by its ID
        $order = Order::where('id', $request['id'])->where('linked','1')->first();

        if (!$order) {
            return response()->json([
                'status' => 'error',
                'message' => 'Order not found.'
            ], 404);
        }

        // Validate the request status
        $status = $request ['status'];
        $validStatuses = ['new', 'processing', 'shipped', 'done', 'canceled'];

        if (!in_array($status, $validStatuses)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid status.'
            ], 400);
        }

        // Update the order status
        $order->status = $status;
        $order->save();

        // Return a JSON success message
        return response()->json([
            'status' => 'success',
            'message' => 'Order status updated successfully.'
        ], 200);
    }

}
