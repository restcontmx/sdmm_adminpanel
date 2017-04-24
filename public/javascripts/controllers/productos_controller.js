/**
* Productos controller
* Productos repository
* @author : Ramiro Gutierrez Alaniz
* @date : april 17th 2017
**/
app
    .factory( 'ProductoRepository', [ 'CRUDService', function( CRUDService ) {
        var model = 'producto';
        return({
            getAll : () => CRUDService.getAll( model ),
            add : ( data ) => CRUDService.add( model, data ),
            getById : ( id ) => CRUDService.getById( model, id ),
            update : ( data ) => CRUDService.update( model, data ),
            remove : ( id ) => CRUDService.remove( model, data )
        })
    }])
    .controller( 'productos-controller', [  '$scope',
                                            '$rootScope',
                                            '$routeParams',
                                            '$location',
                                            'ProductoRepository',
                                            'TipoProductoRepository',
                                            'AuthRepository',
                                            function(   $scope,
                                                        $rootScope,
                                                        $routeParams,
                                                        $location,
                                                        ProductoRepository,
                                                        TipoProductoRepository,
                                                        AuthRepository  ) {
        if( AuthRepository.viewVerification() ) {
            $scope.title = "Productos";
            var initProducto = function() {
                    // Inits producto
                    $scope.producto =  {
                        tipoproducto : {}
                    };
                },
                loadProductos = function() {
                    // load users with repository
                    // If success then sets users with data
                    ProductoRepository.getAll().success( function( data ) {
                        if( !data.error ) {
                            $scope.productos = data.data;
                            $scope.tb_productos = $scope.productos;
                        } else {
                            $scope.errors = data.message;
                        }
                    }).error( function( error ) {
                        $scope.errors = error;
                    });
                },
                loadTipoProductos = function() {
                    // load users with repository
                    // If success then sets users with data
                    TipoProductoRepository.getAll().success( function( data ) {
                        if( !data.error ) {
                            $scope.tipoproductos = data.data;
                        } else {
                            $scope.errors = data.message;
                        }
                    }).error( function( error ) {
                        $scope.errors = error;
                    });
                },
                isList = true; // Sets is list to true
            loadTipoProductos();
            // If there is an id param in the url
            if( $routeParams.id ) {
                // Sets list to false
                isList = false;
                // Gets user by id with the url id
                // If success then sets producto
                ProductoRepository.getById( $routeParams.id ).success( function( data ) {
                    if( !data.error ) {
                        $scope.producto = data.data;
                    } else {
                        $scope.errors = data.message;
                    }
                }).error( function( error ) {
                    $scope.errors = error;
                });

                $scope.update = function( ) {
                    // Reduces the rol model to just the id
                    // updates the producto on the repository
                    // If success send it to the Productos list
                    ProductoRepository.update( $scope.producto ).success( function( data ) {
                        if( !data.error ) {
                            $scope.message = data.message;
                            $location.path( '/productos/' );
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
                loadProductos();
                initProducto();
                $scope.add = function() {
                    // Reduces the rol model to just the id
                    // To send it to the repository
                    // If success and no error send to productos list
                    $scope.producto.tipoproducto_id = $scope.producto.tipoproducto.id;
                    ProductoRepository.add( $scope.producto ).success( function( data ) {
                        if( !data.error ) {
                            $scope.message = data.message;
                            $location.path( "/productos/" );
                        } else {
                            $scope.errors = data.message;
                        }
                    }).error( function( error ) {
                        $scope.errors = error;
                    });
                }
                $scope.searchChange = function() {
                    $scope.tb_productos = $scope.productos.filter( p => p.nombre.includes( $scope.search_text ) );
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
                    .ok('Borrar Producto')
                    .cancel('Cancelar');
                $mdDialog.show(confirm).then(function() {
                    // If confirmation message then remove the model by id
                    ProductoRepository.remove( id ).success( function( data ) {
                            if( !data.error ) {
                                isList ? loadProductos() : $location.path( '/productos/' );
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
