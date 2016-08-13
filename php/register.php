<?php
	$_GET['name'];
	$_GET['password'];
	if($_GET['name']=='13500000000'){
		echo json_encode(array('token'=>'abcdefghijk','userId'=>'1'));
	}else{
		echo "註冊失敗";
	}
?>