<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Invoice;
use Illuminate\Http\Request;
use Carbon\Carbon;

class InvoiceController extends Controller
{

    public function storeInvoice(Request $request)
    {
        // Retrieve invoice master data from the request
        $cuurentDate = Carbon::now()->format('Y-m-d');
        $invoiceMasterData = $request->only(['customer_name', 'total_amount']);
        $invoiceMasterData['invoice_date'] = $cuurentDate;
        // Store invoice master data in the database
        $invoiceMaster = Invoice::create($invoiceMasterData);

        // Return the generated invoice ID
        return ['invoice_id' => $invoiceMaster->id,
            'rate' => $request->rate,
            'unit'  => $request->unit,
            'qty' => $request->qty,
            'disc_percentage' => $request->discPercentage,
            'net_amount' => $request->net_amount
        ];
    }
}
