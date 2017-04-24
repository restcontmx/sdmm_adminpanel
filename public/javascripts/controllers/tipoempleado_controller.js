/**
* TipoEmpleado Controller
* TipoEmpleado repository
* @author : Ramiro Gutierrez Alaniz
* @date : April 7th 2017
**/
app
    .factory( 'TipoEmpleadoRepository', [ 'CRUDService', function( CRUDService ) {
        var model = 'tipoempleado';
        return({
            getAll : () => CRUDService.getAll( model ),
            add : ( data ) => CRUDService.add( model, data ),
            getById : ( id ) => CRUDService.getById( model, id ),
            update : ( data ) => CRUDService.update( model, data ),
            remove : ( id ) => CRUDService.remove( model, id )
        });
    }])
    .controller( 'tipoempleado-controller', [   '$scope',
                                                '$rootScope',
                                                '$routeParams',
                                                '$location',
                                                '$mdDialog',
                                                'TipoEmpleadoRepository',
                                                'AuthRepository',
                                                function(   $scope,
                                                            $rootScope,
                                                            $routeParams,
                                                            $location,
                                                            $mdDialog,
                                                            TipoEmpleadoRepository,
                                                            AuthRepository  ) {
        if( AuthRepository.viewVerification() ) {
            $scope.title = 'Tipo Empleado';
            var initTipoEmpleado = function() {
                    // Inits tipoempleado
                    $scope.tipoempleado =  {
                    };
                },
                loadTipoEmpleados = function() {
                    // load users with repository
                    // If success then sets users with data
                    TipoEmpleadoRepository.getAll().success( function( data ) {
                        if( !data.error ) {
                            $scope.tipoempleados = data.data;
                            $scope.tb_tipoempleados = $scope.tipoempleados;
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
                // If success then sets tipoempleado
                TipoEmpleadoRepository.getById( $routeParams.id ).success( function( data ) {
                    if( !data.error ) {
                        $scope.tipoempleado = data.data;
                    } else {
                        $scope.errors = data.message;
                    }
                }).error( function( error ) {
                    $scope.errors = error;
                });

                $scope.update = function( ) {
                    // Reduces the rol model to just the id
                    // updates the tipoempleado on the repository
                    // If success send it to the TipoEmpleado list
                    TipoEmpleadoRepository.update( $scope.tipoempleado ).success( function( data ) {
                        if( !data.error ) {
                            $scope.message = data.message;
                            $location.path( '/tipoempleado/' );
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
                loadTipoEmpleados();
                initTipoEmpleado();
                $scope.add = function() {
                    // Reduces the rol model to just the id
                    // To send it to the repository
                    // If success and no error send to tipoempleado list
                    TipoEmpleadoRepository.add( $scope.tipoempleado ).success( function( data ) {
                        if( !data.error ) {
                            $scope.message = data.message;
                            $location.path( "/tipoempleado/" );
                        } else {
                            $scope.errors = data.message;
                        }
                    }).error( function( error ) {
                        $scope.errors = error;
                    });
                }
                $scope.searchChange = function() {
                    $scope.tb_tipoempleado = $scope.tipoempleado.filter( p => p.nombre_comercial.includes( $scope.search_text ) );
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
                    .ok('Borrar Tipo Empleado')
                    .cancel('Cancelar');
                $mdDialog.show(confirm).then(function() {
                    // If confirmation message then remove the model by id
                    TipoEmpleadoRepository.remove( id ).success( function( data ) {
                            if( !data.error ) {
                                isList ? loadTipoEmpleados() : $location.path( '/tipoempleado/' );
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
