# Mobile Strategy Game - Development Startup Script
Write-Host "Starting Mobile Strategy Game development environment..." -ForegroundColor Cyan

# Set Node.js path
$env:Path = $env:Path + ";C:\Program Files\nodejs"

# Move to project root
Set-Location $PSScriptRoot

# Start server (in background)
Write-Host "Starting server..." -ForegroundColor Yellow
$serverScript = @"
`$env:Path = `$env:Path + ';C:\Program Files\nodejs'
Set-Location '$PSScriptRoot\server'
npm run dev
"@
Start-Process powershell -ArgumentList "-NoExit", "-Command", $serverScript -WindowStyle Normal

Start-Sleep -Seconds 3

# Start client (in background)
Write-Host "Starting client..." -ForegroundColor Yellow
$clientScript = @"
`$env:Path = `$env:Path + ';C:\Program Files\nodejs'
Set-Location '$PSScriptRoot\client'
npm run dev
"@
Start-Process powershell -ArgumentList "-NoExit", "-Command", $clientScript -WindowStyle Normal

Start-Sleep -Seconds 5

Write-Host "Development environment started!" -ForegroundColor Green
Write-Host ""
Write-Host "Server: http://localhost:3000" -ForegroundColor Cyan
Write-Host "Client: http://localhost:5173" -ForegroundColor Cyan
Write-Host ""
Write-Host "Open http://localhost:5173 in your browser." -ForegroundColor Magenta
Write-Host ""
Write-Host "Close both PowerShell windows to stop the development environment." -ForegroundColor Yellow
