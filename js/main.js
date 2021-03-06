(function() {
    "use strict";

    var packages = ['Gulp', 'Jasmine JS', 'Trello', 'Copy from Find Results', 'I18n Rails', 'Jest'];
    var promises = [];
    var total    = 0;
    var roundToK = function(number) {
        return Math.round(number / 1000) + 'k';
    };
    var addDownloads = function($el, amount) {
        $el.html('<strong>' + roundToK(amount) + '</strong> downloads');
        $el.fadeIn();
    }

    $.each(packages, function(index, packageName) {
        var packageUrl = 'https%3A%2F%2Fpackagecontrol.io%2Fpackages%2F' + encodeURIComponent(encodeURIComponent(packageName)) + '.json';
        var url =  "https://simple-cors.herokuapp.com/?url=" + packageUrl

        var promise = $.ajax({
            url: url,
            data: {
                format: 'json',
                jsonCompat: 'new',
            }
        }).done(function(data) {
            if (data) {
                var installs = data.installs
                var $downloadCounters = $("[data-package-name='" + packageName + "']");
                addDownloads($downloadCounters, installs.total);
                total += installs.total;
            }
        });

        promises.push(promise);
    });

    $.when.apply($, promises).done(function() {
        addDownloads($("[data-package-name='Total']"), total);
    });

    if (location.search.search('n=1') !== -1) {
        document.getElementById('js-website-message').className = ''
    }
})();
