'use strict';
var app = angular.module( 'SDMM-WEBAPP', [      'ngRoute',
                                                'ngCookies',
                                                'ngMaterial',
                                                'warrior-filters',
                                                'ui.router',
                                                'crud-service' ])
  .run( [ '$rootScope', '$location', 'AuthRepository', function( $rootScope, $location, AuthRepository ) {
      $rootScope.isLoggedIn = {
          show_app : true,
          show_auth : false
      };
      if( !AuthRepository.isSessionSet() ) {
          $rootScope.isLoggedIn.show_app = false;
          $rootScope.isLoggedIn.show_auth = true;
          $location.path( '/' );
      } else {
          $rootScope.isLoggedIn.show_app = true;
          $rootScope.isLoggedIn.show_auth = false;
      }
  }])
  .config( [ '$routeProvider', '$locationProvider', function( $routeProvider, $locationProvider ) {
      $routeProvider
        .when( '/', {
            templateUrl : '../views/main.html'
        })
        .when( '/main', {
            templateUrl : '../views/main.html'
        })
        // Users routes
        .when( '/users', {
            templateUrl : '../views/users/list.html'
        })
        .when( '/users/new/', {
            templateUrl : '../views/users/new.html'
        })
        .when( '/users/edit/:id', {
            templateUrl : '../views/users/edit.html'
        })
        .when( '/users/detail/:id', {
            templateUrl : '../views/users/detail.html'
        })
        // Proveedores
        .when( '/proveedores', {
            templateUrl : '../views/proveedores/list.html'
        })
        .when( '/proveedores/new/', {
            templateUrl : '../views/proveedores/new.html'
        })
        .when( '/proveedores/edit/:id', {
            templateUrl : '../views/proveedores/edit.html'
        })
        .when( '/proveedores/detail/:id', {
            templateUrl : '../views/proveedores/detail.html'
        })
        // Tipo empleado
        .when( '/tipoempleado', {
            templateUrl : '../views/tipoempleado/list.html'
        })
        .when( '/tipoempleado/new/', {
            templateUrl : '../views/tipoempleado/new.html'
        })
        .when( '/tipoempleado/edit/:id', {
            templateUrl : '../views/tipoempleado/edit.html'
        })
        .when( '/tipoempleado/detail/:id', {
            templateUrl : '../views/tipoempleado/detail.html'
        })
        // Empleado
        .when( '/empleados', {
            templateUrl : '../views/empleados/list.html'
        })
        .when( '/empleados/new/', {
            templateUrl : '../views/empleados/new.html'
        })
        .when( '/empleados/edit/:id', {
            templateUrl : '../views/empleados/edit.html'
        })
        .when( '/empleados/detail/:id', {
            templateUrl : '../views/empleados/detail.html'
        })

        // Categoria
        .when( '/categorias', {
            templateUrl : '../views/categorias/list.html'
        })
        .when( '/categorias/new/', {
            templateUrl : '../views/categorias/new.html'
        })
        .when( '/categorias/edit/:id', {
            templateUrl : '../views/categorias/edit.html'
        })
        .when( '/categorias/detail/:id', {
            templateUrl : '../views/categorias/detail.html'
        })

        // Nivel
        .when( '/niveles', {
            templateUrl : '../views/niveles/list.html'
        })
        .when( '/niveles/new/', {
            templateUrl : '../views/niveles/new.html'
        })
        .when( '/niveles/edit/:id', {
            templateUrl : '../views/niveles/edit.html'
        })
        .when( '/niveles/detail/:id', {
            templateUrl : '../views/niveles/detail.html'
        })

        // SubNivel
        .when( '/subniveles', {
            templateUrl : '../views/subniveles/list.html'
        })
        .when( '/subniveles/new/', {
            templateUrl : '../views/subniveles/new.html'
        })
        .when( '/subniveles/edit/:id', {
            templateUrl : '../views/subniveles/edit.html'
        })
        .when( '/subniveles/detail/:id', {
            templateUrl : '../views/subniveles/detail.html'
        })

        // presupuestos
        .when( '/presupuestos', {
            templateUrl : '../views/presupuestos/list.html'
        })
        .when( '/presupuestos/new/', {
            templateUrl : '../views/presupuestos/new.html'
        })
        .when( '/presupuestos/edit/:id', {
            templateUrl : '../views/presupuestos/edit.html'
        })
        .when( '/presupuestos/detail/:id', {
            templateUrl : '../views/presupuestos/detail.html'
        })

        // procesomineros
        .when( '/procesos', {
            templateUrl : '../views/procesomineros/list.html'
        })
        .when( '/procesos/new/', {
            templateUrl : '../views/procesomineros/new.html'
        })
        .when( '/procesos/edit/:id', {
            templateUrl : '../views/procesomineros/edit.html'
        })
        .when( '/procesos/detail/:id', {
            templateUrl : '../views/procesomineros/detail.html'
        })

        // productos
        .when( '/productos', {
            templateUrl : '../views/productos/list.html'
        })
        .when( '/productos/new/', {
            templateUrl : '../views/productos/new.html'
        })
        .when( '/productos/edit/:id', {
            templateUrl : '../views/productos/edit.html'
        })
        .when( '/productos/detail/:id', {
            templateUrl : '../views/productos/detail.html'
        })

        // tipoproducto
        .when( '/tipoproducto', {
            templateUrl : '../views/tipoproducto/list.html'
        })
        .when( '/tipoproducto/new/', {
            templateUrl : '../views/tipoproducto/new.html'
        })
        .when( '/tipoproducto/edit/:id', {
            templateUrl : '../views/tipoproducto/edit.html'
        })
        .when( '/tipoproducto/detail/:id', {
            templateUrl : '../views/tipoproducto/detail.html'
        })

        // tipoproducto
        .when( '/vales', {
            templateUrl : '../views/vales/list.html'
        })
        .when( '/vales/new/', {
            templateUrl : '../views/vales/new.html'
        })
        .when( '/vales/edit/:id', {
            templateUrl : '../views/vales/edit.html'
        })
        .when( '/vales/detail/:id', {
            templateUrl : '../views/vales/detail.html'
        })

        // cuentas
        .when( '/cuentas', {
            templateUrl : '../views/cuentas/list.html'
        })
        .when( '/cuentas/new/', {
            templateUrl : '../views/cuentas/new.html'
        })
        .when( '/cuentas/edit/:id', {
            templateUrl : '../views/cuentas/edit.html'
        })
        .when( '/cuentas/detail/:id', {
            templateUrl : '../views/cuentas/detail.html'
        })

        .otherwise({
            redirectTo : '/404'
        });
  }])
  .controller( 'navbar-controller', [ '$scope', '$rootScope', 'AuthRepository', function( $scope, $rootScope, AuthRepository ) {
      $scope.project_name = "Capstone Control de Explosivos";
      $rootScope.user_info = AuthRepository.getSession();
      $scope.logout = function() {
            AuthRepository.logout().success( function( data ) {
                AuthRepository.viewVerification();
                AuthRepository.setMenu();
            }).error( function( error ) {
                $scope.errors = error;
            });
        };
  }])
  .controller( 'menu-controller', [ '$scope', '$rootScope', 'AuthRepository', function( $scope, $rootScope, AuthRepository ) {
      AuthRepository.setMenu();
      $scope.set_menu_state = function( element ) {
            AuthRepository.setActiveMenu( element );
      };
  }])
  .controller( 'main-controller', [ '$scope', '$rootScope', 'AuthRepository', function( $scope, $rootScope, AuthRepository ) {
      if( AuthRepository.viewVerification() ) {
          $scope.title = "Bienvenido";
      }
  }]);
