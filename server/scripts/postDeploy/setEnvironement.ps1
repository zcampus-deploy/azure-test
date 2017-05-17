######################################################
# Sets environment to 'production' for deployed site #
# on Azure by changing the config/config.json file   #
######################################################
$pathToJson = '..\wwwroot\config\environment.json'
Write-Output "Setting environment to 'production' in $pathToJson"
$a = Get-Content $pathToJson -raw | ConvertFrom-Json
$a.name = "production"
$a | ConvertTo-Json  | set-content $pathToJson
Write-Output "Done!"