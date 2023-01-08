provider "raspberrypi" {
  host = "192.168.1.100"
  username = "pi"
  password = "raspberry"
}

resource "raspberrypi_device" "pi" {
  count = 2
  hostname = "pi-${count.index + 1}"
}

provisioner "local-exec" {
  command = "scp script.js ${raspberrypi_device.pi[0].ip}:~/script.js"
  depends_on = [raspberrypi_device.pi]
}

provisioner "remote-exec" {
  inline = [
    "apt-get update",
    "apt-get install -y nodejs",
    "nodejs script.js"
  ]
  connection {
    host = raspberrypi_device.pi[0].ip
    user = raspberrypi_device.pi[0].username
    password = raspberrypi_device.pi[0].password
  }
  depends_on = [raspberrypi_device.pi]
}

output "pi_ips" {
  value = raspberrypi_device.pi[*].ip
}
