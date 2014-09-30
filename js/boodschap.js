var boodschap = angular.module('boodschap', ["angularLocalStorage"]);

boodschap.controller('productsController', ['$scope','storage', function($scope,storage) {
	storage.bind($scope,'products',{defaultValue:[]});
	storage.bind($scope,'sum',{defaultValue:0});
	storage.bind($scope,'storedProducts',[])
	
	
	$scope.decrement = function( product ) { 
		if( product.amount > 1 ) {
			product.amount--;
		} else {
			confirmDelete = window.confirm( "Product verwijderen? ")
			if(confirmDelete) {
				$scope.products.splice( $scope.products.indexOf(product), 1);
			}
		}
		$scope.getSum();
	}
		
	$scope.increment = function( product ) { 
		product.amount++;
		$scope.getSum();
	}
		
	$scope.getSum = function() {
		$scope.sum = 0;
		angular.forEach($scope.products,function(product) {
			var sum = $scope.sum + (product.price * product.amount);
			$scope.sum = Math.round(sum*100)/100;
		})
	}
}]);
	
boodschap.directive('ngModelOnblur', function() {
    return {
        priority: 1,
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, elm, attr, ngModelCtrl) {
            if (attr.type === 'radio' || attr.type === 'checkbox') return;
            
            elm.off('input keydown change');
            elm.on('blur', function() {
                scope.$apply(function() {
                    ngModelCtrl.$setViewValue(elm.val());
                });
				$scope.getSum();
            });
        }
    };
});


/* EQHEIGHT */

window.recalcEqHeight = function() {
	var heights = $(".panel").map(function() {
		return $(this).height();
	}).get(),
	maxHeight = Math.max.apply(null, heights);
	$(".panel").height(maxHeight);
}

$( document ).ready(function() {
	window.recalcEqHeight();
    
});