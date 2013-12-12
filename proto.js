function getTCBS(signature, bug_id) {
    //var url = 'https://crash-stats.allizom.org/';
    //url += 'api/TCBS/?product=Firefox&version=28.0a1&limit=300';
    var url = 'TCBS.json';
    $('#resultsTable').hide()
    $('#loading').show()
    $.getJSON(url, function(result) {
        $.each(result.crashes, function(index, crash) {
            console.log(crash.signature, signature);
            if (crash.signature == signature) {
                $('#resultsTable tr:first').after(
                    '<tr><td>' +
                    '<a href="http://bugzil.la/' + bug_id + '">' + bug_id +
                    '</a></td>' +
                    '<td><a href="https://crash-stats.mozilla.com/report/list/' +
                    crash.signature + '">' + crash.signature + '</a></td>' +
                    '<td>' + crash.currentRank + '</td></tr>'
                );
            }
        });
        $('#loading').hide()
        $('#resultsTable').show()
    })
    .fail(function() {
        $('#loading').hide()
        console.log('FAIL');
    })
}

(function($) {
    var url = 'SignaturesForBug.json';
    $.getJSON(url, function(result) {
        hit = result.hits[0];
        getTCBS(hit.signature, hit.id);
    })
    .fail(function() {
        console.log('FAIL');
    })
})(jQuery);
