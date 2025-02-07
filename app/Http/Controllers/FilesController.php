<?php

namespace App\Http\Controllers;

use App\Models\File;
use App\Models\Order;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

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

    public function deleteFile(Request $request)
    {

        $user = auth()->user();
        if ($user->type !== 'superadmin') {
            if ($user->type == 'admin') {
                return redirect()->route('orders')->with('error', 'Unauthorized access to /deleteFile.');
            }
            if ($user->type == 'normal') {
                return redirect()->route('dashboard')->with('error', 'Unauthorized access to /deleteFile.');
            }
        }

        $file = File::find($request->id)->first();

        if ($file) {
            if (!empty($file->file_path)) {
                Storage::delete($file->file_path);
            }


            $order = Order::whereJsonContains('attachments', $file['id'])
                ->first();
            $fileIds = $order->attachments;
            $fileIdToRemove = $file['id'];

            $fileIds = array_filter(json_decode($fileIds), function ($id) use ($fileIdToRemove) {
                return $id !== $fileIdToRemove;
            });

            $fileIds = array_values($fileIds);

            if (count($fileIds) == 0) {
                $order->update([
                    'attachments' => null
                ]);
            } else {
                $order->update([
                    'attachments' => json_encode($fileIds)
                ]);
            }


            $file->delete();

            return redirect()->route('files')->with('success', 'File deleted successfully.');
        } else {
            return redirect()->route('files')->with('error', 'File not found.');
        }


        // return redirect()->route('files')->with('success', 'User updated successfully.');
    }
}
