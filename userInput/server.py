import http.server
import socketserver
import json
import os


PORT = 8000


class MyHttpRequestHandler(http.server.SimpleHTTPRequestHandler):

    def do_POST(self):
        if self.path == '/save':
            self.send_response(200)
            self.send_header('Content-type', 'text/html')
            self.end_headers()
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            paint_dimensions = json.loads(post_data.decode('utf-8'))
            try:
                with open('./userInput/paintDimension.json', 'w') as f:
                    json.dump(paint_dimensions, f)
            except:  # if the file is not found, it is probably because the script is run from the user input directory
                with open('./paintDimension.json', 'w') as f:
                    json.dump(paint_dimensions, f)
            self.wfile.write(b'Successfully saved paint dimensions to file.')
        else:
            # Serve the default GET response
            super().do_GET()


Handler = MyHttpRequestHandler
try:
    os.chdir('painting_automower')
except FileNotFoundError:
    pass
httpd = socketserver.TCPServer(("", PORT), Handler)
print("Listening on port", PORT)
httpd.serve_forever()
