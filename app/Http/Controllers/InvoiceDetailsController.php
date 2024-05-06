<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\InvoiceDetails;
use App\Models\Invoice;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Carbon\Carbon;

class InvoiceDetailsController extends Controller
{
    public function index()
    {
        $products = Product::get();
        return view('index', compact('products'));
    }

    public function store(Request $request)
    {
        // Retrieve existing data from session or initialize an empty array
        $sessionData = Session::put('customer_data', [$request]);

        return response()->json(['success' => true]);
    }

    public function getProductDetails($id)
    {
        $product = Product::find($id);
            return response()->json([
            'rate' => $product->rate,
            'unit' => $product->unit
        ]);
    }

    public function submitData(Request $request)
    {
        $invoiceIds = [];
        foreach ($request['tableData'] as $invoiceDetailData) {
            # code...
            $cuurentDate = Carbon::now()->format('Y-m-d');
            $invoiceMasterData['customer_name'] = $invoiceDetailData['customer_name'];
            $invoiceMasterData['total_amount'] = $invoiceDetailData['total_amount'];
            $invoiceMasterData['invoice_date'] = $cuurentDate;
            $invoiceMaster = Invoice::create($invoiceMasterData);
            $invoiceId = $invoiceMaster->id;
            $invoiceIds[] = $invoiceMaster->id;

            if ($invoiceId) {
                $invoiceDetailData1['rate'] = $invoiceDetailData['rate'];
                $invoiceDetailData1['qty'] = $invoiceDetailData['qty'];
                $invoiceDetailData1['net_amount'] = $invoiceDetailData['net_amount'];
                $invoiceDetailData1['total_amount'] = $invoiceDetailData['total_amount'];
                $invoiceDetailData1['unit'] = $invoiceDetailData['unit'];
                $invoiceDetailData1['disc_percentage'] = $invoiceDetailData['disc_percentage'];
                $invoiceDetailData1['invoice_id'] = $invoiceId; // Assign invoice ID
                InvoiceDetails::create($invoiceDetailData1);
            }
        }
    
        // Optionally, return a response indicating success or failure
        return response()->json(['message' => 'Invoice detail stored successfully', 'data' => $invoiceIds]);
    }

    public function allProducts()
    {
        $products = Product::get();

        return $products;
    }

}
