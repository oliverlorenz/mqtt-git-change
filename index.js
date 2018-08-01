const hostname = process.env.MQTT_HOSTNAME || 'mqtt://test.mosquitto.org'
const topic = process.env.MQTT_TOPIC

const uuidv1 = require('uuid/v1');
const fs = require('fs-extra')
const git = require('simple-git/promise');
const mqtt = require('mqtt')

async function saveFile(topic, message) {
    const topicParts = topic.split(':');
    const remote = `${topicParts[0]}:${topicParts[1]}`;
    const branch = topicParts[2];
    const file = topicParts[3];
    const uuid = uuidv1();

    await git().clone(remote, uuid);
    await fs.writeFile(`${uuid}/${file}`, message)
    await git(uuid).add('.')
    await git(uuid).commit(`${file} changed`)
    await git(uuid).push()
    await fs.remove(uuid)
    console.log(topic)
}

const client  = mqtt.connect(hostname, {
    username: process.env.MQTT_USERNAME,
    password: process.env.MQTT_PASSWORD
})
 
client.on('connect', function () {
  client.subscribe(topic);
  console.log('connected!')
})
 
client.on('message', saveFile)




/*
client.end()


node.status({fill:"blue",shape:"ring",text:node.action});
            var username_f = RED.util.evaluateNodeProperty(node.username,node.usernameType,node,msg);
            var repository_f = RED.util.evaluateNodeProperty(node.repository,node.repositoryType,node,msg);
            var repo = github.getRepo(username_f, repository_f);

            function callbackErrData(err, data){
                if(err){
                    node.status({fill:"red",shape:"dot",text:"Error: " + node.action});
                    node.error(err);
                }else{
                    msg.payload = data;
                    node.status({});
                    node.send(msg);
                }
            }
            function callbackErr(err) {
                if(err){
                    node.status({fill:"red",shape:"dot",text:"Error" + node.action});
                    node.error(err);
                }else{
                    node.status({});
                }
            }

            if(node.action == "show"){
                repo.show(callbackErrData);
            }else if (node.action == "fork"){
                repo.fork(callbackErr);
            }else if (node.action == "contributors"){
                repo.contributors(callbackErrData);
            }else if (node.action == "listforks"){
                repo.listForks(callbackErrData);
            }else if (node.action == "listbraches"){
                repo.listBranches(callbackErrData);
            }else if (node.action == "delete") {
                repo.deleteRepo(callbackErrData);
            }else if (node.action == "contents") {
                var branch_f = RED.util.evaluateNodeProperty(node.branch,node.branchType,node,msg);
                var path_f = RED.util.evaluateNodeProperty(node.path,node.pathType,node,msg);
                repo.contents(branch_f, path_f, callbackErrData);
            }else if(node.action == "read"){
                var branch_f = RED.util.evaluateNodeProperty(node.branch,node.branchType,node,msg);
                var path_f = RED.util.evaluateNodeProperty(node.path,node.pathType,node,msg);
                repo.read(branch_f, path_f, callbackErrData);
            }else if (node.action == "write") {
                var branch_f = RED.util.evaluateNodeProperty(node.branch,node.branchType,node,msg);
                var path_f = RED.util.evaluateNodeProperty(node.path,node.pathType,node,msg);
                var contents_f = RED.util.evaluateNodeProperty(node.contents,node.contentsType,node,msg);
                var options = {};
                repo.write(branch_f, path_f, contents_f, 'Add ' + path_f, options, callbackErr);
            }else if (node.action == "move") {
                var branch_f = RED.util.evaluateNodeProperty(node.branch,node.branchType,node,msg);
                var path_f = RED.util.evaluateNodeProperty(node.path,node.pathType,node,msg);
                var pathto_f = RED.util.evaluateNodeProperty(node.pathto,node.pathtoType,node,msg);
                repo.move(branch_f, path_f, pathto_f, callbackErr);
            }else if (node.action == "remove") {
                var branch_f = RED.util.evaluateNodeProperty(node.branch,node.branchType,node,msg);
                var path_f = RED.util.evaluateNodeProperty(node.path,node.pathType,node,msg);
                repo.remove(branch_f, path_f, callbackErr);
}*/