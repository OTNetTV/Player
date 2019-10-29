<?php

	if(empty($_COOKIE['Auth'])){

		die();

	}

	error_log(print_r($_COOKIE, true));

	$ch = curl_init();

	curl_setopt($ch, CURLOPT_URL,"http://local.bitstreaminapi.com/v1/proxy/token");
	
	curl_setopt($ch, CURLOPT_HTTPHEADER, array(
		
		'X-API-KEY: o4s4gwkss0gksk44s4w0gkk4sk0kkcc884k4wsk8',
		
	    'Authorization: ' . base64_encode($_COOKIE['Auth'])
	
	));
	
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	
	$key = curl_exec($ch);
	
	curl_close($ch);
	
	echo $key;
	
	die();

?>