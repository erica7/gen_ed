# Internet Protocol Suite
The Internet protocol suite provides end-to-end data communication specifying how data should be packetized, addressed, transmitted, routed, and received.

1. __Application Layer__ (highest)
    - Provides process-to-process data exchange for applications (e.g. client-server model and peer-to-peer networking). The processes make use of services on lower layers, espeically the Transport Layer which provides pipes to other processes. Proccesses are addressed via ports which esentially represent services.  
    - HTTP, SMTP, FTP, SSH

2. __Transport Layer__
    - Handles host-to-host communication.
    - UDP, TCP

3. __Internet Layer__  
    - A network of networks connected by routers. Provides communication between independent networks.
    - IP 

4. __Link Layer__ (lowest)
    - A network that is owned by a single entity. Contains communication methods for data that remains within a single network segment (link).  
    - Ethernet  
---
## TCP 

TCP allows multiple independent streams of data between two machines (up to 6) distinguished by port numbers (e.g. 80 for HTTP, 443 for HTTPS).  

A 3-way handshake is needed to create new connections (expensive) and must be established before HTTP communications can take place. 

Additionally, the TLS handshake must take place for HTTPS communications. Without TLS, communications are not secure and are vulerable (e.g. evesdropping with Firesheep).  

---  
## TLS

HTTPS = HTTP + TLS (formerly SSL)

TLS is a __chain of trust__ that provides 
- *__encryption__* (*__secrecy__*, if you will) to obfuscate information being sent, 
- *__authentication__* to ensure validity of end points, and 
- *__integrity__* of data to check to detect message tampering or forgery (e.g. in the event of a man-in-the-middle attack).

### TLS Handshake
Purpose: Validate the server's identity. Establish encryption for all communcications (client generation of random key). 
1. The client has the server send a certificate. 
    - The certificate contains the public key of the server (fingerprint), some additional information like the domain the certificate is for, and the signature by a certificate authority. 
2. The client checks if the domain is correct and if the authority signature is valid.
    - Browsers have a collection of certificate authorities including their public keys saved locally so checking signature validity is easy.
3. The client generates a random key for symmetric encryption to be used from here in.
4. The browser encrypts the random key with the server's public key and sends it to the server.
    - From this point on, the server & client/browser encrypts & decrypts communications with the random key with _symmetric encryption_.
5. In response to a request, the server will encrypt the response and send the encryption in a signed document.

---
## Security

In general, JavaScript is not allowed to access the data of any other origin than its own.   
An __origin__ is make up of three parts:  
1. Data Scheme (e.g. https://)
2. Hostname (e.g. www.weather.com) 
3. Port (e.g. :443)

__Same-Origin Policy__
- Description: Fetch requests cannot be made to other origins. Windows or i-frames cannot be inspected with JavaScript if they are from another origin.  
- Implementation: Enforced by the browser.

__Cross Origin Resource Sharing (CORS)__ 
- Description: CORS provides a way for browsers or servers to request remote URLs (i.e. get around Same-Origin Policy) when they are allowed. They use a preflight request to get 'approval' from the server. Some methods, like GET, might be sent without a preflight request in which case the response is unreadable if not allowed.
  Request:
  ```
  OPTIONS /
  Referer: yourwebsitename.com
  ```
  Response:
  ```
  200 OK 
  Access-Control-Allow-Origin: yourwebsitename.com
  Access-Control-Allow-Methods: PUT, DELETE
  ```
  The use of a wildcard allows all domains (e.g. in case of a freely-available font):
  ```
  Access-Control-Allow-Origin: *
  ```
- Implementation: generally managed by the browser; server-side code can (should) be implemented

__Cross-Site Request Forgery (CSRF)__
- Description: Exploits the trust that a site has in a user's browser. Unauthorized commands are transmitted from a user that the web application trusts.
- Implementation: The server appends a CSRF token to a form and stores the token. When the form is submitted, the server checks that token against the one it has stored. 

__Cross-Site Scripting (XSS)__
- Description: Exploits the trust a user has for a particular site. Enables attackers to inject client-side scripts into web pages viewed by other users. Javascript can be injected into another site where it gets executed and has access to all of its site's data including the DOM and cookies and can make fetch requests from the site's origin.
- Implementation: User input must be validated server-side.

__Mixed Content__
- Description: When resources are loaded over HTTP (insecure) and HTTPS (secure) connections, even when the initial request is made via HTTPS
- Implementation: Browsers block and/or warn the users in the event of mixed-content requests.

---
### HTTP/1 vs HTTP/2

HTTP methods:
- GET, POST, PUT, DELETE, HEAD, OPTIONS

Status codes: 
- 1xx - Informational
- 2xx - Success 
- 3xx - Redirection
- 4xx - Client Error 
- 5xx - Server Error 

HTTP/2 mitigates issues with HTTP/1:

- __Head of Line Blocking__: one request blocks others from completing. 
  - This occurs with HTTP/1 and TCP in which a browser can open at most 6 connections to the same server.  
  - HTTP/2 uses multiplexing to have 1 connection instead of 6. The connection is a stream split into frames. When one frame is blocked, the stream is used by other frames during what would otherwise have been idle time.

- __Compression__: compression of body vs. body & header.
  - HTTP/1 with gzip or equivalent does not compress headers. (It appends binary data below header and blank line.)  
  - HTTP/2 compresses headers; all streams share a connection and a compressor, so they can send references to the same header being sent multiple times, rather than sending the full content of the compressed header each time.  

- __TLS__: required specification for HTTP/2. 
  - Browsers agreed to not support non-secure HTTP/2.
  - TLS is optional for HTTP/1.

---
## netcat 

Netcat (nc) is a computer networking utility for reading from and writing to network connections using TCP or UDP (port scanning, transferring files, port listening, etc.).

`man nc` 

### Common netcat Commands

GET request recieves the header, followed by a blank line, followed by the content in text form
```
nc google.com 80
GET / HTTP/1.1
```

HEAD gets the headers of a file without getting the entire file itself
```
nc google.com 80
HEAD / HTTP/1.1
Host: google.com
```

OPTIONS gives a list of methods that are accepted on the current URL (not supported by all servers)
```
nc google.com 80
OPTIONS / HTTP/1.1
Host: google.com
```

---
## Resources
* plenty of Wikipedia 
* this guy's videos https://www.youtube.com/watch?v=DTQV7_HwF58 
* Client-Server Communcation on Udacity https://classroom.udacity.com/courses/ud897
