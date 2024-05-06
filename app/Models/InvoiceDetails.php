<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InvoiceDetails extends Model
{
    use HasFactory;

    protected $fillable = [
        'invoiceDetail_id',
        'invoice_id',
        'product_id',
        'rate',
        'unit',
        'qty',
        'disc_percentage',
        'net_amount',
        'total_amount',
    ];
}
