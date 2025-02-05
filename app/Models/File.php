<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    protected $fillable = [
        'name', 'dateOfUpload', 'size', 'originalName', 'uploadedBy', 'extension', 'file_path','linked'
    ];
}
