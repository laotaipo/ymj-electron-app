async function testIt() {
    console.log(666)
    const device = await navigator.bluetooth.requestDevice({
      acceptAllDevices: true
    })
    document.getElementById('device-name').innerHTML = device.name || `ID: ${device.id}`
  }
  
  document.getElementById('clickme').addEventListener('click',testIt)