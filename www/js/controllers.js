root_url = "http://bund.pw/api/index.php";
var MyLocation;

angular.module('PowerBund.controllers', [])
.controller('MainCtrl',  function($scope, $rootScope, $ionicNavBarDelegate){
  $ionicNavBarDelegate.align('center');
})
.controller('HomeCtrl', function($scope,$ionicTabsDelegate) {
  $ionicTabsDelegate.showBar(true);
  // var mySwiper = new Swiper('.lunbo', {
  //    speed: 100,
  //    autoplay: 5000
  // });
 
  $scope.scanQR = function() {
    cordova.plugins.barcodeScanner.scan(
      function (result) {
        alert("您选择的是XX充电站XX充电桩，充电费为X元/度");
      }, 
      function (error) {
        alert("Scanning failed: " + error);
      },
      {
        "preferFrontCamera" : false, // iOS and Android
        "showFlipCameraButton" : true, // iOS and Android
        "prompt" : "Place a QR Code inside the scan area", // supported on Android only
        "formats" : "QR_CODE", // default: all but PDF_417 and RSS_EXPANDED
        "orientation" : "portrait" // Android only (portrait|landscape), default unset so it rotates with the device
      }
    );
  };

  $scope.index_pic = 0 ;
})

.controller('DashCtrl', function($scope) {

})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.posts = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ForumCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope, $state, $localStorage, $http) {
  // // 根据用户是否登录进行跳转
  // var isIOS = ionic.Platform.isIOS();
  // var successcb = function(db) {
  //   db.transaction(function(tx) {
  //     db.executeSql('INSERT INTO account VALUES (?)', ['test-value'], function (resultSet) {console.log(resultSet.insertId);console.log(resultSet.rowsAffected);}, function(error) {console.log('SELECT error: ' + error.message);});
  //     db.executeSql('SELECT * FROM account', [], function (resultSet) {console.log(resultSet.rows.item(0));});
  //     alert("OK");
  //     console.log(tx);
  //   })
  // };
  // var errorcb = function(err) {console.log('Open database ERROR: ' + JSON.stringify(err));};
  // if (isIOS){
  //   var db = $cordovaSQLite.openDB({name: 'my.db', iosDatabaseLocation: 'Library'}, successcb, errorcb); //ios下初始化
  // }else{
  //   var db = $cordovaSQLite.openDB({name: 'my.db', location: 'default'}, successcb, errorcb); // 非ios下初始化
  // }
  // // 参数说明：
  // // default: Library/LocalDatabase subdirectory - NOT visible to iTunes and NOT backed up by iCloud
  // // Library: Library subdirectory - backed up by iCloud, NOT visible to iTunes
  // // Documents: Documents subdirectory - visible to iTunes and backed up by iCloud
  // var token,username;
  $scope.storage = $localStorage.$default({
    "phone": 123,
    "token": "5f6001f20ca588b5f009e19780f9c5f11468479815"
  });
  phone = $localStorage.phone;
  token = $localStorage.token;
  console.log(token);
  // console.log($localStorage.phone);
  if ( token != "" && phone != "" ) {
    //根据Token&username 验证登陆
    url = root_url + "/Account/Auth";
    data = {
      "phone": phone,
      "token": token,
    };
    console.log(data);
    $.post(url, data, function(res){
      res = res;
      console.log(res);
      switch(res.status){
        case "TOKEN_PASS":
          $state.go("tab.account-detail",{'token': token});
          break;
        case "TOKEN_REJECT":
          alert('您还未登录！');
          $state.go("tab.account-login");
          break;
        case "TOKEN_BROKEN": 
          alert('TOKEN_BROKEN');
          $state.go("tab.account-login");
          break;
      }
    }, 'json');
    // console.log("123");
  } else {
    alert("no tk");
    $state.go("tab.account-login");
  }
})

.controller('LoginCtrl', function($scope, $localStorage, $state, $ionicNavBarDelegate){
  $ionicNavBarDelegate.showBackButton(false);
  $scope.login_data={'phone':'','password':''};
  $scope.login = function(){
    // console.log($scope.login_data);
    login_data = $scope.login_data;
    url = root_url + "/Account/Auth";
    $.post(url, login_data, function(res){
      console.log(res);
      switch(res.status){
        case "TOKEN_GET":
          $localStorage.token = res.token;
          $localStorage.phone = login_data.phone;
          $state.go("tab.account-detail",{'token': res.token});
          break;
        case "FAILED":
          alert('登录失败！');
          break;
      }
    }, 'json');
  };
})

.controller('SignUpCtrl', function($scope){
  
})

