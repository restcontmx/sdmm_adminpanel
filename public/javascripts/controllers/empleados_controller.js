/**
* Empleados Controller
* Empleados repository
* @author : Ramiro Gutierrez Alaniz
* @date : April 7th 2017
**/
app
    .factory( 'EmpleadoRepository', [ 'CRUDService', function( CRUDService ) {
        var model = 'empleado';
        return({
            getAll : () => CRUDService.getAll( model ),
            add : ( data ) => CRUDService.add( model, data ),
            getById : ( id ) => CRUDService.getById( model, id ),
            update : ( data ) => CRUDService.update( model, data ),
            remove : ( id ) => CRUDService.remove( model, id )
        });
    }])
    .controller( 'empleados-controller', [      '$scope',
                                                '$rootScope',
                                                '$routeParams',
                                                '$location',
                                                '$mdDialog',
                                                'EmpleadoRepository',
                                                'TipoEmpleadoRepository',
                                                'AuthRepository',
                                                function(   $scope,
                                                            $rootScope,
                                                            $routeParams,
                                                            $location,
                                                            $mdDialog,
                                                            EmpleadoRepository,
                                                            TipoEmpleadoRepository,
                                                            AuthRepository  ) {
        if( AuthRepository.viewVerification() ) {
            $scope.title = 'Empleados';
            var initEmpleado = function() {
                    // Inits empleado
                    $scope.empleado =  {
                        tipoempleado : {}
                    };
                },
                loadEmpleados = function() {
                    // load users with repository
                    // If success then sets users with data
                    EmpleadoRepository.getAll().success( function( data ) {
                        if( !data.error ) {
                            $scope.empleados = data.data;
                            $scope.tb_empleados = $scope.empleados;
                        } else {
                            $scope.errors = data.message;
                        }
                    }).error( function( error ) {
                        $scope.errors = error;
                    });
                },
                loadTipoEmpleados = function() {
                    // load users with repository
                    // If success then sets users with data
                    TipoEmpleadoRepository.getAll().success( function( data ) {
                        if( !data.error ) {
                            $scope.tipo_empleados = data.data;
                        } else {
                            $scope.errors = data.message;
                        }
                    }).error( function( error ) {
                        $scope.errors = error;
                    });
                },
                isList = true; // Sets is list to true
            loadTipoEmpleados();
            // If there is an id param in the url
            if( $routeParams.id ) {
                // Sets list to false
                isList = false;
                // Gets user by id with the url id
                // If success then sets empleado
                EmpleadoRepository.getById( $routeParams.id ).success( function( data ) {
                    if( !data.error ) {
                        $scope.empleado = data.data;
                    } else {
                        $scope.errors = data.message;
                    }
                }).error( function( error ) {
                    $scope.errors = error;
                });

                $scope.update = function( ) {
                    // Reduces the rol model to just the id
                    // updates the empleado on the repository
                    // If success send it to the Empleadoes list
                    $scope.empleado.tipo_empleado = $scope.empleado.tipo_empleado.id;
                    EmpleadoRepository.update( $scope.empleado ).success( function( data ) {
                        if( !data.error ) {
                            $scope.message = data.message;
                            $location.path( '/empleados/' );
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
                loadEmpleados();
                initEmpleado();
                $scope.add = function() {
                    // Reduces the rol model to just the id
                    // To send it to the repository
                    // If success and no error send to empleados list
                    $scope.empleado.tipoempleado_id = $scope.empleado.tipoempleado.id;
                    EmpleadoRepository.add( $scope.empleado ).success( function( data ) {
                        if( !data.error ) {
                            $scope.message = data.message;
                            $location.path( "/empleados/" );
                        } else {
                            $scope.errors = data.message;
                        }
                    }).error( function( error ) {
                        $scope.errors = error;
                    });
                }
                $scope.searchChange = function() {
                    $scope.tb_empleados = $scope.empleados.filter( p => p.nombre.includes( $scope.search_text ) );
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
                    .ok('Borrar Empleado')
                    .cancel('Cancelar');
                $mdDialog.show(confirm).then(function() {
                    // If confirmation message then remove the model by id
                    EmpleadoRepository.remove( id ).success( function( data ) {
                            if( !data.error ) {
                                isList ? loadEmpleados() : $location.path( '/empleados/' );
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
