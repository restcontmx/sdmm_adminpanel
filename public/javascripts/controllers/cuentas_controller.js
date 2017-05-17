/**
* Empleados Controller
* Empleados repository
* @author : Ramiro Gutierrez Alaniz
* @date : April 7th 2017
**/
app
    .factory( 'CuentaRepository', [ 'CRUDService', function( CRUDService ) {
        var model = 'cuenta';
        return({
            getAll : () => CRUDService.getAll( model ),
            add : ( data ) => CRUDService.add( model, data ),
            getById : ( id ) => CRUDService.getById( model, id ),
            update : ( data ) => CRUDService.update( model, data ),
            remove : ( id ) => CRUDService.remove( model, id )
        });
    }])
    .controller( 'cuentas-controller', [        '$scope',
                                                '$rootScope',
                                                '$routeParams',
                                                '$location',
                                                '$mdDialog',
                                                'CuentaRepository',
                                                'AuthRepository',
                                                function(   $scope,
                                                            $rootScope,
                                                            $routeParams,
                                                            $location,
                                                            $mdDialog,
                                                            CuentaRepository,
                                                            AuthRepository  ) {
        if( AuthRepository.viewVerification() ) {
            $scope.title = 'Cuentas';
            $scope.message = "Este es el mensaje";
            var initCuenta = function() {
                    $scope.cuenta = {};
                },
                loadCuentas = function() {
                    CuentaRepository.getAll().success(function( data ) {
                        if( !data.error ) {
                            $scope.cuentas = data.data;
                            $scope.tb_cuentas = data.data;
                        } else {
                            $scope.errors = data.message;
                        }
                    }).error(function(error){
                        $scope.errors = error;
                    });
                };

            if( $routeParams.id ) {
                // Edit or Detail
                CuentaRepository.getById( $routeParams.id ).success( function( data ) {
                    if( !data.error ) {
                        $scope.cuenta = data.data;
                    } else {
                        $scope.errors = data.message;
                    }
                }).error( function( error ) {
                    $scope.errors = error;
                });
                $scope.update = function() {
                    CuentaRepository.update( $scope.cuenta ).success( function() {
                        if( !data.error ) {
                            $location.path( '/cuentas/' );
                        } else {
                            $scope.errors = data.message;
                        }
                    }).error( function( error ) {
                        $scope.errors = error;
                    });
                };
            } else {
                // list or create
                loadCuentas();
                $scope.add = function() {
                    CuentaRepository.create( $scope.cuenta ).success( function() {
                        if( !data.error ) {
                            $location.path( '/cuentas/' );
                        } else {
                            $scope.errors = data.message;
                        }
                    }).error( function( error ) {
                        $scope.errors = error;
                    });
                };
            }

            // func delete
            $scope.delete = function( e, id ) {
                // This shows a modal dialog then if confirmation
                // Deletes the model with the repository function
                var confirm = $mdDialog.confirm()
                    .title('¿Desea borrar el registro?')
                    .textContent("Después de borrar esto no podrá ser recuperado.")
                    .ariaLabel('Lucky day')
                    .targetEvent(e)
                    .ok('Borrar Cuenta')
                    .cancel('Cancelar');
                $mdDialog.show(confirm).then(function() {
                    // If confirmation message then remove the model by id
                    CuentaRepository.remove( id ).success( function( data ) {
                            if( !data.error ) {
                                isList ? loadCuentas() : $location.path( '/cuentas/' );
                            } else {
                                $scope.errors = data.message;
                            }
                        }).error( function(error) {
                            $scope.errors =  "Ha habido un error.";
                        });
                }, null );
            };
        }
    }]);
