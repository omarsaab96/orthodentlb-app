<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Order extends Model
{
    protected $fillable = [
        'name', 'description', 'created_at', 'created_by', 'status','attachments','linked'
    ];
}