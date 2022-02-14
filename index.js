const compute = require('@google-cloud/compute');

const projectId = '';
const zone = ''

exports.startInstancePubSub = async (event, context, callback) => {
  try {
    const instancesClient = new compute.InstancesClient();
    const [instanceList] = await instancesClient.list({
      project: projectId,
      zone,
    });

    console.log(`Instances found in zone ${zone}:`);

    for (const instance of instanceList) {
      console.log(` - ${instance.name} (${instance.machineType})`);
      instancesClient.start({
        project: projectId,
        zone,
        instance: instance.name
      })
    }

    // Operation complete. Instance successfully started.
    const message = 'Successfully started instance(s)';
    console.log(message);
    callback(null, message);
  } catch (err) {
    console.log(err);
    callback(err);
  }
};
