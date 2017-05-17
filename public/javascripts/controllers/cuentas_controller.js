/**
* Niveles Controller
* Niveles repository
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
    .controller( 'cuentas-controller', [      '$scope',
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
            var initCuenta = function() {
                    // Inits nivel
                    $scope.cuenta =  {
                    };
                },
                loadCuentas = function() {
                    // load users with repository
                    // If success then sets users with data
                    CuentaRepository.getAll().success( function( data ) {
                        if( !data.error ) {
                            $scope.cuentas = data.data;
                            $scope.tb_cuentas = $scope.cuentas;
                        } else {
                            $scope.errors = data.message;
                        }
                    }).error( function( error ) {
                        $scope.errors = error;
                    });
                },
                isList = true; // Sets is list to true
            // If there is an id param in the url
            if( $routeParams.id ) {
                // Sets list to false
                isList = false;
                // Gets user by id with the url id
                // If success then sets nivel
                CuentaRepository.getById( $routeParams.id ).success( function( data ) {
                    if( !data.error ) {
                        $scope.cuenta = data.data;
                    } else {
                        $scope.errors = data.message;
                    }
                }).error( function( error ) {
                    $scope.errors = error;
                });

                $scope.update = function( ) {
                    // Reduces the rol model to just the id
                    // updates the nivel on the repository
                    // If success send it to the Niveles list
                    CuentaRepository.update( $scope.cuenta ).success( function( data ) {
                        if( !data.error ) {
                            $scope.message = data.message;
                            $location.path( '/cuentas/' );
                        } else {
                            $scope.errors = data.message;
                        }
                    }).error( function( error ) {
                        $scope.errors = error;
                    });
                };

            } else {
                // Set is list variable to true
                //  load users and initialize user
                isList = true;
                loadCuentas();
                initCuenta();
                $scope.add = function() {
                    // Reduces the rol model to just the id
                    // To send it to the repository
                    // If success and no error send to niveles list
                    CuentaRepository.add( $scope.cuenta ).success( function( data ) {
                        if( !data.error ) {
                            $scope.message = data.message;
                            $location.path( "/cuentas/" );
                        } else {
                            $scope.errors = data.message;
                        }
                    }).error( function( error ) {
                        $scope.errors = error;
                    });
                }
                $scope.searchChange = function() {
                    $scope.tb_cuentas = $scope.cuentas.filter( p => p.nombre.includes( $scope.search_text ) );
                };
            }

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
