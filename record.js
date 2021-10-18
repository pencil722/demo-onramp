<script>
    // record the client info, for example : user_device_id, browser version
    function getClientInfo() {
        var clientInfo={
            "browserName" : navigator.appName,
            "browserVersion1a": navigator.appVersion,
            "browserVersion1b": navigator.userAgent,
            "deviceId" : "device_123456"
        };
        return clientInfo;
    }

    // get other info: history or something
    function getOtherInfo() {
        var otherInfo={
            "previousSite" : history.length,
            "referrer" : document.referrer
        };
        return otherInfo;
    }

    // send request to server and get response tracking-id , and set it in cookie
    function recordAndGet(dataJSON) {
        $.ajax({
            type: 'POST',
            url: '/api/campaign/record_data.php',
            data: JSON.stringify(dataJSON),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (data, textStatus, xhr) {
                Cookies.set('tracking-id', data);
            }
        })
    }

    var clientInfo = getClientInfo();
    var otherInfo = getOtherInfo();
    var urlParams = new URLSearchParams(window.location.search);
    var campaignId = urlParams.get('id');
    var trackingId = urlParams.get('track_id');

    var dataJSON = {
        "client_info" : clientInfo,
        "other_info" : otherInfo,
        "campaign_id" : campaignId,
        "tracking_id" : trackingId
    }

    recordAndGet(dataJSON);

</script>
