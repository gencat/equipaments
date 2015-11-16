var app = angular.module('equipaments', ['ui.bootstrap'] , function($locationProvider){
      $locationProvider.html5Mode(true);
}); 

/* Servei de dades */
app.factory('dadesFactory', function (Base64, $http) { 
    var apiurl = "http://demos.canigo.ctti.gencat.cat/demo-equipaments/AppJava/equipaments/"; 
	//var encoded = Base64.encode("canigo" + ':' + "canigo2015");
	//$http.defaults.headers.common.Authorization = 'Basic ' + encoded;
    delete $http.defaults.headers.common['X-Requested-With'];
    return { 
        getAll: function (query, page, itemsperpage) {
            page = isNaN(page) ? 1 : page;
            query = query ? "&filter=" + query : "";
			 return $http.get(apiurl + "?rpp="+itemsperpage+"&page="+page + query/*, {withCredentials:true}*/); 
        }, 
        add: function (equipament) { 
            return $http.post(apiurl, JSON.stringify(equipament)/*, {withCredentials:true}*/); 
        }, 
        del: function (equipament){ 
            return $http['delete'](apiurl + equipament.id/*, {withCredentials:true}*/); 
        }, 
        update: function (equipament){ 
            return $http.put(apiurl + equipament.id, equipament/*, {withCredentials:true}*/); 
        } 
    }; 
}); 
  
/* Servei de notificacions entre controladors */
app.factory('notificationsService', function($rootScope) {
    var messenger = {};
    messenger.message = '';
    messenger.type = '';

    messenger.sendMessage = function(msg,type) {
        this.message = msg;
        this.type = type;
        this.broadcastItem();
    };
    messenger.closeMessage = function() {
        this.message = "";
        this.type = "";
        this.broadcastItem("closeMessage");
    };
    messenger.broadcastItem = function() {
        $rootScope.$broadcast('showMessage');
    };

    messenger.openModal = function(msg) {
        $rootScope.$broadcast('openModal');
    };

    messenger.closeModal = function(msg) {
        $rootScope.$broadcast('closeModal');
    };

    return messenger;
});

app.factory('Base64', function() {
    var keyStr = 'ABCDEFGHIJKLMNOP' +
        'QRSTUVWXYZabcdef' +
        'ghijklmnopqrstuv' +
        'wxyz0123456789+/' +
        '=';
    return {
        encode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;
 
            do {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
 
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
 
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }
 
                output = output +
                    keyStr.charAt(enc1) +
                    keyStr.charAt(enc2) +
                    keyStr.charAt(enc3) +
                    keyStr.charAt(enc4);
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
            } while (i < input.length);
 
            return output;
        },
 
        decode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;
 
            // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
            var base64test = /[^A-Za-z0-9\+\/\=]/g;
            if (base64test.exec(input)) {
                alert("There were invalid base64 characters in the input text.\n" +
                    "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                    "Expect errors in decoding.");
            }
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
 
            do {
                enc1 = keyStr.indexOf(input.charAt(i++));
                enc2 = keyStr.indexOf(input.charAt(i++));
                enc3 = keyStr.indexOf(input.charAt(i++));
                enc4 = keyStr.indexOf(input.charAt(i++));
 
                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;
 
                output = output + String.fromCharCode(chr1);
 
                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }
 
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
 
            } while (i < input.length);
 
            return output;
        }
    };
});

app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});
