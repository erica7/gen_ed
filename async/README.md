# async

In an asynchronous operation, a specific operation begins upon receipt of a signal that the preceding operation completed, such as receiving a response to a request. 

Synchronous => Blocking   
Asynchronous => Not blocking  

Asynchronous is not the same as concurrent or multi-threaded.

## Async with XHR

Use the `XMLHttpRequest` class to create an async request object. Use `.open()`, `.onload()`, `.onerror()`, and `.setRequestHeader()` methods to build the request, and `.send()` to send the request. Parse the JSON response into a JavaScript object using `JSON.parse()`.    

## Async with jQuery

Use the `.ajax()` method in jQuery's library (which winds up creating and handling an XMLHttpRequest object in the background). Define the request in an object that is passed to the `.ajax()` method, and chain methods like `.done()` and `.fail()` to handle the response. JSON responses are automatically converted to a JavaScript object. Alternatively, use other jQuery methods like `.get()`, `.post()`, and `.load()` which are wrappers on the `.ajax()` method.  

## Async with Fetch

Use the `fetch()` method, passing the URL and an object defining the request. The method will return a promise. Chain methods using `.then()` and `.catch()` to handle the promise response such as detecting response errors, converting the response to json, and handling network errors.  

---
## How to Use This Code

Create a config javascript file at the root of the async directory: `async/config.js`.  

Register for a unsplash developer account and create an application. Using the Application ID, add the following content to the config.js file:

```javascript
UNSPLASH_KEY = 'paste_the_Application_ID_here'
```
---
## Resources
* https://www.pluralsight.com/guides/front-end-javascript/introduction-to-asynchronous-javascript  
* https://classroom.udacity.com/courses/ud109
