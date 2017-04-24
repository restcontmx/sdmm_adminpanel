/**
* Categorias Controller
* Categorias repository
* @author : Ramiro Gutierrez Alaniz
* @date : April 7th 2017
**/
app
    .factory( 'CategoriaRepository', [ 'CRUDService', function( CRUDService ) {
        var model = 'categoria';
        return({
            getAll : () => CRUDService.getAll( model ),
            add : ( data ) => CRUDService.add( model, data ),
            getById : ( id ) => CRUDService.getById( model, id ),
            update : ( data ) => CRUDService.update( model, data ),
            remove : ( id ) => CRUDService.remove( model, id )
        });
    }])
    .controller( 'categorias-controller', [      '$scope',
                                                '$rootScope',
                                                '$routeParams',
                                                '$location',
                                                '$mdDialog',
                                                'CategoriaRepository',
                                                'ProcesoMineroRepository',
                                                'NivelRepository',
                                                'AuthRepository',
                                                function(   $scope,
                                                            $rootScope,
                                                            $routeParams,
                                                            $location,
                                                            $mdDialog,
                                                            CategoriaRepository,
                                                            ProcesoMineroRepository,
                                                            NivelRepository,
                                                            AuthRepository  ) {
        if( AuthRepository.viewVerification() ) {
            $scope.title = 'Categorias';
            var initCategoria = function() {
                    // Inits categoria
                    $scope.categoria =  {
                        nivel : {},
                        procesominero : {}
                    };
                },
                loadCategorias = function() {
                    // load users with repository
                    // If success then sets users with data
                    CategoriaRepository.getAll().success( function( data ) {
                        if( !data.error ) {
                            $scope.categorias = data.data;
                            $scope.tb_categorias = $scope.categorias;
                        } else {
                            $scope.errors = data.message;
                        }
                    }).error( function( error ) {
                        $scope.errors = error;
                    });
                },
                loadNiveles = function() {
                    NivelRepository.getAll().success( function( data ) {
                        if( !data.error ) {
                            $scope.niveles = data.data;
                        } else {
                            $scope.errors = data.message;
                        }
                    }).error( function( error ) {
                        $scope.errors = error;
                    });
                },
                loadProcesoMineros = function() {
                    ProcesoMineroRepository.getAll().success( function( data ) {
                        if( !data.error ) {
                            $scope.procesomineros = data.data;
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
                // If success then sets categoria
                CategoriaRepository.getById( $routeParams.id ).success( function( data ) {
                    if( !data.error ) {
                        $scope.categoria = data.data;
                    } else {
                        $scope.errors = data.message;
                    }
                }).error( function( error ) {
                    $scope.errors = error;
                });

                $scope.update = function( ) {
                    // Reduces the rol model to just the id
                    // updates the categoria on the repository
                    // If success send it to the Categoriaes list
                    CategoriaRepository.update( $scope.categoria ).success( function( data ) {
                        if( !data.error ) {
                            $scope.message = data.message;
                            $location.path( '/categorias/' );
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
                loadCategorias();
                loadNiveles();
                loadProcesoMineros();
                initCategoria();
                $scope.add = function() {
                    // Reduces the rol model to just the id
                    // To send it to the repository
                    // If success and no error send to categorias list
                    $scope.categoria.nivel_id = $scope.categoria.nivel.id;
                    $scope.categoria.procesominero_id = $scope.categoria.procesominero.id;
                    CategoriaRepository.add( $scope.categoria ).success( function( data ) {
                        if( !data.error ) {
                            $scope.message = data.message;
                            $location.path( "/categorias/" );
                        } else {
                            $scope.errors = data.message;
                        }
                    }).error( function( error ) {
                        $scope.errors = error;
                    });
                }
                $scope.searchChange = function() {
                    $scope.tb_categorias = $scope.categorias.filter( p => p.nombre.includes( $scope.search_text ) );
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
                    .ok('Borrar Categoria')
                    .cancel('Cancelar');
                $mdDialog.show(confirm).then(function() {
                    // If confirmation message then remove the model by id
                    CategoriaRepository.remove( id ).success( function( data ) {
                            if( !data.error ) {
                                isList ? loadCategorias() : $location.path( '/categorias/' );
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
