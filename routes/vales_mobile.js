/**
*   vale routes
*   @author : Ramiro Gutierrez Alaniz
*   @date : April 17th, 2017
**/
var express = require( 'express' );
var bodyParser = require( 'body-parser' );
var urlLib = require( 'url' );
var request = require( 'request' );
var http_helper = require( '../helpers/http_helper_ne' );
var router = express.Router();
var jsonParser = bodyParser.json();

/**
* get all objects pettition for mobile
**/
router.get( '/', jsonParser, function( req, res ) {
    request(
        {
            url : http_helper.get_api_uri( 'vale/', '' ),
            method : 'GET',
            json : true,
            headers : {
                'Content-type' : 'application/json',
                'Authorization' : http_helper.get_basic_auth_app_header()
            }
        },
        function( error, response, body ) {
            if(error){
                res.send(error);
            }
            if( body.data ) {
                body.data.forEach( function(item) {
                    item.user_id = item.user.id;
                    item.polvorero_id = item.polvorero.id;
                    item.cargador1_id = item.cargador1.id;
                    item.cargador2_id = item.cargador2.id;
                    item.compania_id = item.compania.id;
                });
            }
            res.send( body );
        }
    );
});

/**
* post vale
**/
router.post( '/', jsonParser, function( req, res ) {
    console.log(req.body);
    request(
        {
            url : http_helper.get_api_uri( 'vale/', '' ),
            method : 'POST',
            json : true,
            form : req.body,
            headers : {
                'Content-type' : 'application/json',
                'Authorization' : http_helper.get_basic_auth_app_header()
            }
        },
        function( error, response, body ) {
            if(error){
                res.send(error);
            }
            res.send( body );
        }
    );
});

/**
* get all objects pettition for mobile
**/
router.get( '/detalle/:id', jsonParser, function( req, res ) {
    request(
        {
            url : http_helper.get_api_uri( 'vale/detalle/', req.params.id ),
            method : 'GET',
            json : true,
            headers : {
                'Content-type' : 'application/json',
                'Authorization' : http_helper.get_basic_auth_app_header()
            }
        },
        function( error, response, body ) {
            if(error){
                res.send(error);
            }
            if( body.data ) {
                body.data.forEach( function(item) {
                    item.producto_id = item.producto.id;
                    item.producto_nombre = item.producto.nombre;
                    item.vale_id = item.vale.id;
                });
            }
            res.send( body );
        }
    );
});

/**
* get all registers by detalle id
**/
router.get( '/detalle/registro/:id', jsonParser, function( req, res ) {
    request(
        {
            url : http_helper.get_api_uri( 'vale/detalle/registro/', req.params.id ),
            method : 'GET',
            json : true,
            headers : {
                'Content-type' : 'application/json',
                'Authorization' : http_helper.get_basic_auth_app_header()
            }
        },
        function( error, response, body ) {
            if(error){
                res.send(error);
            }
            if( body.data ) {
                body.data.forEach( function(item) {
                    item.user_id = item.user.id;
                    item.detallevale_id = item.detallevale.id;
                });
            }
            res.send( body );
        }
    );
});

/**
* get all registers by detalle id
**/
router.get( '/detalle/registro/:id', jsonParser, function( req, res ) {
    request(
        {
            url : http_helper.get_api_uri( 'vale/detalle/registro/', req.params.id ),
            method : 'GET',
            json : true,
            headers : {
                'Content-type' : 'application/json',
                'Authorization' : http_helper.get_basic_auth_app_header()
            }
        },
        function( error, response, body ) {
            if(error){
                res.send(error);
            }
            if( body.data ) {
                body.data.forEach( function(item) {
                    item.user_id = item.user.id;
                    item.detallevale_id = item.detallevale.id;
                });
            }
            res.send( body );
        }
    );
});

/**
* create register
**/
router.post( '/detalle/registro/', jsonParser, function( req, res ) {
    request(
        {
            url : http_helper.get_api_uri( 'vale/detalle/registro/', '' ),
            method : 'POST',
            json : true,
            form : req.body,
            headers : {
                'Content-type' : 'application/json',
                'Authorization' : http_helper.get_basic_auth_app_header()
            }
        },
        function( error, response, body ) {
            console.log("The body bitches");
            console.log( body );
            if(error){
                res.send(error);
            }
            res.send( body );
        }
    );
});

/**
* create register
**/
router.post( '/registro/bunch/', jsonParser, function( req, res ) {
    req.body = { "registrodetalles_vo" : req.body };

    console.log(req);
    request(
        {
            url : http_helper.get_api_uri( 'vale/detalle/registro/bunch/', '' ),
            method : 'POST',
            json : true,
            form : req.body,
            headers : {
                'Content-type' : 'application/json',
                'Authorization' : http_helper.get_basic_auth_app_header()
            }
        },
        function( error, response, body ) {
            if(error){
                res.send(error);
            }
            res.send( body );
        }
    );
});


/**
* get all productos
**/
router.get( '/producto', jsonParser, function( req, res ) {
    request(
        {
            url : http_helper.get_api_uri( 'producto/', '' ),
            method : 'GET',
            json : true,
            headers : {
                'Content-type' : 'application/json',
                'Authorization' : http_helper.get_basic_auth_app_header()
            }
        },
        function( error, response, body ) {
            if(error){
                res.send(error);
            }
            if( body.data ) {
                body.data.forEach( function(item) {
                    item.tipoproducto_id = item.tipo_producto.id;
                    item.user_id = item.user.id;
                });
            }
            res.send( body );
        }
    );
});

