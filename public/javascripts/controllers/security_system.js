app
    .factory( 'AuthRepository', [ '$http', '$cookies', '$location', '$rootScope', 'CRUDService', function( $http, $cookies, $location, $rootScope, CRUDService ) {
        return {
            login : ( username, password ) => $http.post( 'auth/login/', JSON.stringify( { username : username, password : password } ) ),
            logout : () => $http.post( 'auth/logout' ),
            removeSession : () => { $cookies.remove( 'userdata' ) },
            getFullAuthData : () => this.getSession().auth_data,
            getUserCat : () => $http.get( 'auth/usercat/' ),
            isSessionSet : function() {
                var userCookie = $cookies.get('userdata');
                return ( userCookie == undefined ) ? false : true;
            },
            getSession : function() {
                var userCookie = $cookies.get('userdata');
                return ( userCookie == undefined ) ? undefined : JSON.parse(userCookie);
            },
            viewVerification : function() {
                if( !this.isSessionSet() ) {
                    $rootScope.isLoggedIn.show_app = false;
                    $rootScope.isLoggedIn.show_auth = true;
                    $location.path( '/' );
                    return false;
                } else {
                    $rootScope.isLoggedIn.show_app = true;
                    $rootScope.isLoggedIn.show_auth = false;
                    return true;
                }
            },
            getAllRols : () => CRUDService.getAll( 'auth/rols' ),
            setMenu : function() {
                $rootScope.snd_menu_items = {
                    general : [
                        {
                            name : 'Overview',
                            icon : 'fa fa-eye',
                            status : 'active',
                            link : '#/'
                        },
                        {
                            name : 'Tareas',
                            icon : 'fa fa-calendar-check-o',
                            status : '',
                            link : '#/tareas'
                        }
                    ],
                    objects : [
                        {
                            name : 'Usuarios',
                            icon : 'fa fa-users',
                            status : '',
                            link : '#/users'
                        },
                        {
                            name : 'Proveedores',
                            icon : 'fa fa-industry',
                            status : '',
                            link : '#/proveedores'
                        },
                        {
                            name : 'Empleados',
                            icon : 'fa fa-vcard',
                            status : '',
                            link : '#/empleados'
                        },
                        {
                            name : 'Tipos de Empleado',
                            icon : 'fa fa-vcard',
                            status : '',
                            link : '#/tipoempleado'
                        },
                        {
                            name : 'Productos',
                            icon : 'fa fa-archive',
                            status : '',
                            link : '#/productos'
                        },
                        {
                            name : 'Tipos de Producto',
                            icon : 'fa fa-vcard',
                            status : '',
                            link : '#/tipoproducto'
                        },
                        {
                            name : 'Niveles',
                            icon : 'fa fa-cubes',
                            status : '',
                            link : '#/niveles'
                        },
                        {
                            name : 'Sub Niveles',
                            icon : 'fa fa-cube',
                            status : '',
                            link : '#/subniveles'
                        },
                        {
                            name : 'Procesos Mineros',
                            icon : 'fa fa-briefcase',
                            status : '',
                            link : '#/procesos'
                        },
                        {
                            name : 'Presupuestos',
                            icon : 'fa fa-money',
                            status : '',
                            link : '#/presupuestos'
                        },
                        {
                            name : 'Categorías',
                            icon : 'fa fa-th-list',
                            status : '',
                            link : '#/categorias'
                        },
                        {
                            name : 'Cuentas',
                            icon : 'fa fa-th-list',
                            status : '',
                            link : '#/cuentas'
                        }
                    ],
                    vales : [
                        {
                            name : 'Vales',
                            icon : 'fa fa-exclamation-triangle',
                            status : '',
                            link : '#/vales'
                        }
                    ],
                    reports : [
                        {
                            name : 'Receptores',
                            icon : 'fa fa-bar-chart',
                            status : '',
                            link : '#/receptores'
                        },
                        {
                            name : 'SEDENA',
                            icon : 'fa fa-file-excel-o',
                            status : '',
                            link : '#/sedena'
                        },
                        {
                            name : 'Salidas',
                            icon : 'fa fa-arrow-circle-right',
                            status : '',
                            link : '#/salidas'
                        },
                        {
                            name : 'Inventario',
                            icon : 'fa fa-list',
                            status : '',
                            link : '#/inventario'
                        }
                    ],
                    settings : [
                        {
                            name : 'Ajustes',
                            icon : 'fa fa-cogs',
                            status : '',
                            link : '#/settings'
                        }
                    ]
                };

                var session_o = this.getSession();

                if( session_o ) {
                    switch (session_o.rol.value) {
                        case 1:
                            // Rol super admin
                            //$rootScope.snd_menu_items.general.splice( 2, 2 );
                            break;
                        case 2:
                            // Rol admin
                            break;
                        case 3:
                            // Rol general
                            break;
                    }
                }
            },
            setActiveMenu : function( element ) {
                $rootScope.snd_menu_items.general.forEach( e => e.status = '' );
                $rootScope.snd_menu_items.vales.forEach( e => e.status = '' );

                if( $rootScope.snd_menu_items.settings ) {
                    $rootScope.snd_menu_items.settings.forEach( e => e.status = '' );
                }
                if( $rootScope.snd_menu_items.objects ) {
                    $rootScope.snd_menu_items.objects.forEach( e => e.status = '' );
                }

                element.status = 'active';
            }
        }
    }])
    .controller( 'auth-controller', [ '$scope', '$location', '$rootScope', 'AuthRepository', function( $scope, $location, $rootScope, AuthRepository ) {
        $scope.login = function() {
            AuthRepository.login( $scope.username, $scope.password ).success( function( data ) {
                if( data.error ) {
                    $scope.errors = data.message;
                } else {
                    $scope.message = data.message;
                    $rootScope.user_info = AuthRepository.getSession();
                    AuthRepository.setMenu();
                    $location.path( '/main' );
                }
            }).error( function( error ) {
                $scope.errors = error;
            });
        };
    }]);
