<script>
    var dataJSON = "{
        "user_info": { 
            "user_id": "test111",
            "device_id": "android-11-123"
        }
    };

    function recordAndGet() {
        var urlParams = new URLSearchParams(window.location.search);
        var campaign_id = urlParams.get('id')
        
        $.ajax({
            type: 'POST',
            url: '/api/campaign/record_data?campaign=' + campaign_id,
            data: JSON.stringify(dataJSON),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (data, textStatus, xhr) {  
                Cookies.set('tracking-id', data);
            }
        })
    };

</script>
