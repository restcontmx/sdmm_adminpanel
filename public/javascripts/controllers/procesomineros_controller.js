/**
* ProcesoMineros Controller
* ProcesoMineros repository
* @author : Ramiro Gutierrez Alaniz
* @date : April 7th 2017
**/
app
    .factory( 'ProcesoMineroRepository', [ 'CRUDService', function( CRUDService ) {
        var model = 'procesominero';
        return({
            getAll : () => CRUDService.getAll( model ),
            add : ( data ) => CRUDService.add( model, data ),
            getById : ( id ) => CRUDService.getById( model, id ),
            update : ( data ) => CRUDService.update( model, data ),
            remove : ( id ) => CRUDService.remove( model, id )
        });
    }])
    .controller( 'procesomineros-controller', [ '$scope',
                                                '$rootScope',
                                                '$routeParams',
                                                '$location',
                                                '$mdDialog',
                                                'ProcesoMineroRepository',
                                                'AuthRepository',
                                                function(   $scope,
                                                            $rootScope,
                                                            $routeParams,
                                                            $location,
                                                            $mdDialog,
                                                            ProcesoMineroRepository,
                                                            AuthRepository  ) {
        if( AuthRepository.viewVerification() ) {
            $scope.title = 'ProcesoMineros';
            var initProcesoMinero = function() {
                    // Inits procesominero
                    $scope.procesominero =  {
                        nivel : {},
                        procesominero : {}
                    };
                },
                loadProcesoMineros = function() {
                    // load users with repository
                    // If success then sets users with data
                    ProcesoMineroRepository.getAll().success( function( data ) {
                        if( !data.error ) {
                            $scope.procesomineros = data.data;
                            $scope.tb_procesomineros = $scope.procesomineros;
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
                // If success then sets procesominero
                ProcesoMineroRepository.getById( $routeParams.id ).success( function( data ) {
                    if( !data.error ) {
                        $scope.procesominero = data.data;
                    } else {
                        $scope.errors = data.message;
                    }
                }).error( function( error ) {
                    $scope.errors = error;
                });

                $scope.update = function( ) {
                    // Reduces the rol model to just the id
                    // updates the procesominero on the repository
                    // If success send it to the ProcesoMineroes list
                    ProcesoMineroRepository.update( $scope.procesominero ).success( function( data ) {
                        if( !data.error ) {
                            $scope.message = data.message;
                            $location.path( '/procesos/' );
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
                loadProcesoMineros();
                initProcesoMinero();
                $scope.add = function() {
                    // Reduces the rol model to just the id
                    // To send it to the repository
                    // If success and no error send to procesomineros list
                    ProcesoMineroRepository.add( $scope.procesominero ).success( function( data ) {
                        if( !data.error ) {
                            $scope.message = data.message;
                            $location.path( "/procesos/" );
                        } else {
                            $scope.errors = data.message;
                        }
                    }).error( function( error ) {
                        $scope.errors = error;
                    });
                }
                $scope.searchChange = function() {
                    $scope.tb_procesomineros = $scope.procesomineros.filter( p => p.nombre.includes( $scope.search_text ) );
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
                    .ok('Borrar ProcesoMinero')
                    .cancel('Cancelar');
                $mdDialog.show(confirm).then(function() {
                    // If confirmation message then remove the model by id
                    ProcesoMineroRepository.remove( id ).success( function( data ) {
                            if( !data.error ) {
                                isList ? loadProcesoMineros() : $location.path( '/procesomineros/' );
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
