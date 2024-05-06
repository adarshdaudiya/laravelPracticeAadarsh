<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = [
            [
                'product_name' => 'coverLaptop cover',
                'rate' => 10,
                'unit' => 1
            ],
            [
                'product_name' => 'Screen guard',
                'rate' => 20,
                'unit' => 1
            ],
            [
                'product_name' => 'charger',
                'rate' => 30,
                'unit' => 1
            ],
            [
                'product_name' => 'mouse',
                'rate' => 40,
                'unit' => 1
            ],

        ];

        foreach ($products as $key => $product) {
            Product::create($product);
        }
    }
}
