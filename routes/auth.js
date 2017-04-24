/**
* auth routes
* @author : Ramiro Gutierrez Alaniz
* @date : April 17th, 2017
**/
var express = require( 'express' );
var bodyParser = require( 'body-parser' );
var urlLib = require( 'url' );
var request = require( 'request' );
var http_helper = require( '../helpers/http_helper_ne' );
var router = express.Router();
var jsonParser = bodyParser.json();

/**
* login pettition
**/
router.post( '/login', jsonParser, function( req, res ) {
    request(
        {
            url : http_helper.get_api_uri( 'auth/login/', '' ),
            method : 'POST',
            json : true,
            form : req.body,
            headers : {
                'Content-type' : 'application/json',
                'Authorization' : http_helper.get_basic_auth_app_header()
            }
        },
        function( error, response, body ) {
            switch (response.statusCode) {
                case 403:
                    var jsonData = JSON.stringify({
                        error : true,
                        message : "Wrong credentials"
                    });
                    res.send( jsonData );
                    break;
                case 400:
                    var jsonData = JSON.stringify({
                        error : true,
                        message : "There was an error"
                    });
                    res.send( jsonData );
                    break;
                case 401:
                    var jsonData = JSON.stringify({
                        error : true,
                        message : "Wrong credentials"
                    });
                    res.send( jsonData );
                    break;
                case 200 :
                    var jsonData = JSON.stringify({
                            error : false,
                            data : body.data
                        }),
                        user_data = JSON.stringify({
                            user : body.data.user,
                            rol : body.data.rol,
                            id : body.data.id,
                            auth_data : http_helper.get_user_basic_auth( req.body.username, req.body.password )
                        });
                    res.cookie( 'userdata', user_data );
                    res.send( jsonData );
                    break;
                default:
                    res.send( body );
            }
        }
    );
});

/**
* Get all rols
**/
router.get( '/rols', jsonParser, function( req, res ) {
    var userdata = JSON.parse( req.cookies[ 'userdata' ] );
    request(
        {
            url : http_helper.get_api_uri( 'auth/rols', '' ),
            method : 'GET',
            json : true,
            headers : {
                'Content-type' : 'application/json',
                'Authorization' : http_helper.get_basic_auth_w_token( userdata.auth_data )
            }
        },
        ( error, response, body ) => { res.send( http_helper.data_format_ok( error, response, body ) ) }
    );
});

/**
* Secure logout pettition
**/
router.post( '/logout', jsonParser, function( req, res ) {
    try {
        res.clearCookie( 'userdata' );
        res.send( 204 );
    } catch (e) {
        res.send(e);
    }
});

module.exports = router;
