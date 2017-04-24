/**
*   Categoria routes
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
* get all objects pettition
**/
router.get( '/', jsonParser, function( req, res ) {
    var userdata = JSON.parse( req.cookies[ 'userdata' ] );
    request(
        {
            url : http_helper.get_api_uri( 'categoria/', '' ),
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
* Create object pettition
**/
router.post( '/', jsonParser, function( req, res ) {
    var userdata = JSON.parse( req.cookies['userdata'] );
    request(
        {
            url : http_helper.get_api_uri( 'categoria/', '' ),
            method : 'POST',
            json : true,
            form : req.body,
            headers : {
                'Content-type' : 'application/json',
                'Authorization' : http_helper.get_basic_auth_w_token( userdata.auth_data )
            }
        },
        ( error, response, body ) => { res.send( http_helper.data_format_created( error, response, body ) ) }
    );
});

/**
* retrieve object pettition
**/
router.get( '/:id', jsonParser, function( req, res ) {
    var userdata = JSON.parse( req.cookies[ 'userdata' ] );
    request(
        {
            url : http_helper.get_api_uri( 'categoria/', req.params.id ),
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
* Update object pettition
**/
router.put( '/', jsonParser, function( req, res ) {
    var userdata = JSON.parse( req.cookies['userdata'] );
    request(
        {
            url : http_helper.get_api_uri( 'categoria/', '' ),
            method : 'PUT',
            json : true,
            form : req.body,
            headers : {
                'Content-type' : 'application/json',
                'Authorization' : http_helper.get_basic_auth_w_token( userdata.auth_data )
            }
        },
        ( error, response, body ) => { res.send( http_helper.data_format_updated( error, response, body ) ) }
    );
});

/**
* Create object pettition
**/
router.delete( '/:id', jsonParser, function( req, res ) {
    var userdata = JSON.parse( req.cookies['userdata'] );
    request(
        {
            url : http_helper.get_api_uri( 'categoria/', req.params.id ),
            method : 'DELETE',
            json : true,
            headers : {
                'Content-type' : 'application/json',
                'Authorization' : http_helper.get_basic_auth_w_token( userdata.auth_data )
            }
        },
        ( error, response, body ) => { res.send( http_helper.data_format_deleted( error, response, body ) ) }
    );
});

module.exports = router;
