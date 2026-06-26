<?php
   namespace App;


   class Routers {
      private routes = []
      
      public function get($path, $handler){
        $this->routes['GET'][$path] = $handler;
      }

      public function post($path, $handler){
        $this->routes['POST'][$path] = $handler;
      }

      public function run(){
        $method = $_SERVER['REQUEST_METHOD'];
        $path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

        if(isset($this->routes[$method][$path])){
            $handler = $this->routes[$method][$path];

            if(is_array($handler)){
                $controllerClass = $handler[0];
                $methodName = $handler[1];

                $controller = new $controllerClass();
                $controller->$methodName();
            }
            else{
                call_user_func($handler);
            }
        }
        else{
            http_response_code(404);
            echo json_encode(['message' => 'Not Found']);
        }
      }
   }