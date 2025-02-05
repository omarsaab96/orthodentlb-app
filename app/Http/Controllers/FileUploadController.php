<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\File;
use App\Models\Order;

class FileUploadController extends Controller
{
    public function uploadFiles(Request $request)
    {
        logger($request);

        $request->validate([
            'orderId' => 'required',
            'uploadedFiles' => 'required',
            'uploadedFiles.*' => [
                'file',
                function ($attribute, $value, $fail) {
                    if (is_string($value)) {
                        $fail($attribute . ' is not a valid file.');
                        return;
                    }

                    $extension = $value->getClientOriginalExtension();

                    if ($extension !== 'stl' && $extension !== 'ply') {
                        $fail($attribute . ' must have an .stl or .ply extension.');
                    }
                }
            ],
        ]);

        $uploadedFiles = [];

        if ($request->hasFile('uploadedFiles')) {
            foreach ($request->file('uploadedFiles') as $file) {

                $authenticatedUserId = auth()->id();
                $dateNow = now()->timezone('UTC')->format('dmYHis');
                $originalFileName = $file->getClientOriginalName();

                $customFileName = "{$authenticatedUserId}_{$dateNow}_{$originalFileName}";

                $path = $file->storeAs('uploads', $customFileName, 'public');

                // Save file details to the database
                $fileRecord = File::create([
                    'name' => $customFileName,
                    'originalName' => $file->getClientOriginalName(),
                    'extension' => $file->getClientOriginalExtension(),
                    'size' => $file->getSize(),
                    'uploadedBy' => $authenticatedUserId,
                    'dateOfUpload' => $dateNow,
                    'file_path' => asset('storage/' . $path),
                ]);

                // Save the file path and ID for response
                $uploadedFiles[] = [
                    'id' => $fileRecord->id,
                    'original_name' => $file->getClientOriginalName(),
                    'file_path' => asset('storage/' . $path),
                    'file_extension' => $file->getClientOriginalExtension(),
                    'saved_name' => $customFileName
                ];

                sleep(1);
            }
        }

        $order = Order::where('id', $request->orderId)
            ->where('linked', '1')
            ->firstOrFail();
        $existingAttachments = json_decode($order->attachments, true) ?? [];
        $newAttachments = array_column($uploadedFiles, 'id');
        $allAttachments = array_merge($existingAttachments, $newAttachments);

        $order->update([
            'attachments' => json_encode($allAttachments)
        ]);

        return response()->json([
            'message' => 'Files uploaded successfully',
            'files' => $uploadedFiles,
        ], 201);
    }
}
