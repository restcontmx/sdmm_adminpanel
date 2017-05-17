/**
* Vales controller
* Vales repository
* This will manage the creation of vales
* @author : Ramiro Gutierrez Alaniz
* @date : april 17th 2017
**/
app
    .factory( 'ValeRepository', [ 'CRUDService', function( CRUDService ) {
        var model = 'vale';
        return({
            getAll : () => CRUDService.getAll( model ),
            add : ( data ) => CRUDService.add( model, data ),
            getById : ( id ) => CRUDService.getById( model, id ),
            update : ( data ) => CRUDService.update( model, data ),
            remove : ( id ) => CRUDService.remove( model, id )
        });
    }])
    .controller( 'vales-controller', [  '$scope',
                                        '$rootScope',
                                        '$location',
                                        '$routeParams',
                                        'ValeRepository',
                                        'ProveedorRepository',
                                        'ProductoRepository',
                                        'EmpleadoRepository',
                                        'CuentaRepository',
                                        'AuthRepository',
                                        function(   $scope,
                                                    $rootScope,
                                                    $location,
                                                    $routeParams,
                                                    ValeRepository,
                                                    ProveedorRepository,
                                                    ProductoRepository,
                                                    EmpleadoRepository,
                                                    CuentaRepository,
                                                    AuthRepository  ) {

        if( AuthRepository.viewVerification() ) {

            $scope.title = 'Vales';
            var initVale = function() {
                    // Inits vale
                    $scope.vale =  {
                        compania : {},
                        autor : {},
                        polvorero : {},
                        detalles : []
                    };
                },
                loadVales = function() {
                    // load vales with repository
                    // If success then sets vales with data
                    ValeRepository.getAll().success( function( data ) {
                        if( !data.error ) {
                            $scope.vales = data.data;
                            $scope.tb_vales = $scope.vales;
                        } else {
                            $scope.errors = data.message;
                        }
                    }).error( function( error ) {
                        $scope.errors = error;
                    });
                },
                loadProveedores = function() {
                    ProveedorRepository.getAll().success( function( data ) {
                        if( !data.error ) {
                            $scope.proveedores = data.data;
                        } else {
                            $scope.errors = data.message;
                        }
                    }).error( function( error ) {
                        $scope.errors = error;
                    });
                },
                loadEmpleados = function() {
                    // load proveedores with repository
                    // If success then sets proveedores with data
                    EmpleadoRepository.getAll().success( function( data ) {
                        if( !data.error ) {
                            $scope.empleados = data.data;
                            $scope.cargadores = $scope.empleados.filter( e => e.tipo_empleado.name == 'Cargador' );
                            $scope.polvoreros = $scope.empleados.filter( e => e.tipo_empleado.name == 'Polvorero' );
                        } else {
                            $scope.errors = data.message;
                        }
                    }).error( function( error ) {
                        $scope.errors = error;
                    });
                },
                loadProductos = function() {
                    // load productos with repository
                    // If success then sets productos with data
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
                loadCuentas = function() {
                    // loads all cuentas with repository
                    // if success then sets cuentas with data
                    CuentaRepository.getAll().success( function( data ) {
                        if( !data.error ) {
                            $scope.cuentas = data.data;
                        } else {
                            $scope.errors = data.message;
                        }
                    }).error( function( error ) {
                        $scope.errors = error;
                    });
                },
                isList = true; // Sets is list to true
            loadProveedores();
            loadProductos();
            loadEmpleados();
            loadCuentas();
            // If there is an id param in the url
            if( $routeParams.id ) {
                // Sets list to false
                isList = false;
                // Gets user by id with the url id
                // If success then sets vale
                ValeRepository.getById( $routeParams.id ).success( function( data ) {
                    if( !data.error ) {
                        $scope.vale = data.data;
                    } else {
                        $scope.errors = data.message;
                    }
                }).error( function( error ) {
                    $scope.errors = error;
                });

                $scope.update = function( ) {
                    // Reduces the rol model to just the id
                    // updates the vale on the repository
                    // If success send it to the Valees list
                    $scope.vale.tipo_vale = $scope.vale.tipo_vale.id;
                    ValeRepository.update( $scope.vale ).success( function( data ) {
                        if( !data.error ) {
                            $scope.message = data.message;
                            $location.path( '/vales/' );
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
                loadVales();
                initVale();
                var today = new Date(),
                    dd = today.getDate(),
                    mm = today.getMonth()+1,
                    yyyy = today.getFullYear();
                if ( dd < 10 ) {
                    dd = '0' + dd
                }
                if ( mm < 10 ) {
                    mm = '0' + mm
                }
                $scope.todays_date = mm + '/' + dd + '/' + yyyy;
                $scope.add = function() {
                    // Reduces the rol model to just the id
                    // To send it to the repository
                    // If success and no error send to vales list
                    $scope.vale.polvorero_id = $scope.vale.polvorero.id;
                    $scope.vale.cargador1_id = $scope.vale.cargador1.id;
                    $scope.vale.cargador2_id = $scope.vale.cargador2.id;
                    $scope.vale.compania_id = $scope.vale.compania.id;
                    $scope.vale.cuenta_id = $scope.vale.cuenta.id;
                    $scope.vale.detalles.forEach(function(d){
                        d.producto_id = d.producto.id;
                    });
                    ValeRepository.add( $scope.vale ).success( function( data ) {
                        if( !data.error ) {
                            $scope.message = data.message;
                            $location.path( "/vales/" );
                        } else {
                            $scope.errors = data.message;
                        }
                    }).error( function( error ) {
                        $scope.errors = error;
                    });
                }

                $scope.searchChange = function() {
                    $scope.tb_vales = $scope.vales.filter( p => p.nombre.includes( $scope.search_text ) );
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
                    .ok('Borrar Vale')
                    .cancel('Cancelar');
                $mdDialog.show(confirm).then(function() {
                    // If confirmation message then remove the model by id
                    ValeRepository.remove( id ).success( function( data ) {
                            if( !data.error ) {
                                isList ? loadVales() : $location.path( '/vales/' );
                            } else {
                                $scope.errors = data.message;
                            }
                        }).error( function(error) {
                            $scope.errors =  "Ha habido un error.";
                        });
                }, null );
            };
            $scope.addDetail = function() {
                $scope.vale.detalles.push({producto : {}, cantidad : 0, producto_id : 0 });
            };
        }
    }]);
