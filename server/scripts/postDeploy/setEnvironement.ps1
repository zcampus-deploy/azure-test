Write-Output "Setting environment to 'production'"
$pathToJson = 'config\environment.json'
$a = Get-Content $pathToJson -raw | ConvertFrom-Json
$a.name = "production"
$a | ConvertTo-Json  | set-content $pathToJson
Write-Output "Done!"