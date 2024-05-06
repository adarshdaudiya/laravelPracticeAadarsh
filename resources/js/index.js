"use strict";
var productList = [];

$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

$(document).on('ready', function() { 

    // $('#tableModal').modal('show');
    // loadTableData();

    $(document).on('change', '#product', function() {
        // var selectedOption = $(this).val();
        var productId = $(this).val();
        // alert("You selected: " + productId);
        if (productId) {
            $.ajax({
                url: '/get-product-details/' + productId,
                type: 'GET',
                dataType: 'json',
                success: function(data) {
                    $('#rate').val(data.rate);
                    $('#unit').val(data.unit);
                    $('#disc_percentage, #qty, #add').prop('disabled', false);
                },
                error: function() {
                    alert('Error retrieving product details.');
                }
            });
        } else {
            $('#rate').val('-');
            $('#unit').val('-');
        }
    });

    $('#qty, #disc_percentage').on('input', function() {
        calculateNetAmountForm();
        calculateTotalAmountForm();
    });

    function calculateNetAmountForm() {
        var rate = parseFloat($('#rate').val()) || 0;
        var discPercentage = parseFloat($('#disc_percentage').val()) || 0;
        var netAmount = rate - (rate * (discPercentage / 100));
        $('#net_amount').val(netAmount.toFixed(2));
    }

    function calculateTotalAmountForm() {
        var qty = parseInt($('#qty').val()) || 0;
        var netAmount = parseFloat($('#net_amount').val()) || 0;
        var totalAmount = qty * netAmount;
        $('#total_amout').val(totalAmount.toFixed(2));
    }


    // Load data from local storage when the page loads
    // loadTableData();
    if ($('#customer').val() !== '') {
    $('#add').on('click', function() {

        $('#tableModal').modal('show');
        var customer_name = $('#customer_name').val();
        // var productName = $('#product option:selected').text();
        var rate = $('#rate').val();
        var qty = $('#qty').val();
        var unit = $("#unit").val();
        var disc_percentage = $('#disc_percentage').val();
        var net_amount = $('#net_amount').val();
        var total_amount = $('#total_amout').val();
        var product_id = $('#product').val();
        var rowData = {
            customer_name: customer_name,
            // productName: productName,
            rate: rate,
            qty: qty,
            unit:unit,
            disc_percentage: disc_percentage,
            net_amount: net_amount,
            total_amount: total_amount,
            product_id: product_id,
        };

        // Get existing table data from local storage
        var tableData = JSON.parse(localStorage.getItem('tableData')) || [];

        // Add new row data to the table data
        tableData.push(rowData);

        // Save updated table data to local storage
        localStorage.setItem('tableData', JSON.stringify(tableData));

        // Reload the table with updated data
        loadTableData();
    });
    }

    
    // $(document).on('click', '#clearStore', function() {
    //     localStorage.setItem('tableData', JSON.stringify([])); // Update local storage 
    // });

     // Handle "Delete" link click event
     $(document).on('click', '.delete-row', function() {
        var tableData = JSON.parse(localStorage.getItem('tableData')) || [];
        var index = $(this).closest('tr').index(); // Get the index of the row
        tableData.splice(index, 1); // Remove the corresponding data from tableData array
        localStorage.setItem('tableData', JSON.stringify(tableData)); // Update local storage

        $(this).closest('tr').remove(); // Remove the closest table row
    });

    function loadTableData() {
        // var productList = [];
        $.ajax({
                url: "/all-product",
                method: 'GET',
                success: function(response) {
                    // Handle success response
                    productList = response;
                    console.log('4545',productList);
                    setTable(productList);
                },
                error: function(xhr, status, error) {
                    // Handle error response
                    console.error(xhr.responseText);
                }
            });

    }

    function setTable(productList) {
        var tableData = JSON.parse(localStorage.getItem('tableData')) || [];
        var tableBody = $('#invoiceBody');
        tableBody.empty();
        tableData.forEach(function(rowData) {

            var row = '<tr>' +
            '<td><select class="product-select" name="product_id" required>';

            productList.forEach(function(option) {
                row += '<option value="' + option.id + '"' + (rowData.product_id == option.id ? ' selected' : '') + '>' + option.product_name + '</option>';
            });
            
            row += '</select></td>' +
                '<td>' + rowData.rate + '</td>' +
                '<td>' + rowData.unit + '</td>' +
                '<td><input type="input" name="qty" id="qty" value=' + rowData.qty + ' placeholder="Enter Qty"></td>' +
                '<td><input type="input" name="disc_percentage" id="disc_percentage" value=' + rowData.disc_percentage + ' placeholder="Enter disc_percentage"></td>' +
                '<td>' + rowData.net_amount + '</td>' +
                '<td>' + rowData.total_amount + '</td>' +
                '<td><a href="#" class="delete-row">Delete</a></td>' +
                '</tr>';

            tableBody.append(row);
        });
    }

    // Attach event listeners to product selection dropdowns
    $('#invoiceBody').on('change', '.product-select', function() {
        var selectedProductId = $(this).val();
        var rowDataIndex = $(this).closest('tr').index();
        var tableData = JSON.parse(localStorage.getItem('tableData')) || [];
        var updatedRowData = tableData[rowDataIndex];
    
        // Access global productList
        var selectedProduct = productList.find(product => product.id == selectedProductId);
        if (selectedProduct) {
            updatedRowData.rate = selectedProduct.rate;
            updatedRowData.unit = selectedProduct.unit;
            updatedRowData.disc_percentage = '';
            updatedRowData.qty = '';
            updatedRowData.product_id = selectedProductId;
    
            // Clear quantity and discount percentage
            var tr = $(this).closest('tr');
            tr.find('input[name="qty"]').val('');
            tr.find('input[name="disc_percentage"]').val('');
    
            // Update UI for rate and unit
            tr.find('td:eq(1)').text(selectedProduct.rate);
            tr.find('td:eq(2)').text(selectedProduct.unit);
    
            // Reset net amount and total amount as dependent fields might be invalid now
            tr.find('td:eq(5)').text(''); // Assuming net amount is in the 6th column
            tr.find('td:eq(6)').text(''); // Assuming total amount is in the 7th column

            // Recalculate and update net amount and total amount
            var netAmount = calculateNetAmount(tr);
            console.log('netAmount........', netAmount);
            // console.log('qty.... ....', qty);
            updatedRowData.net_amount = netAmount;
            var totalAmount = calculateTotalAmount(tr, netAmount);
            updatedRowData.total_amount = totalAmount;
            console.log('totalAmount........', totalAmount);
    
            localStorage.setItem('tableData', JSON.stringify(tableData));
        } else {
            console.log('Product not found in productList:', selectedProductId);
        }
    });

    function calculateNetAmount(row) {
        var rate = parseFloat(row.find('td:eq(1)').text()) || 0; // Assuming rate is displayed in the second cell
        var discPercentage = parseFloat(row.find('input[name="disc_percentage"]').val()) || 0;
        var netAmount = rate - (rate * (discPercentage / 100));
        row.find('td:eq(5)').text(netAmount.toFixed(2)); // Update the net amount cell
        return netAmount;
    }
    
    function calculateTotalAmount(row, netAmount) {
        var qty = parseInt(row.find('input[name="qty"]').val()) || 0;
        var totalAmount = qty * netAmount;
        row.find('td:eq(6)').text(totalAmount.toFixed(2)); // Update the total amount cell
        return totalAmount;
    }

    $('#invoiceBody').on('input', 'input[name="qty"], input[name="disc_percentage"]', function() {
        var fieldName = $(this).attr('name');
        var row = $(this).closest('tr'); // Get the closest row for the input field
        console.log('row...........', $(this).val())
        var netAmount = calculateNetAmount(row); // Recalculate and update net amount
        var totalAmount = calculateTotalAmount(row, netAmount); // Recalculate and update total amount
        // var qty = qty; 
        var rowDataIndex = $(this).closest('tr').index();
        var tableData = JSON.parse(localStorage.getItem('tableData')) || [];
        var updatedRowData = tableData[rowDataIndex];
        if (fieldName === 'qty') {
            updatedRowData.qty = $(this).val(); // Update qty if entered from qty field
        } else if (fieldName === 'disc_percentage') {
            updatedRowData.disc_percentage = $(this).val(); // Update disc_percentage if entered from disc_percentage field
        }
        updatedRowData.net_amount = netAmount;    
        // updatedRowData.qty = qty;
        // console.log('qty........', qty);
        updatedRowData.total_amount = totalAmount;
        console.log('totalAmount........', totalAmount);
    
        localStorage.setItem('tableData', JSON.stringify(tableData));
    });
    

    $('#submit').on('click', function() {
        var tableData = JSON.parse(localStorage.getItem('tableData'))

        $.ajax({
            url: "/submit-data",
            method: 'POST',
            data: {tableData: tableData}, // Replace with actual data
            success: function(response) {
                // Handle success response
                localStorage.setItem('tableData', JSON.stringify([]));
                $('#tableModal').modal('hide');

            },
            error: function(xhr, status, error) {
                // Handle error response
                console.error(xhr.responseText);
            }
        });
    });
    
});