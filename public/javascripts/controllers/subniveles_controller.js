/**
* SubNiveles Controller
* SubNiveles repository
* @author : Ramiro Gutierrez Alaniz
* @date : April 7th 2017
**/
app
    .factory( 'SubNivelRepository', [ 'CRUDService', function( CRUDService ) {
        var model = 'subnivel';
        return({
            getAll : () => CRUDService.getAll( model ),
            add : ( data ) => CRUDService.add( model, data ),
            getById : ( id ) => CRUDService.getById( model, id ),
            update : ( data ) => CRUDService.update( model, data ),
            remove : ( id ) => CRUDService.remove( model, id )
        });
    }])
    .controller( 'subniveles-controller', [      '$scope',
                                                '$rootScope',
                                                '$routeParams',
                                                '$location',
                                                '$mdDialog',
                                                'NivelRepository',
                                                'SubNivelRepository',
                                                'AuthRepository',
                                                function(   $scope,
                                                            $rootScope,
                                                            $routeParams,
                                                            $location,
                                                            $mdDialog,
                                                            NivelRepository,
                                                            SubNivelRepository,
                                                            AuthRepository  ) {
        if( AuthRepository.viewVerification() ) {
            $scope.title = 'SubNiveles';
            var initSubNivel = function() {
                    // Inits subnivel
                    $scope.subnivel =  {
                        nivel : {}
                    };
                },
                loadSubNiveles = function() {
                    // load users with repository
                    // If success then sets users with data
                    SubNivelRepository.getAll().success( function( data ) {
                        if( !data.error ) {
                            $scope.subniveles = data.data;
                            $scope.tb_subniveles = $scope.subniveles;
                        } else {
                            $scope.errors = data.message;
                            console.log($scope.errors);
                        }
                    }).error( function( error ) {
                        $scope.errors = error;
                    });
                },
                loadNiveles = function() {
                    // load users with repository
                    // If success then sets users with data
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
                loadActivos = function() {
                    $scope.activos = [ 'Activo', 'Inactivo' ];
                },
                isList = true; // Sets is list to true
            loadNiveles();
            loadActivos();
            // If there is an id param in the url
            if( $routeParams.id ) {
                // Sets list to false
                isList = false;
                // Gets user by id with the url id
                // If success then sets subnivel
                SubNivelRepository.getById( $routeParams.id ).success( function( data ) {
                    if( !data.error ) {
                        $scope.subnivel = data.data;
                    } else {
                        $scope.errors = data.message;
                    }
                }).error( function( error ) {
                    $scope.errors = error;
                });

                $scope.update = function( ) {
                    // Reduces the rol model to just the id
                    // updates the subnivel on the repository
                    // If success send it to the SubNiveles list
                    SubNivelRepository.update( $scope.subnivel ).success( function( data ) {
                        if( !data.error ) {
                            $scope.message = data.message;
                            $location.path( '/subniveles/' );
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
                loadSubNiveles();
                initSubNivel();
                $scope.add = function() {
                    // Reduces the rol model to just the id
                    // To send it to the repository
                    // If success and no error send to subniveles list
                    $scope.subnivel.nivel_id = $scope.subnivel.nivel.id;
                    $scope.subnivel.status = $scope.subnivel.status == 'Activo' ? 1 : 0;
                    SubNivelRepository.add( $scope.subnivel ).success( function( data ) {
                        if( !data.error ) {
                            $scope.message = data.message;
                            $location.path( "/subniveles/" );
                        } else {
                            $scope.errors = data.message;
                        }
                    }).error( function( error ) {
                        $scope.errors = error;
                    });
                }
                $scope.searchChange = function() {
                    $scope.tb_subniveles = $scope.subniveles.filter( p => p.nombre.includes( $scope.search_text ) );
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
                    .ok('Borrar SubNivel')
                    .cancel('Cancelar');
                $mdDialog.show(confirm).then(function() {
                    // If confirmation message then remove the model by id
                    SubNivelRepository.remove( id ).success( function( data ) {
                            if( !data.error ) {
                                isList ? loadSubNiveles() : $location.path( '/subniveles/' );
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
