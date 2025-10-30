# Node.js環境確認スクリプト
Write-Host "=== Node.js Environment Check ===" -ForegroundColor Cyan
Write-Host ""

# 環境変数を確認
$userPath = [Environment]::GetEnvironmentVariable("Path", [EnvironmentVariableTarget]::User)
$machinePath = [Environment]::GetEnvironmentVariable("Path", [EnvironmentVariableTarget]::Machine)

Write-Host "User Path contains nodejs: $($userPath -match 'nodejs')" -ForegroundColor $(if($userPath -match 'nodejs'){"Green"}else{"Red"})
Write-Host "Machine Path contains nodejs: $($machinePath -match 'nodejs')" -ForegroundColor $(if($machinePath -match 'nodejs'){"Green"}else{"Red"})
Write-Host ""

# Node.jsの直接確認
$nodePath = "C:\Program Files\nodejs\node.exe"
if (Test-Path $nodePath) {
    Write-Host "Node.js found at: $nodePath" -ForegroundColor Green
    & $nodePath --version
    $npmPath = "C:\Program Files\nodejs\npm.cmd"
    if (Test-Path $npmPath) {
        & $npmPath --version
    }
} else {
    Write-Host "Node.js NOT found!" -ForegroundColor Red
}

Write-Host ""
Write-Host "Press any key to close..."
$null = $Host.UI.RawUI.ReadKey('NoEcho,IncludeKeyDown')

