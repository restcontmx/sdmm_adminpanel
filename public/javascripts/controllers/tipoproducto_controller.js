/**
* Tipo Producto Controller
* Tipo Producto repository
* @author : Ramiro Gutierrez Alaniz
* @date : April 7th 2017
**/
app
    .factory( 'TipoProductoRepository', [ 'CRUDService', function( CRUDService ) {
        var model = 'tipoproducto';
        return({
            getAll : () => CRUDService.getAll( model ),
            add : ( data ) => CRUDService.add( model, data ),
            getById : ( id ) => CRUDService.getById( model, id ),
            update : ( data ) => CRUDService.update( model, data ),
            remove : ( id ) => CRUDService.remove( model, id )
        });
    }])
    .controller( 'tipoproducto-controller', [   '$scope',
                                                '$rootScope',
                                                '$routeParams',
                                                '$location',
                                                '$mdDialog',
                                                'TipoProductoRepository',
                                                'AuthRepository',
                                                function(   $scope,
                                                            $rootScope,
                                                            $routeParams,
                                                            $location,
                                                            $mdDialog,
                                                            TipoProductoRepository,
                                                            AuthRepository  ) {
        if( AuthRepository.viewVerification() ) {
            $scope.title = 'Tipo Producto';
            var initTipoProducto = function() {
                    // Inits tipoproducto
                    $scope.tipoproducto =  {
                    };
                },
                loadTipoProductos = function() {
                    // load users with repository
                    // If success then sets users with data
                    TipoProductoRepository.getAll().success( function( data ) {
                        if( !data.error ) {
                            $scope.tipoproductos = data.data;
                            $scope.tb_tipoproductos = $scope.tipoproductos;
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
                // If success then sets tipoproducto
                TipoProductoRepository.getById( $routeParams.id ).success( function( data ) {
                    if( !data.error ) {
                        $scope.tipoproducto = data.data;
                    } else {
                        $scope.errors = data.message;
                    }
                }).error( function( error ) {
                    $scope.errors = error;
                });

                $scope.update = function( ) {
                    // Reduces the rol model to just the id
                    // updates the tipoproducto on the repository
                    // If success send it to the TipoProducto list
                    TipoProductoRepository.update( $scope.tipoproducto ).success( function( data ) {
                        if( !data.error ) {
                            $scope.message = data.message;
                            $location.path( '/tipoproducto/' );
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
                loadTipoProductos();
                initTipoProducto();
                $scope.add = function() {
                    // Reduces the rol model to just the id
                    // To send it to the repository
                    // If success and no error send to tipoproducto list
                    TipoProductoRepository.add( $scope.tipoproducto ).success( function( data ) {
                        if( !data.error ) {
                            $scope.message = data.message;
                            $location.path( "/tipoproducto/" );
                        } else {
                            $scope.errors = data.message;
                        }
                    }).error( function( error ) {
                        $scope.errors = error;
                    });
                }
                $scope.searchChange = function() {
                    $scope.tb_tipoproducto = $scope.tipoproducto.filter( p => p.nombre_comercial.includes( $scope.search_text ) );
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
                    .ok('Borrar Tipo Producto')
                    .cancel('Cancelar');
                $mdDialog.show(confirm).then(function() {
                    // If confirmation message then remove the model by id
                    TipoProductoRepository.remove( id ).success( function( data ) {
                            if( !data.error ) {
                                isList ? loadTipoProductos() : $location.path( '/tipoproducto/' );
                            } else {
                                $scope.errors = data.message;
                            }
                        }).error( function(error) {c
                            $scope.errors =  "Ha habido un error.";
                        });
                }, null );
            };
        }
    }]);
