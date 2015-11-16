
/* Controlador finestra modal */
function modalCtrl($scope, $modal, notificationsService) {

  var modalInstance;

  $scope.open = function(){
    modalInstance = $modal.open({
        templateUrl : "content.html",
        keyboard:false
    });
  };

  $scope.close = function(){
    if(modalInstance) modalInstance.close();  
  }

  $scope.$on('openModal', function(){
    $scope.open();
  });

  $scope.$on('closeModal', function(){
    $scope.close();
  });

};


/* Controlador missatges */
function messageCtrl($scope, notificationsService){
    $scope.$on('showMessage', function() {
        $scope.message = notificationsService.message;
        $scope.type = notificationsService.type;
    });
    $scope.$on('closeMessage', function() {
        $scope.closeMessage();
    });
    $scope.closeMessage = function() {
      $scope.message=$scope.type='';
    };    
}

/* Controlador GRID */
function ctrlRead($scope, $filter, $http, dadesFactory, notificationsService, $location) { 
    // init 
    $scope.sortingOrder = sortingOrder; 
    $scope.reverse = false; 
    $scope.filteredItems = []; 
    $scope.itemsPerPage = 10; 
    $scope.maxSize = 5; 
    $scope.pagedItems = []; 
    $scope.currentPage = 1; 
    $scope.addMode = false; 
    
    var searchMatch = function (haystack, needle) { 
        if (!needle) { 
            return true; 
        } 
        haystack +=""; 
        return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1; 
    }; 
  
    $scope.range = function (start, end) { 
        var ret = []; 
        if (!end) { 
            end = start; 
            start = 0; 
        } 
        for (var i = start; i < end; i++) { 
            ret.push(i); 
        } 
        return ret; 
    }; 
      
    $scope.setPage = function (page) { 
        $scope.currentPage = page;
        $scope.refreshData();
    }; 

    $scope.setPage2 = function () {
        if(isNaN($scope.currentPage)){
            $scope.currentPage = 1
            return;
        } 
        $scope.refreshData();
    }; 
  
    // change sorting order 
    $scope.sort_by = function(newSortingOrder) { 
        if ($scope.sortingOrder == newSortingOrder) 
            $scope.reverse = !$scope.reverse; 
  
        $scope.sortingOrder = newSortingOrder; 
    }; 
  
    /* add and edit mode*/
    $scope.editMode = function(item) { 
        item.editMode = !item.editMode; 
    }; 
  
    $scope.toogleAddMode = function() { 
        $scope.addMode = !$scope.addMode; 
    };     
  
  
    /* data management */
    $scope.refreshData = function(){
        notificationsService.openModal();
        dadesFactory.getAll($scope.query,$scope.currentPage,$scope.itemsPerPage).success(function(data){ 
            $scope.items = data.equipaments; 
            $scope.pagedItems = $scope.items;

            $location.search("query", $scope.query);
            $location.search("page", $scope.currentPage);
            $location.search("rpp", $scope.itemsPerPage);

            $scope.totalPages =  $scope.noOfPages = parseInt(data.pages*10);
            $scope.maxSize = ($scope.noOfPages/10)<5 ? $scope.noOfPages : 5;
            notificationsService.closeModal();
        }); 
    } 

    $scope.query = ($location.search()).query ? ($location.search()).query : "";
    var page = ($location.search()).page;
    var rpp = ($location.search()).rpp;
    $scope.currentPage = isNaN(page) || page<1 ? 1 : page;
    $scope.itemsPerPage = isNaN(rpp) || rpp<10 ? 10 : rpp;
    $scope.refreshData(); 
  
    $scope.add = function(item){ 
    	delete item.$$hashKey
        dadesFactory.add(item). 
            success(function(data, status, headers, config) { 
                $scope.items.push(item);
                $scope.toogleAddMode();
                $scope.refreshData();
                delete item.id;
                delete item.nom;
                delete item.municipi;
                delete item;
            }). 
            error(function(data, status, headers, config) { 
                notificationsService.closeModal();
                notificationsService.sendMessage("S'ha produit un error en afegir el registre","error");
            }); 
    } 
  
    $scope.del = function(item, index){ 
        dadesFactory.del(item). 
            success(function(data, status, headers, config) { 
                $scope.refreshData();
            }). 
            error(function(data, status, headers, config) { 
                notificationsService.closeModal();
                notificationsService.sendMessage("S'ha produit un error eliminant el registre","error");
            }); 
    } 
  
    $scope.update = function(item){ 
        delete item["$$hashKey"]; 
        delete item["editMode"]; 
        notificationsService.openModal();
        dadesFactory.update(item). 
            success(function(data, status, headers, config) { 
                notificationsService.closeModal();
            }). 
            error(function(data, status, headers, config) { 
                notificationsService.closeModal();
                $scope.refreshData(); 
                notificationsService.sendMessage("S'ha produit un error actualitzant el registre","error");
            }); 
    } 
  
}; 
  
ctrlRead.$inject = ['$scope', '$filter', '$http', 'dadesFactory', 'notificationsService', '$location']; 
messageCtrl.$inject = ['$scope', 'notificationsService']; 
modalCtrl.$inject = ['$scope', '$modal', 'notificationsService']; 
