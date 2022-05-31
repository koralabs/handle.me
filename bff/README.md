## Installation

Do steps #3 & #4 (Docker & SAM CLI) if you're on Linux or Windows. If you're on Mac do #3, #4 & #5:

https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html

If on linux, you will need to do the post Docker install steps if you haven't already:

https://docs.docker.com/engine/install/linux-postinstall/

```
cd bff
yarn local
```

## Hit WSL2 container inside docker (sam local)

```
netsh interface portproxy delete v4tov4 listenport="3000" # Delete any existing port 3000 forwarding
$wslIp=(wsl -d Ubuntu -e sh -c "ip addr show eth0 | grep 'inet\b' | awk '{print `$2}' | cut -d/ -f1") # Get the private IP of the WSL2 instance
netsh interface portproxy add v4tov4 listenport="3000" connectaddress="$wslIp" connectport="3000"

# After that, use http://host.docker.internal:3000
```
