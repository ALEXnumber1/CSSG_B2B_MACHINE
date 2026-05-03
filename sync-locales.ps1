# CSSG Locale Sync Utility
# Synchronizes src/locales/ from OneDrive to Documents workspace to maintain parity.

$source = "c:\Users\globa\OneDrive\CSSG_B2B_MACHINE\src\locales"
$destination = "c:\Users\globa\Documents\CSSG_B2B_MACHINE\src\locales"

if (Test-Path $source) {
    Write-Host "Syncing locales from $source to $destination..." -ForegroundColor Cyan
    robocopy $source $destination /MIR /NJH /NJS /NDL /NC /NS /NP
    Write-Host "Parity achieved successfully." -ForegroundColor Green
} else {
    Write-Host "Source path not found: $source" -ForegroundColor Red
}
