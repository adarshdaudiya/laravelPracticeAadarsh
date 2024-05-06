$(function () {
    var pagesForm = $('#pages');
    
    $(".summerNote").summernote({
        toolbar: [
            ['style', ['bold', 'italic', 'underline', 'clear']],
            ['font', ['strikethrough', 'superscript', 'subscript']],
            ['fontsize', ['fontsize', 'customSize']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['height', ['height']]
        ],
        fontSizes: ['8', '9', '10', '11', '12', '14', '16', '18', '24', '36']
    });
    
    $(document).ready(function() {
        $(".data-submit").on("click", function() {
            var name = $("#name").val();
            var content = $("#content").val();
            $.ajax({
                type: 'POST',
                url: routePoliceUpdate(name),
                data: {
                    "_token": $('meta[name="csrf-token"]').attr('content'),
                    name: name,
                    content: content,
                },
                dataType: 'JSON',
                // complete: function () {
                //     hideButtonLoading($("#location_selection_button"));
                // },
                success: function (response) {
                    if (response.status == 1) {
                        showSuccessToast(response.message);
                        window.location.replace(pagesList);
                    }else{
                        showErrorToast(response.message);
                    }
                }, error: function (error) {
                    ajaxErrorCallback(error, 'Error occurred while location selection.');
                }
            });
        });
    });

    $('body').on('change', '#name', function () {
        getContent('#name')
    });

    function htmlDecode(str) {
        const element = document.createElement('div');
        element.innerHTML = str;
        return element.textContent || element.innerText;
      }

    function loadDescriptionForSelectedPolicy() {
        var selectedPageName = $("#name").val();
        if (selectedPageName) {
            getContent('#name');
        }
    }

    // Automatically load description on page load
    $(document).ready(function () {
        loadDescriptionForSelectedPolicy();
    });

    function getContent(content) {
        let id = $(content).val();
        $.ajax({
            type: 'get',
            url: routePageContent(id),
            dataType: 'JSON',
            success: function (response) {
                if (response.status) {
                    $('.summerNote').summernote('code', htmlDecode(response.data.content));
                } else {
                    ajaxErrorCallback('error', response.message);
                }
            },
            error: function (error) {
                ajaxErrorCallback(error, 'Error occurred while delete user.');
            }
        });
    }

});