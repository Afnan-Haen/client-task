<?php
namespace App;

class Router {
    private $routes = [];

    public function post($path, $handler) {
        $this->routes['POST'][$path] = $handler;
    }

    public function get($path, $handler) {
        $this->routes['GET'][$path] = $handler;
    }

    public function put($path, $handler) {
        $this->routes['PUT'][$path] = $handler;
    }

    public function delete($path, $handler) {
        $this->routes['DELETE'][$path] = $handler;
    }

    public function run() {
        $method = $_SERVER['REQUEST_METHOD'];
        $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

        // Normalize URI by removing trailing slashes
        $uri = rtrim($uri, '/');
        if (empty($uri)) {
            $uri = '/';
        }

        // Handle OPTIONS preflight requests for CORS
        if ($method === 'OPTIONS') {
            $frontendUrl = getenv('FRONTEND_URL') ?: 'http://localhost:3000';
            header('Access-Control-Allow-Origin: ' . $frontendUrl);
            header('Access-Control-Allow-Credentials: true');
            header('Access-Control-Allow-Headers: Content-Type, Authorization');
            header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
            http_response_code(204);
            exit;
        }

        if (isset($this->routes[$method][$uri])) {
            $this->executeHandler($this->routes[$method][$uri]);
        } else {
            // Check for dynamic routes like /blogs/{id}
            $matched = false;
            if (isset($this->routes[$method])) {
                foreach ($this->routes[$method] as $route => $handler) {
                    // Convert {something} to a regex capturing group
                    $pattern = preg_replace('/\{([a-zA-Z0-9_]+)\}/', '(?P<$1>[a-zA-Z0-9_-]+)', $route);
                    $pattern = '#^' . $pattern . '$#';
                    
                    if (preg_match($pattern, $uri, $matches)) {
                        $matched = true;
                        // Filter out numeric keys to just keep the named parameters
                        $params = array_filter($matches, 'is_string', ARRAY_FILTER_USE_KEY);
                        $this->executeHandler($handler, $params);
                        break;
                    }
                }
            }

            if (!$matched) {
                http_response_code(404);
                header('Content-Type: application/json');
                echo json_encode(['message' => "Route {$method} {$uri} not found"]);
            }
        }
    }

    private function executeHandler($handler, $params = []) {
        if (is_array($handler)) {
            $controllerClass = $handler[0];
            $methodName = $handler[1];
            
            $controller = new $controllerClass();
            call_user_func_array([$controller, $methodName], array_values($params));
        } else {
            call_user_func_array($handler, array_values($params));
        }
    }
}
