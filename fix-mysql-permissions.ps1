# fix-mysql-permissions.ps1
# Run this to grant database creation permissions to mil_admin

$ErrorActionPreference = "Stop"

Write-Host "=== Granting CREATE DATABASE permission to mil_admin ==="

# Prompt for MySQL root password
$mysqlPasswordSecure = Read-Host -AsSecureString "Enter password for MySQL root user"
$mysqlPasswordPlain = [Runtime.InteropServices.Marshal]::PtrToStringUni(
    [Runtime.InteropServices.Marshal]::SecureStringToBSTR($mysqlPasswordSecure)
)

# Set MYSQL_PWD environment variable
$env:MYSQL_PWD = $mysqlPasswordPlain

$grantScript = @"
GRANT ALL PRIVILEGES ON *.* TO 'mil_admin'@'localhost';
FLUSH PRIVILEGES;
"@

# Run the grant command
$grantScript | mysql -u root -h localhost

# Clear the password from environment
Remove-Item Env:\MYSQL_PWD

Write-Host ""
Write-Host "=== Done! mil_admin can now create shadow databases ===" -ForegroundColor Green
Write-Host ""
Write-Host "Now run: npm run db:migrate"
