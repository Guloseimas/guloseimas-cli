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
		$scope.colorMarkedFlor = [];
		$scope.colorMarkedBase = '';
		$scope.total = 0;
		$scope.current = 0;
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
		$scope.inventory = {};
		$scope.inventory.product = null;
		$scope.inventory.estruturas = [];
		$scope.clickGArelacionados = function(slug){
			ga('send', 'event', 'relacionado', 'click', slug);
		};
		$scope.encomenda = function() {
			$('#rootwizard').bootstrapWizard({onTabShow: function(tab, navigation, index) {
				var $total = navigation.find('li').length;
				var $current = index+1;
				var $percent = ($current/$total) * 100;
				$('#rootwizard').find('.bar').css({width:$percent+'%'});
				$scope.total = $total;
			}});	
			$scope.encomendaConfig = Product.query({
				productSlug: 'encomenda'
			}); 

		};

		$scope.clickColor = function(color,key){
			if(key==='base'){
				$scope.colorMarkedBase = color;
				var estrutura = {};
				estrutura.estrutura = 'base';
				estrutura.color = color;
				$scope.inventory.estruturas = $scope.inventory
				                               .estruturas
				                               .filter(function(e){if(e.estrutura==='flor')return e;});
				$scope.inventory.estruturas.push(estrutura);
			}else{
				var index = $scope.colorMarkedFlor.indexOf(color);
				if(index>-1)
					$scope.colorMarkedFlor.splice(index,1);
				else{
					if($scope.colorMarkedFlor.length<2){
						$scope.colorMarkedFlor.push(color);
					}else{
						$scope.colorMarkedFlor.splice(1,1);
						$scope.colorMarkedFlor.push(color);
					}
				}
				$scope.inventory.estruturas = $scope.inventory
				                               .estruturas
				                               .filter(function(e){if(e.estrutura==='base')return e;});
				$scope.colorMarkedFlor.forEach(function(e){
					var estrutura = {};
					estrutura.estrutura = 'flor';
					estrutura.color = e;
					$scope.inventory.estruturas.push(estrutura);
				});
			}
		};
		$scope.addRecheio = function(recheio){
			$scope.inventory.recheio = recheio;
			$scope.inventory.temDoce = true;
		};
		$scope.addTypeFlower = function(flor){
			$scope.inventory.type = flor;
		};

		$scope.next = function(){
			var atual = $('#list li.active').index();
			var total = $('#list li').length;
			var next = (atual===total)?total:atual+1;
			$('#list li').removeClass('active').eq(next).addClass('active');
			$('#content .tab-pane').removeClass('active').eq(next).addClass('active');
			
			var $percent = ((next+1)/total) * 100;
			$('#rootwizard').find('.bar').css({width:$percent+'%'});
			$scope.current = next;

			if($scope.current===($scope.total-1)){
				$scope.calculate();
			}

		};
		
		$scope.previous = function(){
			var atual = $('#list li.active').index();
			var total = $('#list li').length;
			var previous = (atual===0)?0:atual-1;
			$('#list li').removeClass('active').eq(previous).addClass('active');
			$('#content .tab-pane').removeClass('active').eq(previous).addClass('active');
			
			var $percent = ((previous+1)/total) * 100;
			$('#rootwizard').find('.bar').css({width:$percent+'%'});
			$scope.current = previous;

		};
		$scope.calculate = function(){
			Order.calculateEncomenda($scope.inventory).$promise.then(function(inventory){
				$scope.inventory = inventory;
			},function(error){
				console.log('error '+ error);
			},function(progressback){
				console.log('progressback '+ progressback);
			});
		};
		$scope.addToCart = function(){
			if($scope.inventory){
				$scope.orderCall = Order.addItemEncomenda({inventory:$scope.inventory});
				$scope.orderCall.$promise.then(function(response,error,progressback){
					// console.log(p);
					// ga('send', 'event', 'button', 'click', id);

					if(response.order){
						$rootScope.order = response.order;
						$location.path('/cart');		
					}else if(error){
						$location.path('/products');		
					}


				});
			}
		};

	}
]);