# setup-mil-rec.ps1
# Run this in an elevated PowerShell (Run as Administrator)

$ErrorActionPreference = "Stop"

Write-Host "=== Step 1: Check for winget ==="
if (-not (Get-Command winget -ErrorAction SilentlyContinue)) {
    Write-Error "winget is not available on this system. Install/enable winget first, then re-run this script."
    exit 1
}

Write-Host "=== Step 2: Check if MySQL is already available ==="
if (-not (Get-Command mysql -ErrorAction SilentlyContinue)) {
    Write-Host "MySQL not found. Installing via winget..."
    # This installs MySQL from Oracle
    winget install -e --id Oracle.MySQL

    Write-Host "MySQL install command completed. Re-checking for mysql..."
}

# Try to find mysql again
if (-not (Get-Command mysql -ErrorAction SilentlyContinue)) {
    Write-Host "mysql is still not on PATH. Searching in 'C:\Program Files\MySQL'..."
    $mysqlDir = Get-ChildItem "C:\Program Files\MySQL" -Recurse -Filter mysql.exe -ErrorAction SilentlyContinue |
        Select-Object -First 1 -ExpandProperty DirectoryName

    if (-not $mysqlDir) {
        Write-Error "Could not find mysql.exe. Please verify MySQL installation and re-run the script."
        exit 1
    }

    Write-Host "Found mysql at: $mysqlDir"
    Write-Host "Adding this directory to your user PATH..."

    # Add to current session
    $env:Path += ";$mysqlDir"

    # Persist for future sessions (user PATH)
    $currentUserPath = [Environment]::GetEnvironmentVariable("Path", "User")
    if ($currentUserPath -notlike "*$mysqlDir*") {
        [Environment]::SetEnvironmentVariable("Path", "$currentUserPath;$mysqlDir", "User")
    }

    Write-Host "PATH updated. You may need to open a new terminal next time."
}

Write-Host "=== Step 3: Connect to MySQL as root user ==="
Write-Host "You will be prompted for the password you chose during MySQL installation."
$mysqlUser = "root"

# Prompt for MySQL root password
$mysqlPasswordSecure = Read-Host -AsSecureString "Enter password for MySQL root user '$mysqlUser'"
$mysqlPasswordPlain = [Runtime.InteropServices.Marshal]::PtrToStringUni(
    [Runtime.InteropServices.Marshal]::SecureStringToBSTR($mysqlPasswordSecure)
)

Write-Host "=== Step 4: Creating database 'mil_rec' and user 'mil_admin' ==="

# You can change this password later
$milAdminUser = "mil_admin"
$milAdminPassword = "MilRec2025!"

$createScript = @"
CREATE DATABASE IF NOT EXISTS mil_rec;
DROP USER IF EXISTS '$milAdminUser'@'localhost';
CREATE USER '$milAdminUser'@'localhost' IDENTIFIED BY '$milAdminPassword';
ALTER USER '$milAdminUser'@'localhost' IDENTIFIED WITH caching_sha2_password BY '$milAdminPassword';
GRANT ALL PRIVILEGES ON mil_rec.* TO '$milAdminUser'@'localhost';
FLUSH PRIVILEGES;
"@

# Set MYSQL_PWD environment variable to avoid password warning
$env:MYSQL_PWD = $mysqlPasswordPlain

# Run this against MySQL
$createScript | mysql -u $mysqlUser -h localhost

# Clear the password from environment
Remove-Item Env:\MYSQL_PWD

Write-Host ""
Write-Host "=== Step 5: Done. Connection string for your app ===" -ForegroundColor Green

$connectionString = "mysql://${milAdminUser}:${milAdminPassword}@localhost:3306/mil_rec?sslmode=DISABLED"

Write-Host "Use this in your .env as DATABASE_URL:"
Write-Host $connectionString
Write-Host ""
Write-Host "Note: SSL is disabled for local development. Enable it in production."
Write-Host ""
Write-Host "You can change the mil_admin password later with an ALTER USER command if needed."
