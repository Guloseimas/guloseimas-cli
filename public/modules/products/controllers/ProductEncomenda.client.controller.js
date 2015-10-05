'use strict';

angular.module('products').controller('ProductEncomendaController', ['$rootScope','$scope','$location','$timeout','$stateParams','Product',
	'ProductRelated','Collection','Size','Price','Color','Model','Order','ProductSearch','blockUI','Authentication','User','SendContact',
	function($rootScope,$scope,$location,$timeout,$stateParams,Product,ProductRelated,Collection,Size,Price,Color,Model,Order,ProductSearch,blockUI,Authentication,User,SendContact) {
		// Products controller logic
		//in controller that doesn't reload
	    window.scrollTo(0, 0);
		$scope.fullUrl = $location.absUrl();
		$scope.authentication = Authentication;
		$scope.user = Authentication.user;
		// $scope.facebookAppId = facebookAppId;
		$scope.$on('$locationChangeSuccess',function(){
		  //update your scope based on new $routeParams

		  	if($location.path()===$scope.path)
		  		$scope.find();
		});
		$scope.product = {};
		$scope.productQuery = {};
		$scope.notStared = '<i class="fa fa-star-o"></i> Gostei!';
		$scope.stared = '<i class="fa fa-star"></i> Remover!';
		
		$scope.clickGArelacionados = function(slug){
			ga('send', 'event', 'relacionado', 'click', slug);
		};
		$scope.encomenda = function() {
			$('#rootwizard').bootstrapWizard({onTabShow: function(tab, navigation, index) {
				var $total = navigation.find('li').length;
				var $current = index+1;
				var $percent = ($current/$total) * 100;
				$('#rootwizard').find('.bar').css({width:$percent+'%'});
			}});		
		};

		
	}
]);