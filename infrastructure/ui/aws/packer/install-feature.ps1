Write-Host "Start to install choco!"
Set-ExecutionPolicy Bypass -Scope Process -Force; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))

#Disabling Windows Firewall to allow connection to our dotnet core app from outside
Set-NetFirewallProfile -Profile Domain,Public,Private -Enabled False