/**
* get all proveedores
**/
router.get( '/proveedor', jsonParser, function( req, res ) {
    request(
        {
            url : http_helper.get_api_uri( 'proveedor/', '' ),
            method : 'GET',
            json : true,
            headers : {
                'Content-type' : 'application/json',
                'Authorization' : http_helper.get_basic_auth_app_header()
            }
        },
        function( error, response, body ) {
            if(error){
                res.send(error);
            }
            if( body.data ) {
                body.data.forEach( function(item) {
                    item.user_id = item.user.id;
                });
            }
            res.send( body );
        }
    );
});

/**
* get all proveedores
**/
router.get( '/proveedor/:id', jsonParser, function( req, res ) {
    request(
        {
            url : http_helper.get_api_uri( 'proveedor/', req.params.id ),
            method : 'GET',
            json : true,
            headers : {
                'Content-type' : 'application/json',
                'Authorization' : http_helper.get_basic_auth_app_header()
            }
        },
        function( error, response, body ) {
            if(error){
                res.send(error);
            }
            if( body.data ) {
                body.data.user_id = body.data.user.id;
            }
            res.send( body );
        }
    );
});

/**
* get all cuentas
**/
router.get( '/cuenta', jsonParser, function( req, res ) {
    request(
        {
            url : http_helper.get_api_uri( 'cuenta/', '' ),
            method : 'GET',
            json : true,
            headers : {
                'Content-type' : 'application/json',
                'Authorization' : http_helper.get_basic_auth_app_header()
            }
        },
        function( error, response, body ) {
            if(error){
                res.send(error);
            }
            if( body.data ) {
                body.data.forEach( function(item) {
                });
            }
            res.send( body );
        }
    );
});

router.get( '/empleado', jsonParser, function( req, res ) {
    request(
        {
            url : http_helper.get_api_uri( 'empleado/', '' ),
            method : 'GET',
            json : true,
            headers : {
                'Content-type' : 'application/json',
                'Authorization' : http_helper.get_basic_auth_app_header()
            }
        },
        function( error, response, body ) {
            if(error) {
                res.send(error);
            }
            if( body.data ) {
                body.data.forEach( function(item) {
                    item.tipoempleado_id = item.tipo_empleado.id;
                    item.nombre_completo = item.nombre + " " + item.ap_paterno + " " + item.ap_materno;
                });
            }
            res.send( body );
        }
    );
});

router.get( '/caja', jsonParser, function( req, res ) {
    request(
        {
            url : http_helper.get_api_uri( 'caja/', '' ),
            method : 'GET',
            json : true,
            headers : {
                'Content-type' : 'application/json',
                'Authorization' : http_helper.get_basic_auth_app_header()
            }
        },
        function( error, response, body ) {
            if(error) {
                res.send(error);
            }
            if( body.data ) {
                body.data.forEach( function(item) {
                    item.user_id = item.user.id;
                    item.producto_id = item.producto.id;
                });
            }
            res.send( body );
        }
    );
});

router.get( '/caja/:id', jsonParser, function( req, res ) {
    request(
        {
            url : http_helper.get_api_uri( 'caja/', req.params.id ),
            method : 'GET',
            json : true,
            headers : {
                'Content-type' : 'application/json',
                'Authorization' : http_helper.get_basic_auth_app_header()
            }
        },
        function( error, response, body ) {
            if(error) {
                res.send(error);
            }
            if( body.data ) {
                body.data.forEach( function(item) {

                });
            }
            res.send( body );
        }
    );
});

router.get( '/cajadisp/:id', jsonParser, function( req, res ) {
    request(
        {
            url : http_helper.get_api_uri( 'caja/', '' ),
            method : 'GET',
            json : true,
            headers : {
                'Content-type' : 'application/json',
                'Authorization' : http_helper.get_basic_auth_app_header()
            }
        },
        function( error, response, body ) {
            if(error) {
                res.send(error);
            }
            if( body.data ) {
                body.data.forEach( function(item) {
                    item.user_id = item.user.id;
                    item.producto_id = item.producto.id;
                });
                body.data = body.data.filter( c => c.active == true && c.cantidad > 0 && c.producto_id == req.params.id );
            }
            res.send( body );
        }
    );
});

router.post( '/caja', jsonParser, function( req, res ) {
    request(
        {
            url : http_helper.get_api_uri( 'caja/', '' ),
            method : 'POST',
            json : true,
            form : req.body,
            headers : {
                'Content-type' : 'application/json',
                'Authorization' : http_helper.get_basic_auth_app_header()
            }
        },
        function( error, response, body ) {
            if(error) {
                res.send(error);
            }
            if( body.data ) {
                body.data.forEach( function(item) {

                });
            }
            res.send( body );
        }
    );
});

router.put( '/caja', jsonParser, function( req, res ) {
    request(
        {
            url : http_helper.get_api_uri( 'caja/', '' ),
            method : 'PUT',
            json : true,
            form : req.body,
            headers : {
                'Content-type' : 'application/json',
                'Authorization' : http_helper.get_basic_auth_app_header()
            }
        },
        function( error, response, body ) {
            if(error) {
                res.send(error);
            }
            if( body.data ) {
                body.data.forEach( function(item) {

                });
            }
            res.send( body );
        }
    );
});

module.exports = router;
