
<!DOCTYPE html>

<html class="loading {{ config('custom.selected_theme.layoutTheme') }}" data-textdirection="ltr" @if (config('custom.selected_theme.theme')==='dark' ) data-layout="dark-layout" @endif>

    <head>
    <meta name="csrf-token" content="{{ csrf_token() }}">
        <script src="{{ asset(mix('vendors/js/jquery.min.js')) }}"></script>
        <script src="{{ asset(mix('vendors/js/validation/jquery.validate.min.js')) }}"></script>
        <script src="{{ asset(mix('vendors/js/datatable/bootstrap.min.js')) }}"></script>
        <link rel="stylesheet" href="{{ asset(mix('vendors/css/bootstrap-grid.css')) }}" />
    </head>
    <!-- <div class="container"> -->
        <form class="content-form" id="customer-form" action="javascript:;" method="post">
        @csrf
            <div class="col-md-12">
                <label>Customer </label>
                <input type="customer_name" name="customer_name" id="customer_name" placeholder="Enter Customer Name" required>
            </div>
            <div class="col-md-12">
                <label>Name Product</label>
                <select class="" id="product" name="product_id" required>
                <option value="">Select value</option>
                    @foreach ($products as $product)
                        <option value="{{ $product->id }}">{{ $product->product_name }}</option>
                    @endforeach
                </select>
            </div>
            <div class="col-md-12">
                <label>Rate</label>
                <input type="text" name="rate" id="rate" placeholder="Enter rate" disabled>
            </div>
            <div class="col-md-12">
                <label>Unit </label>
                <input type="input" name="unit" id="unit" placeholder="Enter unit" disabled>
            </div>
            <div class="col-md-12">
                <label>Qty </label>
                <input type="input" name="qty" id="qty" placeholder="Enter Qty" disabled>
            </div>
            <div class="col-md-12">
                <label>Discount(%) </label>
                <input type="intput" name="disc_percentage" id="disc_percentage" placeholder="Enter Discount" disabled>
            </div>
            <div class="col-md-12">
                <label>Net Amount </label>
                <input type="input" name="net_amount" id="net_amount" disabled>
            </div>
            <div class="col-md-12">
                <label> Total Amount </label>
                <input type="input" name="total_amout" id="total_amout" disabled>
            </div>
            <div class="col-md-12">
                <button name="add" class="btn" id="add" disabled>Add</button>
            </div>
            <div id="contact_message"></div>
        </form>
        <!-- <div class="col-md-12">
                <button id="clearStore">clear locat store</button>
        </div> -->
    <!-- </div> -->

    <!-- modale -->
    <div class="modal fade" id="tableModal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <b>
                        <h3 class="modal-title" id="myModalCenterTitle">Product Details</h3>
                    </b>
                </div>
                <form action="javascript:;" method="POST" class="form-validate" id="addContactForm">
                    @csrf
                <table class="table">
                    <thead>
                    <tr>
                        <th>Product</th>
                        <th>Rate</th>
                        <th>Unit</th>
                        <th>Qty</th>
                        <th>Disc %</th>
                        <th>Net Amt</th>
                        <th>Total Amt</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody id="invoiceBody">

                    </tbody>
                </table>
                <div class="modal-footer">
                    <div class="float-end">
                        <button id="submit" class="btn btn-primary">Submit</button>
                    </div>
                </div>
                </form>
            </div>
        </div>
    </div>

    <footer>
        <script src="{{ asset(mix('js/index.js')) }}"></script>
    </footer>

</html>