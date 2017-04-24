/**
* Proveedores Controller
* Proveedores repository
* @author : Ramiro Gutierrez Alaniz
* @date : April 7th 2017
**/
app
    .factory( 'ProveedorRepository', [ 'CRUDService', function( CRUDService ) {
        var model = 'proveedor';
        return({
            getAll : () => CRUDService.getAll( model ),
            add : ( data ) => CRUDService.add( model, data ),
            getById : ( id ) => CRUDService.getById( model, id ),
            update : ( data ) => CRUDService.update( model, data ),
            remove : ( id ) => CRUDService.remove( model, id )
        });
    }])
    .controller( 'proveedores-controller', [    '$scope',
                                                '$rootScope',
                                                '$routeParams',
                                                '$location',
                                                '$mdDialog',
                                                'ProveedorRepository',
                                                'AuthRepository',
                                                function(   $scope,
                                                            $rootScope,
                                                            $routeParams,
                                                            $location,
                                                            $mdDialog,
                                                            ProveedorRepository,
                                                            AuthRepository  ) {
        if( AuthRepository.viewVerification() ) {
            $scope.title = 'Proveedores';
            var initProveedor = function() {
                    // Inits proveedor
                    $scope.proveedor =  {
                        razon_social : 'Razon Social Texto',
                        nombre_comercial : 'RestCont Desarrollo',
                        rfc : 'OLCM-750504',
                        codigo_proveedor : '125983123',
                        permiso_sedena : '12h3bhj5',
                        calle : 'Av. Fundición',
                        no_ext : 2305,
                        no_int : 19,
                        colonia : 'La Fundición',
                        cp : 99040,
                        localidad : ' ',
                        ciudad : 'Aguascalientes',
                        estado : 'Aguascalientes'
                    };
                },
                loadProveedores = function() {
                    // load users with repository
                    // If success then sets users with data
                    ProveedorRepository.getAll().success( function( data ) {
                        if( !data.error ) {
                            $scope.proveedores = data.data;
                            $scope.tb_proveedores = $scope.proveedores;
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
                // If success then sets proveedor
                ProveedorRepository.getById( $routeParams.id ).success( function( data ) {
                    if( !data.error ) {
                        $scope.proveedor = data.data;
                    } else {
                        $scope.errors = data.message;
                    }
                }).error( function( error ) {
                    $scope.errors = error;
                });

                $scope.update = function( ) {
                    // Reduces the rol model to just the id
                    // updates the proveedor on the repository
                    // If success send it to the Proveedores list
                    ProveedorRepository.update( $scope.proveedor ).success( function( data ) {
                        if( !data.error ) {
                            $scope.message = data.message;
                            $location.path( '/proveedores/' );
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
                loadProveedores();
                initProveedor();
                $scope.add = function() {
                    // Reduces the rol model to just the id
                    // To send it to the repository
                    // If success and no error send to proveedores list
                    ProveedorRepository.add( $scope.proveedor ).success( function( data ) {
                        if( !data.error ) {
                            $scope.message = data.message;
                            $location.path( "/proveedores/" );
                        } else {
                            $scope.errors = data.message;
                        }
                    }).error( function( error ) {
                        $scope.errors = error;
                    });
                }
                $scope.searchChange = function() {
                    $scope.tb_proveedores = $scope.proveedores.filter( p => p.nombre_comercial.includes( $scope.search_text ) );
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
                    .ok('Borrar Proveedor')
                    .cancel('Cancelar');
                $mdDialog.show(confirm).then(function() {
                    // If confirmation message then remove the model by id
                    ProveedorRepository.remove( id ).success( function( data ) {
                            if( !data.error ) {
                                isList ? loadProveedores() : $location.path( '/proveedores/' );
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
