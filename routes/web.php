<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\InvoiceDetailsController;
use App\Http\Controllers\InvoiceController;

// Route::get('/', function () {
//     return view('index');
// });
Route::get('/', [InvoiceDetailsController::class, 'index'])->name('index');
Route::post('/store-data', [InvoiceDetailsController::class, 'store'])->name('store');
Route::get('/get-product-details/{id}', [InvoiceDetailsController::class, 'getProductDetails']);
Route::post('/submit-data', [InvoiceDetailsController::class,'submitData'])->name('submit.data');
Route::post('/store-invoice', [InvoiceController::class, 'storeInvoice']);
Route::get('/all-product', [InvoiceDetailsController::class, 'allProducts']);
