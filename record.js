<script>
    var dataJSON = "{
        "user_info": { 
            "user_id": "test111",
            "device_id": "android-11-123"
        }
    };

    function recordAndGet() {
        $.ajax({
            type: 'POST',
            url: '/api/campaign/record_data?campaign=AW-300000000',
            data: JSON.stringify(dataJSON),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (data, textStatus, xhr) {  
                Cookies.set('tracking-id', data);
            }
        })
    };


</script>