######################################################
# Sets environment to 'production' for deployed site #
# on Azure by changing the config/config.json file   #
######################################################
Write-Output "Setting environment to 'production'"
$pathToJson = '..\wwwroot\config\environment.json'
$a = Get-Content $pathToJson -raw | ConvertFrom-Json
$a.name = "production"
$a | ConvertTo-Json  | set-content $pathToJson
Write-Output "Done!"