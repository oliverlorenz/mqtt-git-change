# mqtt-git-updater

A very special use case. This Docker image subscribes to a MQTT topic. This topic is a uri of a file in a git repo. The payload of the message is the content for the file. If a message arrives the follow steps will be executed:

* clone the repo
* change/create the file
* git add the file
* git commit the file
* git push

## Usage

```
docker run --rm -it -v ~/.ssh:/root/.ssh -e "MQTT_TOPIC=git@github.com:oliverlorenz/mqtt-git-updater.git:master:README.md" oliverlorenz/mqtt-git-updater:latest
```

The topic from the example above have to contains the following informations

| Information | Example                                          |
| ----------- | ------------------------------------------------ |
| REPO_URL    | git@github.com:oliverlorenz/mqtt-git-updater.git |
| BRANCH      | master                                           |
| FILE_PATH   | README.md                                        |