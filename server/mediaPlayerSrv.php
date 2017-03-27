<?php

/*
 * PHP Media Player Server
 *
 * @copyright: (C) 2017 Gordon Niemann in cooperation with Kibble Games Inc and Vancouver Film School.  All Rights Reserved.
 * @author:    Gordon Niemann
 * @version:   0.3
 *
 */

class mediaPlayerSrv
{
	private $debug_mode = TRUE;
	private $dirscan = [];
	
	public function __construct() 
	{
		$response = $this->is_error( 101, "Not an AJAX request." );
		if ($this->is_ajax()) 
		{
			$response = $this->is_error( 102, "No action specified." );
			//Checks if action value exists
			if (isset($_POST["action"]) && !empty($_POST["action"])) {
	
				// Get the action requested
				$action = $_POST["action"];
	
				//Switch case for value of action, make these up as needed
				switch( $action ) 
				{
					case "run":
					$response["error_code"] = 0;
					$dirscan = glob( "../servermusic/*.{mp3,ogg}" ,GLOB_BRACE);
					$response["musicList"] = $dirscan;
					break;
					default:
						$response = $this->is_error( 103, "Wrong Action" );
						break;
				}
			}
		}
	
		// Respond to the client with a JSON string containing attrib => value pairs encoded
		echo json_encode( $response );
		return 0;
	}
	
	private function is_ajax() 
	{
		return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
	}
	
	private function is_error( $error_code, $error_msg ) {
	
		// Create a response array (attrib => value) with the origingal post params to start
		$response = $_POST;
	
		// Add our error message
		$response["error_code"] = $error_code;
		$response["error"] = "Error " . $error_code . " - " . $error_msg;
	
		// convert the whole response to a JSON string, then add that string
		// as another element to the return message
		//
		// This lets us see the data coming back as a string in the debugger
		if ($this->debug_mode) {
	
			$response["json"] = json_encode( $response );
		}
	
		// Respond to the client with a JSON string containing attrib => value pairs encoded
		return $response;
	}
}

$MediaPlayerSrv_server = new mediaPlayerSrv();

?>