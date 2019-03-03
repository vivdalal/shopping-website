

provider "aws" {
  region     = "us-east-1"
}

variable "custom-ami-name" {
        description = "The id of the machine image (AMI) to use for the server."
}
variable "key-name" {
        description = "The Key-Pair to use while launching this Instance."
}

resource "aws_security_group" "tenable" {
        name = "tenable-scanner"
        description = "Web Security Group"
        
        ingress {
                from_port = 22
                to_port = 22
                protocol = "tcp"
                cidr_blocks = ["0.0.0.0/0"]
        }
		
        ingress {
                from_port = 5050
                to_port = 5050
                protocol = "tcp"
                cidr_blocks = ["0.0.0.0/0"]
        }
		
        ingress {
                from_port = 80
                to_port = 80
                protocol = "tcp"
                cidr_blocks = ["0.0.0.0/0"]
        }
		
        ingress {
                from_port = 443
                to_port = 443
                protocol = "tcp"
                cidr_blocks = ["0.0.0.0/0"]
        }
        ingress {
                from_port = 3389
                to_port = 3389
                protocol = "tcp"
                cidr_blocks = ["0.0.0.0/0"]
        }
        egress {
                from_port = 0
                to_port = 0
                protocol = "-1"
                cidr_blocks = ["0.0.0.0/0"]
        }
}



resource "aws_instance" "vault-example" {
    ami           = "${var.custom-ami-name}"
    instance_type = "t2.micro"
    security_groups = ["${aws_security_group.tenable.name}"]
    key_name = "${var.key-name}"
	
    tags {
         Name = "shopping-website"
    }
  
  provisioner "local-exec" {
    command = "echo ${aws_instance.vault-example.public_ip} > ip_address.txt"
  }
  
}



# resource "aws_key_pair" "my_key" {
#   key_name = "terraform_ec2_key"
#   public_key = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDYKP8PWmU9/OIWmdO1xa1IB831VsRyu6IwIet1SPk3z/otoqSYUUWs27ChLYehtc19IA2nR5fKbAUs0F1TJFDDwznkGnGOUqoMyNtTzW/J3T1JIHdWedNNDHjbiqkWMZpf5FJbw/B/oHVQOHqfqbHd1AkVqrmLJPRvuN/ACp5zKSCz2RG2LRvXTG+Jpcoz2j2g3TznjRSaQDOipGmZ3/fOUhRtE6mVILKyMf7fRI4yrQrsHP5mS/mAcmzhbDqzkyjUuK/yyroJGVET0/dHgIPfaitpOl/ZxARLwJp+HBkke7INPP/NhpOmai1KoO7CwyL/MUBy5m3JYsjNhrFdY0Vf dino@BERLIOZ"
#   # public_key = "${file("terraform_ec2_key.pub")}"
# }
