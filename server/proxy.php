<?php

	$ch = curl_init();

	curl_setopt($ch, CURLOPT_URL,"https://otnet.io/v1/players?code=" . $_GET['code']);
	
	curl_setopt($ch, CURLOPT_HTTPHEADER, array(
		'X-API-KEY: s0ko0s80wkgk8g8k0kck0w4wc404k8gwsw8c0cwk'	
	));
	
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	
	$data = curl_exec($ch);
	
	curl_close($ch);
	
	echo $data;
	
	die();

?>