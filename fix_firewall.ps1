# PowerShell Script to Fix Firewall on Oracle VM
# Target: 140.245.244.242

$ErrorActionPreference = "Stop"
$InstanceIP = "140.245.244.242"
$KeyFile = ".\oracle setup\ssh-key-2026-01-04 (1).key"
$RemoteUser = "ubuntu"

Write-Host "Fixing Server-Side Firewall..." -ForegroundColor Cyan

# 0. Fix Key Permissions
$keyPath = Resolve-Path $KeyFile
$acl = Get-Acl -Path $keyPath
$acl.SetAccessRuleProtection($true, $false)
$rule = New-Object System.Security.AccessControl.FileSystemAccessRule($env:USERNAME, "Read", "Allow")
$acl.SetAccessRule($rule)
Set-Acl -Path $keyPath -AclObject $acl

# 1. Run Firewall Fix Commands via SSH
# We use a simpler string format to avoid PowerShell parsing issues
$cmd1 = "sudo iptables -I INPUT -p tcp --dport 8000 -j ACCEPT"
$cmd2 = "sudo ufw allow 8000"
$cmd3 = "sudo netstat -tlnp | grep 8000"

Write-Host "1. Opening Port 8000 (iptables)..."
Invoke-Expression "ssh -i `"$KeyFile`" -o StrictHostKeyChecking=no ${RemoteUser}@${InstanceIP} `"$cmd1`""

Write-Host "2. Opening Port 8000 (UFW)..."
Invoke-Expression "ssh -i `"$KeyFile`" -o StrictHostKeyChecking=no ${RemoteUser}@${InstanceIP} `"$cmd2`""

Write-Host "3. Checking Port Status..."
Invoke-Expression "ssh -i `"$KeyFile`" -o StrictHostKeyChecking=no ${RemoteUser}@${InstanceIP} `"$cmd3`""

Write-Host "---------------------------------------------------"
Write-Host "DONE. Try refreshing the page now." -ForegroundColor Green
Write-Host "---------------------------------------------------"
