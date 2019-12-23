### Steps to run the terraform script

```bash
terraform init

terraform plan -var custom-ami-name=“your-custom-ami-name" -var key-name=“key-name”

terraform apply  -var custom-ami-name=“your-custom-ami-name" -var key-name=“key-name”
```
