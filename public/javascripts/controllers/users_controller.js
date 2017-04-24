/**
* User repository
* User Controller
* @author : Ramiro Gutierrez Alaniz
* @date : april 17th 2017
**/
app
    .factory( 'UserRepository', [ 'CRUDService', function( CRUDService ) {
        var model = 'user';
        return({
            getAll : () => CRUDService.getAll( model ),
            add : ( data ) => CRUDService.add( model, data ),
            getById : ( id ) => CRUDService.getById( model, id ),
            update : ( data ) => CRUDService.update( model, data ),
            remove : ( id ) => CRUDService.remove( model, id )
        });
    }])
    .controller( 'users-controller', [  '$scope',
                                        '$rootScope',
                                        '$routeParams',
                                        '$location',
                                        '$mdDialog',
                                        'UserRepository',
                                        'AuthRepository',
                                        function(   $scope,
                                                    $rootScope,
                                                    $routeParams,
                                                    $location,
                                                    $mdDialog,
                                                    UserRepository,
                                                    AuthRepository) {
        if( AuthRepository.viewVerification() ) {
            $scope.title = 'Usuarios';
            var initUser = function() {
                    // Inits user and rol variable
                    $scope.user =  {
                        rol : {}
                    }
                },
                loadUsers = function() {
                    // load users with repository
                    // If success then sets users with data
                    UserRepository.getAll().success( function( data ) {
                        if( !data.error ) {
                            $scope.users = data.data;
                            $scope.tb_users = $scope.users;
                        } else {
                            $scope.errors = data.message;
                        }
                    }).error( function( error ) {
                        $scope.errors = error;
                    });
                },
                loadRols = function() {
                    // load rols with repository
                    // Is success then sets rols variable with data
                    AuthRepository.getAllRols().success( function( data ) {
                        if( !data.error ) {
                            $scope.rols = data.data;
                        } else {
                            $scope.errors = data.message;
                        }
                    }).error( function( error ) {
                        $scope.errors = error;
                    });
                },
                isList = true; // Sets is list to true
            // Load rols
            loadRols();
            // If there is an id param in the url
            if( $routeParams.id ) {
                // Sets list to false
                isList = false;
                // Gets user by id with the url id
                // If success then sets auth_model, user and users rol
                UserRepository.getById( $routeParams.id ).success( function( data ) {
                    if( !data.error ) {
                        $scope.auth_model = data.data;
                        $scope.user = $scope.auth_model.user;
                        $scope.user.rol = $scope.auth_model.rol;
                    } else {
                        $scope.errors = data.message;
                    }
                }).error( function( error ) {
                    $scope.errors = error;
                });

                $scope.update = function( ) {
                    // Reduces the rol model to just the id
                    // updates the user on the repository
                    // If success send it to the users list
                    $scope.user.rol = $scope.user.rol.id;
                    UserRepository.update( $scope.user ).success( function( data ) {
                        if( !data.error ) {
                            $scope.message = data.message;
                            $location.path( '/users/' );
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
                loadUsers();
                initUser();
                $scope.add = function() {
                    // Reduces the rol model to just the id
                    // To send it to the repository
                    // If success and no error send to users list
                    $scope.user.rol = $scope.user.rol.id;
                    UserRepository.add( $scope.user ).success( function( data ) {
                        if( !data.error ) {
                            $scope.message = data.message;
                            $location.path( "/users/" );
                        } else {
                            $scope.errors = data.message;
                        }
                    }).error( function( error ) {
                        $scope.errors = error;
                    });
                }
            }

            $scope.delete = function( e, id ) {
                // This shows a modal dialog then if confirmation
                // Deletes the model with the repository function
                var confirm = $mdDialog.confirm()
                    .title('¿Desea borrar el registro?')
                    .textContent("Después de borrar esto no podrá ser recuperado.")
                    .ariaLabel('Lucky day')
                    .targetEvent(e)
                    .ok('Borrar Usuario')
                    .cancel('Cancelar');
                $mdDialog.show(confirm).then(function() {
                    // If confirmation message then remove the model by id
                    UserRepository.remove( id ).success( function( data ) {
                            if( !data.error ) {
                                isList ? loadUsers() : $location.path( '/users/' );
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
