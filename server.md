# Hosting Your Own Website: A Minimalist Approach 

## Intended Audience 

This is a guide for those who want to host a static website on a secure server. These are the first steps to hosting applications and web services. 

This is __not__ for users who want to use cpanel, wordpress, and CMS services such as Squarespace. 

This guide provides an overview of the 'what' and 'why' of setting up a server and serving up a static site. Specific instructions (e.g. what commands to run) are readily available online for most popular OS's, web servers, etc.

## Choose A Hosting Service Provider 

Make sure the provider (and the plan you select) offers ssh access to the server.

Some big names in the space are Digital Ocean and Linode. 

## Choose An Operating System And Connect To The Server Via SSH   

Set up the OS and initial access to your server using tools from the hosting provider. 

Choose an OS. I recommend a popular open source Linux distribution, such as Ubuntu 16.04 LTS (long-term support). 

Quick note on __package managers__: Package managers are used to install, update, remove, and configure software. Ubuntu and Debian use `apt` and Red Hat and CentOS use `yum`, for example. These package managers can be used to install languages like Python and Ruby, which you should keep in mind if you plan on hosting a web application. 

Once the OS is installed and the server is booted, connect to the server via ssh with a command like `ssh root@<server_ip_address>`. 

Now that you're connected to a server that's running the OS you chose, it's best practice to 
1. update all software, 
2. create a user account, 
3. add public key authentication for SSH access,
4. install a web server to handle network requests and responses, and 
5. add SSL.

Most providers have helpful guides for getting started. Check out [Linode's](https://linode.com/docs/getting-started/) and [Digital Ocean's](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-16-04).

## 1. Update Software  

After a fresh OS install, it's best practice to update all the included software. While ssh'd to your server, run a command to update everything. It looks like `apt-get update && apt-get upgrade` for Ubuntu.

## 2. Create a User Account  

A fresh OS install has one user, `root`, which is used to connect to the server via ssh. `root` is the system administrator and can run any command any time, which makes it risky to work with. 

Rather than using `root`, it is best practice to create and use another user that has regular (lower) permissions. 

Some commands need root privileges to run though, and switching between `root` and another user account is time consuming and impractical. Therefore, you can make the user a "superuser". Superusers can run commands that require `root` privileges by adding `sudo` before each command. 

As `root`, create another user and add them as a superuser. 

## 3. Add Public Key Authentication for SSH Access  

Signing into your ssh session with a password is inherently insecure because passwords can be guessed, brute forced, forgotten, shared, etc. 

Public key authentication is a more secure alternative. In public key authentication, a user has a private key and a public key that are generated at the same time (a key pair) on their local machine. They put their public key on the server they intend to connect to in a list of 'authorized keys'. The server's public key is added to the user's local 'known hosts' list. 

When an SSH connection is requested, the server and client esentially share public keys to establish they are speaking to the parties they intended to. They agree to an encryption method for communication during the SSH connection.

SSH data (public-private key pairs, known hosts, authorized keys) is usually stored in the `/.ssh/` directory on local computers. The location varies on servers depending on standard directory structures and might be somewhere like `/etc/ssh/`. Check out the contents by running `ls ~/.ssh`. 

Use `ssh-keygen` to create key pairs (being careful not to overwrite any existing key pairs you have), and copy public keys to the correct locations. 

Digital Ocean provides [a great overview of SSH and encryption](https://www.digitalocean.com/community/tutorials/understanding-the-ssh-encryption-and-connection-process) as well as various step-by-step guides to generating and adding keys for SSH connections linked in that article.

## 4. Install a Web Server  

The web server is responsible for handling all traffic to and from the server, namely HTTP requests and responses. 

Popular choices for web servers are are Nginx and Apache. 

Install the web server of your choice using your OS's package manager (e.g. `apt-get install nginx`). 

## 5. Add SSL 

### Install Certificates

Use [Certbot](https://certbot.eff.org/) to install free SSL/TLS certificates from the [Let's Encrypt Certificate Authority](https://letsencrypt.org/) (CA). Certificates from Let's Encrypt CA are recognized by most browsers.

### Renewal Via `cronjob`

The `certbot renew` command checks if the certificate is near expiration (within 30 days), and renews it if so. 

Therefore the command should be run as a cronjob, and it should be run frequently (once or twice a day is standard practice) rather than once every 90 days (the life of a certificate) in case the timing is off or if a certificate is revoked prematurely. 

### Redirect All Traffic To Secure Connection 

Update you web server configuration file to redirect all traffic over non-secure connections to secure connections. 

## Add Content To Your Website  

Now that you are connecting to your server securely and ensuring all server traffic is secure, you're ready for the fun part! Add some files, like html and css files, and tell the web server where to look for them 

### Add Files To The Server 

Once you're content with what you've developed locally (say, html, css, and js files), you're ready to move them to the server. 

Make a folder in the home directory of the server, like `mkdir ~/static_site/`. 

Locally, create a script file (like `deploy.sh`) that will copy your local files to the directory you just created on your server. 

Run `chmod u+x <script_file_name>` to change the permission to exacutable. 
- Before `chmod` commands, the [file permissions](https://wiki.archlinux.org/index.php/File_permissions_and_attributes) will look like `-rw-r--r-- deploy.sh` 
- After `chmod` commands, the [file permissions](https://wiki.archlinux.org/index.php/File_permissions_and_attributes) will look like `-rwxr--r-- deploy.sh` 

Ensure `rsync`, a tool used to transfer and synchronize files across computers, is installed on local computer and server. Add an `rsync` command to the script file like:

    `rsync -avr -f '- .*' -f '- deploy.sh' ./ <username>@<server_ip_address>:~/projects/static_site/`

Use the rsync man page (run `man rsync` in terminal) to learn more about the flags and update the command to your needs. 

### Tell The Web Server Where To Look For Data/Files  

Now that the files for your webiste are on the server, tell the web server where to find the files. Use the web server config file(s) to serve the files in the `~/static_site/` directory in response to requests to the site's base URL.  

## Testing  

Test your SSL/TLS certificates and web server configuration. 

First, go to your secure site (e.g. `https://<site_name.com>`, `https://www.<site_name.com>`) and check that the server responds as expected and not with an error. If this doesn't work, double check certbot; make sure certificates were properly installed on the server, and that the web server configuration file knows where to look for the SLL/TLS certs. 

Next, go to your non-secure site  (e.g. `http://<site_name.com>`, `http://www.<site_name.com>`) and check that browser is properly redirected to an `https` site. If this doesn't work as expected, double check your web server configuration. 

## Monitoring 

There are multiple lightweight tools (such as GoAccess) that use date from web server log files to provide easy-to-read analytics.  