root_url = "http://bund.pw/api/index.php";

angular.module('PowerBund.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})
.factory('POIs', function($http,$q) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var POIs;

  url = root_url + "/map/getLists" ;
  getLists = "";

  return {
    all: function() {
      var deferred = $q.defer();
      $http.get(url)
      .success(function (data, status) {
          deferred.resolve(data);
      })
      .error(function (data, status) {
          deferred.reject(data);
      });
      console.log(deferred.promise);
      return deferred.promise;
    }
  };
})
.factory('Location',  function(){
  return {
    all: function() {
      
      return null;
    }
  };

})




;