.controller('PlanCtrl', function($scope, $ionicTabsDelegate, $http, $rootScope){
  $scope.myPosition = "";
  $scope.input={'search':''};
  

  $scope.plan_minLength = function() {
    url = root_url + "/Plan/minLength";
    console.log('start');
    url = root_url+'/Map/Geocoder';
    $.post(url, $scope.input, function(res, status, xhr){
      if (status == 'success'){
        $scope.input_geo = res.result.location.lng + ',' + res.result.location.lat;
        console.log($scope.input_geo);
        console.log(res);
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function(r){
          if(this.getStatus() == BMAP_STATUS_SUCCESS){
            $rootScope.myPosition = r.point;
            $scope.myPosition = $rootScope.myPosition;
            myPosition = $scope.myPosition.lng + ',' + $scope.myPosition.lat;
            url = root_url + "/Plan/minLength";
            data = {'startPosition': myPosition, 'goalPosition': $scope.input_geo};
            console.log(data);
            $.post(url, data, function(res, status, xhr){
              if (status == 'success'){
                $scope.distance = res.distance;
                $scope.waypoint = res.waypoint;
                $scope.steps = res.steps;
                console.log(res);
              }
            });
          }
          else {
            alert('failed'+this.getStatus());
          }        
        },{enableHighAccuracy: true});
      }},'json');  

  
  };

  $scope.plan_minTime = function() {
    url = root_url+"/Plan/minTime";
    // $http.post(url,data,config);
  };


  $scope.loadPlanMap = function(){
    var planmap = new BMap.Map("planmap"); // 创建地图实例
    var map_options = {renderOptions: {map: planmap}};
    var localSearch = new BMap.LocalSearch(planmap, map_options);
    var point = new BMap.Point(121.508592,30.839823); // 创建点坐标
    planmap.centerAndZoom(point, 16); // 初始化地图，设置中心点坐标和地图级别
    planmap.enableScrollWheelZoom();

    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function(r){
      if(this.getStatus() == BMAP_STATUS_SUCCESS){
        var mk = new BMap.Marker(r.point);
        planmap.addOverlay(mk);
        planmap.panTo(r.point);
        $scope.myPosition = r.point;
        // alert('您的位置：'+r.point.lng+','+r.point.lat);
      }
      else {
        alert('failed'+this.getStatus());
      }        
    },{enableHighAccuracy: true});
    MyLocation = $scope.myPosition;
  };

  var ac = new BMap.Autocomplete({"input" : "suggestId","location" : planmap});
  var myGeo = new BMap.Geocoder();

  $scope.suggest = function(search) {
    console.log(search);
    console.log(ac.getResults().wr);
      // startGeocoder();
      $scope.suggests = ac.getResults().wr;
  };

  $scope.startGeocoder = function() {
    console.log('hello');
  }

  $scope.startPlan = function(search){

  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('NearCtrl', function($scope,$ionicTabsDelegate,$http,POIs) {
  $scope.loadNearMap = function() {
    var nearmap = new BMap.Map("nearmap"); // 创建地图实例
    var map_options = {renderOptions: {map: nearmap}};
    var localSearch = new BMap.LocalSearch(nearmap, map_options);
    var point = new BMap.Point(121.508592,30.839823); // 创建点坐标
    nearmap.centerAndZoom(point, 16); // 初始化地图，设置中心点坐标和地图级别
    nearmap.enableScrollWheelZoom();

    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function(r){
      if(this.getStatus() == BMAP_STATUS_SUCCESS){
        var mk = new BMap.Marker(r.point);
        nearmap.addOverlay(mk);
        
        nearmap.panTo(r.point);
        $rootScope.myPosition = r.point;
        $scope.myPosition = $rootScope.myPosition;
        // alert('您的位置：'+r.point.lng+','+r.point.lat);
      }
      else {
        alert('failed'+this.getStatus());
      }        
    },{enableHighAccuracy: true});
  
  };

  // $scope.chats = Chats.all();
  $scope.lists = "";
  // POIs.all().success(function(res){$scope.lists = res;});
  POIs.all().then(function(res){$scope.lists = res;});
  console.log($scope.lists);

})
.controller('POIDetailCtrl', function(POIs, $scope, $stateParams, $rootScope){
  var geolocation = new BMap.Geolocation();
  geolocation.getCurrentPosition(function(r){
    if(this.getStatus() == BMAP_STATUS_SUCCESS){
      $rootScope.myPosition = r.point;
      $scope.myPosition = $rootScope.myPosition['lat'] + ',' + $rootScope.myPosition['lng'];
      // alert('您的位置：'+r.point.lng+','+r.point.lat);
    }
    else {
      alert('failed'+this.getStatus());
    }        
  },{enableHighAccuracy: true});

  $scope.lists = "test"; 
  POIs.all().then(function(res){
    $scope.lists = res;console.log(res);console.log($scope.lists);
    
    function get(lists,Id){
      for (var i = 0; i < lists.length; i++) {
        if (lists[i].id == parseInt(Id)) {
          console.log(lists[i]);
          return lists[i];
        }
      }
      return null;
    }
    $scope.list = get($scope.lists, $stateParams.listId);

    listLocation = $scope.list['location'].split(",");
    $scope.list['location'] = listLocation[1] + "," + listLocation[0]; 
    $scope.navigation = function(){
      // example:
      // bdapp://map/direction?origin=latlng:34.264642646862,108.95108518068|name:我家&destination=大雁塔&mode=driving&region=西安&src=yourCompanyName|yourAppName
      // window.open("bdapp://map/direction?origin=latlng:34.264642646862,108.95108518068|name:我家&destination=大雁塔&mode=driving&region=西安&src=yourCompanyName|yourAppName", '_blank', 'location=yes');
    };

    // console.log($rootScope.myPosition);
  });


  
})
.controller('AccountDetailCtrl', function($scope, $stateParams, $localStorage, $state, $ionicHistory){
  $scope.$on("$ionicView.beforeEnter", function(event, data){
    phone = $localStorage.phone;
    token = $localStorage.token;
    url = root_url + "/Account/Auth";
    data = {"phone": phone,"token": token};
    $.post(url, data, function(res, status, xhr){
      if (status == 'success'){
        switch(res.status){
          case "TOKEN_PASS":
            $state.go("tab.account-detail",{'token': token});
            $scope.account = res.account;
            break;
          case "TOKEN_REJECT":
            alert('TOKEN_REJECT');
            $state.go("tab.account-login");
            break;
          case "TOKEN_BROKEN": 
            alert('TOKEN_BROKEN');
            $state.go("tab.account-login");
            break;
        }  
      }else{$state.go("tab.account-login");}
    }, 'json');
  });

  $scope.logout = function(){
    delete $localStorage.token;
    delete $localStorage.phone;
    $ionicHistory.clearHistory();
    $ionicHistory.clearCache();
    $state.go('tab.account-login');
  }
})

;
