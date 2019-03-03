Add-Type -AssemblyName System.IO.Compression.FileSystem
Import-Module IISAdministration
Import-Module WebAdministration
function Unzip {
    param([string]$zipfile, [string]$outpath)

    [System.IO.Compression.ZipFile]::ExtractToDirectory($zipfile, $outpath)
}

function AddWebSite([string]$Name) { 
    $physicalPath = "C:\Inetpub\$Name" 
  
    New-IISSite -Name $Name -PhysicalPath $physicalPath -BindingInformation "*:80:" 

    Invoke-Command -scriptblock {iisreset}
}

# Write-Host "Stop IIS!"
# iisreset /stop

# Write-Host "Remove default iis website!"
# Remove-IISSite -Name 'Default Web Site' -Confirm:$false

# Write-Host "Add our Web site to IIS!"
# $appName = "Website" 
# New-Item "c:\Inetpub\$appName" -type directory
# #Add-RDSCertificate
# AddWebSite -Name $appName 

# Write-Host "Unzip contents of zip file into IIS app folder!"
# Unzip "C:\temp\Website.zip" "c:\Inetpub\$appName"

# Write-Host "Restart IIS!"
# iisreset /start