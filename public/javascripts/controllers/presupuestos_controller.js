/**
* Presupuestos Controller
* Presupuestos repository
* @author : Ramiro Gutierrez Alaniz
* @date : April 7th 2017
**/
app
    .factory( 'PresupuestoRepository', [ 'CRUDService', function( CRUDService ) {
        var model = 'presupuesto';
        return({
            getAll : () => CRUDService.getAll( model ),
            add : ( data ) => CRUDService.add( model, data ),
            getById : ( id ) => CRUDService.getById( model, id ),
            update : ( data ) => CRUDService.update( model, data ),
            remove : ( id ) => CRUDService.remove( model, id )
        });
    }])
    .controller( 'presupuestos-controller', [   '$scope',
                                                '$rootScope',
                                                '$routeParams',
                                                '$location',
                                                '$mdDialog',
                                                'PresupuestoRepository',
                                                'ProductoRepository',
                                                'AuthRepository',
                                                function(   $scope,
                                                            $rootScope,
                                                            $routeParams,
                                                            $location,
                                                            $mdDialog,
                                                            PresupuestoRepository,
                                                            ProductoRepository,
                                                            AuthRepository  ) {
        if( AuthRepository.viewVerification() ) {
            $scope.title = 'Presupuestos';
            var initPresupuesto = function() {
                    // Inits presupuesto
                    $scope.presupuesto =  {
                        nivel : {},
                        procesominero : {}
                    };
                },
                loadPresupuestos = function() {
                    // load users with repository
                    // If success then sets users with data
                    PresupuestoRepository.getAll().success( function( data ) {
                        if( !data.error ) {
                            $scope.presupuestos = data.data;
                            $scope.tb_presupuestos = $scope.presupuestos;
                        } else {
                            $scope.errors = data.message;
                        }
                    }).error( function( error ) {
                        $scope.errors = error;
                    });
                },
                loadProductos = function() {
                    // load users with repository
                    // If success then sets users with data
                    ProductoRepository.getAll().success( function( data ) {
                        if( !data.error ) {
                            $scope.productos = data.data;
                        } else {
                            $scope.errors = data.message;
                        }
                    }).error( function( error ) {
                        $scope.errors = error;
                    });
                },
                loadYears = function() {
                    // load users with repository
                    // If success then sets users with data
                    $scope.years = [ 2015, 2016, 2017, 2018 ];
                },
                isList = true; // Sets is list to true
            loadYears();
            loadProductos();
            // If there is an id param in the url
            if( $routeParams.id ) {
                // Sets list to false
                isList = false;
                // Gets user by id with the url id
                // If success then sets presupuesto
                PresupuestoRepository.getById( $routeParams.id ).success( function( data ) {
                    if( !data.error ) {
                        $scope.presupuesto = data.data;
                    } else {
                        $scope.errors = data.message;
                    }
                }).error( function( error ) {
                    $scope.errors = error;
                });

                $scope.update = function( ) {
                    // Reduces the rol model to just the id
                    // updates the presupuesto on the repository
                    // If success send it to the Presupuestoes list
                    PresupuestoRepository.update( $scope.presupuesto ).success( function( data ) {
                        if( !data.error ) {
                            $scope.message = data.message;
                            $location.path( '/presupuestos/' );
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
                loadPresupuestos();
                initPresupuesto();
                $scope.add = function() {
                    // Reduces the rol model to just the id
                    // To send it to the repository
                    // If success and no error send to presupuestos list
                    $scope.presupuesto.producto_id = $scope.presupuesto.producto.id;
                    PresupuestoRepository.add( $scope.presupuesto ).success( function( data ) {
                        if( !data.error ) {
                            $scope.message = data.message;
                            $location.path( "/presupuestos/" );
                        } else {
                            $scope.errors = data.message;
                        }
                    }).error( function( error ) {
                        $scope.errors = error;
                    });
                }
                $scope.searchChange = function() {
                    $scope.tb_presupuestos = $scope.presupuestos.filter( p => p.nombre.includes( $scope.search_text ) );
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
                    .ok('Borrar Presupuesto')
                    .cancel('Cancelar');
                $mdDialog.show(confirm).then(function() {
                    // If confirmation message then remove the model by id
                    PresupuestoRepository.remove( id ).success( function( data ) {
                            if( !data.error ) {
                                isList ? loadPresupuestos() : $location.path( '/presupuestos/' );
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
