function getSignaturesForBug(bug_id) {
    var url = 'SignaturesForBug.json';
    $('#loading').show()
    $.getJSON(url, function(result) {
        hit = result.hits[0];
        if (bug_id == hit.id) {
            getTCBS(hit.signature, hit.id);
        } else {
            $('#resultsTable').hide()
            $('#no-results').show()
        }
        $('#loading').hide()
    })
    .fail(function() {
        console.log('FAIL');
    })
}

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
                $('#resultsTable tbody tr:first').after(
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
    $('#bug-form').submit(function(event) {
        event.preventDefault();
        $('#no-results').hide();
        $('#resultsTable tbody tr td').remove();
        var bug_id = $('#bug-input').val();
        getSignaturesForBug(bug_id);
    });
  
})(jQuery);
