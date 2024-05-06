<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('invoice_details', function (Blueprint $table) {
            $table->id('invoiceDetail_id');
            $table->unsignedBigInteger('invoice_id');  // Assuming 'id' in 'invoice' table is a BigInteger
            $table->unsignedBigInteger('product_id');  // Assuming 'id' in 'products' table is a BigInteger
            $table->decimal('rate', 10, 2);
            $table->string('unit');
            $table->integer('qty');
            $table->decimal('disc_percentage', 5, 2);
            $table->decimal('net_amount', 10, 2);
            $table->decimal('total_amount', 10, 2);
            $table->timestamps();
        
            // Now declare foreign keys
            $table->foreign('invoice_id')->references('id')->on('invoices');  // Ensure table name is correct, 'invoices' not 'invoice'
            $table->foreign('product_id')->references('id')->on('products');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoice_details');
    }
};
